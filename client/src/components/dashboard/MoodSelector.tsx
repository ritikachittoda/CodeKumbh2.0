import { useState } from "react";
import { motion } from "framer-motion";

const moods = [
  { emoji: "😊", label: "Happy", color: "bg-gold-light" },
  { emoji: "😌", label: "Calm", color: "bg-sage-light" },
  { emoji: "😢", label: "Sad", color: "bg-ocean-light" },
  { emoji: "😤", label: "Irritated", color: "bg-terracotta-light" },
  { emoji: "😴", label: "Tired", color: "bg-plum-light" },
  { emoji: "🤗", label: "Loved", color: "bg-clay-light" },
];

const MoodSelector = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card h-full">
      <h2 className="font-display text-xl font-bold text-foreground mb-4">How are you feeling?</h2>
      <div className="grid grid-cols-3 gap-3">
        {moods.map((mood) => (
          <motion.button
            key={mood.label}
            whileTap={{ scale: 0.92 }}
            onClick={() => setSelected(mood.label)}
            className={`flex flex-col items-center gap-1.5 p-4 rounded-xl transition-all ${mood.color} ${
              selected === mood.label ? "ring-2 ring-primary shadow-soft" : "opacity-75 hover:opacity-100"
            }`}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-xs font-semibold text-foreground">{mood.label}</span>
          </motion.button>
        ))}
      </div>
      {selected && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-muted-foreground text-center"
        >
          Feeling {selected.toLowerCase()} — logged! ✨
        </motion.p>
      )}
    </div>
  );
};

export default MoodSelector;