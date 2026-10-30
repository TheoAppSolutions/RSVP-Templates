"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { MEDIA } from "@/lib/event";

export default function Gallery() {
  const [bad, setBad] = useState<string[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const imgs = MEDIA.gallery.filter((src) => !bad.includes(src));

  const goTo = useCallback((index: number) => {
    const slider = sliderRef.current;
    const slide = slider?.querySelector<HTMLElement>(`[data-gallery-slide="${index}"]`);
    if (!slider || !slide) return;
    setActive(index);
    slider.scrollTo({
      left: slide.offsetLeft - (slider.clientWidth - slide.clientWidth) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, []);

  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    const slides = slider?.querySelectorAll<HTMLElement>("[data-gallery-slide]");
    if (!slider || !slides?.length) return;

    const center = slider.scrollLeft + slider.clientWidth / 2;
    let nearest = 0;
    let distance = Number.POSITIVE_INFINITY;
    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const nextDistance = Math.abs(slideCenter - center);
      if (nextDistance < distance) {
        nearest = index;
        distance = nextDistance;
      }
    });
    setActive((current) => current === nearest ? current : nearest);
  }, []);

  const step = useCallback((direction: number) => {
    setOpen((current) => current === null ? current : (current + direction + imgs.length) % imgs.length);
  }, [imgs.length]);

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

  useEffect(() => {
    if (active >= imgs.length) setActive(Math.max(0, imgs.length - 1));
  }, [active, imgs.length]);

  if (!imgs.length) return null;

  const controlClass = "flex h-12 w-12 items-center justify-center border border-dusty-300 text-xl text-dusty-800 transition hover:border-dusty-800 hover:bg-dusty-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-dusty-600 disabled:cursor-not-allowed disabled:opacity-35";
  const modalButton = "absolute z-10 flex h-11 w-11 items-center justify-center border border-white/20 bg-black/35 text-2xl text-white backdrop-blur-sm transition hover:bg-white hover:text-dusty-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white";

  return (
    <section className="overflow-hidden border-y border-dusty-200 bg-dusty-100 py-20 md:py-28" aria-labelledby="gallery-title">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-[1fr_1fr] md:items-end">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-dusty-600">05 / The moments between</p>
          <h2 id="gallery-title" className="mt-4 font-serif text-5xl font-light tracking-[-0.035em] text-dusty-900 sm:text-6xl">Our <em>story</em></h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-dusty-700 md:ml-auto">The laughter, the quiet glances, and all the little moments that brought us here.</p>
      </div>

      <div className="relative mt-10 md:mt-14">
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            paddingInline: "max(1rem, calc((100% - min(82vw, 960px)) / 2))",
            scrollPaddingInline: "2rem",
          }}
          aria-label="Wedding photo gallery. Swipe or use the arrows to browse."
        >
          {imgs.map((src, index) => (
            <button
              key={src}
              type="button"
              data-gallery-slide={index}
              onClick={() => setOpen(index)}
              aria-label={`Open photo ${index + 1} of ${imgs.length}`}
              className="group relative w-[82vw] max-w-[960px] shrink-0 snap-center overflow-hidden border border-dusty-300 bg-dusty-200 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-dusty-500"
            >
              <span className="relative block aspect-[4/3] overflow-hidden sm:aspect-[3/2]">
                <Image
                  src={src}
                  alt={`Raymund and Vanessa, moment ${index + 1}`}
                  fill
                  sizes="(min-width: 1170px) 960px, 82vw"
                  loading={index < 2 ? "eager" : "lazy"}
                  onError={() => setBad((current) => current.includes(src) ? current : [...current, src])}
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-dusty-900/65 via-transparent to-dusty-900/5 opacity-80 transition-opacity group-hover:opacity-100" aria-hidden />
                <span className="absolute bottom-5 left-5 text-[10px] font-medium uppercase tracking-[0.26em] text-white sm:bottom-7 sm:left-7">Photo {String(index + 1).padStart(2, "0")}</span>
                <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center border border-white/60 bg-white/10 text-lg text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-dusty-900 sm:bottom-6 sm:right-6">↗</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between gap-6 px-6">
        <div className="flex min-w-0 flex-1 items-center gap-5">
          <p className="shrink-0 font-serif text-xl tabular-nums text-dusty-900" aria-live="polite">
            {String(active + 1).padStart(2, "0")} <span className="text-sm text-dusty-500">/ {String(imgs.length).padStart(2, "0")}</span>
          </p>
          <div className="h-px w-full max-w-56 bg-dusty-300" aria-hidden>
            <span className="block h-px bg-dusty-800 transition-[width] duration-300" style={{ width: `${((active + 1) / imgs.length) * 100}%` }} />
          </div>
          <span className="hidden text-[9px] uppercase tracking-[0.22em] text-dusty-500 sm:block">Swipe to browse</span>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => goTo((active - 1 + imgs.length) % imgs.length)} className={controlClass} aria-label="Previous photo">←</button>
          <button type="button" onClick={() => goTo((active + 1) % imgs.length)} className={controlClass} aria-label="Next photo">→</button>
        </div>
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
            className="max-h-[86vh] max-w-[92vw] object-contain shadow-2xl"
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
