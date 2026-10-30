import { ENTOURAGE, type Pair } from "@/lib/entourage";

const { principalSponsors: PRINCIPAL, secondarySponsors: SECONDARY, honor: HONOR, weddingParty: PARTY, bearers: BEARERS } = ENTOURAGE;

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
