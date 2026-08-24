import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/session";

// The session cookie is httpOnly, so client-side JS (localStorage.removeItem
// etc.) cannot clear it directly. Dashboards must call this route on logout
// before redirecting, or the middleware will keep treating the user as
// signed in on their next request.
export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out" });

  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
