'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';

interface GoalSelectorProps {
  onGoalSelect: (goal: string) => void;
  selectedGoal: string | null;
}

const goals = [
  {
    id: 'price-shopping',
    text: 'Dentists are price shopping us to death',
    emoji: '💸',
    description: 'Offshore labs are offering 50% discounts'
  },
  {
    id: 'no-technicians',
    text: "Can't find qualified technicians",
    emoji: '👥',
    description: 'Average tech age is 51.5 years'
  },
  {
    id: 'dso-squeeze',
    text: 'DSOs are squeezing us out',
    emoji: '🏢',
    description: 'They get 20% better reimbursements'
  },
  {
    id: 'no-online-presence',
    text: 'Nobody knows we exist online',
    emoji: '🔍',
    description: 'Missing from Google searches'
  },
  {
    id: 'generic-lab',
    text: 'We look exactly like every other lab',
    emoji: '👥',
    description: 'Competing only on price'
  }
];

export default function GoalSelector({ onGoalSelect, selectedGoal }: GoalSelectorProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What's Your Biggest Challenge Right Now?
          </h2>
          <p className="text-xl text-gray-600">
            Select your primary pain point to see a customized solution
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  selectedGoal === goal.text
                    ? 'ring-2 ring-amber-500 bg-amber-50/80'
                    : 'hover:shadow-lg'
                }`}
                intensity={selectedGoal === goal.text ? 0.9 : 0.6}
                layers={selectedGoal === goal.text ? 3 : 2}
                interactive={true}
                colorShift={true}
                onClick={() => onGoalSelect(goal.text)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{goal.emoji}</div>
                  <h3 className="font-semibold text-gray-800 mb-2 leading-tight">
                    {goal.text}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {goal.description}
                  </p>
                </div>
                
                {selectedGoal === goal.text && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {selectedGoal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-8"
          >
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Scroll down to see your recommended bundle</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
