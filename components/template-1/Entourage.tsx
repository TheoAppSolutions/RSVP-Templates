type Pair = readonly [string, string];

const PRINCIPAL: Pair[] = [
  ["DR. GREG L. GALOS", "DR. ROLENE PEÑAFRANCIA GALOS"],
  ["DR. MIGUEL V. DUMAS JR.", "MRS. LILY JULIANA T. DUMAS"],
  ["MR. EDWIN S. ESCULTOR", "MRS. VIVIAN G. ESCULTOR"],
  ["MR. MARK CHESTER ANTHONY G. TAMAYO", "DR. FRANCISCA SOFIA V. LILAGAN"],
  ["MR. IRWIN ROBERTO C. VILLACARILLO", "MRS. ROSANA C. VILLACARILLO"],
  ["MR. ALBERTO G. BALDESCO JR.", "MRS. MARLYN G. BALDESCO"],
  ["MR. MORTEN SAETRE", "MRS. MARIBEL N. SAETRE"],
  ["MR. YONGCHUN CAI", "MRS. MARIA MARGARITA J. CAI"],
  ["MR. PEDRO JOHN V. JATULAN", "MRS. MARGARET KIMBERLY D. CABOTE-JATULAN"],
  ["MR. EMMANUEL O. CHONG", "MRS. MONICAR M. CHONG"],
  ["MR. JOFRE M. RUALES", "MRS. JOSEPHINE M. RUALES"],
];

const SECONDARY: { role: string; pair: Pair }[] = [
  { role: "Candle", pair: ["MR. OLIVER L. COLARTE", "MRS. ANNALIZA C. COLARTE"] },
  { role: "Veil", pair: ["MR. MARK DAANTOS", "MRS. MORENA B. DAANTOS"] },
  { role: "Cord", pair: ["MR. RODERICK V. NAVERA", "MRS. JOSELITA E. NAVERA"] },
];

const HONOR: Pair[] = [["MR. AARON A. PEREZ", "MS. HARLENE G. CASTAÑARES"]];

const PARTY: Pair[] = [
  ["MR. ISIDRO VALENTINE V. JATULAN", "MS. CHERRY L. DACUNES"],
  ["MR. FRANCIS LLOYD O. NAVERA", "MS. MA. ANGELIE Q. ANINO"],
  ["MR. CHRISTIAN O. NAVERA", "MS. CARRIE KATHLYN S. IBAÑEZ"],
  ["MR. JOHN ARTHUR L. URSAL", "MS. NORAFE O. NAVERA"],
  ["MR. PAUL GIDEON D. GADUGDUG", "MS. FAITH NATHALIE D. MACABUS"],
  ["MR. EMELIO D. GADUGDUG JR.", "MS. ZEPHANIAH PRAISE D. MACABUS"],
];

const BEARERS: { role: string; names: string[] }[] = [
  { role: "Ring Bearer", names: ["KENNETH FELIX D. QUIREQUIRE"] },
  { role: "Coin Bearer", names: ["ZERR ADAM J. CRUZ"] },
  { role: "Bible Bearer", names: ["DJ T. PACAANAS"] },
  {
    role: "Flower Girls",
    names: [
      "MIREILLE A. NAVERA",
      "ELICIA VERON G. GUMBA",
      "VIRCEL Y. CABACABA",
      "BERNICE MIRACLE KYRYN A. PALATINO",
      "ELISHA ANGELY DACUNES",
    ],
  },
];

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 text-dusty-400" aria-hidden>
      <span className="h-px w-14 bg-current" />
      <span className="h-2 w-2 rotate-45 border border-current" />
      <span className="h-px w-14 bg-current" />
    </div>
  );
}

function Name({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-light leading-relaxed tracking-[0.1em] text-dusty-900 sm:text-xs">
      {children}
    </p>
  );
}

function PairRow({ pair }: { pair: Pair }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_1.5rem_minmax(0,1fr)] items-center gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] sm:gap-4">
      <Name>{pair[0]}</Name>
      <span className="font-serif text-lg italic text-dusty-400" aria-hidden>&amp;</span>
      <Name>{pair[1]}</Name>
    </div>
  );
}

