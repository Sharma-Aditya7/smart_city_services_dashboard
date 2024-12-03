const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// Get all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

// Submit feedback
router.post("/", async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.json(newFeedback);
  } catch (err) {
    res.status(400).json({ error: "Failed to submit feedback" });
  }
});

module.exports = router;