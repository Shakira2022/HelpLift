const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  needId: { type: mongoose.Schema.Types.ObjectId, ref: "Need", required: true, index: true },
  giverId: { type: mongoose.Schema.Types.ObjectId, ref: "Giver", required: true, index: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true, index: true },
  supportType: { type: String, enum: ["Money", "Goods", "Service", "Services"], required: true },
  description: { type: String, default: "" }, quantityValue: { type: String, default: "" }, availability: { type: String, default: "" },
  deliveryPreference: { type: String, default: "" }, anonymous: { type: Boolean, default: false }, message: { type: String, default: "" },
  status: { type: String, enum: ["Pending", "Accepted", "Declined", "Completed", "Cancelled"], default: "Pending", index: true },
}, { timestamps: true });
schema.index({ needId: 1, giverId: 1, status: 1 });
module.exports = mongoose.model("Interest", schema);
