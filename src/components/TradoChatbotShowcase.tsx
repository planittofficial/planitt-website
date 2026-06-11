'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Brain,
  Shield,
  TrendingUp,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const features = [
  {
    icon: <Sparkles className="h-4 w-4" />,
    title: 'Explains every signal',
    iconBg: 'bg-purple-600/30 border border-purple-500/40 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]',
  },
  {
    icon: <Shield className="h-4 w-4" />,
    title: 'Risk-aware guidance',
    iconBg: 'bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
  },
  {
    icon: <TrendingUp className="h-4 w-4" />,
    title: 'Multi asset content',
    iconBg: 'bg-blue-600/30 border border-blue-500/40 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.2)]',
  },
];

const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-none border border-white/5 bg-black/20 px-4 py-3.5 w-fit">
    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
);

export default function TradoChatbotShowcase() {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chatContainerRef, { once: true, amount: 0.3 });
  const [chatPhase, setChatPhase] = useState<'idle' | 'user' | 'typing1' | 'msg1' | 'typing2' | 'all'>('idle');

  useEffect(() => {
    if (!isInView) return;

    setChatPhase('user');

    const timer1 = setTimeout(() => {
      setChatPhase('typing1');
    }, 1200);

    const timer2 = setTimeout(() => {
      setChatPhase('msg1');
    }, 2700);

    const timer3 = setTimeout(() => {
      setChatPhase('typing2');
    }, 3900);

    const timer4 = setTimeout(() => {
      setChatPhase('all');
    }, 5200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isInView]);

  const currentMessages = [];
  if (chatPhase !== 'idle') {
    currentMessages.push({
      id: 'user',
      role: 'user',
      text: 'Trado, what should I review before this NIFTY signal?',
    });
  }
  if (chatPhase === 'msg1' || chatPhase === 'typing2' || chatPhase === 'all') {
    currentMessages.push({
      id: 'msg1',
      role: 'bot',
      text: 'Check entry, stop-loss, volatility, and position size before acting.',
    });
  }
  if (chatPhase === 'all') {
    currentMessages.push({
      id: 'msg2',
      role: 'bot',
      text: 'Confidence blends trend strength, liquidity, risk/reward, and analyst validation.',
    });
  }

  const handleReplay = () => {
    setChatPhase('idle');
    setTimeout(() => {
      setChatPhase('user');
      const t1 = setTimeout(() => setChatPhase('typing1'), 1200);
      const t2 = setTimeout(() => setChatPhase('msg1'), 2700);
      const t3 = setTimeout(() => setChatPhase('typing2'), 3900);
      const t4 = setTimeout(() => setChatPhase('all'), 5200);
    }, 200);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* CSS Keyframes for custom orbit and particle animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes trado-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes trado-pulse-glow {
            0%, 100% { opacity: 0.25; transform: scale(0.95); }
            50% { opacity: 0.45; transform: scale(1.05); }
          }
          @keyframes trado-rotate-clockwise {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes trado-rotate-counter {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
          @keyframes trado-particle-1 {
            0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
            50% { opacity: 0.8; }
            100% { transform: translate(-25px, -65px) scale(1.1); opacity: 0; }
          }
          @keyframes trado-particle-2 {
            0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
            50% { opacity: 0.6; }
            100% { transform: translate(35px, -80px) scale(0.9); opacity: 0; }
          }
          @keyframes trado-particle-3 {
            0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
            50% { opacity: 0.7; }
            100% { transform: translate(-10px, -50px) scale(0.7); opacity: 0; }
          }
          
          .trado-animate-float { animation: trado-float 5s ease-in-out infinite; }
          .trado-animate-pulse-glow { animation: trado-pulse-glow 4s ease-in-out infinite; }
          .trado-animate-spin-slow { animation: trado-rotate-clockwise 22s linear infinite; }
          .trado-animate-spin-reverse { animation: trado-rotate-counter 16s linear infinite; }
          .trado-animate-particle-1 { animation: trado-particle-1 6s ease-out infinite; }
          .trado-animate-particle-2 { animation: trado-particle-2 8s ease-out infinite 2s; }
          .trado-animate-particle-3 { animation: trado-particle-3 7s ease-out infinite 4s; }
        `
      }} />

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#070b15]/95 p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-md">
        {/* Background Lights */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(124,92,255,0.22),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.14),transparent_40%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-stretch">
          
          {/* Left Column Layout (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div variants={itemVariants}>
              
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#7C5CFF]/30 bg-[#7C5CFF]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#d4cbff] shadow-[0_0_15px_rgba(124,92,255,0.15)]">
                <img src="/trado-logo.png" alt="Trado" className="h-3.5 w-3.5 object-contain select-none" />
                Trado
              </div>

              {/* Large Bold Headline */}
              <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
                Your AI trading <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">co-pilot</span> inside Planitt.
              </h2>

              {/* Split row: Description and Centerpiece Logo Hero */}
              <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-center">
                
                {/* Description */}
                <div className="md:col-span-6">
                  <p className="text-base leading-relaxed text-slate-300/90 font-medium">
                    Trado helps you understand recommendations, ask follow-up questions, review risk, and move from signal discovery to confident decision-making.
                  </p>
                </div>

                {/* Center Column - Orbiting Centerpiece Logo */}
                <div className="md:col-span-6 flex justify-center py-4">
                  <div className="relative flex items-center justify-center w-[250px] h-[250px]">
                    
                    {/* Glowing background */}
                    <div className="absolute w-[180px] h-[180px] rounded-full bg-gradient-to-tr from-purple-500/20 via-indigo-500/10 to-cyan-500/20 blur-3xl trado-animate-pulse-glow" />

                    {/* Outer orbit path (dashed) */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-purple-500/25 trado-animate-spin-slow">
                      {/* Planet 1 revolving */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-400 border border-purple-300 shadow-[0_0_12px_#7c5cff]" />
                    </div>

                    {/* Inner orbit path (solid) */}
                    <div className="absolute inset-8 rounded-full border border-white/5 trado-animate-spin-reverse">
                      {/* Planet 2 revolving */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 border border-cyan-300 shadow-[0_0_8px_#06b6d4]" />
                    </div>

                    {/* Glowing core overlay */}
                    <div className="absolute inset-16 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.25)_0%,transparent_70%)] animate-pulse" />

                    {/* Main Bot Logo Centerpiece */}
                    <motion.div
                      whileHover={{ scale: 1.06 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                      className="relative z-10 w-[130px] h-[130px] flex items-center justify-center trado-animate-float cursor-pointer"
                    >
                      <div className="absolute inset-0 rounded-full bg-black/30 blur-md scale-95" />
                      <img
                        src="/trado-logo.png"
                        alt="Trado AI Mascot"
                        className="w-full h-full object-contain relative z-10 select-none pointer-events-none drop-shadow-[0_0_15px_rgba(124,92,255,0.4)]"
                      />
                    </motion.div>

                    {/* Particle dust */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-purple-300/80 trado-animate-particle-1" />
                      <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-cyan-300/80 trado-animate-particle-2" />
                      <div className="absolute top-1/2 right-1/3 w-1 h-1 rounded-full bg-white/80 trado-animate-particle-3" />
                    </div>

                  </div>
                </div>

              </div>

              {/* Horizontal Feature Badges */}
              <div className="mt-8 flex flex-wrap gap-3 items-center">
                {features.map((feature, idx) => (
                  <motion.div
                    key={feature.title}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 p-2 pr-4 backdrop-blur shadow-lg transition-all duration-300"
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${feature.iconBg}`}>
                      {feature.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200">{feature.title}</span>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </div>

          {/* Right Column - Chat Widget (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center" ref={chatContainerRef}>
            <motion.div 
              variants={itemVariants}
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            >
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[#7C5CFF]/30 bg-[#7C5CFF]/10 p-1.5 shadow-[0_0_10px_rgba(124,92,255,0.2)]">
                    <img 
                      src="/trado-logo.png" 
                      alt="Trado Head" 
                      className="w-full h-full object-contain select-none" 
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#090D1A] animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">Trado</h3>
                    <p className="text-xs text-slate-400">Planitt AI market assistant</p>
                  </div>
                </div>
                
                {/* Online Indicator Badge */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Online
                </span>
              </div>

              {/* Chat Message area */}
              <div className="mt-5 space-y-3.5 min-h-[200px] flex flex-col justify-end">
                <AnimatePresence initial={false}>
                  {currentMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md ${
                          msg.role === 'user'
                            ? 'rounded-tr-none bg-gradient-to-r from-[#7C5CFF] to-[#5839f5] text-white shadow-[#7C5CFF]/15'
                            : 'rounded-tl-none border border-white/10 bg-black/30 text-slate-200'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}

                  {(chatPhase === 'typing1' || chatPhase === 'typing2') && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <TypingIndicator />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Stats Panel */}
              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {[
                  { label: 'Signal clarity', value: 'High', color: 'text-purple-400' },
                  { label: 'Risk review', value: 'Active', color: 'text-emerald-400' },
                  { label: 'Next action', value: 'Explain', color: 'text-blue-400' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/5 bg-black/40 p-2.5 flex flex-col justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {item.label}
                    </p>
                    <p className={`mt-1.5 text-xs sm:text-sm font-bold ${item.color}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chat Input Field */}
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-2 pl-4 hover:border-white/20 transition-all duration-300">
                <MessageSquare className="h-4 w-4 flex-none text-slate-500" />
                <p className="min-w-0 flex-1 text-sm text-slate-500 select-none font-medium">Ask Trado about this signal...</p>
                <button
                  type="button"
                  onClick={handleReplay}
                  title="Replay chat demonstration"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#7C5CFF] to-cyan-400 text-slate-950 transition duration-300 hover:scale-105 hover:shadow-[0_0_12px_rgba(124,92,255,0.4)]"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {/* Embedded Banner message */}
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-3.5 text-xs leading-normal text-emerald-300/90 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 flex-none text-emerald-400 mt-0.5" />
                <span>Trado can be embedded directly into the Planitt recommendation journey.</span>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
