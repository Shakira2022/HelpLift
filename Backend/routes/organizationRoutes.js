const express = require("express");
const Organization = require("../models/Organization");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const organization = new Organization(req.body);

        const savedOrganization = await organization.save();

        res.status(201).json(savedOrganization);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

router.get("/", async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const organization = await Organization.findByIdAndDelete(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.json({ message: "Organization deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});