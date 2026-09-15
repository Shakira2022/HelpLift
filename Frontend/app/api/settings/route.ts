import { NextRequest, NextResponse } from "next/server"
import { BACKEND_TOKEN_COOKIE, BACKEND_URL } from "@/lib/backend"
export async function PUT(req: NextRequest){
  const token=req.cookies.get(BACKEND_TOKEN_COOKIE)?.value
  if(!token) return NextResponse.json({success:false,message:"Authentication required"},{status:401})
  try{
    const body=await req.json()
    const response=await fetch(`${BACKEND_URL}/api/users/me`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},body:JSON.stringify({settings:{themeMode:body.themeMode,languagePref:body.languagePref}})})
    return NextResponse.json(await response.json(),{status:response.status})
  }catch{return NextResponse.json({success:false,message:"Settings service is unavailable"},{status:503})}
}
