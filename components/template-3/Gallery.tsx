const MILESTONES = [["1966", "The beginning"], ["1986", "Growing into the story"], ["2006", "The years that shaped us"], ["2026", "A golden chapter"]];

export default function Gallery() {
  return (
    <section id="gallery" className="gallery-section section-pad birthday-timeline" aria-labelledby="gallery-title"><div className="section-wrap"><div className="section-heading gallery-heading"><span className="eyebrow">02 / The little moments</span><h2 id="gallery-title" className="display-heading">A glimpse into <em>six decades</em></h2><p>The laughter, milestones, and memories that make Lemuel’s life worth raising a glass to.</p></div><div className="birthday-timeline-grid">{MILESTONES.map(([year, label], index) => <article key={year} className={`birthday-timeline-card birthday-timeline-card-${index + 1}`}><span>{year}</span><h3>{label}</h3><i aria-hidden="true">✦</i></article>)}</div></div></section>
  );
}
