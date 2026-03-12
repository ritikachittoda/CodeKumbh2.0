import { motion } from "framer-motion";

interface CycleRingProps {
  currentDay: number;
  totalDays: number;
  phase: string;
}

const CycleRing = ({ currentDay, totalDays, phase }: CycleRingProps) => {
  const progress = currentDay / totalDays;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference * (1 - progress);

  const phaseColors: Record<string, string> = {
    "Menstrual": "hsl(18, 55%, 52%)",
    "Follicular": "hsl(42, 70%, 50%)",
    "Ovulation": "hsl(150, 25%, 38%)",
    "Luteal": "hsl(320, 25%, 42%)",
  };

  const phaseEmoji: Record<string, string> = {
    "Menstrual": "🌸",
    "Follicular": "🌱",
    "Ovulation": "🌟",
    "Luteal": "🌙",
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg width="170" height="170" viewBox="0 0 170 170">
        <circle cx="85" cy="85" r="70" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" strokeLinecap="round" />
        <motion.circle
          cx="85" cy="85" r="70" fill="none"
          stroke={phaseColors[phase] || "hsl(150, 25%, 38%)"}
          strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          transform="rotate(-90 85 85)"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl mb-1">{phaseEmoji[phase] || "🌸"}</span>
        <span className="text-2xl font-display font-bold text-foreground">Day {currentDay}</span>
        <span className="text-xs font-medium text-muted-foreground">{phase}</span>
      </div>
    </div>
  );
};

export default CycleRing;