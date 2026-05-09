# Claude reading this repo: invariants you must not break

This file documents non-obvious invariants of the TownConnect Schools bot. Read it before making changes to anything in `netlify/functions/`.

## The shared trial bot number

There is one Meta WhatsApp Cloud API phone_number_id (`1025953133944348`, E.164 `+27791866145`) that serves EVERY trial school. Multi-tenancy is achieved by parents prefixing their messages with their school's `trial_bot_prefix` — e.g. `HVA fees grade 10` routes to Highveld Academy because Highveld's `schools.trial_bot_prefix = 'HVA'`.

### Hard rule on `schools.bot_phone_number_id`

`schools.bot_phone_number_id` MUST BE NULL for any school using the shared trial number. It is set ONLY when a school upgrades to a dedicated number assigned to them alone.

**Why:** The lookup function `get_school_by_prefix_or_phone(prefix, phone_id)` prefers phone-id matches over prefix matches (the `case when ... then 0 else 1 end` ordering in `supabase/migrations/*_bot_integration_support.sql`). If you set `bot_phone_number_id = '1025953133944348'` on, say, Highveld, then EVERY message arriving on the shared number — including ones with prefix `STA` for some other school — will resolve to Highveld. Multi-tenant routing breaks silently for every other school.

**Symptom of getting this wrong:** parents at School B text `STB ...` and the bot answers as if it were School A. Trust gone in one day.

**The right state:**
- Trial schools: `bot_phone_number_id = NULL`, `bot_phone_e164 = NULL`, `trial_bot_prefix = '<their-code>'`. Every parent message must include the prefix.
- Paid schools with dedicated numbers: `bot_phone_number_id = '<their-own-id>'`, `bot_phone_e164 = '+27...'`, `trial_bot_prefix` retained as a fallback. Prefix is optional on their dedicated number.

If you find yourself wanting to set `bot_phone_number_id` to the shared trial id, stop. You don't.

## The proxy

The Meta WhatsApp webhook actually points at `vaalwaterconnect.netlify.app/.netlify/functions/whatsapp.js` (the directory bot router). That handler detects the Schools phone_number_id at the very top of the POST handler and forwards the entire payload to `https://townconnect-schools.netlify.app/.netlify/functions/whatsapp`. This repo's `whatsapp.js` does NOT receive Meta webhooks directly.

This means:
- Any change to `vaalwaterconnect/netlify/functions/whatsapp.js` is fleet-wide. It restarts every directory bot's Lambda. Don't touch it casually.
- Schools-specific logic stays in this repo. Always.
- The Supabase service-role key lives in this repo's Netlify env vars only. NEVER in vaalwaterconnect.

## Subscription gate

Every parent message resolves a school, then checks `subscription_status`. If `read_only`, `cancelled`, or `trial` with `trial_ends_at < now()`, the bot replies "this school's bot is paused" and logs `status='school_paused'`. It does NOT call Gemini. Don't bypass this — schools that haven't paid don't get free service.

## Cache TTL

`school-resolver.js` caches school lookups and full data for 60 seconds in Lambda memory. Admin edits propagate to the bot within a minute. Do not make this longer without thinking through the support implications (admin edits a fee, parent texts and gets the old fee, school gets a complaint).

## bot_query_log

Every parent message produces one row in `public.bot_query_log` — answered, unknown_prefix, school_paused, no_prefix, or error. This is the single source of truth for "did the bot work?". Don't suppress writes for performance reasons. The 90-day retention sweep keeps the table bounded.

## Languages

The bot answers in whatever language the parent typed. Gemini handles English, Afrikaans, isiZulu, and Sepedi natively. The system prompt tells it to match the parent's language. Don't override this with hard-coded language detection.

## Code organisation

- `netlify/functions/whatsapp.js` — Meta webhook handler (receives forwarded payloads from the proxy)
- `netlify/functions/chat.js` — web chat widget endpoint (no parent_phone, defaults to slug=highveld-academy)
- `netlify/functions/lib/supabase.js` — service-role client, cached
- `netlify/functions/lib/school-resolver.js` — lookup + 60s cache + log writer
- `netlify/functions/lib/system-prompt.js` — assembles Gemini system prompt from the JSON blob

## Things that look like bugs but aren't

- The prefix regex `^[A-Z][A-Z0-9]{1,5}\b` is intentionally case-sensitive. Lowercase prefixes get the no_prefix reply, which nudges parents to use CAPS. This is a feature: it forces the school to teach parents the convention once, and the bot stays predictable for everyone after.
- `bot_phone_e164` and `bot_phone_number_id` being NULL on Highveld is correct — Highveld is a trial school on the shared number. See the section above on this.
