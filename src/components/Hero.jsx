import { Link } from 'react-router-dom';
import { home } from '../data/content.js';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-white to-sand/30" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-clay/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-forest/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-36 animate-fade">
        <div className="text-center">
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.6em] text-clay mb-4 sm:mb-6 block">
            {home.eyebrow}
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-forest leading-tight">
            <span className="block">{home.headlineLead}</span>
            <span className="block italic text-clay">{home.headlineAccent}</span>
          </h1>
          <p className="mt-6 sm:mt-10 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 font-light leading-relaxed">
            {home.subhead}
          </p>
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              to="/try-demo"
              className="btn-primary px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest"
            >
              {home.ctaPrimary}
            </Link>
            <Link
              to="/how-it-works"
              className="px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 border-forest/30 text-forest hover:bg-forest hover:text-white transition-colors"
            >
              {home.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
