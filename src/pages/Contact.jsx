import { useEffect } from 'react';
import ContactForm from '../components/ContactForm.jsx';
import { contact } from '../data/content.js';
import { brand } from '../config/school.js';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact | TownConnect Schools';
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 animate-fade">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-gold block mb-4">
          {contact.eyebrow}
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-navy italic">
          {contact.headline}
        </h1>
        <p className="mt-6 text-base sm:text-lg text-gray-600 font-light leading-relaxed">
          {contact.subhead}
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ContactForm />
        </div>
        <aside className="space-y-6">
          <div className="card-classy rounded-3xl p-6">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gold">
              Email
            </p>
            <a
              href={`mailto:${brand.contactEmail}`}
              className="block mt-3 text-navy font-serif italic text-lg break-all hover:text-gold transition-colors"
            >
              {brand.contactEmail}
            </a>
          </div>
          <div className="card-classy rounded-3xl p-6">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gold">
              WhatsApp
            </p>
            <a
              href={`https://wa.me/${brand.contactPhone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-navy font-serif italic text-lg hover:text-[#25D366] transition-colors"
            >
              {brand.contactPhone}
            </a>
          </div>
          <div className="card-classy rounded-3xl p-6 bg-gradient-to-br from-white to-fog/40">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gold">
              {brand.parent} family
            </p>
            <p className="mt-3 text-sm text-gray-600 font-light leading-relaxed">
              TownConnect Schools is a sister product to TownConnect — the hyperlocal directory platform powering 16 South African town sites.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
