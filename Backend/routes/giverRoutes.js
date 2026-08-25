const express = require("express");
const router = express.Router();
const Giver = require("../models/Giver");

router.post("/", async (req, res) => {
  try {
    const giver = new Giver(req.body);
    const savedGiver = await giver.save();

    res.status(201).json(savedGiver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const givers = await Giver.find();
    res.json(givers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const giver = await Giver.findById(req.params.id);

    if (!giver) {
      return res.status(404).json({ message: "Giver not found" });
    }

    res.json(giver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const giver = await Giver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!giver) {
      return res.status(404).json({ message: "Giver not found" });
    }

    res.json(giver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const giver = await Giver.findByIdAndDelete(req.params.id);

    if (!giver) {
      return res.status(404).json({ message: "Giver not found" });
    }

    res.json({ message: "Giver deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;