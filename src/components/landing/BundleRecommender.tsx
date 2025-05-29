"use client";

import { motion } from 'framer-motion';
import { usePricing } from '../../contexts/PricingContext';
import { PREDEFINED_BUNDLES } from '../../lib/pricing-calculations';
import { Check, ArrowRight, Calculator } from 'lucide-react';
import Link from 'next/link';

interface BundleRecommenderProps {
  selectedGoal: string | null;
}

const goalToBundleMap: Record<string, keyof typeof PREDEFINED_BUNDLES> = {
  "Dentists are price shopping us to death": "survivor",
  "Can't find qualified technicians": "competitor", 
  "DSOs are squeezing us out": "dominator",
  "Nobody knows we exist online": "competitor",
  "We look exactly like every other lab": "dominator"
};

export default function BundleRecommender({ selectedGoal }: BundleRecommenderProps) {
  const { subscriptionMonths, calculatePrice } = usePricing();
  
  const recommendedBundleKey = selectedGoal ? goalToBundleMap[selectedGoal] : null;
  const recommendedBundle = recommendedBundleKey ? PREDEFINED_BUNDLES[recommendedBundleKey] : null;

  if (!selectedGoal || !recommendedBundle) return null;

  const pricing = calculatePrice(recommendedBundle.services);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Based on Your Challenge: {recommendedBundle.name}
          </h2>
          <p className="text-xl text-gray-600">
            {recommendedBundle.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-xl border-2 border-amber-200"
        >
          {/* Price Display */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-2xl text-gray-500 line-through">
                ${pricing.basePrice}/mo
              </span>
              <motion.span
                key={pricing.finalPrice}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl font-bold text-amber-600"
              >
                ${pricing.finalPrice}/mo
              </motion.span>
            </div>
            <p className="text-green-600 font-semibold">
              You save ${pricing.savedAmount}/month ({Math.round((pricing.savedAmount / pricing.basePrice) * 100)}% off)
            </p>
          </div>

          {/* Services Included */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {recommendedBundle.services.map((service, index) => (
              <motion.div
                key={service.service}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm"
              >
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <div className="flex-1">
                  <span className="font-semibold text-gray-800">{service.service}</span>
                  <span className="text-gray-600"> - {service.tier}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-white/50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Price Calculation
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base bundle price:</span>
                <span className="font-medium">${pricing.basePrice}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Bundle discount ({recommendedBundle.services.length} services):</span>
                <span className="font-medium">-{pricing.bundleDiscount}%</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>{subscriptionMonths}-month commitment discount:</span>
                <span className="font-medium">-{pricing.subscriptionDiscount}%</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Final monthly price:</span>
                <span className="text-amber-600">${pricing.finalPrice}</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/checkout?bundle=${recommendedBundleKey}&months=${subscriptionMonths}`}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Start With This Bundle
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/bundle-builder"
              className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-6 rounded-lg border-2 border-gray-300 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Customize Your Bundle
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
