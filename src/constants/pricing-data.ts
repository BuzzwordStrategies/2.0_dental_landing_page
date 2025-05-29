// REFERENCE: v2-build/src/components/BundleBuilder.js lines 89-96
// DO NOT MODIFY THESE VALUES - They are the source of truth

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

// REFERENCE: v2-build/src/components/BundleBuilder.js - discount functions
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

// Pre-calculated bundles based on master instructions
export const preMadeBundles = {
  survivor: {
    name: "The Survivor",
    tagline: "Perfect for: Labs just starting digital marketing",
    services: [
      { name: "SEO", tier: "Base" as const, price: pricing["SEO"].Base },
      { name: "Google Ads", tier: "Base" as const, price: pricing["Google Ads"].Base },
      { name: "Social Posts", tier: "Base" as const, price: pricing["Social Posts"].Base }
    ],
    // Base calculation: 790 + 770 + 315 = 1,875
    basePrice: 1875,
    targetPrice: 1200 // Approximate after discounts
  },
  competitor: {
    name: "The Competitor", 
    tagline: "Perfect for: Labs ready to take market share",
    services: [
      { name: "SEO", tier: "Standard" as const, price: pricing["SEO"].Standard },
      { name: "Google Ads", tier: "Standard" as const, price: pricing["Google Ads"].Standard },
      { name: "Content", tier: "Standard" as const, price: pricing["Content"].Standard },
      { name: "Backlinks", tier: "Base" as const, price: pricing["Backlinks"].Base }
    ],
    // Base calculation: 1000 + 980 + 420 + 420 = 2,820
    basePrice: 2820,
    targetPrice: 2500 // Approximate after discounts
  },
  dominator: {
    name: "The Dominator",
    tagline: "Perfect for: Labs committed to market leadership",
    services: Object.entries(pricing).map(([name, tiers]) => ({
      name,
      tier: "Premium" as const,
      price: tiers.Premium
    })),
    // Base calculation: 1410 + 1410 + 1410 + 1450 + 675 + 990 + 760 + 895 = 9,000
    basePrice: 9000,
    targetPrice: 5500 // Approximate after discounts
  }
};

// Goal-to-bundle mapping
export const goalToBundleMap: Record<string, keyof typeof preMadeBundles> = {
  "Dentists are price shopping us to death": "survivor",
  "Can't find qualified technicians": "competitor", 
  "DSOs are squeezing us out": "dominator",
  "Nobody knows we exist online": "competitor",
  "We look exactly like every other lab": "dominator"
};
