import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
export async function POST(req: Request) {
  try {
    const b = await req.json();
    const name = String(b.name ?? "").trim().slice(0, 120);
    const message = String(b.message ?? "").trim().slice(0, 1000);
    if (!name || typeof b.attending !== "boolean") return NextResponse.json({ error: "Invalid" }, { status: 400 });
    const { error } = await getSupabase().from("raymund_vanessa_rsvp").insert({ name, message: message || null, attending: b.attending });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
