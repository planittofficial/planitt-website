'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { sectionShell, eyebrow } from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 3 — Our Journey (The Planitt Story)
   Cinematic Scroll-Driven Timeline Experience
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

const CHAPTER_COUNT = milestones.length;

/* ── Background tint colors for progression (extremely subtle) ─────────── */
const bgTints = [
  'radial-gradient(ellipse at 50% 50%, rgba(245,181,68,0.015) 0%, transparent 70%)',
  'radial-gradient(ellipse at 50% 50%, rgba(245,181,68,0.025) 0%, transparent 70%)',
  'radial-gradient(ellipse at 40% 50%, rgba(245,181,68,0.03) 0%, transparent 70%)',
  'radial-gradient(ellipse at 50% 50%, rgba(245,181,68,0.025) 0%, rgba(124,92,255,0.015) 50%, transparent 70%)',
  'radial-gradient(ellipse at 50% 50%, rgba(245,181,68,0.035) 0%, rgba(124,92,255,0.02) 50%, transparent 70%)',
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─────────────────────────────────────────────────────────────────────────────
   TimelineNode — A single dot on the spine
   ───────────────────────────────────────────────────────────────────────────── */
function TimelineNode({
  isActive,
  isPast,
  reducedMotion,
}: {
  isActive: boolean;
  isPast: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 20, height: 20 }}>
      {/* Breathing halo — only on active node */}
      {isActive && !reducedMotion && (
        <div
          className="absolute rounded-full"
          style={{
            width: 44,
            height: 44,
            background:
              'radial-gradient(circle, rgba(245,181,68,0.35) 0%, transparent 70%)',
            animation: 'timeline-glow-breathe 3.5s ease-in-out infinite',
          }}
        />
      )}

      {/* Outer ring */}
      <div
        className="relative z-10 rounded-full border-2 transition-all"
        style={{
          width: isActive ? 16 : 10,
          height: isActive ? 16 : 10,
          borderColor: isActive || isPast ? '#f5b544' : 'rgba(148,163,184,0.2)',
          transitionDuration: '600ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Inner fill */}
        <div
          className="absolute inset-[2px] rounded-full transition-all"
          style={{
            backgroundColor:
              isActive ? '#f5b544' : isPast ? 'rgba(245,181,68,0.45)' : 'rgba(148,163,184,0.1)',
            boxShadow: isActive
              ? '0 0 12px rgba(245,181,68,0.6), 0 0 4px rgba(245,181,68,0.9)'
              : 'none',
            transitionDuration: '600ms',
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ChapterCard — Content card for a milestone
   ───────────────────────────────────────────────────────────────────────────── */
function ChapterCard({
  milestone,
  isActive,
  reducedMotion,
}: {
  milestone: Milestone;
  isActive: boolean;
  reducedMotion: boolean;
}) {
  const dur = reducedMotion ? 0.3 : 0.7;
  const stagger = reducedMotion ? 0 : 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: dur, ease }}
      className="relative"
    >
      {/* Warm ambient glow behind active card */}
      <div
        className="pointer-events-none absolute -inset-3 rounded-[24px] transition-opacity duration-700"
        style={{
          background:
            'radial-gradient(ellipse at 65% 15%, rgba(245,181,68,0.05) 0%, transparent 55%)',
          opacity: isActive ? 1 : 0,
        }}
      />

      <div
        className="relative rounded-2xl border p-6 sm:p-8 transition-all duration-700"
        style={{
          borderColor: isActive
            ? 'rgba(245,181,68,0.3)'
            : 'rgba(148,163,184,0.1)',
          backgroundColor: isActive
            ? 'rgba(245,181,68,0.03)'
            : 'rgba(148,163,184,0.02)',
          boxShadow: isActive
            ? '0 8px 32px rgba(245,181,68,0.05), 0 1px 2px rgba(0,0,0,0.15)'
            : '0 1px 2px rgba(0,0,0,0.1)',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header Bar */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: dur, delay: stagger, ease }}
          className="flex items-center justify-between pb-4 mb-4 transition-all duration-700"
          style={{
            borderBottom: `1px solid ${isActive ? 'rgba(245,181,68,0.18)' : 'rgba(148,163,184,0.08)'}`,
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-2xl font-extrabold font-mono tracking-tight transition-colors duration-600"
              style={{
                color: isActive ? '#f5b544' : 'rgba(245,181,68,0.35)',
              }}
            >
              {milestone.year}
            </span>
            <span
              className="text-xs font-bold uppercase tracking-[0.2em] transition-opacity duration-600"
              style={{
                opacity: isActive ? 0.8 : 0.35,
                color: 'rgb(148,163,184)',
              }}
            >
              / {milestone.phase}
            </span>
          </div>

          <motion.span
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: stagger + 0.08, ease }}
            className="text-xs font-mono transition-opacity duration-600"
            style={{
              opacity: isActive ? 0.7 : 0.25,
              color: 'rgb(148,163,184)',
            }}
          >
            CHAPTER {milestone.index}
          </motion.span>
        </motion.div>

        {/* Title */}
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: dur, delay: stagger * 2, ease }}
          className="text-xl font-bold tracking-tight sm:text-2xl transition-all duration-600 text-slate-900 dark:text-white"
          style={{
            opacity: isActive ? 1 : 0.4,
          }}
        >
          {milestone.title}
        </motion.h4>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: dur, delay: stagger * 3, ease }}
          className="mt-3 text-sm sm:text-base leading-relaxed transition-opacity duration-600 text-slate-600 dark:text-slate-300"
          style={{
            opacity: isActive ? 0.9 : 0.35,
          }}
        >
          {milestone.description}
        </motion.p>

        {/* Metric Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: dur, delay: stagger * 4, ease }}
          className="pt-4 mt-4 flex items-center gap-2 transition-all duration-700"
          style={{
            borderTop: `1px solid ${isActive ? 'rgba(245,181,68,0.12)' : 'rgba(148,163,184,0.06)'}`,
          }}
        >
          <span
            className="text-lg font-extrabold font-mono transition-colors duration-600"
            style={{
              color: isActive ? '#f7c86e' : 'rgba(247,200,110,0.3)',
            }}
          >
            {milestone.metric}
          </span>
          <span
            className="text-xs uppercase tracking-wider transition-opacity duration-600"
            style={{
              opacity: isActive ? 0.7 : 0.3,
              color: 'rgb(148,163,184)',
            }}
          >
            {milestone.metricLabel}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main OurJourney Component
   ───────────────────────────────────────────────────────────────────────────── */
export default function OurJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);

  /* ── Scroll tracking over the entire timeline area ──────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.7', 'end 0.3'],
  });

  /* ── Progress line height: smooth 0→1 ────────────────────────────────── */
  const progressScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  /* ── Detect active chapter from scroll position ─────────────────────── */
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(latest, 0.999));
    const segment = 1 / CHAPTER_COUNT;
    const idx = Math.min(
      Math.floor(clamped / segment),
      CHAPTER_COUNT - 1
    );
    if (idx !== activeIndex) setActiveIndex(idx);
  });

  /* ── Subtle parallax per card ────────────────────────────────────────── */
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [12, -12]
  );

  return (
    <div ref={sectionRef} className="relative">
      <motion.section
        id="our-journey"
        className={sectionShell}
      >
        {/* Background progression overlay */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 transition-all duration-1000"
          style={{ background: bgTints[activeIndex] }}
        />

        {/* Top Divider */}
        <div className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-[#f5b544]/30 to-transparent" />

        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
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

        {/* ═════════════════════════════════════════════════════════════════
            DESKTOP LAYOUT (lg+)
            Left: sticky timeline spine   |   Right: scrolling chapter cards
            ═════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-0 items-start">

          {/* ─── LEFT COLUMN: Sticky Timeline Spine ─────────────────────── */}
          <div className="lg:col-span-3 lg:sticky lg:top-28 self-start">
            <div className="relative flex flex-col items-center" style={{ minHeight: 420 }}>
              {/* Background spine track */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] rounded-full bg-slate-200 dark:bg-white/[0.06]" />

              {/* Gold progress line */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] rounded-full origin-top"
                style={{
                  scaleY: progressScaleY,
                  height: '100%',
                  background:
                    'linear-gradient(180deg, #f5b544 0%, #f7c86e 50%, rgba(245,181,68,0.25) 100%)',
                  boxShadow: '0 0 8px rgba(245,181,68,0.3)',
                }}
              />

              {/* Timeline nodes */}
              {milestones.map((m, i) => {
                const isActive = i === activeIndex;
                const isPast = i < activeIndex;

                return (
                  <div
                    key={m.year}
                    className="relative z-10 flex items-center w-full"
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {/* Year label — left of node */}
                    <div className="flex-1 flex justify-end pr-4">
                      <span
                        className="text-sm font-mono font-bold tracking-tight transition-all"
                        style={{
                          color: isActive
                            ? '#f5b544'
                            : isPast
                            ? 'rgba(245,181,68,0.45)'
                            : 'rgba(148,163,184,0.25)',
                          transform: isActive ? 'scale(1.08)' : 'scale(1)',
                          transitionDuration: '600ms',
                          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        {m.year}
                      </span>
                    </div>

                    {/* Node */}
                    <TimelineNode
                      isActive={isActive}
                      isPast={isPast}
                      reducedMotion={reducedMotion}
                    />

                    {/* Phase label — right of node */}
                    <div className="flex-1 pl-4">
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.18em] transition-all"
                        style={{
                          color: isActive
                            ? 'rgb(148,163,184)'
                            : 'rgba(148,163,184,0.25)',
                          transitionDuration: '600ms',
                        }}
                      >
                        {m.phase}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Scrolling Chapter Cards ──────────────────── */}
          <div ref={cardsRef} className="lg:col-span-9 lg:pl-8 relative space-y-16">
            {milestones.map((m, i) => {
              const isActive = i === activeIndex;

              return (
                <div key={m.year} className="relative">
                  {/* Horizontal connector line from spine area to card */}
                  <div
                    className="absolute -left-8 top-10 hidden lg:block"
                    style={{ width: 32 }}
                  >
                    <div
                      className="h-[1.5px] rounded-full transition-all origin-left"
                      style={{
                        backgroundColor: isActive
                          ? 'rgba(245,181,68,0.45)'
                          : 'rgba(148,163,184,0.08)',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0.35)',
                        boxShadow: isActive
                          ? '0 0 6px rgba(245,181,68,0.15)'
                          : 'none',
                        transitionDuration: '700ms',
                        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>

                  <motion.div style={{ y: parallaxY }}>
                    <ChapterCard
                      milestone={m}
                      isActive={isActive}
                      reducedMotion={reducedMotion}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            MOBILE LAYOUT (< lg): Left-edge timeline + full-width cards
            ═════════════════════════════════════════════════════════════════ */}
        <div className="lg:hidden relative pl-10 sm:pl-12">
          {/* Vertical spine track */}
          <div className="absolute left-[14px] sm:left-[18px] top-0 bottom-0 w-[2px] rounded-full bg-slate-200 dark:bg-white/[0.06]" />

          {/* Gold progress line — mobile */}
          <motion.div
            className="absolute left-[14px] sm:left-[18px] top-0 w-[2px] rounded-full origin-top"
            style={{
              scaleY: progressScaleY,
              height: '100%',
              background:
                'linear-gradient(180deg, #f5b544 0%, #f7c86e 50%, rgba(245,181,68,0.25) 100%)',
              boxShadow: '0 0 6px rgba(245,181,68,0.2)',
            }}
          />

          <div className="space-y-10">
            {milestones.map((m, i) => {
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;

              return (
                <div key={m.year} className="relative">
                  {/* Mobile node */}
                  <div
                    className="absolute top-7"
                    style={{ left: -34 }}
                  >
                    <TimelineNode
                      isActive={isActive}
                      isPast={isPast}
                      reducedMotion={reducedMotion}
                    />
                  </div>

                  {/* Mobile horizontal connector */}
                  <div
                    className="absolute top-[29px]"
                    style={{ left: -14, width: 14 }}
                  >
                    <div
                      className="h-[1.5px] rounded-full transition-all origin-left"
                      style={{
                        backgroundColor: isActive
                          ? 'rgba(245,181,68,0.35)'
                          : 'rgba(148,163,184,0.08)',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0.3)',
                        transitionDuration: '600ms',
                      }}
                    />
                  </div>

                  <ChapterCard
                    milestone={m}
                    isActive={isActive}
                    reducedMotion={reducedMotion}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
