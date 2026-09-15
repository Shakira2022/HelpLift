const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema(
    {
        giver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        need: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Need",
            required: true
        },

        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Interest", interestSchema);