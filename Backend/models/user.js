const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["admin", "giver", "organization"], default: "giver", index: true },
  phone: { type: String, trim: true, default: "" },
  status: { type: String, enum: ["Active", "Suspended", "Pending"], default: "Active", index: true },
  emailVerified: { type: Boolean, default: false },
  verificationTokenHash: { type: String, select: false },
  verificationExpiresAt: { type: Date, select: false },
  resetTokenHash: { type: String, select: false },
  resetExpiresAt: { type: Date, select: false },
  profile: { type: mongoose.Schema.Types.Mixed, default: {} },
  preferences: { type: mongoose.Schema.Types.Mixed, default: {} },
  settings: { type: mongoose.Schema.Types.Mixed, default: { themeMode: "system", languagePref: "en" } },
  lastLoginAt: Date,
}, { timestamps: true, minimize: false });

userSchema.set("toJSON", { transform(_doc, ret) { delete ret.password; delete ret.verificationTokenHash; delete ret.resetTokenHash; return ret; } });
module.exports = mongoose.model("User", userSchema);
