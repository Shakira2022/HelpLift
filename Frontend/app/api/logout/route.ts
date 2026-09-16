import { NextRequest, NextResponse } from "next/server"
import { SESSION_COOKIE_NAME } from "@/lib/session"
import { BACKEND_TOKEN_COOKIE, BACKEND_URL } from "@/lib/backend"
export async function POST(req: NextRequest) {
  const backendToken=req.cookies.get(BACKEND_TOKEN_COOKIE)?.value
  if(backendToken){ try{ await fetch(`${BACKEND_URL}/api/users/logout`,{method:"POST",headers:{Authorization:`Bearer ${backendToken}`}}) }catch{} }
  const response=NextResponse.json({success:true,message:"Logged out"})
  for(const name of [SESSION_COOKIE_NAME,BACKEND_TOKEN_COOKIE]) response.cookies.set(name,"",{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:0})
  return response
}
