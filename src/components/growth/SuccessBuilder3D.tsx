'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, PerformanceMonitor } from '@react-three/drei';
import { Suspense, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticCards } from '../three/MagneticCards';
import { SuccessTower } from '../three/SuccessTower';
import { LiquidPriceDisplay } from '../ui/LiquidPriceDisplay';
import { usePricing } from '../../contexts/PricingContext';
import { pricing as PRICING_DATA } from '../../lib/pricing-calculations';
import { Sparkles, Trophy, TrendingUp } from 'lucide-react';

// Update service descriptions to be positive and aspirational
const serviceDescriptions = {
  "Meta Ads": "Reach high-value patients who are ready for premium treatments",
  "Google Ads": "Capture dentists actively seeking quality lab partners",
  "TikTok Ads": "Showcase your craftsmanship to a new generation of dentists",
  "SEO": "Become the go-to lab when dentists search for excellence",
  "GBP Ranker": "Dominate local searches and attract nearby practices",
  "Backlinks": "Build authority that commands premium pricing",
  "Content": "Position yourself as the thought leader dentists trust",
  "Social Posts": "Stay top-of-mind with consistent, professional presence"
};

export default function SuccessBuilder3D() {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([8, 5, 8]);
  const { calculatePrice } = usePricing();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleServiceToggle = useCallback((service: string) => {
    setSelectedServices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(service)) {
        newSet.delete(service);
      } else {
        newSet.add(service);
      }
      return newSet;
    });
  }, []);

  // Calculate pricing for selected services
  const selectedArray = Array.from(selectedServices);
  const serviceItems = selectedArray.map(service => ({
    service,
    tier: 'Standard' as const // Default to Standard for this demo
  }));
  
  const pricingInfo = selectedArray.length > 0 
    ? calculatePrice(serviceItems)
    : { finalPrice: 0, savedAmount: 0, bundleDiscount: 0 };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Positive, ego-boosting header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-4">
            <Trophy className="w-5 h-5" />
            <span className="font-medium">Build Your Lab's Competitive Edge</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Craft Your Growth Strategy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the services that will elevate your lab above the competition. 
            Watch as your custom success plan takes shape in real-time.
          </p>
        </motion.div>

        {/* 3D Canvas Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Visualization */}
          <div className="lg:col-span-2">
            <div className="relative h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl">
              <Canvas
                ref={canvasRef}
                shadows
                dpr={[1, 2]}
                gl={{ 
                  antialias: true,
                  alpha: true,
                  powerPreference: "high-performance"
                }}
              >
                <PerspectiveCamera makeDefault position={cameraPosition} />
                <OrbitControls 
                  enablePan={false}
                  minDistance={5}
                  maxDistance={20}
                  maxPolarAngle={Math.PI / 2}
                />
                
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#F59E0B" />
                
                <Suspense fallback={<LoadingMesh />}>
                  <MagneticCards
                    services={Object.keys(PRICING_DATA)}
                    selectedServices={selectedServices}
                    hoveredService={hoveredService}
                    onServiceHover={setHoveredService}
                    onServiceSelect={handleServiceToggle}
                  />
                  
                  {selectedServices.size > 0 && (
                    <SuccessTower
                      selectedServices={Array.from(selectedServices)}
                      position={[0, -2, 0]}
                    />
                  )}
                </Suspense>
                
                <Environment preset="city" />
                <PerformanceMonitor onDecline={() => console.log('Performance declining')} />
              </Canvas>
              
              {/* Overlay instructions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2"
              >
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Click services to add them</span> • Drag to rotate
                </p>
              </motion.div>
              
              {/* Service description overlay */}
              <AnimatePresence>
                {hoveredService && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{hoveredService}</h4>
                    <p className="text-sm text-gray-600">{serviceDescriptions[hoveredService]}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Pricing Panel */}
          <div className="space-y-6">
            {/* Selected Services List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Your Growth Stack
              </h3>
              
              {selectedServices.size === 0 ? (
                <p className="text-gray-500 text-sm">
                  Select services to build your custom growth strategy
                </p>
              ) : (
                <div className="space-y-2">
                  {Array.from(selectedServices).map(service => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm font-medium text-gray-700">{service}</span>
                      <button
                        onClick={() => handleServiceToggle(service)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Liquid Price Display */}
            <LiquidPriceDisplay
              price={pricingInfo.finalPrice}
              savings={pricingInfo.savedAmount}
              discount={pricingInfo.bundleDiscount}
              servicesCount={selectedServices.size}
            />
            
            {/* Success Metrics */}
            {selectedServices.size >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                  <h4 className="font-semibold text-amber-900">Projected Impact</h4>
                </div>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li>• 47% average increase in qualified leads</li>
                  <li>• 3.2x ROI within first 6 months</li>
                  <li>• Position as top 3 labs in your market</li>
                </ul>
              </motion.div>
            )}
            
            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={selectedServices.size === 0}
              className={`w-full py-4 rounded-lg font-semibold transition-all ${
                selectedServices.size > 0
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {selectedServices.size === 0 
                ? 'Select Services to Continue'
                : `Launch My Growth Strategy - $${pricingInfo.finalPrice}/mo`
              }
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Loading component
function LoadingMesh() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#F59E0B" wireframe />
    </mesh>
  );
}
