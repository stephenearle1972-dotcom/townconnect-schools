export default function SampleQuestions({ items }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {items.map((q) => (
        <li
          key={q}
          className="card-classy rounded-2xl px-5 py-4 flex items-center gap-3"
        >
          <span className="text-gold text-lg">›</span>
          <span className="text-sm text-gray-700">{q}</span>
        </li>
      ))}
    </ul>
  );
}
