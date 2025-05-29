export const industryStatistics = {
  dentalLabs: {
    year2004: 7800,
    current: 6100,
    closureRate: 22, // percentage
    closingFrequency: 16, // days
    source: "NADL Industry Data, 2024"
  },
  workforce: {
    averageTechnicianAge: 51.5,
    retirementPercentage: 33,
    retirementTimeframe: 5, // years
    shortageSeverity: "3,000+ technicians needed",
    source: "Bureau of Labor Statistics, 2024"
  },
  marketShare: {
    offshore: 38, // current percentage
    dso: 23, // current percentage
    projectedCombined2030: 50, // percentage
    source: "Dental Economics Research, 2024"
  },
  digitalAdoption: {
    medicalDeviceDigital: 96, // percentage
    pharmaDigitalBudget: 46, // percentage
    dentalLabSocialMedia: 40, // percentage
    dentalLabSEO: 30, // percentage
    source: "Healthcare Marketing Report, 2024"
  }
};

export const industryTrends = {
  labsClosing: {
    total: industryStatistics.dentalLabs.year2004 - industryStatistics.dentalLabs.current,
    rate: `1 every ${industryStatistics.dentalLabs.closingFrequency} days`,
    percentage: industryStatistics.dentalLabs.closureRate
  },
  workforceCrisis: {
    retiringSoon: `${industryStatistics.workforce.retirementPercentage}% in ${industryStatistics.workforce.retirementTimeframe} years`,
    averageAge: industryStatistics.workforce.averageTechnicianAge
  },
  marketPressure: {
    currentThreat: industryStatistics.marketShare.offshore + industryStatistics.marketShare.dso,
    futureControl: industryStatistics.marketShare.projectedCombined2030
  }
};
