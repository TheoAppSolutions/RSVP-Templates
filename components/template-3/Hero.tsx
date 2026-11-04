"use client";

import { EVENT } from "@/lib/event";
import { BIRTHDAY_THEMES } from "@/lib/birthday";
import { useMusic } from "./MusicPlayer";

export default function Hero() {
  const { play } = useMusic();
  const theme = BIRTHDAY_THEMES[3];
  function goToRsvp() { play(); document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" }); }

  return (
    <header id="top" className="hero birthday-hero-three">
      <div className="birthday-three-art" aria-hidden="true"><span>60</span><i>years of wonderful</i></div>
      <nav className="site-nav" aria-label="Main navigation"><a href="#top" className="nav-brand" aria-label="Lemuel, top of page">L<span>60</span></a><div className="nav-links"><a href="#venues">The party</a><a href="#gallery">Snapshots</a><a href="#details">Good to know</a></div><button type="button" onClick={goToRsvp} className="nav-rsvp">Reply <span aria-hidden="true">↗</span></button></nav>
      <div className="hero-content"><div className="hero-copy"><p className="hero-kicker">{theme.kicker}</p><h1 aria-label={theme.title}><span>Lemuel’s</span><span className="hero-name-last"><i aria-hidden="true">✦</i>60th</span></h1><p className="hero-invite">{theme.invite}</p><div className="hero-meta"><span>{EVENT.dateLong}</span><span>{EVENT.time} · {EVENT.reception.name}</span></div><button type="button" onClick={goToRsvp} className="primary-link">Save my seat <span aria-hidden="true">↗</span></button></div></div>
      <div className="hero-bottom"><span>Lemuel <i aria-hidden="true">✦</i> 60 years</span><a href="#venues">Discover the party <span aria-hidden="true">↓</span></a></div>
    </header>
  );
}
