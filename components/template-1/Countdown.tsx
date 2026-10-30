"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/event";

const target = new Date(EVENT.dateISO).getTime();

export default function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(target - Date.now());
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
    <section id="countdown" className="relative z-20 -mt-16 px-5" aria-label="Countdown to the wedding">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/95 shadow-[0_24px_70px_rgba(54,75,93,0.18)] backdrop-blur-md">
        <div className="grid md:grid-cols-[0.75fr_1.25fr]">
          <div className="flex flex-col justify-center bg-dusty-700 px-7 py-8 text-center text-white md:px-10 md:text-left">
            <p className="text-[9px] uppercase tracking-[0.4em] text-dusty-200">Save the date</p>
            <p className="mt-3 font-serif text-3xl font-light italic sm:text-4xl">{EVENT.dateShort}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/70">{EVENT.time}</p>
          </div>

          <div className="px-4 py-8 sm:px-8">
            <p className="mb-5 text-center text-[9px] uppercase tracking-[0.38em] text-dusty-500">
              {passed ? "The celebration has begun" : "Until we say I do"}
            </p>
            {passed ? (
              <p className="text-center font-serif text-3xl font-light italic text-dusty-800 md:text-4xl">Forever starts here</p>
            ) : (
              <div className="grid grid-cols-4 divide-x divide-dusty-200" role="timer" aria-live="off">
                {parts.map(([label, value]) => (
                  <div key={label} className="px-1 text-center sm:px-3">
                    <p className="font-serif text-3xl font-light tabular-nums text-dusty-800 sm:text-5xl">
                      {remaining === null ? "--" : String(value).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-dusty-500 sm:text-[10px] sm:tracking-[0.25em]">{label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
