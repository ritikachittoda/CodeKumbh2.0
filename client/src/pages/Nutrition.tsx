import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/shared/PageHeader";
import { motion } from "framer-motion";
import { Droplets, Apple, Moon } from "lucide-react";
import { useState } from "react";

const ironFoods = [
  { name: "Spinach", emoji: "🥬", iron: "2.7mg", tip: "Pair with lemon for better absorption" },
  { name: "Lentils (Dal)", emoji: "🫘", iron: "3.3mg", tip: "A staple superfood rich in protein too" },
  { name: "Chickpeas", emoji: "🧆", iron: "2.9mg", tip: "Great as chaat or hummus" },
  { name: "Dates", emoji: "🌴", iron: "1.0mg", tip: "Natural energy booster" },
  { name: "Jaggery", emoji: "🍬", iron: "11mg", tip: "Replace refined sugar with jaggery" },
  { name: "Pomegranate", emoji: "🍎", iron: "0.3mg", tip: "Boosts hemoglobin naturally" },
  { name: "Beetroot", emoji: "🥤", iron: "0.8mg", tip: "Excellent for blood building" },
  { name: "Black Sesame", emoji: "⚫", iron: "14.6mg", tip: "Add to smoothies or ladoo" },
];

const meals = [
  { meal: "Breakfast", food: "Oats porridge with dates, almonds & honey", time: "8:00 AM", emoji: "🥣" },
  { meal: "Mid-morning", food: "Amla juice + handful of roasted chana", time: "10:30 AM", emoji: "🍏" },
  { meal: "Lunch", food: "Spinach dal, brown rice, beetroot raita", time: "1:00 PM", emoji: "🍛" },
  { meal: "Snack", food: "Pomegranate + jaggery-sesame ladoo", time: "4:30 PM", emoji: "🍎" },
  { meal: "Dinner", food: "Roti, palak paneer, mixed veg sabzi", time: "7:30 PM", emoji: "🥘" },
];

const Nutrition = () => {
  const [waterCount, setWaterCount] = useState(3);
  const [sleepHours, setSleepHours] = useState(7);

  return (
    <PageLayout>
      <PageHeader title="Nutrition & Lifestyle" subtitle="Iron-rich meal plans, hydration tracking, and healthy sleep habits" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Water */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Droplets size={18} className="text-ocean" />
            <h3 className="font-display text-lg font-bold text-foreground">Water Intake</h3>
          </div>
          <div className="flex items-center gap-1 flex-wrap mb-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <button key={i} onClick={() => setWaterCount(i + 1)}
                className={`text-2xl transition-all ${i < waterCount ? "scale-110 opacity-100" : "opacity-25 hover:opacity-50"}`}>💧</button>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(waterCount / 8) * 100}%` }}
              className="h-full rounded-full bg-ocean" transition={{ duration: 0.5 }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{waterCount}/8 glasses · {waterCount >= 8 ? "Great job! 🎉" : `${8 - waterCount} more to go`}</p>
        </div>

        {/* Sleep */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Moon size={18} className="text-plum" />
            <h3 className="font-display text-lg font-bold text-foreground">Sleep Tracker</h3>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => setSleepHours(Math.max(0, sleepHours - 0.5))}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-foreground hover:bg-plum-light transition-colors">−</button>
            <div className="text-center">
              <span className="text-4xl font-display font-bold text-foreground">{sleepHours}</span>
              <span className="text-sm text-muted-foreground ml-1">hrs</span>
            </div>
            <button onClick={() => setSleepHours(Math.min(12, sleepHours + 0.5))}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-foreground hover:bg-plum-light transition-colors">+</button>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-3">
            {sleepHours >= 7 ? "Excellent rest! 🌟" : sleepHours >= 5 ? "Try to get 7+ hours 😴" : "You need more sleep 💤"}
          </p>
        </div>

        {/* Meal Plan */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Apple size={18} className="text-terracotta" />
            <h3 className="font-display text-lg font-bold text-foreground">Today's Meals</h3>
          </div>
          <div className="space-y-3">
            {meals.map((item) => (
              <div key={item.meal} className="flex items-center gap-3">
                <span className="text-lg">{item.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">{item.meal}</p>
                  <p className="text-xs text-muted-foreground">{item.food}</p>
                </div>
                <span className="text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded-lg">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Iron foods */}
      <h2 className="font-display text-xl font-bold text-foreground mb-4">Iron-Rich Foods Guide</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ironFoods.map((food, i) => (
          <motion.div key={food.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }} className="bg-sage-light rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{food.emoji}</span>
              <h4 className="font-bold text-foreground">{food.name}</h4>
            </div>
            <p className="text-xs text-muted-foreground">Iron: {food.iron}/100g</p>
            <p className="text-xs text-sage mt-1 font-medium">{food.tip}</p>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Nutrition;
