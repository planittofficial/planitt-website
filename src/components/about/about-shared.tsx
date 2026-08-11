'use client';

import React, { useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   Shared Design Tokens, Motion Variants & Magnetic Components
   ───────────────────────────────────────────────────────────────────────────── */

export const GOLD = '#f5b544';
export const GOLD_LIGHT = '#f7c86e';
export const VIOLET = '#7C5CFF';
export const BG_DARK = '#0B0F19';

// Reusable class strings
export const sectionShell =
  'relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-36 overflow-hidden';

export const eyebrow =
  'inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#f5b544]';

export const sectionHeading =
  'mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl leading-[1.1]';

export const sectionSubtext =
  'mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg';

// Animation Spring Configs
export const springSmooth = { type: 'spring' as const, stiffness: 300, damping: 30 };
export const springGentle = { type: 'spring' as const, stiffness: 120, damping: 20 };

// Animation Variants
export const revealSection: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const revealItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 25 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const revealItemLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   Magnetic Wrapper Component (Micro-interaction)
   ───────────────────────────────────────────────────────────────────────────── */
export function MagneticWrapper({
  children,
  className = '',
  strength = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Background SVG Financial Geometry Visual Primitive
   ───────────────────────────────────────────────────────────────────────────── */
export function BackgroundGeometry({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-[0.035] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1200 800"
    >
      <path
        d="M-100 600 C 200 500, 400 700, 700 450 C 900 300, 1100 400, 1300 250"
        stroke="url(#gradientGold)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <path
        d="M-100 400 C 300 200, 600 550, 900 200 C 1100 100, 1250 300, 1350 150"
        stroke="url(#gradientViolet)"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient id="gradientGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f5b544" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f5b544" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gradientViolet" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
