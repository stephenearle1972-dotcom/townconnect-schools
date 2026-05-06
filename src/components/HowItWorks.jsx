import { howItWorks } from '../data/content.js';

export default function HowItWorksVisual() {
  return (
    <div className="card-classy rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-white to-sand/30 max-w-md mx-auto">
      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-clay mb-6">
        Sample conversation
      </p>
      <div className="space-y-3">
        {howItWorks.conversation.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === 'parent' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.from === 'parent'
                  ? 'bg-forest text-white rounded-br-sm'
                  : 'bg-sand/60 text-forest rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 text-center">
        Powered by WhatsApp + Gemini
      </p>
    </div>
  );
}
