import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import MultilingualShowcase from '../components/MultilingualShowcase.jsx';
import { home } from '../data/content.js';

export default function Home() {
  useEffect(() => {
    document.title = 'TownConnect Schools | WhatsApp-first school communication';
  }, []);

  return (
    <>
      <Hero />

      {/* Problem */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-navy italic text-center">
          {home.problem.heading}
        </h2>
        <p className="mt-8 text-base sm:text-lg text-gray-700 font-light leading-relaxed">
          {home.problem.body}
        </p>
      </section>

      {/* Solution */}
      <section className="bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold italic">
            <span className="text-white">{home.solution.heading.split('.')[0]}.</span>
            <span className="block text-gold mt-2">{home.solution.heading.split('.').slice(1).join('.').trim()}</span>
          </h2>
          <p className="mt-8 text-base sm:text-lg text-white/85 font-light leading-relaxed">
            {home.solution.body}
          </p>
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {home.features.map((f) => (
            <div key={f.title} className="card-classy rounded-2xl p-7">
              <h3 className="text-xl font-serif font-bold text-navy">{f.title}</h3>
              <p className="mt-3 text-sm text-gray-600 font-light leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-paper">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-navy italic text-center">
            Why schools are switching to WhatsApp.
          </h2>

          <div className="mt-12 sm:mt-16 grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Old way column */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6">
                The old way
              </p>
              <ul className="space-y-4">
                {[
                  'Parents download another app',
                  'Parents scroll through a feed hoping to find answers',
                  'Communication in English and Afrikaans only',
                  'Adverts between school messages',
                  'Works when the school remembers to post',
                  'Complex admin portal requiring training',
                  'Weeks to set up',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-500 font-light leading-relaxed line-through decoration-gray-300">
                    <span aria-hidden="true" className="mt-2 inline-block w-2 h-2 rounded-full bg-gray-300 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TownConnect way column */}
            <div className="rounded-2xl bg-navy text-white p-6 sm:p-8 shadow-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-6">
                The TownConnect way
              </p>
              <ul className="space-y-4">
                {[
                  'Parents use WhatsApp — already on every phone',
                  'Parents ask a question and get an instant answer',
                  'Four languages: English, Afrikaans, isiZulu, and Sepedi',
                  'Zero advertising. Ever.',
                  'Works 24/7 — parents get answers at 9pm on a Thursday',
                  'Update a spreadsheet. Done.',
                  'Live in days',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-semibold leading-relaxed">
                    <svg
                      aria-hidden="true"
                      className="mt-1 w-5 h-5 text-gold flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42l2.79 2.79 6.79-6.79a1 1 0 011.42 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-12 sm:mt-16 text-center text-base sm:text-lg text-gray-700 font-light leading-relaxed max-w-3xl mx-auto">
            Already using a school communication app? TownConnect Schools works alongside it — adding the WhatsApp layer your parents actually want.
          </p>
        </div>
      </section>

      {/* Multilingual showcase */}
      <MultilingualShowcase />

      {/* Trust */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4">
          Why trust us
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy italic">
          {home.trust.heading}
        </h2>
        <p className="mt-6 text-base sm:text-lg text-gray-700 font-light leading-relaxed">
          {home.trust.body}
        </p>
      </section>

      {/* CTA */}
      <section className="bg-tcteal text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold italic">
            {home.cta.heading}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/85 font-light leading-relaxed">
            {home.cta.body}
          </p>
          <Link
            to="/try-demo"
            className="btn-primary inline-block mt-10 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest"
          >
            {home.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
