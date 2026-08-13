'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Eye, Rocket, ArrowUpRight, Sparkles } from 'lucide-react';
import { useHomeMode } from '@/context/HomeModeContext';
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
    accent: '#b78622',
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
    accent: '#06b6d4',
  },
];

export default function VisionMission() {
  const { homeMode, setHomeMode } = useHomeMode();
  const activeId: ActiveTab = homeMode === 'technical' ? 'mission' : 'vision';
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
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Plan Your <span className="bg-gradient-to-r from-[#f5b544] to-[#f7c86e] bg-clip-text text-transparent">Future</span> With Us.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              Building accessible financial technology and high-impact digital solutions — engineered for growth, clarity, and trust.
            </p>
          </div>

          {/* Interactive Index Switcher — Hairline Pins & Active Indicators */}
          <div className="pt-4 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
              Interactive Storyline
            </p>

            <LayoutGroup id="vision-mission-toggle">
              <div className="relative space-y-3">
                {pillars.map((p) => {
                  const isActive = activeId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setHomeMode(p.id === 'mission' ? 'technical' : 'financial')}
                      className={`group relative overflow-hidden flex w-full items-center justify-between py-4 px-5 text-left transition-all duration-300 rounded-2xl cursor-pointer ${
                        isActive
                          ? 'text-white border border-white/20 shadow-xl'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.02] hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeVisionMissionPill"
                          className={`absolute inset-0 z-0 rounded-2xl ${
                            p.id === 'vision'
                              ? 'bg-gradient-to-r from-[#b78622] to-[#d8b35c] dark:from-[#c9952d] dark:to-[#e5c26b] shadow-[0_4px_16px_rgba(183,134,34,0.3)] dark:shadow-[0_0_22px_rgba(201,149,45,0.4)]'
                              : 'bg-gradient-to-r from-cyan-600 to-sky-600 dark:from-cyan-500 dark:to-sky-500 shadow-[0_4px_16px_rgba(6,182,212,0.3)] dark:shadow-[0_0_22px_rgba(6,182,212,0.4)]'
                          }`}
                          transition={springSmooth}
                        />
                      )}

                      <div className="relative z-10 flex items-center gap-4">
                        <span
                          className={`text-xs font-mono font-bold tracking-widest ${
                            isActive ? 'text-white' : 'text-slate-500'
                          }`}
                        >
                          {p.index}
                        </span>
                        <span className="text-base font-bold tracking-tight">
                          {p.badge}
                        </span>
                      </div>

                      <div className="relative z-10 flex items-center gap-2.5">
                        <p.icon
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isActive ? 'scale-110 text-white' : 'scale-90 opacity-50'
                          }`}
                          style={{ color: isActive ? '#ffffff' : p.accent }}
                        />
                        <ArrowUpRight
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isActive ? 'translate-x-0.5 -translate-y-0.5 text-white' : 'opacity-30'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
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
              className="relative rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 backdrop-blur-xl shadow-xl dark:border-white/10 dark:bg-white/[0.02] dark:shadow-2xl transition-colors duration-300"
            >
              {/* Background Accent Mesh Node */}
              <div
                className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full blur-[80px] opacity-20"
                style={{ backgroundColor: activePillar.accent }}
              />

              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10"
                    style={{ backgroundColor: `${activePillar.accent}15` }}
                  >
                    <activePillar.icon className="h-6 w-6" style={{ color: activePillar.accent }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                      Phase {activePillar.index}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {activePillar.badge}
                    </h3>
                  </div>
                </div>

                <span className="hidden sm:inline-flex text-xs font-mono text-slate-500 border border-slate-200 dark:border-white/10 px-3 py-1 rounded-full">
                  EST. 2020
                </span>
              </div>

              {/* Headline & Description */}
              <div className="mt-8 space-y-4">
                <h4 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white leading-snug sm:text-3xl">
                  {activePillar.title}
                </h4>

                <p className="text-sm font-medium leading-relaxed text-[#b78622] dark:text-[#f7c86e]">
                  &ldquo;{activePillar.tagline}&rdquo;
                </p>

                <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
                  {activePillar.description}
                </p>
              </div>

              {/* Floating Highlights Badges */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-wrap gap-2 sm:gap-3">
                {activePillar.highlights.map((h, i) => (
                  <MagneticWrapper key={h} strength={0.15}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors hover:border-slate-300 hover:text-slate-900 dark:hover:border-white/20 dark:hover:text-white">
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
