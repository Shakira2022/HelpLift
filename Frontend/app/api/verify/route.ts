import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ success: false, message: "Token is required" }, { status: 400 });
    }

    // Since we are not using a database, we simulate a successful token check
    const isTokenValid = true;

    if (!isTokenValid) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid token. Please check your email and try again." 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Account verified successfully! (Test Mode)" 
    });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error occurred" }, { status: 500 });
  }
}