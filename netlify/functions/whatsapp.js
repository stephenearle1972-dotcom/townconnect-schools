const { buildSystemPrompt } = require('./school-data.js');

const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

async function callGemini(userMessage) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: userMessage }] }],
      systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
      generationConfig: { maxOutputTokens: 1024, temperature: 0.3 },
    }),
  });
  if (!response.ok) {
    console.error('Gemini error:', response.status, await response.text());
    return null;
  }
  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
}

async function sendWhatsAppReply(to, text) {
  if (text.length > 4000) {
    text = text.substring(0, 3950) + '\n\n... For more details, contact the school office at 012 663 4500.';
  }
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
    console.error('WhatsApp send error:', response.status, await response.text());
  }
  return response.ok;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'GET') {
    const params = event.queryStringParameters || {};
    if (params['hub.mode'] === 'subscribe' && params['hub.verify_token'] === VERIFY_TOKEN) {
      console.log('Webhook verified');
      return { statusCode: 200, body: params['hub.challenge'] };
    }
    return { statusCode: 403, body: 'Forbidden' };
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      const entry = body?.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;

      if (value?.statuses) {
        return { statusCode: 200, body: 'Status update ignored' };
      }

      const message = value?.messages?.[0];
      if (!message) {
        return { statusCode: 200, body: 'No message' };
      }

      const senderPhone = message.from;
      const messageType = message.type;

      if (messageType !== 'text') {
        await sendWhatsAppReply(senderPhone, 'I can only read text messages at the moment. Please type your question about Highveld Academy.');
        return { statusCode: 200, body: 'Non-text handled' };
      }

      const userMessage = message.text?.body;
      if (!userMessage) {
        return { statusCode: 200, body: 'Empty message' };
      }

      console.log(`[Schools bot] Message from ${senderPhone}: ${userMessage}`);

      const reply = await callGemini(userMessage);

      if (reply) {
        await sendWhatsAppReply(senderPhone, reply);
      } else {
        await sendWhatsAppReply(senderPhone, "I'm having trouble right now. Please try again in a moment, or contact the school office at 012 663 4500.");
      }

      return { statusCode: 200, body: 'OK' };
    } catch (err) {
      console.error('[Schools bot] Error:', err);
      return { statusCode: 200, body: 'Error (logged)' };
    }
  }

  return { statusCode: 405, body: 'Method not allowed' };
};
