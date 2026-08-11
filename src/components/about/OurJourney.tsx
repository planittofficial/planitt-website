'use client';

import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import {
  sectionShell,
  eyebrow,
  revealSection,
  revealItem,
  MagneticWrapper,
} from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 3 — Our Journey (The Planitt Story)
   Sticky Scroll Milestone Timeline & Glowing Progress Spine
   ───────────────────────────────────────────────────────────────────────────── */

interface Milestone {
  index: string;
  year: string;
  phase: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
}

const milestones: Milestone[] = [
  {
    index: '01',
    year: '2020',
    phase: 'Foundation',
    title: 'The Inception & Advisory Roots',
    description:
      'Planitt begins as a specialized financial advisory firm, bringing structured, data-driven wealth planning and disciplined asset management to individuals and growing families.',
    metric: '100+',
    metricLabel: 'Initial Clients',
  },
  {
    index: '02',
    year: '2021',
    phase: 'Expansion',
    title: 'The Dual Engine Architecture',
    description:
      'Recognizing the urgent need for custom digital infrastructure, Planitt expands its capabilities to deliver technical services, cloud deployments, and enterprise software under expert leadership.',
    metric: '2 Engines',
    metricLabel: 'Fintech & Tech',
  },
  {
    index: '03',
    year: '2022',
    phase: 'Validation',
    title: 'Institutional Incubation & DPIIT Recognition',
    description:
      'Planitt receives official DPIIT recognition from the Government of India and incubates under RTMNU, validating our approach to technological and financial innovation.',
    metric: '2 Certs',
    metricLabel: 'RTMNU & DPIIT',
  },
  {
    index: '04',
    year: '2023',
    phase: 'Innovation',
    title: 'AI Signal Systems & Algorithmic Automation',
    description:
      'Launch of the Planitt Recommendation System, deploying AI-driven forecasting and algorithmic execution bots across Stocks, Crypto, Forex, F&O, and IPOs.',
    metric: '99.9%',
    metricLabel: 'Bot Uptime',
  },
  {
    index: '05',
    year: '2024',
    phase: 'Ecosystem',
    title: 'Planitt Academy & Scale',
    description:
      'Establishing Planitt Academy to empower thousands of students with practical masterclasses in algorithmic trading, personal finance management, and full-stack software development.',
    metric: '50L+',
    metricLabel: 'Assets Managed',
  },
];

export default function OurJourney() {
  return (
    <motion.section
      id="our-journey"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Top Divider */}
      <div className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-[#f5b544]/30 to-transparent" />

      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <span className={eyebrow}>
            <Sparkles className="h-3.5 w-3.5" /> 03 / Our Growth Journey
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            The Chronological{' '}
            <span className="bg-gradient-to-r from-[#f5b544] to-[#f7c86e] bg-clip-text text-transparent">
              Planitt Story.
            </span>
          </h2>
        </div>
        <p className="max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
          From a focused advisory firm to an incubated dual-engine platform — tracing our milestones from inception to ecosystem scale.
        </p>
      </div>

      {/* Main Timeline Layout */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        {/* LEFT STICKY COLUMN: Timeline Spine Overview */}
        <motion.div variants={revealItem} className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 backdrop-blur-xl shadow-xl dark:border-white/10 dark:bg-white/[0.02] transition-colors duration-300">
            <div className="flex items-center gap-3 text-[#b78622] dark:text-[#f5b544] mb-4">
              <Calendar className="h-5 w-5" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">
                2020 — 2024 Epoch
              </span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              5 Years of Continuous Execution
            </h3>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Each milestone represents a major step in expanding our financial intelligence and technology capabilities.
            </p>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>MILESTONES: 05</span>
              <span>STATUS: SCALING</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Chronological Chapters with Vertical Spine */}
        <div className="lg:col-span-8 relative pl-6 sm:pl-10 space-y-12">
          {/* Vertical Glowing Progress Spine */}
          <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#f5b544] via-[#7C5CFF] to-transparent opacity-40" />

          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              variants={revealItem}
              className="relative group flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:border-slate-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20 dark:hover:bg-white/[0.04]"
            >
              {/* Spine Node Marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-8 h-4 w-4 rounded-full border-2 border-slate-50 dark:border-[#0B0F19] bg-[#f5b544] shadow-[0_0_12px_rgba(245,181,68,0.6)]" />

              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-extrabold font-mono tracking-tight text-[#b78622] dark:text-[#f5b544]">
                    {m.year}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    / {m.phase}
                  </span>
                </div>

                <span className="text-xs font-mono text-slate-500">
                  CHAPTER {m.index}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h4 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                  {m.title}
                </h4>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {m.description}
                </p>
              </div>

              {/* Floating Metric Badge */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold text-[#b78622] dark:text-[#f7c86e] font-mono">
                    {m.metric}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {m.metricLabel}
                  </span>
                </div>

                <MagneticWrapper strength={0.15}>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#b78622] dark:text-[#f5b544] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </MagneticWrapper>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
