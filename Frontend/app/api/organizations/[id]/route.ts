import { NextResponse } from "next/server"
import { BACKEND_URL } from "@/lib/backend"

// Public profile lookup — the backend's GET /api/organizations/:id has no
// auth middleware, so this proxy needs none either.
export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const r = await fetch(`${BACKEND_URL}/api/organizations/${id}`, { cache: "no-store" })
    const data = await r.json()
    return NextResponse.json(data, { status: r.status })
  } catch {
    return NextResponse.json({ success: false, message: "Organizations service is unavailable" }, { status: 503 })
  }
}
