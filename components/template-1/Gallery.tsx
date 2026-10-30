"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { MEDIA } from "@/lib/event";

export default function Gallery() {
  const [bad, setBad] = useState<string[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const imgs = MEDIA.gallery.filter((src) => !bad.includes(src));

  const step = useCallback(
    (direction: number) => {
      setOpen((current) => current === null ? current : (current + direction + imgs.length) % imgs.length);
    },
    [imgs.length],
  );

  useEffect(() => {
    if (open === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, step]);

  if (!imgs.length) return null;

  const renderSet = (duplicate = false) => (
    <div className="flex shrink-0 items-start gap-4 pr-4 sm:gap-6 sm:pr-6" aria-hidden={duplicate || undefined}>
      {imgs.map((src, index) => (
        <button
          key={`${duplicate ? "duplicate" : "original"}-${src}`}
          type="button"
          tabIndex={duplicate ? -1 : 0}
          onClick={() => setOpen(index)}
          aria-label={`Enlarge photo ${index + 1} of ${imgs.length}`}
          className={`group relative w-[72vw] max-w-[360px] shrink-0 overflow-hidden rounded-[1.75rem] bg-dusty-200 shadow-[0_18px_45px_rgba(54,75,93,0.16)] ring-dusty-400 transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_55px_rgba(54,75,93,0.22)] focus:outline-none focus-visible:ring-4 sm:w-[38vw] lg:w-[28vw] ${index % 2 ? "mt-8 sm:mt-12" : ""}`}
        >
          <span className="relative block aspect-[4/5] overflow-hidden">
            <Image
              src={src}
              alt={duplicate ? "" : `Raymund and Vanessa, moment ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 38vw, 72vw"
              loading="lazy"
              onError={() => setBad((current) => current.includes(src) ? current : [...current, src])}
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-dusty-900/25 via-transparent to-white/5 opacity-70 transition-opacity group-hover:opacity-40" aria-hidden />
            <span className="absolute bottom-5 left-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/15 text-sm text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-dusty-800" aria-hidden>
              +
            </span>
          </span>
        </button>
      ))}
    </div>
  );

  const modalButton = "absolute z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/35 text-2xl text-white backdrop-blur-sm transition hover:bg-white hover:text-dusty-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white";

  return (
    <section className="overflow-hidden bg-dusty-100 py-20 md:py-28" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.45em] text-dusty-500">A glimpse of our story</p>
        <h2 id="gallery-title" className="mt-4 font-serif text-5xl font-light italic text-dusty-800 md:text-6xl">
          Our Moments
        </h2>
        <div className="mt-6 flex items-center justify-center gap-3 text-dusty-400" aria-hidden>
          <span className="h-px w-14 bg-current" />
          <span className="h-2 w-2 rotate-45 border border-current" />
          <span className="h-px w-14 bg-current" />
        </div>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-dusty-700">
          The laughter, the quiet glances, and all the little moments that brought us here.
        </p>
      </div>

      <div className="gallery-marquee relative mt-12" aria-label="Wedding photo gallery">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-dusty-100 to-transparent sm:w-28" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-dusty-100 to-transparent sm:w-28" aria-hidden />
        <div
          className="gallery-track flex w-max"
          style={{
            animationDuration: `${Math.max(imgs.length * 7, 42)}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {renderSet()}
          {renderSet(true)}
        </div>
      </div>

      <div className="mt-10 flex justify-center px-6">
        <button
          type="button"
          onClick={() => setPaused((current) => !current)}
          aria-pressed={paused}
          className="inline-flex items-center gap-2 rounded-full border border-dusty-300 bg-white/70 px-5 py-2 text-[10px] uppercase tracking-[0.25em] text-dusty-700 transition hover:border-dusty-500 hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-dusty-300"
        >
          <span className="text-sm" aria-hidden>{paused ? "▶" : "Ⅱ"}</span>
          {paused ? "Play gallery" : "Pause gallery"}
        </button>
      </div>

      {open !== null && imgs[open] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${open + 1} of ${imgs.length}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-dusty-900/95 p-4 backdrop-blur-md"
          onClick={() => setOpen(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgs[open]}
            alt={`Raymund and Vanessa, moment ${open + 1}`}
            className="max-h-[86vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-[0.25em] text-white/70">
            {String(open + 1).padStart(2, "0")} / {String(imgs.length).padStart(2, "0")}
          </p>
          <button type="button" aria-label="Close gallery" className={`${modalButton} right-4 top-4`} onClick={() => setOpen(null)}>×</button>
          <button type="button" aria-label="Previous photo" className={`${modalButton} left-3 top-1/2 -translate-y-1/2 sm:left-6`} onClick={(event) => { event.stopPropagation(); step(-1); }}>‹</button>
          <button type="button" aria-label="Next photo" className={`${modalButton} right-3 top-1/2 -translate-y-1/2 sm:right-6`} onClick={(event) => { event.stopPropagation(); step(1); }}>›</button>
        </div>
      )}
    </section>
  );
}
