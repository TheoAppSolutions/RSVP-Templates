import RsvpForm from "@/templates/template-1/components/RsvpForm";
import DesignShell from "@/templates/template-1/components/MusicPlayer";
import Hero from "@/templates/template-1/components/Hero";
import Countdown from "@/templates/template-1/components/Countdown";
import MapSection from "@/templates/template-1/components/MapSection";
import Gallery from "@/templates/template-1/components/Gallery";
import Entourage from "@/templates/template-1/components/Entourage";
import Attire from "@/templates/template-1/components/Attire";
import Gift from "@/templates/template-1/components/Gift";
import GoodToKnow from "@/templates/template-1/components/GoodToKnow";

export default function Home() {
  return (
    <DesignShell>
      <main>
        <Hero variant={1} />
        <Countdown />
        <MapSection />
        <Attire />
        <Gift />
        <GoodToKnow />
        <Gallery />
        <Entourage />
        <section id="rsvp" className="scroll-mt-4 bg-dusty-100 px-6 py-20">
          <div className="mx-auto max-w-lg">
            <h2 className="mb-8 text-center font-serif text-4xl">Kindly Reply</h2>
            <RsvpForm variant={1} />
          </div>
        </section>
      </main>
    </DesignShell>
  );
}
