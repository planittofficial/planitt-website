'use client';

import type { Variants } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   About-page shared design tokens, animation variants & utility strings
   ───────────────────────────────────────────────────────────────────────────── */

// ── Colour palette ──────────────────────────────────────────────────────────
export const GOLD        = '#f5b544';
export const GOLD_LIGHT  = '#f7c86e';
export const GOLD_DIM    = '#f5b544';
export const VIOLET      = '#7C5CFF';
export const BG_DARK     = '#0B0F19';

// ── Reusable class strings ──────────────────────────────────────────────────
export const sectionShell =
  'relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-36 overflow-hidden';

export const eyebrow =
  'text-[11px] font-bold uppercase tracking-[0.3em] bg-gradient-to-r from-[#f5b544] to-[#f7c86e] bg-clip-text text-transparent';

export const sectionHeading =
  'mt-4 font-heading text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl drop-shadow-sm';

export const sectionSubtext =
  'mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg mx-auto';

export const glassCard =
  'group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl transition-colors duration-500 hover:border-white/20 shadow-2xl';

export const goldHover =
  'hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(245,181,68,0.15)] transition-all duration-500';

export const purpleHover =
  'hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(124,92,255,0.15)] transition-all duration-500';

// ── Framer Motion variants ──────────────────────────────────────────────────
export const revealSection: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      mass: 1,
    },
  },
};

export const cardHover = {
  scale: 1.02,
  y: -8,
};

export const microTransition = { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };
