// Builds the Gemini system prompt from a school's full data blob.
// Receives the JSON returned by get_school_full_data().

function fmtDate(d) {
  if (!d) return '';
  return String(d).slice(0, 10);
}

export function buildSystemPrompt(fullData) {
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

  return `You are the WhatsApp assistant for ${school.name}, a school in South Africa.

Today is ${dayName}, ${todayStr}.

You answer questions from parents about the school. Keep responses short, friendly, and accurate. WhatsApp constraint: maximum 3-4 sentences unless the question needs a list. Do not repeat or echo the parent's question before answering — go straight to the answer.

Always respond in the same language the parent used. You speak English, Afrikaans, isiZulu, and Sepedi fluently.

Never invent data. If the answer isn't in the data below, say "I don't have that information — please contact the school directly at ${school.contact_phone || school.contact_email}."

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

=== FILES AVAILABLE ===
${files.length === 0 ? 'No files.' : files.map(f =>
  `${f.filename} (${f.category || 'uncategorised'})`
).join('\n')}
`;
}
