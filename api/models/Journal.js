const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  entry: {
    type: String,
    required: true
  },
  stressLevel: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Journal", journalSchema);