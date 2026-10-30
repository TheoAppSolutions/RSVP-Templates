const NOTES = [
  { title: "May I bring a plus-one?", body: "We have intentionally kept our guest list intimate so that we can celebrate with the people closest to us. Please join us only with the guest named on your invitation." },
  { title: "Can children attend?", body: "We love your little ones, but our celebration will be adults-only, with the exception of immediate family children. Thank you for understanding and helping us keep the day relaxed and intimate." },
  { title: "What about gifts?", body: "Having you with us is the greatest gift. If you would like to bless us as we begin married life, a monetary gift would be warmly appreciated—but please know that your presence means the most." },
  { title: "May I take photos?", body: "Our ceremony will be unplugged. Kindly keep phones and cameras tucked away during the ceremony, and please wait for us to share first before posting wedding photos online." },
  { title: "When should I arrive?", body: "We are grateful to everyone traveling to celebrate with us. Please arrive early enough to be seated before the ceremony begins, so we can honor the day’s timeline together." },
  { title: "Any other requests?", body: "Please save proposals, pregnancy announcements, and other major announcements for another occasion. Today is dedicated to celebrating Raymund and Vanessa." },
];

export default function GoodToKnow() {
  return (
    <section id="details" className="details-section section-pad" aria-labelledby="details-title">
      <div className="section-wrap details-layout">
        <div className="details-intro"><span className="eyebrow">04 / A few thoughtful notes</span><h2 id="details-title" className="display-heading">Good to <em>know</em></h2><p>Everything you need for a relaxed, meaningful celebration with us.</p><div className="reply-note"><strong>Kindly reply by<br />November 30, 2026</strong><span>Due to limited seating, we can reserve a seat only for guests who confirm.</span><a href="#rsvp">Confirm attendance ↗</a></div></div>
        <div className="details-list">{NOTES.map((note, index) => <details key={note.title}><summary><span>0{index + 1}</span><strong>{note.title}</strong><i aria-hidden="true">+</i></summary><p>{note.body}</p></details>)}</div>
      </div>
    </section>
  );
}
