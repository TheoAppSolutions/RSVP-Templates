"use client";

import Image from "next/image";
import { EVENT, MEDIA } from "@/templates/template-3/lib/event";
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
    <header id="top" className="hero">
      <Image src={MEDIA.hero} alt="Raymund and Vanessa embracing outdoors" fill priority quality={90} sizes="100vw" className="hero-image" />
      <div className="hero-shade" aria-hidden="true" />

      <nav className="site-nav" aria-label="Main navigation">
        <a href="#top" className="nav-brand" aria-label={`${EVENT.honoree}, top of page`}>R<span>/</span>V</a>
        <div className="nav-links">
          <a href="#venues">The day</a>
          <a href="#gallery">Our story</a>
          <a href="#details">Details</a>
        </div>
        <button type="button" onClick={goToRsvp} className="nav-rsvp">Reply <span aria-hidden="true">↗</span></button>
      </nav>

      <div className="hero-content">
        <div className="hero-copy">
          <p className="hero-kicker">Together with their families</p>
          <h1 aria-label={EVENT.honoree}>
            <span>{groom}</span>
            <span className="hero-name-last"><i aria-hidden="true">&amp;</i>{bride}</span>
          </h1>
          <p className="hero-invite">Joyfully invite you to celebrate their wedding and the beginning of their forever.</p>
          <div className="hero-meta">
            <span>{EVENT.dateLong}</span>
            <span>{EVENT.time} · Tacloban City</span>
          </div>
          <button type="button" onClick={goToRsvp} className="primary-link">Kindly RSVP <span aria-hidden="true">↗</span></button>
        </div>
      </div>

      <div className="hero-bottom">
        <span>R &amp; V <i aria-hidden="true">✦</i> 21.12.2026</span>
        <a href="#venues">Discover the celebration <span aria-hidden="true">↓</span></a>
      </div>
    </header>
  );
}
