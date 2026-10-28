import Link from "next/link";

const designs = [
  { number: "01", title: "Classic blue", description: "A romantic invitation with a full photo cover and soft blue details.", href: "/template-1", color: "from-[#d8e5ed] to-[#f3f7fa]", accent: "text-[#476279]" },
  { number: "02", title: "Editorial", description: "A warm, modern layout with elegant type and room to tell your story.", href: "/template-2", color: "from-[#e7e1d5] to-[#faf8f4]", accent: "text-[#3e5d70]" },
  { number: "03", title: "Modern heirloom", description: "A refined invitation with a split cover and thoughtful details.", href: "/template-3", color: "from-[#d9ded8] to-[#f7f5ef]", accent: "text-[#a68a69]" },
];

export default function TemplateMenu() {
  return <main className="min-h-screen bg-[#f8f7f3] px-5 py-10 text-[#243b45] sm:px-8 sm:py-16">
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-center justify-between gap-5 border-b border-[#d8d6ce] pb-7">
        <div><p className="text-[10px] uppercase tracking-[0.32em] text-[#718994]">Raymund &amp; Vanessa</p><p className="mt-2 font-serif text-3xl">Wedding invitations</p></div>
        <Link href="/admin" className="rounded-full border border-[#bfcbd0] px-5 py-2.5 text-xs font-medium transition hover:bg-white">Admin dashboard ↗</Link>
      </header>
      <div className="max-w-3xl py-14 sm:py-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#718994]">Choose a design</p>
        <h1 className="mt-5 font-serif text-5xl leading-[0.95] tracking-[-0.035em] sm:text-7xl">One celebration.<br/><em>Three ways to tell the story.</em></h1>
        <p className="mt-7 max-w-xl text-sm leading-7 text-[#597384]">Explore each invitation and choose the design that feels right. All three send replies to the same guest list and dashboard.</p>
      </div>
      <section className="grid gap-5 md:grid-cols-3" aria-label="Invitation templates">
        {designs.map((design) => <Link key={design.number} href={design.href} className="group overflow-hidden rounded-[1.5rem] border border-[#e0e3df] bg-white shadow-[0_14px_40px_rgba(36,59,69,0.06)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(36,59,69,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#476279]">
          <div className={`flex h-44 items-end bg-gradient-to-br ${design.color} p-7`}><span className={`font-serif text-7xl italic ${design.accent}`}>{design.number}</span></div>
          <div className="p-7"><h2 className="font-serif text-3xl">{design.title}</h2><p className="mt-3 min-h-16 text-sm leading-6 text-[#68777b]">{design.description}</p><span className="mt-7 inline-flex border-b border-[#a68a69] pb-1 text-[11px] uppercase tracking-[0.16em]">View template <span className="ml-5 transition group-hover:translate-x-1">↗</span></span></div>
        </Link>)}
      </section>
    </div>
  </main>;
}
