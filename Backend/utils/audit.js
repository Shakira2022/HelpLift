const { ActivityLog } = require("../models/Platform");
module.exports = async function audit(req, action, entityType, entityId, details={}) {
  try { await ActivityLog.create({userId:req.user?._id,action,entityType,entityId:String(entityId||""),details,ip:req.ip}); } catch(e) { console.error("Audit log failed:", e.message); }
};
