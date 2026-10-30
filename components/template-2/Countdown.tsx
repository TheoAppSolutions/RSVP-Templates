"use client";

import { useEffect, useState } from "react";
import { EVENT, EVENT_TIMESTAMP } from "@/lib/event";

export default function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setRemaining(EVENT_TIMESTAMP - Date.now());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);
  const totalSeconds = remaining === null ? 0 : Math.max(0, Math.floor(remaining / 1000));
  const parts = [
    ["Days", Math.floor(totalSeconds / 86400)],
    ["Hours", Math.floor((totalSeconds % 86400) / 3600)],
    ["Minutes", Math.floor((totalSeconds % 3600) / 60)],
    ["Seconds", totalSeconds % 60],
  ] as const;
  const passed = remaining !== null && remaining <= 0;

  return (
    <section id="countdown" className="border-y border-dusty-200 bg-dusty-100 px-6 py-9 md:py-11" aria-label="Countdown to the wedding">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_1.25fr] md:gap-16">
        <div className="text-center md:text-left">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-dusty-600">The day we say I do</p>
          <p className="mt-2 font-serif text-3xl font-light italic text-dusty-900 md:text-4xl">{EVENT.dateLong}</p>
        </div>
        {passed ? <p className="text-center font-serif text-3xl font-light italic text-dusty-800">Forever starts here</p> : (
          <div className="grid grid-cols-4 divide-x divide-dusty-300 border-x border-dusty-300" role="timer" aria-live="off">
            {parts.map(([label, value]) => (
              <div key={label} className="px-1 text-center sm:px-3">
                <p className="font-serif text-3xl font-light tabular-nums text-dusty-900 sm:text-5xl">{remaining === null ? "--" : String(value).padStart(2, "0")}</p>
                <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.18em] text-dusty-600 sm:tracking-[0.25em]">{label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
