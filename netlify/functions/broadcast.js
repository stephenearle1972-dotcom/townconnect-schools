const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const ADMIN_PASSWORD = process.env.BROADCAST_ADMIN_PASSWORD;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

async function sendWhatsAppText(to, text) {
  const url = `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text },
    }),
  });
  if (!response.ok) {
    const errText = await response.text();
    console.error(`[Broadcast] send failed for ${to}:`, response.status, errText);
  }
  return response.ok;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: 'Method not allowed' };
  }

  try {
    const { message, phoneNumbers, adminPassword } = JSON.parse(event.body || '{}');

    if (!adminPassword || adminPassword !== ADMIN_PASSWORD) {
      return {
        statusCode: 401,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Invalid admin password' }),
      };
    }

    if (!message || !Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'message and phoneNumbers[] required' }),
      };
    }

    let sent = 0;
    let failed = 0;

    for (let i = 0; i < phoneNumbers.length; i++) {
      const raw = String(phoneNumbers[i] || '').trim();
      if (!raw) continue;
      const ok = await sendWhatsAppText(raw, message);
      if (ok) sent++; else failed++;
      if (i < phoneNumbers.length - 1) await sleep(1000);
    }

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ sent, failed }),
    };
  } catch (err) {
    console.error('[Broadcast] Error:', err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Broadcast failed' }),
    };
  }
};
