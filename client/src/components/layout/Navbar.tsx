import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, Heart, Brain, Utensils, Dumbbell, Shield, Activity,
  Pill, Stethoscope, BookOpen, Menu, X
} from "lucide-react";
import { useState } from "react";

const links = [
  { path: "/", icon: Home, label: "Dashboard" },
  { path: "/period", icon: Heart, label: "Period Tracker" },
  { path: "/mental-health", icon: Brain, label: "Mental Health" },
  { path: "/nutrition", icon: Utensils, label: "Nutrition" },
  { path: "/exercise", icon: Dumbbell, label: "Exercise & Yoga" },
  { path: "/pcos", icon: Activity, label: "PCOS Checker" },
  { path: "/anemia", icon: Pill, label: "Anemia Scanner" },
  { path: "/doctor-finder", icon: Stethoscope, label: "Find Doctor" },
  { path: "/health-wallet", icon: BookOpen, label: "Health Wallet" },
  { path: "/sos", icon: Shield, label: "Emergency SOS" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Desktop & Mobile top bar */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-sage flex items-center justify-center">
              <Heart size={16} className="text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">SheWell</span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.slice(0, 7).map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </NavLink>
              );
            })}
            <NavLink
              to="/sos"
              className="ml-2 px-4 py-2 rounded-lg gradient-terra text-accent-foreground text-sm font-bold shadow-soft"
            >
              🚨 SOS
            </NavLink>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 rounded-lg bg-muted flex items-center justify-center"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-0 top-16 z-40 bg-card border-b border-border shadow-elevated lg:hidden"
        >
          <nav className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 gap-2">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <link.icon size={16} />
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
