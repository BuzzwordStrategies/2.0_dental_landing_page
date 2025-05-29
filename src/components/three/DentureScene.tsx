'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ScrollControls, useScroll, Preload, PerformanceMonitor } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import { DisintegrationDenture } from './DisintegrationDenture';

function ScrollTracker() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scroll = useScroll();
  
  useFrame(() => {
    if (scroll) {
      setScrollProgress(scroll.offset);
    }
  });
  
  return <DisintegrationDenture scrollProgress={scrollProgress} />;
}

function Scene() {
  const [degraded, setDegraded] = useState(false);
  
  return (
    <>
      {/* Lighting setup for dental materials */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.6} color="#D28C00" />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#ffffff" />
      
      <Float
        speed={degraded ? 0 : 1.5}
        rotationIntensity={degraded ? 0 : 0.3}
        floatIntensity={degraded ? 0 : 0.4}
      >
        <ScrollTracker />
      </Float>
      
      <Environment preset="studio" />
      
      {/* Performance monitoring - degrade quality if needed */}
      <PerformanceMonitor
        onDecline={() => setDegraded(true)}
        flipflops={3}
        factor={1.5}
      />
    </>
  );
}

export function DentureScene() {
  const [mounted, setMounted] = useState(false);
  const [deviceSupports3D, setDeviceSupports3D] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    
    // Check for WebGL support and device capability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency <= 2;
    
    if (!gl || (isMobile && isLowEnd)) {
      setDeviceSupports3D(false);
    }
  }, []);
  
  if (!mounted) return null;
  
  // Fallback for low-end devices
  if (!deviceSupports3D) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-80 h-80">
          <div className="w-full h-full bg-gradient-radial from-amber-500/30 via-amber-500/10 to-transparent rounded-full animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg opacity-80 animate-bounce" 
                 style={{ animationDelay: '0s' }} />
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg opacity-60 animate-bounce ml-4" 
                 style={{ animationDelay: '0.2s' }} />
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg opacity-40 animate-bounce ml-3" 
                 style={{ animationDelay: '0.4s' }} />
          </div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-amber-500/20 animate-ping" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={[1, 2]}
        shadows
      >
        <ScrollControls pages={1} damping={0.3}>
          <Suspense fallback={<Loader />}>
            <Scene />
            <Preload all />
          </Suspense>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

// Loading component
function Loader() {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial color="#D28C00" wireframe />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial color="#E6B800" wireframe />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#F0C000" wireframe />
      </mesh>
    </group>
  );
}
