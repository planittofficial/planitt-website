'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
import { Phone, Code2, Cpu, Settings2, Headphones } from 'lucide-react';

/* ───────────────────────── animation variants ───────────────────────── */

const sectionReveal: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const featureItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

/* ───────────────────────── code lines for editor ───────────────────────── */

interface CodeToken {
  text: string;
  color: string;
}

type CodeLine = CodeToken[];

const codeLines: CodeLine[] = [
  [
    { text: 'import ', color: '#c084fc' },
    { text: 'numpy ', color: '#e2e8f0' },
    { text: 'as ', color: '#c084fc' },
    { text: 'np', color: '#e2e8f0' },
  ],
  [],
  [
    { text: 'def ', color: '#c084fc' },
    { text: 'macd_strategy', color: '#60a5fa' },
    { text: '(df, f=12, s=26, sig=9):', color: '#e2e8f0' },
  ],
  [
    { text: '    ', color: '' },
    { text: '# Calculate MACD', color: '#6b7280' },
  ],
  [
    { text: '    macd = df[', color: '#e2e8f0' },
    { text: "'close'", color: '#4ade80' },
    { text: '].ewm(span=f,', color: '#e2e8f0' },
  ],
  [
    { text: '        adjust=', color: '#e2e8f0' },
    { text: 'False', color: '#f59e0b' },
    { text: ').mean()', color: '#e2e8f0' },
  ],
  [
    { text: '    df[', color: '#e2e8f0' },
    { text: "'close'", color: '#4ade80' },
    { text: '].ewm(span=s,adjust=', color: '#e2e8f0' },
    { text: 'False', color: '#f59e0b' },
    { text: ')', color: '#e2e8f0' },
  ],
  [],
  [
    { text: '    ', color: '' },
    { text: '# Calculate Histogram', color: '#6b7280' },
  ],
  [
    { text: '    hist = macd - macd.ewm(span=sig,', color: '#e2e8f0' },
  ],
  [
    { text: '        adjust=', color: '#e2e8f0' },
    { text: 'False', color: '#f59e0b' },
    { text: ').mean()', color: '#e2e8f0' },
  ],
  [],
  [
    { text: '    ', color: '' },
    { text: '# Assign signals based on histogram', color: '#6b7280' },
  ],
  [
    { text: '    df[', color: '#e2e8f0' },
    { text: "'signal_src'", color: '#4ade80' },
    { text: '] = \\', color: '#e2e8f0' },
  ],
  [
    { text: '        np.where(hist > ', color: '#e2e8f0' },
    { text: '0', color: '#f59e0b' },
    { text: ',', color: '#e2e8f0' },
  ],
  [
    { text: '            {', color: '#e2e8f0' },
    { text: "'BUY'", color: '#4ade80' },
    { text: ': ', color: '#e2e8f0' },
    { text: "'SELL'", color: '#4ade80' },
    { text: '},', color: '#e2e8f0' },
  ],
  [
    { text: '            default=', color: '#e2e8f0' },
    { text: "'HOLD'", color: '#4ade80' },
    { text: ')', color: '#e2e8f0' },
  ],
];

/* ───────────────────────── feature data ───────────────────────── */

const featureData = [
  {
    icon: <Cpu className="h-5 w-5" />,
    title: 'Execution logic',
    description: 'Rule-based and signal driven trading systems.',
  },
  {
    icon: <Settings2 className="h-5 w-5" />,
    title: 'Strategy fit',
    description: 'Built for multi-market workflows and faster decisions.',
  },
  {
    icon: <Headphones className="h-5 w-5" />,
    title: 'Technical support',
    description: 'Connect directly for buying or implementation queries.',
  },
];

/* ───────────────────────── CSS keyframes (injected once) ───────────────────────── */

const cssAnimations = `
@keyframes ta-orbit-cw { to { transform: rotate(360deg); } }
@keyframes ta-orbit-ccw { to { transform: rotate(-360deg); } }
@keyframes ta-float-1 { 0%,100% { transform: translateY(4px); } 50% { transform: translateY(-2px); } }
@keyframes ta-float-2 { 0%,100% { transform: translateY(2px); } 50% { transform: translateY(-4px); } }
@keyframes ta-float-3 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
@keyframes ta-float-label { 0%,100% { transform: translateY(0); opacity: 0.8; } 50% { transform: translateY(-4px); opacity: 1; } }
@keyframes ta-particle { 0%,100% { transform: translateY(0); opacity: 0.3; } 50% { transform: translateY(-12px); opacity: 0.8; } }
@keyframes ta-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
@keyframes ta-pulse-dot { 0%,100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.3); opacity: 1; } }
`;

/* ───────────────────────── sub-components ───────────────────────── */

