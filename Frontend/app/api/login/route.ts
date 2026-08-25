import { NextResponse } from "next/server";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/session";

// The real backend (Backend/routes/userRoutes.js) now owns the user
// database (MongoDB) and password verification. This route no longer
// checks credentials itself — it forwards the request there, then
// wraps the result in our own signed session cookie so proxy.ts can
// keep verifying requests without calling the backend on every load.
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // 2. Delegate credential checking to the real backend
    let backendData: any;
    try {
      const backendResponse = await fetch(`${BACKEND_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      backendData = await backendResponse.json();

      if (!backendResponse.ok) {
        return NextResponse.json(
          {
            success: false,
            message: backendData?.message || "Invalid email or password",
          },
          { status: backendResponse.status }
        );
      }
    } catch (networkErr) {
      console.error("Backend login request failed:", networkErr);
      return NextResponse.json(
        {
          success: false,
          message: "Login is unavailable right now. Please try again shortly.",
        },
        { status: 503 }
      );
    }

    // 3. The backend's user object uses `name`; the frontend (login
    // page) reads `fullName`. Normalize the shape here so nothing on
    // the frontend needs to change.
    const safeUser = {
      id: backendData.user.id,
      email: backendData.user.email,
      fullName: backendData.user.name,
      role: backendData.user.role as "giver" | "organization" | "admin",
    };

    // 4. Issue our own signed session cookie.
    const token = await createSessionToken({
      userId: safeUser.id,
      role: safeUser.role,
      email: safeUser.email,
      fullName: safeUser.fullName,
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: safeUser,
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);

    return NextResponse.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
