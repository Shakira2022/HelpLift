const mongoose = require("mongoose");
const organizationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
  name: { type: String, required: true, trim: true },
  registrationNumber: { type: String, trim: true, index: true },
  type: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  mission: { type: String, default: "" },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, default: "" },
  contact: { type: String, default: "" },
  address: { type: String, default: "" },
  province: { type: String, default: "" },
  city: { type: String, default: "" },
  isVerified: { type: Boolean, default: false, index: true },
  verificationStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  documents: [{ name: String, url: String, status: { type: String, default: "Pending" }, uploadedAt: { type: Date, default: Date.now } }],
}, { timestamps: true });
module.exports = mongoose.model("Organization", organizationSchema);
