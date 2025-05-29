'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { useMouseGradient } from '../../hooks/useMouseGradient';

interface MeshGradientProps {
  colors?: string[];
  speed?: number;
  className?: string;
  interactive?: boolean;
}

export function MeshGradient({
  colors = ['#F59E0B', '#9333EA', '#3B82F6', '#10B981'],
  speed = 0.5,
  className = '',
  interactive = true
}: MeshGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mouseX, mouseY } = useMouseGradient();
  const time = useRef(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);
  
  useAnimationFrame((delta) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    time.current += delta * 0.001 * speed;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create mesh points
    const meshSize = 5;
    const points = [];
    
    for (let x = 0; x <= meshSize; x++) {
      for (let y = 0; y <= meshSize; y++) {
        const px = (x / meshSize) * canvas.width;
        const py = (y / meshSize) * canvas.height;
        
        // Add wave motion
        const waveX = Math.sin(time.current + x * 0.5) * 20;
        const waveY = Math.cos(time.current + y * 0.5) * 20;
        
        // Add mouse influence if interactive
        let mouseInfluenceX = 0;
        let mouseInfluenceY = 0;
        
        if (interactive) {
          const distance = Math.sqrt(
            Math.pow(px - mouseX * canvas.width, 2) + 
            Math.pow(py - mouseY * canvas.height, 2)
          );
          const influence = Math.max(0, 1 - distance / 300);
          mouseInfluenceX = (mouseX * canvas.width - px) * influence * 0.1;
          mouseInfluenceY = (mouseY * canvas.height - py) * influence * 0.1;
        }
        
        points.push({
          x: px + waveX + mouseInfluenceX,
          y: py + waveY + mouseInfluenceY,
          colorIndex: (x + y) % colors.length
        });
      }
    }
    
    // Draw mesh gradients
    points.forEach((point, index) => {
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, 200
      );
      
      const color = colors[point.colorIndex];
      gradient.addColorStop(0, color + '40'); // 25% opacity
      gradient.addColorStop(0.5, color + '20'); // 12.5% opacity
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
    
    // Apply gaussian blur effect
    ctx.filter = 'blur(40px)';
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
  });
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        opacity: 0.6,
        mixBlendMode: 'color-dodge'
      }}
    />
  );
}
