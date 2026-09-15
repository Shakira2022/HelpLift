import { NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/lib/session";
import { BACKEND_TOKEN_COOKIE, BACKEND_URL } from "@/lib/backend";

export async function POST(req: Request) {
  try {
    const { email, password, deviceId, location } = await req.json();
    if (!email || !password) return NextResponse.json({ success:false, message:"Email and password are required" }, { status:400 });
    let backendResponse: Response;
    try { backendResponse = await fetch(`${BACKEND_URL}/api/users/login`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({email,password,deviceId,location}), cache:"no-store" }); }
    catch { return NextResponse.json({success:false,message:"Login is unavailable right now. Please try again shortly."},{status:503}); }
    const backendData = await backendResponse.json();
    if (!backendResponse.ok) return NextResponse.json({success:false,message:backendData?.message||"Invalid email or password"},{status:backendResponse.status});
    const safeUser={id:backendData.user.id,email:backendData.user.email,fullName:backendData.user.name,role:backendData.user.role};
    const token=await createSessionToken({userId:safeUser.id,role:safeUser.role,email:safeUser.email,fullName:safeUser.fullName});
    const response=NextResponse.json({success:true,message:"Login successful",user:safeUser});
    response.cookies.set(SESSION_COOKIE_NAME,token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:SESSION_MAX_AGE_SECONDS});
    response.cookies.set(BACKEND_TOKEN_COOKIE,backendData.token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:SESSION_MAX_AGE_SECONDS});
    return response;
  } catch(err){ console.error("Login error:",err); return NextResponse.json({success:false,message:"Server error occurred"},{status:500}); }
}
