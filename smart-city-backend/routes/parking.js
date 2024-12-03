const express = require("express");
const router = express.Router();
const Parking = require("../models/Parking");

// Get all parking spots
router.get("/", async (req, res) => {
  const spots = await Parking.find();
  res.json(spots);
});

// Add a new parking spot
router.post("/", async (req, res) => {
  const newSpot = new Parking(req.body);
  await newSpot.save();
  res.json(newSpot);
});

// Update parking spot status
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedSpot = await Parking.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedSpot);
});

// Delete a parking spot
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Parking.findByIdAndDelete(id);
  res.json({ message: "Parking spot deleted" });
});

module.exports = router;