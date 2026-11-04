"use client";

import { EVENT } from "@/lib/event";
import { BIRTHDAY_THEMES } from "@/lib/birthday";
import { useMusic } from "./MusicPlayer";

export default function Hero() {
  const { play } = useMusic();
  const theme = BIRTHDAY_THEMES[2];
  function goToRsvp() { play(); document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" }); }

  return (
    <header id="top" className="hero-two birthday-editorial">
      <nav className="hero-two-nav" aria-label="Main navigation"><a href="#top" className="hero-two-brand" aria-label="Lemuel, back to top">L<span>18</span></a><div className="hero-two-links"><a href="#venues">The celebration</a><a href="#good-to-know">Guest notes</a><a href="#gallery-title">Snapshots</a></div><button type="button" onClick={goToRsvp} className="hero-two-nav-rsvp">RSVP <span aria-hidden="true">↗</span></button></nav>
      <div className="hero-two-stage">
        <div className="birthday-editorial-art" aria-hidden="true"><span>18</span><i>birthday</i></div>
        <span className="hero-two-photo-note">An invitation to celebrate <span aria-hidden="true">✦</span> Lemuel</span>
        <div className="hero-two-panel"><div className="hero-two-main"><p className="hero-two-kicker">{theme.kicker}</p><h1 id="hero-title" aria-label={theme.title}>Lemuel <em>turns</em> 18</h1><p className="hero-two-invite">{theme.invite}</p></div><div className="hero-two-details"><p className="hero-two-day">Monday <span aria-hidden="true">/</span> December 2026</p><div className="hero-two-date"><strong>18</strong><span>{EVENT.time}<br />{EVENT.reception.name}, {EVENT.reception.address}</span></div><button type="button" onClick={goToRsvp} className="hero-two-cta">Save my seat <span aria-hidden="true">↗</span></button></div></div>
      </div>
    </header>
  );
}
