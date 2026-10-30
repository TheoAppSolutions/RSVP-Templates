import Image from "next/image";
import { GIFT } from "@/lib/event";

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
    <section className="relative overflow-hidden bg-dusty-100 px-5 py-20 md:py-28" aria-labelledby="gift-title">
      <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full border border-dusty-300/50" aria-hidden />
      <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full border border-dusty-300/50" aria-hidden />

      <div className="relative mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/65 shadow-[0_24px_70px_rgba(54,75,93,0.11)] backdrop-blur-sm md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center px-7 py-12 text-center sm:px-12 md:px-14 md:py-16 md:text-left">
          <p className="text-[10px] uppercase tracking-[0.45em] text-dusty-500">With love and gratitude</p>
          <h2 id="gift-title" className="mt-4 font-serif text-5xl font-light italic text-dusty-800 md:text-6xl">
            {GIFT.title}
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3 text-dusty-400 md:justify-start" aria-hidden>
            <span className="h-px w-12 bg-current" />
            <span className="font-serif text-xl italic">♡</span>
            <span className="h-px w-12 bg-current" />
          </div>
          <p className="mt-6 leading-8 text-dusty-700">{GIFT.message}</p>
          <p className="mt-6 text-xs italic leading-6 text-dusty-500">
            Most of all, we’re grateful to celebrate this meaningful day with you.
          </p>
        </div>

        <div className="flex items-center justify-center border-t border-dusty-200 bg-dusty-50/80 px-7 py-12 md:border-l md:border-t-0 md:px-10 md:py-14">
          <figure className="w-full max-w-[270px] text-center">
            <div className="relative rounded-[1.75rem] border border-dusty-200 bg-white p-5 shadow-[0_18px_45px_rgba(54,75,93,0.12)]">
              <span className="absolute left-3 top-3 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-dusty-400" aria-hidden />
              <span className="absolute right-3 top-3 h-6 w-6 rounded-tr-lg border-r-2 border-t-2 border-dusty-400" aria-hidden />
              <span className="absolute bottom-3 left-3 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-dusty-400" aria-hidden />
              <span className="absolute bottom-3 right-3 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-dusty-400" aria-hidden />
              <div className="mx-auto aspect-square w-full max-w-[210px] p-2">
                {GIFT.qr ? (
                  <Image src={GIFT.qr} alt="Gift QR code" width={600} height={600} className="h-full w-full object-contain" />
                ) : (
                  <QrPlaceholder />
                )}
              </div>
            </div>
            <figcaption className="mt-5">
              <p className="text-[10px] uppercase tracking-[0.35em] text-dusty-600">{GIFT.qrLabel}</p>
              {!GIFT.qr && <p className="mt-2 text-xs italic text-dusty-500">Final payment QR code coming soon</p>}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
