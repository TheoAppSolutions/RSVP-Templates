"use client";

import Image from "next/image";
import { EVENT, MEDIA } from "@/lib/event";
import { useMusic } from "./MusicPlayer";

export default function Hero() {
  const { play } = useMusic();
  const groom = EVENT.groom.split(" ")[0];
  const bride = EVENT.bride.split(" ")[0];

  function goToRsvp() {
    play();
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header id="top" className="hero-two">
      <nav className="hero-two-nav" aria-label="Main navigation">
        <a href="#top" className="hero-two-brand" aria-label={`${EVENT.honoree}, back to top`}>{EVENT.initials}</a>
        <div className="hero-two-links">
          <a href="#venues">The celebration</a>
          <a href="#good-to-know">Guest notes</a>
          <a href="#gallery-title">Our story</a>
        </div>
        <button type="button" onClick={goToRsvp} className="hero-two-nav-rsvp">RSVP <span aria-hidden="true">↗</span></button>
      </nav>

      <div className="hero-two-stage">
        <div className="hero-two-photo">
          <Image src={MEDIA.hero} alt={`${EVENT.honoree} embracing outdoors`} fill priority quality={90} sizes="100vw" />
        </div>
        <span className="hero-two-photo-note">An invitation to celebrate <span aria-hidden="true">✦</span> Tacloban City</span>

        <div className="hero-two-panel">
          <div className="hero-two-main">
            <p className="hero-two-kicker">Together with their families</p>
            <h1 id="hero-title" aria-label={EVENT.honoree}>{groom} <em>&amp;</em> {bride}</h1>
            <p className="hero-two-invite">Joyfully invite you to join them as they begin their next chapter together.</p>
          </div>
          <div className="hero-two-details">
            <p className="hero-two-day">Monday <span aria-hidden="true">/</span> December 2026</p>
            <div className="hero-two-date"><strong>21</strong><span>1:30 in the afternoon<br />Tacloban City, Philippines</span></div>
            <button type="button" onClick={goToRsvp} className="hero-two-cta">Kindly respond <span aria-hidden="true">↗</span></button>
          </div>
        </div>
      </div>
    </header>
  );
}
