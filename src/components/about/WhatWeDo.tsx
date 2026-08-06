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
} from 'lucide-react';
import {
  sectionShell,
  eyebrow,
  sectionHeading,
  glassCard,
  goldHover,
  revealSection,
  revealItem,
  cardHover,
  microTransition,
} from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 2 — What Planitt Does
   ───────────────────────────────────────────────────────────────────────────── */

type Pillar = 'financial' | 'technical';

interface CapabilityCard {
  icon: React.ElementType;
  title: string;
  description: string;
}

const financialCapabilities: CapabilityCard[] = [
  {
    icon: Landmark,
    title: 'Advisory',
    description: '[Financial advisory services — placeholder description to be refined]',
  },
  {
    icon: LineChart,
    title: 'Multi-Asset Recommendation System',
    description: '[AI-driven signals across Stocks, Crypto, Forex, F&O, IPO — placeholder]',
  },
  {
    icon: Bot,
    title: 'Automation & Trading Bots',
    description: '[Trading algorithms, execution automation & strategy bots — placeholder]',
  },
];

const technicalCapabilities: CapabilityCard[] = [
  {
    icon: Code2,
    title: 'Technical Services',
    description: '[App, Web, Cloud, DevOps, Cybersecurity & Digital Marketing — placeholder]',
  },
  {
    icon: GraduationCap,
    title: 'Courses & Academy',
    description: '[Financial & technical courses, training programs — placeholder]',
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    description: '[Cloud architecture, hosting, CI/CD & scalable deployments — placeholder]',
  },
];

const pillars: { key: Pillar; label: string; icon: React.ElementType }[] = [
  { key: 'financial', label: 'Financial & Advisory', icon: BarChart3 },
  { key: 'technical', label: 'Technical & Education', icon: BrainCircuit },
];

export default function WhatWeDo() {
  const [active, setActive] = useState<Pillar>('financial');
  const capabilities = active === 'financial' ? financialCapabilities : technicalCapabilities;

  return (
    <motion.section
      id="what-we-do"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Header */}
      <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
        <p className={eyebrow}>What We Do</p>
        <h2 className={sectionHeading}>One Platform, Two Engines</h2>
        <p className="mt-4 max-w-2xl mx-auto text-sm leading-6 text-slate-400 sm:text-base">
          Planitt operates across two interconnected pillars — financial advisory powered by AI,
          and end-to-end technical services for the digital age.
        </p>
      </motion.div>

      {/* Toggle */}
      <motion.div variants={revealItem} className="mx-auto mt-10 flex max-w-md items-center justify-center">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
          {pillars.map((p) => (
            <button
              key={p.key}
              onClick={() => setActive(p.key)}
              className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300
                ${active === p.key
                  ? 'bg-gradient-to-r from-[#f5b544]/90 to-[#f7c86e]/80 text-[#0B0F19] shadow-[0_8px_30px_rgba(245,181,68,0.3)]'
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              <p.icon className="h-4 w-4" />
              {p.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Capability cards */}
      <div className="mt-12 min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                whileHover={cardHover}
                className={`${glassCard} ${goldHover} relative overflow-hidden p-7`}
              >
                {/* Subtle accent glow */}
                <div
                  className={`absolute -right-8 -top-8 h-28 w-28 rounded-full blur-3xl ${
                    active === 'financial' ? 'bg-[#f5b544]/6' : 'bg-[#7C5CFF]/6'
                  }`}
                />
                <div className="relative">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      active === 'financial'
                        ? 'bg-[#f5b544]/10 text-[#f7c86e]'
                        : 'bg-[#7C5CFF]/10 text-[#c9bcff]'
                    }`}
                  >
                    <cap.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{cap.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
