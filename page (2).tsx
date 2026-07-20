import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (isValidPassword(body?.password)) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
