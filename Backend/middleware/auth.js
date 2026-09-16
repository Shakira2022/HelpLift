const jwt=require("jsonwebtoken");
const User=require("../models/user");
const { Session }=require("../models/Platform");
const { fail }=require("../utils/http");
async function auth(req,res,next){
 try{
  const h=req.headers.authorization||""; const token=h.startsWith("Bearer ")?h.slice(7):null;
  if(!token) return fail(res,401,"Authentication required");
  const payload=jwt.verify(token,process.env.JWT_SECRET||"dev-jwt-secret-change-me");
  if(payload.jti){ const s=await Session.findOne({tokenId:payload.jti,revokedAt:null,expiresAt:{$gt:new Date()}}).lean(); if(!s) return fail(res,401,"Session expired or revoked"); }
  const user=await User.findById(payload.id);
  if(!user) return fail(res,401,"Account not found");
  if(user.status==="Suspended") return fail(res,403,"Account suspended");
  req.user=user; req.auth=payload; next();
 }catch(e){ return fail(res,401,"Invalid or expired authentication token"); }
}
function roles(...allowed){ return (req,res,next)=> allowed.includes(req.user?.role)?next():fail(res,403,"You do not have permission to perform this action"); }
module.exports={auth,roles};
