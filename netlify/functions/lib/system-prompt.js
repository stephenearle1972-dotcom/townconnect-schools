// Builds the Gemini system prompt from a school's full data blob.
// Receives the JSON returned by get_school_full_data().

import { getSupabase } from './supabase.js';

const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
const BOOST_FULL_TEXT_CHARS = 4000;

function fmtDate(d) {
  if (!d) return '';
  return String(d).slice(0, 10);
}

function splitStoragePath(storagePath) {
  if (!storagePath) return { bucket: 'school-files', objectPath: '' };
  const idx = storagePath.indexOf('/');
  if (idx <= 0) return { bucket: 'school-files', objectPath: storagePath };
  return { bucket: storagePath.slice(0, idx), objectPath: storagePath.slice(idx + 1) };
}

async function buildFileUrl(storagePath) {
  const { bucket, objectPath } = splitStoragePath(storagePath);
  if (!objectPath) return null;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(objectPath, SIGNED_URL_TTL_SECONDS);
    if (error || !data?.signedUrl) return null;
    return data.signedUrl;
  } catch (e) {
    console.error('createSignedUrl failed for', storagePath, e);
    return null;
  }
}

async function formatFilesForPrompt(files) {
  if (!files || files.length === 0) return 'No documents on file.';

  const processed = files.filter(f => f.extraction_status === 'processed' && f.summary);
  const otherCount = files.length - processed.length;

  if (processed.length === 0) {
    return `${files.length} document(s) on file but none have been processed yet — tell parents the school will share specific files on request.`;
  }

  const blocks = await Promise.all(processed.map(async f => {
    const fileLink = await buildFileUrl(f.storage_path);
    const linkLine = fileLink ? `Public link: ${fileLink}` : 'Public link: (link unavailable — ask the school for this file)';
    return `## ${f.filename} (${f.category || 'general'})
${linkLine}
Summary:
${f.summary}`;
  }));

  let trailer = '';
  if (otherCount > 0) {
    trailer = `\n\n(${otherCount} additional document(s) are on file but not yet processed for question-answering. Mention them by name only if asked.)`;
  }

  return `These are the school's documents. Use them to answer questions. If a parent asks for a specific document, you may share its Public link directly.\n\n${blocks.join('\n\n')}${trailer}`;
}

export async function buildSystemPrompt(fullData, opts = {}) {
  const {
    school,
    teachers = [],
    fixtures_upcoming = [],
    fixtures_recent = [],
    calendar_upcoming = [],
    notices_active = [],
    fees = [],
    bus_routes = [],
    narrative = [],
    files = [],
  } = fullData || {};

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const dayName = today.toLocaleDateString('en-ZA', { weekday: 'long' });

  const filesBlock = await formatFilesForPrompt(files);

  let boostBlock = '';
  if (opts.boostFile && opts.boostFile.extracted_text) {
    const f = opts.boostFile;
    const keywords = Array.isArray(opts.keywords) ? opts.keywords : [];
    const window = extractRelevantWindow(String(f.extracted_text), keywords, BOOST_FULL_TEXT_CHARS);
    boostBlock = `=== RELEVANT DOCUMENT (full text) ===
The parent's question appears related to "${f.filename}". Below is the most relevant ${BOOST_FULL_TEXT_CHARS}-character window from that document — quote from it directly when answering.

${window}

=== END RELEVANT DOCUMENT ===

`;
  }

  return `You are the WhatsApp assistant for ${school.name}, a school in South Africa.

Today is ${dayName}, ${todayStr}.

Keep responses short, friendly, and accurate. WhatsApp constraint: maximum 3-4 sentences unless the question needs a list. Do not repeat or echo the parent's question before answering — go straight to the answer.

Never discuss individual learners, grades, or disciplinary matters. For complaints or disputes, direct to the school office. For emergencies, give the school phone.

=== SCHOOL DETAILS ===
Name: ${school.name}
Principal: ${school.principal_name || 'not on file'}
Contact: ${school.contact_email || ''}${school.contact_phone ? ', ' + school.contact_phone : ''}
Address: ${school.address || 'not on file'}

=== ACTIVE NOTICES ===
${notices_active.length === 0 ? 'No active notices.' : notices_active.map(n =>
  `[${(n.urgency || 'normal').toUpperCase()}] ${n.title} (${fmtDate(n.publish_at)})\n${n.body}`
).join('\n\n')}

${boostBlock}=== SCHOOL DOCUMENTS ===
${filesBlock}

=== TEACHERS (${teachers.length}) ===
${teachers.map(t => {
  const subj = (t.subjects || []).join(', ');
  const gr = (t.grades || []).join(', ');
  const phone = t.phone ? ` — ${t.phone}` : '';
  const email = t.email ? ` — ${t.email}` : '';
  return `${t.full_name}${subj ? ' — ' + subj : ''}${gr ? ' — Grades ' + gr : ''}${phone}${email}`;
}).join('\n')}

=== UPCOMING FIXTURES (next 60 days) ===
${fixtures_upcoming.length === 0 ? 'No upcoming fixtures.' : fixtures_upcoming.map(f =>
  `${fmtDate(f.fixture_date)}${f.fixture_time ? ' ' + String(f.fixture_time).slice(0,5) : ''} — ${f.sport}${f.age_group ? ' ' + f.age_group : ''}${f.team ? ' (' + f.team + ')' : ''} vs ${f.opponent || 'TBA'}${f.is_home === false ? ' (away)' : ' (home)'}${f.venue ? ' @ ' + f.venue : ''}${f.notes ? ' — ' + f.notes : ''}`
).join('\n')}

=== RECENT FIXTURE RESULTS (last 30 days) ===
${fixtures_recent.length === 0 ? 'No recent fixtures.' : fixtures_recent.map(f =>
  `${fmtDate(f.fixture_date)} — ${f.sport} vs ${f.opponent || 'TBA'} — ${f.result || 'result not posted'}`
).join('\n')}

=== UPCOMING CALENDAR EVENTS (next 6 months) ===
${calendar_upcoming.length === 0 ? 'No upcoming events.' : calendar_upcoming.map(c =>
  `${fmtDate(c.event_date)}${c.event_end_date ? ' to ' + fmtDate(c.event_end_date) : ''} — ${c.title}${c.category ? ' [' + c.category + ']' : ''}${c.description ? '\n  ' + c.description : ''}`
).join('\n')}

=== FEES ===
${fees.length === 0 ? 'No fees on file.' : fees.map(f =>
  `${f.grade} — ${f.fee_type}: R${f.amount}${f.due_date ? ' (due ' + fmtDate(f.due_date) + ')' : ''}${f.description ? ' — ' + f.description : ''}`
).join('\n')}

=== BUS ROUTES ===
${bus_routes.length === 0 ? 'No bus routes on file.' : bus_routes.map(r => {
  const stops = Array.isArray(r.stops) ? r.stops.map(s => (typeof s === 'object' ? s.stop_name : s)).filter(Boolean).join(' → ') : '';
  return `${r.route_name}${r.description ? ' — ' + r.description : ''}${stops ? '\n  Stops: ' + stops : ''}${r.monthly_fee ? '\n  Monthly fee: R' + r.monthly_fee : ''}${r.contact_phone ? '\n  Contact: ' + (r.contact_name ? r.contact_name + ', ' : '') + r.contact_phone : ''}`;
}).join('\n')}

=== ABOUT THE SCHOOL ===
${narrative.length === 0 ? 'No narrative content on file.' : narrative.map(n =>
  `## ${n.title}\n${(n.body || '').replace(/<[^>]+>/g, '')}`
).join('\n\n')}

