'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Rocket, ArrowUpRight, Sparkles } from 'lucide-react';
import {
  sectionShell,
  eyebrow,
  revealSection,
  revealItem,
  springSmooth,
  MagneticWrapper,
} from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 1 — Vision & Mission
   Large Editorial Hero Composition with Interactive Dual-Axis Focal Engine
   ───────────────────────────────────────────────────────────────────────────── */

type ActiveTab = 'vision' | 'mission';

interface Pillar {
  id: ActiveTab;
  index: string;
  badge: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  accent: string;
}

const pillars: Pillar[] = [
  {
    id: 'vision',
    index: '01',
    badge: 'Our Core Vision',
    icon: Eye,
    title: 'Architecting the Future of Wealth & Technology',
    tagline: 'To be the most trusted dual-engine platform across financial guidance and technical delivery.',
    description:
      'We empower individuals with clear, goal-oriented wealth guidance while engineering modern, resilient technical solutions for growing enterprises. Our vision unites intelligence, integrity, and innovation.',
    highlights: ['Goal-Oriented Guidance', 'Engineered Reliability', 'Unified Ecosystem'],
    accent: '#f5b544',
  },
  {
    id: 'mission',
    index: '02',
    badge: 'Our Daily Mission',
    icon: Rocket,
    title: 'Delivering Practical Wealth Advisory & Digital Solutions',
    tagline: 'To prioritize transparency, high-performance execution, and expert leadership in every project.',
    description:
      'We break down complex financial concepts into structured action plans while building scalable software, cloud infrastructure, and algorithmic tools under expert leadership.',
    highlights: ['Transparent Advisory', 'Algorithmic Precision', 'End-to-End Delivery'],
    accent: '#7C5CFF',
  },
];

export default function VisionMission() {
  const [activeId, setActiveId] = useState<ActiveTab>('vision');
  const activePillar = pillars.find((p) => p.id === activeId)!;

  return (
    <motion.section
      id="vision-mission"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Structural Accent Top Line */}
      <div className="mb-12 h-px w-full bg-gradient-to-r from-[#f5b544]/30 via-white/10 to-transparent" />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        {/* LEFT COLUMN: Editorial Heading & Navigation Index */}
        <motion.div variants={revealItem} className="lg:col-span-5 space-y-8">
          <div>
            <span className={eyebrow}>
              <Sparkles className="h-3.5 w-3.5" /> 01 / Who We Are
            </span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Plan Your <span className="bg-gradient-to-r from-[#f5b544] to-[#f7c86e] bg-clip-text text-transparent">Future</span> With Us.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-400 sm:text-lg">
              Building accessible financial technology and high-impact digital solutions — engineered for growth, clarity, and trust.
            </p>
          </div>

          {/* Interactive Index Switcher — Hairline Pins & Active Indicators */}
          <div className="pt-4 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
              Interactive Storyline
            </p>

            <div className="relative space-y-2">
              {pillars.map((p) => {
                const isActive = activeId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveId(p.id)}
                    className={`group relative flex w-full items-center justify-between py-4 px-5 text-left transition-all duration-300 rounded-xl ${
                      isActive
                        ? 'bg-white/[0.04] text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs font-mono font-bold tracking-widest ${
                          isActive ? 'text-[#f5b544]' : 'text-slate-600'
                        }`}
                      >
                        {p.index}
                      </span>
                      <span className="text-sm font-semibold tracking-tight">
                        {p.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <p.icon
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isActive ? 'scale-110' : 'scale-90 opacity-40'
                        }`}
                        style={{ color: p.accent }}
                      />
                      <ArrowUpRight
                        className={`h-3.5 w-3.5 transition-opacity duration-300 ${
                          isActive ? 'opacity-100 text-[#f5b544]' : 'opacity-0'
                        }`}
                      />
                    </div>

                    {/* Active Accent Border Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activePillarBar"
                        className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
                        style={{ backgroundColor: p.accent }}
                        transition={springSmooth}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Asymmetric Dynamic Display Engine */}
        <motion.div variants={revealItem} className="lg:col-span-7 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 backdrop-blur-xl shadow-2xl"
            >
              {/* Background Accent Mesh Node */}
              <div
                className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full blur-[80px] opacity-20"
                style={{ backgroundColor: activePillar.accent }}
              />

              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10"
                    style={{ backgroundColor: `${activePillar.accent}15` }}
                  >
                    <activePillar.icon className="h-6 w-6" style={{ color: activePillar.accent }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                      Phase {activePillar.index}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      {activePillar.badge}
                    </h3>
                  </div>
                </div>

                <span className="hidden sm:inline-flex text-xs font-mono text-slate-500 border border-white/10 px-3 py-1 rounded-full">
                  EST. 2020
                </span>
              </div>

              {/* Headline & Description */}
              <div className="mt-8 space-y-4">
                <h4 className="text-2xl font-semibold tracking-tight text-white leading-snug sm:text-3xl">
                  {activePillar.title}
                </h4>

                <p className="text-sm font-medium leading-relaxed text-[#f7c86e]">
                  &ldquo;{activePillar.tagline}&rdquo;
                </p>

                <p className="text-sm sm:text-base leading-relaxed text-slate-400">
                  {activePillar.description}
                </p>
              </div>

              {/* Floating Highlights Badges */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap gap-2 sm:gap-3">
                {activePillar.highlights.map((h, i) => (
                  <MagneticWrapper key={h} strength={0.15}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-white/20 hover:text-white">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: activePillar.accent }}
                      />
                      {h}
                    </span>
                  </MagneticWrapper>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Structural Accent Bottom Line */}
      <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </motion.section>
  );
}
