import { EVENT } from "@/lib/event";
export function Venue({ v }: { v: { label: string; name: string; address: string } }) {
  return (<div><p className="text-xs uppercase tracking-[0.3em] text-dusty-500 mb-2">{v.label}</p><p className="font-serif text-2xl">{v.name}</p>{v.address && <p className="text-sm text-dusty-700 mt-1">{v.address}</p>}</div>);
}
export function DressCode() {
  return (<div><p className="text-xs uppercase tracking-[0.3em] text-dusty-500 mb-2">Attire</p><p className="font-serif text-2xl">{EVENT.dressCode}</p><p className="text-sm text-dusty-700 mt-1">Palette: {EVENT.color}</p></div>);
}
