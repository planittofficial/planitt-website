'use client';

import { motion } from 'framer-motion';
import {
  Bot,
  BrainCircuit,
  CheckCircle2,
  MessageSquareText,
  SendHorizonal,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

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

const chatMessages = [
  {
    role: 'user',
    text: 'Trado, what should I review before this NIFTY signal?',
  },
  {
    role: 'bot',
    text: 'Check entry, stop-loss, volatility, and position size before acting.',
  },
  {
    role: 'bot',
    text: 'Confidence blends trend strength, liquidity, risk/reward, and analyst validation.',
  },
];

const tradoFeatures = [
  {
    icon: <BrainCircuit className="h-4 w-4" />,
    title: 'Explains every signal',
    description: 'Turns market calls into plain-language reasoning.',
  },
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: 'Risk-aware guidance',
    description: 'Highlights stop-loss, exposure, and position sizing.',
  },
  {
    icon: <TrendingUp className="h-4 w-4" />,
    title: 'Multi-asset context',
    description: 'Supports stocks, F&O, forex, crypto, and funds.',
  },
];

export default function TradoChatbotShowcase() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={sectionReveal}
      className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0B0F19]/90 p-5 backdrop-blur-2xl sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(124,92,255,0.22),transparent_32%),radial-gradient(circle_at_86%_74%,rgba(34,211,238,0.14),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20" />

        <div className="relative z-10 grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div variants={itemReveal}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7C5CFF]/20 bg-[#7C5CFF]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#d4cbff]">
              <Sparkles className="h-3.5 w-3.5" />
              Meet Trado
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.08]">
              Your AI trading co-pilot inside Planitt.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Trado helps users understand recommendations, ask follow-up questions, review risk, and move from signal
              discovery to confident decision-making.
            </p>

            <motion.div variants={sectionReveal} className="mt-6 grid gap-3">
              {tradoFeatures.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={itemReveal}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 18px 48px rgba(124,92,255,0.16)',
                  }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-3.5 backdrop-blur"
                >
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-[#7C5CFF]/10 text-[#d4cbff]">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{feature.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemReveal}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: 'easeInOut' }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[2.5rem] bg-[radial-gradient(circle,rgba(124,92,255,0.22),transparent_62%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.06] p-4 shadow-[0_22px_64px_rgba(0,0,0,0.36)] backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C5CFF]/15 text-[#d4cbff]">
                    <motion.span
                      animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0, 0.55] }}
                      transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-2xl bg-[#7C5CFF]/30"
                    />
                    <Bot className="relative h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">Trado</p>
                    <p className="mt-0.5 text-xs text-slate-400">Planitt AI market assistant</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <motion.span
                      animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut' }}
                      className="absolute inline-flex h-full w-full rounded-full bg-emerald-300"
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                  </span>
                  Online
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={`${message.role}-${message.text}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                        message.role === 'user'
                          ? 'bg-[#7C5CFF] text-white'
                          : 'border border-white/10 bg-black/25 text-slate-200'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {[
                  ['Signal clarity', 'High'],
                  ['Risk review', 'Active'],
                  ['Next action', 'Explain'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-black/20 p-2.5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-3">
                <MessageSquareText className="h-4 w-4 flex-none text-slate-500" />
                <p className="min-w-0 flex-1 text-sm text-slate-500">Ask Trado about this signal...</p>
                <button
                  type="button"
                  aria-label="Send demo message"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#7C5CFF] to-cyan-300 text-slate-950 transition duration-300 hover:scale-105 hover:brightness-110"
                >
                  <SendHorizonal className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-2xl border border-emerald-400/15 bg-emerald-400/10 p-3 text-sm text-emerald-200">
                <CheckCircle2 className="h-4 w-4 flex-none" />
                Trado can be embedded directly into the Planitt recommendation journey.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
