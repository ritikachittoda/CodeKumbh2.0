import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/shared/PageHeader";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useState } from "react";

const symptoms = [
  { name: "Irregular periods", weight: 3, desc: "Cycles shorter than 21 or longer than 35 days" },
  { name: "Weight gain", weight: 2, desc: "Unexplained weight gain especially around the belly" },
  { name: "Acne breakouts", weight: 2, desc: "Persistent acne, especially along jawline" },
  { name: "Excessive hair growth", weight: 3, desc: "Unwanted hair on face, chest, or back" },
  { name: "Hair thinning", weight: 2, desc: "Thinning hair on the scalp" },
  { name: "Mood swings", weight: 1, desc: "Frequent emotional ups and downs" },
  { name: "Fatigue", weight: 1, desc: "Persistent tiredness despite adequate sleep" },
  { name: "Difficulty losing weight", weight: 2, desc: "Weight loss resistance despite diet and exercise" },
  { name: "Dark skin patches", weight: 2, desc: "Darkening of skin in neck, groin, or underarms" },
  { name: "Pelvic pain", weight: 1, desc: "Chronic lower abdominal or pelvic pain" },
];

const PCOSChecker = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (name: string) => setSelected((prev) => prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]);

  const riskScore = selected.reduce((sum, name) => sum + (symptoms.find((s) => s.name === name)?.weight || 0), 0);
  const maxScore = symptoms.reduce((sum, s) => sum + s.weight, 0);
  const riskPercent = Math.round((riskScore / maxScore) * 100);
  const riskLevel = riskPercent < 25 ? "Low" : riskPercent < 55 ? "Moderate" : "High";

  return (
    <PageLayout>
      <PageHeader title="PCOS Risk Checker" subtitle="AI-powered screening tool — select your symptoms for a risk assessment" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Symptoms */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Select Your Symptoms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {symptoms.map((symptom) => (
              <button key={symptom.name} onClick={() => toggle(symptom.name)}
                className={`text-left rounded-xl p-4 transition-all ${
                  selected.includes(symptom.name) ? "gradient-terra text-accent-foreground shadow-soft" : "bg-card shadow-card hover:shadow-elevated"
                }`}>
                <p className={`font-bold text-sm ${selected.includes(symptom.name) ? "text-accent-foreground" : "text-foreground"}`}>
                  {selected.includes(symptom.name) ? "✓ " : "○ "}{symptom.name}
                </p>
                <p className={`text-xs mt-0.5 ${selected.includes(symptom.name) ? "text-accent-foreground/70" : "text-muted-foreground"}`}>{symptom.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Risk Dashboard */}
        <div className="space-y-6">
          <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Activity size={18} className="text-primary" />
              <h3 className="font-display text-lg font-bold text-foreground">Risk Assessment</h3>
            </div>

            {/* Circular indicator */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg width="128" height="128" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <motion.circle cx="64" cy="64" r="54" fill="none"
                    stroke={riskPercent < 25 ? "hsl(var(--sage))" : riskPercent < 55 ? "hsl(var(--gold))" : "hsl(var(--destructive))"}
                    strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 54}
                    initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - riskPercent / 100) }}
                    transition={{ duration: 0.8 }} transform="rotate(-90 64 64)" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-display font-bold text-foreground">{riskPercent}%</span>
                  <span className={`text-xs font-bold ${riskPercent < 25 ? "text-sage" : riskPercent < 55 ? "text-gold" : "text-destructive"}`}>{riskLevel}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center mb-4">{selected.length} symptoms selected</p>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {selected.length === 0 ? "Select symptoms above to get your risk assessment." :
               riskLevel === "Low" ? "Low risk — maintain a healthy lifestyle and regular check-ups." :
               riskLevel === "Moderate" ? "Some symptoms align with PCOS. Consider consulting a gynecologist." :
               "Multiple high-risk symptoms detected. We strongly recommend seeing a healthcare professional."}
            </p>
          </div>

          {/* Hormone Dashboard */}
          <div className="gradient-plum rounded-2xl p-6 shadow-soft">
            <h3 className="font-display font-bold text-accent-foreground mb-3">Hormone Dashboard</h3>
            <div className="grid grid-cols-3 gap-2">
              {["Estrogen", "Progesterone", "Testosterone"].map((h) => (
                <div key={h} className="bg-card/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <p className="text-[10px] text-accent-foreground/70">{h}</p>
                  <p className="text-sm font-bold text-accent-foreground">Normal</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PCOSChecker;
