'use client';

import React, { useState, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  LayoutGroup,
} from 'framer-motion';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Landmark,
  BrainCircuit,
  Award,
  Bot,
  GraduationCap,
} from 'lucide-react';
import { sectionShell, eyebrow, springSmooth, MagneticWrapper } from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 3 — Our Journey (The Planitt Story)
   Interactive Storytelling Component with Autoplay Loop & Pause-on-Hover
   ───────────────────────────────────────────────────────────────────────────── */

interface Milestone {
  index: string;
  year: string;
  phase: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: React.ElementType;
  highlights: string[];
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
    metricLabel: 'INITIAL CLIENTS',
    icon: Landmark,
    highlights: ['Wealth Planning', 'SIP Strategy', 'Risk Hedging'],
  },
  {
    index: '02',
    year: '2021',
    phase: 'Expansion',
    title: 'The Dual Engine Architecture',
    description:
      'Recognizing the urgent need for custom digital infrastructure, Planitt expands its capabilities to deliver technical services, cloud deployments, and enterprise software under expert leadership.',
    metric: '2 ENGINES',
    metricLabel: 'FINTECH & TECH',
    icon: BrainCircuit,
    highlights: ['Technical Services', 'Cloud Deployments', 'Enterprise Code'],
  },
  {
    index: '03',
    year: '2022',
    phase: 'Validation',
    title: 'Institutional Incubation & DPIIT Recognition',
    description:
      'Planitt receives official DPIIT recognition from the Government of India and incubates under RTMNU, validating our approach to technological and financial innovation.',
    metric: '2 CERTS',
    metricLabel: 'RTMNU & DPIIT',
    icon: Award,
    highlights: ['RTMNU Incubated', 'DPIIT Recognised', 'Govt Alliance'],
  },
  {
    index: '04',
    year: '2023',
    phase: 'Innovation',
    title: 'AI Signal Systems & Algorithmic Automation',
    description:
      'Launch of the Planitt Recommendation System, deploying AI-driven forecasting and algorithmic execution bots across Stocks, Crypto, Forex, F&O, and IPOs.',
    metric: '99.9%',
    metricLabel: 'BOT UPTIME',
    icon: Bot,
    highlights: ['AI Signals', 'Algo Automation', 'Multi-Asset Bots'],
  },
  {
    index: '05',
    year: '2024',
    phase: 'Ecosystem',
    title: 'Planitt Academy & Scale',
    description:
      'Establishing Planitt Academy to empower thousands of students with practical masterclasses in algorithmic trading, personal finance management, and full-stack software development.',
    metric: '50L+',
    metricLabel: 'ASSETS MANAGED',
    icon: GraduationCap,
    highlights: ['Planitt Academy', 'Fintech Mentorship', 'Ecosystem Scale'],
  },
];

const AUTOPLAY_DURATION = 4.5; // Seconds per milestone

