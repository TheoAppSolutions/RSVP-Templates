"use client";

import Image from "next/image";
import { EVENT, MEDIA } from "@/lib/event";
import { useMusic } from "./MusicPlayer";

export default function Hero({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const { play } = useMusic();
  const leftAligned = variant === 2;
  const groom = EVENT.groom.split(" ")[0];
  const bride = EVENT.bride.split(" ")[0];

  function goToRsvp() {
    play();
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-dusty-900 text-white md:min-h-screen">
      <Image
        src={MEDIA.hero}
        alt="Raymund and Vanessa"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover scale-[1.01]"
        style={{ objectPosition: "20% center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dusty-900/45 via-dusty-900/40 to-dusty-900/85" />
      <div className={`absolute inset-0 ${leftAligned ? "bg-gradient-to-r from-dusty-900/65 via-dusty-900/15 to-transparent" : "bg-[radial-gradient(circle_at_center,transparent_5%,rgba(38,54,68,0.28)_65%)]"}`} />
      <div className="pointer-events-none absolute inset-4 border border-white/25 sm:inset-7" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-7 h-10 w-px bg-white/45 sm:top-10" aria-hidden />

      <div className={`relative z-10 mx-auto flex w-full max-w-6xl flex-col px-8 pb-36 pt-24 sm:px-12 md:pb-40 ${leftAligned ? "items-start text-left" : "items-center text-center"}`}>
        {variant === 3 && (
          <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-white/60 bg-white/5 font-serif text-2xl tracking-[0.15em] backdrop-blur-sm">
            {EVENT.initials}
          </div>
        )}
        <p className="text-[10px] uppercase tracking-[0.5em] text-dusty-100 sm:text-xs">The wedding celebration of</p>

        <h1 className={`mt-7 font-serif font-light leading-[0.78] drop-shadow-lg ${leftAligned ? "text-6xl sm:text-7xl md:text-8xl" : "text-6xl sm:text-8xl md:text-9xl"}`} aria-label={EVENT.honoree}>
          <span className="block">{groom}</span>
          <span className={`block font-script font-normal text-dusty-200 ${leftAligned ? "my-2 ml-16 text-5xl sm:ml-24 sm:text-6xl" : "my-2 text-5xl sm:text-7xl"}`} aria-hidden>
            &amp;
          </span>
          <span className="block">{bride}</span>
        </h1>

        <p className={`mt-8 max-w-xl text-sm font-light leading-7 text-white/85 sm:text-base ${leftAligned ? "" : "mx-auto"}`}>
          {MEDIA.tagline}
        </p>

        <div className={`mt-7 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-dusty-100 sm:gap-4 sm:text-xs sm:tracking-[0.28em] ${leftAligned ? "" : "justify-center"}`}>
          <span className="hidden h-px w-10 bg-white/50 sm:block" aria-hidden />
          <span>{EVENT.dateLong}</span>
          <span className="h-1 w-1 rotate-45 bg-dusty-200" aria-hidden />
          <span>{EVENT.time}</span>
          <span className="hidden h-px w-10 bg-white/50 sm:block" aria-hidden />
        </div>

        <div className={`mt-10 flex flex-wrap gap-3 ${leftAligned ? "justify-start" : "justify-center"}`}>
          <button
            type="button"
            onClick={goToRsvp}
            className="rounded-full bg-white px-8 py-3.5 text-[10px] font-medium uppercase tracking-[0.3em] text-dusty-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-dusty-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-dusty-300"
          >
            Kindly RSVP
          </button>
          <a
            href="#venues"
            className="rounded-full border border-white/55 bg-white/10 px-8 py-3.5 text-[10px] uppercase tracking-[0.3em] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-dusty-300"
          >
            View venues
          </a>
        </div>
      </div>

      <a href="#countdown" className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 text-center text-white/70 transition hover:text-white" aria-label="Scroll to wedding countdown">
        <span className="block text-[9px] uppercase tracking-[0.4em]">Scroll</span>
        <span className="mx-auto mt-3 block h-8 w-px bg-current" aria-hidden />
      </a>
    </section>
  );
}
