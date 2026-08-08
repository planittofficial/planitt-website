'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from 'framer-motion';
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
import React, { MouseEvent } from 'react';
import {
  sectionShell,
  eyebrow,
  sectionHeading,
  glassCard,
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

const pillars: { key: Pillar; label: string; icon: React.ElementType; color: string }[] = [
  { key: 'financial', label: 'Financial & Advisory', icon: BarChart3, color: 'rgba(245, 181, 68,' },
  { key: 'technical', label: 'Technical & Education', icon: BrainCircuit, color: 'rgba(124, 92, 255,' },
];

function CapCard({ cap, activePillar }: { cap: CapabilityCard; activePillar: Pillar }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isFinancial = activePillar === 'financial';
  const accentColor = isFinancial ? 'rgba(245, 181, 68,' : 'rgba(124, 92, 255,';

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={cardHover}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      onMouseMove={handleMouseMove}
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 shadow-2xl backdrop-blur-2xl transition-colors duration-500 hover:border-white/20`}
    >
      {/* Dynamic Hover Background Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${accentColor} 0.15),
              transparent 40%
            )
          `,
        }}
      />
      {/* Animated Border Reveal on Hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              ${accentColor} 0.5),
              transparent 40%
            )
          `,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />

      <div className="relative z-10">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] shadow-inner shadow-white/10 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/[0.08]">
           {/* Soft pulse glow behind icon */}
           <div className="absolute inset-0 rounded-2xl bg-current opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-40" style={{ color: `${accentColor} 1)` }} />
           <cap.icon className="relative z-10 h-7 w-7 text-white transition-colors duration-300" style={{ color: `${accentColor} 1)` }} />
        </div>
        <h3 className="mt-6 text-xl font-semibold tracking-tight text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60">
          {cap.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
          {cap.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhatWeDo() {
  const [active, setActive] = useState<Pillar>('financial');
  const capabilities = active === 'financial' ? financialCapabilities : technicalCapabilities;

  return (
    <motion.section
      id="what-we-do"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Header */}
      <motion.div variants={revealItem} className="relative z-10 mx-auto max-w-3xl text-center">
        <p className={eyebrow}>What We Do</p>
        <h2 className={sectionHeading}>One Platform, Two Engines</h2>
        <p className="mt-6 max-w-2xl mx-auto text-base leading-relaxed text-slate-400 sm:text-lg">
          Planitt operates across two interconnected pillars — financial advisory powered by AI,
          and end-to-end technical services for the digital age.
        </p>
      </motion.div>

      {/* Segmented Control Toggle */}
      <motion.div variants={revealItem} className="relative z-10 mx-auto mt-12 flex max-w-md items-center justify-center">
        <div className="relative inline-flex rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-2xl shadow-xl">
          {pillars.map((p) => (
            <button
              key={p.key}
              onClick={() => setActive(p.key)}
              className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300
                ${active === p.key ? 'text-[#0B0F19]' : 'text-slate-400 hover:text-white'}
              `}
            >
              {active === p.key && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{
                    background: p.key === 'financial' 
                      ? 'linear-gradient(90deg, #f5b544, #f7c86e)' 
                      : 'linear-gradient(90deg, #7C5CFF, #9a82ff)'
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <p.icon className="h-4 w-4" />
              {p.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Capability cards */}
      <div className="relative z-10 mx-auto mt-16 max-w-6xl min-h-[360px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {capabilities.map((cap, i) => (
              <motion.div 
                key={cap.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.1 }}
                className="h-full"
              >
                <CapCard cap={cap} activePillar={active} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
