const mongoose = require("mongoose");
const giverSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, default: "" },
  type: { type: String, enum: ["Individual", "Business", "Group"], required: true },
  preferredCategories: [{ type: String }],
  preferredLocations: [{ type: String }],
  supportTypes: [{ type: String }],
  publicDisplayName: { type: String, default: "" },
  anonymousPreference: { type: String, default: "Ask every time" },
}, { timestamps: true });
module.exports = mongoose.model("Giver", giverSchema);
