import { NextResponse } from "next/server";

// Mock Database (In-Memory Array)
const users: any[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, password, phone, role, university, gender, bursary } = body;

    // 1. Check if user already exists in the mock array
    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      return NextResponse.json(
        { success: false, message: "This email already exists." },
        { status: 400 }
      );
    }

    // 2. Create mock user object
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      fullName,
      email,
      password,
      phone,
      role,
      university: role === "student" ? university : null,
      gender: role === "student" ? gender : null,
      bursary: role === "student" ? bursary : null,
      email_verified: true, // Auto-verified for test mode
    };

    // 3. Store in the array
    users.push(newUser);
    
    // Log to console so you can see the "database" content in your terminal
    console.log("Mock Database Users:", users);

    // 4. Return success response
    return NextResponse.json({
      success: true,
      message: "User registered successfully (Test Mode).",
      data: newUser
    });

  } catch (err: any) {
    console.error("Server error:", err);
    return NextResponse.json(
      { success: false, message: "Server error: " + err.message }, 
      { status: 500 }
    );
  }
}