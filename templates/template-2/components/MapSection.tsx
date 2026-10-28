"use client";

import { useState } from "react";
import { EVENT } from "@/templates/template-2/lib/event";

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
    <section id="venues" className="scroll-mt-4 bg-dusty-50 px-5 py-20 md:px-8 md:py-28" aria-labelledby="venues-title">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 border-b border-dusty-200 pb-9 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-dusty-600">01 / The celebration</p>
            <h2 id="venues-title" className="mt-4 font-serif text-5xl font-light leading-none tracking-[-0.035em] text-dusty-900 sm:text-6xl">Where we&apos;ll <em>gather</em></h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-dusty-700 md:ml-auto">A day of promises and celebration in Tacloban City. Find the ceremony and reception details below.</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
          <div className="divide-y divide-dusty-200 border-y border-dusty-200" role="tablist" aria-label="Wedding venues">
            {venues.map((venue, index) => {
              const active = index === activeIndex;
              return (
                <button key={venue.label} id={`venue-tab-${index}`} type="button" role="tab" aria-selected={active} aria-controls="venue-map" onClick={() => setActiveIndex(index)}
                  className={`group flex w-full gap-5 px-1 py-8 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-dusty-500 ${active ? "text-dusty-900" : "text-dusty-500 hover:text-dusty-800"}`}>
                  <span className="mt-1 font-serif text-xl italic">0{index + 1}</span>
                  <span className="block flex-1">
                    <span className="block text-[10px] font-medium uppercase tracking-[0.3em]">{venue.label}</span>
                    <span className="mt-3 block font-serif text-3xl font-light leading-tight sm:text-4xl">{venue.name}</span>
                    <span className="mt-3 block text-xs tracking-[0.07em]">{venue.address}</span>
                  </span>
                  <span className="mt-1 text-xl" aria-hidden>{active ? "↗" : "→"}</span>
                </button>
              );
            })}
            <div className="py-6 text-xs leading-6 text-dusty-600">Ceremony begins at <strong className="font-medium text-dusty-900">{EVENT.time}</strong>. Please arrive a little early to settle in.</div>
          </div>

          <div id="venue-map" role="tabpanel" aria-labelledby={`venue-tab-${activeIndex}`} className="relative min-h-[440px] overflow-hidden border border-dusty-200 bg-dusty-100 md:min-h-[530px]">
            <iframe key={mapSource} title={`Map showing ${activeVenue.name}`} src={mapSource} className="absolute inset-0 h-full w-full border-0 grayscale-[25%]" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
            <div className="absolute inset-x-4 bottom-4 border border-dusty-200 bg-dusty-50/95 p-5 backdrop-blur-sm sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-xs sm:p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-dusty-600">{activeVenue.label}</p>
              <p className="mt-2 font-serif text-2xl text-dusty-900">{activeVenue.name}</p>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${query}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex border-b border-dusty-700 pb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-dusty-800 transition hover:border-dusty-400">Get directions <span className="ml-4" aria-hidden>↗</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
