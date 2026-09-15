const mongoose = require("mongoose");
const needSchema = new mongoose.Schema({
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 180 },
  category: { type: String, required: true, trim: true, index: true },
  urgency: { type: String, enum: ["Low", "Medium", "High", "Emergency"], default: "Medium", index: true },
  location: { type: String, default: "" },
  status: { type: String, enum: ["Draft", "Pending Approval", "Open", "In Progress", "Fulfilled", "Rejected", "Archived"], default: "Pending Approval", index: true },
  progress: { type: Number, min: 0, max: 100, default: 0 },
  dueDate: Date,
  quantity: { type: String, default: "" },
  targetValue: { type: Number, min: 0, default: 0 },
  description: { type: String, required: true, maxlength: 3000 },
  approvalNote: { type: String, default: "" },
}, { timestamps: true });
module.exports = mongoose.model("Need", needSchema);
