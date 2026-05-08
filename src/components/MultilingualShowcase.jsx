import { home } from '../data/content.js';

function ConversationCard({ label, question, answer }) {
  return (
    <div className="card-classy rounded-3xl p-6 sm:p-8 flex flex-col">
      <div className="rounded-2xl px-4 py-5 bg-[#ECEFF1] flex-1 flex flex-col gap-3">
        {/* Sent (right) — WhatsApp light green */}
        <div className="flex justify-end">
          <div className="relative max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm text-gray-900" style={{ backgroundColor: '#DCF8C6' }}>
            {question}
          </div>
        </div>
        {/* Received (left) — WhatsApp white */}
        <div className="flex justify-start">
          <div className="relative max-w-[85%] rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-gray-900 bg-white shadow-sm">
            {answer}
          </div>
        </div>
      </div>
      <p className="mt-5 text-center text-[10px] font-black uppercase tracking-[0.4em] text-gold">
        {label}
      </p>
    </div>
  );
}

export default function MultilingualShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-navy italic">
          {home.multilingual.heading}
        </h2>
        <p className="mt-6 text-base sm:text-lg text-gray-600 font-light leading-relaxed">
          {home.multilingual.subtext}
        </p>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {home.multilingual.cards.map((c) => (
          <ConversationCard key={c.label} {...c} />
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-gray-500 italic">
        {home.multilingual.footer}
      </p>
    </section>
  );
}
