import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/shared/PageHeader";
import { motion } from "framer-motion";
import { Camera, AlertCircle } from "lucide-react";
import { useState } from "react";

const anemiaSymptoms = [
  "Pale skin or nail beds", "Fatigue / weakness", "Shortness of breath", "Dizziness",
  "Cold hands or feet", "Brittle nails", "Frequent headaches", "Rapid heartbeat",
];

const dietSuggestions = [
  { food: "Beetroot Juice", benefit: "Rich in iron & folate", emoji: "🥤" },
  { food: "Spinach & Kale", benefit: "Non-heme iron source", emoji: "🥬" },
  { food: "Amla (Gooseberry)", benefit: "Vitamin C boosts absorption", emoji: "🍏" },
  { food: "Black Sesame Seeds", benefit: "High in iron & calcium", emoji: "⚫" },
  { food: "Organ Meats / Eggs", benefit: "Heme iron, easily absorbed", emoji: "🥩" },
  { food: "Fortified Cereals", benefit: "Added iron & B vitamins", emoji: "🥣" },
  { food: "Jaggery", benefit: "11mg iron per 100g", emoji: "🍬" },
  { food: "Pomegranate", benefit: "Boosts hemoglobin levels", emoji: "🍎" },
];

const AnemiaScanner = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const toggle = (s: string) => setChecked((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const risk = checked.length >= 5 ? "High" : checked.length >= 3 ? "Moderate" : "Low";

  return (
    <PageLayout>
      <PageHeader title="Anemia Risk Scanner" subtitle="Check symptoms, scan with camera, and get iron-rich diet plans" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Camera */}
        <div className="gradient-sage rounded-2xl p-8 shadow-soft text-center flex flex-col items-center justify-center">
          <Camera size={48} className="text-primary-foreground mb-4" />
          <h3 className="font-display text-xl font-bold text-primary-foreground mb-2">AI Eyelid / Nail Scan</h3>
          <p className="text-sm text-primary-foreground/80 mb-6 max-w-[280px]">
            Use your camera to scan the color of your lower eyelid or nail bed for AI-based anemia risk estimation
          </p>
          <button className="bg-card text-sage px-6 py-3 rounded-xl font-bold hover:bg-muted transition-colors">
            Open Camera →
          </button>
        </div>

        {/* Symptoms */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Symptom Checker</h3>
          <div className="space-y-2">
            {anemiaSymptoms.map((s) => (
              <button key={s} onClick={() => toggle(s)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  checked.includes(s) ? "bg-terracotta-light text-foreground font-bold" : "bg-muted text-muted-foreground hover:bg-sand"
                }`}>
                {checked.includes(s) ? "✓ " : "○ "}{s}
              </button>
            ))}
          </div>
          {checked.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className={`mt-4 p-4 rounded-xl flex items-start gap-3 ${
                risk === "High" ? "bg-destructive/10" : risk === "Moderate" ? "bg-gold-light" : "bg-sage-light"
              }`}>
              <AlertCircle size={18} className={risk === "High" ? "text-destructive" : "text-gold"} />
              <div>
                <p className="font-bold text-sm text-foreground">{risk} Risk</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {risk === "High" ? "Please consult a doctor for a blood test immediately." :
                   risk === "Moderate" ? "Consider getting your hemoglobin levels checked." :
                   "Keep monitoring and maintain iron-rich diet."}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Diet */}
        <div>
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Iron-Rich Diet Plan</h3>
          <div className="space-y-3">
            {dietSuggestions.map((item, i) => (
              <motion.div key={item.food} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }} className="bg-sage-light rounded-xl p-3 flex items-center gap-3">
                <span className="text-xl">{item.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-foreground">{item.food}</p>
                  <p className="text-xs text-muted-foreground">{item.benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AnemiaScanner;
