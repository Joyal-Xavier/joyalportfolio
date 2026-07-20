import { NextRequest, NextResponse } from "next/server";
import { getAllEntries, upsertEntry, deleteEntry } from "@/lib/db";
import { isValidPassword } from "@/lib/auth";

// Public: anyone viewing the site can read the progress log.
export async function GET() {
  try {
    const entries = await getAllEntries();
    return NextResponse.json({ ok: true, entries });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// Admin-only: creating or updating a day's entry requires the correct password.
export async function POST(req: NextRequest) {
  try {
    const { date, text, password } = await req.json();
    if (!isValidPassword(password)) {
      return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
    }
    if (!date || typeof date !== "string" || !text || typeof text !== "string") {
      return NextResponse.json({ ok: false, error: "Missing date or text." }, { status: 400 });
    }
    await upsertEntry(date, text);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// Admin-only: deleting a day's entry requires the correct password.
export async function DELETE(req: NextRequest) {
  try {
    const { date, password } = await req.json();
    if (!isValidPassword(password)) {
      return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
    }
    if (!date || typeof date !== "string") {
      return NextResponse.json({ ok: false, error: "Missing date." }, { status: 400 });
    }
    await deleteEntry(date);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
