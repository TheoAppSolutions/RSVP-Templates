import Hero from "@/templates/template-3/components/Hero";
import Countdown from "@/templates/template-3/components/Countdown";
import MapSection from "@/templates/template-3/components/MapSection";
import Attire from "@/templates/template-3/components/Attire";
import Gift from "@/templates/template-3/components/Gift";
import GoodToKnow from "@/templates/template-3/components/GoodToKnow";
import Gallery from "@/templates/template-3/components/Gallery";
import Entourage from "@/templates/template-3/components/Entourage";
import RsvpForm from "@/templates/template-3/components/RsvpForm";
import DesignShell from "@/templates/template-3/components/MusicPlayer";

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
