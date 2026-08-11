'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';
import {
  sectionShell,
  eyebrow,
  revealSection,
  revealItem,
  MagneticWrapper,
} from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 5 — Achievements
   Large Editorial Metric Showcase & Live Counter Engine
   ───────────────────────────────────────────────────────────────────────────── */

interface StatSlot {
  numericValue: number;
  prefix?: string;
  suffix: string;
  label: string;
  sublabel: string;
}

const stats: StatSlot[] = [
  { numericValue: 50, suffix: '+', label: 'Happy Clients', sublabel: 'Across Wealth & Tech' },
  { numericValue: 50, prefix: 'Rs ', suffix: 'L+', label: 'Portfolio Managed', sublabel: 'Systematic Guidance' },
  { numericValue: 30, suffix: '+', label: 'Tech Deliveries', sublabel: 'Apps, Web & Cloud' },
  { numericValue: 6, suffix: '+', label: 'Years Experience', sublabel: 'Proven Leadership' },
];

function AnimatedNumber({ stat }: { stat: StatSlot }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1600;
    const startTime = Date.now();
    const target = stat.numericValue;

    function tick() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView, stat.numericValue]);

  return (
    <p
      ref={ref}
      className="font-mono text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl bg-gradient-to-r from-[#f5b544] via-[#f7c86e] to-white bg-clip-text text-transparent"
    >
      {stat.prefix ?? ''}
      {displayValue}
      {stat.suffix}
    </p>
  );
}

export default function Achievements() {
  return (
    <motion.section
      id="achievements"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Top Divider */}
      <div className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-[#f5b544]/30 to-transparent" />

      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <span className={eyebrow}>
            <Sparkles className="h-3.5 w-3.5" /> 05 / Verified Milestones
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Numbers That Reflect{' '}
            <span className="bg-gradient-to-r from-[#f5b544] to-[#f7c86e] bg-clip-text text-transparent">
              Client Trust.
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-full bg-white dark:bg-white/[0.02] shadow-sm">
          <TrendingUp className="h-4 w-4 text-[#b78622] dark:text-[#f5b544]" />
          <span>QUANTIFIABLE IMPACT</span>
        </div>
      </div>

      {/* Edge-to-Edge Metric Strip Composition */}
      <motion.div variants={revealItem} className="relative rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 backdrop-blur-xl shadow-xl dark:border-white/10 dark:bg-white/[0.02]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 divide-y divide-slate-200 dark:divide-white/[0.08] sm:divide-y-0 sm:divide-x sm:divide-slate-200 dark:sm:divide-white/[0.08]">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                i > 0 ? 'pt-8 sm:pt-0 sm:pl-8' : ''
              }`}
            >
              <MagneticWrapper strength={0.15}>
                <AnimatedNumber stat={stat} />
              </MagneticWrapper>

              <h3 className="mt-4 text-base font-bold tracking-tight text-slate-900 dark:text-white">
                {stat.label}
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 font-mono">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
