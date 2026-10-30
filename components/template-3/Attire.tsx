"use client";

import Image from "next/image";
import { useState } from "react";
import { COLORS } from "@/lib/template-3-colors";
import { EVENT } from "@/lib/event";
import { ATTIRE, createSwatches } from "@/lib/attire";

const swatches = createSwatches(COLORS);

export default function Attire() {
  const [selected, setSelected] = useState<(typeof swatches)[number]>(swatches[2]);

  return (
    <section id="attire" className="attire-section section-pad" aria-labelledby="attire-title">
      <svg className="attire-filter-defs" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
        <filter id="attire-recolor" colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -4 0 4 0 0" result="blue-mask" />
          <feFlood floodColor={selected.color} floodOpacity="0.78" result="selected-color" />
          <feComposite in="selected-color" in2="blue-mask" operator="in" result="tinted-clothing" />
          <feBlend in="tinted-clothing" in2="SourceGraphic" mode="normal" />
        </filter>
      </svg>
      <div className="section-wrap attire-layout">
        <div className="attire-copy">
          <span className="eyebrow">03 / What to wear</span>
          <h2 id="attire-title" className="display-heading">Dress for the <em>occasion</em></h2>
          <p className="attire-type">{EVENT.dressCode}</p>
          <p>Polished and refined: dressy, but not black tie. We would love to see you in shades of our dusty blue palette.</p>
          <div className="swatch-list" role="group" aria-label="Choose an attire color to preview">
            {swatches.map((swatch) => <button key={swatch.name} type="button" onClick={() => setSelected(swatch)} aria-pressed={selected.name === swatch.name} aria-label={`Preview ${swatch.name} attire`} className={selected.name === swatch.name ? "selected" : ""}><span className="swatch-color" style={{ backgroundColor: swatch.color }} /><small>{swatch.name}</small></button>)}
          </div>
          <p className="swatch-feedback" aria-live="polite">Previewing <strong>{selected.name}</strong> attire</p>
        </div>
        <div className="attire-examples">
          {ATTIRE.map(({ label, note, image, alt }) => (
            <figure key={label}>
              <div><Image src={image} alt={`${alt} previewed in ${selected.name.toLowerCase()}`} width={1536} height={1024} sizes="(min-width: 900px) 25vw, 50vw" className="recolor-attire" /></div>
              <figcaption><strong>{label}</strong><span>{note}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
