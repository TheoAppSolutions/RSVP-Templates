"use client";

import Image from "next/image";
import { EVENT, MEDIA } from "@/templates/template-3/lib/event";
import { useMusic } from "./MusicPlayer";

export default function Hero() {
  const { play } = useMusic();

  function goToRsvp() {
    play();
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header id="top" className="hero">
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#top" className="nav-brand" aria-label="Raymund and Vanessa, top of page">R<span>&amp;</span>V</a>
        <div className="nav-links">
          <a href="#venues">The day</a>
          <a href="#gallery">Our story</a>
          <a href="#details">Details</a>
        </div>
        <button type="button" onClick={goToRsvp} className="nav-rsvp">RSVP <span aria-hidden="true">↗</span></button>
      </nav>

      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-copy-inner">
            <span className="eyebrow">With joyful hearts &amp; grateful souls</span>
            <p className="hero-preface">Together with their families,</p>
            <h1 aria-label={EVENT.honoree}>
              <span>Raymund</span>
              <i aria-hidden="true">&amp;</i>
              <span>Vanessa</span>
            </h1>
            <p className="hero-invite">invite you to celebrate their wedding</p>
            <div className="hero-rule" aria-hidden="true"><span>✦</span></div>
            <div className="hero-date">
              <span>Monday</span>
              <strong>21</strong>
              <span>December<br />2026</span>
            </div>
            <p className="hero-location">1:30 in the afternoon <span aria-hidden="true">·</span> Tacloban City</p>
            <button type="button" onClick={goToRsvp} className="primary-link">Kindly RSVP <span aria-hidden="true">↗</span></button>
          </div>
          <span className="hero-edition">A celebration of love <span>—</span> 2026</span>
        </div>
        <div className="hero-photo">
          <Image src={MEDIA.hero} alt="Raymund and Vanessa embracing outdoors" fill priority quality={90} sizes="(min-width: 900px) 52vw, 100vw" className="hero-image" />
          <div className="photo-caption">Raymund <span>&amp;</span> Vanessa <i>·</i> December 21, 2026</div>
        </div>
      </div>
    </header>
  );
}
