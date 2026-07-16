'use client';

import { useEffect, useRef, useState } from 'react';

export default function PremiumScrollProgress() {
  const [visible, setVisible] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) {
        if (progressRef.current) {
          progressRef.current.style.transform = 'scaleY(0)';
        }
        return;
      }
      
      const scrollPercent = scrollTop / docHeight;
      // Clamp between 0 and 1
      const clampedPercent = Math.max(0, Math.min(1, scrollPercent));
      
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${clampedPercent})`;
      }
    };

    const handleScroll = () => {
      // Fade in when scroll begins
      setVisible(true);

      // Reset the fade out timer
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }

      // Hide indicator after 1.2s of no scrolling
      fadeTimeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, 1200);

      // Update progress inside requestAnimationFrame for maximum performance
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = requestAnimationFrame(updateProgress);
    };

    // Run once at mount to set initial scroll position
    updateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateProgress);
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`premium-scroll-indicator ${visible ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden="true"
    >
      <div
        ref={progressRef}
        className="premium-scroll-bar"
      />
    </div>
  );
}
