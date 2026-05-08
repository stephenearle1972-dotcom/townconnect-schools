import { useEffect } from 'react';

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy | TownConnect Schools';
  }, []);

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 animate-fade">
      <div className="text-center mb-10">
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-gold block mb-4">
          Privacy
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-navy italic">
          How we handle your data
        </h1>
      </div>

      <div className="card-classy rounded-2xl p-6 sm:p-10 bg-white space-y-5 text-sm sm:text-base text-gray-700 leading-relaxed">
        <p>
          TownConnect Schools is a product of <strong>TownConnect (Pty) Ltd</strong> (Reg: 2026/106250/07).
        </p>
        <p>We process no learner-specific personal data.</p>
        <p>The WhatsApp bot provides school-wide information only.</p>
        <p>
          Messages are processed to provide responses and are not stored beyond the current session.
        </p>
        <p>
          For data enquiries:{' '}
          <a href="mailto:hello@townconnect.co.za" className="text-navy font-bold hover:text-gold">
            hello@townconnect.co.za
          </a>
          .
        </p>
        <p>Compliant with the Protection of Personal Information Act (POPIA).</p>
      </div>
    </section>
  );
}
