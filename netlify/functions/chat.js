const { buildSystemPrompt } = require('./school-data.js');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: 'Method not allowed' };
  }

  try {
    const { message } = JSON.parse(event.body || '{}');
    if (!message) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'No message provided' }),
      };
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: message }] }],
        systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
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

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ response: reply }),
    };
  } catch (err) {
    console.error('[Chat] Error:', err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "I'm having trouble right now. Please try again." }),
    };
  }
};
