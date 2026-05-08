import { useState, useEffect, useRef } from 'react';

const SAMPLE_QUESTIONS = [
  'When do exams start?',
  'Is there rugby this Saturday?',
  'Who teaches Grade 11 maths?',
  'What are the school fees?',
  'Wanneer begin die eksamen?',
];

const speechSupported =
  typeof window !== 'undefined' &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (!speechSupported) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    r.continuous = false;
    r.interimResults = false;
    r.lang = 'en-ZA';
    r.onresult = (e) => {
      const text = e.results?.[0]?.[0]?.transcript;
      if (text) setInput((prev) => (prev ? prev + ' ' + text : text));
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recognitionRef.current = r;
    return () => {
      try { r.abort(); } catch { /* noop */ }
    };
  }, []);

  async function sendMessage(text) {
    const trimmed = (text || '').trim();
    if (!trimmed || loading) return;
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      const reply = data.response || data.error || "I couldn't process that.";
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: "I'm having trouble right now. Please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  function toggleMic() {
    if (!speechSupported || !recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch {
        setListening(false);
      }
    }
  }

  return (
    <div className="card-classy rounded-2xl overflow-hidden flex flex-col" style={{ height: '600px', maxHeight: '80vh' }}>
      <div className="px-5 py-4 border-b border-[#e5e0d8] bg-white flex items-center justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-clay">Live demo</p>
          <p className="text-sm font-serif italic text-forest">Highveld Academy assistant</p>
        </div>
        <span className="text-[10px] text-gray-500">Powered by TownConnect Schools</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-4 bg-[#fdfbf7]">
        {messages.length === 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Try asking</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendMessage(q)}
                  className="card-classy rounded-xl px-4 py-3 text-left text-sm text-gray-700 hover:text-forest transition-colors"
                >
                  <span className="text-clay mr-2">›</span>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-forest text-white rounded-br-sm'
                  : 'bg-white border border-[#e5e0d8] text-gray-800 rounded-bl-sm'
              }`}
              style={m.role === 'user' ? { backgroundColor: 'var(--color-forest)' } : undefined}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#e5e0d8] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-clay animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-clay animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-clay animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-[#e5e0d8] bg-white px-4 py-3 flex items-center gap-2">
        {speechSupported && (
          <button
            type="button"
            onClick={toggleMic}
            aria-label={listening ? 'Stop listening' : 'Start voice input'}
            className={`p-2 rounded-full transition-colors ${
              listening ? 'bg-clay text-white' : 'bg-[#f5f1ea] text-gray-600 hover:bg-[#ebe5da]'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
          </button>
        )}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Highveld Academy…"
          className="flex-1 bg-[#f5f1ea] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-clay"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="btn-primary px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--color-forest)' }}
        >
          Send
        </button>
      </form>

      <p className="px-5 py-3 text-[10px] text-gray-500 italic text-center bg-white border-t border-[#e5e0d8]">
        This assistant is trained on Highveld Academy school data. Powered by TownConnect Schools.
      </p>
    </div>
  );
}
