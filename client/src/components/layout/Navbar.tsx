import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Home,
  Brain,
  Dumbbell,
  Activity,
  Pill,
  Stethoscope,
  BookOpen,
  Shield,
  Menu,
  X
} from "lucide-react";

const links = [
  { path: "/", icon: Home, label: "Dashboard" },
  { path: "/period", icon: Heart, label: "Period Tracker" },
  { path: "/mental-health", icon: Brain, label: "Mental Health" },
  { path: "/exercise", icon: Dumbbell, label: "Exercise & Yoga" },
  { path: "/pcos", icon: Activity, label: "PCOS Checker" },
  { path: "/anemia", icon: Pill, label: "Anemia Scanner" },
  { path: "/doctor-finder", icon: Stethoscope, label: "Find Doctor" },
  { path: "/health-wallet", icon: BookOpen, label: "Health Wallet" },
  { path: "/sos", icon: Shield, label: "SOS" }
];

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2">

            <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-lg flex items-center justify-center text-white">
              <Heart size={18} fill="currentColor" />
            </div>

            <span className="text-xl font-bold tracking-tight text-rose-600">
              DivineFeminine
            </span>

          </NavLink>


          {/* DESKTOP LINKS */}
          <div className="hidden pl-20 lg:flex items-center gap-6">

            {links
              .filter(link => link.path !== "/sos")
              .map((link) => {

                const isActive = location.pathname === link.path;

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
                      isActive
                        ? "text-rose-600 bg-rose-50"
                        : "text-slate-600 hover:text-rose-500"
                    }`}
                  >
                    {link.label}
                  </NavLink>
                );
              })}

            {/* SOS BUTTON */}
            <NavLink
              to="/sos"
              className="ml-3 bg-gradient-to-r from-orange-400 to-rose-500 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md hover:scale-105 transition"
            >
              🚨 SOS
            </NavLink>

          </div>


          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-slate-600"
          >
            {open ? <X size={22}/> : <Menu size={22}/>}
          </button>

        </div>
      </nav>


      {/* MOBILE MENU */}
      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity:0, y:-20 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-20 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 lg:hidden"
          >

            <div className="flex flex-col gap-5 text-lg font-medium">

              {links.map((link) => {

                const isActive = location.pathname === link.path;

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl transition ${
                      isActive
                        ? "bg-rose-50 text-rose-600"
                        : "text-slate-700 hover:bg-rose-50"
                    }`}
                  >
                    <link.icon size={18}/>
                    {link.label}
                  </NavLink>
                );
              })}

            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}