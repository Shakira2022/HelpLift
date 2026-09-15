const mongoose = require("mongoose");

const needSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        items: {
            type: String,
            required: true
        },

        urgency: {
            type: String,
            enum: ["low", "medium", "high"],
            required: true
        },

        location: {
            type: String,
            required: true
        },

        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true
        },

        status: {
            type: String,
            enum: ["pending", "open", "in progress", "fulfilled"],
            default: "pending"
        },

        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Need", needSchema);