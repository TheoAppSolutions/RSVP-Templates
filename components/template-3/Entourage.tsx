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

function PairList({ pairs }: { pairs: Pair[] }) {
  return <div className="entourage-pairs">{pairs.map(([left, right]) => <div key={left} className="entourage-pair"><span>{left}</span><i>&amp;</i><span>{right}</span></div>)}</div>;
}

export default function Entourage() {
  return (
    <section className="entourage-section section-pad" aria-labelledby="entourage-title">
      <div className="section-wrap">
        <div className="entourage-heading"><span className="eyebrow">Together with our families</span><h2 id="entourage-title" className="display-heading">The people beside <em>us</em></h2><p>With heartfelt gratitude, we celebrate the family and friends standing with us on our special day.</p></div>
        <div className="entourage-groups">
          <details><summary><span>01</span><strong>Principal Sponsors</strong><i aria-hidden="true">+</i></summary><PairList pairs={PRINCIPAL} /></details>
          <details><summary><span>02</span><strong>Secondary Sponsors</strong><i aria-hidden="true">+</i></summary><div className="entourage-secondary">{SECONDARY.map(({ role, pair }) => <div key={role}><h3>{role}</h3><PairList pairs={[pair]} /></div>)}</div></details>
          <details><summary><span>03</span><strong>Best Man &amp; Maid of Honor</strong><i aria-hidden="true">+</i></summary><div className="entourage-honor"><div><h3>Best Man</h3><p>{HONOR[0][0]}</p></div><div><h3>Maid of Honor</h3><p>{HONOR[0][1]}</p></div></div></details>
          <details><summary><span>04</span><strong>Groomsmen &amp; Bridesmaids</strong><i aria-hidden="true">+</i></summary><PairList pairs={PARTY} /></details>
          <details><summary><span>05</span><strong>Our Little Attendants</strong><i aria-hidden="true">+</i></summary><div className="entourage-bearers">{BEARERS.map(({ role, names }) => <div key={role}><h3>{role}</h3>{names.map((name) => <p key={name}>{name}</p>)}</div>)}</div></details>
        </div>
      </div>
    </section>
  );
}
