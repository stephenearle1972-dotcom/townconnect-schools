import { Link } from 'react-router-dom';

export default function DemoCTA({
  eyebrow = 'Live demo',
  headline = 'Message a real bot. Right now.',
  body = 'Highveld Academy is a fictional school we built so you can try the product without us needing a real school first.',
  ctaLabel = 'Open the demo',
  ctaTo = '/try-demo',
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="card-classy rounded-3xl p-10 sm:p-16 text-center bg-gradient-to-br from-white to-sand/40">
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-clay mb-4 block">
          {eyebrow}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-forest italic">
          {headline}
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-gray-600 font-light">{body}</p>
        <Link
          to={ctaTo}
          className="btn-primary inline-block mt-10 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
