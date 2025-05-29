'use client';

import { useState } from 'react';
import Hero from '../components/Hero';
import FloatingCTAs from '../components/FloatingCTAs';
import MarketRealityDashboard from '../components/dashboard/MarketRealityDashboard';
import DigitalTransformationSection from '../components/landing/DigitalTransformationSection';
import SuccessBuilder3D from '../components/growth/SuccessBuilder3D';
import GoalSelector from '../components/landing/GoalSelector';
import BundleRecommender from '../components/landing/BundleRecommender';
import { SubscriptionSlider } from '../components/SubscriptionSlider';

export default function Home() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal);
  };

  return (
    <>
      <Hero />
      <FloatingCTAs />
      <MarketRealityDashboard />
      
      {/* Digital Transformation Section */}
      <DigitalTransformationSection />
      
      {/* 3D Success Builder */}
      <SuccessBuilder3D />
      
      <GoalSelector 
        onGoalSelect={handleGoalSelect}
        selectedGoal={selectedGoal}
      />
      
      {/* Sticky Subscription Slider */}
      <div className="sticky top-20 z-40 mb-8 max-w-4xl mx-auto px-4">
        <SubscriptionSlider />
      </div>
      
      <div id="bundle-selector">
        <BundleRecommender 
          selectedGoal={selectedGoal}
        />
      </div>
      
      {/* Placeholder sections for smooth scrolling */}
      <div id="seo-audit" className="min-h-screen bg-gray-100 p-20">
        <h2 className="text-3xl font-bold text-center">SEO Audit Section (Phase 12)</h2>
      </div>
      
      <div id="blog-generator" className="min-h-screen bg-gray-200 p-20">
        <h2 className="text-3xl font-bold text-center">Blog Generator Section (Phase 13)</h2>
      </div>
    </>
  );
}
