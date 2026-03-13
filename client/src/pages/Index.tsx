import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  Brain,
  Dumbbell,
  Stethoscope,
  Activity,
  Pill,
  Utensils,
  BookOpen,
  TrendingUp,
  Lightbulb
} from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import FeatureCard from "../components/shared/FeatureCard";
import CycleRing from "../components/dashboard/CycleRing";
import MoodSelector from "../components/dashboard/MoodSelector";

import { useEffect, useState } from "react";
import axios from "axios";

import heroBg from "@/assets/hero-bg.jpg";

const API = "http://localhost:5000/api/cycles";

const features = [
  { icon: <Heart size={22} />, title: "Period Tracker", desc: "Track cycles", path: "/period", gradient: "gradient-terra" },
  { icon: <Brain size={22} />, title: "Mental Health", desc: "Mood journaling", path: "/mental-health", gradient: "gradient-plum" },
  { icon: <Utensils size={22} />, title: "Nutrition Planner", desc: "Healthy diet", path: "/nutrition", gradient: "gradient-sage" },
  { icon: <Dumbbell size={22} />, title: "Exercise", desc: "Workout plans", path: "/exercise", gradient: "gradient-ocean" },
  { icon: <Activity size={22} />, title: "PCOS Checker", desc: "Risk assessment", path: "/pcos", gradient: "gradient-terra" },
  { icon: <Pill size={22} />, title: "Anemia Scanner", desc: "Iron detection", path: "/anemia", gradient: "gradient-sage" },
  { icon: <Stethoscope size={22} />, title: "Find Doctor", desc: "Nearby specialists", path: "/doctor-finder", gradient: "gradient-plum" },
  { icon: <BookOpen size={22} />, title: "Health Wallet", desc: "Medical records", path: "/health-wallet", gradient: "gradient-ocean" },
];

const insights = [
  { title: "Ovulation Phase", text: "Energy is high today.", icon: "🌟" },
  { title: "Iron Tip", text: "Eat spinach and lentils.", icon: "🥬" },
  { title: "Sleep Tip", text: "Keep room cool tonight.", icon: "🌙" },
];

function calculateCycle(startDate, cycleLength) {

  if (!startDate || !cycleLength) return null;

  const today = new Date();
  const start = new Date(startDate);

  const diffTime = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const currentDay = (diffDays % cycleLength) + 1;

  let phase = "Luteal";
  let fertility = "Low";

  if (currentDay <= 5) phase = "Menstrual";
  else if (currentDay <= 13) phase = "Follicular";
  else if (currentDay <= 16) {
    phase = "Ovulation";
    fertility = "High";
  }

  return {
    currentDay,
    phase,
    fertility,
    cycleLength,
    nextPeriod: cycleLength - currentDay
  };
}

export default function Index() {

  const navigate = useNavigate();

  const [cycleInfo, setCycleInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCycles = async () => {

      try {

        const res = await axios.get(API);
        const cycles = res.data;

        if (!cycles || cycles.length === 0) {
          setCycleInfo(null);
          setLoading(false);
          return;
        }

        const lastCycle = cycles[cycles.length - 1];

        const cycleData = calculateCycle(
          lastCycle.startDate,
          parseInt(lastCycle.length)
        );

        setCycleInfo(cycleData);

      } catch (error) {
        console.error("Failed to fetch cycles:", error);
      }

      setLoading(false);

    };

    fetchCycles();

  }, []);

  return (
    <PageLayout>

      {/* HERO */}
      <section className="relative rounded-3xl overflow-hidden mb-12">
        <img
          src={heroBg}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 px-8 py-20">

          <h1 className="text-5xl font-bold mb-4">
            Your Complete Women's Health Companion
          </h1>

          <button
            onClick={() => navigate("/period")}
            className="gradient-sage px-6 py-3 rounded-xl text-white"
          >
            Start Tracking
          </button>

        </div>
      </section>


      {/* HEALTH TOOLS */}
      <section className="mb-12">

        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={20} />
          <h2 className="text-2xl font-bold">All Health Tools</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {features.map((f) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.desc}
              gradient={f.gradient}
              onClick={() => navigate(f.path)}
            />
          ))}

        </div>

      </section>


      {/* DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

        {/* Cycle Overview */}
        <div className="bg-card rounded-2xl p-8 text-center shadow-card">

          <h2 className="text-xl font-bold mb-6">
            Cycle Overview
          </h2>

          {loading ? (

            <p>Loading...</p>

          ) : cycleInfo ? (

            <>
              <CycleRing
                currentDay={cycleInfo.currentDay}
                totalDays={cycleInfo.cycleLength}
                phase={cycleInfo.phase}
              />

              <div className="flex justify-center gap-8 mt-6">

                <div>
                  <p className="text-xs">Next Period</p>
                  <p className="font-bold">
                    {cycleInfo.nextPeriod} days
                  </p>
                </div>

                <div>
                  <p className="text-xs">Cycle</p>
                  <p className="font-bold">
                    {cycleInfo.cycleLength} days
                  </p>
                </div>

                <div>
                  <p className="text-xs">Fertility</p>
                  <p className="font-bold text-terracotta">
                    {cycleInfo.fertility}
                  </p>
                </div>

              </div>
            </>

          ) : (

            <div>

              <p>No cycle data yet</p>

              <button
                onClick={() => navigate("/period")}
                className="mt-4 bg-primary text-white px-4 py-2 rounded-lg"
              >
                Log Period
              </button>

            </div>

          )}

        </div>

        {/* Mood Selector */}
        <MoodSelector />

        {/* Insights */}
        <div className="bg-card rounded-2xl p-6 shadow-card">

          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={18} />
            <h2 className="text-xl font-bold">
              Daily Insights
            </h2>
          </div>

          {insights.map((item) => (

            <div key={item.title} className="mb-3 p-3 bg-muted rounded-xl">

              <div className="flex gap-2">

                <span>{item.icon}</span>

                <div>
                  <p className="font-bold">
                    {item.title}
                  </p>

                  <p className="text-sm">
                    {item.text}
                  </p>
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </PageLayout>
  );
}