'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HorizontalScreensSection from './HorizontalScreensSection';

export default function AppShowcasePageClient() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
    });

    lenisRef.current = lenis;

    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', onScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      lenis.off('scroll', onScroll);
      lenis.destroy();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisRef.current = null;
    };
  }, []);

  return (
    <main className="bg-black text-white">
      <HorizontalScreensSection
        title="App Screens Showcase"
        images={[
          '/screens/screen1.png',
          '/screens/screen2.png',
          '/screens/screen3.png',
          '/screens/screen4.png',
          '/screens/screen5.png',
        ]}
      />
    </main>
  );
}
