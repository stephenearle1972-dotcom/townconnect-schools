import { useEffect } from 'react';
import SampleQuestions from '../components/SampleQuestions.jsx';
import { tryDemo } from '../data/content.js';
import { school } from '../config/school.js';

export default function TryDemo() {
  useEffect(() => {
    document.title = 'Try the demo | TownConnect Schools';
  }, []);

  const waNumber = school.whatsappNumber.replace(/\D/g, '');
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hi! I want to try the Highveld Academy demo.')}`;

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 animate-fade">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-clay block mb-4">
          {tryDemo.eyebrow}
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-forest italic">
          {tryDemo.headline}
        </h1>
        <p className="mt-6 text-base sm:text-lg text-gray-600 font-light leading-relaxed">
          {tryDemo.subhead}
        </p>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest bg-[#25D366] text-white hover:opacity-90 transition-opacity"
        >
          <span>📱</span>
          Open WhatsApp — {school.whatsappDisplay}
        </a>

        <p className="mt-4 text-xs text-gray-500 italic max-w-md mx-auto">
          {tryDemo.notice}
        </p>
      </div>

      <div className="mt-20">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-clay text-center mb-6">
          Try asking
        </p>
        <SampleQuestions items={tryDemo.sampleQuestions} />
      </div>
    </section>
  );
}
