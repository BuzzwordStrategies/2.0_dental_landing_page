import { useState, useEffect } from 'react';

export function useMouseGradient() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  
  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0.5;
    let targetY = 0.5;
    let currentX = 0.5;
    let currentY = 0.5;
    
    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX / window.innerWidth;
      targetY = e.clientY / window.innerHeight;
    };
    
    // Smooth interpolation for performance
    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      
      setMousePosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    animate();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return {
    mouseX: mousePosition.x,
    mouseY: mousePosition.y,
    mousePosition
  };
}
