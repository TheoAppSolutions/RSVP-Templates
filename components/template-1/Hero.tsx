"use client";

import { EVENT } from "@/lib/event";
import { BIRTHDAY_THEMES } from "@/lib/birthday";
import { useMusic } from "./MusicPlayer";

export default function Hero({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const { play } = useMusic();
  const theme = BIRTHDAY_THEMES[variant];

  function goToRsvp() {
    play();
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="birthday-hero birthday-hero-one relative flex min-h-[92svh] items-center overflow-hidden bg-dusty-900 text-white md:min-h-screen">
      <div className="birthday-confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
      <div className="birthday-sun" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-4 border border-white/35 sm:inset-7" aria-hidden />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-8 pb-32 pt-24 sm:px-12 md:pb-40">
        <p className="text-[10px] uppercase tracking-[0.5em] text-dusty-100 sm:text-xs">{theme.kicker}</p>
        <div className="mt-7 flex flex-wrap items-end gap-x-5 gap-y-1"><h1 className="font-serif text-7xl font-light leading-[0.8] tracking-[-0.06em] sm:text-9xl">Lemuel</h1><span className="font-script text-5xl text-dusty-200 sm:text-7xl">turns</span><span className="font-serif text-8xl font-light leading-[0.75] text-dusty-100 sm:text-[10rem]">{theme.age}</span></div>
        <p className="mt-8 max-w-xl text-sm font-light leading-7 text-white/85 sm:text-base">{theme.invite}</p>
        <div className="mt-7 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-dusty-100 sm:gap-4 sm:text-xs sm:tracking-[0.28em]"><span className="hidden h-px w-10 bg-white/50 sm:block" aria-hidden /><span>{EVENT.dateLong}</span><span className="h-1 w-1 rotate-45 bg-dusty-200" aria-hidden /><span>{EVENT.time}</span><span className="hidden h-px w-10 bg-white/50 sm:block" aria-hidden /></div>
        <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/65">{EVENT.reception.name} · {EVENT.reception.address}</p>
        <div className="mt-10 flex flex-wrap gap-3"><button type="button" onClick={goToRsvp} className="rounded-full bg-white px-8 py-3.5 text-[10px] font-medium uppercase tracking-[0.3em] text-dusty-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-dusty-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-dusty-300">Save my seat</button><a href="#venues" className="rounded-full border border-white/55 bg-white/10 px-8 py-3.5 text-[10px] uppercase tracking-[0.3em] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-dusty-300">Party details</a></div>
      </div>
      <a href="#countdown" className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 text-center text-white/70 transition hover:text-white" aria-label="Scroll to birthday countdown"><span className="block text-[9px] uppercase tracking-[0.4em]">Scroll</span><span className="mx-auto mt-3 block h-8 w-px bg-current" aria-hidden /></a>
    </section>
  );
}
