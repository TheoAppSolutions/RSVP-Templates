"use client";

import Image from "next/image";
import { EVENT, MEDIA } from "@/templates/template-2/lib/event";
import { useMusic } from "./MusicPlayer";

export default function Hero({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const { play } = useMusic();
  const groom = EVENT.groom.split(" ")[0];
  const bride = EVENT.bride.split(" ")[0];

  function goToRsvp() {
    play();
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="hero-section bg-dusty-50" aria-labelledby="hero-title">
      <header className="mx-auto flex h-[74px] max-w-[1600px] items-center justify-between border-b border-dusty-200 px-5 sm:px-9 lg:px-16">
        <a href="#top" className="font-serif text-2xl tracking-[-0.06em] text-dusty-900" aria-label="Raymund and Vanessa, back to top">R <span className="font-light italic text-dusty-500">&</span> V</a>
        <nav className="hidden items-center gap-9 text-[10px] font-medium uppercase tracking-[0.23em] text-dusty-700 md:flex" aria-label="Main navigation">
          <a href="#venues" className="transition hover:text-dusty-900">The celebration</a>
          <a href="#good-to-know" className="transition hover:text-dusty-900">Guest notes</a>
          <a href="#gallery-title" className="transition hover:text-dusty-900">Our story</a>
        </nav>
        <button type="button" onClick={goToRsvp} className="border-b border-dusty-800 pb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-dusty-900 transition hover:border-dusty-400 hover:text-dusty-600 sm:tracking-[0.23em]">RSVP <span aria-hidden>↗</span></button>
      </header>

      <div id="top" className="mx-auto grid max-w-[1600px] lg:min-h-[760px] lg:grid-cols-[48%_52%]">
        <div className="relative order-last flex flex-col justify-center px-6 pb-16 pt-14 sm:px-12 lg:order-first lg:px-16 lg:py-20 xl:px-24">
          <div className="pointer-events-none absolute bottom-8 left-6 top-8 hidden w-px bg-dusty-200 lg:block" aria-hidden />
          <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-dusty-600">Together with their families</p>
          <p className="mt-7 max-w-md font-serif text-2xl font-light italic leading-snug text-dusty-700 sm:text-3xl">Joyfully invite you to celebrate the wedding of</p>
          <h1 id="hero-title" className="mt-8 font-serif text-[clamp(4.5rem,7vw,8.4rem)] font-light leading-[0.78] tracking-[-0.065em] text-dusty-900" aria-label={EVENT.honoree}>
            <span className="block">{groom}<span className="font-light italic text-dusty-500"> &</span></span>
            <span className="mt-4 block pl-[0.06em]">{bride}</span>
          </h1>
          <div className="mt-11 h-px w-20 bg-dusty-500" aria-hidden />
          <p className="mt-6 max-w-sm text-sm leading-7 text-dusty-700">{MEDIA.tagline}</p>
          <div className="mt-10 flex flex-wrap items-end gap-x-7 gap-y-5">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-dusty-500">Monday</p>
              <p className="mt-1 font-serif text-5xl font-light leading-none text-dusty-900 sm:text-6xl">21 <span className="text-2xl italic text-dusty-500">Dec</span></p>
            </div>
            <div className="border-l border-dusty-300 pl-6 text-[11px] uppercase leading-6 tracking-[0.17em] text-dusty-700">
              <p>2026 · 1:30 in the afternoon</p>
              <p>Tacloban City, Philippines</p>
            </div>
          </div>
          <div className="mt-11 flex flex-wrap items-center gap-6">
            <button type="button" onClick={goToRsvp} className="inline-flex min-h-12 items-center justify-center gap-7 bg-dusty-900 px-7 text-[10px] font-medium uppercase tracking-[0.24em] text-white transition hover:bg-dusty-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-dusty-300">Kindly respond <span className="text-base font-light" aria-hidden>↗</span></button>
            <a href="#venues" className="border-b border-dusty-500 pb-1 text-[10px] font-medium uppercase tracking-[0.22em] text-dusty-800 transition hover:border-dusty-900">Explore the day</a>
          </div>
        </div>
        <div className="relative order-first min-h-[470px] overflow-hidden bg-dusty-200 sm:min-h-[600px] lg:order-last lg:min-h-full">
          <Image src={MEDIA.hero} alt="Raymund and Vanessa embracing outdoors" fill priority quality={90} sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" style={{ objectPosition: "42% center" }} />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-dusty-900/50 to-transparent" aria-hidden />
          <p className="absolute bottom-7 left-7 text-[10px] uppercase tracking-[0.28em] text-white sm:left-10">R & V <span className="mx-2">·</span> 21.12.26</p>
        </div>
      </div>
    </section>
  );
}
