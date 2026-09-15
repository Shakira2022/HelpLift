const express = require("express");
const Need = require("../models/Need");

const router = express.Router();

// Create a new need
router.post("/", async (req, res) => {
    try {
        const need = new Need(req.body);

        const savedNeed = await need.save();

        res.status(201).json({
            message: "Need created successfully",
            need: savedNeed
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Get all verified/open needs
router.get("/", async (req, res) => {
    try {
        const needs = await Need.find({
            isVerified: true,
            status: "open"
        }).populate("organization", "name");

        res.json(needs);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get one need
router.get("/:id", async (req, res) => {
    try {
        const need = await Need.findById(req.params.id)
            .populate("organization", "name");

        if (!need) {
            return res.status(404).json({
                message: "Need not found"
            });
        }

        res.json(need);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update a need
router.put("/:id", async (req, res) => {
    try {
        const need = await Need.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!need) {
            return res.status(404).json({
                message: "Need not found"
            });
        }

        res.json({
            message: "Need updated successfully",
            need: need
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Delete a need
router.delete("/:id", async (req, res) => {
    try {
        const need = await Need.findByIdAndDelete(req.params.id);

        if (!need) {
            return res.status(404).json({
                message: "Need not found"
            });
        }

        res.json({
            message: "Need deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Approve a need
router.put("/:id/approve", async (req, res) => {
    try {
        const need = await Need.findByIdAndUpdate(
            req.params.id,
            {
                isVerified: true,
                status: "open"
            },
            { new: true }
        );

        if (!need) {
            return res.status(404).json({
                message: "Need not found"
            });
        }

        res.json({
            message: "Need approved successfully",
            need: need
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;