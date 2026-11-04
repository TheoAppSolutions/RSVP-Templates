import Hero from "@/components/template-3/Hero";
import Countdown from "@/components/template-3/Countdown";
import MapSection from "@/components/template-3/MapSection";
import Attire from "@/components/template-3/Attire";
import Gift from "@/components/template-3/Gift";
import GoodToKnow from "@/components/template-3/GoodToKnow";
import Gallery from "@/components/template-3/Gallery";
import RsvpForm from "@/components/template-3/RsvpForm";
import DesignShell from "@/components/template-3/MusicPlayer";
import { EVENT } from "@/lib/event";

export default function Home() {
  return (
    <DesignShell>
      <main className="wedding-site birthday-three">
        <Hero />
        <Countdown />
        <MapSection />
        <Gallery />
        <Attire />
        <GoodToKnow />
        <Gift />
        <section id="rsvp" className="rsvp-section" aria-labelledby="rsvp-title">
          <div className="rsvp-section-inner">
            <div className="rsvp-intro">
              <span className="eyebrow light">The celebration is better with you</span>
              <h2 id="rsvp-title" className="display-heading">The pleasure of your <em>company</em></h2>
              <p>We would be delighted to celebrate Lemuel&apos;s 60th birthday with you. Kindly reply by December 10, 2026.</p>
              <div className="rsvp-monogram" aria-hidden="true">{EVENT.initials}</div>
            </div>
            <RsvpForm />
          </div>
        </section>
        <footer className="site-footer">
          <div className="footer-mark">{EVENT.initials}</div>
          <p>December 21, 2026 <span aria-hidden="true">·</span> Hotel Alejandro</p>
          <p>Made with joy, for a life worth celebrating.</p>
          <a href="#top">Back to top ↑</a>
        </footer>
      </main>
    </DesignShell>
  );
}
