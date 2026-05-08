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
