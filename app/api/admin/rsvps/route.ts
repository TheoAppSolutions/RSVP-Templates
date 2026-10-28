import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || req.headers.get("x-admin-password") !== pw) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await getSupabase().from("raymund_vanessa_rsvp").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: "Server error" }, { status: 500 });
  return NextResponse.json({ rsvps: data });
}

export async function DELETE(req: Request) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || req.headers.get("x-admin-password") !== pw) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const id = typeof body.id === "string" ? body.id : "";
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidPattern.test(id)) {
      return NextResponse.json({ error: "Invalid RSVP id" }, { status: 400 });
    }

    const { data, error } = await getSupabase().from("raymund_vanessa_rsvp").delete().eq("id", id).select("id").maybeSingle();
    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
    if (!data) return NextResponse.json({ error: "RSVP not found" }, { status: 404 });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
