const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// import routes
const cycleRoutes = require("./routes/cycleRoutes");
const journalRoutes = require("./routes/journalRoutes");
const chatRoutes = require("./routes/chatRoutes");
const healthRoutes = require("./routes/healthRoutes"); // health wallet

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// serve uploaded files
app.use("/uploads", express.static("uploads"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// API routes
app.use("/api/cycles", cycleRoutes);   // period tracker
app.use("/api/journal", journalRoutes); // mood journal
app.use("/api/chat", chatRoutes);      // AI chatbot
app.use("/api/health", healthRoutes);  // health wallet

// test route
app.get("/", (req, res) => {
  res.send("Women Health AI API running");
});

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});