"use client";

import { useState } from "react";
import { EVENT } from "@/lib/event";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function MapSection() {
  const venues = [EVENT.ceremony, EVENT.reception];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVenue = venues[activeIndex];
  const query = encodeURIComponent(activeVenue.address ? `${activeVenue.name}, ${activeVenue.address}` : activeVenue.name);
  const mapSource = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}`
    : `https://maps.google.com/maps?q=${query}&output=embed`;

  return (
    <section id="venues" className="scroll-mt-4 bg-dusty-50 px-5 pb-24 pt-20 md:pb-28 md:pt-24" aria-labelledby="venues-title">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] uppercase tracking-[0.45em] text-dusty-500">Join us in Tacloban City</p>
          <h2 id="venues-title" className="mt-4 font-serif text-5xl font-light italic text-dusty-800 md:text-6xl">The Venues</h2>
          <div className="mt-6 flex items-center justify-center gap-3 text-dusty-400" aria-hidden>
            <span className="h-px w-14 bg-current" />
            <span className="h-2 w-2 rotate-45 border border-current" />
            <span className="h-px w-14 bg-current" />
          </div>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label="Wedding venues">
            {venues.map((venue, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={venue.label}
                  id={`venue-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="venue-map"
                  onClick={() => setActiveIndex(index)}
                  className={`group relative overflow-hidden rounded-[1.5rem] border px-6 py-7 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-dusty-300 ${active ? "border-dusty-600 bg-dusty-700 text-white shadow-[0_18px_45px_rgba(54,75,93,0.18)]" : "border-dusty-200 bg-white/80 text-dusty-800 hover:-translate-y-1 hover:border-dusty-400 hover:bg-white hover:shadow-lg"}`}
                >
                  <span className={`absolute right-5 top-4 font-serif text-5xl font-light ${active ? "text-white/10" : "text-dusty-100"}`} aria-hidden>
                    0{index + 1}
                  </span>
                  <span className={`relative block text-[9px] uppercase tracking-[0.4em] ${active ? "text-dusty-200" : "text-dusty-500"}`}>{venue.label}</span>
                  <span className="relative mt-3 block font-serif text-2xl font-light leading-tight sm:text-3xl">{venue.name}</span>
                  <span className={`relative mt-3 block text-xs tracking-[0.12em] ${active ? "text-white/65" : "text-dusty-600"}`}>{venue.address}</span>
                  <span className={`relative mt-6 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] ${active ? "text-white" : "text-dusty-500"}`}>
                    {active ? "Showing on map" : "View location"}
                    <span aria-hidden>→</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div id="venue-map" role="tabpanel" aria-labelledby={`venue-tab-${activeIndex}`} className="relative min-h-[430px] overflow-hidden rounded-[2rem] border-8 border-white bg-dusty-200 shadow-[0_22px_60px_rgba(54,75,93,0.14)] md:min-h-[520px]">
            <iframe
              key={mapSource}
              title={`Map showing ${activeVenue.name}`}
              src={mapSource}
              className="absolute inset-0 h-full w-full border-0 grayscale-[20%]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur-md sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-xs sm:p-5">
              <p className="text-[9px] uppercase tracking-[0.35em] text-dusty-500">{activeVenue.label}</p>
              <p className="mt-1 font-serif text-xl text-dusty-900">{activeVenue.name}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${query}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-dusty-700 px-5 py-2.5 text-[9px] uppercase tracking-[0.25em] text-white transition hover:bg-dusty-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-dusty-300"
              >
                Get directions <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
