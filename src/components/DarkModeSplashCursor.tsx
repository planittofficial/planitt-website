'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function DarkModeSplashCursor() {
  const { theme } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const layerRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastTrailRef = useRef(0);

  const target = useRef({ x: 0, y: 0 });
  const ringCurrent = useRef({ x: 0, y: 0 });
  const coreCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (theme !== 'dark') {
      setEnabled(false);
      setVisible(false);
      return;
    }

    const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!supportsFinePointer || prefersReducedMotion) return;

    setEnabled(true);
    const layer = layerRef.current;
    if (!layer) return;

    const spawnSplash = (x: number, y: number, isClick = false) => {
      const splash = document.createElement('span');
      splash.style.position = 'absolute';
      splash.style.left = `${x}px`;
      splash.style.top = `${y}px`;
      splash.style.width = isClick ? '42px' : '24px';
      splash.style.height = isClick ? '42px' : '24px';
      splash.style.borderRadius = '9999px';
      splash.style.pointerEvents = 'none';
      splash.style.transform = 'translate(-50%, -50%) scale(0.35)';
      splash.style.opacity = isClick ? '0.7' : '0.42';
      splash.style.border = isClick
        ? '1px solid rgba(103,232,249,0.75)'
        : '1px solid rgba(56,189,248,0.45)';
      splash.style.boxShadow = isClick
        ? '0 0 26px rgba(34,211,238,0.45)'
        : '0 0 16px rgba(14,165,233,0.28)';

      layer.appendChild(splash);
      const animation = splash.animate(
        [
          { transform: 'translate(-50%, -50%) scale(0.35)', opacity: isClick ? 0.7 : 0.42 },
          { transform: 'translate(-50%, -50%) scale(1.9)', opacity: 0 },
        ],
        {
          duration: isClick ? 720 : 560,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'forwards',
        }
      );
      animation.onfinish = () => splash.remove();
    };

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setVisible(true);

      const now = performance.now();
      if (now - lastTrailRef.current > 95) {
        spawnSplash(e.clientX, e.clientY, false);
        lastTrailRef.current = now;
      }
    };

    const onDown = (e: MouseEvent) => {
      spawnSplash(e.clientX, e.clientY, true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const tick = () => {
      ringCurrent.current.x += (target.current.x - ringCurrent.current.x) * 0.18;
      ringCurrent.current.y += (target.current.y - ringCurrent.current.y) * 0.18;
      coreCurrent.current.x += (target.current.x - coreCurrent.current.x) * 0.34;
      coreCurrent.current.y += (target.current.y - coreCurrent.current.y) * 0.34;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCurrent.current.x}px, ${ringCurrent.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${coreCurrent.current.x}px, ${coreCurrent.current.y}px, 0) translate(-50%, -50%)`;
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      layer.innerHTML = '';
    };
  }, [theme]);

  if (!enabled || theme !== 'dark') return null;

  return (
    <div ref={layerRef} aria-hidden className="pointer-events-none fixed inset-0 z-[9998]">
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 h-8 w-8 rounded-full border border-cyan-300/70 bg-cyan-300/10 shadow-[0_0_22px_rgba(34,211,238,0.3)] transition-opacity duration-150 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        ref={coreRef}
        className={`fixed left-0 top-0 h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.8)] transition-opacity duration-150 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

