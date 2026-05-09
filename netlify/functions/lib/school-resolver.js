import { getSupabase } from './supabase.js';

// In-memory cache. Lambda cold-start clears it. 60s TTL.
// Keyed by `${prefix}::${phoneId}` so different routing inputs cache independently.
const CACHE_TTL_MS = 60 * 1000;
const cache = new Map();

function cacheGet(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.t > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.v;
}

function cacheSet(key, value) {
  cache.set(key, { v: value, t: Date.now() });
}

export async function resolveSchool({ prefix, phoneId, slug } = {}) {
  const key = `${prefix || ''}::${phoneId || ''}::${slug || ''}`;
  const hit = cacheGet(key);
  if (hit !== null) return hit;

  const supabase = getSupabase();

  // Slug lookup is used by the web chat widget — not part of the SQL function,
  // so we hit the table directly via service-role.
  if (slug && !prefix && !phoneId) {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('slug', slug)
      .is('deleted_at', null)
      .maybeSingle();
    if (error) throw error;
    cacheSet(key, data || null);
    return data || null;
  }

  const { data, error } = await supabase.rpc('get_school_by_prefix_or_phone', {
    p_prefix: prefix || null,
    p_phone_id: phoneId || null,
  });
  if (error) throw error;

  // Function returns a single row (or null). supabase-js may wrap it in an array.
  let school = null;
  if (Array.isArray(data)) {
    school = data[0] || null;
  } else if (data && typeof data === 'object' && data.id) {
    school = data;
  }
  cacheSet(key, school);
  return school;
}

export async function getFullData(schoolId) {
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc('get_school_full_data', { p_school_id: schoolId });
  if (error) throw error;
  return data;
}

export async function logQuery(entry) {
  // Best-effort fire-and-forget. Log failures don't fail the user request.
  try {
    const supabase = getSupabase();
    await supabase.from('bot_query_log').insert(entry);
  } catch (e) {
    console.error('bot_query_log insert failed', e);
  }
}

// Exported for tests
export function _clearCache() {
  cache.clear();
}
