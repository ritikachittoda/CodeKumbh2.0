import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/shared/PageHeader";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const cycleHistory = [
  { days: 28, start: "Jan 10, 2026", status: "Normal" },
  { days: 30, start: "Dec 13, 2025", status: "Normal" },
  { days: 27, start: "Nov 13, 2025", status: "Normal" },
  { days: 32, start: "Oct 12, 2025", status: "Long" },
  { days: 29, start: "Sep 10, 2025", status: "Normal" },
];

const phases = [
  { name: "Menstrual", days: "Day 1-5", emoji: "🌸", desc: "Rest, hydrate, iron-rich foods. Your body is shedding the uterine lining.", color: "bg-terracotta-light" },
  { name: "Follicular", days: "Day 6-13", emoji: "🌱", desc: "Energy rising! Great time for intense workouts and starting new projects.", color: "bg-gold-light" },
  { name: "Ovulation", days: "Day 14-16", emoji: "🌟", desc: "Peak energy, highest fertility. Social, confident, and communicative.", color: "bg-sage-light" },
  { name: "Luteal", days: "Day 17-28", emoji: "🌙", desc: "Wind down, self-care focus. PMS symptoms may appear — be gentle with yourself.", color: "bg-plum-light" },
];

const PeriodTracker = () => {
  return (
    <PageLayout>
      <PageHeader title="Period Tracker" subtitle="Track your cycle, understand your phases, and predict your next period" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Phases */}
        <div>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Cycle Phases</h2>
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
                  <h4 className="font-display font-bold text-foreground">{phase.name} <span className="text-sm font-body text-muted-foreground">· {phase.days}</span></h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{phase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* History + Prediction */}
        <div className="space-y-6">
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground">AI Prediction</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Based on your last 5 cycles, your average cycle length is <strong className="text-foreground">29 days</strong>.
              Your next period is predicted around <strong className="text-primary">March 25, 2026</strong>.
              Your cycles are fairly regular — no signs of irregularity detected. Chances of pregnancy are currently <strong className="text-terracotta">High</strong> (ovulation phase).
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Cycle History</h2>
            <div className="space-y-2">
              {cycleHistory.map((cycle, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl p-4 shadow-card flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-foreground">{cycle.days} Days</p>
                    <p className="text-xs text-muted-foreground">Started {cycle.start}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                    cycle.status === "Normal" ? "bg-sage-light text-sage" : "bg-terracotta-light text-terracotta"
                  }`}>
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
