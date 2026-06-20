import { Link } from 'react-router-dom';
import { home } from '../data/content.js';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-schools.png')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(27, 42, 74, 0.55)' }}
        aria-hidden="true"
      />

      <div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center animate-fade"
        style={{ minHeight: 'clamp(420px, 60vh, 600px)' }}
      >
        <div className="py-16 sm:py-20">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-gold mb-4 sm:mb-6 block">
            TownConnect Schools
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight max-w-4xl mx-auto">
            {home.hero.headline}
          </h1>
          <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base sm:text-lg text-white/90 font-light leading-relaxed">
            {home.hero.subhead}
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href="/demo/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest"
            >
              See the app in action
            </a>
            <Link
              to="/how-it-works"
              className="btn-primary px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest"
            >
              {home.hero.ctaPrimary}
            </Link>
            <Link
              to="/try-demo"
              className="px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 border-white/70 text-white hover:bg-white hover:text-navy transition-colors"
            >
              {home.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
