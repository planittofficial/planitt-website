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
  'relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28';

export const eyebrow =
  'text-[11px] font-medium uppercase tracking-[0.32em] text-[#f7c86e]/80';

export const sectionHeading =
  'mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl';

export const sectionSubtext =
  'mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base';

export const glassCard =
  'rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl transition duration-300 ease-out';

export const goldHover =
  'hover:-translate-y-1 hover:border-[#f5b544]/35 hover:shadow-[0_22px_70px_rgba(245,181,68,0.14)]';

// ── Framer Motion variants ──────────────────────────────────────────────────
export const revealSection: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export const cardHover = {
  scale: 1.02,
  boxShadow: '0 20px 58px rgba(245,181,68,0.12)',
};

export const microTransition = { duration: 0.24, ease: 'easeOut' as const };
