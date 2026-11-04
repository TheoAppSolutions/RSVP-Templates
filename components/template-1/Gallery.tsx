const MOMENTS = [
  ["01", "Tiny hands, big dreams", "A whole world waiting to be discovered."],
  ["02", "The first laugh", "The sound everyone wants to hear again."],
  ["03", "One trip around the sun", "A milestone worth covering in sprinkles."],
  ["04", "Cake before bedtime", "The sweetest kind of birthday chaos."],
  ["05", "A room full of love", "The people who make Lemuel’s world bright."],
];

export default function Gallery() {
  return (
    <section id="gallery" className="birthday-memory-strip overflow-hidden bg-dusty-100 py-20 md:py-28" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-6xl px-6 text-center"><p className="text-[10px] uppercase tracking-[0.45em] text-dusty-500">A glimpse of the birthday magic</p><h2 id="gallery-title" className="mt-4 font-serif text-5xl font-light italic text-dusty-800 md:text-6xl">Birthday Moments</h2><p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-dusty-700">The smiles, the sparkle, and all the little moments that make Lemuel worth celebrating.</p></div>
      <div className="mx-auto mt-12 grid max-w-6xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-5">{MOMENTS.map(([number, title, body], index) => <article key={number} className={`birthday-memory-card birthday-memory-card-${index + 1} rounded-[1.75rem] p-6 text-left shadow-[0_18px_45px_rgba(61,41,61,0.12)] ${index % 2 ? "mt-8" : ""}`}><span className="text-[10px] uppercase tracking-[0.28em] opacity-70">{number}</span><div className="mt-16 text-4xl" aria-hidden>{["☀", "✦", "✿", "●", "♡"][index]}</div><h3 className="mt-6 font-serif text-2xl leading-none">{title}</h3><p className="mt-3 text-sm leading-6 opacity-75">{body}</p></article>)}</div>
    </section>
  );
}