export default function OurJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;

  const activeMilestone = milestones[activeIndex];

  // Advance to next milestone
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % milestones.length);
    setTimerKey((prev) => prev + 1);
  }, []);

  // Go to previous milestone
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + milestones.length) % milestones.length);
    setTimerKey((prev) => prev + 1);
  }, []);

  // Direct milestone selection (resets timer)
  const selectMilestone = useCallback((index: number) => {
    setActiveIndex(index);
    setTimerKey((prev) => prev + 1);
  }, []);

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      selectMilestone((index + 1) % milestones.length);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      selectMilestone((index - 1 + milestones.length) % milestones.length);
    }
  };

  return (
    <motion.section
      id="our-journey"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`${sectionShell} relative overflow-hidden`}
    >
      {/* Subtle Atmospheric Gradient Aura */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-1000"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 45%, rgba(245, 181, 68, 0.04) 0%, rgba(11, 15, 25, 0) 70%)',
        }}
      />

      {/* Top Hairline Accent Line */}
      <div className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-[#f5b544]/30 to-transparent" />

      {/* HEADER DESIGN — Two-Column Composition */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
        }}
        className="grid gap-8 md:grid-cols-12 md:items-end justify-between border-b border-slate-200 dark:border-white/[0.08] pb-10 mb-12 lg:mb-16"
      >
        <div className="md:col-span-7">
          <span className={eyebrow}>
            <Sparkles className="h-3.5 w-3.5" /> 03 / OUR GROWTH JOURNEY
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl leading-[1.08]">
            The Chronological{' '}
            <span className="bg-gradient-to-r from-[#f5b544] via-[#f7c86e] to-[#d8b35c] bg-clip-text text-transparent">
              Planitt Story.
            </span>
          </h2>
        </div>

        <div className="md:col-span-5">
          <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            From a focused advisory firm to an incubated dual-engine platform — tracing our milestones from inception to ecosystem scale.
          </p>
        </div>
      </motion.div>

      {/* MOBILE / COMPACT TAB SELECTOR (< lg) */}
      <div className="lg:hidden mb-8">
        <LayoutGroup id="mobile-timeline-tabs">
          <div
            role="tablist"
            aria-label="Timeline Chapters Navigation"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-white/10"
          >
            {milestones.map((m, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={m.year}
                  id={`timeline-mobile-tab-${idx}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`timeline-panel-${idx}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectMilestone(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onFocus={() => setIsPaused(true)}
                  onBlur={() => setIsPaused(false)}
                  className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveTabHighlight"
                      className="absolute inset-0 z-0 rounded-xl bg-amber-500/15 dark:bg-amber-400/20 border border-amber-500/40 dark:border-amber-400/40"
                      transition={springSmooth}
                    />
                  )}
                  <span className={`relative z-10 font-mono ${isActive ? 'text-[#f5b544] font-extrabold' : ''}`}>
                    {m.year}
                  </span>
                  <span className="relative z-10 uppercase tracking-wider text-[10px] opacity-80">
                    {m.phase}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      {/* DESKTOP INTERACTIVE TIMELINE EXPLORER (lg+) */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        {/* LEFT TIMELINE NAVIGATION */}
        <div
          className="hidden lg:block lg:col-span-5 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            role="tablist"
            aria-label="Timeline Navigation"
            className="relative space-y-4 py-2 pl-2"
          >
            {/* Background Vertical Line Spine */}
            <div className="absolute left-[31px] top-6 bottom-6 w-[2px] rounded-full bg-slate-200 dark:bg-white/[0.08]" />

            {milestones.map((m, idx) => {
              const isActive = idx === activeIndex;

              return (
                <button
                  key={m.year}
                  id={`timeline-tab-${idx}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`timeline-panel-${idx}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectMilestone(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onFocus={() => setIsPaused(true)}
                  onBlur={() => setIsPaused(false)}
                  className={`group relative flex w-full items-center gap-6 p-3 text-left transition-all duration-300 rounded-2xl cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isActive
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {/* Timeline Node Container with Autoplay Progress Ring */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center">
                    {/* Active Pulsing Halo */}
                    {isActive && !reducedMotion && (
                      <motion.div
                        layoutId="activeTimelineHalo"
                        className="absolute h-10 w-10 rounded-full bg-amber-400/20 dark:bg-[#f5b544]/25 blur-xs animate-pulse"
                        transition={springSmooth}
                      />
                    )}

                    {/* Circular Progress Ring Overlay on Active Node */}
                    {isActive && (
                      <svg className="absolute inset-0 h-10 w-10 -rotate-90 pointer-events-none">
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          fill="none"
                          stroke="rgba(245, 181, 68, 0.2)"
                          strokeWidth="2"
                        />
                        <motion.circle
                          key={`progress-${activeIndex}-${timerKey}`}
                          cx="20"
                          cy="20"
                          r="16"
                          fill="none"
                          stroke="#f5b544"
                          strokeWidth="2"
                          strokeDasharray={100.5}
                          strokeDashoffset={100.5}
                          initial={{ strokeDashoffset: 100.5 }}
                          animate={{ strokeDashoffset: isPaused ? 100.5 : 0 }}
                          transition={{
                            duration: reducedMotion ? 0 : AUTOPLAY_DURATION,
                            ease: 'linear',
                          }}
                          onAnimationComplete={handleNext}
                          style={{
                            animationPlayState: isPaused ? 'paused' : 'running',
                          }}
                        />
                      </svg>
                    )}

                    {/* Timeline Dot Node */}
                    <div
                      className={`relative z-10 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? 'h-6 w-6 border-[#f5b544] bg-[#f5b544] shadow-[0_0_14px_rgba(245,181,68,0.7)] scale-110'
                          : 'h-4 w-4 border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 group-hover:border-amber-400/60 group-hover:scale-105'
                      }`}
                    >
                      {isActive ? (
                        <div className="h-2 w-2 rounded-full bg-slate-950" />
                      ) : (
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-600 group-hover:bg-amber-400/80 transition-colors" />
                      )}
                    </div>
                  </div>

                  {/* Year & Phase Info */}
                  <div className="flex flex-1 items-center justify-between transition-transform duration-300 group-hover:translate-x-1">
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-xl sm:text-2xl font-extrabold tracking-tight transition-all duration-300 ${
                          isActive
                            ? 'text-[#f5b544] dark:text-[#f7c86e] scale-105'
                            : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                        }`}
                      >
                        {m.year}
                      </span>
                      <span
                        className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                          isActive
                            ? 'text-slate-900 dark:text-white font-semibold'
                            : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400'
                        }`}
                      >
                        {m.phase}
                      </span>
                    </div>

                    {/* Active Connector Arrow / Line */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTimelineConnector"
                        className="hidden lg:flex items-center gap-1.5 text-[#f5b544]"
                        transition={springSmooth}
                      >
                        <div className="h-[2px] w-6 bg-gradient-to-r from-[#f5b544] to-[#f7c86e] rounded-full shadow-[0_0_8px_rgba(245,181,68,0.5)]" />
                        <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                      </motion.div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT CONTENT PANEL — Fixed Minimum Height Container to Prevent Layout Shift */}
        <div
          className="lg:col-span-7 relative min-h-[420px] flex flex-col justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            id={`timeline-panel-${activeIndex}`}
            role="tabpanel"
            aria-labelledby={`timeline-tab-${activeIndex}`}
            className="relative w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.year}
                initial={{
                  opacity: 0,
                  x: reducedMotion ? 0 : 16,
                  filter: reducedMotion ? 'none' : 'blur(4px)',
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: 0,
                  x: reducedMotion ? 0 : -16,
                  filter: reducedMotion ? 'none' : 'blur(4px)',
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 backdrop-blur-xl shadow-xl dark:border-white/10 dark:bg-white/[0.02] dark:shadow-2xl transition-colors duration-300"
              >
                {/* Background Accent Mesh Glow Node */}
                <div
                  className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full blur-[80px] opacity-20"
                  style={{ backgroundColor: '#f5b544' }}
                />

                {/* Top Meta Bar with Icon Frame — Identical to VisionMission & WhatWeDo */}
                <motion.div
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-6"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10"
                      style={{ backgroundColor: 'rgba(245, 181, 68, 0.12)' }}
                    >
                      <activeMilestone.icon className="h-7 w-7 text-[#b78622] dark:text-[#f5b544]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                        CHAPTER {activeMilestone.index} / 05
                      </span>
                      <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {activeMilestone.phase} Phase
                      </h3>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex text-xs font-mono font-semibold text-[#b78622] dark:text-[#f7c86e] border border-slate-200 dark:border-white/10 px-3.5 py-1 rounded-full bg-slate-50 dark:bg-white/[0.03]">
                    EST. {activeMilestone.year}
                  </span>
                </motion.div>

                {/* Headline & Description */}
                <div className="mt-8 space-y-4">
                  <motion.h4
                    initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                    className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug sm:text-3xl"
                  >
                    {activeMilestone.title}
                  </motion.h4>

                  <motion.p
                    initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 }}
                    className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400"
                  >
                    {activeMilestone.description}
                  </motion.p>
                </div>

                {/* Bottom Bar — Metric Badge + Deliverables + Nav Controls */}
                <motion.div
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                  className="mt-10 pt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  {/* Metric Display */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-[#b78622] dark:text-[#f7c86e]">
                      {activeMilestone.metric}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                      {activeMilestone.metricLabel}
                    </span>
                  </div>

                  {/* Highlights Tags & Nav Arrows */}
                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex flex-wrap gap-2">
                      {activeMilestone.highlights.map((tag) => (
                        <MagneticWrapper key={tag} strength={0.12}>
                          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#f5b544]" />
                            {tag}
                          </span>
                        </MagneticWrapper>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous Chapter"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/[0.08] cursor-pointer"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next Chapter"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/[0.08] cursor-pointer"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
