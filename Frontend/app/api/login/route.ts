
import { NextResponse } from "next/server";


type MockUser = {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: "giver" | "organization" | "admin";
  themeMode: "light" | "dark";
};

const MOCK_USERS: MockUser[] = [
  {
    id: "giver_user_001",
    email: "giver@example.com",
    password: "password123",
    fullName: "Test Giver",
    role: "giver",
    themeMode: "light",
  },
  {
    id: "organization_user_001",
    email: "organization@example.com",
    password: "password123",
    fullName: "Hope Academy Foundation",
    role: "organization",
    themeMode: "light",
  },
  {
    id: "admin_user_001",
    email: "admin@example.com",
    password: "password123",
    fullName: "Test Admin",
    role: "admin",
    themeMode: "light",
  },
];

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

    // 2. Find user by email and password
    const user = MOCK_USERS.find(
      (mockUser) =>
        mockUser.email.toLowerCase() === String(email).toLowerCase().trim() &&
        mockUser.password === password
    );

    // 3. Invalid login
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 4. Remove password before returning response
    const { password: _password, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      message: "Login successful (Test Mode)",
      user: safeUser,
    });
  } catch (err) {
    console.error("Login error:", err);

    return NextResponse.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}