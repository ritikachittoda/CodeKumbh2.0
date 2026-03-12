import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/shared/PageHeader";
import { motion } from "framer-motion";
import { FileText, Lock, Plus, Download } from "lucide-react";

const records = [
  { type: "Blood Test (CBC)", date: "Feb 15, 2026", status: "Normal", color: "bg-sage-light" },
  { type: "Pelvic Ultrasound", date: "Jan 20, 2026", status: "Clear", color: "bg-plum-light" },
  { type: "Thyroid Panel (TSH)", date: "Dec 10, 2025", status: "Normal", color: "bg-gold-light" },
  { type: "Pap Smear", date: "Nov 5, 2025", status: "Normal", color: "bg-ocean-light" },
  { type: "Iron Panel", date: "Oct 1, 2025", status: "Low", color: "bg-terracotta-light" },
  { type: "Vitamin D Test", date: "Sep 15, 2025", status: "Deficient", color: "bg-terracotta-light" },
];

const categories = [
  { name: "Menstrual History", count: 12, emoji: "🌸" },
  { name: "Pregnancy Records", count: 0, emoji: "🤰" },
  { name: "Lab Reports", count: 6, emoji: "🔬" },
  { name: "Prescriptions", count: 8, emoji: "💊" },
  { name: "Imaging & Scans", count: 2, emoji: "📸" },
  { name: "Vaccination Records", count: 4, emoji: "💉" },
];

const HealthWallet = () => {
  return (
    <PageLayout>
      <PageHeader title="Health Wallet" subtitle="Your secure digital vault for all medical records and health data" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Security banner */}
        <div className="lg:col-span-3 gradient-sage rounded-2xl p-6 shadow-soft flex items-center gap-4">
          <Lock size={28} className="text-primary-foreground flex-shrink-0" />
          <div>
            <h3 className="font-display text-lg font-bold text-primary-foreground">Encrypted & Private</h3>
            <p className="text-sm text-primary-foreground/80">Your health records are end-to-end encrypted. Only you can access them — no third parties.</p>
          </div>
        </div>

        {/* Categories */}
        <div className="lg:col-span-1">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat.name} className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3 hover:shadow-elevated transition-shadow cursor-pointer">
                <span className="text-xl">{cat.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.count} records</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Records */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-foreground">Recent Records</h2>
            <button className="gradient-sage text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold shadow-soft flex items-center gap-1">
              <Plus size={14} /> Add Record
            </button>
          </div>
          <div className="space-y-3">
            {records.map((record, i) => (
              <motion.div key={record.type} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }} className="bg-card rounded-xl p-5 shadow-card flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${record.color} flex items-center justify-center flex-shrink-0`}>
                  <FileText size={20} className="text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">{record.type}</p>
                  <p className="text-xs text-muted-foreground">{record.date}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                  record.status === "Normal" || record.status === "Clear" ? "bg-sage-light text-sage" : "bg-terracotta-light text-terracotta"
                }`}>{record.status}</span>
                <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-sand transition-colors">
                  <Download size={14} className="text-muted-foreground" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HealthWallet;
