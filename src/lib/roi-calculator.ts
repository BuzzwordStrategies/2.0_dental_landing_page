export interface DigitalROI {
  currentRevenue: number;
  potentialRevenue: number;
  monthlyIncrease: number;
  annualIncrease: number;
  percentageROI: number;
  breakEvenMonths: number;
}

export function calculateDigitalROI(
  avgCaseValue: number,
  monthlyVolume: number,
  digitalGrowthMultiplier: number = 1.4, // 40% increase from digital presence
  newClientGrowth: number = 0.25 // 25% new client growth
): DigitalROI {
  // Current state
  const currentMonthlyRevenue = avgCaseValue * monthlyVolume;
  const currentAnnualRevenue = currentMonthlyRevenue * 12;
  
  // Digital transformation projections
  const improvedCaseValue = avgCaseValue * digitalGrowthMultiplier;
  const improvedVolume = monthlyVolume * (1 + newClientGrowth);
  const potentialMonthlyRevenue = improvedCaseValue * improvedVolume;
  const potentialAnnualRevenue = potentialMonthlyRevenue * 12;
  
  // ROI calculations
  const monthlyIncrease = potentialMonthlyRevenue - currentMonthlyRevenue;
  const annualIncrease = potentialAnnualRevenue - currentAnnualRevenue;
  
  // Assuming average marketing investment of $3,000/month
  const monthlyInvestment = 3000;
  const annualInvestment = monthlyInvestment * 12;
  
  const percentageROI = Math.round(((annualIncrease - annualInvestment) / annualInvestment) * 100);
  const breakEvenMonths = Math.ceil(monthlyInvestment / (monthlyIncrease - monthlyInvestment));
  
  return {
    currentRevenue: currentMonthlyRevenue,
    potentialRevenue: potentialMonthlyRevenue,
    monthlyIncrease,
    annualIncrease,
    percentageROI,
    breakEvenMonths
  };
}

// Success metrics based on real dental lab data
export const industryBenchmarks = {
  traditionalLab: {
    avgCaseValue: 500,
    monthlyVolume: 100,
    growthRate: -0.02, // 2% decline annually
    clientRetention: 0.85
  },
  digitalLab: {
    avgCaseValue: 1200,
    monthlyVolume: 150,
    growthRate: 0.15, // 15% growth annually
    clientRetention: 0.94
  }
};
