// EXACT pricing from v2-build/src/components/BundleBuilder.js lines 89-96
export const PRICING = {
  "Meta Ads": { Base: 770, Standard: 980, Premium: 1410 },
  "Google Ads": { Base: 770, Standard: 980, Premium: 1410 },
  "TikTok Ads": { Base: 770, Standard: 980, Premium: 1410 },
  "SEO": { Base: 790, Standard: 1000, Premium: 1450 },
  "GBP Ranker": { Base: 315, Standard: 420, Premium: 675 },
  "Backlinks": { Base: 420, Standard: 630, Premium: 990 },
  "Content": { Base: 210, Standard: 420, Premium: 760 },
  "Social Posts": { Base: 315, Standard: 525, Premium: 895 }
} as const

// EXACT discount functions from bundle builder
export const getSubscriptionDiscount = (months: number): number => {
  const discounts: Record<number, number> = {
    3: 0, 6: 2, 9: 3.5, 12: 5, 15: 6.5, 18: 8, 21: 9, 24: 10
  }
  return discounts[months] || 0
}

export const getBundleDiscount = (num: number): number => {
  const discounts: Record<number, number> = {
    0: 0, 1: 0, 2: 1, 3: 2.5, 4: 4, 5: 5.5, 6: 7, 7: 8.5, 8: 10
  }
  return discounts[num] || 10
}

// Pre-calculated bundles (show the math)
export const BUNDLES = {
  survivor: {
    name: "The Survivor",
    services: [
      { name: "SEO", tier: "Base", price: 790 },
      { name: "Google Ads", tier: "Base", price: 770 },
      { name: "Social Posts", tier: "Base", price: 315 }
    ],
    // Base calculation: 790 + 770 + 315 = 1,875
    basePrice: 1875,
    // With 3 services, bundle discount = 2.5%
    // 1,875 * (1 - 0.025) = 1,828.13
    getPrice: (months: number) => {
      const bundleDiscounted = 1875 * 0.975 // 2.5% bundle discount
      const subDiscount = getSubscriptionDiscount(months)
      return bundleDiscounted * (1 - subDiscount / 100)
    }
  },
  competitor: {
    name: "The Competitor",
    services: [
      { name: "SEO", tier: "Standard", price: 1000 },
      { name: "Google Ads", tier: "Standard", price: 980 },
      { name: "Content", tier: "Standard", price: 420 },
      { name: "Backlinks", tier: "Base", price: 420 }
    ],
    // Base calculation: 1000 + 980 + 420 + 420 = 2,820
    basePrice: 2820,
    // With 4 services, bundle discount = 4%
    // 2,820 * (1 - 0.04) = 2,707.20
    getPrice: (months: number) => {
      const bundleDiscounted = 2820 * 0.96 // 4% bundle discount
      const subDiscount = getSubscriptionDiscount(months)
      return bundleDiscounted * (1 - subDiscount / 100)
    }
  },
  dominator: {
    name: "The Dominator",
    services: Object.entries(PRICING).map(([name, tiers]) => ({
      name,
      tier: "Premium" as const,
      price: tiers.Premium
    })),
    // Base calculation: sum of all Premium tiers
    // 1410 + 1410 + 1410 + 1450 + 675 + 990 + 760 + 895 = 9,000
    basePrice: 9000,
    // With 8 services, bundle discount = 10%
    // 9,000 * (1 - 0.10) = 8,100
    getPrice: (months: number) => {
      const bundleDiscounted = 9000 * 0.90 // 10% bundle discount
      const subDiscount = getSubscriptionDiscount(months)
      return bundleDiscounted * (1 - subDiscount / 100)
    }
  }
}