/** Animated code editor with typing effect */
function CodeEditorPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= codeLines.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, [isInView]);

  // Pre-compute line visibility to avoid recalculating in render
  const lineStates = useMemo(
    () => codeLines.map((_, i) => i < visibleLines),
    [visibleLines]
  );

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="relative w-full overflow-hidden rounded-2xl border border-[#7C5CFF]/25 bg-[#0d0f18]/95 shadow-[0_0_60px_rgba(124,92,255,0.12),0_0_120px_rgba(124,92,255,0.06)] transition-all duration-400 hover:border-[#7C5CFF]/45 hover:shadow-[0_0_80px_rgba(124,92,255,0.18),0_0_160px_rgba(124,92,255,0.08)]"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] tracking-wider text-slate-500">algo_strategy.py</span>
      </div>

      {/* Code area */}
      <div className="relative p-4 font-mono text-[11px] leading-[1.8] sm:text-[12.5px] sm:leading-[1.85]">
        {/* Line numbers gutter */}
        <div className="absolute left-4 top-4 flex flex-col text-right" aria-hidden="true">
          {codeLines.map((_, i) => (
            <span
              key={i}
              className="text-slate-600 transition-opacity duration-300"
              style={{ opacity: lineStates[i] ? 1 : 0, lineHeight: '1.8' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          ))}
        </div>

        {/* Code content */}
        <div className="ml-8 sm:ml-9">
          {codeLines.map((line, lineIndex) => (
            <div
              key={lineIndex}
              className="whitespace-pre transition-all duration-300 ease-out"
              style={{
                minHeight: '1.8em',
                opacity: lineStates[lineIndex] ? 1 : 0,
                transform: lineStates[lineIndex] ? 'translateX(0)' : 'translateX(8px)',
              }}
            >
              {line.map((token, tokenIndex) => (
                <span key={tokenIndex} style={{ color: token.color }}>
                  {token.text}
                </span>
              ))}
              {/* Blinking cursor on last visible line */}
              {lineIndex === visibleLines - 1 && visibleLines <= codeLines.length && (
                <span
                  className="inline-block h-[14px] w-[2px] translate-y-[2px] bg-[#c084fc]"
                  style={{ animation: 'ta-blink 0.8s steps(1) infinite' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div className="border-t border-white/8 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full bg-emerald-400"
            style={{ animation: 'ta-pulse-dot 2s ease-in-out infinite' }}
          />
          <span className="text-[11px] font-medium tracking-wide text-emerald-400">Backtest ready</span>
        </div>
      </div>
    </motion.div>
  );
}

/** 3D-style animated algorithm illustration — uses only CSS animations */
function AlgorithmIllustration() {
  return (
    <div className="relative flex items-center justify-center" aria-hidden="true">
      {/* Ambient glow */}
      <div className="absolute h-56 w-56 rounded-full bg-[#7C5CFF]/20 blur-[80px] sm:h-72 sm:w-72" />
      <div className="absolute h-36 w-36 rounded-full bg-cyan-400/10 blur-[60px] sm:h-48 sm:w-48" />

      {/* Outer orbit ring — CSS animation */}
      <div
        className="absolute h-52 w-52 rounded-full border border-[#7C5CFF]/20 sm:h-64 sm:w-64"
        style={{ animation: 'ta-orbit-cw 20s linear infinite' }}
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#7C5CFF] shadow-[0_0_10px_rgba(124,92,255,0.6)]" />
        <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
      </div>

      {/* Inner orbit ring — CSS animation */}
      <div
        className="absolute h-36 w-36 rounded-full border border-cyan-400/15 sm:h-44 sm:w-44"
        style={{ animation: 'ta-orbit-ccw 14s linear infinite' }}
      >
        <span className="absolute -right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#c084fc] shadow-[0_0_8px_rgba(192,132,252,0.5)]" />
      </div>

      {/* Floating particles — pure CSS */}
      {[
        { size: 3, x: -80, y: -60, dur: 4, delay: 0 },
        { size: 2, x: 70, y: -50, dur: 3.5, delay: 1.2 },
        { size: 2.5, x: -60, y: 65, dur: 4.5, delay: 0.8 },
        { size: 2, x: 85, y: 55, dur: 3.8, delay: 2 },
      ].map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#c084fc]"
          style={{
            width: p.size,
            height: p.size,
            left: `calc(50% + ${p.x}px)`,
            top: `calc(50% + ${p.y}px)`,
            animation: `ta-particle ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Center layered card stack */}
      <div className="relative flex flex-col items-center">
        {/* Background layer */}
        <div
          className="absolute -bottom-3 h-20 w-28 rounded-xl border border-white/8 bg-[#1a1030]/80 sm:h-24 sm:w-32"
          style={{ animation: 'ta-float-1 5s ease-in-out infinite' }}
        />

        {/* Middle layer */}
        <div
          className="absolute -bottom-1.5 h-20 w-24 rounded-xl border border-[#7C5CFF]/20 bg-[#1e1540]/90 sm:h-24 sm:w-28"
          style={{ animation: 'ta-float-2 4.5s ease-in-out 0.3s infinite' }}
        />

        {/* Main card with icon */}
        <div
          className="relative flex h-20 w-20 items-center justify-center rounded-xl border border-[#7C5CFF]/30 bg-gradient-to-br from-[#7C5CFF]/25 to-[#1a1040] shadow-[0_0_40px_rgba(124,92,255,0.25)] sm:h-24 sm:w-24"
          style={{ animation: 'ta-float-3 4s ease-in-out 0.6s infinite' }}
        >
          <Code2 className="h-8 w-8 text-[#c084fc] drop-shadow-[0_0_12px_rgba(192,132,252,0.6)] sm:h-10 sm:w-10" />

          {/* Corner glow */}
          <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#7C5CFF] blur-sm" />
          <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-cyan-400 blur-sm" />
        </div>

        {/* Bottom floating label */}
        <div
          className="mt-6 rounded-full border border-[#7C5CFF]/20 bg-[#7C5CFF]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9bcff] sm:mt-8"
          style={{ animation: 'ta-float-label 3.5s ease-in-out infinite' }}
        >
          Algorithm Engine
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── main section component ───────────────────────── */

export default function TradingAlgorithmsSection() {
  return (
    <>
      {/* Inject CSS keyframes once */}
      <style dangerouslySetInnerHTML={{ __html: cssAnimations }} />

      <motion.section
        aria-label="Trading Algorithms"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionReveal}
        className="relative mx-auto w-full max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-8"
      >
        {/* Outer glass container */}
        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
          {/* Background glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#7C5CFF]/10 blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-400/8 blur-[80px]" />
            <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C5CFF]/6 blur-[60px]" />
          </div>

          {/* Subtle grid overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            {/* ══════════ 3-column grid ══════════ */}
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 xl:gap-12">
              {/* ─── LEFT COLUMN ─── */}
              <motion.div variants={fadeUp} className="max-w-md">
                {/* Section label */}
                <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-slate-500">
                  Trading Algorithms
                </p>

                {/* Heading */}
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] leading-[1.15] sm:text-4xl lg:text-[2.5rem]">
                  We build and sell{' '}
                  <span className="bg-gradient-to-r from-[#7C5CFF] via-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">
                    trading algorithms.
                  </span>
                </h2>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                  For teams and traders who want systematic execution, we offer trading algorithm solutions aligned to strategy, speed and market workflow.
                </p>

                {/* ─── Feature timeline ─── */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative mt-8 space-y-0"
                >
                  {/* Vertical timeline line */}
                  <div className="absolute bottom-4 left-[17px] top-4 w-px bg-gradient-to-b from-[#7C5CFF]/40 via-[#7C5CFF]/20 to-transparent" aria-hidden="true" />

                  {featureData.map((feat) => (
                    <motion.div
                      key={feat.title}
                      variants={featureItem}
                      className="group relative flex items-start gap-4 rounded-2xl p-3 transition-colors duration-300 hover:bg-white/[0.03]"
                    >
                      {/* Timeline dot */}
                      <div className="relative z-10 mt-0.5 flex h-[34px] w-[34px] flex-none items-center justify-center rounded-xl border border-[#7C5CFF]/25 bg-[#7C5CFF]/10 text-[#c9bcff] transition-all duration-300 group-hover:border-[#7C5CFF]/50 group-hover:bg-[#7C5CFF]/20 group-hover:shadow-[0_0_20px_rgba(124,92,255,0.25)]">
                        {feat.icon}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold tracking-[-0.02em] text-white sm:text-[15px]">
                          {feat.title}
                        </h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-slate-400">
                          {feat.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* ─── CENTER COLUMN — 3D Illustration ─── */}
              <motion.div
                variants={fadeUp}
                className="hidden items-center justify-center self-center lg:flex"
              >
                <div className="relative h-64 w-52 xl:h-72 xl:w-56">
                  <AlgorithmIllustration />
                </div>
              </motion.div>

              {/* ─── RIGHT COLUMN — Code Editor ─── */}
              <motion.div variants={fadeUp} className="flex items-start justify-end">
                <CodeEditorPanel />
              </motion.div>
            </div>

            {/* ══════════ Mobile center illustration (shown on < lg) ══════════ */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-center justify-center lg:hidden"
            >
              <div className="relative h-56 w-48">
                <AlgorithmIllustration />
              </div>
            </motion.div>

            {/* ══════════ CTA BAR ══════════ */}
            <motion.div
              variants={fadeUp}
              className="group relative mt-10 overflow-hidden rounded-2xl border border-[#7C5CFF]/20 bg-[#7C5CFF]/[0.06] backdrop-blur-xl transition-all duration-500 hover:border-[#7C5CFF]/40 hover:bg-[#7C5CFF]/[0.1] hover:shadow-[0_0_40px_rgba(124,92,255,0.12)]"
            >
              {/* Animated border glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#7C5CFF]/20 via-cyan-400/10 to-[#7C5CFF]/20 blur-sm" />
              </div>

              <div className="relative flex flex-col items-start gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9bcff]/70">
                    Technical Contact
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed text-white/90 sm:text-[15px]">
                    Interested in buying a trading algorithm or have any related queries? Call our technical team.
                  </p>
                </div>

                <a
                  href="tel:+918605727484"
                  aria-label="Call technical team at +91 8605727484"
                  className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#7C5CFF]/40 hover:bg-[#7C5CFF]/15 hover:shadow-[0_0_24px_rgba(124,92,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14]"
                >
                  <Phone className="h-4 w-4" />
                  <span>+91 8605727484</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
