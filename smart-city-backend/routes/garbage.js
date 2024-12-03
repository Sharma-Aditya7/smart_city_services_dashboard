const express = require("express");
const router = express.Router();
const Garbage = require("../models/Garbage");

// Get all garbage bins
router.get("/", async (req, res) => {
  try {
    const bins = await Garbage.find();
    res.json(bins);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch garbage bins" });
  }
});

// Add a new garbage bin
router.post("/", async (req, res) => {
  try {
    const newBin = new Garbage(req.body);
    await newBin.save();
    res.json(newBin);
  } catch (err) {
    res.status(400).json({ error: "Failed to add garbage bin" });
  }
});

// Update a garbage bin's status
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBin = await Garbage.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedBin);
  } catch (err) {
    res.status(400).json({ error: "Failed to update garbage bin" });
  }
});

// Delete a garbage bin
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Garbage.findByIdAndDelete(id);
    res.json({ message: "Garbage bin deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete garbage bin" });
  }
});

module.exports = router;