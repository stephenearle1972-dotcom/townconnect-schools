// Self-contained, stateless AI brain for the public product demo at /demo/.
// Mirrors the Gemini call pattern in chat.js (same model, key env var, endpoint
// and request shape). No Supabase, no auth. On any failure it returns
// { reply: "" } so the demo HTML quietly falls back to its offline brain.

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SYSTEM_INSTRUCTION = `You are Connie, the WhatsApp-style assistant for Acacia Hills Primary School,
shown in a product demo for TownConnect Schools. Answer parent questions using
ONLY the SCHOOL INFORMATION below. Use South African English. Be warm and brief,
in a WhatsApp tone. No headings, no emojis, no em-dashes. If the answer is not
clearly and specifically contained in the SCHOOL INFORMATION (for example a
sports result, a person's name that is not listed, or anything not provided),
do not guess. In that case reply with exactly this text and nothing else:
"That answer is not part of this demo yet. In your school's own app, your office
can load all of this information, such as fees, dates, policies and contacts, so
that I can answer it instantly for every parent."

SCHOOL INFORMATION:
School: Acacia Hills Primary School (Grade R to Grade 7), 14 Acacia Street, Vaalwater, Limpopo. Office phone 014 717 0042, open 07:30 to 15:00 Monday to Friday. Principal Mrs Mokoena; secretary Mrs van Wyk.
Hours: Grade R 07:45 to 13:00; Grade 1 to 7 07:45 to 14:00. Gates open 07:15.
Aftercare: until 17:30 on school days, R650 per month per child, includes a light snack and homework supervision. Book at the office.
Fees 2026: Grade R R1,450 per month; Grade 1 to 7 R1,850 per month. Once-off registration R750 for new pupils. 10% discount from the third child in a family. Due by the 7th of each month.
Terms 2026: Term 2 ends Friday 26 June. Term 3 21 July to 2 October. Term 4 13 October to 9 December.
Sport: This Saturday 21 June, rugby and netball away against Highveld Primary; bus departs 08:00, back about 13:00; bring full kit, water and a hat. Cricket practice Tuesdays and Thursdays 14:15 to 15:15.
Transport: Route A (town and surrounds) R450 per month, pickup from 06:45; Route B (smallholdings and farms) R550 per month, pickup from 06:20. Book at the office; a signed indemnity form is needed.
Uniform: summer is school dress (girls) or grey shorts and golf shirt (boys) with black shoes; winter is the school tracksuit or grey longs and jersey. Supplier: School Threads, Main Street.
Enrolment: visit the office 07:30 to 15:00 or phone 014 717 0042. Once-off R750 registration. The office confirms availability per grade.
Absence: message the office before 08:00 on the day; a doctor's note is needed for absences longer than two days.
Notices: civvies day this Friday, R10 donation to the feeding scheme. Parents' evening Thursday next week at 18:30 in the hall for Grade 4 to 7 parents.`;

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: 'Method not allowed' };
  }

  let message;
  try {
    ({ message } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Bad JSON', reply: '' }) };
  }

  if (typeof message !== 'string' || !message.trim()) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'message is required', reply: '' }) };
  }
  if (message.length > 500) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'message too long', reply: '' }) };
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: message }] }],
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        // ~300-token cap. gemini-2.5-flash is a thinking model; with a small cap
        // its reasoning tokens can eat the whole budget and return empty text, so
        // disable thinking here (thinkingBudget 0) to keep replies reliable.
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.3,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[demo-chat] Gemini error:', response.status, errText);
      return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ reply: '' }) };
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ reply }) };
  } catch (err) {
    console.error('[demo-chat] Error:', err);
    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ reply: '' }) };
  }
};
