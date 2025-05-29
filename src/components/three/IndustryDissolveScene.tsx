'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, useSphere, useBox } from '@react-three/cannon';
import { Float, Text, PerformanceMonitor, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { LabSphere } from '../../hooks/useIndustrySimulation';
import { PHYSICS_CONFIG } from '../../lib/industryPhysics';
import * as THREE from 'three';

interface LabSphereMeshProps {
  lab: LabSphere;
  onCollision?: () => void;
}

function LabSphereMesh({ lab, onCollision }: LabSphereMeshProps) {
  const [ref, api] = useSphere(() => ({
    mass: lab.mass,
    position: lab.position,
    args: [PHYSICS_CONFIG.labSphere.radius],
    material: {
      friction: PHYSICS_CONFIG.physics.friction,
      restitution: PHYSICS_CONFIG.physics.restitution
    }
  }));
  
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Create particle geometry for dissolution effect
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PHYSICS_CONFIG.animation.particlesPerLab * 3);
    
    for (let i = 0; i < PHYSICS_CONFIG.animation.particlesPerLab; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = PHYSICS_CONFIG.labSphere.radius;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);
  
  // Update position from physics
  useFrame(() => {
    if (!meshRef.current) return;
    
    if (lab.status === 'dissolved') {
      // Hide completely dissolved labs
      meshRef.current.visible = false;
      if (particlesRef.current) particlesRef.current.visible = false;
    } else {
      // Apply dissolving animation for closing labs
      if (lab.status === 'closing') {
        meshRef.current.scale.setScalar(1 - lab.dissolvingProgress * 0.5);
        
        // Make particles visible and expand during dissolution
        if (particlesRef.current) {
          particlesRef.current.visible = true;
          particlesRef.current.scale.setScalar(1 + lab.dissolvingProgress * 2);
          (particlesRef.current.material as THREE.PointsMaterial).opacity = 1 - lab.dissolvingProgress;
        }
      } else {
        // Ensure particles are hidden for healthy/struggling labs
        if (particlesRef.current) {
          particlesRef.current.visible = false;
        }
      }
    }
  });
  
  const color = PHYSICS_CONFIG.labSphere.colors[lab.status];
  
  return (
    <group ref={ref as any}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[PHYSICS_CONFIG.labSphere.radius, 32, 16]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.3}
          roughness={0.4}
          clearcoat={1}
          clearcoatRoughness={0.2}
          transparent={lab.status === 'closing'}
          opacity={lab.status === 'closing' ? 1 - lab.dissolvingProgress * 0.7 : 1}
        />
      </mesh>
      
      <points ref={particlesRef} visible={false} geometry={particleGeometry}>
        <pointsMaterial
          color={color}
          size={0.01}
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function Ground() {
  const [ref] = useBox(() => ({
    type: 'Static',
    position: [0, -2, 0],
    args: [20, 0.1, 20]
  }));
  
  return (
    <mesh ref={ref as any} receiveShadow>
      <boxGeometry args={[20, 0.1, 20]} />
      <meshStandardMaterial color="#1a1a1a" />
    </mesh>
  );
}

interface IndustryDissolveSceneProps {
  labs: LabSphere[];
  className?: string;
}

export function IndustryDissolveScene({ labs, className = '' }: IndustryDissolveSceneProps) {
  const [degraded, setDegraded] = useState(false);
  
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows={!degraded}
        camera={{ position: [0, 5, 10], fov: 50 }}
        gl={{ 
          antialias: !degraded,
          powerPreference: "high-performance"
        }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow={!degraded}
          shadow-mapSize={[2048, 2048]}
        />
        
        <Physics gravity={[PHYSICS_CONFIG.physics.gravity.x, PHYSICS_CONFIG.physics.gravity.y, PHYSICS_CONFIG.physics.gravity.z]}>
          <Ground />
          
          {labs.map(lab => (
            <LabSphereMesh key={lab.id} lab={lab} />
          ))}
        </Physics>
        
        {/* Status text */}
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          <Text
            position={[0, 3, 0]}
            fontSize={0.5}
            color="#F59E0B"
            anchorX="center"
            anchorY="middle"
          >
            {`${labs.filter(l => l.status !== 'dissolved').length} Labs Remaining`}
          </Text>
        </Float>
        
        <PerformanceMonitor
          onDecline={() => setDegraded(true)}
          flipflops={3}
          factor={1.5}
        />
      </Canvas>
    </div>
  );
}
