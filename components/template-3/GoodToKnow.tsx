import { GOOD_TO_KNOW_NOTES as NOTES } from "@/lib/good-to-know";

export default function GoodToKnow() {
  return (
    <section id="details" className="details-section section-pad" aria-labelledby="details-title">
      <div className="section-wrap details-layout">
        <div className="details-intro"><span className="eyebrow">04 / A few thoughtful notes</span><h2 id="details-title" className="display-heading">Good to <em>know</em></h2><p>Everything you need for a relaxed, meaningful celebration with us.</p><div className="reply-note"><strong>Kindly reply by<br />November 30, 2026</strong><span>Due to limited seating, we can reserve a seat only for guests who confirm.</span><a href="#rsvp">Confirm attendance ↗</a></div></div>
        <div className="details-list">{NOTES.map((note, index) => <details key={note.title}><summary><span>0{index + 1}</span><strong>{note.template3Title}</strong><i aria-hidden="true">+</i></summary><p>{note.body}</p></details>)}</div>
      </div>
    </section>
  );
}
