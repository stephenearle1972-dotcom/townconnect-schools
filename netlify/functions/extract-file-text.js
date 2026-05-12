import { getSupabase } from './lib/supabase.js';
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

const SUPPORTED_MIME = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/msword': 'docx',
  'text/plain': 'txt',
};

const MAX_EXTRACTED_CHARS = 80000;
const SUMMARY_TARGET_CHARS = 2000;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function ok(body) {
  return { statusCode: 200, headers: corsHeaders, body: JSON.stringify(body) };
}

function err(statusCode, message) {
  return { statusCode, headers: corsHeaders, body: JSON.stringify({ error: message }) };
}

// storage_path is stored as `${bucket}/${path}` by the admin uploader.
// Split into [bucket, objectPath] so we can call .from(bucket).download(objectPath).
function splitStoragePath(storagePath) {
  const idx = storagePath.indexOf('/');
  if (idx <= 0) return { bucket: 'school-files', objectPath: storagePath };
  return { bucket: storagePath.slice(0, idx), objectPath: storagePath.slice(idx + 1) };
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return err(405, 'Method not allowed');
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return err(400, 'Invalid JSON');
  }

  const { file_id } = body;
  if (!file_id) return err(400, 'Missing file_id');

  const supabase = getSupabase();

  const { data: file, error: fileErr } = await supabase
    .from('files')
    .select('*')
    .eq('id', file_id)
    .maybeSingle();

  if (fileErr || !file) {
    return err(404, 'File not found');
  }

  await supabase
    .from('files')
    .update({ extraction_status: 'processing' })
    .eq('id', file_id);

  try {
    const ext = SUPPORTED_MIME[file.mime_type];
    if (!ext) {
      await supabase
        .from('files')
        .update({
          extraction_status: 'unsupported',
          extraction_error: `MIME type "${file.mime_type}" not supported for text extraction. Only PDF, DOCX, and TXT are processed today.`,
          processed_at: new Date().toISOString(),
        })
        .eq('id', file_id);
      return ok({ status: 'unsupported' });
    }

    const { bucket, objectPath } = splitStoragePath(file.storage_path);
    const { data: blob, error: dlErr } = await supabase.storage
      .from(bucket)
      .download(objectPath);

    if (dlErr || !blob) {
      throw new Error('Storage download failed: ' + (dlErr?.message || 'no blob'));
    }

    const buffer = Buffer.from(await blob.arrayBuffer());

    let text = '';
    if (ext === 'pdf') {
      const parser = new PDFParse({ data: buffer });
      try {
        const result = await parser.getText();
        text = result?.text || '';
      } finally {
        await parser.destroy?.();
      }
    } else if (ext === 'docx') {
      const result = await mammoth.extractRawText({ buffer });
      text = result?.value || '';
    } else if (ext === 'txt') {
      text = buffer.toString('utf-8');
    }

    text = (text || '').trim();
    if (text.length === 0) {
      await supabase
        .from('files')
        .update({
          extraction_status: 'failed',
          extraction_error: 'No text could be extracted. The file may be a scanned image PDF, or may be empty.',
          processed_at: new Date().toISOString(),
        })
        .eq('id', file_id);
      return ok({ status: 'failed', reason: 'no_text' });
    }

    const truncated = text.length > MAX_EXTRACTED_CHARS;
    const finalText = truncated ? text.slice(0, MAX_EXTRACTED_CHARS) : text;

    const summary = await summariseWithGemini({
      filename: file.filename,
      category: file.category || 'general',
      text: finalText,
    });

    const topicKeywords = await extractTopicKeywords({ filename: file.filename, summary });

    await supabase
      .from('files')
      .update({
        extracted_text: finalText,
        summary,
        topic_keywords: topicKeywords,
        extraction_status: 'processed',
        extraction_error: truncated
          ? `Document truncated to first ${MAX_EXTRACTED_CHARS} characters for processing. Consider splitting long documents.`
          : null,
        processed_at: new Date().toISOString(),
      })
      .eq('id', file_id);

    return ok({ status: 'processed', summary_chars: summary.length, topic_keywords: topicKeywords, truncated });
  } catch (e) {
    await supabase
      .from('files')
      .update({
        extraction_status: 'failed',
        extraction_error: String(e?.message || e).slice(0, 500),
        processed_at: new Date().toISOString(),
      })
      .eq('id', file_id);
    return ok({ status: 'failed', error: String(e?.message || e) });
  }
};

