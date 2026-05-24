import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    // --- PHASE 1: REQUEST ---
    if (action === "request") {
      // Simulate token generation and email sending
      console.log("Mock: Reset token generated for email:", body.email);
      
      return NextResponse.json({ 
          success: true, 
          message: "Token generated (Test Mode: Check console logs for token)" 
      });
    }

    // --- PHASE 2: VERIFY AND CHANGE ---
    if (action === "verify") {
      console.log("Mock: Password updated for user:", body.userId);

      return NextResponse.json({ 
          success: true, 
          message: "Password updated successfully (Test Mode)" 
      });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });

  } catch (err: any) {
    console.error("Password Change Error:", err);
    return NextResponse.json({ success: false, message: "Server error: " + err.message }, { status: 500 });
  }
}