'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, MeshTransmissionMaterial } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import { useSpring, animated } from '@react-spring/three';

interface SuccessTowerProps {
  selectedServices: string[];
  position: [number, number, number];
}

export function SuccessTower({ selectedServices, position }: SuccessTowerProps) {
  const groupRef = useRef<Group>(null);
  const particlesRef = useRef<any[]>([]);
  
  // Animate tower growth
  const { height, opacity } = useSpring({
    height: selectedServices.length * 0.8,
    opacity: selectedServices.length > 0 ? 1 : 0,
    config: { tension: 200, friction: 30 }
  });
  
  // Success particles
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Rotate the entire tower slowly
    groupRef.current.rotation.y = time * 0.1;
    
    // Animate particles upward
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        particle.position.y = ((time * 0.5 + i) % 4) - 1;
        particle.rotation.z = time + i;
        particle.rotation.x = time * 0.5 + i;
      }
    });
  });
  
  return (
    <animated.group ref={groupRef} position={position} opacity={opacity}>
      {/* Base platform */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2, 2.5, 0.3, 32]} />
        <meshPhysicalMaterial
          color="#F59E0B"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Success tower blocks */}
      {selectedServices.map((service, index) => (
        <animated.mesh
          key={service}
          position={[0, 0.5 + index * 0.8, 0]}
          scale={height.to(h => Math.min(1, h / (index + 1)))}
          castShadow
        >
          <boxGeometry args={[1.5 - index * 0.1, 0.7, 1.5 - index * 0.1]} />
          <MeshTransmissionMaterial
            color="#FFFFFF"
            transmission={0.9}
            thickness={0.5}
            roughness={0.1}
            chromaticAberration={0.03}
            anisotropy={0.3}
            distortion={0.1}
            temporalDistortion={0.1}
            clearcoat={1}
            attenuationDistance={0.5}
            attenuationColor="#F59E0B"
            envMapIntensity={1}
          />
          
          {/* Service label */}
          <Text
            position={[0, 0, 0.76]}
            fontSize={0.15}
            color="#333333"
            anchorX="center"
            anchorY="middle"
          >
            {service}
          </Text>
        </animated.mesh>
      ))}
      
      {/* Trophy on top when complete */}
      {selectedServices.length >= 5 && (
        <animated.group
          position={[0, 0.5 + selectedServices.length * 0.8, 0]}
          scale={height.to(h => h / selectedServices.length)}
        >
          <mesh>
            <coneGeometry args={[0.5, 1, 32]} />
            <meshPhysicalMaterial
              color="#FFD700"
              metalness={1}
              roughness={0}
              envMapIntensity={2}
            />
          </mesh>
          <Text
            position={[0, 1.2, 0]}
            fontSize={0.3}
            color="#FFD700"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            INDUSTRY LEADER
          </Text>
        </animated.group>
      )}
      
      {/* Success particles */}
      {selectedServices.length > 2 && (
        <>
          {[...Array(10)].map((_, i) => (
            <mesh
              key={i}
              ref={el => particlesRef.current[i] = el}
              position={[
                Math.sin(i * 0.6) * 1.5,
                0,
                Math.cos(i * 0.6) * 1.5
              ]}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial
                color="#F59E0B"
                transparent
                opacity={0.8}
              />
            </mesh>
          ))}
        </>
      )}
    </animated.group>
  );
}
