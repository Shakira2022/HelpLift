import { NextResponse } from "next/server"
import { BACKEND_URL } from "@/lib/backend"
export async function POST(req: Request){ try{const body=await req.json();const r=await fetch(`${BACKEND_URL}/api/users/verify`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});return NextResponse.json(await r.json(),{status:r.status})}catch{return NextResponse.json({success:false,message:"Verification service is unavailable"},{status:503})} }
