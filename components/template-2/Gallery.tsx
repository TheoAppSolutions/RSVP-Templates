const MOMENTS = [
  ["01", "The beginning", "Every chapter starts with a little courage."],
  ["02", "The people", "A life is measured by the hearts around it."],
  ["03", "The glow-up", "Eighteen looks even better with a full room."],
  ["04", "The toast", "To new doors, brave choices, and beautiful days."],
];

export default function Gallery() {
  return (
    <section id="gallery" className="birthday-editorial-gallery overflow-hidden border-y border-dusty-200 bg-dusty-100 py-20 md:py-28" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-6xl px-5 md:px-8"><div className="grid gap-7 border-b border-dusty-300 pb-9 md:grid-cols-[1fr_1fr] md:items-end"><div><p className="text-[10px] font-medium uppercase tracking-[0.36em] text-dusty-600">05 / The moments between</p><h2 id="gallery-title" className="mt-4 font-serif text-5xl font-light tracking-[-0.035em] text-dusty-900 sm:text-6xl">Birthday <em>snapshots</em></h2></div><p className="max-w-md text-sm leading-7 text-dusty-700 md:ml-auto">The laughter, big milestones, and little moments that make Lemuel’s story so special.</p></div><div className="mt-10 grid gap-4 md:grid-cols-2"><article className="birthday-editorial-feature flex min-h-[360px] flex-col justify-between border border-dusty-300 p-7 text-white md:col-span-2 md:min-h-[270px] md:p-10"><span className="text-[10px] uppercase tracking-[0.3em] text-white/70">18 / a new chapter</span><div><strong className="block font-serif text-7xl font-light leading-none sm:text-9xl">18</strong><p className="mt-4 max-w-md font-serif text-2xl italic text-white/85">A debut worth remembering.</p></div></article>{MOMENTS.map(([number, title, body]) => <article key={number} className="border border-dusty-300 bg-dusty-50 p-6"><span className="text-[10px] tracking-[0.28em] text-dusty-500">{number}</span><h3 className="mt-14 font-serif text-3xl font-light text-dusty-900">{title}</h3><p className="mt-3 text-sm leading-6 text-dusty-700">{body}</p></article>)}</div></div>
    </section>
  );
}
