"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MEDIA } from "@/templates/template-3/lib/event";

export default function Gallery() {
  const [bad, setBad] = useState<string[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set());
  const gridRef = useRef<HTMLDivElement>(null);
  const imgs = useMemo(() => MEDIA.gallery.filter((src) => !bad.includes(src)), [bad]);
  const step = useCallback((direction: number) => setOpen((current) => current === null ? current : (current + direction + imgs.length) % imgs.length), [imgs.length]);

  useEffect(() => {
    const tiles = gridRef.current?.querySelectorAll<HTMLButtonElement>(".photo-tile");
    if (!tiles) return;
    setReady(true);
    if (!('IntersectionObserver' in window)) {
      setRevealed(new Set(imgs));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const entering = entries.filter((entry) => entry.isIntersecting);
      if (!entering.length) return;
      setRevealed((current) => {
        const next = new Set(current);
        entering.forEach((entry) => {
          const src = (entry.target as HTMLElement).dataset.src;
          if (src) next.add(src);
          observer.unobserve(entry.target);
        });
        return next;
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    tiles.forEach((tile) => observer.observe(tile));
    return () => observer.disconnect();
  }, [imgs]);

  useEffect(() => {
    if (open === null) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = overflow; };
  }, [open, step]);

  if (!imgs.length) return null;
  return (
    <section id="gallery" className="gallery-section section-pad" aria-labelledby="gallery-title">
      <div className="section-wrap">
        <div className="section-heading gallery-heading"><span className="eyebrow">02 / The little moments</span><h2 id="gallery-title" className="display-heading">A glimpse into <em>our story</em></h2><p>The laughter, quiet glances, and little moments that brought us here.</p></div>
        <div ref={gridRef} className={`photo-grid${ready ? " reveal-ready" : ""}`}>
          {imgs.map((src, index) => <button key={src} type="button" data-src={src} onClick={() => setOpen(index)} aria-label={`Enlarge photo ${index + 1} of ${imgs.length}`} className={`photo-tile photo-tile-${index + 1}${revealed.has(src) ? " is-revealed" : ""}`} style={{ transitionDelay: `${index * 120}ms` }}>
            <Image src={src} alt={`Raymund and Vanessa, moment ${index + 1}`} fill sizes="(min-width: 900px) 32vw, 50vw" onError={() => setBad((current) => current.includes(src) ? current : [...current, src])} />
            <span aria-hidden="true">View photo ↗</span>
          </button>)}
        </div>
      </div>
      {open !== null && imgs[open] && <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`Photo ${open + 1} of ${imgs.length}`} onClick={() => setOpen(null)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgs[open]} alt={`Raymund and Vanessa, moment ${open + 1}`} onClick={(event) => event.stopPropagation()} />
        <button type="button" className="modal-close" aria-label="Close gallery" onClick={() => setOpen(null)}>×</button>
        <button type="button" className="modal-prev" aria-label="Previous photo" onClick={(event) => { event.stopPropagation(); step(-1); }}>‹</button>
        <button type="button" className="modal-next" aria-label="Next photo" onClick={(event) => { event.stopPropagation(); step(1); }}>›</button>
        <span className="modal-count">{String(open + 1).padStart(2, "0")} / {String(imgs.length).padStart(2, "0")}</span>
      </div>}
    </section>
  );
}
