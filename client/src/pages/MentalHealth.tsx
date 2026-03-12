import { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/shared/PageHeader";
import { motion } from "framer-motion";
import { MessageCircle, BookOpen, BarChart3, Heart, Sparkles } from "lucide-react";

const selfCareTips = [
  { tip: "Take 5 deep breaths and release tension from your shoulders", emoji: "🧘" },
  { tip: "Write down 3 things you're grateful for today", emoji: "📝" },
  { tip: "Step outside for a 10-minute walk in nature", emoji: "🌿" },
  { tip: "Call someone you love and share how you feel", emoji: "💕" },
  { tip: "Drink a warm cup of herbal tea and relax", emoji: "🍵" },
  { tip: "Do a 5-minute body scan meditation before bed", emoji: "🌙" },
];

const MentalHealth = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [stressLevel, setStressLevel] = useState(3);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <PageLayout>
      <PageHeader title="Mental Wellness" subtitle="Your mental health matters — journal, track stress, and find support" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Stress Score */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={18} className="text-plum" />
            <h3 className="font-display text-lg font-bold text-foreground">Stress Level</h3>
          </div>
          <div className="flex items-center gap-3 mb-3">
            {[1, 2, 3, 4, 5].map((level) => (
              <button key={level} onClick={() => setStressLevel(level)}
                className={`flex-1 h-14 rounded-xl flex items-center justify-center text-lg font-bold transition-all ${
                  stressLevel === level ? "gradient-plum text-accent-foreground shadow-soft" : "bg-muted text-muted-foreground hover:bg-plum-light"
                }`}>{level}</button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {stressLevel <= 2 ? "You're doing great! Keep it up 🌟" :
             stressLevel === 3 ? "Moderate — try some deep breathing 🧘" :
             "High stress detected — prioritize rest today 💕"}
          </p>
        </div>

        {/* Journal */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={18} className="text-gold" />
            <h3 className="font-display text-lg font-bold text-foreground">Mood Journal</h3>
          </div>
          <textarea value={journalEntry} onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="How are you feeling right now? Write freely..."
            className="w-full h-32 bg-muted rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <button onClick={handleSave}
            className="mt-3 gradient-sage text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold shadow-soft w-full">
            {saved ? "Saved! ✨" : "Save Entry"}
          </button>
        </div>

        {/* AI Chat */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="gradient-plum rounded-2xl p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle size={18} className="text-accent-foreground" />
              <h3 className="font-display text-lg font-bold text-accent-foreground">AI Support</h3>
            </div>
            <p className="text-sm text-accent-foreground/80 mb-6">
              Talk to our AI assistant about your feelings, anxiety, stress, or any concerns. Available 24/7 with empathetic, supportive responses.
            </p>
          </div>
          <button className="bg-card text-foreground px-5 py-2.5 rounded-xl text-sm font-bold w-full hover:bg-muted transition-colors">
            <Sparkles size={14} className="inline mr-1" /> Start Conversation
          </button>
        </motion.div>
      </div>

      {/* Self-care */}
      <h2 className="font-display text-xl font-bold text-foreground mb-4">Self-Care Suggestions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {selfCareTips.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }} className="bg-plum-light rounded-xl p-4 flex items-start gap-3">
            <span className="text-xl">{item.emoji}</span>
            <p className="text-sm text-foreground">{item.tip}</p>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
};

export default MentalHealth;
