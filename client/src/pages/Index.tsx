// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   Heart, Brain, Dumbbell, Stethoscope, Activity, Pill, Shield, Utensils, BookOpen, TrendingUp, Lightbulb,
// } from "lucide-react";
// import PageLayout from "@/components/layout/PageLayout";
// import FeatureCard from "@/components/shared/FeatureCard";
// import CycleRing from "@/components/dashboard/CycleRing";
// import MoodSelector from "@/components/dashboard/MoodSelector";
// import heroBg from "@/assets/hero-bg.jpg";

// const features = [
//   { icon: <Heart size={22} className="text-accent-foreground" />, title: "Period Tracker", desc: "Track cycles, predict periods, and get phase insights", path: "/period", gradient: "gradient-terra" },
//   { icon: <Brain size={22} className="text-accent-foreground" />, title: "Mental Health", desc: "Mood journaling, stress scoring, and AI support", path: "/mental-health", gradient: "gradient-plum" },
//   { icon: <Utensils size={22} className="text-accent-foreground" />, title: "Nutrition Planner", desc: "Iron-rich meals, water & sleep tracking", path: "/nutrition", gradient: "gradient-sage" },
//   { icon: <Dumbbell size={22} className="text-accent-foreground" />, title: "Exercise & Yoga", desc: "Symptom-based workout recommendations", path: "/exercise", gradient: "gradient-ocean" },
//   { icon: <Activity size={22} className="text-accent-foreground" />, title: "PCOS Checker", desc: "AI risk assessment for hormonal disorders", path: "/pcos", gradient: "gradient-terra" },
//   { icon: <Pill size={22} className="text-accent-foreground" />, title: "Anemia Scanner", desc: "Symptom check and iron-rich diet plans", path: "/anemia", gradient: "gradient-sage" },
//   { icon: <Stethoscope size={22} className="text-accent-foreground" />, title: "Find a Doctor", desc: "Locate gynecologists and safe clinics nearby", path: "/doctor-finder", gradient: "gradient-plum" },
//   { icon: <BookOpen size={22} className="text-accent-foreground" />, title: "Health Wallet", desc: "Secure digital storage for medical records", path: "/health-wallet", gradient: "gradient-ocean" },
// ];

// const insights = [
//   { title: "Ovulation Phase", text: "You may feel more energetic. Great time for workouts and social activities!", icon: "🌟" },
//   { title: "Iron Boost Tip", text: "Include spinach, lentils, and vitamin C-rich foods for healthy iron levels.", icon: "🥬" },
//   { title: "Sleep Insight", text: "Body temperature rises during ovulation. Keep your room cool for better rest.", icon: "🌙" },
// ];

// const Index = () => {
//   const navigate = useNavigate();

//   return (
//     <PageLayout>
//       {/* Hero Section */}
//       <section className="relative rounded-3xl overflow-hidden mb-12">
//         <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
//         <div className="relative z-10 px-8 md:px-16 py-16 md:py-24">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="max-w-2xl"
//           >
//             <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
//               Your Complete{" "}
//               <span className="text-gradient">Women's Health</span>{" "}
//               Companion
//             </h1>
//             <p className="text-lg text-muted-foreground mb-8 max-w-lg">
//               Track your cycle, nurture your mind, fuel your body, and take control of your health — all in one place.
//             </p>
//             <div className="flex flex-wrap gap-3">
//               <button
//                 onClick={() => navigate("/period")}
//                 className="gradient-sage text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-soft hover:opacity-90 transition-opacity"
//               >
//                 Start Tracking
//               </button>
//               <button
//                 onClick={() => navigate("/sos")}
//                 className="gradient-terra text-accent-foreground px-6 py-3 rounded-xl font-semibold shadow-soft hover:opacity-90 transition-opacity"
//               >
//                 🚨 Emergency SOS
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Dashboard Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//         {/* Cycle Tracker */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-card rounded-2xl p-8 shadow-card flex flex-col items-center"
//         >
//           <h2 className="font-display text-xl font-bold text-foreground mb-6 self-start">Cycle Overview</h2>
//           <CycleRing currentDay={15} totalDays={28} phase="Ovulation" />
//           <div className="flex gap-6 mt-6 w-full justify-center">
//             <div className="text-center">
//               <p className="text-xs text-muted-foreground">Next Period</p>
//               <p className="text-sm font-bold text-foreground">13 days</p>
//             </div>
//             <div className="w-px bg-border" />
//             <div className="text-center">
//               <p className="text-xs text-muted-foreground">Cycle</p>
//               <p className="text-sm font-bold text-foreground">28 days</p>
//             </div>
//             <div className="w-px bg-border" />
//             <div className="text-center">
//               <p className="text-xs text-muted-foreground">Fertility</p>
//               <p className="text-sm font-bold text-terracotta">High</p>
//             </div>
//           </div>
//           <button
//             onClick={() => navigate("/period")}
//             className="mt-6 gradient-sage text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-bold shadow-soft w-full"
//           >
//             Log Period
//           </button>
//         </motion.div>

//         {/* Mood Selector */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <MoodSelector />
//         </motion.div>

//         {/* Insights */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="bg-card rounded-2xl p-6 shadow-card"
//         >
//           <div className="flex items-center gap-2 mb-4">
//             <Lightbulb size={18} className="text-gold" />
//             <h2 className="font-display text-xl font-bold text-foreground">Daily Insights</h2>
//           </div>
//           <div className="space-y-3">
//             {insights.map((item) => (
//               <div key={item.title} className="bg-sand-light rounded-xl p-4">
//                 <div className="flex items-start gap-3">
//                   <span className="text-xl">{item.icon}</span>
//                   <div>
//                     <h4 className="font-body font-bold text-sm text-foreground">{item.title}</h4>
//                     <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.text}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* Symptom Quick Log */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.35 }}
//         className="bg-card rounded-2xl p-6 shadow-card mb-12"
//       >
//         <h2 className="font-display text-xl font-bold text-foreground mb-4">Quick Symptom Log</h2>
//         <div className="flex flex-wrap gap-2">
//           {["Cramps", "Bloating", "Headache", "Fatigue", "Acne", "Back Pain", "Breast Pain", "Nausea", "Mood Swings", "Insomnia", "Cravings", "Dizziness"].map(
//             (symptom) => (
//               <button
//                 key={symptom}
//                 className="px-4 py-2 rounded-xl bg-muted text-sm font-medium text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
//               >
//                 {symptom}
//               </button>
//             )
//           )}
//         </div>
//       </motion.div>

//       {/* All Features */}
//       <section className="mb-8">
//         <div className="flex items-center gap-2 mb-6">
//           <TrendingUp size={20} className="text-primary" />
//           <h2 className="font-display text-2xl font-bold text-foreground">All Health Tools</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {features.map((f, i) => (
//             <motion.div
//               key={f.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 + i * 0.05 }}
//             >
//               <FeatureCard
//                 icon={f.icon}
//                 title={f.title}
//                 description={f.desc}
//                 gradient={f.gradient}
//                 onClick={() => navigate(f.path)}
//               />
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </PageLayout>
//   );
// };

// export default Index;