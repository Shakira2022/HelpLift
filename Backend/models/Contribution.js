const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  needId: { type: mongoose.Schema.Types.ObjectId, ref: "Need", required: true, index: true }, giverId: { type: mongoose.Schema.Types.ObjectId, ref: "Giver", required: true, index: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true, index: true },
  type: { type: String, enum: ["Money", "Goods", "Service", "Services"], default: "Money" }, amount: { type: Number, min: 0, default: 0 }, valueText: { type: String, default: "" },
  anonymous: { type: Boolean, default: false }, requestReceipt: { type: Boolean, default: true }, message: { type: String, default: "" },
  status: { type: String, enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"], default: "Pending", index: true },
  receiptNumber: String, receiptUrl: String,
}, { timestamps: true });
module.exports = mongoose.model("Contribution", schema);
