import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/shared/PageHeader";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Cycle {
  _id: string
  startDate: string
  length: number
  status: string
}

interface Prediction {
  avgCycle: number
  nextPeriod: string
}

const phases = [
  { name: "Menstrual", days: "Day 1-5", emoji: "🌸", desc: "Rest, hydrate, iron-rich foods. Your body is shedding the uterine lining.", color: "bg-terracotta-light" },
  { name: "Follicular", days: "Day 6-13", emoji: "🌱", desc: "Energy rising! Great time for intense workouts and starting new projects.", color: "bg-gold-light" },
  { name: "Ovulation", days: "Day 14-16", emoji: "🌟", desc: "Peak energy, highest fertility. Social, confident, and communicative.", color: "bg-sage-light" },
  { name: "Luteal", days: "Day 17-28", emoji: "🌙", desc: "Wind down, self-care focus. PMS symptoms may appear — be gentle with yourself.", color: "bg-plum-light" },
];

const PeriodTracker = () => {

  const [cycleHistory, setCycleHistory] = useState<Cycle[]>([]);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const [startDate, setStartDate] = useState("");
  const [length, setLength] = useState(28);
  const [status, setStatus] = useState("Normal");

  const API = "http://localhost:5000/api/cycles";

  // Fetch cycles
  const fetchCycles = async () => {
    try {
      const res = await axios.get(API);
      setCycleHistory(res.data);
    } catch (err) {
      console.error("Error fetching cycles", err);
    }
  };

  // Fetch prediction
  const fetchPrediction = async () => {
    try {
      const res = await axios.get(`${API}/predict`);
      setPrediction(res.data);
    } catch (err) {
      console.error("Prediction error", err);
    }
  };

  // Add cycle
  const addCycle = async () => {
    if (!startDate) {
      alert("Please select a date");
      return;
    }

    try {
      await axios.post(API, {
        startDate,
        length,
        status
      });

      setStartDate("");
      fetchCycles();
      fetchPrediction();

    } catch (err) {
      console.error("Error adding cycle", err);
    }
  };

  useEffect(() => {
    fetchCycles();
    fetchPrediction();
  }, []);

  return (
    <PageLayout>
      <PageHeader
        title="Period Tracker"
        subtitle="Track your cycle, understand your phases, and predict your next period"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

        {/* Cycle Phases */}
        <div>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Cycle Phases
          </h2>

          <div className="space-y-3">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`${phase.color} rounded-2xl p-5 flex items-start gap-4`}
              >
                <span className="text-3xl">{phase.emoji}</span>

                <div>
                  <h4 className="font-display font-bold text-foreground">
                    {phase.name}
                    <span className="text-sm font-body text-muted-foreground">
                      {" "}· {phase.days}
                    </span>
                  </h4>

                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Prediction + History */}
        <div className="space-y-6">

          {/* AI Prediction */}
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground">
                AI Prediction
              </h2>
            </div>

            {prediction ? (
              <p className="text-muted-foreground leading-relaxed">
                Based on your recent cycles, your average cycle length is{" "}
                <strong className="text-foreground">
                  {prediction.avgCycle} days
                </strong>.
                Your next period is predicted around{" "}
                <strong className="text-primary">
                  {prediction.nextPeriod
                    ? new Date(prediction.nextPeriod).toLocaleDateString()
                    : "Not enough data"}
                </strong>.
              </p>
            ) : (
              <p className="text-muted-foreground">Loading prediction...</p>
            )}
          </div>

          {/* Log Period */}
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-lg font-bold text-foreground mb-4">
              Log New Cycle
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded-lg p-2"
              />

              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                placeholder="Cycle Length"
                className="border rounded-lg p-2"
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border rounded-lg p-2"
              >
                <option>Normal</option>
                <option>Long</option>
                <option>Short</option>
              </select>

            </div>

            <button
              onClick={addCycle}
              className="mt-4 bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90"
            >
              Log Period
            </button>
          </div>

          {/* Cycle History */}
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Cycle History
            </h2>

            <div className="space-y-2">
              {cycleHistory.map((cycle, i) => (
                <motion.div
                  key={cycle._id || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl p-4 shadow-card flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-foreground">
                      {cycle.length} Days
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Started {new Date(cycle.startDate).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-lg ${cycle.status === "Normal"
                        ? "bg-sage-light text-sage"
                        : "bg-terracotta-light text-terracotta"
                      }`}
                  >
                    {cycle.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
};

export default PeriodTracker;