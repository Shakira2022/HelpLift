import { NextResponse } from "next/server"
import { BACKEND_URL } from "@/lib/backend"

// Public listing — the backend's GET /api/organizations has no auth
// middleware, so this proxy needs none either.
export async function GET() {
  try {
    const r = await fetch(`${BACKEND_URL}/api/organizations`, { cache: "no-store" })
    const data = await r.json()
    return NextResponse.json(data, { status: r.status })
  } catch {
    return NextResponse.json({ success: false, message: "Organizations service is unavailable" }, { status: 503 })
  }
}
