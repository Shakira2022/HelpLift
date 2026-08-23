
import { NextResponse } from "next/server";
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

    return NextResponse.json(
      { success: false, message: "Login is unavailable until authentication is configured." },
      { status: 503 }
    );
  } catch (err) {
    console.error("Login error:", err);

    return NextResponse.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}