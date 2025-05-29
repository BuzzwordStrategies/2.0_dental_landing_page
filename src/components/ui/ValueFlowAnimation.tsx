'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';

interface ValueFlowAnimationProps {
  value: number;
}

export function ValueFlowAnimation({ value }: ValueFlowAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create flowing dollar signs
    const createDollarFlow = () => {
      const dollar = document.createElement('div');
      dollar.className = 'absolute text-2xl font-bold text-green-500';
      dollar.textContent = '$';
      dollar.style.left = `${Math.random() * 100}%`;
      dollar.style.bottom = '0';
      
      containerRef.current?.appendChild(dollar);
      
      gsap.to(dollar, {
        y: -200,
        x: (Math.random() - 0.5) * 100,
        opacity: 0,
        duration: 2,
        ease: 'power2.out',
        onComplete: () => dollar.remove()
      });
    };
    
    const interval = setInterval(createDollarFlow, 200);
    
    // Animate the value counter
    const counter = { value: 0 };
    gsap.to(counter, {
      value: value,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        const display = containerRef.current?.querySelector('.value-display');
        if (display) {
          display.textContent = `+$${Math.floor(counter.value).toLocaleString()}`;
        }
      }
    });
    
    return () => clearInterval(interval);
  }, [value]);
  
  return (
    <div ref={containerRef} className="relative h-48 overflow-hidden">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="value-display text-5xl font-bold text-green-600 dark:text-green-400">
            +$0
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Monthly Revenue Potential</p>
        </div>
      </motion.div>
      
      {/* Background glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-radial from-green-400/20 to-transparent"
      />
    </div>
  );
}
