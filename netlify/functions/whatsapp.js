import { resolveSchool, getFullData, logQuery } from './lib/school-resolver.js';
import { buildSystemPrompt } from './lib/system-prompt.js';

const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

// Prefix convention: 2-6 UPPERCASE letters/digits at the start of the message,
// followed by whitespace or end of string. Lowercase first words are treated as
// casual greetings (no_prefix) so the bot prompts the user for the school code
// instead of mis-routing on common words like "hello" or "thanks".
const PREFIX_RE = /^([A-Z][A-Z0-9]{1,5})(?=\s|$)/;

function parsePrefix(text) {
  if (!text) return null;
  const trimmed = text.trim();
  const m = trimmed.match(PREFIX_RE);
  return m ? m[1] : null;
}

function stripPrefix(text) {
  if (!text) return '';
  return text.trim().replace(PREFIX_RE, '').trim();
}

async function callGemini(systemPrompt, userMessage) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: userMessage }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: { maxOutputTokens: 1024, temperature: 0.3 },
    }),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini ${response.status}: ${errText}`);
  }
  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  const usage = data?.usageMetadata || {};
  return {
    text,
    tokens_in: usage.promptTokenCount ?? null,
    tokens_out: usage.candidatesTokenCount ?? null,
  };
}

async function sendWhatsAppReply(to, text, fromPhoneId) {
  let body = text;
  if (body && body.length > 4000) {
    body = body.substring(0, 3950) + '\n\n... For more details, contact the school directly.';
  }
  const phoneId = fromPhoneId || PHONE_NUMBER_ID;
  const url = `https://graph.facebook.com/v22.0/${phoneId}/messages`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body },
    }),
  });
  if (!response.ok) {
    const errText = await response.text();
    console.error('WhatsApp send error:', response.status, errText);
  }
  return response.ok;
}

function trialEndedFor(school) {
  if (!school) return false;
  if (school.subscription_status !== 'trial') return false;
  if (!school.trial_ends_at) return false;
  return new Date(school.trial_ends_at) < new Date();
}

export const handler = async (event) => {
  if (event.httpMethod === 'GET') {
    const params = event.queryStringParameters || {};
    if (params['hub.mode'] === 'subscribe' && params['hub.verify_token'] === VERIFY_TOKEN) {
      console.log('Webhook verified');
      return { statusCode: 200, body: params['hub.challenge'] };
    }
    return { statusCode: 403, body: 'Forbidden' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  let parsedBody;
  try {
    parsedBody = JSON.parse(event.body || '{}');
  } catch (e) {
    console.error('[Schools bot] Bad JSON:', e);
    return { statusCode: 200, body: 'Bad JSON' };
  }

  try {
    const entry = parsedBody?.entry?.[0];
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
    const ourPhoneId = value?.metadata?.phone_number_id || PHONE_NUMBER_ID;

    if (messageType !== 'text') {
      await sendWhatsAppReply(
        senderPhone,
        'I can only read text messages at the moment. Please type your question.',
        ourPhoneId
      );
      return { statusCode: 200, body: 'Non-text handled' };
    }

    const userMessage = (message.text?.body || '').trim();
    if (!userMessage) {
      return { statusCode: 200, body: 'Empty message' };
    }

    console.log(`[Schools bot] Message from ${senderPhone} (phone_id ${ourPhoneId}): ${userMessage}`);

    const prefix = parsePrefix(userMessage);
    const querySansPrefix = stripPrefix(userMessage);

    // Resolve school: prefix first (works on the shared trial number), then by phone id alone
    // (for paying schools that have their own dedicated number).
    let school = null;
    if (prefix) {
      school = await resolveSchool({ prefix, phoneId: ourPhoneId });
    }
    if (!school) {
      school = await resolveSchool({ prefix: null, phoneId: ourPhoneId });
    }

    if (!school) {
      if (prefix) {
        const reply = `Sorry, I don't recognise the school code *${prefix}*. Please check the code on your school's signup page — codes must be in CAPITAL LETTERS, 2-6 characters, like HVA or STA. If you're sure the code is right, contact your school directly.`;
        await sendWhatsAppReply(senderPhone, reply, ourPhoneId);
        await logQuery({
          parent_phone: senderPhone,
          prefix_used: prefix,
          message_text: userMessage,
          response_text: reply,
          status: 'unknown_prefix',
        });
      } else {
        const reply =
          "Hi! Please start your message with your school's code in CAPITAL LETTERS, like *HVA fees grade 10* or *STA next sport fixture*. The code is on your school's WhatsApp signup page. (Use capitals — lowercase doesn't work.)";
        await sendWhatsAppReply(senderPhone, reply, ourPhoneId);
        await logQuery({
          parent_phone: senderPhone,
          message_text: userMessage,
          response_text: reply,
          status: 'no_prefix',
        });
      }
      return { statusCode: 200, body: 'OK' };
    }

    // Subscription gate
    const status = school.subscription_status;
    if (status === 'cancelled' || status === 'read_only' || trialEndedFor(school)) {
      await sendWhatsAppReply(
        senderPhone,
        `${school.name}'s WhatsApp service is currently paused. Please contact the school directly at ${school.contact_phone || school.contact_email}.`,
        ourPhoneId
      );
      await logQuery({
        school_id: school.id,
        parent_phone: senderPhone,
        prefix_used: prefix,
        message_text: userMessage,
        status: 'school_paused',
      });
      return { statusCode: 200, body: 'OK' };
    }

    // Load full data and ask Gemini
    const t0 = Date.now();
    try {
      const fullData = await getFullData(school.id);
      const systemPrompt = buildSystemPrompt(fullData);
      const result = await callGemini(systemPrompt, querySansPrefix || userMessage);
      const answer = result.text || "I couldn't generate an answer. Please try again or contact the school directly.";
      await sendWhatsAppReply(senderPhone, answer, ourPhoneId);
      await logQuery({
        school_id: school.id,
        parent_phone: senderPhone,
        prefix_used: prefix,
        message_text: userMessage,
        response_text: answer,
        tokens_in: result.tokens_in,
        tokens_out: result.tokens_out,
        latency_ms: Date.now() - t0,
        status: 'answered',
      });
    } catch (e) {
      console.error('[Schools bot] processing error', e);
      await sendWhatsAppReply(
        senderPhone,
        'Sorry, I had a hiccup. Please try again in a moment, or contact the school directly.',
        ourPhoneId
      );
      await logQuery({
        school_id: school.id,
        parent_phone: senderPhone,
        prefix_used: prefix,
        message_text: userMessage,
        latency_ms: Date.now() - t0,
        status: 'error',
        error_detail: String(e?.message || e),
      });
    }

    return { statusCode: 200, body: 'OK' };
  } catch (err) {
    console.error('[Schools bot] Top-level error:', err);
    return { statusCode: 200, body: 'Error (logged)' };
  }
};
