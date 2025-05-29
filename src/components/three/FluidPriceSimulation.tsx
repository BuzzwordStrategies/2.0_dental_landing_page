'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import { Points, PointsMaterial } from 'three';
import * as THREE from 'three';

interface FluidPriceSimulationProps {
  activeMode: 'traditional' | 'digital';
}

// Simplified fluid particle system using existing Three.js
function FluidParticles({ mode }: { mode: 'traditional' | 'digital' }) {
  const pointsRef = useRef<Points>(null);
  const particleCount = 5000;
  
  // Create particle positions
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      if (mode === 'traditional') {
        // Traditional - particles start from center and drain outward
        pos[i3] = (Math.random() - 0.5) * 4;
        pos[i3 + 1] = Math.random() * 4 - 2;
        pos[i3 + 2] = (Math.random() - 0.5) * 4;
      } else {
        // Digital - particles flow inward from edges
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 3 + Math.random() * 2;
        pos[i3] = Math.cos(angle) * radius;
        pos[i3 + 1] = Math.random() * 3 - 1.5;
        pos[i3 + 2] = Math.sin(angle) * radius;
      }
    }
    
    return pos;
  }, [mode, particleCount]);
  
  // Animation loop
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      if (mode === 'traditional') {
        // Traditional - particles drain down and spread out
        positions[i3 + 1] -= 0.01; // Fall down
        positions[i3] += Math.sin(time + i * 0.01) * 0.002; // Drift
        positions[i3 + 2] += Math.cos(time + i * 0.01) * 0.002;
        
        // Reset particles that fall too low
        if (positions[i3 + 1] < -3) {
          positions[i3 + 1] = 3;
          positions[i3] = (Math.random() - 0.5) * 2;
          positions[i3 + 2] = (Math.random() - 0.5) * 2;
        }
      } else {
        // Digital - particles flow inward
        const x = positions[i3];
        const z = positions[i3 + 2];
        const distance = Math.sqrt(x * x + z * z);
        
        if (distance > 0.5) {
          positions[i3] *= 0.995; // Move toward center
          positions[i3 + 2] *= 0.995;
          positions[i3 + 1] += Math.sin(time * 2 + i * 0.01) * 0.005; // Gentle wave
        } else {
          // Reset particles that reach center
          const angle = Math.random() * Math.PI * 2;
          const radius = 3 + Math.random() * 2;
          positions[i3] = Math.cos(angle) * radius;
          positions[i3 + 2] = Math.sin(angle) * radius;
        }
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);
  
  const material = useMemo(() => {
    return new PointsMaterial({
      color: mode === 'traditional' ? '#ef4444' : '#10b981',
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, [mode]);
  
  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

export function FluidPriceSimulation({ activeMode }: FluidPriceSimulationProps) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <FluidParticles mode={activeMode} />
      </Suspense>
    </Canvas>
  );
}
