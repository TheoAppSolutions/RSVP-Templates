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
    <article className="rounded-[1.5rem] border border-dusty-200/80 bg-white/65 px-6 py-7 shadow-[0_16px_40px_rgba(54,75,93,0.07)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/85">
      <p className="text-[10px] uppercase tracking-[0.32em] text-dusty-500">{eyebrow}</p>
      <h3 className="mt-3 font-serif text-3xl font-medium leading-tight text-dusty-800">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-dusty-700">{body}</p>
    </article>
  );
}

export default function GoodToKnow() {
  return (
    <section id="good-to-know" className="relative overflow-hidden bg-dusty-100 px-5 py-20 md:py-28" aria-labelledby="good-to-know-title">
      <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full border border-dusty-300/50" aria-hidden />
      <div className="pointer-events-none absolute -bottom-36 -right-24 h-80 w-80 rounded-full border border-dusty-300/50" aria-hidden />

      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] uppercase tracking-[0.45em] text-dusty-500">Before the celebration</p>
          <h2 id="good-to-know-title" className="mt-4 font-script text-6xl font-normal leading-none text-dusty-800 sm:text-7xl">
            Good to know
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3 text-dusty-400" aria-hidden>
            <span className="h-px w-12 bg-current" />
            <span className="font-serif text-xl italic">♡</span>
            <span className="h-px w-12 bg-current" />
          </div>
          <p className="mt-6 leading-8 text-dusty-700">
            A few thoughtful notes to help us keep the day warm, meaningful, and true to the celebration we have planned.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          {NOTES.map((note) => <NoteCard key={note.title} {...note} />)}
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-dusty-300 bg-dusty-900 px-6 py-8 text-center text-white shadow-[0_20px_55px_rgba(54,75,93,0.16)] sm:px-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-dusty-200">Kindly reply by November 30, 2026</p>
          <p className="mx-auto mt-3 max-w-2xl font-serif text-2xl leading-snug text-white/95 sm:text-3xl">
            Due to limited seating, we can reserve a seat only for guests who confirm their attendance.
          </p>
          <a href="#rsvp" className="mt-6 inline-flex rounded-full bg-white px-7 py-3 text-[10px] font-medium uppercase tracking-[0.3em] text-dusty-900 transition hover:-translate-y-0.5 hover:bg-dusty-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-dusty-300">
            Confirm attendance
          </a>
        </div>
      </div>
    </section>
  );
}