function Heading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <header className="mb-7 text-center">
      {eyebrow && <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-dusty-500">{eyebrow}</p>}
      <h3 className="font-serif text-3xl font-light italic text-dusty-800 sm:text-4xl">{title}</h3>
    </header>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[2rem] border border-dusty-200 bg-white/80 px-5 py-9 shadow-[0_18px_50px_rgba(54,75,93,0.07)] sm:px-9 sm:py-11 ${className}`}>
      {children}
    </div>
  );
}

export default function Entourage() {
  return (
    <section className="relative overflow-hidden border-t border-dusty-100 bg-dusty-50 px-5 py-20 md:py-28" aria-labelledby="entourage-title">
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full border border-dusty-200/70" aria-hidden />
      <div className="absolute -right-32 bottom-52 h-96 w-96 rounded-full border border-dusty-200/70" aria-hidden />

      <div className="relative mx-auto max-w-5xl">
        <header className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <p className="text-[10px] uppercase tracking-[0.45em] text-dusty-500">Together with our families</p>
          <h2 id="entourage-title" className="mt-4 font-serif text-5xl font-light italic text-dusty-800 md:text-6xl">
            Our Entourage
          </h2>
          <div className="mt-6"><Ornament /></div>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-dusty-700">
            With heartfelt gratitude, we celebrate the family and friends standing beside us on our special day.
          </p>
        </header>

        <div className="space-y-8">
          <Panel>
            <Heading eyebrow="Our guiding witnesses" title="Principal Sponsors" />
            <div className="mx-auto max-w-3xl divide-y divide-dusty-100 text-center">
              {PRINCIPAL.map((pair) => <PairRow key={pair[0]} pair={pair} />)}
            </div>
          </Panel>

          <Panel>
            <Heading eyebrow="Ceremonial traditions" title="Secondary Sponsors" />
            <div className="grid gap-4 md:grid-cols-3">
              {SECONDARY.map(({ role, pair }) => (
                <div key={role} className="rounded-2xl bg-dusty-100/70 px-4 py-7 text-center ring-1 ring-inset ring-dusty-200/70">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-dusty-600">{role}</p>
                  <div className="mx-auto my-4 h-px w-8 bg-dusty-300" aria-hidden />
                  <div className="space-y-2">
                    <Name>{pair[0]}</Name>
                    <p className="font-serif text-base italic text-dusty-400" aria-hidden>&amp;</p>
                    <Name>{pair[1]}</Name>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <Panel className="flex flex-col justify-center">
              <Heading eyebrow="At our side" title="Best Man & Maid of Honor" />
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-dusty-500">Best Man</p>
                <div className="mt-2"><Name>{HONOR[0][0]}</Name></div>
                <div className="mx-auto my-5 h-8 w-px bg-dusty-300" aria-hidden />
                <p className="text-[10px] uppercase tracking-[0.3em] text-dusty-500">Maid of Honor</p>
                <div className="mt-2"><Name>{HONOR[0][1]}</Name></div>
              </div>
            </Panel>

            <Panel>
              <Heading eyebrow="The wedding party" title="Groomsmen & Bridesmaids" />
              <div className="mb-1 grid grid-cols-[minmax(0,1fr)_1.5rem_minmax(0,1fr)] gap-2 sm:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] sm:gap-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-dusty-500">Groomsmen</p>
                <span />
                <p className="text-[10px] uppercase tracking-[0.3em] text-dusty-500">Bridesmaids</p>
              </div>
              <div className="divide-y divide-dusty-100 text-center">
                {PARTY.map((pair) => <PairRow key={pair[0]} pair={pair} />)}
              </div>
            </Panel>
          </div>

          <Panel>
            <Heading eyebrow="Our sweetest attendants" title="The Bearers" />
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {BEARERS.map(({ role, names }) => (
                <div key={role} className="text-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-dusty-600">{role}</p>
                  <div className="mx-auto my-4 h-px w-8 bg-dusty-300" aria-hidden />
                  <div className="space-y-2">
                    {names.map((name) => <Name key={name}>{name}</Name>)}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}
