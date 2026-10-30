import RsvpForm from "@/components/template-2/RsvpForm";
import DesignShell from "@/components/template-2/MusicPlayer";
import Hero from "@/components/template-2/Hero";
import Countdown from "@/components/template-2/Countdown";
import MapSection from "@/components/template-2/MapSection";
import Gallery from "@/components/template-2/Gallery";
import Entourage from "@/components/template-2/Entourage";
import Attire from "@/components/template-2/Attire";
import Gift from "@/components/template-2/Gift";
import GoodToKnow from "@/components/template-2/GoodToKnow";
import { EVENT } from "@/lib/event";

export default function Home() {
  return (
    <div className="template-two"><DesignShell>
      <main>
        <Hero />
        <Countdown />
        <MapSection />
        <Attire />
        <Gift />
        <GoodToKnow />
        <Gallery />
        <Entourage />
        <section id="rsvp" className="scroll-mt-4 border-t border-dusty-200 bg-dusty-100 px-5 py-20 md:px-8 md:py-28" aria-labelledby="rsvp-title">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-dusty-600">07 / We would love to hear from you</p>
              <h2 id="rsvp-title" className="mt-4 font-serif text-6xl font-light leading-[0.95] tracking-[-0.04em] text-dusty-900 sm:text-7xl">Kindly <em>reply</em></h2>
              <p className="mt-8 max-w-sm text-sm leading-7 text-dusty-700">We hope you can join us as we begin this new chapter. Please let us know if you&apos;ll be celebrating with us by November 30, 2026.</p>
              <div className="mt-10 border-t border-dusty-300 pt-6">
                <p className="font-serif text-2xl italic text-dusty-800">With love,</p>
                <p className="mt-2 font-serif text-3xl text-dusty-900">{EVENT.honoree}</p>
              </div>
            </div>
            <RsvpForm variant={1} />
          </div>
        </section>
        <footer className="bg-dusty-900 px-5 py-9 text-dusty-100 md:px-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
            <p className="font-serif text-3xl font-light">{EVENT.initials}</p>
            <p className="text-[10px] uppercase tracking-[0.26em] text-dusty-300">21 December 2026 · Tacloban City</p>
            <a href="#top" className="text-[10px] uppercase tracking-[0.2em] text-dusty-100 hover:text-white">Back to top ↑</a>
          </div>
        </footer>
      </main>
    </DesignShell></div>
  );
}
