const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  giverId: { type: mongoose.Schema.Types.ObjectId, ref: "Giver", required: true, index: true }, title: { type: String, required: true, trim: true },
  type: { type: String, enum: ["Goods", "Service", "Services", "Money"], required: true }, category: { type: String, required: true }, description: { type: String, required: true },
  quantityValue: { type: String, default: "" }, conditions: { type: String, default: "" }, location: { type: String, default: "" }, availability: { type: String, default: "" }, expiryDate: Date,
  anonymous: { type: Boolean, default: false }, visibleToVerifiedOrganizations: { type: Boolean, default: true }, images: [{ type: String }],
  status: { type: String, enum: ["Pending Approval", "Available", "Matched", "Completed", "Rejected", "Expired", "Archived"], default: "Pending Approval", index: true },
  matchedNeedId: { type: mongoose.Schema.Types.ObjectId, ref: "Need", default: null }, matchedOrganizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", default: null },
}, { timestamps: true });
module.exports = mongoose.model("GiftOffering", schema);
