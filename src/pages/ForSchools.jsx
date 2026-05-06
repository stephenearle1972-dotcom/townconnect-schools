import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { forSchools } from '../data/content.js';

export default function ForSchools() {
  useEffect(() => {
    document.title = 'For schools | TownConnect Schools';
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 animate-fade">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-clay block mb-4">
          {forSchools.eyebrow}
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-forest italic">
          {forSchools.headline}
        </h1>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-6 sm:gap-8">
        <Panel title={forSchools.give.title} items={forSchools.give.items} accent />
        <Panel title={forSchools.get.title} items={forSchools.get.items} />
      </div>

      <div className="mt-20 card-classy rounded-3xl p-10 sm:p-16 text-center bg-gradient-to-br from-white to-sand/40">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-clay mb-4">
          {forSchools.pricing.label}
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-forest italic">
          {forSchools.pricing.headline}
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-gray-600 font-light leading-relaxed">
          {forSchools.pricing.body}
        </p>
        <Link
          to="/contact"
          className="btn-primary inline-block mt-10 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest"
        >
          Book a demo
        </Link>
      </div>
    </section>
  );
}

function Panel({ title, items, accent = false }) {
  return (
    <div
      className={`card-classy rounded-3xl p-8 sm:p-10 ${
        accent ? 'bg-gradient-to-br from-white to-sand/40' : ''
      }`}
    >
      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-forest italic">
        {title}
      </h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
            <span className="text-clay flex-shrink-0">›</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
