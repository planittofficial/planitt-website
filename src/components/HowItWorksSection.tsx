'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Sparkles,
  Shield,
  Activity,
  ArrowRight,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

const sectionReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stepsData = [
  {
    id: 1,
    num: '01',
    title: 'Scan Markets',
    description: 'PLANITT scans multi-market order books, macro sentiment, and live technical signals.',
    badge: 'Scanning',
    input: 'Multi-market context',
    output: 'Raw context data',
    color: 'from-purple-500/20 to-indigo-500/20 text-purple-300 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]',
    accentColor: '#7C5CFF',
    image: '/scan-markets.png',
  },
  {
    id: 2,
    num: '02',
    title: 'Generate Signals',
    description: 'Our core neural models calculate entry targets, invalidation triggers, and risk metrics.',
    badge: 'AI Scoring',
    input: 'Processed context',
    output: 'Setup parameters',
    color: 'from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]',
    accentColor: '#3B82F6',
    image: '/generate-signals.png',
  },
  {
    id: 3,
    num: '03',
    title: 'Take Action',
    description: 'Review clear entry, stop-loss limits, risk/reward profiles, and proceed with confidence.',
    badge: 'Decision',
    input: 'Validated setup',
    output: 'Executed trade',
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    accentColor: '#10B981',
    image: '/take-action.png',
  },
];

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Auto-cycling workflow steps when not hovered
  useEffect(() => {
    if (isHovered || !isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === 3 ? 1 : prev + 1));
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovered, isInView]);

  return (
    <motion.section
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionReveal}
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      {/* Background gradients and glows */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes workflow-sweep {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes workflow-pulse {
            0%, 100% { transform: scale(0.9); opacity: 0.3; }
            50% { transform: scale(1.15); opacity: 0.65; }
          }
          @keyframes workflow-flow-horizontal {
            from { stroke-dashoffset: 60; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes workflow-ripple {
            0% { transform: scale(0.8); opacity: 0.7; border-width: 2px; }
            100% { transform: scale(1.6); opacity: 0; border-width: 1px; }
          }
          @keyframes workflow-particle {
            0% { transform: translateY(0px) scale(0.5); opacity: 0; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-35px) scale(1.1); opacity: 0; }
          }

          .workflow-sweep-line {
            animation: workflow-sweep 4s linear infinite;
            transform-origin: bottom right;
          }
          .workflow-pulse-glow {
            animation: workflow-pulse 3s ease-in-out infinite;
          }
          .workflow-connector-flow {
            stroke-dasharray: 8 6;
            animation: workflow-flow-horizontal 1.8s linear infinite;
          }
          .workflow-connector-flow-fast {
            stroke-dasharray: 8 6;
            animation: workflow-flow-horizontal 0.9s linear infinite;
          }
          .workflow-ripple-1 {
            animation: workflow-ripple 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          }
          .workflow-ripple-2 {
            animation: workflow-ripple 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite 1.2s;
          }
          .workflow-particle-1 {
            animation: workflow-particle 4s ease-out infinite;
          }
          .workflow-particle-2 {
            animation: workflow-particle 5s ease-out infinite 1.5s;
          }
        `
      }} />

      {/* Decorative Blur Backgrounds */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#7C5CFF]/10 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-[220px] w-[400px] rounded-full bg-cyan-500/5 blur-3xl opacity-50" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div variants={itemReveal} className="mb-16 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#7C5CFF] drop-shadow-[0_0_8px_rgba(124,92,255,0.3)]">
            How It Works
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            How <span className="bg-gradient-to-r from-[#7C5CFF] via-indigo-300 to-cyan-400 bg-clip-text text-transparent">PLANITT</span> generates signals
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Our multi-market scanning models digest live sentiment and order flows, scoring them through core AI strategies to deliver explainable and actionable decisions.
          </p>
        </motion.div>

        {/* Desktop Layout - Horizontal Workflow Row with Connectors */}
        <motion.div 
          variants={itemReveal}
          className="hidden lg:flex items-center justify-between gap-4 mt-12 mb-16 relative"
        >
          {stepsData.map((step, index) => {
            const isActive = activeStep === step.id;

            return (
              <React.Fragment key={step.id}>
                {/* Connector Line (Left side of Step 2 and 3) */}
                {index > 0 && (
                  <div className="flex-1 flex items-center justify-center relative min-w-[60px] h-12">
                    <svg className="w-full h-8" viewBox="0 0 100 20" fill="none" preserveAspectRatio="none">
                      {/* Base path */}
                      <path d="M 0 10 L 100 10" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" />
                      {/* Flowing animated dash path */}
                      <path 
                        d="M 0 10 L 100 10" 
                        stroke={isActive || activeStep > step.id ? '#7C5CFF' : 'rgba(124, 92, 255, 0.3)'} 
                        strokeWidth="2" 
                        className={isActive || activeStep > step.id ? 'workflow-connector-flow-fast' : 'workflow-connector-flow'}
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Glowing pulse indicator node */}
                    <motion.div 
                      animate={isActive || activeStep > step.id ? { x: [-30, 30], opacity: [0, 1, 0] } : {}}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                      className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] pointer-events-none"
                    />
                  </div>
                )}

                {/* Step Card Visual */}
                <motion.div
                  onMouseEnter={() => {
                    setActiveStep(step.id);
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                  whileHover={{ y: -6 }}
                  className={`relative cursor-pointer transition-all duration-300 rounded-[28px] border p-6 flex flex-col items-center w-[280px] bg-white/[0.02] backdrop-blur-md shadow-2xl ${
                    isActive 
                      ? 'border-[#7C5CFF]/50 shadow-[0_15px_45px_rgba(124,92,255,0.15)] bg-white/[0.04]' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  
                  {/* Stage number */}
                  <div className="absolute top-4 left-6 text-xs font-bold tracking-widest text-slate-500">
                    {step.num}
                  </div>

                  {/* Sliced Image Illustration Container */}
                  <div className="relative w-[190px] h-[190px] rounded-[20px] overflow-hidden bg-black/10 border border-white/5 shadow-inner mt-4 flex items-center justify-center">
                    
                    {/* Individual image instead of sliced workflow-steps.png */}
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover pointer-events-none select-none transition-all duration-300"
                      style={{
                        filter: isActive ? 'brightness(1.1) saturate(1.1)' : 'brightness(0.7) saturate(0.8)',
                      }}
                    />

                    {/* Interactive Animated Overlays on top of sliced visuals */}
                    {step.id === 1 && (
                      <div className="absolute inset-0 pointer-events-none">
                        {/* Radar Sweep Line */}
                        <div className={`absolute w-[80px] h-[1px] bg-gradient-to-l from-purple-500/80 to-transparent workflow-sweep-line`}
                             style={{ bottom: '95px', right: '95px' }} />
                        {/* Radar Core Glowing pulse */}
                        <div className="absolute w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7] bottom-[94px] right-[94px] animate-ping" />
                        
                        {/* Glowing orbiting coordinates */}
                        <div className="absolute top-[52px] left-[52px] w-1.5 h-1.5 rounded-full bg-[#7C5CFF]/80 shadow-[0_0_6px_#7c5cff]" />
                        <div className="absolute bottom-[44px] right-[62px] w-2 h-2 rounded-full bg-cyan-400/80 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                      </div>
                    )}

                    {step.id === 2 && (
                      <div className="absolute inset-0 pointer-events-none">
                        {/* Sparkles scaling */}
                        <div className="absolute top-[48px] right-[52px] w-4 h-4 text-purple-300 animate-spin-slow">
                          <Sparkles className="w-full h-full text-indigo-300 opacity-80" />
                        </div>
                        {/* Floating particles rising */}
                        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-indigo-400 workflow-particle-1" />
                        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 rounded-full bg-cyan-400 workflow-particle-2" />
                      </div>
                    )}

                    {step.id === 3 && (
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        {/* Concentric ripples */}
                        <div className="absolute w-[60px] h-[60px] rounded-full border border-emerald-400/40 workflow-ripple-1" style={{ top: '65px', left: '65px' }} />
                        <div className="absolute w-[60px] h-[60px] rounded-full border border-cyan-400/40 workflow-ripple-2" style={{ top: '65px', left: '65px' }} />
                        {/* Dart target tip dot */}
                        <div className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-ping" style={{ bottom: '86px', right: '108px' }} />
                      </div>
                    )}

                    {/* Ambient Glow backing */}
                    <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.12)_0%,transparent_70%)] transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`} />

                  </div>

                  {/* Step Title */}
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                    {step.title}
                  </h3>

                  {/* Step Short Description */}
                  <p className="mt-2 text-xs text-center text-slate-400 leading-normal max-w-[220px]">
                    {step.description}
                  </p>

                  {/* Live badge status */}
                  <div className={`mt-4 px-2.5 py-1 rounded-full border text-[10px] uppercase font-bold tracking-wider ${
                    isActive ? step.color : 'border-white/5 bg-white/[0.01] text-slate-500'
                  }`}>
                    {step.badge}
                  </div>

                </motion.div>
              </React.Fragment>
            );
          })}
        </motion.div>

        {/* Mobile & Tablet Layout - Vertical Timeline Workflow */}
        <motion.div 
          variants={itemReveal}
          className="lg:hidden flex flex-col gap-10 mt-8 mb-12 relative"
        >
          {/* Vertical central connector line */}
          <div className="absolute left-[36px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#7C5CFF]/60 via-cyan-400/50 to-[#10B981]/60 pointer-events-none md:left-1/2 md:-translate-x-1/2" />

          {stepsData.map((step, index) => {
            const isActive = activeStep === step.id;

            return (
              <motion.div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                whileTap={{ scale: 0.98 }}
                className={`relative flex flex-col md:flex-row gap-6 p-5 sm:p-6 rounded-[24px] border bg-white/[0.02] backdrop-blur-md cursor-pointer transition-all duration-300 ${
                  isActive 
                    ? 'border-[#7C5CFF]/40 bg-white/[0.03] shadow-lg shadow-purple-500/5' 
                    : 'border-white/10'
                }`}
              >
                
                {/* Numeric indicator circle */}
                <div className={`relative z-10 flex h-[72px] w-[72px] flex-none items-center justify-center rounded-2xl border text-xl font-black ${
                  isActive 
                    ? 'border-[#7C5CFF] bg-[#7C5CFF]/15 text-[#d4cbff]' 
                    : 'border-white/10 bg-black/40 text-slate-400'
                } md:mx-0 md:self-center`}>
                  {step.num}
                </div>

                {/* Individual Image Illustration - Centered on Mobile */}
                <div className="flex justify-center md:justify-start items-center">
                  <div className="relative w-[180px] h-[180px] rounded-2xl overflow-hidden bg-black/20 border border-white/5 shadow-inner">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover pointer-events-none select-none transition-all duration-300"
                      style={{
                        filter: isActive ? 'brightness(1.1) saturate(1.1)' : 'brightness(0.7) saturate(0.8)',
                      }}
                    />

                    {/* Animated Overlays */}
                    {step.id === 1 && isActive && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute w-[70px] h-[1px] bg-gradient-to-l from-purple-500/80 to-transparent workflow-sweep-line"
                             style={{ bottom: '88px', right: '88px' }} />
                        <div className="absolute w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7] bottom-[86px] right-[86px] animate-ping" />
                      </div>
                    )}
                    {step.id === 2 && isActive && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-[40px] right-[40px] w-4 h-4 text-purple-300 animate-spin-slow">
                          <Sparkles className="w-full h-full text-indigo-300 opacity-80" />
                        </div>
                        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-indigo-400 workflow-particle-1" />
                      </div>
                    )}
                    {step.id === 3 && isActive && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute w-[50px] h-[50px] rounded-full border border-emerald-400/40 workflow-ripple-1" style={{ top: '65px', left: '65px' }} />
                        <div className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-ping" style={{ bottom: '80px', right: '100px' }} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex-1">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#7C5CFF]">
                    {step.badge}
                  </span>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {step.description}
                  </p>

                  {/* Meta stats for Inputs / Outputs */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                      <p className="text-[9px] uppercase tracking-wider text-slate-500">INPUT</p>
                      <p className="mt-1 text-xs font-semibold text-white truncate">{step.input}</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                      <p className="text-[9px] uppercase tracking-wider text-slate-500">OUTPUT</p>
                      <p className="mt-1 text-xs font-semibold text-white truncate">{step.output}</p>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* Details & In-depth Info Box (Desktop only, changes based on activeStep) */}
        <motion.div 
          variants={itemReveal}
          className="hidden lg:block relative"
        >
          <AnimatePresence mode="wait">
            {stepsData.map((step) => {
              if (step.id !== activeStep) return null;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6 shadow-2xl flex items-center justify-between gap-8"
                >
                  <div className="flex-1">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-[#7C5CFF]">
                      Active Stage — {step.badge}
                    </span>
                    <h4 className="mt-2 text-2xl font-bold text-white tracking-tight">
                      {step.title}
                    </h4>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div className="rounded-2xl border border-white/5 bg-black/40 p-4 min-w-[150px] shadow-inner">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Input Data</span>
                      <p className="mt-1 text-sm font-semibold text-white">{step.input}</p>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-black/40 p-4 min-w-[150px] shadow-inner">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Output Result</span>
                      <p className="mt-1 text-sm font-semibold text-white">{step.output}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </motion.section>
  );
}
