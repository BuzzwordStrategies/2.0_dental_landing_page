"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { calculateBundlePrice, ServiceTier } from '../lib/pricing-calculations';

interface PricingContextType {
  subscriptionMonths: number;
  setSubscriptionMonths: (months: number) => void;
  calculatePrice: (services: ServiceTier[]) => ReturnType<typeof calculateBundlePrice>;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const PricingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscriptionMonths, setSubscriptionMonths] = useState(12);

  const calculatePrice = useCallback((services: ServiceTier[]) => {
    return calculateBundlePrice(services, subscriptionMonths);
  }, [subscriptionMonths]);

  return (
    <PricingContext.Provider value={{
      subscriptionMonths,
      setSubscriptionMonths,
      calculatePrice
    }}>
      {children}
    </PricingContext.Provider>
  );
};

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};
