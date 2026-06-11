'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  Shield,
  Zap,
  Activity,
  ArrowRight,
  TrendingUp,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Lock,
  Percent,
} from 'lucide-react';

// Animation variants
const sectionReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// Timeline steps structure
const stepsData = [
  {
    id: 1,
    num: '01',
    title: 'Explore Markets',
    description: 'Track live price action, scan diverse asset classes, and filter by raw technical bias.',
    icon: <Search className="h-5 w-5" />,
    color: '#7C5CFF', // Purple
  },
  {
    id: 2,
    num: '02',
    title: 'Analyze Signals',
    description: 'Let PLANITT AI calculate entry targets, invalidation triggers, and probability scores.',
    icon: <Sparkles className="h-5 w-5" />,
    color: '#3B82F6', // Blue
  },
  {
    id: 3,
    num: '03',
    title: 'Make Decisions',
    description: 'Evaluate automated risk-reward parameters, stop-loss buffers, and confidence weightings.',
    icon: <Shield className="h-5 w-5" />,
    color: '#10B981', // Emerald
  },
  {
    id: 4,
    num: '04',
    title: 'Execute Strategy',
    description: 'Integrate with top brokers to route execution seamlessly with single-tap precision.',
    icon: <Zap className="h-5 w-5" />,
    color: '#F59E0B', // Amber
  },
  {
    id: 5,
    num: '05',
    title: 'Improve Performance',
    description: 'Review trade history logs, analyze strategy drift, and refine your rules over time.',
    icon: <Activity className="h-5 w-5" />,
    color: '#EC4899', // Pink
  },
];

