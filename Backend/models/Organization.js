const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        type: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        email: {
            type: String,
            required: true
        },

        phone: {
            type: String
        },

        address: {
            type: String
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

module.exports = mongoose.model("Organization", organizationSchema);