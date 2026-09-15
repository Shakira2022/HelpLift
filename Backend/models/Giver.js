const mongoose = require("mongoose");

const giverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    phone: {
      type: String
    },

    type: {
      type: String,
      enum: ["Individual", "Business"],
      required: true
    },

    preferences: {
      needTypes: {
        type: [String],
        default: []
      },

      locations: {
        type: [String],
        default: []
      }
    },

    paymentMethods: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Giver", giverSchema);