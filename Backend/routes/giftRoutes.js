const express = require("express");
const Gift = require("../models/Gift");

const router = express.Router();

// Create a gift
router.post("/", async (req, res) => {
  try {
    const gift = new Gift(req.body);
    const savedGift = await gift.save();

    res.status(201).json({
      message: "Gift created successfully",
      gift: savedGift
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get approved gifts
router.get("/", async (req, res) => {
  try {
    const gifts = await Gift.find({
      status: "approved"
    }).populate("giver", "name email");

    res.json(gifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one gift
router.get("/:id", async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id)
      .populate("giver", "name email");

    if (!gift) {
      return res.status(404).json({
        message: "Gift not found"
      });
    }

    res.json(gift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a gift
router.put("/:id", async (req, res) => {
  try {
    const gift = await Gift.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!gift) {
      return res.status(404).json({
        message: "Gift not found"
      });
    }

    res.json({
      message: "Gift updated successfully",
      gift
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Approve a gift
router.put("/:id/approve", async (req, res) => {
  try {
    const gift = await Gift.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!gift) {
      return res.status(404).json({
        message: "Gift not found"
      });
    }

    res.json({
      message: "Gift approved successfully",
      gift
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a gift
router.delete("/:id", async (req, res) => {
  try {
    const gift = await Gift.findByIdAndDelete(req.params.id);

    if (!gift) {
      return res.status(404).json({
        message: "Gift not found"
      });
    }

    res.json({
      message: "Gift deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;