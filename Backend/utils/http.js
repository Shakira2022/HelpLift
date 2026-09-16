const mongoose = require("mongoose");
function cleanString(v){ return typeof v === "string" ? v.trim() : v; }
function isEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v||"")); }
function validId(id){ return mongoose.Types.ObjectId.isValid(id); }
function fail(res,status,message,details){ return res.status(status).json({success:false,message,...(details?{details}:{})}); }
function ok(res,data={},status=200){ return res.status(status).json({success:true,...data}); }
function asyncRoute(fn){ return (req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next); }
function parsePage(req){ const page=Math.max(1,Number(req.query.page)||1); const limit=Math.min(100,Math.max(1,Number(req.query.limit)||25)); return {page,limit,skip:(page-1)*limit}; }
module.exports={cleanString,isEmail,validId,fail,ok,asyncRoute,parsePage};
