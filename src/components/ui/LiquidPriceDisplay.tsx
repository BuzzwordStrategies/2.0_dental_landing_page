'use client';

import { useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, animate } from 'framer-motion';
import { DollarSign, TrendingUp, Sparkles } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface LiquidPriceDisplayProps {
  price: number;
  savings: number;
  discount: number;
  servicesCount: number;
}

export function LiquidPriceDisplay({ 
  price, 
  savings, 
  discount,
  servicesCount 
}: LiquidPriceDisplayProps) {
  const previousPrice = useRef(price);
  const displayPrice = useMotionValue(previousPrice.current);
  
  // Liquid number morphing effect
  useEffect(() => {
    const controls = animate(displayPrice, price, {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for liquid feel
      onUpdate: (latest) => {
        // Add slight vibration during transition
        if (Math.abs(latest - price) > 1) {
          displayPrice.set(latest + (Math.random() - 0.5) * 2);
        }
      }
    });
    
    previousPrice.current = price;
    return controls.stop;
  }, [price, displayPrice]);
  
  // Spring animation for size changes
  const springConfig = { stiffness: 300, damping: 30 };
  const scale = useSpring(1, springConfig);
  
  useEffect(() => {
    // Pulse effect when price changes
    scale.set(1.1);
    setTimeout(() => scale.set(1), 200);
  }, [price, scale]);
  
  return (
    <GlassCard
      className="p-6 relative overflow-hidden"
      intensity={0.8}
      layers={3}
      colorShift={true}
      interactive={false}
    >
      {/* Liquid background effect */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 400 400">
          <defs>
            <filter id="liquid">
              <feTurbulence
                baseFrequency="0.01"
                numOctaves="2"
                result="turbulence"
              />
              <feColorMatrix
                in="turbulence"
                mode="saturate"
                values="2"
                result="coloredTurbulence"
              />
              <feGaussianBlur in="coloredTurbulence" stdDeviation="10" />
            </filter>
          </defs>
          <rect
            width="100%"
            height="100%"
            filter="url(#liquid)"
            fill="#F59E0B"
            opacity="0.3"
          />
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-500" />
            Your Investment
          </h3>
          {servicesCount >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
            >
              <Sparkles className="w-3 h-3" />
              Bundle Bonus Active
            </motion.div>
          )}
        </div>
        
        {/* Liquid price display */}
        <motion.div
          style={{ scale }}
          className="text-center mb-4"
        >
          <motion.div className="text-5xl font-bold text-gray-900 tabular-nums">
            $<motion.span>{displayPrice}</motion.span>
            <span className="text-2xl text-gray-600">/mo</span>
          </motion.div>
        </motion.div>
        
        {/* Savings indicator */}
        {savings > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 rounded-lg p-3"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-800 font-medium">You're saving:</span>
              <span className="text-green-600 font-bold">${savings}/mo ({discount}%)</span>
            </div>
            
            {/* Visual savings bar */}
            <div className="mt-2 h-2 bg-green-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-green-600"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(discount * 2, 100)}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}
        
        {/* ROI Indicator */}
        {price > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600"
          >
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span>Average ROI: {(price / 500).toFixed(1)}x in 6 months</span>
          </motion.div>
        )}
      </div>
    </GlassCard>
  );
}
