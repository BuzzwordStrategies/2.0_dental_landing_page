'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import { useIndustrySimulation } from '../../hooks/useIndustrySimulation';
import { calculateClosureRate } from '../../lib/industryPhysics';
import { GlassCard } from '../ui/GlassCard';
import { Play, Pause, RefreshCw } from 'lucide-react';

// Dynamic import for 3D scene
const IndustryDissolveScene = dynamic(
  () => import('../three/IndustryDissolveScene').then(mod => ({ default: mod.IndustryDissolveScene })),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-900 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading Industry Visualization...</p>
        </div>
      </div>
    )
  }
);

export default function PhysicsIndustryCounter() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { labs, stats, startSimulation, stopSimulation, isRunning } = useIndustrySimulation();
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const closureData = calculateClosureRate();
  
  // Check if mobile and show simplified version
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    
    if (isMobile || isLowEnd) {
      setShowMobileWarning(true);
    }
  }, []);
  
  // Auto-start simulation when in view
  useEffect(() => {
    if (inView && !showMobileWarning) {
      startSimulation();
    }
    
    return () => stopSimulation();
  }, [inView, showMobileWarning, startSimulation, stopSimulation]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="my-16"
    >
      <GlassCard
        className="p-8"
        intensity={0.8}
        layers={3}
        interactive={false}
        colorShift={true}
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">
            Watch Your Industry Disappear in Real-Time
          </h3>
          <p className="text-gray-400">
            Every {closureData.daysPerClosure} days, another dental lab closes forever
          </p>
        </div>
        
        {/* 3D Visualization or Mobile Fallback */}
        {showMobileWarning ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl font-bold text-red-500 mb-2">
                {stats.total - stats.dissolved}
              </div>
              <p className="text-gray-400">Labs Still Operating</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold text-green-500">{stats.healthy}</div>
                <p className="text-gray-500">Thriving</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">{stats.struggling}</div>
                <p className="text-gray-500">At Risk</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">{stats.closing}</div>
                <p className="text-gray-500">Closing</p>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              (3D visualization requires desktop for optimal performance)
            </p>
          </div>
        ) : (
          <div className="relative">
            <div className="h-[400px] bg-gray-900 rounded-lg overflow-hidden">
              <IndustryDissolveScene labs={labs} className="w-full h-full" />
            </div>
            
            {/* Controls */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <button
                onClick={isRunning ? stopSimulation : startSimulation}
                className="bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 text-amber-400 p-2 rounded-lg hover:bg-amber-500/30 transition-colors"
              >
                {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Stats overlay */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-300">Healthy: {stats.healthy}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full" />
                <span className="text-sm text-gray-300">Struggling: {stats.struggling}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-sm text-gray-300">Closing: {stats.closing}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Projection */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            At current rate, the industry will be extinct by{' '}
            <span className="text-red-500 font-bold">
              {closureData.projectedZeroDate.getFullYear()}
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Unless labs like yours take action now
          </p>
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <button
            onClick={() => {
              const element = document.querySelector('[data-goal-selector]');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Be One of the Survivors
          </button>
        </motion.div>
      </GlassCard>
    </motion.div>
  );
}
