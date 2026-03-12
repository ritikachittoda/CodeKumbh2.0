import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/shared/PageHeader";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, Search } from "lucide-react";
import { useState } from "react";

const doctors = [
  { name: "Dr. Priya Sharma", specialty: "Gynecologist", rating: 4.8, distance: "1.2 km", available: true, hospital: "Apollo Hospital", exp: "12 yrs" },
  { name: "Dr. Anjali Mehta", specialty: "OB-GYN", rating: 4.9, distance: "2.5 km", available: true, hospital: "Fortis Hospital", exp: "15 yrs" },
  { name: "Dr. Kavita Rao", specialty: "Gynecologist", rating: 4.7, distance: "3.1 km", available: false, hospital: "Max Healthcare", exp: "8 yrs" },
  { name: "Dr. Sunita Verma", specialty: "Endocrinologist", rating: 4.6, distance: "4.0 km", available: true, hospital: "AIIMS", exp: "20 yrs" },
  { name: "Dr. Meena Gupta", specialty: "Dermatologist", rating: 4.5, distance: "2.8 km", available: true, hospital: "Medanta", exp: "10 yrs" },
  { name: "Dr. Ritu Agarwal", specialty: "Gynecologist", rating: 4.8, distance: "5.2 km", available: true, hospital: "Safdarjung Hospital", exp: "18 yrs" },
];

const DoctorFinder = () => {
  const [search, setSearch] = useState("");
  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageLayout>
      <PageHeader title="Find a Doctor" subtitle="Locate gynecologists, safe clinics, and book appointments nearby" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, specialty, or hospital..."
              className="w-full bg-card rounded-xl pl-12 pr-4 py-4 text-sm text-foreground placeholder:text-muted-foreground shadow-card focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>

          {/* Doctor List */}
          <div className="space-y-3">
            {filtered.map((doc, i) => (
              <motion.div key={doc.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl p-5 shadow-card hover:shadow-elevated transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-display text-lg font-bold text-foreground">{doc.name}</h4>
                    <p className="text-sm text-muted-foreground">{doc.specialty} · {doc.hospital} · {doc.exp} experience</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-sm text-gold font-medium">
                        <Star size={14} fill="currentColor" /> {doc.rating}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin size={14} /> {doc.distance}
                      </span>
                      <span className={`flex items-center gap-1 text-sm font-medium ${doc.available ? "text-sage" : "text-muted-foreground"}`}>
                        <Clock size={14} /> {doc.available ? "Available Today" : "Next week"}
                      </span>
                    </div>
                  </div>
                  <button className={`px-5 py-2 rounded-xl text-sm font-bold ${
                    doc.available ? "gradient-sage text-primary-foreground shadow-soft" : "bg-muted text-muted-foreground"
                  }`} disabled={!doc.available}>
                    {doc.available ? "Book Now" : "Unavailable"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div>
          <div className="gradient-terra rounded-2xl p-8 shadow-soft text-center sticky top-24">
            <MapPin size={40} className="text-accent-foreground mx-auto mb-3" />
            <h3 className="font-display text-xl font-bold text-accent-foreground">Nearby Clinics</h3>
            <p className="text-sm text-accent-foreground/80 mt-2 mb-4">View women-safe hospitals and clinics on a map near your location</p>
            <button className="bg-card text-terracotta px-5 py-2.5 rounded-xl font-bold">
              Open Map →
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DoctorFinder;
