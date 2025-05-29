'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Float } from '@react-three/drei';
import { Group, Vector3, Color } from 'three';
import { useSpring, animated } from '@react-spring/three';

interface MagneticCardsProps {
  services: string[];
  selectedServices: Set<string>;
  hoveredService: string | null;
  onServiceHover: (service: string | null) => void;
  onServiceSelect: (service: string) => void;
}

// Service icons as 3D shapes
const serviceIcons: Record<string, { shape: string; color: string }> = {
  "Meta Ads": { shape: 'sphere', color: '#1877F2' },
  "Google Ads": { shape: 'box', color: '#4285F4' },
  "TikTok Ads": { shape: 'torus', color: '#000000' },
  "SEO": { shape: 'cone', color: '#0F9D58' },
  "GBP Ranker": { shape: 'cylinder', color: '#EA4335' },
  "Backlinks": { shape: 'octahedron', color: '#9333EA' },
  "Content": { shape: 'dodecahedron', color: '#F59E0B' },
  "Social Posts": { shape: 'tetrahedron', color: '#E1306C' }
};

function ServiceCard({ 
  service, 
  index, 
  total,
  isSelected,
  isHovered,
  onHover,
  onSelect 
}: {
  service: string;
  index: number;
  total: number;
  isSelected: boolean;
  isHovered: boolean;
  onHover: (hover: boolean) => void;
  onSelect: () => void;
}) {
  const meshRef = useRef<Group>(null);
  const { shape, color } = serviceIcons[service] || { shape: 'box', color: '#888888' };
  
  // Calculate initial position in a circle
  const angle = (index / total) * Math.PI * 2;
  const radius = 4;
  const initialPosition = useMemo(() => 
    new Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * 0.5 + 1,
      Math.sin(angle) * radius
    ),
    [angle, radius]
  );
  
  // Spring animation for selection
  const { scale, emissive } = useSpring({
    scale: isSelected ? 1.2 : isHovered ? 1.1 : 1,
    emissive: isSelected ? 1 : isHovered ? 0.5 : 0,
    config: { tension: 300, friction: 20 }
  });
  
  // Floating animation with magnetic effect
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    if (isSelected) {
      // Magnetic attraction to center when selected
      meshRef.current.position.lerp(new Vector3(0, 2 + index * 0.3, 0), 0.1);
      meshRef.current.rotation.y = time * 0.5;
    } else {
      // Float in original position
      meshRef.current.position.x = initialPosition.x + Math.sin(time + index) * 0.1;
      meshRef.current.position.y = initialPosition.y + Math.sin(time * 0.5 + index) * 0.2;
      meshRef.current.position.z = initialPosition.z + Math.cos(time + index) * 0.1;
      meshRef.current.rotation.y = time * 0.2;
    }
    
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
  });
  
  return (
    <animated.group
      ref={meshRef}
      position={initialPosition}
      scale={scale}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
      onClick={onSelect}
    >
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Card background */}
        <RoundedBox args={[2.5, 1.5, 0.2]} radius={0.1} smoothness={4}>
          <animated.meshPhysicalMaterial
            color={isSelected ? color : '#ffffff'}
            emissive={new Color(color)}
            emissiveIntensity={emissive}
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={isSelected ? 0 : 0.6}
            thickness={0.5}
            envMapIntensity={1}
          />
        </RoundedBox>
        
        {/* Service text */}
        <Text
          position={[0, 0, 0.12]}
          fontSize={0.3}
          color={isSelected ? '#ffffff' : '#333333'}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          {service}
        </Text>
        
        {/* 3D icon based on service */}
        <mesh position={[0, -0.5, 0.2]} scale={0.3}>
          {shape === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
          {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
          {shape === 'torus' && <torusGeometry args={[1, 0.4, 16, 32]} />}
          {shape === 'cone' && <coneGeometry args={[1, 1.5, 32]} />}
          {shape === 'cylinder' && <cylinderGeometry args={[0.8, 0.8, 1.5, 32]} />}
          {shape === 'octahedron' && <octahedronGeometry args={[1]} />}
          {shape === 'dodecahedron' && <dodecahedronGeometry args={[1]} />}
          {shape === 'tetrahedron' && <tetrahedronGeometry args={[1]} />}
          
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={isHovered ? 0.3 : 0.1}
          />
        </mesh>
        
        {/* Selection indicator */}
        {isSelected && (
          <mesh position={[1.2, 0.6, 0.1]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#10B981" />
          </mesh>
        )}
      </Float>
    </animated.group>
  );
}

export function MagneticCards(props: MagneticCardsProps) {
  const { services, selectedServices, hoveredService, onServiceHover, onServiceSelect } = props;
  
  return (
    <group>
      {services.map((service, index) => (
        <ServiceCard
          key={service}
          service={service}
          index={index}
          total={services.length}
          isSelected={selectedServices.has(service)}
          isHovered={hoveredService === service}
          onHover={(hover) => onServiceHover(hover ? service : null)}
          onSelect={() => onServiceSelect(service)}
        />
      ))}
    </group>
  );
}
