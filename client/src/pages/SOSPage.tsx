import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/shared/PageHeader";
import { motion } from "framer-motion";
import { Phone, MapPin, Users, Hospital } from "lucide-react";
import { useState } from "react";

const emergencyContacts = [
  { name: "Women Helpline", number: "181", desc: "24/7 support for women in distress" },
  { name: "Police", number: "100", desc: "Emergency law enforcement" },
  { name: "Ambulance", number: "108", desc: "Emergency medical services" },
  { name: "Domestic Violence", number: "1091", desc: "Support for domestic abuse victims" },
  { name: "Child Helpline", number: "1098", desc: "Child protection and support" },
  { name: "Mental Health", number: "08046110007", desc: "iCall mental health support" },
];

const SOSPage = () => {
  const [sosTriggered, setSosTriggered] = useState(false);

  const handleSOS = () => { setSosTriggered(true); setTimeout(() => setSosTriggered(false), 3000); };

  return (
    <PageLayout>
      <PageHeader title="Emergency SOS" subtitle="Safety and healthcare emergency features — one tap away" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* SOS Button */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center bg-card rounded-2xl p-8 shadow-card">
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleSOS}
            className={`w-44 h-44 rounded-full flex items-center justify-center shadow-elevated transition-all ${
              sosTriggered ? "bg-destructive animate-pulse" : "gradient-terra hover:scale-105"
            }`}>
            <span className="text-accent-foreground font-display font-bold text-3xl">
              {sosTriggered ? "Sent!" : "SOS"}
            </span>
          </motion.button>
          <p className="text-sm text-muted-foreground mt-6 text-center max-w-[250px]">
            {sosTriggered ? "Emergency alert sent with your live location 📍" : "Tap to send emergency alert to your trusted contacts"}
          </p>
          <div className="flex gap-3 mt-6 w-full">
            <button className="flex-1 bg-terracotta-light rounded-xl p-3 flex flex-col items-center gap-1">
              <MapPin size={20} className="text-terracotta" />
              <span className="text-xs font-bold text-foreground">Share Location</span>
            </button>
            <button className="flex-1 bg-plum-light rounded-xl p-3 flex flex-col items-center gap-1">
              <Users size={20} className="text-plum" />
              <span className="text-xs font-bold text-foreground">Notify Contacts</span>
            </button>
          </div>
        </div>

        {/* Emergency Numbers */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Emergency Numbers (India)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {emergencyContacts.map((contact, i) => (
              <motion.a key={contact.name} href={`tel:${contact.number}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl p-4 shadow-card flex items-center gap-4 hover:shadow-elevated transition-shadow">
                <div className="w-12 h-12 rounded-xl gradient-terra flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.desc}</p>
                </div>
                <span className="text-lg font-display font-bold text-terracotta">{contact.number}</span>
              </motion.a>
            ))}
          </div>

          {/* Trusted Contacts */}
          <div className="bg-card rounded-2xl p-6 shadow-card mt-6">
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Trusted Contacts</h3>
            <p className="text-sm text-muted-foreground mb-4">Add family members or friends who will be notified in emergencies</p>
            <button className="w-full border-2 border-dashed border-border rounded-xl py-4 text-sm font-semibold text-muted-foreground hover:border-primary hover:text-primary transition-colors">
              + Add Trusted Contact
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SOSPage;
