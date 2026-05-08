import { useEffect, useState } from 'react';

const DEFAULT_MESSAGE =
  'Reminder: PTA braai fundraiser this Friday 23 May at 17:00 on the school field. Tickets R120/adult, R60/child. See you there! — Highveld Academy';
const DEFAULT_NUMBERS = '27714229928';

export default function AdminBroadcast() {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [numbers, setNumbers] = useState(DEFAULT_NUMBERS);
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Admin broadcast | TownConnect Schools';
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setResult(null);

    const phoneNumbers = numbers
      .split(/\r?\n/)
      .map((n) => n.trim())
      .filter(Boolean);

    if (!message.trim() || phoneNumbers.length === 0 || !password) {
      setError('Please fill in message, at least one phone number, and the admin password.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/.netlify/functions/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, phoneNumbers, adminPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || `Request failed (${res.status}).`);
      } else {
        setResult(data);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 animate-fade">
      <div className="text-center mb-10">
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-gold block mb-4">
          Admin
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-navy italic">
          Broadcast a notice
        </h1>
        <p className="mt-4 text-sm text-gray-600">
          Sends a WhatsApp text from the Highveld Academy demo number to each phone number listed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card-classy rounded-2xl p-6 sm:p-8 space-y-5 bg-white">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2">
            Message to broadcast
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full bg-[#F1F3F5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2">
            Phone numbers (one per line, with country code)
          </label>
          <textarea
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            rows={4}
            placeholder="27714229928"
            className="w-full bg-[#F1F3F5] rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2">
            Admin password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#F1F3F5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-navy)', color: 'white' }}
        >
          {submitting ? 'Sending…' : 'Send broadcast'}
        </button>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
        )}
        {result && (
          <p className="text-sm text-navy bg-[#F1F3F5] border border-[#E5E7EB] rounded-xl px-4 py-3">
            Sent: <strong>{result.sent}</strong> &nbsp;·&nbsp; Failed: <strong>{result.failed}</strong>
          </p>
        )}
      </form>
    </section>
  );
}
