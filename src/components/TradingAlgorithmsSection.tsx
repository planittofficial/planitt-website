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

/** Premium 3D-style animated algorithm engine illustration */
function AlgorithmIllustration() {
  const [isHovered, setIsHovered] = useState(false);

  // Generate particles for vertical data flow passing through layers
  const particles = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      delay: i * 0.7,
      duration: 2.8 + Math.random() * 0.8,
      xOffset: (Math.random() - 0.5) * 20, // Keep them close to the center axis
    }));
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center w-full h-[360px] sm:h-[420px] cursor-pointer"
      aria-hidden="true"
    >
      {/* ── Ambient Background Glows ── */}
      <motion.div
        animate={{
          scale: isHovered ? 1.2 : 1.0,
          opacity: isHovered ? 0.95 : 0.7,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute h-72 w-72 rounded-full bg-[#7C5CFF]/15 blur-[100px] sm:h-96 sm:w-96"
      />
      <motion.div
        animate={{
          scale: isHovered ? 1.25 : 1.0,
          opacity: isHovered ? 0.6 : 0.4,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute h-52 w-52 rounded-full bg-cyan-400/10 blur-[80px] sm:h-64 sm:w-64"
      />

      {/* ── 3D Perspective Wrapper for Orbit Rings ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            rotateX: 65,
            rotateY: 0,
          }}
          animate={{
            scale: isHovered ? 1.03 : 1.0,
          }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Outer Dashed Orbit Ring (Outside main glow ring) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: isHovered ? 15 : 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute h-[330px] w-[330px] sm:h-[390px] sm:w-[390px] rounded-full border border-dashed border-[#7C5CFF]/20 flex items-center justify-center"
          >
            <span className="absolute -top-1 h-2 w-2 rounded-full bg-[#7C5CFF]/60 shadow-[0_0_8px_rgba(124,92,255,0.6)]" />
          </motion.div>

          {/* Main Neon Glow Ring (Solid, occupies ~80% of width) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: isHovered ? 10 : 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute h-[270px] w-[270px] sm:h-[320px] sm:w-[320px] rounded-full border-2 border-[#7C5CFF]/40 bg-[#7C5CFF]/2 shadow-[0_0_30px_rgba(124,92,255,0.25)] flex items-center justify-center"
          >
            {/* Active glowing nodes on main ring */}
            <span className="absolute -top-1.5 h-3.5 w-3.5 rounded-full bg-[#7C5CFF] shadow-[0_0_18px_rgba(124,92,255,1)]" />
            <span className="absolute -bottom-1.5 h-3 w-3 rounded-full bg-[#22d3ee] shadow-[0_0_15px_rgba(34,211,238,0.9)]" />
          </motion.div>

          {/* Inner Dashed Orbit Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: isHovered ? 7 : 14,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute h-[190px] w-[190px] sm:h-[220px] sm:w-[220px] rounded-full border border-dashed border-cyan-400/20"
          >
            <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Central Stack & Vertical Lines ── */}
      <div className="relative flex items-center justify-center w-[160px] sm:w-[200px] h-full">
        {/* Central Vertical Connector Beams */}
        <div className="absolute h-[260px] w-[1.5px] bg-gradient-to-b from-transparent via-[#7C5CFF]/40 to-transparent pointer-events-none" />
        {/* Off-center guide rails */}
        <div className="absolute h-[220px] w-[1px] -translate-x-[40px] bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent pointer-events-none" />
        <div className="absolute h-[220px] w-[1px] translate-x-[40px] bg-gradient-to-b from-transparent via-[#c084fc]/15 to-transparent pointer-events-none" />

        {/* ── Vertical Data Flow Particles (Entering bottom, rising, emerging top) ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: 130, opacity: 0, scale: 0.6 }}
              animate={{
                y: [-120, -220],
                opacity: [0, 1, 1, 0],
                scale: [0.6, 1.2, 1.2, 0.6],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
              style={{
                x: p.xOffset,
                zIndex: 15,
              }}
              className="absolute h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,1)]"
            />
          ))}
        </div>

        {/* ── 3. TOP LAYER: Signal Layer (Highest, Brightest Glass) ── */}
        <motion.div
          animate={{
            y: isHovered ? -95 : -60,
            scale: isHovered ? 1.05 : 1.0,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute z-30"
        >
          {/* Isometric Transform wrapper */}
          <div
            style={{ transform: 'rotateX(60deg) rotateZ(-45deg)' }}
            className="relative h-28 w-28 sm:h-34 sm:w-34 rounded-2xl border-2 border-[#7C5CFF]/70 bg-gradient-to-br from-[#7C5CFF]/35 via-[#22d3ee]/20 to-[#0a0d14]/90 backdrop-blur-lg shadow-[0_25px_60px_rgba(124,92,255,0.45)] flex items-center justify-center"
          >
            {/* Center code symbol with intense glow */}
            <div className="transform rotateZ(45deg) flex items-center justify-center">
              <Code2 className="h-9 w-9 sm:h-11 sm:w-11 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
            </div>

            {/* Glowing Corner Dots */}
            <span className="absolute top-1.5 left-1.5 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
            <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full bg-[#7C5CFF] shadow-[0_0_10px_rgba(124,92,255,1)]" />
            {/* Inner rim glow */}
            <div className="absolute inset-px border border-white/10 rounded-2xl pointer-events-none" />
          </div>
          {/* Depth shadow below top layer */}
          <div className="absolute inset-0 rounded-2xl bg-[#7C5CFF]/15 blur-md -z-10 translate-y-6 scale-90" />
        </motion.div>

        {/* ── 2. MIDDLE LAYER: Processing Layer (Semi-transparent) ── */}
        <motion.div
          animate={{
            y: isHovered ? 5 : 0,
            scale: isHovered ? 1.02 : 1.0,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute z-20"
        >
          {/* Isometric Transform wrapper */}
          <div
            style={{ transform: 'rotateX(60deg) rotateZ(-45deg)' }}
            className="relative h-28 w-28 sm:h-34 sm:w-34 rounded-2xl border border-[#7C5CFF]/35 bg-gradient-to-br from-[#7C5CFF]/15 to-[#0b0c16]/95 backdrop-blur-md shadow-[0_15px_35px_rgba(124,92,255,0.15)] flex items-center justify-center"
          >
            {/* Central holographic design line/pulse */}
            <div className="absolute w-[80%] h-[1.5px] bg-gradient-to-r from-transparent via-[#7C5CFF]/45 to-transparent rotate-45" />
            <div className="absolute w-[80%] h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent -rotate-45" />
            <span className="h-3.5 w-3.5 rounded-full bg-cyan-400/40 blur-xs" />
          </div>
          {/* Depth shadow below middle layer */}
          <div className="absolute inset-0 rounded-2xl bg-black/40 blur-sm -z-10 translate-y-6 scale-95" />
        </motion.div>

        {/* ── 1. BOTTOM LAYER: Base Foundation Layer (Solid Dark) ── */}
        <motion.div
          animate={{
            y: isHovered ? 95 : 60,
            scale: isHovered ? 0.98 : 1.0,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute z-10"
        >
          {/* Isometric Transform wrapper */}
          <div
            style={{ transform: 'rotateX(60deg) rotateZ(-45deg)' }}
            className="relative h-28 w-28 sm:h-34 sm:w-34 rounded-2xl border border-white/10 bg-[#070911] shadow-[0_20px_45px_rgba(0,0,0,0.75)] flex items-center justify-center overflow-hidden"
          >
            {/* Tech grid texture */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:8px_8px]" />
            {/* Base glowing core */}
            <span className="h-5 w-5 rounded-full bg-[#7C5CFF]/45 blur-xs animate-pulse" />
          </div>
          {/* Deep shadow under bottom base */}
          <div className="absolute inset-x-2 bottom-0 h-10 bg-[#7C5CFF]/20 blur-2xl -z-10 translate-y-8" />
        </motion.div>
      </div>

      {/* Floating Engine Label */}
      <motion.div
        animate={{
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-2 rounded-full border border-[#7C5CFF]/20 bg-[#7C5CFF]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9bcff]"
      >
        Algorithm Engine
      </motion.div>
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
