"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { COLORS } from "@/templates/template-2/lib/colors";
import { EVENT } from "@/templates/template-2/lib/event";

const SWATCHES = [
  ["Mist", COLORS[200]],
  ["Powder", COLORS[300]],
  ["Dusty Blue", COLORS[400]],
  ["Steel", COLORS[500]],
  ["Slate", COLORS[700]],
] as const;

const ATTIRE = [
  {
    label: "Gentlemen",
    note: "Suit and tie, or a barong, paired with dress shoes.",
    image: "/attire-men.png",
    alt: "Three examples of semi-formal menswear in dusty blue, including a barong Tagalog",
  },
  {
    label: "Ladies",
    note: "Midi or cocktail dress, with heels or dressy flats.",
    image: "/attire-women.png",
    alt: "Three examples of semi-formal dresses in shades of dusty blue",
  },
];

type Hsl = { h: number; s: number; l: number };

function rgbToHsl(r: number, g: number, b: number): Hsl {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;
  const l = (max + min) / 2;
  let s = 0;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  return { h, s, l };
}

function hslToRgb({ h, s, l }: Hsl): [number, number, number] {
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const section = h / 60;
  const secondary = chroma * (1 - Math.abs((section % 2) - 1));
  let rgb: [number, number, number];

  if (section < 1) rgb = [chroma, secondary, 0];
  else if (section < 2) rgb = [secondary, chroma, 0];
  else if (section < 3) rgb = [0, chroma, secondary];
  else if (section < 4) rgb = [0, secondary, chroma];
  else if (section < 5) rgb = [secondary, 0, chroma];
  else rgb = [chroma, 0, secondary];

  const match = l - chroma / 2;
  return rgb.map((channel) => Math.round((channel + match) * 255)) as [number, number, number];
}

function hexToHsl(hex: string): Hsl {
  const value = Number.parseInt(hex.slice(1), 16);
  return rgbToHsl((value >> 16) & 255, (value >> 8) & 255, value & 255);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function OutfitImage({ src, alt, color }: { src: string; alt: string; color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d", { willReadFrequently: true });
      if (!canvas || !context) return;

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      const target = hexToHsl(color);

      for (let index = 0; index < pixels.data.length; index += 4) {
        if (pixels.data[index + 3] === 0) continue;
        const original = rgbToHsl(pixels.data[index], pixels.data[index + 1], pixels.data[index + 2]);
        // The illustrations use blue hues for fabric. Leave skin, hair, shoes and neutral clothing untouched.
        if (original.h < 175 || original.h > 255 || original.s < 0.1) continue;

        const recolored = hslToRgb({
          h: target.h,
          s: clamp(target.s * (original.s / 0.35), 0, 0.9),
          l: clamp(target.l + (original.l - 0.55) * 0.72, 0.08, 0.94),
        });
        pixels.data[index] = recolored[0];
        pixels.data[index + 1] = recolored[1];
        pixels.data[index + 2] = recolored[2];
      }

      context.putImageData(pixels, 0, 0);
      setReady(true);
    };
    image.onerror = () => setReady(false);

    return () => {
      cancelled = true;
    };
  }, [src, color]);

  return (
    <div className="relative aspect-square bg-[#e9e7e1]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 26vw, 100vw"
        className={`object-contain transition-opacity duration-200 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`${alt}. Outfit color: ${SWATCHES.find(([, value]) => value === color)?.[0] ?? "selected color"}.`}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export default function Attire() {
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[400]);
  const selectedName = SWATCHES.find(([, color]) => color === selectedColor)?.[0] ?? "Dusty Blue";

  return (
    <section className="border-y border-dusty-200 bg-dusty-100 px-5 py-20 md:px-8 md:py-28" aria-labelledby="attire-title">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:gap-16">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-dusty-600">02 / What to wear</p>
            <h2 id="attire-title" className="mt-4 font-serif text-5xl font-light tracking-[-0.035em] text-dusty-900 sm:text-6xl">Dress for <em>the day</em></h2>
            <p className="mt-5 font-serif text-2xl italic text-dusty-700">{EVENT.dressCode}</p>
            <p className="mt-6 max-w-sm text-sm leading-7 text-dusty-700">Polished and refined: dressy, but not black tie. We&apos;d love to see you in shades of our {EVENT.color.toLowerCase()} palette.</p>
            <div className="mt-9 flex flex-wrap gap-4" role="group" aria-label="Choose an attire color">
              {SWATCHES.map(([name, color]) => {
                const selected = selectedColor === color;
                return (
                  <button
                    key={name}
                    type="button"
                    aria-label={`${name} attire color`}
                    aria-pressed={selected}
                    onClick={() => setSelectedColor(color)}
                    className="group w-12 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-dusty-700 focus-visible:ring-offset-4 focus-visible:ring-offset-dusty-100 sm:w-14"
                  >
                    <span
                      className={`block h-12 w-12 border transition sm:h-14 sm:w-14 ${selected ? "border-dusty-900 ring-2 ring-dusty-900 ring-offset-2 ring-offset-dusty-100" : "border-dusty-900/15 group-hover:border-dusty-700"}`}
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                    <span className={`mt-2 block text-[9px] ${selected ? "font-medium text-dusty-900" : "text-dusty-700"}`}>{name}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-dusty-600" aria-live="polite">Selected color: {selectedName}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {ATTIRE.map(({ label, note, image, alt }) => (
              <figure key={label} className="border border-dusty-200 bg-dusty-50">
                <OutfitImage src={image} alt={alt} color={selectedColor} />
                <figcaption className="border-t border-dusty-200 px-5 py-5">
                  <p className="font-serif text-2xl text-dusty-900">{label}</p>
                  <p className="mt-2 text-xs leading-6 text-dusty-700">{note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
