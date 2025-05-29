"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { usePricing } from '../contexts/PricingContext';
import { getSubscriptionDiscount } from '../lib/pricing-calculations';

export const SubscriptionSlider: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { subscriptionMonths, setSubscriptionMonths } = usePricing();
  const discount = getSubscriptionDiscount(subscriptionMonths);

  return (
    <div className={`bg-gray-900 border border-gray-800 rounded-xl p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Subscription Length</h3>
        <motion.div
          key={discount}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-green-400 font-bold text-lg"
        >
          Save {discount}%
        </motion.div>
      </div>

      <div className="space-y-4">
        <input
          type="range"
          min="3"
          max="24"
          step="3"
          value={subscriptionMonths}
          onChange={(e) => setSubscriptionMonths(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #D28C00 0%, #D28C00 ${((subscriptionMonths - 3) / 21) * 100}%, #374151 ${((subscriptionMonths - 3) / 21) * 100}%, #374151 100%)`
          }}
        />
        
        <div className="flex justify-between text-sm text-gray-400">
          <span>3mo</span>
          <span>6mo</span>
          <span>9mo</span>
          <span>12mo</span>
          <span>15mo</span>
          <span>18mo</span>
          <span>21mo</span>
          <span>24mo</span>
        </div>

        <motion.div
          key={subscriptionMonths}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <p className="text-3xl font-bold text-[#D28C00]">{subscriptionMonths} months</p>
          <p className="text-sm text-gray-400 mt-1">
            Lock in your rate and save {discount}% off monthly pricing
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #D28C00;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(210, 140, 0, 0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #D28C00;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(210, 140, 0, 0.5);
        }
      `}</style>
    </div>
  );
};
