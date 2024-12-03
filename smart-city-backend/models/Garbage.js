const mongoose = require("mongoose");

const GarbageSchema = new mongoose.Schema({
  binId: { type: Number, required: true, unique: true },
  location: { type: String, required: true },
  status: {
    type: String,
    enum: ["Empty", "Full", "Scheduled for Pickup"],
    default: "Empty",
  },
});

module.exports = mongoose.model("Garbage", GarbageSchema);