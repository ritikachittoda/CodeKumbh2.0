const Doctor = require("../models/Doctor");

const getDoctors = async (req, res) => {
  try {

    const doctors = await Doctor.find();

    res.json(doctors);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Failed to fetch doctors" });

  }
};

module.exports = { getDoctors };