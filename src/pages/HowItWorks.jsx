import { useEffect } from 'react';
import DemoCTA from '../components/DemoCTA.jsx';
import HowItWorksVisual from '../components/HowItWorks.jsx';
import { howItWorks } from '../data/content.js';

export default function HowItWorks() {
  useEffect(() => {
    document.title = 'How it works | TownConnect Schools';
  }, []);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 animate-fade">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-gold block mb-4">
            {howItWorks.eyebrow}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-navy italic">
            {howItWorks.headline}
          </h1>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 sm:gap-8">
          {howItWorks.steps.map((step) => (
            <div key={step.number} className="card-classy rounded-3xl p-8">
              <p className="font-serif italic text-gold text-5xl">{step.number}</p>
              <h3 className="mt-4 text-2xl font-serif font-bold text-navy">
                {step.title}
              </h3>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed font-light">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gold">
              What it looks like
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-bold text-navy italic">
              A normal WhatsApp conversation.
            </h2>
            <p className="mt-6 text-gray-600 font-light leading-relaxed">
              Lorem ipsum dolor sit amet. The parent asks. The bot reads from the school’s spreadsheet. The bot answers in plain English. That’s it. No menus. No buttons. No "press 1 for...".
            </p>
          </div>
          <HowItWorksVisual />
        </div>
      </section>

      <DemoCTA />
    </>
  );
}
