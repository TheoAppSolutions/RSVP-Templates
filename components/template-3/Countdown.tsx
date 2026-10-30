"use client";

import { useEffect, useState } from "react";
import { EVENT_TIMESTAMP } from "@/lib/event";

export default function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(EVENT_TIMESTAMP - Date.now());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const total = Math.max(0, Math.floor((remaining ?? 0) / 1000));
  const parts = [
    ["days", Math.floor(total / 86400)],
    ["hours", Math.floor((total % 86400) / 3600)],
    ["minutes", Math.floor((total % 3600) / 60)],
    ["seconds", total % 60],
  ] as const;

  return (
    <section className="countdown-section" aria-label="Countdown to the wedding">
      <div className="countdown-inner">
        <p className="countdown-note">The day is drawing near <span aria-hidden="true">✦</span></p>
        {remaining !== null && remaining <= 0 ? (
          <p className="countdown-passed">Forever starts here.</p>
        ) : (
          <div className="countdown-parts" role="timer" aria-live="off">
            {parts.map(([label, value]) => (
              <div key={label} className="countdown-part">
                <strong>{remaining === null ? "--" : String(value).padStart(2, "0")}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        )}
        <a href="#venues" className="countdown-next">Explore the day <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
