'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { MousePointer2, Pause, Play, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type AppFlowStep = {
  image: string;
  title: string;
  description: string;
  metric: string;
  action: string;
  hotspot: string;
  cursor: string;
  accent: string;
};

type AppScreenFlowVideoProps = {
  steps?: AppFlowStep[];
};

const defaultSteps: AppFlowStep[] = [
  {
    image: '/screens/screen1.png',
    title: 'Open your market command center',
    description: 'Start with a focused view of portfolio health, active ideas, and cross-asset context.',
    metric: 'Portfolio pulse',
    action: 'Portfolio sync complete',
    hotspot: 'left-[18%] top-[20%]',
    cursor: 'left-[62%] top-[22%]',
    accent: '+12.4%',
  },
  {
    image: '/screens/screen2.png',
    title: 'Review high-conviction signals',
    description: 'Each opportunity is packaged with setup type, confidence, timing, and risk framing.',
    metric: 'Signal score',
    action: 'Signal selected',
    hotspot: 'right-[16%] top-[38%]',
    cursor: 'left-[38%] top-[48%]',
    accent: '82/100',
  },
  {
    image: '/screens/screen3.png',
    title: 'Understand the AI rationale',
    description: 'Get quick reasoning so every call feels explainable instead of random or tip-driven.',
    metric: 'AI insight',
    action: 'AI rationale expanded',
    hotspot: 'left-[20%] bottom-[26%]',
    cursor: 'right-[20%] top-[58%]',
    accent: 'Explainable',
  },
  {
    image: '/screens/screen4.png',
    title: 'Track risk before execution',
    description: 'Review targets, stop-loss, horizon, and protection logic before taking action.',
    metric: 'Risk guard',
    action: 'Risk layer checked',
    hotspot: 'right-[18%] bottom-[20%]',
    cursor: 'left-[46%] bottom-[26%]',
    accent: 'Protected',
  },
  {
    image: '/screens/screen5.png',
    title: 'Move from signal to decision',
    description: 'Complete the flow with a cleaner, faster, more confident investment workflow.',
    metric: 'Decision ready',
    action: 'Decision flow ready',
    hotspot: 'left-[22%] top-[46%]',
    cursor: 'right-[18%] bottom-[34%]',
    accent: 'Ready',
  },
];

const sectionReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

