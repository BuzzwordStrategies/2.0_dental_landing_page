'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, Shield, Award } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { ValueFlowAnimation } from '../ui/ValueFlowAnimation';
import { FluidPriceSimulation } from '../three/FluidPriceSimulation';
import { calculateDigitalROI } from '../../lib/roi-calculator';

export default function DigitalTransformationSection() {
  const [activeComparison, setActiveComparison] = useState<'traditional' | 'digital'>('traditional');
  const [avgCaseValue, setAvgCaseValue] = useState(800);
  const [monthlyVolume, setMonthlyVolume] = useState(100);
  const [showROI, setShowROI] = useState(false);
  
  const roi = calculateDigitalROI(avgCaseValue, monthlyVolume);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black relative overflow-hidden">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-purple-100 to-blue-100 dark:from-amber-900/20 dark:via-purple-900/20 dark:to-blue-900/20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Word of Mouth Isn't Enough Anymore
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            While offshore labs compete on price, smart labs build premium brands that command 
            <span className="text-amber-600 font-semibold"> 40% higher case values</span> through digital presence
          </p>
        </motion.div>

        {/* Interactive Comparison */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Traditional Lab Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard
              className={`p-8 cursor-pointer transition-all ${
                activeComparison === 'traditional' 
                  ? 'ring-2 ring-red-500 dark:ring-red-400' 
                  : 'opacity-70 hover:opacity-100'
              }`}
              intensity={activeComparison === 'traditional' ? 0.9 : 0.6}
              layers={3}
              interactive={true}
              onClick={() => setActiveComparison('traditional')}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Traditional "Invisible" Lab
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 dark:text-red-400 text-sm">✗</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">Competing on price alone</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Forced to match offshore rates</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 dark:text-red-400 text-sm">✗</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">Limited to local referrals</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Missing 77% of dentists who search online</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 dark:text-red-400 text-sm">✗</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">No brand differentiation</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Seen as interchangeable commodity</p>
                  </div>
                </div>
              </div>
              
              {/* Price pressure visualization */}
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">Average Case Value</p>
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                  $500 <span className="text-lg font-normal">and falling</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Digital-First Lab Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard
              className={`p-8 cursor-pointer transition-all ${
                activeComparison === 'digital' 
                  ? 'ring-2 ring-green-500 dark:ring-green-400' 
                  : 'opacity-70 hover:opacity-100'
              }`}
              intensity={activeComparison === 'digital' ? 0.9 : 0.6}
              layers={3}
              interactive={true}
              colorShift={true}
              onClick={() => setActiveComparison('digital')}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Digital-First Premium Lab
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">Competing on expertise</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Showcasing advanced capabilities online</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">Attracting quality clients</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Found by dentists seeking premium partners</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">Building trusted brand</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Known for quality, not just price</p>
                  </div>
                </div>
              </div>
              
              {/* Premium value visualization */}
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">Average Case Value</p>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  $1,200+ <span className="text-lg font-normal">and growing</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Fluid Simulation Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
            <FluidPriceSimulation activeMode={activeComparison} />
            
            {/* Overlay content */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                {activeComparison === 'traditional' ? (
                  <motion.div
                    key="traditional-message"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center"
                  >
                    <h3 className="text-3xl font-bold text-white mb-2">
                      Value Draining to Offshore Competition
                    </h3>
                    <p className="text-gray-300">Click "Digital-First" to see the transformation</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="digital-message"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center"
                  >
                    <h3 className="text-3xl font-bold text-white mb-2">
                      Value Flowing to Your Premium Brand
                    </h3>
                    <p className="text-gray-300">Digital presence attracts quality-focused dentists</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8" intensity={0.8} layers={3} interactive={true}>
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-8 h-8 text-amber-600" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Calculate Your Digital Transformation ROI
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Average Case Value
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={avgCaseValue}
                    onChange={(e) => setAvgCaseValue(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Case Volume
                </label>
                <input
                  type="number"
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowROI(true)}
              className="w-full mt-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all"
            >
              Show My Potential Revenue Increase
            </motion.button>

            <AnimatePresence>
              {showROI && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 overflow-hidden"
                >
                  <ValueFlowAnimation value={roi.monthlyIncrease} />
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue Increase</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        +${roi.monthlyIncrease.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Annual Impact</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        +${roi.annualIncrease.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">ROI in 12 Months</p>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {roi.percentageROI}%
                      </p>
                    </div>
                  </div>

                  <motion.a
                    href="#bundle-selector"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg text-center hover:from-green-600 hover:to-green-700 transition-all"
                  >
                    Start Your Digital Transformation Today
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </motion.div>

        {/* Success Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-4 gap-6"
        >
          {[
            { icon: TrendingUp, label: "40% Higher Case Values", subtext: "Through premium positioning" },
            { icon: Shield, label: "Price Protection", subtext: "Compete on value, not cost" },
            { icon: Award, label: "Brand Recognition", subtext: "Become the go-to lab" },
            { icon: Calculator, label: "Predictable Growth", subtext: "Consistent new clients" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6 text-center" intensity={0.6} layers={2}>
                <item.icon className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.label}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.subtext}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
