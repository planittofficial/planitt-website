'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  Bot,
  BrainCircuit,
  Cloud,
  Code2,
  GraduationCap,
  Landmark,
  LineChart,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import React from 'react';
import {
  sectionShell,
  eyebrow,
  revealSection,
  revealItem,
  springSmooth,
  MagneticWrapper,
} from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 2 — What Planitt Does
   Interactive Dual-Engine Showcase (Financial vs Technical)
   ───────────────────────────────────────────────────────────────────────────── */

type Pillar = 'financial' | 'technical';

interface CapabilityItem {
  index: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

const financialCapabilities: CapabilityItem[] = [
  {
    index: '01',
    icon: Landmark,
    title: 'Advisory & Portfolio Structuring',
    subtitle: 'Goal-Oriented Asset Management',
    description:
      'Structured financial advisory across SIPs, mutual funds, equity allocations, and risk management tailored to long-term wealth objectives.',
    tags: ['Wealth Planning', 'SIP Strategy', 'Risk Hedging'],
  },
  {
    index: '02',
    icon: LineChart,
    title: 'Multi-Asset Recommendation System',
    subtitle: 'AI-Driven Market Intelligence',
    description:
      'Advanced forecasting and signal generation across Stocks, Crypto, Forex, F&O, and IPOs powered by proprietary quantitative models.',
    tags: ['Stocks & F&O', 'Crypto & Forex', 'IPO Signals'],
  },
  {
    index: '03',
    icon: Bot,
    title: 'Automation & Trading Algorithms',
    subtitle: 'Institutional Execution Bots',
    description:
      'Automated strategy execution, rule-based algorithmic triggers, and real-time risk controls built for consistency and discipline.',
    tags: ['Algo Bots', 'API Execution', 'Risk Protocols'],
  },
];

const technicalCapabilities: CapabilityItem[] = [
  {
    index: '01',
    icon: Code2,
    title: 'Technical Delivery & Engineering',
    subtitle: 'Full-Stack Software Architecture',
    description:
      'Custom web & mobile app engineering, enterprise backend design, API integration, and scalable digital product delivery.',
    tags: ['Web & Mobile', 'API Systems', 'Scalable Code'],
  },
  {
    index: '02',
    icon: GraduationCap,
    title: 'Planitt Academy & Mentorship',
    subtitle: 'Practical Skills Training',
    description:
      'Hands-on masterclasses in algorithmic trading, personal finance management, and full-stack software development.',
    tags: ['Algo Trading', 'Fintech Bootcamp', 'Live Mentorship'],
  },
  {
    index: '03',
    icon: Cloud,
    title: 'Cloud, Infrastructure & Security',
    subtitle: 'DevOps & Cyber Safeguards',
    description:
      'Cloud hosting, CI/CD automation pipelines, infrastructure optimization, and end-to-end security compliance.',
    tags: ['AWS/Cloud', 'CI/CD Pipelines', 'Cyber Security'],
  },
];

const pillars: { key: Pillar; label: string; icon: React.ElementType }[] = [
  { key: 'financial', label: 'Engine A: Financial & Advisory', icon: BarChart3 },
  { key: 'technical', label: 'Engine B: Technical & Education', icon: BrainCircuit },
];

export default function WhatWeDo() {
  const [activePillar, setActivePillar] = useState<Pillar>('financial');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const capabilities = activePillar === 'financial' ? financialCapabilities : technicalCapabilities;
  const activeCap = capabilities[activeStepIndex] || capabilities[0];
  const isFinancial = activePillar === 'financial';
  const accentColor = isFinancial ? '#f5b544' : '#7C5CFF';

  return (
    <motion.section
      id="what-we-do"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Editorial Header Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.08] pb-12">
        <div>
          <span className={eyebrow}>
            <Sparkles className="h-3.5 w-3.5" /> 02 / Operational Capabilities
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            One Platform.{' '}
            <span className="bg-gradient-to-r from-[#f5b544] via-[#f7c86e] to-[#7C5CFF] bg-clip-text text-transparent">
              Two Specialized Engines.
            </span>
          </h2>
        </div>

        {/* Segmented Control Pill Toggle */}
        <div className="relative inline-flex shrink-0 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md">
          {pillars.map((p) => {
            const isActive = activePillar === p.key;
            return (
              <button
                key={p.key}
                onClick={() => {
                  setActivePillar(p.key);
                  setActiveStepIndex(0);
                }}
                className={`relative z-10 flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
                  isActive ? 'text-[#0B0F19]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeEnginePill"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{
                      background: p.key === 'financial'
                        ? 'linear-gradient(90deg, #f5b544, #f7c86e)'
                        : 'linear-gradient(90deg, #7C5CFF, #9a82ff)',
                    }}
                    transition={springSmooth}
                  />
                )}
                <p.icon className="h-4 w-4" />
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Showcase Grid */}
      <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        {/* LEFT COLUMN: Vertical Step Indexing List */}
        <motion.div variants={revealItem} className="lg:col-span-5 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-4">
            Select Core Capability
          </p>

          {capabilities.map((cap, i) => {
            const isSelected = activeStepIndex === i;
            return (
              <button
                key={cap.index}
                onClick={() => setActiveStepIndex(i)}
                className={`group relative flex w-full items-center justify-between p-5 text-left transition-all duration-300 rounded-2xl ${
                  isSelected
                    ? 'bg-white/[0.05] border border-white/15'
                    : 'border border-transparent hover:bg-white/[0.02] text-slate-400'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-lg font-mono font-extrabold tracking-widest ${
                      isSelected ? 'text-[#f5b544]' : 'text-slate-600'
                    }`}
                  >
                    {cap.index}
                  </span>
                  <div>
                    <h3 className={`text-base font-semibold tracking-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {cap.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{cap.subtitle}</p>
                  </div>
                </div>

                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isSelected ? 'translate-x-1 text-[#f5b544]' : 'opacity-30'
                  }`}
                />

                {isSelected && (
                  <motion.div
                    layoutId="activeCapBorder"
                    className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full"
                    style={{ backgroundColor: accentColor }}
                    transition={springSmooth}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* RIGHT COLUMN: Illuminated Dynamic Spotlight Panel */}
        <motion.div variants={revealItem} className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activePillar}-${activeCap.index}`}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 backdrop-blur-xl"
            >
              {/* Top Bar with Icon */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10"
                    style={{ backgroundColor: `${accentColor}15` }}
                  >
                    <activeCap.icon className="h-7 w-7" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                      Module {activeCap.index} / 03
                    </span>
                    <h4 className="text-xl font-bold tracking-tight text-white">
                      {activeCap.subtitle}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="mt-8 space-y-4">
                <h3 className="text-2xl font-bold tracking-tight text-white leading-snug sm:text-3xl">
                  {activeCap.title}
                </h3>
                <p className="text-base leading-relaxed text-slate-300">
                  {activeCap.description}
                </p>
              </div>

              {/* Floating Metallic Tags */}
              <div className="mt-10 pt-6 border-t border-white/[0.08]">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-3">
                  Core Highlights & Deliverables
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {activeCap.tags.map((tag) => (
                    <MagneticWrapper key={tag} strength={0.12}>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-200">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: accentColor }}
                        />
                        {tag}
                      </span>
                    </MagneticWrapper>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
