const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = "mongodb://localhost:27017/smart-city";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Smart City Services API is running");
});

const parkingRoutes = require("./routes/parking");
app.use("/api/parking", parkingRoutes);

const feedbackRoutes = require("./routes/feedback");
app.use("/api/feedback", feedbackRoutes);

const garbageRoutes = require("./routes/garbage");
app.use("/api/garbage", garbageRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});