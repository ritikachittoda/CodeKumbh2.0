process.env.GOOGLE_APPLICATION_CREDENTIALS = "./google-credentials.json";

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

console.log("Server starting...");

/* Route imports */
const anemiaRoutes = require("./routes/anemiaRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const cycleRoutes = require("./routes/cycleRoutes");
const journalRoutes = require("./routes/journalRoutes");
const chatRoutes = require("./routes/chatRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Serve uploaded files */
app.use("/uploads", express.static("uploads"));

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bloom-balance")
  .then(() => {
    console.log(" MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

/* API Routes */
app.use("/api/anemia", anemiaRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/cycles", cycleRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/health", healthRoutes);

/* Root Route */
app.get("/", (req, res) => {
  res.json({
    message: "Bloom Balance API running",
    status: "OK"
  });
});

/* Health Check */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Server healthy" });
});

/* Global Error Handler */
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: "Internal Server Error"
  });
});

/* Start Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// // import routes
// const cycleRoutes = require("./routes/cycleRoutes");
// const journalRoutes = require("./routes/journalRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const healthRoutes = require("./routes/healthRoutes"); // health wallet

// const app = express();

// // middleware
// app.use(cors());
// app.use(express.json());

// // serve uploaded files
// app.use("/uploads", express.static("uploads"));

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected");
//   })
//   .catch((err) => {
//     console.log("MongoDB Error:", err);
//   });

// // API routes
// app.use("/api/cycles", cycleRoutes);   // period tracker
// app.use("/api/journal", journalRoutes); // mood journal
// app.use("/api/chat", chatRoutes);      // AI chatbot
// app.use("/api/health", healthRoutes);  // health wallet

// // test route
// app.get("/", (req, res) => {
//   res.send("Women Health AI API running");
// });

// // start server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });