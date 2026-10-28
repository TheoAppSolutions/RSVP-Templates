import Image from "next/image";
import { GIFT } from "@/templates/template-2/lib/event";

function QrPlaceholder() {
  const blocks = [
    [9, 2], [11, 2], [14, 2], [8, 4], [10, 4], [13, 4], [15, 4],
    [2, 9], [4, 9], [7, 9], [9, 8], [12, 8], [14, 9], [17, 8],
    [2, 11], [5, 11], [8, 11], [10, 10], [13, 11], [15, 11], [17, 10],
    [3, 13], [6, 13], [9, 13], [11, 13], [14, 13], [16, 13],
    [8, 15], [10, 15], [13, 15], [15, 15], [17, 15],
    [9, 17], [12, 17], [14, 17], [17, 17],
  ];

  return (
    <svg viewBox="0 0 21 21" className="h-full w-full text-dusty-700" role="img" aria-label="QR code placeholder">
      <rect width="21" height="21" rx="1" fill="white" />
      {[[1, 1], [15, 1], [1, 15]].map(([x, y]) => (
        <g key={`${x}-${y}`} fill="none" stroke="currentColor">
          <rect x={x} y={y} width="5" height="5" strokeWidth="1" />
          <rect x={x + 2} y={y + 2} width="1" height="1" fill="currentColor" stroke="none" />
        </g>
      ))}
      {blocks.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />)}
      <circle cx="10.5" cy="10.5" r="2.3" fill="white" />
      <path d="M10.5 12.2c-2.6-1.45-2.8-3.1-1.45-3.55.7-.24 1.25.16 1.45.62.2-.46.75-.86 1.45-.62 1.35.45 1.15 2.1-1.45 3.55Z" fill="currentColor" />
    </svg>
  );
}

export default function Gift() {
  return (
    <section className="bg-dusty-900 px-5 py-20 text-dusty-50 md:px-8 md:py-28" aria-labelledby="gift-title">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-20">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-dusty-300">03 / A note on gifts</p>
          <h2 id="gift-title" className="mt-4 font-serif text-5xl font-light tracking-[-0.035em] sm:text-6xl">Your presence, <em>our present</em></h2>
          <div className="mt-8 h-px w-20 bg-dusty-400" aria-hidden />
          <p className="mt-8 max-w-xl text-base leading-8 text-dusty-100">{GIFT.message}</p>
          <p className="mt-6 font-serif text-xl italic text-dusty-300">Most of all, we’re grateful to celebrate this meaningful day with you.</p>
        </div>
        <div className="border border-dusty-500/40 bg-dusty-800 p-7 sm:p-9">
          <figure className="mx-auto max-w-[260px] text-center">
            <div className="border border-dusty-200 bg-white p-4">
              <div className="mx-auto aspect-square w-full max-w-[210px]">
                {GIFT.qr ? (
                  <Image src={GIFT.qr} alt="Gift QR code" width={600} height={600} className="h-full w-full object-contain" />
                ) : (
                  <QrPlaceholder />
                )}
              </div>
            </div>
            <figcaption className="mt-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-dusty-100">{GIFT.qrLabel}</p>
              {!GIFT.qr && <p className="mt-2 text-xs italic text-dusty-300">Final payment QR code coming soon</p>}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
