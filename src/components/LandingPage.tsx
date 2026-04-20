'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowRight,
  BrainCircuit,
  CandlestickChart,
  Layers3,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { animate, motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import AnimatedText from './AnimatedText';
import MobileShowcase from './MobileShowcase';
import HeroParticles from './HeroParticles';
import TradoChatbotShowcase from './TradoChatbotShowcase';

const sectionShell =
  'relative mx-auto w-full max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-8';
const sectionHeader = 'text-[11px] font-medium uppercase tracking-[0.32em] text-slate-500';
const glassCard =
  'rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl transition duration-300 ease-out';
const softHover =
  'hover:-translate-y-1 hover:border-[#7C5CFF]/35 hover:shadow-[0_22px_70px_rgba(124,92,255,0.14)]';

const revealSection: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const buttonHover = { scale: 1.03, filter: 'brightness(1.06)' };
const cardHover = { scale: 1.02, boxShadow: '0 20px 58px rgba(124,92,255,0.14)' };
const microTransition = { duration: 0.24, ease: 'easeOut' as const };

const liveSignals: Array<{
  asset: string;
  action: 'Buy' | 'Sell' | 'Hold';
  confidence: string | number;
  risk: 'Low' | 'Medium' | 'High';
}> = [
    { asset: 'BTC', action: 'Buy', confidence: 'XX', risk: 'Medium' },
    { asset: 'NIFTY', action: 'Buy', confidence: 'XX', risk: 'Low' },
    { asset: 'RELIANCE', action: 'Hold', confidence: 'XX', risk: 'High' },
  ];


const dashboardMetrics = [
  { label: 'Live signals', value: '128' },
  { label: 'Avg score', value: '82' },
  { label: 'Markets active', value: '5' },
];

const steps = [
  {
    id: '01',
    title: 'AI scans markets',
    description: 'PLANITT reads multi-market data, sentiment, and technical pressure in the background.',
    icon: <BrainCircuit className="h-5 w-5" />,
  },
  {
    id: '02',
    title: 'Generates signals',
    description: 'The engine converts market context into confidence-scored, risk-aware opportunities.',
    icon: <CandlestickChart className="h-5 w-5" />,
  },
  {
    id: '03',
    title: 'You take decisions',
    description: 'You get the setup, reasoning, and invalidation so every action starts from clarity.',
    icon: <Target className="h-5 w-5" />,
  },
];

const features = [
  { title: 'Multi-market coverage', description: 'Stocks, Crypto, Forex, F&O.', icon: <Layers3 className="h-5 w-5" /> },
  { title: 'AI explanations', description: 'Every signal comes with a reason.', icon: <BrainCircuit className="h-5 w-5" /> },
  { title: 'Risk management', description: 'Stops and confidence stay visible.', icon: <ShieldCheck className="h-5 w-5" /> },
  { title: 'Real-time insights', description: 'Live signals update as markets move.', icon: <Sparkles className="h-5 w-5" /> },
];

const trustCredentials = [
  {
    eyebrow: 'Trust Marker',
    title: 'SEBI Registered',
    detail: 'Regulated investment platform',
  },
  {
    eyebrow: 'Credential',
    title: 'Research Analyst',
    detail: 'Data-led research framework',
  },
  {
    eyebrow: 'Credential',
    title: 'Mutual Fund Advisory',
    detail: 'Guided allocation support',
  },
] as const;

export default function LandingPage() {
  const router = useRouter();
  const [accentTheme, setAccentTheme] = useState<'violet' | 'amber'>('violet');
  const [bias, setBias] = useState<'Bullish' | 'Bearish' | 'Neutral'>('Bullish');
  const [confidence, setConfidence] = useState(74);
  const [momentumPath, setMomentumPath] = useState('M10 82 C34 78, 50 66, 74 54 C96 43, 118 44, 138 36 C158 29, 180 30, 198 24 C216 18, 234 22, 250 16');
  const heroRef = useRef<HTMLElement | null>(null);
  const dashboardRef = useRef<HTMLElement | null>(null);
  const showcaseRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const { scrollYProgress: dashboardScrollProgress } = useScroll({
    target: dashboardRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: showcaseScrollProgress } = useScroll({
    target: showcaseRef,
    offset: ['start end', 'end start'],
  });
  const heroBackdropY = useTransform(heroScrollProgress, [0, 1], [0, -24]);
  const heroGridY = useTransform(heroScrollProgress, [0, 1], [0, -14]);
  const heroTextY = useTransform(heroScrollProgress, [0, 1], [0, -34]);
  const heroGlowY = useTransform(heroScrollProgress, [0, 1], [0, 80]);
  const dashboardY = useTransform(dashboardScrollProgress, [0, 1], [18, -18]);
  const dashboardGlowY = useTransform(dashboardScrollProgress, [0, 1], [24, -24]);
  const showcaseIntroY = useTransform(showcaseScrollProgress, [0, 1], [24, -12]);
  const showcaseCardOneY = useTransform(showcaseScrollProgress, [0, 1], [34, -34]);
  const showcaseCardTwoY = useTransform(showcaseScrollProgress, [0, 1], [12, -18]);
  const showcaseCardThreeY = useTransform(showcaseScrollProgress, [0, 1], [28, -26]);
  const isAmberTheme = accentTheme === 'amber';
  const accentSoft = isAmberTheme
    ? 'border-[#f5b544]/20 bg-[#f5b544]/10 text-[#f7c86e]'
    : 'border-[#7C5CFF]/20 bg-[#7C5CFF]/10 text-[#c9bcff]';
  const pageGradientClass = isAmberTheme
    ? 'fixed inset-0 -z-10 bg-gradient-to-bl from-[#f97316] via-[#dc2626] to-[#be123c]'
    : 'fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(124,92,255,0.18),transparent_26%),radial-gradient(circle_at_85%_14%,rgba(56,189,248,0.12),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(124,92,255,0.12),transparent_28%)]';
  const heroBackdropClass = isAmberTheme
    ? 'fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.07),transparent_24%),radial-gradient(circle_at_85%_14%,rgba(251,191,36,0.08),transparent_18%),radial-gradient(circle_at_50%_100%,rgba(0,0,0,0.22),transparent_30%)]'
    : 'fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(124,92,255,0.18),transparent_26%),radial-gradient(circle_at_85%_14%,rgba(56,189,248,0.12),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(124,92,255,0.12),transparent_28%)]';
  const heroGlowClass = isAmberTheme ? 'bg-[#f5b544]/16' : 'bg-[#7C5CFF]/16';

  const goToSite = () => router.push('/main');

  useEffect(() => {
    const applyAccentTheme = (value: string | null) => {
      setAccentTheme(value === 'amber' ? 'amber' : 'violet');
    };

    applyAccentTheme(window.localStorage.getItem('landing-accent-theme'));

    const handleAccentChange = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      applyAccentTheme(customEvent.detail);
    };

    window.addEventListener('planitt-landing-accent-change', handleAccentChange);
    return () => window.removeEventListener('planitt-landing-accent-change', handleAccentChange);
  }, []);

  const generateRandomMomentumPath = () => {
    // Generate a random but realistic momentum tape path
    const points = [
      { x: 10, y: 82 },
      { x: 34, y: Math.random() * 20 + 70 },
      { x: 50, y: Math.random() * 25 + 60 },
      { x: 74, y: Math.random() * 30 + 40 },
      { x: 96, y: Math.random() * 15 + 35 },
      { x: 118, y: Math.random() * 20 + 35 },
      { x: 138, y: Math.random() * 25 + 25 },
      { x: 158, y: Math.random() * 15 + 20 },
      { x: 180, y: Math.random() * 18 + 15 },
      { x: 198, y: Math.random() * 12 + 10 },
      { x: 216, y: Math.random() * 10 + 5 },
      { x: 234, y: Math.random() * 15 + 10 },
      { x: 250, y: Math.random() * 8 + 5 },
    ];

    let pathStr = `M${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const curr = points[i];
      const prev = points[i - 1];
      const nextIdx = i + 1;
      const next = nextIdx < points.length ? points[nextIdx] : curr;

      const cp1x = prev.x + (curr.x - prev.x) / 3;
      const cp1y = prev.y + (curr.y - prev.y) / 3;
      const cp2x = curr.x - (next.x - curr.x) / 3;
      const cp2y = curr.y - (next.y - curr.y) / 3;

      pathStr += ` C${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }
    return pathStr;
  };

  useEffect(() => {
    const biasOptions: Array<'Bullish' | 'Bearish' | 'Neutral'> = ['Bullish', 'Bearish', 'Neutral'];

    const updateData = () => {
      setBias(biasOptions[Math.floor(Math.random() * biasOptions.length)]);
      setConfidence(Math.floor(Math.random() * (95 - 65 + 1) + 65));
      setMomentumPath(generateRandomMomentumPath());
    };

    // Generate random interval between 1-2 hours (in milliseconds)
    const getRandomInterval = () => Math.random() * (7200000 - 3600000) + 3600000;

    let timeoutId: NodeJS.Timeout | null = null;
    const intervalId: NodeJS.Timeout | null = null;

    const scheduleNextUpdate = () => {
      const delay = getRandomInterval();
      timeoutId = setTimeout(() => {
        updateData();
        scheduleNextUpdate();
      }, delay);
    };

    scheduleNextUpdate();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <main className={`min-h-screen overflow-x-hidden text-white ${isAmberTheme ? 'bg-[#12070a]' : 'bg-[#0B0F19]'}`}>
        <div className={`fixed inset-0 -z-10 ${isAmberTheme ? 'bg-[#12070a]' : 'bg-[#0B0F19]'}`} />
        <div className={pageGradientClass} />
        <motion.div
          style={{ y: heroBackdropY }}
          className={heroBackdropClass}
        />
        <motion.div
          style={{ y: heroGridY }}
          className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:110px_110px] opacity-[0.12]"
        />

        <section ref={heroRef} className="relative overflow-hidden border-b border-white/10">
          <HeroParticles isAmberTheme={isAmberTheme} />
          <motion.div
            style={{ y: heroGlowY }}
            className={`absolute left-1/2 top-20 h-[min(28rem,92vw)] w-[min(28rem,92vw)] -translate-x-1/2 rounded-full blur-3xl sm:top-28 sm:h-[520px] sm:w-[520px] ${heroGlowClass}`}
          />
          <div className="absolute right-4 top-20 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl md:right-10 md:top-24 md:h-60 md:w-60" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealSection}
            className="relative mx-auto max-w-6xl px-4 pb-12 pt-20 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32"
          >
            <motion.div style={{ y: heroTextY }} className="mx-auto max-w-5xl min-w-0 text-center">
              <motion.div
                variants={revealItem}
                className={`mx-auto inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] sm:px-3.5 sm:text-[11px] sm:tracking-[0.24em] ${accentSoft}`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                PLANITT RECOMMENDATION SYSTEM
              </motion.div>

              <motion.div variants={revealItem} className="mt-6">
                <AnimatedText
                  text={'Stop Guessing,\nStart Investing.'}
                  className="mx-auto max-w-[min(100%,calc(100vw-2rem))] text-balance text-center text-4xl font-extrabold leading-[0.92] tracking-[-0.055em] text-white sm:text-5xl sm:tracking-[-0.065em] md:text-6xl lg:text-[6.5rem] lg:leading-[0.9] xl:text-[7rem]"
                />
              </motion.div>

              <motion.div
                variants={revealItem}
                className="mt-4 inline-flex max-w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300 sm:px-4 sm:text-[11px] sm:tracking-[0.22em]"
              >
                SEBI Registered Investment Platform
              </motion.div>

              <motion.p variants={revealItem} className="mx-auto mt-5 max-w-xl px-1 text-base leading-7 text-slate-300 sm:px-0 sm:text-lg">
                AI-powered decisions across Stocks, Crypto, Forex &amp; F&amp;O
              </motion.p>

              <motion.div variants={revealItem} className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
                <motion.a
                  href="#live-signals"
                  whileHover={buttonHover}
                  transition={microTransition}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:border-white/20 hover:bg-white/10 sm:min-h-0 sm:px-7"
                >
                  Explore Signals
                </motion.a>

                <motion.button
                  type="button"
                  onClick={goToSite}
                  whileHover={buttonHover}
                  transition={microTransition}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#7C5CFF] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(124,92,255,0.36)] transition duration-300 hover:shadow-[0_20px_54px_rgba(124,92,255,0.42)] sm:min-h-0 sm:px-7"
                >
                  Continue to Services
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </motion.div>

              <motion.div
                variants={revealItem}
                className="mt-6 inline-flex max-w-full items-center gap-3 rounded-[20px] border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-left backdrop-blur-xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-300/15 text-amber-200">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200/80">Trust Marker</p>
                  <p className="text-sm font-semibold text-white">SEBI Registered</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={revealSection}
          className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
        >
          <motion.div variants={revealSection} className="grid gap-3 md:grid-cols-3">
            {trustCredentials.map((item) => (
              <motion.div
                key={item.title}
                variants={revealItem}
                whileHover={cardHover}
                transition={microTransition}
                className="rounded-[26px] border border-amber-300/20 bg-[linear-gradient(180deg,rgba(255,214,102,0.08),rgba(255,255,255,0.03))] p-4 backdrop-blur-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-none items-center justify-center rounded-[20px] bg-[#f5b544]/14 text-[#f7c86e]">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#f7c86e]/80">{item.eyebrow}</p>
                    <p className="mt-1 text-xl font-semibold tracking-[-0.03em] text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="live-signals"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={revealSection}
          className={sectionShell}
        >
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
            <motion.div variants={revealItem} className="max-w-2xl min-w-0 py-12">
              <p className={sectionHeader}>Live Signals</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">See what PLANITT does.</h2>
            </motion.div>

            <motion.div
              variants={revealItem}
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-emerald-300"
            >
              <span className="relative flex h-2.5 w-2.5">
                <motion.span
                  animate={{ scale: [1, 2.1, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut' }}
                  className="absolute inline-flex h-full w-full rounded-full bg-emerald-300"
                />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </span>
              Live
            </motion.div>
          </div>

          <motion.div variants={revealSection} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {liveSignals.map((signal) => (
              <motion.article
                key={signal.asset}
                variants={revealItem}
                whileHover={cardHover}
                transition={microTransition}
                className={`${glassCard} ${softHover} overflow-hidden p-5`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Asset</p>
                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">{signal.asset}</h3>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${signal.action === 'Buy'
                    ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
                    : signal.action === 'Sell'
                      ? 'border-red-400/20 bg-red-400/10 text-red-300'
                      : 'border-amber-400/20 bg-amber-400/10 text-amber-300'
                    }`}>
                    {signal.action}
                  </span>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Confidence</p>
                    <p className="mt-2 text-3xl font-semibold text-white">
                      {typeof signal.confidence === 'number' ? (
                        <CountUp value={signal.confidence} />
                      ) : (
                        signal.confidence
                      )}
                      %
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Risk</p>
                    <p className={`mt-2 text-2xl font-semibold ${signal.risk === 'Low'
                      ? 'text-emerald-300'
                      : signal.risk === 'High'
                        ? 'text-red-300'
                        : 'text-amber-300'
                      }`}>
                      {signal.risk}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>
  
        <div id="ai">
          <TradoChatbotShowcase />
        </div>
        
        <motion.section
          ref={dashboardRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={revealSection}
          className={sectionShell}
        >
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
            <motion.div variants={revealItem} className="max-w-2xl min-w-0">
              <p className={sectionHeader}>Dashboard Preview</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Built like a live system.
              </h2>
            </motion.div>

            <motion.div variants={revealSection} className="grid w-full min-w-0 grid-cols-3 gap-2 sm:gap-3">
              {dashboardMetrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  variants={revealItem}
                  whileHover={cardHover}
                  transition={microTransition}
                  className={`${glassCard} ${softHover} min-w-0 p-3 text-center sm:p-4`}
                >
                  <p className="text-[11px] leading-tight text-slate-400 sm:text-xs">{metric.label}</p>
                  <p className="mt-1.5 text-xl font-semibold sm:mt-2 sm:text-2xl">{metric.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* MAIN CONTAINER */}
          <motion.div
            variants={revealItem}
            style={{ y: dashboardY }}
            className={`${glassCard} relative mt-10 overflow-hidden p-4 sm:p-5`}
          >
            {/* BACKGROUND GLOW */}
            <motion.div
              style={{ y: dashboardGlowY }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,92,255,0.14),transparent_24%),radial-gradient(circle_at_80%_74%,rgba(56,189,248,0.12),transparent_26%)]"
            />

            {/* ✅ FIXED GRID LAYOUT */}
            <div className="relative grid gap-5 lg:grid-cols-2 items-start">

              {/* LEFT - PORTFOLIO */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-[24px] border border-white/10 bg-[#101827]/85 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7C5CFF]/10 text-[#c9bcff]">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Portfolio Card</p>
                    <p className="text-xs text-slate-400">Multi-asset capital view</p>
                  </div>
                </div>

                <div className="mt-6 rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                    Net portfolio
                  </p>
                  <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
                    $<CountUp value={248} />K
                  </p>

                  <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-300/80">
                        Profit / Loss
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-white">
                        +<CountUp value={18} />.4%
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-300/80">
                        Today
                      </p>
                      <p className="mt-1 text-lg font-semibold text-emerald-300">
                        +$12.8K
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  {[
                    ['Equity', '44%'],
                    ['Crypto', '28%'],
                    ['Forex', '18%'],
                    ['F&O', '10%'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5"
                    >
                      <span className="text-sm text-slate-300">{label}</span>
                      <span className="text-sm font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT - MARKET BOARD */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
                className="grid gap-4 h-full"
              >
                <div className="h-full rounded-[24px] border border-white/10 bg-black/25 p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">Market Board</p>
                      <p className="text-xs text-slate-400">
                        Real-time analytics across active markets
                      </p>
                    </div>
                    <div className="w-fit shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                      Synced
                    </div>
                  </div>

                  <div className="mt-5 rounded-[22px] border border-white/10 bg-[#0B0F19]/80 p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      <span>Price action</span>
                      <span className="text-emerald-300">Bullish bias</span>
                    </div>
                    <div className="relative mt-4 h-36 min-h-[9rem] overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,rgba(124,92,255,0.12),rgba(11,15,25,0.02))] sm:h-44">
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25" />
                      <svg viewBox="0 0 420 176" className="absolute inset-0 h-full w-full">
                        <motion.path
                          d="M0 134 C28 142, 54 116, 86 112 C118 108, 150 84, 180 88 C214 92, 240 54, 274 56 C304 58, 330 38, 360 40 C386 42, 402 24, 420 16"
                          fill="none"
                          stroke={isAmberTheme ? '#ffd27a' : '#7C5CFF'}
                          strokeWidth="4"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 1.6, ease: 'easeOut' }}
                        />
                        <motion.path
                          d="M0 150 C28 152, 54 126, 86 122 C118 118, 150 96, 180 98 C214 100, 240 66, 274 70 C304 72, 330 50, 360 52 C386 54, 402 34, 420 28 L420 176 L0 176 Z"
                          fill={isAmberTheme ? 'rgba(245,181,68,0.16)' : 'rgba(124,92,255,0.16)'}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 1.1, ease: 'easeOut' }}
                        />
                      </svg>
                      <motion.div
                        animate={{ x: ['-15%', '110%'], opacity: [0, 0.72, 0] }}
                        transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                        className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md"
                      />
                    </div>

                    <div className="mt-4 grid gap-3 p-5 sm:grid-cols-3">
                      {[
                        ['Equity outlook', 84],
                        ['Crypto outlook', 72],
                        ['MF view', 76],
                      ].map(([label, score]) => (
                        <div key={label} className="rounded-[18px] border border-white/10 bg-white/[0.04] p-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-300">{label}</span>
                            <span className="font-semibold text-white">{score}</span>
                          </div>
                          <div className="mt-3 h-2 rounded-full bg-white/10">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${score}%` }}
                              viewport={{ once: true, amount: 0.8 }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              className={`h-full rounded-full ${isAmberTheme ? 'bg-[#ffd27a]' : 'bg-[#7C5CFF]'}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ✅ FULL WIDTH SIGNAL DASHBOARD */}
              <div className="lg:col-span-2">
                <SignalDashboardCard />
              </div>

            </div>
          </motion.div>
        </motion.section>
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
          <div className={`pointer-events-none absolute left-1/2 top-24 h-[220px] w-[420px] -translate-x-1/2 rounded-full blur-3xl ${isAmberTheme ? 'bg-[#f5b544]/12' : 'bg-[#7C5CFF]/12'
            }`} />

          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealSection}
              className="mb-12 text-center"
            >
              <motion.p variants={revealItem} className={sectionHeader}>How It Works</motion.p>
              <motion.h2 variants={revealItem} className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                How PLANITT generates signals
              </motion.h2>
              <motion.p variants={revealItem} className="mt-4 text-base leading-6 text-slate-300 sm:text-lg">
                PLANITT moves from market scanning to explainable recommendations, then hands you the context to act with confidence.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealSection}
              className="grid gap-6 lg:grid-cols-3"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={revealItem}
                  className={`${glassCard} ${softHover} relative overflow-hidden p-6 sm:p-8`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]" />
                  <div className="relative">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-14 w-14 flex-none items-center justify-center rounded-2xl ${isAmberTheme ? 'bg-[#f5b544]/12 text-[#ffd27a]' : 'bg-[#7C5CFF]/10 text-[#c9bcff]'
                        }`}>
                        {step.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">{step.id}</p>
                        <h3 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-white">{step.title}</h3>
                      </div>
                    </div>

                    <p className="mt-6 text-sm leading-6 text-slate-300">{step.description}</p>

                    <div className="mt-6 grid gap-3">
                      {[
                        ['Input', index === 0 ? 'Market data' : index === 1 ? 'AI model' : 'Signal card'],
                        ['Focus', index === 0 ? 'Scanning' : index === 1 ? 'Scoring' : 'Decision'],
                        ['Output', index === 0 ? 'Context' : index === 1 ? 'Setup' : 'Action'],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
                          <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealSection}
          className={sectionShell}
        >
          <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
            <p className={sectionHeader}>Features</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Core features.</h2>
          </motion.div>

          <motion.div variants={revealSection} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={revealItem}
                // whileHover={cardHover}
                transition={microTransition}
                className={`p-4 sm:p-5`}
              >
                <div className="flex h-11 w-11 items-center justify-center align-middle rounded-2xl bg-[#7C5CFF]/10 text-[#c9bcff] mx-auto">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg text-center font-semibold tracking-[-0.03em] mx-auto">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="showcase"
          ref={showcaseRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealSection}
          className={sectionShell}
        >
          <motion.div variants={revealItem} style={{ y: showcaseIntroY }} className="mx-auto max-w-3xl text-center py-15">
            <p className={sectionHeader}>Showcase</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Swipe through the product.</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
              Real screens, real dashboard surfaces, and grounded analytics layered like a live operating system.
            </p>
          </motion.div>

          <div className="mt-10 grid min-w-0 gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
            <motion.div
              variants={revealItem}
              style={{ y: showcaseCardOneY }}
              className={`${glassCard} relative flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] p-2 sm:p-3`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,181,68,0.14),transparent_58%),radial-gradient(circle_at_80%_18%,rgba(124,92,255,0.14),transparent_24%)]" />
              <div className="relative min-w-0">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Forecast Dashboard</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">High-conviction market view.</h3>
                  </div>
                  <div className="w-full shrink-0 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-left sm:w-auto sm:text-right">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Live P/L</p>
                    <p className="mt-1 text-lg font-semibold text-emerald-300">+18.4%</p>
                  </div>
                </div>

                <div className="relative mt-2 min-h-[220px] flex-1 overflow-hidden rounded-[20px] border border-white/10 bg-[#0B0F19] sm:min-h-[360px]">
                  <Image
                    src="/Forcast_Dashboard.jpg"
                    alt="Planitt forecast dashboard"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <div className="space-y-5">
              <motion.div
                variants={revealItem}
                style={{ y: showcaseCardTwoY }}
                className={`${glassCard} relative overflow-hidden rounded-[28px] p-4 sm:p-5 h-full flex flex-col`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,92,255,0.16),transparent_28%)]" />
                <div className="relative min-w-0">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">App Screens</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">Experience the product in action.</h3>
                  </div>
                  <div className="mt-5 min-h-[200px] flex-1 overflow-hidden rounded-[24px] border border-white/10 bg-[#0B0F19] sm:min-h-[280px]">
                    <div className="relative aspect-video h-full min-h-[200px] w-full sm:min-h-[280px]">
                      <video
                        src="/Create_a_premium_202604171446.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={revealItem}
            style={{ y: showcaseCardThreeY }}
            className="mt-5 grid gap-4 lg:grid-cols-2"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(28,16,22,0.96),rgba(17,11,18,0.98))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] lg:col-span-2">
              <div className={`absolute inset-0 ${isAmberTheme ? 'bg-[radial-gradient(circle_at_16%_18%,rgba(255,210,122,0.14),transparent_30%),radial-gradient(circle_at_88%_80%,rgba(251,191,36,0.08),transparent_26%)]' : 'bg-[radial-gradient(circle_at_16%_18%,rgba(124,92,255,0.16),transparent_30%),radial-gradient(circle_at_88%_80%,rgba(56,189,248,0.10),transparent_26%)]'}`} />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />

              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] ${isAmberTheme ? 'border-[#ffd27a]/25 bg-[#ffd27a]/10 text-[#ffe4ad]' : 'border-[#8b7bff]/25 bg-[#8b7bff]/10 text-[#d4ccff]'}`}>
                      <span className={`h-2 w-2 rounded-full ${isAmberTheme ? 'bg-[#ffd27a]' : 'bg-cyan-300'}`} />
                      Realtime analytics
                    </div>
                    <h4 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">High-conviction market view.</h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Bias</p>
                      <motion.p
                        key={bias}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-sm font-semibold text-white"
                      >
                        {bias}
                      </motion.p>
                    </div>
                    <div className={`rounded-2xl border px-3 py-2 ${isAmberTheme ? 'border-[#ffd27a]/20 bg-[#ffd27a]/10' : 'border-emerald-400/20 bg-emerald-400/10'}`}>
                      <p className={`text-[10px] uppercase tracking-[0.18em] ${isAmberTheme ? 'text-[#ffe4ad]/80' : 'text-emerald-300/80'}`}>Confidence</p>
                      <motion.p
                        key={confidence}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-sm font-semibold text-white"
                      >
                        {'XX'}%
                      </motion.p>
                    </div>
                  </div>
                </div>

              <div className="mt-5 overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.16))] p-4">
  
  {/* Header */}
  <div className="mb-3 flex flex-col gap-1 text-[10px] uppercase tracking-[0.24em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
    <span>Momentum tape</span>
    <span className="text-slate-500">Updated 240 ms ago</span>
  </div>

  {/* Chart Container */}
  <div className="relative h-[120px] overflow-hidden rounded-[20px] border border-white/10 bg-[#140f15]/70 px-3 py-1">
    
    {/* Background Glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_60%)]" />

    {/* SVG Chart */}
    <svg viewBox="0 0 260 110" className="relative z-30 h-full w-full">
      
      <defs>
        <linearGradient id="analyticsStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={isAmberTheme ? '#f6ad55' : '#67e8f9'} />
          <stop offset="55%" stopColor={isAmberTheme ? '#ffd27a' : '#8b7bff'} />
          <stop offset="100%" stopColor={isAmberTheme ? '#fde68a' : '#c4b5fd'} />
        </linearGradient>

        <linearGradient id="analyticsFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isAmberTheme ? 'rgba(255,210,122,0.22)' : 'rgba(139,123,255,0.22)'} />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* === MAIN PATH (STARTS FROM OPEN) === */}
      {/*
        IMPORTANT FIX:
        - Start from x = 12 (matches px-3 padding)
        - End slightly before edge for symmetry
      */}
      <motion.path
        d="M12 82 
           C28 78, 48 66, 74 54 
           C96 43, 118 44, 138 36 
           C158 29, 180 30, 198 24 
           C216 18, 234 22, 248 16"
        fill="none"
        stroke="url(#analyticsStroke)"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />

      {/* === AREA FILL === */}
      <motion.path
        d="M12 82 
           C28 78, 48 66, 74 54 
           C96 43, 118 44, 138 36 
           C158 29, 180 30, 198 24 
           C216 18, 234 22, 248 16
           L248 110 L12 110 Z"
        fill="url(#analyticsFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* === GLOW DOTS === */}
      {[74, 138, 198, 248].map((cx, index) => {
        const cyValues = [54, 36, 24, 16];
        return (
          <motion.circle
            key={cx}
            cx={cx}
            cy={cyValues[index]}
            r="3"
            fill={isAmberTheme ? '#ffd27a' : '#8b7bff'}
            animate={{ scale: [1, 2.6, 1], opacity: [0.55, 1, 0.55] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: index * 0.2,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </svg>

    {/* Bottom Labels */}
    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-500">
      <span>Open</span>
      <span>Mid session</span>
      <span>Close bias</span>
    </div>
  </div>
</div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500 text-center">Win rate</p>
                    <p className="mt-2 text-2xl font-semibold text-white text-center">XX%</p>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500 text-center">Output style</p>
                    <p className="mt-2 text-base font-semibold text-white text-center">Risk-first output</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          id="academy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealSection}
          className={sectionShell}
        >
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center py-20">
            <motion.div variants={revealItem} className="max-w-xl">
              <p className={sectionHeader}>Academy</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Learn through the real app experience.</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                The academy flow is shown directly from the product so users instantly understand the learning side of PLANITT AI.
              </p>
            </motion.div>

            <motion.div variants={revealItem} whileHover={cardHover} transition={microTransition} className="min-w-0">
                <Image
                  src="/Learning.png"
                  alt="Planitt academy learning screen"
                  width={1000}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="h-auto w-full max-w-full rounded-[24px] object-contain object-top sm:rounded-[30px]"
                  priority
                />
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealSection}
          className={sectionShell}
        >
          <div className={`${glassCard} overflow-hidden rounded-[30px] p-6 sm:p-8`}>
            <motion.div variants={revealItem} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center py-20">
              <div className="max-w-2xl">
                <p className={sectionHeader}>Trading Algorithms</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">We also build and sell trading algorithms.</h2>
                <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                  For teams and traders who want systematic execution, we offer trading algorithm solutions aligned to strategy, speed, and market workflow.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Execution logic', 'Rule-based and signal-driven trading systems.'],
                  ['Strategy fit', 'Built for multi-market workflows and faster decisions.'],
                  ['Custom queries', 'Talk to us if you want to explore the right model.'],
                  ['Technical support', 'Connect directly for buying or implementation queries.'],
                ].map(([title, detail]) => (
                  <motion.div key={title} variants={revealItem} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-lg font-semibold text-white">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={revealItem} className="mt-6 rounded-[24px] border border-amber-300/20 bg-amber-300/10 px-5 py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-amber-100/80">Technical Contact</p>
                  <p className="mt-2 text-base font-medium text-white">
                    Interested in buying a trading algorithm or have any related queries? Call our technical team.
                  </p>
                </div>
                <a
                  href="tel:8605727484"
                  className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-black/20 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-black/30"
                >
                  <Phone className="h-4 w-4" />
                  +91 8605727484
                </a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={revealSection}
          className="relative overflow-hidden border-t border-white/10 py-14 sm:py-16 lg:py-20"
        >
          <motion.div
            animate={{ opacity: [0.4, 0.68, 0.4], scale: [0.94, 1.04, 0.94] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C5CFF]/16 blur-3xl"
          />

          <motion.div variants={revealItem} className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className={`${glassCard} overflow-hidden px-6 py-9 text-center sm:px-10 sm:py-12`}>
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#c9bcff]">PLANITT AI</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl lg:text-6xl">Start from the signal.</h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">See the product. Move into the platform.</p>
              <p className="mx-auto mt-3 max-w-lg text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                Built with SEBI-compliant advisory standards
              </p>

              <motion.button
                type="button"
                onClick={goToSite}
                whileHover={buttonHover}
                transition={microTransition}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#7C5CFF] px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_48px_rgba(124,92,255,0.34)] transition duration-300 hover:shadow-[0_22px_60px_rgba(124,92,255,0.42)]"
              >
                Continue to Services
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.section>

        <footer className="overflow-hidden border-t border-white/10 bg-white text-black">
          <div className="mx-auto max-w-[1800px] px-3 py-6 sm:px-5 sm:py-8 lg:px-8 lg:py-10">
            <p className="text-center font-black uppercase leading-none tracking-[0.22em] text-[clamp(2.4rem,8vw,7.5rem)] sm:tracking-[0.28em] lg:tracking-[0.34em]">
              PLANITT
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const controls = animate(0, value, {
      duration: 1,
      ease: 'easeOut',
      onUpdate(latest) {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

function SignalDashboardCard({ className = '' }: { className?: string }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      className={`${glassCard} relative overflow-hidden p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(124,92,255,0.18),transparent_28%),radial-gradient(circle_at_84%_72%,rgba(56,189,248,0.14),transparent_26%)]" />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-black/20 px-4 py-3">
          <div>
            <p className="text-sm font-semibold">Signal Dashboard</p>
            <p className="text-xs text-slate-400">Live AI market board</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
            <span className="relative flex h-2 w-2">
              <motion.span
                animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut' }}
                className="absolute inline-flex h-full w-full rounded-full bg-emerald-300"
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            LIVE
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[0.8fr_0.8fr]">
          <div className="rounded-[24px] border border-white/10 bg-[#0D1321]/85 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.26em] text-slate-500">Top setup</p>
                <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] sm:text-2xl">NIFTY Breakout</h2>
                <p className="mt-2 text-sm text-slate-400">AI confidence high. Risk mapped.</p>
              </div>
              <div className="w-full shrink-0 rounded-2xl border border-[#7C5CFF]/20 bg-[#7C5CFF]/10 px-3 py-2 text-left sm:w-auto sm:text-right">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#c9bcff]">Confidence</p>
                <p className="text-xl font-semibold text-white">XX%</p>
              </div>
            </div>

            <div className="mt-5 h-32 overflow-hidden rounded-[20px] border border-white/10 bg-black/20 p-2 sm:p-3">
              <div className="flex h-full items-end gap-2">
                {[28, 46, 40, 68, 55, 78, 72, 96, 88, 110, 102, 122].map((height, index) => (
                  <motion.span
                    key={`${height}-${index}`}
                    animate={{ height: [height * 0.74, height, height * 0.82] }}
                    transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, delay: index * 0.06, ease: 'easeInOut' }}
                    className={`flex-1 rounded-full ${index % 4 === 0 ? 'bg-[#7C5CFF]' : index % 4 === 1 ? 'bg-violet-300' : index % 4 === 2 ? 'bg-cyan-300' : 'bg-emerald-300'}`}
                    style={{ height }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
              {[
                ['Entry', '24,120'],
                ['Target', '24,480'],
                ['Stop', '23,940'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-2 sm:p-3">
                  <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:text-[10px] sm:tracking-[0.2em]">{label}</p>
                  <p className="mt-1 text-xs font-semibold tabular-nums text-white sm:text-sm">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            {[
              ['Signals', '128 live'],
              ['Markets', '4 active'],
              ['Risk', 'Guard on'],
            ].map(([label, value], index) => (
              <motion.div
                key={label}
                animate={{ y: [0, index % 2 === 0 ? -6 : 6, 0] }}
                transition={{ duration: 6 + index, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                className="rounded-[22px] border border-white/10 bg-white/5 p-4"
              >
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-2 text-base font-semibold text-white">{value}</p>
              </motion.div>
            ))}

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
              className="rounded-[22px] border border-cyan-300/15 bg-cyan-300/10 p-4"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">AI Insight</p>
              <p className="mt-2 text-sm leading-6 text-slate-100">Trend, timing, and invalidation are aligned.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
