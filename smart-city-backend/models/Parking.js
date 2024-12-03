const mongoose = require("mongoose");

const ParkingSchema = new mongoose.Schema({
  spotId: { type: Number, required: true, unique: true },
  location: { type: String, required: true },
  status: { type: String, enum: ["Available", "Occupied"], default: "Available" },
});

module.exports = mongoose.model("Parking", ParkingSchema);  