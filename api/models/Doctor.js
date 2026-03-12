const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  hospital: String,
  rating: Number,
  experience: Number,
  location: {
    lat: Number,
    lng: Number
  },
  city: String,
  phone: String
});

module.exports = mongoose.model("Doctor", doctorSchema);