export default function AppScreenFlowVideo({
  steps = defaultSteps,
}: AppScreenFlowVideoProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const activeStep = steps[activeIndex];

  const progressItems = useMemo(() => steps.map((step) => step.title), [steps]);

  useEffect(() => {
    if (!isPlaying || steps.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % steps.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={sectionReveal}
      className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0f19]/80 p-4 backdrop-blur-2xl sm:p-6 lg:p-7"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,92,255,0.24),transparent_30%),radial-gradient(circle_at_82%_72%,rgba(34,211,238,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C5CFF]/10 blur-3xl" />

      <div className="relative z-10 grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div variants={itemReveal}>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7C5CFF]/20 bg-[#7C5CFF]/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#d4cbff]">
              <Sparkles className="h-3.5 w-3.5" />
              Interactive product film
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
              <span className="relative flex h-2 w-2">
                <motion.span
                  animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut' }}
                  className="absolute inline-flex h-full w-full rounded-full bg-emerald-300"
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              </span>
              Live demo
            </div>
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.05]">
            Watch the Planitt app flow in motion.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            A lightweight product walkthrough that shows how a user moves from portfolio context to signal review,
            AI explanation, risk checks, and final decision.
          </p>

          <div className="mt-5 space-y-2">
            {progressItems.map((title, index) => (
              <button
                key={title}
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  setIsPlaying(false);
                }}
                className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border px-3 py-2.5 text-left transition duration-300 ${
                  index === activeIndex
                    ? 'border-[#7C5CFF]/30 bg-[#7C5CFF]/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'
                }`}
              >
                {index === activeIndex && isPlaying ? (
                  <motion.span
                    key={`${index}-progress`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4.2, ease: 'linear' }}
                    className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-[#7C5CFF] via-cyan-300 to-emerald-300"
                  />
                ) : null}
                <span
                  className={`flex h-9 w-9 flex-none items-center justify-center rounded-xl text-xs font-semibold ${
                    index === activeIndex ? 'bg-[#7C5CFF] text-white' : 'bg-white/10 text-slate-300'
                  }`}
                >
                  0{index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white">{title}</span>
                  <span className="mt-0.5 block text-xs text-slate-400">{steps[index].metric}</span>
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsPlaying((current) => !current)}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:scale-105 hover:border-[#7C5CFF]/30 hover:bg-white/15"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? 'Pause flow' : 'Play flow'}
          </button>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ['AI', 'Explain'],
              ['Risk', 'Guard'],
              ['Action', 'Ready'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemReveal}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: 'easeInOut' }}
          className="relative mx-auto w-full max-w-[330px] sm:max-w-[350px] lg:max-w-[365px]"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-[radial-gradient(circle,rgba(124,92,255,0.2),transparent_62%)] blur-2xl" />
          <div className="relative rounded-[2.5rem] border border-white/15 bg-black/60 p-2.5 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
            <div className="mb-2 flex items-center justify-between px-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-400/80" />
                <span className="h-2 w-2 rounded-full bg-amber-300/80" />
                <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">
                {activeStep.metric}
              </span>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-2 px-2">
              {[
                ['Signal', 'Live'],
                ['Risk', 'Checked'],
                ['AI', 'Ready'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-1.5 text-center">
                  <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500">{label}</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-[#0B0F19] p-2.5">
              <div className="relative aspect-[9/15.5] overflow-hidden rounded-[1.55rem] bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.image}
                    initial={{ opacity: 0, x: 34, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -34, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeStep.image}
                      alt={activeStep.title}
                      fill
                      sizes="(max-width: 640px) 82vw, 365px"
                      className="object-cover"
                      priority={activeIndex === 0}
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_28%,rgba(0,0,0,0.18))]" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeStep.title}-hotspot`}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className={`absolute ${activeStep.hotspot}`}
                  >
                    <span className="relative flex h-9 w-9 items-center justify-center">
                      <motion.span
                        animate={{ scale: [0.8, 1.55, 0.8], opacity: [0.42, 0, 0.42] }}
                        transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut' }}
                        className="absolute h-full w-full rounded-full bg-[#7C5CFF]"
                      />
                      <span className="relative h-3 w-3 rounded-full border border-white/70 bg-[#7C5CFF] shadow-[0_0_18px_rgba(124,92,255,0.58)]" />
                    </span>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeStep.title}-cursor`}
                    initial={{ opacity: 0, scale: 0.82 }}
                    animate={{ opacity: 1, scale: [0.92, 1.08, 1] }}
                    exit={{ opacity: 0, scale: 0.82 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`absolute ${activeStep.cursor} rounded-xl border border-white/10 bg-black/35 p-1.5 text-white shadow-[0_12px_28px_rgba(0,0,0,0.28)] backdrop-blur-xl`}
                  >
                    <MousePointer2 className="h-3.5 w-3.5 text-cyan-200/90" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/10 bg-black/45 p-3 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-white">{activeStep.action}</p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-slate-400">Realtime interaction</p>
                    </div>
                    <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                      {activeStep.accent}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative mx-auto mt-3 rounded-3xl border border-white/10 bg-white/[0.07] p-4 text-center backdrop-blur-2xl"
            >
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#d4cbff]">{activeStep.metric}</p>
              <h3 className="mt-1.5 text-base font-semibold text-white">{activeStep.title}</h3>
              <p className="mt-1.5 text-xs leading-5 text-slate-300 sm:text-sm">{activeStep.description}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
