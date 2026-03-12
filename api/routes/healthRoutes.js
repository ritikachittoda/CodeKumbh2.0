const express = require("express");
const router = express.Router();
const multer = require("multer");
const HealthRecord = require("../models/HealthRecord");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// GET records
router.get("/", async (req, res) => {

  const records = await HealthRecord.find().sort({ createdAt: -1 });

  res.json(records);

});

// ADD record
router.post("/", upload.single("file"), async (req, res) => {

  try {

    const { title, category, status } = req.body;

    const record = new HealthRecord({

      title,
      category,
      status,
      fileUrl: req.file ? req.file.filename : null

    });

    await record.save();

    res.json(record);

  } catch (err) {

    res.status(500).json({ error: "Upload failed" });

  }

});

module.exports = router;