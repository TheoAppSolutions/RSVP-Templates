import RsvpForm from "@/templates/template-2/components/RsvpForm";
import DesignShell from "@/templates/template-2/components/MusicPlayer";
import Hero from "@/templates/template-2/components/Hero";
import Countdown from "@/templates/template-2/components/Countdown";
import MapSection from "@/templates/template-2/components/MapSection";
import Gallery from "@/templates/template-2/components/Gallery";
import Entourage from "@/templates/template-2/components/Entourage";
import Attire from "@/templates/template-2/components/Attire";
import Gift from "@/templates/template-2/components/Gift";
import GoodToKnow from "@/templates/template-2/components/GoodToKnow";

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
                <p className="mt-2 font-serif text-3xl text-dusty-900">Raymund &amp; Vanessa</p>
              </div>
            </div>
            <RsvpForm variant={1} />
          </div>
        </section>
        <footer className="bg-dusty-900 px-5 py-9 text-dusty-100 md:px-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
            <p className="font-serif text-3xl font-light">R <em className="text-dusty-300">&</em> V</p>
            <p className="text-[10px] uppercase tracking-[0.26em] text-dusty-300">21 December 2026 · Tacloban City</p>
            <a href="#top" className="text-[10px] uppercase tracking-[0.2em] text-dusty-100 hover:text-white">Back to top ↑</a>
          </div>
        </footer>
      </main>
    </DesignShell></div>
  );
}
