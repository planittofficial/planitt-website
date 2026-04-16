'use client';

import { animate, motion } from 'framer-motion';
import {
  Bot,
  BrainCircuit,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';

type LandingDashboardPreviewProps = {
  className?: string;
};

const cardMotion = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

const sectionMotion = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardHover = {
  scale: 1.03,
  boxShadow: '0 20px 56px rgba(124,92,255,0.16)',
};

const quickTransition = {
  duration: 0.24,
  ease: 'easeOut' as const,
};

const floatAnimation = {
  y: [0, -10, 0],
};

const floatTransition = {
  duration: 4,
  repeat: Number.POSITIVE_INFINITY,
  ease: 'easeInOut' as const,
};

export default function LandingDashboardPreview({
  className = '',
}: LandingDashboardPreviewProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionMotion}
      className={`mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 ${className}`}
    >
      <motion.div variants={cardMotion} className="mb-8 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#7C5CFF]/20 bg-[#7C5CFF]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-[#d4cbff] backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          Dashboard preview
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
          A premium product snapshot, not a text wall.
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-300">
          A static showcase of the core product UI with clear hierarchy, dark fintech styling, and responsive glass
          cards.
        </p>
      </motion.div>

      <motion.div variants={sectionMotion} className="grid gap-4 lg:grid-cols-12">
        <motion.div
          variants={cardMotion}
          whileHover={cardHover}
          transition={quickTransition}
          className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#7C5CFF]/25 hover:bg-white/[0.07] hover:shadow-[0_14px_34px_rgba(124,92,255,0.1)] sm:p-5 lg:col-span-4"
        >
          <motion.div animate={floatAnimation} transition={floatTransition}>
          <div className="flex items-center justify-between">
            <motion.div animate={floatAnimation} transition={floatTransition} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7C5CFF]/10 text-[#bdaeff]">
              <Wallet className="h-5 w-5" />
            </motion.div>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Diversified
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-400">Portfolio balance</p>
          <p className="mt-2 text-3xl font-semibold text-white">INR 12.48L</p>
          <p className="mt-2 text-sm text-slate-400">Across stocks, forex, crypto, F&amp;O, and mutual funds</p>

          <motion.div variants={sectionMotion} className="mt-5 grid grid-cols-3 gap-2">
            {[
              ['Stocks', '34%'],
              ['Crypto', '18%'],
              ['Mutuals', '12%'],
            ].map(([label, value]) => (
              <motion.div key={label} variants={cardMotion} whileHover={cardHover} transition={quickTransition} className="rounded-2xl border border-white/10 bg-black/10 p-3 transition duration-300 group-hover:border-white/15">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-2 text-sm font-semibold text-white">{value}</p>
              </motion.div>
            ))}
          </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={cardMotion}
          whileHover={cardHover}
          transition={quickTransition}
          className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#7C5CFF]/25 hover:bg-white/[0.07] hover:shadow-[0_14px_34px_rgba(124,92,255,0.1)] sm:p-5 lg:col-span-3"
        >
          <motion.div animate={floatAnimation} transition={{ ...floatTransition, delay: 0.2 }}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-300">Profit / loss</p>
            <motion.div animate={floatAnimation} transition={{ ...floatTransition, delay: 0.3 }} className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7C5CFF]/10 text-[#bdaeff]">
              <TrendingUp className="h-4 w-4" />
            </motion.div>
          </div>

          <p className="mt-5 text-3xl font-semibold text-white">
            +<CountUpValue to={8.42} decimals={2} />%
          </p>
          <p className="mt-2 text-sm text-emerald-300">
            +INR <CountUpValue to={96400} /> this month
          </p>

          <div className="mt-5 space-y-2">
            <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/10 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Winning positions</span>
                <span className="text-sm font-semibold text-white">18</span>
              </div>
            </div>
            <div className="rounded-2xl border border-rose-400/15 bg-rose-400/10 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Protected downside</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-white">
                  <TrendingDown className="h-3.5 w-3.5 text-rose-300" />
                  Low
                </span>
              </div>
            </div>
          </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={cardMotion}
          whileHover={cardHover}
          transition={quickTransition}
          className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#7C5CFF]/25 hover:bg-white/[0.07] hover:shadow-[0_14px_34px_rgba(124,92,255,0.1)] sm:p-5 lg:col-span-5"
        >
          <motion.div animate={floatAnimation} transition={{ ...floatTransition, delay: 0.4 }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Live chart engine</p>
              <p className="mt-1 text-xs text-slate-400">Animated trend view for momentum and signal flow</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              <span className="relative flex h-2.5 w-2.5">
                <motion.span
                  animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut' }}
                  className="absolute inline-flex h-full w-full rounded-full bg-emerald-300"
                />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </span>
              Live
            </span>
          </div>

          <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F19] p-4">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(124,92,255,0.18),transparent_36%)]" />
            <motion.svg
              viewBox="0 0 360 150"
              className="absolute inset-x-4 top-5 z-10 h-[150px] w-[calc(100%-2rem)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="liveChartLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7C5CFF" />
                  <stop offset="52%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
              </defs>
              <motion.path
                d="M6 118 C42 96 60 108 88 78 C116 48 138 90 166 70 C196 48 214 26 248 44 C284 62 304 26 354 18"
                fill="none"
                stroke="url(#liveChartLine)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
                transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.2, ease: 'easeInOut' }}
              />
            </motion.svg>

            <motion.div variants={sectionMotion} className="relative flex items-end justify-between gap-2 pt-8">
              {[32, 54, 40, 68, 58, 86, 72, 94, 88, 108, 98, 126].map((height, index) => (
                <motion.div key={height} variants={cardMotion} className="flex flex-1 flex-col items-center gap-2">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ ...floatTransition, delay: index * 0.08 }}
                    className={`w-full rounded-full ${
                      index % 3 === 0 ? 'bg-[#7C5CFF]/85' : index % 3 === 1 ? 'bg-cyan-400/80' : 'bg-emerald-400/80'
                    }`}
                    style={{ height }}
                  />
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-slate-500">
              <span>1W</span>
              <span>1M</span>
              <span>3M</span>
              <span>1Y</span>
            </div>
          </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={cardMotion}
          whileHover={cardHover}
          transition={quickTransition}
          className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#7C5CFF]/25 hover:bg-white/[0.07] hover:shadow-[0_14px_34px_rgba(124,92,255,0.1)] sm:p-5 lg:col-span-7"
        >
          <motion.div animate={floatAnimation} transition={{ ...floatTransition, delay: 0.6 }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Signals list</p>
              <p className="mt-1 text-xs text-slate-400">Static recommendation queue for product presentation</p>
            </div>
            <span className="rounded-full border border-[#7C5CFF]/20 bg-[#7C5CFF]/10 px-3 py-1 text-xs text-[#d4cbff]">
              6 active
            </span>
          </div>

          <motion.div variants={sectionMotion} className="mt-5 space-y-2">
            {[
              ['NIFTY F&O', 'Breakout watch', '+82 score', 'text-emerald-300'],
              ['BTC / USDT', 'Momentum long', '+78 score', 'text-emerald-300'],
              ['USDINR', 'Range reversal', '+71 score', 'text-cyan-300'],
              ['Large Cap MF', 'Accumulation zone', '+69 score', 'text-sky-300'],
            ].map(([asset, setup, score, color]) => (
              <motion.div
                key={asset}
                variants={cardMotion}
                whileHover={{ scale: 1.02, boxShadow: '0 14px 34px rgba(124,92,255,0.12)' }}
                transition={quickTransition}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/10 p-4 transition duration-300 hover:border-[#7C5CFF]/20 hover:bg-black/20 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{asset}</p>
                  <p className="mt-1 text-xs text-slate-400">{setup}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    Medium risk
                  </span>
                  <span className={`text-sm font-semibold ${color}`}>{score}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={cardMotion}
          whileHover={cardHover}
          transition={quickTransition}
          className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#7C5CFF]/25 hover:bg-white/[0.07] hover:shadow-[0_14px_34px_rgba(124,92,255,0.1)] sm:p-5 lg:col-span-5"
        >
          <motion.div animate={floatAnimation} transition={{ ...floatTransition, delay: 0.8 }}>
          <div className="flex items-center gap-3">
            <motion.div animate={floatAnimation} transition={{ ...floatTransition, delay: 0.6 }} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7C5CFF]/10 text-[#bdaeff]">
              <BrainCircuit className="h-5 w-5" />
            </motion.div>
            <div>
              <p className="text-sm font-medium text-white">AI insight card</p>
              <p className="mt-1 text-xs text-slate-400">Explainable market summary with product-style clarity</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#7C5CFF]/20 bg-[linear-gradient(180deg,rgba(124,92,255,0.14),rgba(34,211,238,0.05),rgba(255,255,255,0.03))] p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#d4cbff]">
              <Bot className="h-3.5 w-3.5" />
              Market brief
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Momentum is building across liquid large-cap names while forex remains range-bound and crypto shows
              selective breakout behavior. The setup favors disciplined entries with defined risk.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                Confidence 84/100
              </span>
              <span className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                Analyst aligned
              </span>
            </div>
          </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function CountUpValue({
  to,
  decimals = 0,
}: {
  to: number;
  decimals?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.8,
      ease: 'easeOut',
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 2.5,
      onUpdate: (latest) => setValue(latest),
    });

    return () => controls.stop();
  }, [decimals, to]);

  return <>{value.toLocaleString('en-IN', { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}</>;
}
