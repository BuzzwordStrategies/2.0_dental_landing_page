'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface IndustryCounterProps {
  label: string;
  startValue: number;
  endValue: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function IndustryCounter({
  label,
  startValue,
  endValue,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 2,
  className = ''
}: IndustryCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!counterRef.current || hasAnimated.current) return;

    const counter = { value: startValue };
    
    const scrollTrigger = ScrollTrigger.create({
      trigger: counterRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        gsap.to(counter, {
          value: endValue,
          duration: duration,
          ease: 'power2.out',
          onUpdate: () => {
            if (counterRef.current) {
              const formattedValue = decimals > 0 
                ? counter.value.toFixed(decimals)
                : Math.floor(counter.value).toLocaleString();
              counterRef.current.textContent = `${prefix}${formattedValue}${suffix}`;
            }
          }
        });
      }
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [startValue, endValue, suffix, prefix, decimals, duration]);

  return (
    <div className={`text-center ${className}`}>
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        <span ref={counterRef}>{prefix}{startValue.toLocaleString()}{suffix}</span>
      </div>
      <div className="text-sm md:text-base text-gray-400">{label}</div>
    </div>
  );
}
