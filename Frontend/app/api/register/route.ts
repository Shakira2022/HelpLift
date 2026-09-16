import { NextResponse } from "next/server"
import { BACKEND_URL } from "@/lib/backend"
export async function POST(req: Request){ try{ const body=await req.json(); const r=await fetch(`${BACKEND_URL}/api/users/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}); const data=await r.json(); return NextResponse.json(data,{status:r.status}); }catch(e){return NextResponse.json({success:false,message:"Registration service is unavailable"},{status:503})} }