=== HOW TO ANSWER ===
You have three sources of information above:
1. The school's notices and structured data (teachers, fees, fixtures, calendar, bus routes, narrative).
2. The school's documents (under SCHOOL DOCUMENTS) — these contain summaries of policies, menus, rules, and other school documentation.
3. The general identity information at the top of this prompt.

When a parent asks a question, search ALL THREE SOURCES before declining. Treat the SCHOOL DOCUMENTS section as authoritative for questions about policies, rules, conduct, fees breakdowns, food, uniforms, and anything else covered in those documents. If a parent asks for a specific document, share its Public link directly.

Only reply "I don't have that information — please contact the school directly at ${school.contact_phone || school.contact_email}." if you have genuinely searched all three sources and found nothing relevant. Never invent data. Never discuss individual learners or disciplinary matters.

Always answer in the same language the parent used. You speak English, Afrikaans, isiZulu, and Sepedi fluently.
`;
}

const STOP_WORDS = new Set([
  'the','a','an','is','are','what','when','how','do','does','to','of','for','in','at','my','our','i','we','please',
  'can','you','have','has','will','was','were','any','some','this','that','about','school','tell','me','need','want',
]);

export function extractKeywords(text) {
  if (!text) return [];
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !STOP_WORDS.has(w));
}

export function scoreFileMatch(file, keywords) {
  const haystack = (
    (file.filename || '') + ' ' +
    (file.category || '') + ' ' +
    (file.summary || '') + ' ' +
    ((file.topic_keywords || []).join(' '))
  ).toLowerCase();
  return keywords.reduce((s, k) => s + (haystack.includes(k) ? 1 : 0), 0);
}

export function pickBoost(files, messageText) {
  const keywords = extractKeywords(messageText);
  if (keywords.length === 0) return { file: null, keywords };
  const scored = (files || [])
    .filter(f => f.extraction_status === 'processed' && f.extracted_text)
    .map(f => ({ file: f, score: scoreFileMatch(f, keywords) }))
    .filter(s => s.score >= 1)
    .sort((a, b) => b.score - a.score);
  return { file: scored[0]?.file ?? null, keywords };
}

// Legacy single-value helper retained for any caller that only wants the file.
export function pickBoostFile(files, messageText) {
  return pickBoost(files, messageText).file;
}

export function extractRelevantWindow(fullText, keywords, windowSize = BOOST_FULL_TEXT_CHARS) {
  if (!fullText) return '';
  if (fullText.length <= windowSize) return fullText;
  const lower = fullText.toLowerCase();
  const positions = (keywords || [])
    .map(k => lower.indexOf(k))
    .filter(p => p >= 0)
    .sort((a, b) => a - b);
  if (positions.length === 0) return fullText.slice(0, windowSize);
  const firstHit = positions[0];
  const start = Math.max(0, firstHit - 500);
  const end = Math.min(fullText.length, start + windowSize);
  return fullText.slice(start, end);
}