export default function LearningJourneySection() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const cycleTime = 5000; // 5 seconds per step

  // Progress bar logic
  useEffect(() => {
    if (isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    let animationFrameId: number;
    const start = Date.now();
    const currentStepDuration = cycleTime * (1 - progress / 100);

    const updateProgress = () => {
      const elapsed = Date.now() - start;
      const totalElapsed = (progress / 100) * cycleTime + elapsed;
      const newProgress = Math.min((totalElapsed / cycleTime) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        setProgress(0);
        setActiveStep((prev) => (prev === 5 ? 1 : prev + 1));
      } else {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeStep, isHovered]);

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    setProgress(0);
  };

  // Helper to render high-fidelity custom phone screens
  const renderPhoneScreen = () => {
    switch (activeStep) {
      case 1:
        return (
          <motion.div
            key="screen-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="flex h-full flex-col bg-[#080B13] p-4 text-white"
          >
            {/* Watchlist / Market Signals Screen */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7C5CFF]">Market Explorer</span>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-2">
              <span className="text-[10px] text-slate-400">Search assets...</span>
              <Search className="h-3.5 w-3.5 text-slate-400" />
            </div>

            <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {['All', 'Stocks', 'Crypto', 'Forex'].map((tab, i) => (
                <span
                  key={tab}
                  className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold transition ${
                    i === 0 ? 'bg-[#7C5CFF] text-white' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>

            <div className="mt-3 flex flex-col gap-2 overflow-y-auto">
              {[
                { ticker: 'BTC', price: '$68,420', change: '+4.2%', action: 'Strong Buy', isBull: true },
                { ticker: 'NIFTY', price: '22,480', change: '+1.1%', action: 'Buy', isBull: true },
                { ticker: 'RELIANCE', price: '₹2,450', change: '-0.4%', action: 'Hold', isBull: null },
                { ticker: 'EUR/USD', price: '1.0895', change: '+0.15%', action: 'Buy', isBull: true },
              ].map((item) => (
                <div
                  key={item.ticker}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-2.5 hover:border-white/10 transition"
                >
                  <div>
                    <span className="text-xs font-bold block">{item.ticker}</span>
                    <span className="text-[10px] text-slate-400">{item.price}</span>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        item.isBull === true
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                          : item.isBull === false
                          ? 'bg-red-500/10 text-red-300 border border-red-500/20'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}
                    >
                      {item.action}
                    </span>
                    <span
                      className={`text-[10px] font-semibold block mt-0.5 ${
                        item.isBull ? 'text-emerald-400' : item.isBull === false ? 'text-red-400' : 'text-slate-400'
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="screen-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="flex h-full flex-col bg-[#080B13] p-4 text-white"
          >
            {/* AI Analysis Screen */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6]">AI Core Insight</span>
              <Sparkles className="h-4 w-4 text-[#3B82F6] animate-pulse" />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold">BTC / USDT</h4>
                <p className="text-[10px] text-slate-400 font-medium">Predictive Model V4.2</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-400">+4.28%</span>
                <p className="text-[9px] text-slate-500">24h Forecast</p>
              </div>
            </div>

            {/* Sparkline chart */}
            <div className="relative mt-3 h-24 rounded-xl border border-white/5 bg-black/40 overflow-hidden">
              <svg viewBox="0 0 100 40" className="h-full w-full">
                <path
                  d="M0 30 C15 32, 25 10, 45 15 C65 20, 80 5, 100 2"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
                <path
                  d="M0 30 C15 32, 25 10, 45 15 C65 20, 80 5, 100 2 L100 40 L0 40 Z"
                  fill="url(#aiChartGrad)"
                />
                <defs>
                  <linearGradient id="aiChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.25)" />
                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute top-2 left-2 flex items-center gap-1 rounded bg-[#3B82F6]/25 px-1 py-0.5 text-[8px] font-bold text-blue-200">
                Resistance Breakout
              </div>
            </div>

            {/* Gauge meter */}
            <div className="mt-4 flex flex-col items-center">
              <div className="relative flex h-14 w-28 items-end justify-center overflow-hidden">
                <div className="absolute inset-0 rounded-t-full border-[8px] border-white/5" />
                <div className="absolute inset-0 rounded-t-full border-[8px] border-t-[#3B82F6] border-r-[#3B82F6] border-l-transparent border-b-transparent rotate-[45deg]" />
                <div className="relative z-10 text-center pb-1">
                  <span className="text-base font-bold">88%</span>
                  <p className="text-[8px] text-slate-400 font-semibold uppercase tracking-wider">Conviction</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#3B82F6]/20 bg-[#3B82F6]/5 p-2.5">
              <p className="text-[9px] leading-relaxed text-blue-200">
                <strong className="text-white">AI Verdict:</strong> Order flow imbalances indicate strong institution-led momentum. Convergence on 4H MACD supports long setups.
              </p>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="screen-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="flex h-full flex-col bg-[#080B13] p-4 text-white"
          >
            {/* Make Decisions - Risk Insights Screen */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#10B981]">Risk Evaluator</span>
              <Shield className="h-4 w-4 text-[#10B981]" />
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/5 p-2.5">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Risk profile</span>
                <span className="text-xs font-bold text-white">Moderate (Conservative)</span>
              </div>
              <div className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-300 border border-emerald-500/20">
                Optimized
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-2.5">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-white/5 bg-black/40 p-2 text-center">
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest block">Entry Target</span>
                  <span className="text-xs font-bold text-emerald-400">$68,200</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/40 p-2 text-center">
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest block">Stop Loss</span>
                  <span className="text-xs font-bold text-red-400">$67,100</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-white/5 bg-black/40 p-2 text-center">
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest block">Take Profit</span>
                  <span className="text-xs font-bold text-emerald-400">$70,700</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/40 p-2 text-center">
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest block">Risk/Reward Ratio</span>
                  <span className="text-xs font-bold text-white">1 : 2.27</span>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-[10px] font-bold text-emerald-300">Safety Check Passed</span>
              </div>
              <p className="mt-1.5 text-[9px] leading-relaxed text-slate-300">
                Setup matches maximum allocation rules (2.5% account capital). Drawdown limit is protected.
              </p>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="screen-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="flex h-full flex-col bg-[#080B13] p-4 text-white"
          >
            {/* Execute Strategy Screen */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">Trade Routing</span>
              <Zap className="h-4 w-4 text-[#F59E0B]" />
            </div>

            <div className="mt-3 text-center">
              <span className="text-[9px] uppercase tracking-wider text-slate-500">Routing to broker terminal</span>
              <div className="mt-1.5 flex justify-center gap-1.5">
                {['Groww', 'Zerodha', 'Binance'].map((b, i) => (
                  <span
                    key={b}
                    className={`rounded-lg px-2 py-0.5 text-[9px] font-semibold border ${
                      i === 1 ? 'border-orange-500/35 bg-orange-500/10 text-orange-300' : 'border-white/5 bg-white/5 text-slate-400'
                    }`}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/5 bg-black/40 p-4 text-center">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Setup ready</span>
              <span className="text-xl font-bold block mt-1">Buy 0.15 BTC</span>
              <span className="text-[10px] text-slate-500 block">Est: $10,230.00</span>
            </div>

            {/* Glowing fill action button */}
            <motion.div
              className="mt-6 flex flex-col items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 p-[1px] shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                <div className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black/80 py-3 text-xs font-bold text-amber-300 hover:bg-transparent hover:text-white transition duration-300">
                  Tap to Execute Order
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>

            {/* Simulation of a filled order */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-2 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[9px] font-bold text-emerald-300">Order Filled at $68,198</span>
              </div>
              <span className="text-[9px] font-semibold text-slate-400">Zerodha</span>
            </motion.div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="screen-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="flex h-full flex-col bg-[#080B13] p-4 text-white"
          >
            {/* Improve Performance Screen */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#EC4899]">Performance Hub</span>
              <Activity className="h-4 w-4 text-[#EC4899]" />
            </div>

            <div className="mt-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Overall growth</span>
              <div className="flex items-end justify-between mt-1">
                <span className="text-2xl font-bold">+$4,280.50</span>
                <span className="flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded px-1.5 py-0.5">
                  <ArrowUpRight className="h-3 w-3 inline mr-0.5" />
                  +12.4%
                </span>
              </div>
            </div>

            {/* Performance metrics grid */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-white/5 bg-black/40 p-2.5">
                <span className="text-[8px] text-slate-500 uppercase tracking-widest block">Win Rate</span>
                <span className="text-sm font-bold text-white">76.2%</span>
                <div className="mt-1.5 h-1 w-full rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-[76%] rounded-full bg-[#EC4899]" />
                </div>
              </div>
              <div className="rounded-xl border border-white/5 bg-black/40 p-2.5">
                <span className="text-[8px] text-slate-500 uppercase tracking-widest block">Total Trades</span>
                <span className="text-sm font-bold text-white">42</span>
                <p className="text-[8px] text-slate-400 mt-0.5">32 Wins / 10 Losses</p>
              </div>
            </div>

            {/* Strategy analytics feedback loop */}
            <div className="mt-4 rounded-xl border border-white/5 bg-[#EC4899]/5 p-2.5">
              <span className="text-[8px] text-[#EC4899] font-bold uppercase tracking-wider block">AI Refinement Loop</span>
              <p className="mt-1 text-[9px] leading-relaxed text-slate-300">
                Analytics show highest efficiency during early European session. Adjusting scanning weights for EUR pairs.
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionReveal}
      className="relative overflow-hidden border-t border-white/10 bg-[#060913] py-20 sm:py-24 lg:py-28"
    >
      {/* Background glow structures */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[380px] w-[380px] rounded-full bg-[#7C5CFF]/8 blur-[110px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/3 h-[420px] w-[420px] rounded-full bg-blue-500/6 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div variants={itemReveal} className="mb-14 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7C5CFF]/20 bg-[#7C5CFF]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c9bcff]">
            <Sparkles className="h-3.5 w-3.5" />
            Learning Journey
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            How the <span className="bg-gradient-to-r from-[#7C5CFF] via-indigo-300 to-cyan-400 bg-clip-text text-transparent">Learning Journey</span> Works
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            A simple, interactive process designed to help you master market context, interpret signals, and improve your trading decisions.
          </p>
        </motion.div>

        {/* Split Grid */}
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* LEFT SIDE - Journey steps timeline */}
          <div className="lg:col-span-7 flex flex-col gap-4 relative">
            
            {/* Timeline line tracker */}
            <div className="absolute left-[33px] top-4 bottom-4 w-[2px] bg-white/5 pointer-events-none" />

            {stepsData.map((step) => {
              const isActive = activeStep === step.id;

              return (
                <motion.div
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  onMouseEnter={() => {
                    setActiveStep(step.id);
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`group relative flex cursor-pointer gap-5 rounded-[22px] border p-4 sm:p-5 transition-all duration-300 backdrop-blur-md ${
                    isActive
                      ? 'border-[#7C5CFF]/30 bg-white/[0.04] shadow-[0_12px_40px_rgba(124,92,255,0.08)]'
                      : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10'
                  }`}
                  style={{
                    borderColor: isActive ? `${step.color}40` : undefined,
                  }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Step status and active glow lines */}
                  {isActive && (
                    <div
                      className="absolute left-[33px] top-0 bottom-0 w-[2px] pointer-events-none z-10"
                      style={{
                        background: `linear-gradient(to bottom, ${step.color}, ${step.color}20)`,
                      }}
                    />
                  )}

                  {/* Circle number with Icon overlay */}
                  <div
                    className={`relative z-20 flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-xl border text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-white/10 border-white/25 text-white'
                        : 'border-white/5 bg-black/40 text-slate-500'
                    }`}
                    style={{
                      color: isActive ? '#fff' : undefined,
                      borderColor: isActive ? step.color : undefined,
                      boxShadow: isActive ? `0 0 16px ${step.color}25` : undefined,
                    }}
                  >
                    {step.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-base font-bold tracking-tight transition duration-200 ${
                          isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        <span className="text-xs font-semibold mr-2 opacity-50 tracking-wider font-mono">
                          {step.num}
                        </span>
                        {step.title}
                      </h3>
                      {isActive && (
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#7C5CFF]">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-400 leading-normal max-w-lg">
                      {step.description}
                    </p>

                    {/* Step Timer Progress Bar */}
                    {isActive && (
                      <div className="mt-3.5 h-[3px] w-full rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-[16ms] ease-linear"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: step.color,
                            boxShadow: `0 0 8px ${step.color}`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT SIDE - Vertically oriented smartphone mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              className="relative aspect-[9/18.5] w-full max-w-[280px] sm:max-w-[310px] md:max-w-[330px]"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Outer screen background shadow glows */}
              <div className="absolute inset-[-15px] -z-10 rounded-[3.4rem] bg-[#7C5CFF]/15 blur-2xl opacity-80" />
              
              {/* Phone Frame */}
              <div className="relative h-full w-full rounded-[2.8rem] border border-white/20 bg-zinc-950 p-[10px] shadow-[0_24px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(124,92,255,0.15)] ring-1 ring-white/10">
                
                {/* Dynamic notch/island */}
                <div className="absolute left-1/2 top-4 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

                {/* Status Bar */}
                <div className="absolute inset-x-6 top-[22px] z-20 flex items-center justify-between px-2 text-[9px] font-bold text-white/85">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-1.5 border border-white/60 rounded-[2px] relative block">
                      <span className="absolute top-0 bottom-0 left-0 bg-white w-full rounded-[1px]" />
                    </span>
                    <span className="text-[8px]">LTE</span>
                  </div>
                </div>

                {/* Smartphone Screen container */}
                <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-black border border-white/5">
                  
                  {/* Glowing reflections */}
                  <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(130deg,transparent_30%,rgba(255,255,255,0.06)_48%,transparent_60%)] mix-blend-screen opacity-80" />

                  {/* Animated screen shifts */}
                  <div className="relative h-full w-full pt-8 pb-3">
                    <AnimatePresence mode="wait">
                      {renderPhoneScreen()}
                    </AnimatePresence>
                  </div>
                  
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
