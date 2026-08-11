'use client';

import { motion } from 'framer-motion';
import { Sparkles, Building, Handshake } from 'lucide-react';
import {
  sectionShell,
  eyebrow,
  revealSection,
  revealItem,
  MagneticWrapper,
} from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 4 — Supporters & Collaborators
   Dual-Row Infinite Motion Marquee with Magnetic Hover Feedback
   ───────────────────────────────────────────────────────────────────────────── */

const row1Logos = [
  'Institutional Partner 01',
  'Fintech Capital',
  'Technology Incubator',
  'Strategic Alliance',
  'RTMNU Incubation',
];

const row2Logos = [
  'DPIIT Startup India',
  'Wealth Advisory Corp',
  'Cloud Infrastructure Partner',
  'Algorithmic Trading Hub',
  'Planitt Ecosystem Partner',
];

function MarqueeRow({ items, direction = 'left' }: { items: string[]; direction?: 'left' | 'right' }) {
  const duplicated = [...items, ...items, ...items, ...items];

  return (
    <div className="flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <motion.div
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: 25,
          ease: 'linear',
          repeat: Infinity,
        }}
        className="flex shrink-0 items-center gap-6 py-3"
      >
        {duplicated.map((item, idx) => (
          <MagneticWrapper key={`${item}-${idx}`} strength={0.2}>
            <div className="group relative flex h-20 w-56 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm px-6 backdrop-blur-md transition-all duration-300 hover:border-[#b78622]/40 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-[#f5b544]/40 dark:hover:bg-white/[0.05] hover:scale-105">
              {/* Subtle Icon Indicator */}
              <Building className="h-4 w-4 text-slate-400 group-hover:text-[#b78622] dark:text-slate-600 dark:group-hover:text-[#f5b544] transition-colors mr-2.5" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-700 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white transition-colors">
                {item}
              </span>
            </div>
          </MagneticWrapper>
        ))}
      </motion.div>
    </div>
  );
}

export default function Supporters() {
  return (
    <motion.section
      id="supporters"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-slate-200 dark:border-white/[0.08] pb-12">
        <div>
          <span className={eyebrow}>
            <Sparkles className="h-3.5 w-3.5" /> 04 / Backed By & Partnered
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Our Supporters &{' '}
            <span className="bg-gradient-to-r from-[#f5b544] to-[#f7c86e] bg-clip-text text-transparent">
              Collaborators.
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-full bg-white dark:bg-white/[0.02] shadow-sm">
          <Handshake className="h-4 w-4 text-[#b78622] dark:text-[#f5b544]" />
          <span>STRATEGIC ECOSYSTEM</span>
        </div>
      </div>

      {/* Infinite Marquee Composition */}
      <motion.div variants={revealItem} className="space-y-6">
        <MarqueeRow items={row1Logos} direction="left" />
        <MarqueeRow items={row2Logos} direction="right" />
      </motion.div>
    </motion.section>
  );
}
