import { useState, useEffect, useRef, useCallback } from 'react';
import { PHYSICS_CONFIG, calculateClosureRate } from '../lib/industryPhysics';

export interface LabSphere {
  id: string;
  position: [number, number, number];
  status: 'healthy' | 'struggling' | 'closing' | 'dissolved';
  dissolvingProgress: number;
  velocity: [number, number, number];
  mass: number;
  createdAt: number;
}

export function useIndustrySimulation() {
  const [labs, setLabs] = useState<LabSphere[]>([]);
  const [stats, setStats] = useState({
    total: PHYSICS_CONFIG.labSphere.currentCount,
    healthy: 0,
    struggling: 0,
    closing: 0,
    dissolved: 0
  });
  const simulationRef = useRef<NodeJS.Timeout>();
  const lastClosureRef = useRef<number>(Date.now());
  
  // Initialize lab spheres
  const initializeLabs = useCallback(() => {
    const { currentCount } = PHYSICS_CONFIG.labSphere;
    const visibleCount = Math.min(currentCount, PHYSICS_CONFIG.performance.maxVisibleLabs);
    
    const initialLabs: LabSphere[] = [];
    
    // Create a grid formation initially
    const gridSize = Math.ceil(Math.sqrt(visibleCount));
    const spacing = 0.5;
    
    for (let i = 0; i < visibleCount; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      
      // Determine initial status based on industry data
      let status: LabSphere['status'] = 'healthy';
      const random = Math.random();
      if (random < 0.15) status = 'closing'; // 15% are closing
      else if (random < 0.45) status = 'struggling'; // 30% are struggling
      
      initialLabs.push({
        id: `lab-${i}`,
        position: [
          (col - gridSize / 2) * spacing,
          5 + row * spacing, // Start elevated
          (Math.random() - 0.5) * 2
        ],
        status,
        dissolvingProgress: 0,
        velocity: [0, 0, 0],
        mass: 1,
        createdAt: Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365 * 10 // Random age up to 10 years
      });
    }
    
    return initialLabs;
  }, []);
  
  // Start/stop simulation
  const startSimulation = useCallback(() => {
    if (simulationRef.current) return;
    
    const closureData = calculateClosureRate();
    const msPerClosure = closureData.daysPerClosure * 24 * 60 * 60 * 1000;
    
    simulationRef.current = setInterval(() => {
      const now = Date.now();
      
      // Check if it's time for another lab to close
      if (now - lastClosureRef.current > msPerClosure / 100) { // Speed up for demo
        lastClosureRef.current = now;
        
        setLabs(prevLabs => {
          // Find a healthy or struggling lab to start closing
          const candidates = prevLabs.filter(lab => 
            lab.status === 'healthy' || lab.status === 'struggling'
          );
          
          if (candidates.length > 0) {
            const victim = candidates[Math.floor(Math.random() * candidates.length)];
            return prevLabs.map(lab => 
              lab.id === victim.id 
                ? { ...lab, status: 'closing' as const }
                : lab
            );
          }
          
          return prevLabs;
        });
      }
      
      // Update dissolving progress for closing labs
      setLabs(prevLabs => 
        prevLabs.map(lab => {
          if (lab.status === 'closing') {
            const newProgress = lab.dissolvingProgress + (16 / PHYSICS_CONFIG.animation.disappearDuration);
            
            if (newProgress >= 1) {
              return { ...lab, status: 'dissolved' as const, dissolvingProgress: 1 };
            }
            
            return { ...lab, dissolvingProgress: newProgress };
          }
          return lab;
        })
      );
    }, 16); // 60fps
  }, []);
  
  const stopSimulation = useCallback(() => {
    if (simulationRef.current) {
      clearInterval(simulationRef.current);
      simulationRef.current = undefined;
    }
  }, []);
  
  // Update stats when labs change
  useEffect(() => {
    const newStats = labs.reduce((acc, lab) => {
      acc[lab.status]++;
      return acc;
    }, {
      total: labs.length,
      healthy: 0,
      struggling: 0,
      closing: 0,
      dissolved: 0
    });
    
    setStats(newStats);
  }, [labs]);
  
  // Initialize on mount
  useEffect(() => {
    setLabs(initializeLabs());
    return () => stopSimulation();
  }, [initializeLabs, stopSimulation]);
  
  return {
    labs,
    stats,
    startSimulation,
    stopSimulation,
    isRunning: !!simulationRef.current
  };
}
