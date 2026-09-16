import { NextRequest, NextResponse } from "next/server"
import { BACKEND_TOKEN_COOKIE, BACKEND_URL } from "@/lib/backend"

async function forward(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  try {
    const { path } = await context.params
    const token = req.cookies.get(BACKEND_TOKEN_COOKIE)?.value
    if (!token) return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    const url = new URL(`${BACKEND_URL}/api/platform/${path.join("/")}`)
    req.nextUrl.searchParams.forEach((value, key) => url.searchParams.append(key, value))
    const headers: Record<string, string> = { Authorization: `Bearer ${token}` }
    const contentType = req.headers.get("content-type")
    if (contentType) headers["Content-Type"] = contentType
    const hasBody = !["GET", "HEAD"].includes(req.method)
    const response = await fetch(url, { method: req.method, headers, body: hasBody ? await req.text() : undefined, cache: "no-store" })
    const text = await response.text()
    return new NextResponse(text || null, { status: response.status, headers: { "Content-Type": response.headers.get("content-type") || "application/json" } })
  } catch (error) {
    console.error("Backend proxy error:", error)
    return NextResponse.json({ success: false, message: "Backend service is unavailable" }, { status: 503 })
  }
}
export const GET = forward
export const POST = forward
export const PUT = forward
export const PATCH = forward
export const DELETE = forward
