import { useEffect } from 'react';
import ChatWidget from '../components/ChatWidget.jsx';
import { tryDemo } from '../data/content.js';
import { school } from '../config/school.js';

export default function TryDemo() {
  useEffect(() => {
    document.title = 'Try the demo | TownConnect Schools';
  }, []);

  const waNumber = school.whatsappNumber.replace(/\D/g, '');
  const waLink = `https://wa.me/27791866145?text=${encodeURIComponent(
    'Hi! I want to try the Highveld Academy demo.'
  )}`;

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 animate-fade">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-gold block mb-4">
          {tryDemo.eyebrow}
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-navy italic">
          {tryDemo.headline}
        </h1>
        <p className="mt-6 text-base sm:text-lg text-gray-600 font-light leading-relaxed">
          {tryDemo.subhead}
        </p>

        <p className="mt-10 text-sm text-gray-700">
          Or try it on WhatsApp:{' '}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-navy hover:text-gold transition-colors"
          >
            wa.me/27791866145
          </a>
        </p>
      </div>

      <div className="mt-10">
        <ChatWidget />
      </div>
    </section>
  );
}
