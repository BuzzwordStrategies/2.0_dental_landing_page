// Physics configuration for industry dissolution visualization
export const PHYSICS_CONFIG = {
  // Lab sphere properties
  labSphere: {
    initialCount: 7800, // Labs in 2004
    currentCount: 6100, // Labs today
    radius: 0.1,
    colors: {
      healthy: '#10B981', // Green - thriving labs
      struggling: '#F59E0B', // Amber - at risk
      closing: '#EF4444', // Red - closing
      dissolved: '#6B7280' // Gray - closed
    }
  },
  
  // Physics parameters
  physics: {
    gravity: { x: 0, y: -9.8, z: 0 },
    restitution: 0.3, // Bounce factor
    friction: 0.7,
    damping: 0.1
  },
  
  // Animation timing
  animation: {
    labDisappearRate: 16, // One lab every 16 days
    disappearDuration: 2000, // 2 seconds to fully dissolve
    waveDelay: 100, // Delay between dissolution waves
    particlesPerLab: 50
  },
  
  // Performance settings
  performance: {
    maxVisibleLabs: 200, // Limit for mobile performance
    lodDistance: 10, // Level of detail distance
    shadowsEnabled: true,
    particleLimit: 5000
  }
};

// Calculate labs closing per time unit
export const calculateClosureRate = (
  startYear: number = 2004,
  startCount: number = 7800,
  currentCount: number = 6100
): {
  totalClosed: number;
  closureRate: number;
  daysPerClosure: number;
  projectedZeroDate: Date;
} => {
  const currentYear = new Date().getFullYear();
  const yearsPassed = currentYear - startYear;
  const totalClosed = startCount - currentCount;
  const closureRate = totalClosed / yearsPassed; // Per year
  const daysPerClosure = 365 / closureRate;
  
  // Project when labs hit zero at current rate
  const yearsToZero = currentCount / closureRate;
  const projectedZeroDate = new Date();
  projectedZeroDate.setFullYear(currentYear + yearsToZero);
  
  return {
    totalClosed,
    closureRate: Math.round(closureRate),
    daysPerClosure: Math.round(daysPerClosure),
    projectedZeroDate
  };
};
