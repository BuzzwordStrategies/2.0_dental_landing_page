// EXACT pricing from v2-build/src/components/BundleBuilder.js lines 89-96
export const pricing = {
  "Meta Ads": { Base: 770, Standard: 980, Premium: 1410 },
  "Google Ads": { Base: 770, Standard: 980, Premium: 1410 },
  "TikTok Ads": { Base: 770, Standard: 980, Premium: 1410 },
  "SEO": { Base: 790, Standard: 1000, Premium: 1450 },
  "GBP Ranker": { Base: 315, Standard: 420, Premium: 675 },
  "Backlinks": { Base: 420, Standard: 630, Premium: 990 },
  "Content": { Base: 210, Standard: 420, Premium: 760 },
  "Social Posts": { Base: 315, Standard: 525, Premium: 895 }
} as const;

// EXACT discount functions from v2-build/src/components/BundleBuilder.js
export const getSubscriptionDiscount = (months: number): number => {
  const discounts: Record<number, number> = {
    3: 0, 6: 2, 9: 3.5, 12: 5, 15: 6.5, 18: 8, 21: 9, 24: 10
  };
  return discounts[months] || 0;
};

export const getBundleDiscount = (num: number): number => {
  const discounts: Record<number, number> = {
    0: 0, 1: 0, 2: 1, 3: 2.5, 4: 4, 5: 5.5, 6: 7, 7: 8.5, 8: 10
  };
  return discounts[num] || 10;
};

// Bundle calculations with explicit math
export type ServiceTier = { service: string; tier: 'Base' | 'Standard' | 'Premium' };

export const calculateBundlePrice = (
  services: ServiceTier[],
  subscriptionMonths: number
): {
  basePrice: number;
  bundleDiscount: number;
  subscriptionDiscount: number;
  finalPrice: number;
  savedAmount: number;
} => {
  // Step 1: Calculate base price
  const basePrice = services.reduce((sum, { service, tier }) => {
    return sum + pricing[service as keyof typeof pricing][tier];
  }, 0);

  // Step 2: Get bundle discount percentage
  const bundleDiscountPercent = getBundleDiscount(services.length);
  const bundleDiscount = basePrice * (bundleDiscountPercent / 100);
  const afterBundlePrice = basePrice - bundleDiscount;

  // Step 3: Get subscription discount percentage
  const subscriptionDiscountPercent = getSubscriptionDiscount(subscriptionMonths);
  const subscriptionDiscount = afterBundlePrice * (subscriptionDiscountPercent / 100);
  const finalPrice = afterBundlePrice - subscriptionDiscount;

  // Step 4: Calculate total saved
  const savedAmount = basePrice - finalPrice;

  return {
    basePrice,
    bundleDiscount: bundleDiscountPercent,
    subscriptionDiscount: subscriptionDiscountPercent,
    finalPrice: Math.round(finalPrice),
    savedAmount: Math.round(savedAmount)
  };
};

// Pre-defined bundles
export const PREDEFINED_BUNDLES = {
  survivor: {
    name: "The Survivor",
    services: [
      { service: "SEO", tier: "Base" as const },
      { service: "Google Ads", tier: "Base" as const },
      { service: "Social Posts", tier: "Base" as const }
    ],
    description: "Perfect for labs just starting digital marketing"
  },
  competitor: {
    name: "The Competitor",
    services: [
      { service: "SEO", tier: "Standard" as const },
      { service: "Google Ads", tier: "Standard" as const },
      { service: "Content", tier: "Standard" as const },
      { service: "Backlinks", tier: "Base" as const }
    ],
    description: "Perfect for labs ready to take market share"
  },
  dominator: {
    name: "The Dominator",
    services: Object.keys(pricing).map(service => ({
      service,
      tier: "Premium" as const
    })),
    description: "Perfect for labs committed to market leadership"
  }
};
