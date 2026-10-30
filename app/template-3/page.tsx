import Hero from "@/components/template-3/Hero";
import Countdown from "@/components/template-3/Countdown";
import MapSection from "@/components/template-3/MapSection";
import Attire from "@/components/template-3/Attire";
import Gift from "@/components/template-3/Gift";
import GoodToKnow from "@/components/template-3/GoodToKnow";
import Gallery from "@/components/template-3/Gallery";
import Entourage from "@/components/template-3/Entourage";
import RsvpForm from "@/components/template-3/RsvpForm";
import DesignShell from "@/components/template-3/MusicPlayer";

export default function Home() {
  return (
    <DesignShell>
      <main className="wedding-site">
        <Hero />
        <Countdown />
        <MapSection />
        <Gallery />
        <Attire />
        <GoodToKnow />
        <Gift />
        <Entourage />
        <section id="rsvp" className="rsvp-section" aria-labelledby="rsvp-title">
          <div className="rsvp-section-inner">
            <div className="rsvp-intro">
              <span className="eyebrow light">The celebration is better with you</span>
              <h2 id="rsvp-title" className="display-heading">The pleasure of your <em>company</em></h2>
              <p>We would be honored to celebrate this day with you. Kindly reply by November 30, 2026.</p>
              <div className="rsvp-monogram" aria-hidden="true">R <span>&amp;</span> V</div>
            </div>
            <RsvpForm />
          </div>
        </section>
        <footer className="site-footer">
          <div className="footer-mark">R <span>&amp;</span> V</div>
          <p>December 21, 2026 <span aria-hidden="true">·</span> Tacloban City</p>
          <p>Made with love, for the people we love.</p>
          <a href="#top">Back to top ↑</a>
        </footer>
      </main>
    </DesignShell>
  );
}
