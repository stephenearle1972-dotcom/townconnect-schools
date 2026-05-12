import { resolveSchool, getFullData, getRelevantSections, logQuery } from './lib/school-resolver.js';
import { buildSystemPrompt, extractKeywords } from './lib/system-prompt.js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// The web demo at schools.townconnect.co.za/try-demo is bound to Highveld Academy.
// Override via the request body when we add multi-school chat widgets later.
const DEFAULT_SCHOOL_SLUG = 'highveld-academy';

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: 'Method not allowed' };
  }

  const t0 = Date.now();
  let bodyJson;
  try {
    bodyJson = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Bad JSON' }),
    };
  }

  const { message, schoolSlug } = bodyJson;
  if (!message) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'No message provided' }),
    };
  }

  const slug = schoolSlug || DEFAULT_SCHOOL_SLUG;

  try {
    const school = await resolveSchool({ slug });
    if (!school) {
      return {
        statusCode: 404,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: `School "${slug}" not found` }),
      };
    }

    const fullData = await getFullData(school.id);
    const keywords = extractKeywords(message);
    const relevantSections = await getRelevantSections({ schoolId: school.id, keywords, maxSections: 3 });
    const systemPrompt = await buildSystemPrompt(fullData, { relevantSections });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: message }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { maxOutputTokens: 1024, temperature: 0.3 },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Chat] Gemini error:', response.status, errText);
      throw new Error(`Gemini ${response.status}`);
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't process that. Please try again.";
    const usage = data?.usageMetadata || {};

    await logQuery({
      school_id: school.id,
      parent_phone: null,
      prefix_used: null,
      message_text: message,
      response_text: reply,
      tokens_in: usage.promptTokenCount ?? null,
      tokens_out: usage.candidatesTokenCount ?? null,
      latency_ms: Date.now() - t0,
      status: 'answered',
    });

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ response: reply }),
    };
  } catch (err) {
    console.error('[Chat] Error:', err);
    await logQuery({
      parent_phone: null,
      message_text: message,
      latency_ms: Date.now() - t0,
      status: 'error',
      error_detail: String(err?.message || err),
    });
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "I'm having trouble right now. Please try again." }),
    };
  }
};
