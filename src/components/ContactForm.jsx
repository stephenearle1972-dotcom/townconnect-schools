import { useState } from 'react';
import { contact } from '../data/content.js';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append('form-name', 'schools-contact');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
      if (!res.ok) throw new Error(`Submission failed (${res.status})`);
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please email us instead.');
    } finally {
      setBusy(false);
    }
  }

  if (submitted) {
    return (
      <div className="card-classy rounded-3xl p-10 text-center bg-gradient-to-br from-white to-fog/40">
        <span className="text-4xl">✓</span>
        <p className="mt-4 text-navy font-serif italic text-xl">
          {contact.successMessage}
        </p>
      </div>
    );
  }

  return (
    <form
      name="schools-contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="card-classy rounded-3xl p-6 sm:p-10 space-y-5"
    >
      <input type="hidden" name="form-name" value="schools-contact" />
      <p className="hidden">
        <label>
          Don't fill this out: <input name="bot-field" />
        </label>
      </p>

      <Field label="Your name" name="name" type="text" required />
      <Field label="School" name="school" type="text" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone (optional)" name="phone" type="tel" />
      <TextField label="What would you like to know?" name="message" required />

      {error && (
        <p className="text-sm text-gold">{error}</p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="btn-primary w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
      >
        {busy ? 'Sending…' : 'Send'}
      </button>
    </form>
  );
}

function Field({ label, name, type, required }) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy text-sm"
      />
    </label>
  );
}

function TextField({ label, name, required }) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
        {label}
      </span>
      <textarea
        name={name}
        required={required}
        rows={5}
        className="mt-2 w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy text-sm resize-y"
      />
    </label>
  );
}
