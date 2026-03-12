const express = require("express");
const router = express.Router();
const Cycle = require("../models/cycle");

// GET cycles
router.get("/", async (req, res) => {
  const cycles = await Cycle.find().sort({ startDate: -1 });
  res.json(cycles);
});

// ADD cycle
router.post("/", async (req, res) => {
  const { startDate, length, status } = req.body;

  const cycle = new Cycle({
    startDate,
    length,
    status
  });

  await cycle.save();
  res.json(cycle);
});

// PREDICT next period
router.get("/predict", async (req, res) => {
  const cycles = await Cycle.find().sort({ startDate: -1 });

  if (cycles.length === 0) {
    return res.json({
      avgCycle: null,
      nextPeriod: null
    });
  }

  // average cycle length
  const avgCycle =
    cycles.reduce((sum, c) => sum + c.length, 0) / cycles.length;

  const lastStart = new Date(cycles[0].startDate);

  const nextPeriod = new Date(lastStart);
  nextPeriod.setDate(lastStart.getDate() + Math.round(avgCycle));

  res.json({
    avgCycle: Math.round(avgCycle),
    nextPeriod
  });
});

module.exports = router;