const mongoose = require("mongoose");

const cycleSchema = new mongoose.Schema({
  startDate: Date,
  length: Number,
  status: String
});

module.exports = mongoose.model("Cycle", cycleSchema);