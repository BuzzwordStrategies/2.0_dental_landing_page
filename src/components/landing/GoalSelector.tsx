"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { goalToBundleMap } from '../../constants/pricing-data';
import { ChevronRight, Target, AlertCircle } from 'lucide-react';

interface GoalSelectorProps {
  onGoalSelect: (goal: string) => void;
  selectedGoal: string | null;
}

const goals = [
  {
    id: "price-shopping",
    text: "Dentists are price shopping us to death",
    icon: "💸",
    description: "Offshore labs are offering 50% discounts"
  },
  {
    id: "no-technicians", 
    text: "Can't find qualified technicians",
    icon: "👥",
    description: "Average tech age is 51.5 years"
  },
  {
    id: "dso-squeeze",
    text: "DSOs are squeezing us out",
    icon: "🏢",
    description: "They get 20% better reimbursements"
  },
  {
    id: "no-visibility",
    text: "Nobody knows we exist online",
    icon: "👻",
    description: "Missing from Google searches"
  },
  {
    id: "no-differentiation",
    text: "We look exactly like every other lab",
    icon: "🤷",
    description: "Competing only on price"
  }
];

export default function GoalSelector({ onGoalSelect, selectedGoal }: GoalSelectorProps) {
  const [hoveredGoal, setHoveredGoal] = useState<string | null>(null);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What's Your Biggest Challenge Right Now?
          </h2>
          <p className="text-xl text-gray-600">
            Select your primary pain point to see a customized solution
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {goals.map((goal, index) => {
            const goalKey = goals.find(g => g.text === goal.text)?.text || "";
            const isSelected = selectedGoal === goal.text;
            
            return (
              <motion.button
                key={goal.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onGoalSelect(goal.text)}
                onMouseEnter={() => setHoveredGoal(goal.id)}
                onMouseLeave={() => setHoveredGoal(null)}
                className={`
                  relative p-6 rounded-xl border-2 transition-all duration-300
                  ${isSelected 
                    ? 'border-amber-500 bg-amber-50 shadow-xl' 
                    : 'border-gray-200 bg-white hover:border-amber-300 hover:shadow-lg'
                  }
                `}
              >
                <div className="text-4xl mb-3">{goal.icon}</div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  isSelected ? 'text-amber-900' : 'text-gray-800'
                }`}>
                  {goal.text}
                </h3>
                <p className={`text-sm ${
                  isSelected ? 'text-amber-700' : 'text-gray-600'
                }`}>
                  {goal.description}
                </p>
                
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {selectedGoal && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Scroll down to see your recommended bundle
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
