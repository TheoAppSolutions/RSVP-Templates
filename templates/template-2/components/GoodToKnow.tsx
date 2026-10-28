const NOTES = [
  {
    eyebrow: "Guest list",
    title: "May I bring a plus-one?",
    body: "We have intentionally kept our guest list intimate so that we can celebrate with the people closest to us. Please join us only with the guest named on your invitation.",
  },
  {
    eyebrow: "A little ones note",
    title: "Can children attend?",
    body: "We love your little ones, but our celebration will be adults-only, with the exception of immediate family children. Thank you for understanding and helping us keep the day relaxed and intimate.",
  },
  {
    eyebrow: "Gift guide",
    title: "Your presence is enough",
    body: "Having you with us is the greatest gift. If you would like to bless us as we begin married life, a monetary gift would be warmly appreciated—but please know that your presence means the most.",
  },
  {
    eyebrow: "Privacy notice",
    title: "Be fully present with us",
    body: "Our ceremony will be unplugged. Kindly keep phones and cameras tucked away during the ceremony, and please wait for us to share first before posting wedding photos online.",
  },
  {
    eyebrow: "Time observance",
    title: "We will begin on time",
    body: "We are grateful to everyone traveling to celebrate with us. Please arrive early enough to be seated before the ceremony begins, so we can honor the day’s timeline together.",
  },
  {
    eyebrow: "Occasion focus",
    title: "Today is about the couple",
    body: "Please save proposals, pregnancy announcements, and other major announcements for another occasion. Today is dedicated to celebrating Raymund and Vanessa.",
  },
];

function NoteCard({ eyebrow, title, body }: (typeof NOTES)[number]) {
  return (
    <article className="border-t border-dusty-300 py-7 sm:py-8">
      <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-dusty-600">{eyebrow}</p>
      <h3 className="mt-3 font-serif text-3xl font-light leading-tight text-dusty-900">{title}</h3>
      <p className="mt-4 max-w-lg text-sm leading-7 text-dusty-700">{body}</p>
    </article>
  );
}

export default function GoodToKnow() {
  return (
    <section id="good-to-know" className="bg-dusty-50 px-5 py-20 md:px-8 md:py-28" aria-labelledby="good-to-know-title">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-7 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-dusty-600">04 / Before the celebration</p>
            <h2 id="good-to-know-title" className="mt-4 font-serif text-5xl font-light tracking-[-0.035em] text-dusty-900 sm:text-6xl">Good to <em>know</em></h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-dusty-700 md:ml-auto">
            A few thoughtful notes to help us keep the day warm, meaningful, and true to the celebration we have planned.
          </p>
        </div>

        <div className="mt-12 grid gap-x-12 md:grid-cols-2">
          {NOTES.map((note) => <NoteCard key={note.title} {...note} />)}
        </div>

        <div className="mt-10 grid gap-7 border-y border-dusty-300 py-8 md:grid-cols-[0.35fr_1fr_auto] md:items-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-dusty-600">Kindly reply by<br />November 30, 2026</p>
          <p className="max-w-2xl font-serif text-2xl leading-snug text-dusty-900 sm:text-3xl">
            Due to limited seating, we can reserve a seat only for guests who confirm their attendance.
          </p>
          <a href="#rsvp" className="inline-flex w-fit border-b border-dusty-800 pb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-dusty-900 transition hover:border-dusty-400">
            Confirm attendance ↗
          </a>
        </div>
      </div>
    </section>
  );
}
