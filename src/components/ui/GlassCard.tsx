'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // 0-1, controls glass effect strength
  layers?: number; // 1-3, number of glass layers
  interactive?: boolean; // enables hover/tilt effects
  colorShift?: boolean; // enables dynamic color shifting
  onClick?: () => void; // click handler
}

export function GlassCard({
  children,
  className,
  intensity = 0.7,
  layers = 2,
  interactive = true,
  colorShift = true,
  onClick
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to refraction intensity
  const refractionIntensity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  
  useEffect(() => {
    if (!interactive || !cardRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    };
    
    const card = cardRef.current;
    card.addEventListener('mousemove', handleMouseMove);
    
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);
  
  // Calculate dynamic gradient positions based on mouse
  const gradientX = mousePosition.x * 100;
  const gradientY = mousePosition.y * 100;
  
  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-2xl glass-card-container',
        onClick && 'cursor-pointer',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        transform: interactive ? `
          perspective(1000px)
          rotateX(${(mousePosition.y - 0.5) * 10}deg)
          rotateY(${(mousePosition.x - 0.5) * -10}deg)
        ` : undefined,
      }}
      whileHover={interactive ? { scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      {/* Base glass layers */}
      {Array.from({ length: layers }).map((_, index) => (
        <div
          key={index}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                circle at ${gradientX}% ${gradientY}%,
                rgba(251, 191, 36, ${0.1 * intensity * (index + 1) / layers}),
                transparent 40%
              )
            `,
            backdropFilter: `blur(${(index + 1) * 2}px)`,
            transform: `translateZ(${index * 10}px)`,
            opacity: intensity,
          }}
        />
      ))}
      
      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Content container with glass background */}
      <div 
        className="relative z-10"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(255, 255, 255, ${0.1 * intensity}),
              rgba(255, 255, 255, ${0.05 * intensity})
            )
          `,
          backdropFilter: `blur(${12 * intensity}px) saturate(${1.2 + (0.3 * intensity)})`,
          border: `1px solid rgba(255, 255, 255, ${0.2 * intensity})`,
          borderRadius: 'inherit',
          padding: 'inherit',
        }}
      >
        {children}
      </div>
      
      {/* Dynamic color shift overlay */}
      {colorShift && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(
                ${45 + (mousePosition.x * 90)}deg,
                rgba(251, 191, 36, ${0.05 * intensity}),
                rgba(147, 51, 234, ${0.05 * intensity})
              )
            `,
            mixBlendMode: 'color-dodge',
            opacity: refractionIntensity,
          }}
        />
      )}
    </motion.div>
  );
}
