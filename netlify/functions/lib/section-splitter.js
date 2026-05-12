/**
 * Split a plain-text document into sections.
 * Returns [{ title, text }, ...].
 * Always returns at least one section (the whole document if no splits found).
 */
export function splitIntoSections(plainText) {
  if (!plainText || plainText.length < 200) {
    return [{ title: null, text: plainText || '' }];
  }

  const patterns = [
    { name: 'numbered', regex: /^(\d+(?:\.\d+)?)\.?\s+([A-Z][A-Za-z &',\-]+)$/gm },
    { name: 'markdown', regex: /^(#{1,3})\s+(.+)$/gm },
    { name: 'allcaps', regex: /^([A-Z][A-Z\s&',\-]{8,80})$/gm },
    { name: 'colon', regex: /^([A-Z][A-Za-z &',\-]{4,60}):\s*$/gm },
  ];

  let bestResult = null;
  let bestScore = -1;

  for (const pat of patterns) {
    const sections = splitByRegex(plainText, pat.regex);
    if (sections.length < 3 || sections.length > 50) continue;

    const score = scoreSplits(sections);
    if (score > bestScore) {
      bestScore = score;
      bestResult = { sections, pattern: pat.name };
    }
  }

  if (bestResult) return bestResult.sections;

  return chunkByParagraph(plainText, 2000);
}

function splitByRegex(text, regex) {
  regex = new RegExp(regex.source, regex.flags);
  const matches = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    matches.push({ index: m.index, headingLength: m[0].length, title: m[0].trim() });
  }
  if (matches.length === 0) return [];

  const sections = [];
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index + matches[i].headingLength;
    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
    const body = text.slice(start, end).trim();
    if (body.length === 0) continue;
    sections.push({ title: matches[i].title, text: body });
  }
  return sections;
}

function scoreSplits(sections) {
  const n = sections.length;
  if (n < 3 || n > 50) return -1;
  const lengths = sections.map(s => s.text.length);
  const avg = lengths.reduce((a, b) => a + b, 0) / n;
  const variance = lengths.reduce((a, b) => a + (b - avg) ** 2, 0) / n;
  const stddev = Math.sqrt(variance);
  const sizeScore = avg > 100 ? 1 - Math.min(stddev / avg, 1) : 0;
  const countScore = 1 - Math.abs(n - 12) / 40;
  return sizeScore + countScore;
}

function chunkByParagraph(text, targetSize) {
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const chunks = [];
  let current = '';
  for (const p of paragraphs) {
    if (current.length + p.length + 2 > targetSize && current.length > 0) {
      chunks.push({ title: null, text: current.trim() });
      current = p;
    } else {
      current = current ? current + '\n\n' + p : p;
    }
  }
  if (current.trim().length > 0) chunks.push({ title: null, text: current.trim() });
  return chunks.length > 0 ? chunks : [{ title: null, text: text }];
}
