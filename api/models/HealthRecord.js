const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "Pending"
  },

  fileUrl: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("HealthRecord", healthRecordSchema);