async function summariseWithGemini({ filename, category, text }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set');

  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  const systemInstruction = `You are summarising a document for a WhatsApp school assistant. Parents will ask questions about anything in this document. Your summary is the bot's only knowledge of this document, so coverage matters more than depth.

REQUIREMENTS:
1. Identify EVERY top-level section in the source (look for headings, numbered sections, or clear topic shifts).
2. For each section, produce at least one short bullet capturing the key facts, numbers, dates, rules, prices, or policies in that section.
3. Use a "## Section Name" heading for each section, followed by 1-3 bullet points.
4. Preserve specific numbers and proper nouns parents are likely to ask about (times like "07:30", durations like "7 days", prices like "R45", section numbers like "section 3.2").
5. If a section has multiple sub-rules (e.g. consequences after 1st/2nd/3rd offence), keep all of them — these are the kinds of details parents ask about.
6. Be at most ${SUMMARY_TARGET_CHARS} characters TOTAL across all sections. If you must trade depth for breadth, trade depth — never drop a section entirely.
7. Be in the same language as the source. Don't translate.
8. NEVER add facts not in the source. NEVER guess or pad.
9. For tabular content (e.g. fee schedules, menus), preserve every row as a list item with both the item name AND the price.

OUTPUT FORMAT:
Output ONLY the summary. No preamble, no "here is the summary", no closing remark. Start with the first "## Section Name" heading immediately.`;

  const userPrompt = `File name: ${filename}
Category: ${category}

--- DOCUMENT TEXT ---
${text}
--- END DOCUMENT ---

Produce the summary now.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: {
          temperature: 0.1,
          // Gemini 2.5 Flash defaults to thinking-on; with a small token budget the model
          // burns most tokens on internal reasoning and emits ~60 visible tokens, so the
          // summary truncates at the first heading. Disable thinking and give the visible
          // output enough room for a full ~2000-char summary.
          maxOutputTokens: 4000,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API ${response.status}: ${errText.slice(0, 200)}`);
  }

  const json = await response.json();
  const summary = json?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
  if (!summary) throw new Error('Gemini returned empty summary');

  return summary.length > SUMMARY_TARGET_CHARS + 200
    ? summary.slice(0, SUMMARY_TARGET_CHARS) + '...'
    : summary;
}

async function extractTopicKeywords({ filename, summary }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return [];

  const prompt = `From the school document below, list 8-15 SHORT topic keywords (single words or 2-word phrases) that parents might use when asking questions about this document. Focus on:
- Topics covered (e.g. "uniform", "cell phones", "homework", "fees", "menu", "tuck shop")
- Common parent question words for each topic (e.g. "rules", "policy", "discipline", "late", "absent", "hours")
- Specific items if it's a price list (e.g. "burger", "sandwich", "drinks")

Output ONLY a JSON array of lowercase strings. No prose. Example: ["uniform", "rules", "cell phones", "punctuality", "late", "detention", "homework", "discipline", "policy", "code of conduct"]

Filename: ${filename}
Summary:
${summary}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 200,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      }
    );
    if (!response.ok) return [];
    const json = await response.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
    const arr = JSON.parse(cleaned);
    if (!Array.isArray(arr)) return [];
    return arr
      .filter(s => typeof s === 'string')
      .map(s => s.toLowerCase().trim())
      .filter(s => s.length >= 2 && s.length <= 40)
      .slice(0, 20);
  } catch (e) {
    console.error('extractTopicKeywords failed:', e);
    return [];
  }
}
