import { useEffect } from 'react';
import Hero from '../components/Hero.jsx';
import DemoCTA from '../components/DemoCTA.jsx';
import HowItWorksVisual from '../components/HowItWorks.jsx';
import { home } from '../data/content.js';

export default function Home() {
  useEffect(() => {
    document.title = 'TownConnect Schools | WhatsApp-first school communication';
  }, []);

  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {home.pillars.map((p) => (
            <div key={p.title} className="card-classy rounded-3xl p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gold">
                {p.kicker}
              </p>
              <h3 className="mt-4 text-2xl font-serif font-bold text-navy italic">
                {p.title}
              </h3>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed font-light">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gold">
              See it in action
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-navy italic">
              Real questions. Real answers.
            </h2>
            <p className="mt-6 text-gray-600 font-light leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. The bot reads from the school’s spreadsheet, formats the answer for WhatsApp, and replies in seconds. No app, no login, no friction.
            </p>
          </div>
          <HowItWorksVisual />
        </div>
      </section>

      <DemoCTA />
    </>
  );
}
