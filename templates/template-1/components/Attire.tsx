"use client";

import Image from "next/image";
import { useState } from "react";
import { COLORS } from "@/templates/template-1/lib/colors";
import { EVENT } from "@/templates/template-1/lib/event";

const SWATCHES = [
  { name: "Mist", color: COLORS[200] },
  { name: "Powder", color: COLORS[300] },
  { name: "Dusty Blue", color: COLORS[400] },
  { name: "Steel", color: COLORS[500] },
  { name: "Slate", color: COLORS[700] },
] as const;

// Match the luminance of the original dusty blue fabric while replacing its hue.
const ORIGINAL_FABRIC_LUMINANCE = 0.66;

function recolorMatrix(color: string) {
  const channels = [1, 3, 5].map((offset) =>
    parseInt(color.slice(offset, offset + 2), 16) / 255 / ORIGINAL_FABRIC_LUMINANCE,
  );
  return channels
    .map((channel) =>
      [0.2126, 0.7152, 0.0722].map((weight) => (channel * weight).toFixed(4)).join(" ") + " 0 0",
    )
    .concat("0 0 0 1 0")
    .join(" ");
}

const ATTIRE = [
  {
    label: "Gentlemen",
    note: "Suit and tie, or a barong, paired with dress shoes.",
    image: "/attire-men.webp",
    alt: "Three examples of semi-formal menswear, including a barong Tagalog",
  },
  {
    label: "Ladies",
    note: "Midi or cocktail dress, with heels or dressy flats.",
    image: "/attire-women.webp",
    alt: "Three examples of semi-formal dresses",
  },
];

export default function Attire() {
  const [selected, setSelected] = useState<(typeof SWATCHES)[number]>(SWATCHES[2]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-center md:py-28">
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <filter id="attire-recolor" colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceGraphic" type="matrix" values={recolorMatrix(selected.color)} result="tinted" />
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2 -1 3 0 0"
            result="blue-mask"
          />
          <feComponentTransfer in="blue-mask" result="fabric-mask">
            <feFuncA type="linear" slope="2" intercept="-0.12" />
          </feComponentTransfer>
          <feComposite in="tinted" in2="fabric-mask" operator="in" result="recolored-fabric" />
          <feComposite in="recolored-fabric" in2="SourceGraphic" operator="over" />
        </filter>
      </svg>
      <p className="text-xs uppercase tracking-[0.4em] text-dusty-500">Dress Code</p>
      <h2 className="mt-3 font-serif text-5xl font-light italic text-dusty-800 md:text-6xl">
        {EVENT.dressCode}
      </h2>
      <div className="mt-5 flex items-center justify-center gap-3 text-dusty-400" aria-hidden>
        <span className="h-px w-12 bg-current" />
        <span className="h-1.5 w-1.5 rotate-45 bg-current" />
        <span className="h-px w-12 bg-current" />
      </div>
      <p className="mx-auto mt-5 max-w-xl leading-relaxed text-dusty-700">
        Polished and refined: dressy, but not black-tie. We&apos;d love to see you in shades of our {EVENT.color.toLowerCase()} palette.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-5" role="group" aria-label="Choose an attire color to preview">
        {SWATCHES.map((swatch) => (
          <button
            key={swatch.name}
            type="button"
            aria-label={`Preview ${swatch.name} attire`}
            aria-pressed={selected.name === swatch.name}
            onClick={() => setSelected(swatch)}
            className="group w-16 cursor-pointer rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dusty-700"
          >
            <span
              className={`mx-auto block h-12 w-12 rounded-full ring-4 shadow-md transition-transform duration-300 group-hover:-translate-y-1 ${selected.name === swatch.name ? "ring-dusty-700" : "ring-white"}`}
              style={{ backgroundColor: swatch.color }}
            />
            <span className="mt-2 block text-[10px] text-dusty-700">{swatch.name}</span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-dusty-700" aria-live="polite">Previewing {selected.name} attire</p>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {ATTIRE.map(({ label, note, image, alt }) => (
          <figure
            key={label}
            className="overflow-hidden rounded-[2rem] border border-dusty-200 bg-white/70 shadow-[0_20px_55px_rgba(54,75,93,0.10)]"
          >
            <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden bg-dusty-100">
              <div className="absolute inset-x-10 bottom-5 h-10 rounded-full bg-dusty-700/10 blur-xl" aria-hidden />
              <Image
                src={image}
                alt={`${alt}, previewed in ${selected.name.toLowerCase()}`}
                width={1536}
                height={1024}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="relative h-full w-full object-contain"
                style={{ filter: "url(#attire-recolor)" }}
              />
            </div>
            <figcaption className="border-t border-dusty-200 px-6 py-6">
              <p className="text-xs uppercase tracking-[0.3em] text-dusty-600">{label}</p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-dusty-700">{note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
