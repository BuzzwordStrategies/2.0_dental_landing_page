// CRITICAL: These values are from the bundle builder and MUST NOT be changed
export const PRICING = {
  "Meta Ads": { Base: 770, Standard: 980, Premium: 1410 },
  "Google Ads": { Base: 770, Standard: 980, Premium: 1410 },
  "TikTok Ads": { Base: 770, Standard: 980, Premium: 1410 },
  "SEO": { Base: 790, Standard: 1000, Premium: 1450 },
  "GBP Ranker": { Base: 315, Standard: 420, Premium: 675 },
  "Backlinks": { Base: 420, Standard: 630, Premium: 990 },
  "Content": { Base: 210, Standard: 420, Premium: 760 },
  "Social Posts": { Base: 315, Standard: 525, Premium: 895 }
} as const;

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

// Pre-calculated bundles
export const BUNDLES = {
  survivor: {
    name: "The Survivor",
    services: ["SEO", "Google Ads", "Social Posts"],
    tiers: { SEO: "Base", "Google Ads": "Base", "Social Posts": "Base" },
    basePrice: 790 + 770 + 315, // $1,875
    description: "Perfect for labs just starting digital marketing"
  },
  competitor: {
    name: "The Competitor",
    services: ["SEO", "Google Ads", "Content", "Backlinks"],
    tiers: { SEO: "Standard", "Google Ads": "Standard", Content: "Standard", Backlinks: "Base" },
    basePrice: 1000 + 980 + 420 + 420, // $2,820
    description: "Perfect for labs ready to take market share"
  },
  dominator: {
    name: "The Dominator",
    services: ["Meta Ads", "Google Ads", "TikTok Ads", "SEO", "GBP Ranker", "Backlinks", "Content", "Social Posts"],
    tiers: {
      "Meta Ads": "Premium",
      "Google Ads": "Premium",
      "TikTok Ads": "Premium",
      "SEO": "Premium",
      "GBP Ranker": "Premium",
      "Backlinks": "Premium",
      "Content": "Premium",
      "Social Posts": "Premium"
    },
    basePrice: 1410 + 1410 + 1410 + 1450 + 675 + 990 + 760 + 895, // $9,000
    description: "Perfect for labs committed to market leadership"
  }
} as const;

// Landing page copy
export const COPY = {
  hero: {
    headline: "While You're Reading This, Another Lab Just Lost a 20-Year Client to Offshore Pricing",
    subheadline: "22% of dental labs have closed since 2004. Here's how to ensure yours isn't next.",
    citation: "NADL Industry Data, 2024"
  },
  stats: {
    labsIn2004: 7800,
    labsToday: 6100,
    closingRate: "1 every 16 days",
    avgTechnicianAge: 51.5,
    retirementWave: "33% in 5 years",
    offshoreShare: 38,
    dsoControl: 23,
    projectedControl: 50
  }
} as const;
