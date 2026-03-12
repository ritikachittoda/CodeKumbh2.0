const express = require("express");
const router = express.Router();
const Journal = require("../models/Journal");

// GET all journals
router.get("/", async (req, res) => {
  try {
    const journals = await Journal.find().sort({ createdAt: -1 });
    res.json(journals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch journals" });
  }
});

// POST new journal entry
router.post("/", async (req, res) => {
  try {
    const { entry, stressLevel } = req.body;

    const journal = new Journal({
      entry,
      stressLevel
    });

    await journal.save();

    res.json(journal);
  } catch (err) {
    res.status(500).json({ error: "Failed to save journal" });
  }
});

module.exports = router;