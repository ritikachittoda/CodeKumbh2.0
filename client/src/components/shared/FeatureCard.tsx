import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradient: string;
  onClick?: () => void;
}

const FeatureCard = ({ icon, title, description, gradient, onClick }: FeatureCardProps) => (
  <motion.button
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow text-left w-full"
  >
    <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="font-display text-lg font-bold text-foreground mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </motion.button>
);

export default FeatureCard;
