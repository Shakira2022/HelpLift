const express = require("express");
const Interest = require("../models/Interest");

const router = express.Router();

// Create a new interest
router.post("/", async (req, res) => {
    try {
        const { giver, need } = req.body;

        // Check if this giver already showed interest
        const existingInterest = await Interest.findOne({
            giver,
            need
        });

        if (existingInterest) {
            return res.status(400).json({
                message: "You have already expressed interest in this need."
            });
        }

        const interest = new Interest({
            giver,
            need
        });

        const savedInterest = await interest.save();

        res.status(201).json({
            message: "Interest submitted successfully",
            interest: savedInterest
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Get all interests
router.get("/", async (req, res) => {
    try {
        const interests = await Interest.find()
            .populate("giver", "name email")
            .populate("need", "title description");

        res.json(interests);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;