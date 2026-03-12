import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/shared/PageHeader";
import { motion } from "framer-motion";
import { useState } from "react";

const categories = [
  {
    title: "For Period Cramps", emoji: "🌸", color: "bg-terracotta-light", activeColor: "gradient-terra",
    exercises: [
      { name: "Child's Pose", duration: "2 min", desc: "Gentle stretch for lower back and abdominal relief" },
      { name: "Cat-Cow Stretch", duration: "3 min", desc: "Alternating spinal movements to ease tension" },
      { name: "Cobra Pose", duration: "2 min", desc: "Opens up the front body and relieves cramps" },
      { name: "Supine Twist", duration: "2 min", desc: "Releases bloating, gas, and lower back tension" },
    ],
  },
  {
    title: "For Pelvic Pain", emoji: "🧘", color: "bg-plum-light", activeColor: "gradient-plum",
    exercises: [
      { name: "Pelvic Tilts", duration: "3 min", desc: "Strengthens pelvic floor and core muscles" },
      { name: "Bridge Pose", duration: "3 min", desc: "Activates glutes, hamstrings, and core stability" },
      { name: "Happy Baby Pose", duration: "2 min", desc: "Gently opens hips and stretches inner groin" },
      { name: "Butterfly Stretch", duration: "2 min", desc: "Releases inner thigh and hip tension" },
    ],
  },
  {
    title: "For Hormonal Balance", emoji: "⚖️", color: "bg-sage-light", activeColor: "gradient-sage",
    exercises: [
      { name: "Sun Salutation", duration: "10 min", desc: "Full body flow that regulates hormones" },
      { name: "Brisk Walking", duration: "20 min", desc: "Boosts metabolism and improves circulation" },
      { name: "Light Strength Training", duration: "15 min", desc: "Improves insulin sensitivity and PCOS symptoms" },
      { name: "Deep Breathing (Pranayama)", duration: "5 min", desc: "Reduces cortisol and calms the nervous system" },
    ],
  },
  {
    title: "For Stress Relief", emoji: "🌿", color: "bg-gold-light", activeColor: "gradient-ocean",
    exercises: [
      { name: "Progressive Relaxation", duration: "10 min", desc: "Muscle-by-muscle tension release technique" },
      { name: "Legs Up the Wall", duration: "5 min", desc: "Calms the nervous system and reduces anxiety" },
      { name: "Savasana", duration: "10 min", desc: "Deep rest, recovery, and mental reset" },
      { name: "Gentle Yoga Flow", duration: "15 min", desc: "Mindful, slow movements for inner peace" },
    ],
  },
];

const Exercise = () => {
  const [expanded, setExpanded] = useState<string | null>(categories[0].title);

  return (
    <PageLayout>
      <PageHeader title="Exercise & Yoga" subtitle="Symptom-based workout recommendations tailored for women's health" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((cat, i) => (
          <motion.div key={cat.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }} className="space-y-3">
            <button onClick={() => setExpanded(expanded === cat.title ? null : cat.title)}
              className={`w-full rounded-2xl p-5 flex items-center gap-4 text-left transition-all ${
                expanded === cat.title ? `${cat.activeColor} shadow-soft` : cat.color
              }`}>
              <span className="text-3xl">{cat.emoji}</span>
              <div className="flex-1">
                <h3 className={`font-display font-bold text-lg ${expanded === cat.title ? "text-accent-foreground" : "text-foreground"}`}>{cat.title}</h3>
                <p className={`text-xs ${expanded === cat.title ? "text-accent-foreground/70" : "text-muted-foreground"}`}>{cat.exercises.length} exercises</p>
              </div>
              <span className={expanded === cat.title ? "text-accent-foreground" : "text-muted-foreground"}>
                {expanded === cat.title ? "▲" : "▼"}
              </span>
            </button>
            {expanded === cat.title && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cat.exercises.map((ex) => (
                  <div key={ex.name} className="bg-card rounded-xl p-4 shadow-card">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-sm text-foreground">{ex.name}</p>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-lg">{ex.duration}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{ex.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Exercise;
