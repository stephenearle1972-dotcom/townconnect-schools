import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { forSchools } from '../data/content.js';

export default function ForSchools() {
  useEffect(() => {
    document.title = 'For schools | TownConnect Schools';
  }, []);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 animate-fade">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-navy italic">
            {forSchools.heading}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-600 font-light leading-relaxed">
            {forSchools.subheading}
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {forSchools.features.map((f) => (
            <div key={f.title} className="card-classy rounded-2xl p-7">
              <h3 className="text-xl font-serif font-bold text-navy">{f.title}</h3>
              <p className="mt-3 text-sm text-gray-600 font-light leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="text-center mb-12">
          <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-navy italic">
            Simple monthly pricing
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {forSchools.pricing.tiers.map((tier) => (
            <div
              key={tier.name}
              className={`card-classy rounded-2xl p-7 flex flex-col ${
                tier.highlight ? 'border-2 border-gold' : ''
              }`}
            >
              {tier.highlight && (
                <span className="self-start text-[9px] font-black uppercase tracking-[0.3em] text-gold mb-3">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-serif font-bold text-navy">{tier.name}</h3>
              <p className="mt-3">
                <span className="text-3xl font-bold text-navy">{tier.price}</span>
                <span className="text-sm text-gray-500">{tier.period}</span>
              </p>
              <ul className="mt-5 space-y-2.5 flex-1">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                    <span className="text-gold flex-shrink-0">›</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-500 italic">
          {forSchools.pricing.note}
        </p>

        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="btn-primary inline-block px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest"
          >
            Book a demo
          </Link>
        </div>
      </section>
    </>
  );
}
