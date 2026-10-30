import RsvpForm from "@/components/template-1/RsvpForm";
import DesignShell from "@/components/template-1/MusicPlayer";
import Hero from "@/components/template-1/Hero";
import Countdown from "@/components/template-1/Countdown";
import MapSection from "@/components/template-1/MapSection";
import Gallery from "@/components/template-1/Gallery";
import Entourage from "@/components/template-1/Entourage";
import Attire from "@/components/template-1/Attire";
import Gift from "@/components/template-1/Gift";
import GoodToKnow from "@/components/template-1/GoodToKnow";

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
