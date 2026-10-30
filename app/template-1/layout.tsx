import Link from "next/link";
import type { Metadata } from "next";
import { EVENT } from "@/lib/event";

export const metadata: Metadata = { title: `Template 1 — ${EVENT.honoree}` };

export default function TemplateLayout({ children }: { children: React.ReactNode }) {
  return <><nav className="relative z-50 flex items-center justify-between gap-4 bg-[#243b45] px-5 py-2.5 text-[11px] text-white sm:px-8" aria-label="Template navigation"><Link href="/" className="uppercase tracking-[0.15em] hover:underline">← All templates</Link><span className="uppercase tracking-[0.15em]">Template 1</span></nav>{children}</>;
}
