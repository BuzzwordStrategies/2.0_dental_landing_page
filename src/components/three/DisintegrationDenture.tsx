'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { InstancedMesh, Vector3, Object3D, Color, Group } from 'three';
import { gsap } from 'gsap';

// Fallback geometries if models don't load
import { TorusGeometry, CylinderGeometry, SphereGeometry } from 'three';

interface DisintegrationDentureProps {
  scrollProgress?: number;
}

export function DisintegrationDenture({ scrollProgress = 0 }: DisintegrationDentureProps) {
  const groupRef = useRef<Group>(null);
  const topModelRef = useRef<any>();
  const baseRef = useRef<any>();
  const teethRef = useRef<any>();
  const particlesRef = useRef<InstancedMesh>(null);
  const { viewport } = useThree();
  
  // Try to load denture models, fallback to basic geometries
  let topGeometry, baseGeometry, teethGeometry;
  
  try {
    // Attempt to load the GLB models
    const topModel = useGLTF('/models/top-model.glb');
    const baseModel = useGLTF('/models/base-model.glb');
    const teethModel = useGLTF('/models/teeth-model.glb');
    
    topGeometry = (topModel.nodes.mesh as any)?.geometry;
    baseGeometry = (baseModel.nodes.mesh as any)?.geometry;
    teethGeometry = (teethModel.nodes.mesh as any)?.geometry;
  } catch {
    // Fallback geometries that represent denture parts
    topGeometry = new TorusGeometry(1.2, 0.3, 16, 32); // Top arch
    baseGeometry = new CylinderGeometry(1, 1, 0.2, 32); // Base plate
    teethGeometry = new SphereGeometry(0.8, 16, 16); // Teeth cluster
  }
  
  // Particle system setup
  const particleCount = 3000;
  const dummy = useMemo(() => new Object3D(), []);
  
  // Initialize particles for disintegration
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      // Distribute particles around the denture shape
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 0.5 + Math.random() * 1.5;
      const height = (Math.random() - 0.5) * 2;
      
      const position = new Vector3(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );
      
      const scale = Math.random() * 0.3 + 0.1;
      const speed = Math.random() * 0.02 + 0.01;
      const partType = Math.floor(Math.random() * 3); // 0=top, 1=base, 2=teeth
      
      temp.push({ 
        position, 
        scale, 
        speed, 
        originalPos: position.clone(),
        partType,
        delay: Math.random() * 0.5
      });
    }
    return temp;
  }, []);
  
  // Disintegration effect based on scroll
  useEffect(() => {
    if (!groupRef.current) return;
    
    const disintegrationFactor = scrollProgress;
    
    // Animate each denture part separately
    if (topModelRef.current) {
      gsap.to(topModelRef.current.material, {
        opacity: Math.max(0, 1 - disintegrationFactor * 1.2),
        metalness: 0.9 - disintegrationFactor * 0.3,
        roughness: 0.1 + disintegrationFactor * 0.4,
        duration: 0.1
      });
      
      gsap.to(topModelRef.current.position, {
        y: disintegrationFactor * 2,
        x: disintegrationFactor * 0.5,
        duration: 0.2
      });
      
      gsap.to(topModelRef.current.rotation, {
        x: disintegrationFactor * 0.3,
        z: disintegrationFactor * 0.2,
        duration: 0.2
      });
    }
    
    if (baseRef.current) {
      gsap.to(baseRef.current.material, {
        opacity: Math.max(0, 1 - (disintegrationFactor - 0.2) * 1.5),
        duration: 0.1
      });
      
      gsap.to(baseRef.current.position, {
        y: -disintegrationFactor * 1.5,
        duration: 0.2
      });
      
      gsap.to(baseRef.current.rotation, {
        y: disintegrationFactor * 0.5,
        duration: 0.2
      });
    }
    
    if (teethRef.current) {
      gsap.to(teethRef.current.material, {
        opacity: Math.max(0, 1 - (disintegrationFactor - 0.1) * 1.8),
        duration: 0.1
      });
      
      gsap.to(teethRef.current.position, {
        y: disintegrationFactor * 0.5,
        x: -disintegrationFactor * 0.8,
        duration: 0.2
      });
      
      gsap.to(teethRef.current.rotation, {
        x: -disintegrationFactor * 0.4,
        y: disintegrationFactor * 0.3,
        duration: 0.2
      });
    }
  }, [scrollProgress]);
  
  // Animate particles
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const time = state.clock.elapsedTime;
    const disintegrationFactor = scrollProgress;
    
    particles.forEach((particle, i) => {
      const { position, scale, speed, originalPos, partType, delay } = particle;
      
      // Delayed disintegration based on part type
      const partDelay = partType * 0.2 + delay;
      const adjustedDisintegration = Math.max(0, disintegrationFactor - partDelay);
      
      if (adjustedDisintegration > 0) {
        // Disintegration movement with physics
        const dispersal = adjustedDisintegration * adjustedDisintegration;
        position.x = originalPos.x + (Math.random() - 0.5) * dispersal * 8;
        position.y = originalPos.y + dispersal * 4 + Math.sin(time * speed) * 0.2;
        position.z = originalPos.z + (Math.random() - 0.5) * dispersal * 8;
        
        // Add gravity effect
        position.y -= dispersal * dispersal * 2;
      } else {
        // Keep particles in original formation
        position.copy(originalPos);
        position.y += Math.sin(time * speed + i * 0.1) * 0.05;
      }
      
      // Update instance
      dummy.position.copy(position);
      dummy.scale.setScalar(scale * (1 - adjustedDisintegration * 0.7));
      dummy.rotation.x = time * speed;
      dummy.rotation.y = time * speed * 0.5;
      dummy.updateMatrix();
      
      particlesRef.current!.setMatrixAt(i, dummy.matrix);
      
      // Color based on part type and disintegration
      const color = new Color();
      const hue = partType === 0 ? 0.1 : partType === 1 ? 0.05 : 0.15; // Different colors for each part
      color.setHSL(hue, 0.8, 0.4 + adjustedDisintegration * 0.4);
      particlesRef.current!.setColorAt(i, color);
    });
    
    particlesRef.current.instanceMatrix.needsUpdate = true;
    if (particlesRef.current.instanceColor) {
      particlesRef.current.instanceColor.needsUpdate = true;
    }
    
    // Rotate the entire group slowly
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
    }
  });
  
  const scale = viewport.width > 6 ? 1.5 : 1;
  
  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={scale}>
      {/* Top Model (Upper denture) */}
      <mesh
        ref={topModelRef}
        geometry={topGeometry}
        position={[0, 0.5, 0]}
        rotation={[0, 0, 0]}
      >
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={256}
          transmission={0.95}
          roughness={0.1}
          thickness={0.3}
          ior={1.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.05}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#D28C00"
          color="#F8F6F0"
          metalness={0.9}
          transparent
          opacity={1}
        />
      </mesh>
      
      {/* Base (Middle denture base) */}
      <mesh
        ref={baseRef}
        geometry={baseGeometry}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      >
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={256}
          transmission={0.9}
          roughness={0.15}
          thickness={0.4}
          ior={1.4}
          chromaticAberration={0.03}
          clearcoat={0.8}
          attenuationDistance={0.6}
          attenuationColor="#E6B800"
          color="#FFF8E1"
          metalness={0.7}
          transparent
          opacity={1}
        />
      </mesh>
      
      {/* Teeth (Bottom denture teeth) */}
      <mesh
        ref={teethRef}
        geometry={teethGeometry}
        position={[0, -0.5, 0]}
        rotation={[0, 0, 0]}
      >
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={256}
          transmission={0.85}
          roughness={0.2}
          thickness={0.2}
          ior={1.6}
          chromaticAberration={0.02}
          clearcoat={0.9}
          attenuationDistance={0.4}
          attenuationColor="#F0C000"
          color="#FFFFFF"
          metalness={0.8}
          transparent
          opacity={1}
        />
      </mesh>
      
      {/* Particle system for disintegration */}
      <instancedMesh
        ref={particlesRef}
        args={[undefined, undefined, particleCount]}
        frustumCulled={false}
      >
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshStandardMaterial
          color="#D28C00"
          metalness={0.9}
          roughness={0.1}
          emissive="#D28C00"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </instancedMesh>
    </group>
  );
}

// Preload models if they exist
try {
  useGLTF.preload('/models/top-model.glb');
  useGLTF.preload('/models/base-model.glb');
  useGLTF.preload('/models/teeth-model.glb');
} catch {
  // Models don't exist, will use fallback geometries
}
