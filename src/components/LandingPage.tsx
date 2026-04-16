'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowRight,
  BrainCircuit,
  CandlestickChart,
  ChevronLeft,
  ChevronRight,
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

const sectionShell = 'mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20';
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

const liveSignals = [
  { asset: 'BTC', action: 'Buy', confidence: 88, risk: 'Medium' },
  { asset: 'NIFTY', action: 'Buy', confidence: 91, risk: 'Low' },
  { asset: 'RELIANCE', action: 'Hold', confidence: 76, risk: 'High' },
] as const;

const whyTradeExample = {
  asset: 'NIFTY',
  action: 'Buy',
  confidence: 87,
  reasons: [
    {
      title: 'Technical signal',
      detail: 'Breakout above resistance is holding.',
      icon: TrendingUp,
    },
    {
      title: 'Volume',
      detail: 'Participation expanded with the move.',
      icon: Target,
    },
    {
      title: 'Sentiment',
      detail: 'Sector breadth flipped positive.',
      icon: BrainCircuit,
    },
    {
      title: 'Risk',
      detail: 'Invalidation is clearly defined below support.',
      icon: ShieldCheck,
    },
  ],
} as const;

const dashboardMetrics = [
  { label: 'Live signals', value: '128' },
  { label: 'Avg score', value: '82' },
  { label: 'Markets active', value: '5' },
];

const steps = [
  { id: '01', title: 'AI scans markets', icon: <BrainCircuit className="h-5 w-5" /> },
  { id: '02', title: 'Generates signals', icon: <CandlestickChart className="h-5 w-5" /> },
  { id: '03', title: 'You take decisions', icon: <Target className="h-5 w-5" /> },
];

const features = [
  { title: 'Multi-market coverage', description: 'Stocks, Crypto, Forex, F&O.', icon: <Layers3 className="h-5 w-5" /> },
  { title: 'AI explanations', description: 'Every signal comes with a reason.', icon: <BrainCircuit className="h-5 w-5" /> },
  { title: 'Risk management', description: 'Stops and confidence stay visible.', icon: <ShieldCheck className="h-5 w-5" /> },
  { title: 'Real-time insights', description: 'Live signals update as markets move.', icon: <Sparkles className="h-5 w-5" /> },
];

const carouselItems = [
  {
    title: 'Signals Board',
    eyebrow: 'Live setup',
    description: 'Multi-asset signal stream with live scores and entries.',
    accent: 'from-[#7C5CFF]/30 via-transparent to-transparent',
    image: '/screens/screen1.png',
    metricLabel: 'Active signals',
    metricValue: '128',
    statA: 'BTC +2.8%',
    statB: 'NIFTY 91/100',
  },
  {
    title: 'Market Analytics',
    eyebrow: 'Realtime analytics',
    description: 'Grounded visual analytics that feel like the real product.',
    accent: 'from-cyan-300/25 via-transparent to-transparent',
    image: '/screens/screen2.png',
    metricLabel: 'Live P/L',
    metricValue: '+18.4%',
    statA: 'Win rate 74%',
    statB: 'Latency 240ms',
  },
  {
    title: 'Portfolio View',
    eyebrow: 'Allocation',
    description: 'P/L, exposures, and rebalancing in one operating screen.',
    accent: 'from-emerald-300/25 via-transparent to-transparent',
    image: '/screens/screen3.png',
    metricLabel: 'Portfolio',
    metricValue: '$248K',
    statA: 'Equity 44%',
    statB: 'Crypto 28%',
  },
  {
    title: 'AI Insight Feed',
    eyebrow: 'Realtime',
    description: 'Compact explainability layered directly over the app UI.',
    accent: 'from-violet-300/25 via-transparent to-transparent',
    image: '/screens/screen4.png',
    metricLabel: 'AI confidence',
    metricValue: '84%',
    statA: 'Risk-first',
    statB: 'SEBI aligned',
  },
  {
    title: 'Execution Snapshot',
    eyebrow: 'Decision-ready',
    description: 'Clear setups, clean data, and confidence before action.',
    accent: 'from-amber-300/25 via-transparent to-transparent',
    image: '/screens/screen5.png',
    metricLabel: 'Tracked markets',
    metricValue: '5',
    statA: 'Forex active',
    statB: 'F&O mapped',
  },
] as const;

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
  const heroRef = useRef<HTMLElement | null>(null);
  const dashboardRef = useRef<HTMLElement | null>(null);
  const showcaseRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
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
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) {
      return;
    }

    const cardWidth = carouselRef.current.clientWidth * 0.82;
    carouselRef.current.scrollBy({
      left: direction === 'right' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    });
  };

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
          <motion.div style={{ y: heroGlowY }} className={`absolute left-1/2 top-28 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl ${heroGlowClass}`} />
          <div className="absolute right-10 top-24 h-60 w-60 rounded-full bg-cyan-300/10 blur-3xl" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealSection}
            className="relative mx-auto max-w-6xl px-4 pb-14 pt-24 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20 lg:pt-32"
          >
            <motion.div style={{ y: heroTextY }} className="mx-auto max-w-5xl text-center">
              <motion.div variants={revealItem} className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] ${accentSoft}`}>
                <Sparkles className="h-3.5 w-3.5" />
                PLANITT RECOMMENDATION SYSTEM
              </motion.div>

              <motion.div variants={revealItem} className="mt-6">
                <AnimatedText
                  text={'Stop Guessing.\nStart Investing.'}
                  className="mx-auto max-w-5xl text-center text-5xl font-extrabold leading-[0.9] tracking-[-0.065em] text-white sm:text-6xl lg:text-[6.5rem] xl:text-[7rem]"
                />
              </motion.div>

              <motion.div
                variants={revealItem}
                className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-300"
              >
                SEBI Registered Investment Platform
              </motion.div>

              <motion.p variants={revealItem} className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                AI-powered decisions across Stocks, Crypto, Forex &amp; F&amp;O
              </motion.p>

              <motion.div variants={revealItem} className="mt-8 flex flex-wrap justify-center gap-3">
                <motion.a
                  href="#live-signals"
                  whileHover={buttonHover}
                  transition={microTransition}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  Explore Signals
                </motion.a>

                <motion.button
                  type="button"
                  onClick={goToSite}
                  whileHover={buttonHover}
                  transition={microTransition}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7C5CFF] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(124,92,255,0.36)] transition duration-300 hover:shadow-[0_20px_54px_rgba(124,92,255,0.42)]"
                >
                  Continue to Services
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </motion.div>

              <motion.div
                variants={revealItem}
                className="mt-6 inline-flex items-center gap-3 rounded-[20px] border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-left backdrop-blur-xl"
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
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <motion.div variants={revealItem} className="max-w-2xl">
              <p className={sectionHeader}>Live Signals</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">See what PLANITT does.</h2>
            </motion.div>

            <motion.div
              variants={revealItem}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-emerald-300"
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
                  <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${
                    signal.action === 'Buy'
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
                      <CountUp value={signal.confidence} />%
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Risk</p>
                    <p className={`mt-2 text-2xl font-semibold ${
                      signal.risk === 'Low'
                        ? 'text-emerald-300'
                        : signal.risk === 'High'
                          ? 'text-red-300'
                          : 'text-amber-300'
                    }`}>
                      {signal.risk}
                    </p>
                  </div>
                </div>

                <div className="mt-6 h-2 rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${signal.confidence}%` }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      signal.action === 'Buy'
                        ? 'bg-gradient-to-r from-emerald-400 to-emerald-300'
                        : signal.action === 'Sell'
                          ? 'bg-gradient-to-r from-red-400 to-red-300'
                          : 'bg-gradient-to-r from-amber-400 to-amber-300'
                    }`}
                  />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="why-trade"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealSection}
          className={sectionShell}
        >
          <motion.div variants={revealItem} className="max-w-2xl">
            <p className={sectionHeader}>Why This Trade</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Explainable AI, at a glance.</h2>
          </motion.div>

          <motion.div variants={revealSection} className="mt-10 grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
            <motion.div variants={revealItem} className="rounded-[24px] border border-white/10 bg-[#101827]/80 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Example asset</p>
                  <h3 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">{whyTradeExample.asset}</h3>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-right">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-300/80">{whyTradeExample.action}</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{whyTradeExample.confidence}%</p>
                </div>
              </div>

              <p className="mt-8 max-w-sm text-base leading-7 text-slate-300">
                One trade. Clear reasons. Easy to trust.
              </p>
            </motion.div>

            <motion.div variants={revealSection} className="grid gap-3">
              {whyTradeExample.reasons.map((reason) => {
                const Icon = reason.icon;

                return (
                  <motion.div
                    key={reason.title}
                    variants={revealItem}
                    className={`${glassCard} ${softHover} flex items-start gap-4 p-5`}
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-[#7C5CFF]/10 text-[#c9bcff]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-white">{reason.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{reason.detail}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          ref={dashboardRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={revealSection}
          className={sectionShell}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <motion.div variants={revealItem} className="max-w-2xl">
              <p className={sectionHeader}>Dashboard Preview</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Built like a live system.</h2>
            </motion.div>

            <motion.div variants={revealSection} className="grid grid-cols-3 gap-3">
              {dashboardMetrics.map((metric) => (
                <motion.div key={metric.label} variants={revealItem} whileHover={cardHover} transition={microTransition} className={`${glassCard} ${softHover} min-w-[110px] p-4 text-center`}>
                  <p className="text-xs text-slate-400">{metric.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={revealItem}
            style={{ y: dashboardY }}
            className={`${glassCard} relative mt-10 overflow-hidden p-4 sm:p-5`}
          >
            <motion.div
              style={{ y: dashboardGlowY }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,92,255,0.14),transparent_24%),radial-gradient(circle_at_80%_74%,rgba(56,189,248,0.12),transparent_26%)]"
            />

            <div className="relative grid gap-5 lg:grid-cols-[0.96fr_1.04fr]">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
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
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Net portfolio</p>
                  <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
                    $<CountUp value={248} />K
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-300/80">Profit / Loss</p>
                      <p className="mt-1 text-2xl font-semibold text-white">+<CountUp value={18} />.4%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-300/80">Today</p>
                      <p className="mt-1 text-lg font-semibold text-emerald-300">+$12.8K</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  {[
                    ['Equity', '44%'],
                    ['Crypto', '28%'],
                    ['Forex + F&O', '18%'],
                    ['Cash', '10%'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5">
                      <span className="text-sm text-slate-300">{label}</span>
                      <span className="text-sm font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>

                <SignalDashboardCard className="mt-5" />

              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                className="grid gap-4"
              >
                <div className="rounded-[24px] border border-white/10 bg-black/25 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">Market Board</p>
                      <p className="text-xs text-slate-400">Real-time analytics across active markets</p>
                    </div>
                    <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                      Synced
                    </div>
                  </div>

                  <div className="mt-5 rounded-[22px] border border-white/10 bg-[#0B0F19]/80 p-4">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      <span>Price action</span>
                      <span className="text-emerald-300">Bullish bias</span>
                    </div>
                    <div className="relative mt-4 h-44 overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,rgba(124,92,255,0.12),rgba(11,15,25,0.02))]">
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

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
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

                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7C5CFF]/10 text-[#c9bcff]">
                      <CandlestickChart className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Signals List</p>
                      <p className="text-xs text-slate-400">Execution-ready calls</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-2">
                    {[
                      ['BTC', 'Buy', '88'],
                      ['NIFTY', 'Buy', '91'],
                      ['RELIANCE', 'Hold', '76'],
                    ].map(([asset, action, score]) => (
                      <div key={asset} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 py-2.5">
                        <div>
                          <p className="text-sm font-semibold text-white">{asset}</p>
                          <p className="text-[11px] text-slate-500">{action}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Score</p>
                          <p className="text-sm font-semibold text-white">{score}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-cyan-300/15 bg-cyan-300/10 p-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-200/80">AI Insight Box</p>
                  <p className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">Momentum is strongest in index leaders. Keep BTC exposure active and trail stops tighter into close.</p>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                    <p className="text-xs text-slate-300">AI confidence: <span className="font-semibold text-white"><CountUp value={84} />%</span></p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealSection}
          className={sectionShell}
        >
          <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
            <p className={sectionHeader}>How It Works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Three steps.</h2>
          </motion.div>

          <motion.div variants={revealSection} className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                variants={revealItem}
                whileHover={cardHover}
                transition={microTransition}
                className={`${glassCard} ${softHover} flex items-center gap-4 rounded-2xl p-5`}
              >
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-[#7C5CFF]/10 text-[#c9bcff]">
                  {step.icon}
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">{step.id}</p>
                  <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-white">{step.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

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

          <motion.div variants={revealSection} className="mt-8 grid gap-4 lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={revealItem}
                whileHover={cardHover}
                transition={microTransition}
                className={`${glassCard} ${softHover} p-4 sm:p-5`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7C5CFF]/10 text-[#c9bcff]">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.03em]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{feature.description}</p>
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
          <motion.div variants={revealItem} style={{ y: showcaseIntroY }} className="mx-auto max-w-3xl text-center">
            <p className={sectionHeader}>Showcase</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Swipe through the product.</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
              Real screens, real dashboard surfaces, and grounded analytics layered like a live operating system.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
            <motion.div
              variants={revealItem}
              style={{ y: showcaseCardOneY }}
              className={`${glassCard} relative overflow-hidden rounded-[28px] p-4 sm:p-5`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,181,68,0.14),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(124,92,255,0.14),transparent_24%)]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Forecast Dashboard</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">High-conviction market view.</h3>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-right">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Live P/L</p>
                    <p className="mt-1 text-lg font-semibold text-emerald-300">+18.4%</p>
                  </div>
                </div>

                <div className="relative mt-5 overflow-hidden rounded-[24px] border border-white/10 bg-[#0B0F19]">
                  <div className="relative aspect-[16/11.5]">
                    <Image
                      src="/Forcast_Dashboard.png"
                      alt="Planitt forecast dashboard"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    <motion.div
                      animate={{ x: ['-12%', '105%'], opacity: [0, 0.75, 0] }}
                      transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                      className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md"
                    />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    ['Signals', '128'],
                    ['Markets', '5'],
                    ['Latency', '240ms'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
                      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="space-y-5">
              <motion.div
                variants={revealItem}
                style={{ y: showcaseCardTwoY }}
                className={`${glassCard} relative overflow-hidden rounded-[28px] p-4 sm:p-5`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,92,255,0.16),transparent_28%)]" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">App Screens</p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">Scroll the product stack.</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => scrollCarousel('left')}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition duration-300 hover:scale-105 hover:border-[#7C5CFF]/30 hover:bg-white/10"
                        aria-label="Scroll carousel left"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollCarousel('right')}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition duration-300 hover:scale-105 hover:border-[#7C5CFF]/30 hover:bg-white/10"
                        aria-label="Scroll carousel right"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div
                    ref={carouselRef}
                    className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {carouselItems.map((item) => (
                      <motion.div
                        key={item.title}
                        whileHover={{ y: -6, scale: 1.01 }}
                        transition={microTransition}
                        className="group relative min-w-[68%] snap-center rounded-[24px] border border-white/10 bg-[#0B0F19] p-3 sm:min-w-[44%]"
                      >
                        <div className="relative aspect-[9/19] overflow-hidden rounded-[20px] border border-white/10 bg-black">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 60vw, 24vw"
                          />
                          <div className="absolute inset-x-2 top-2 rounded-2xl border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-md">
                            <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">{item.eyebrow}</p>
                            <p className="mt-1 text-xs font-semibold text-white">{item.title}</p>
                          </div>
                          <div className="absolute inset-x-2 bottom-2 rounded-2xl border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-md">
                            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-slate-400">
                              <span>{item.metricLabel}</span>
                              <span className="text-white">{item.metricValue}</span>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-sm font-medium text-white">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={revealItem}
            style={{ y: showcaseCardThreeY }}
            className="mt-5 grid gap-4 sm:grid-cols-2"
          >
            <div className={`${glassCard} rounded-[28px] p-5`}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Trust Layer</p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">SEBI Registered. Research Analyst. Mutual Fund Advisory.</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {['SEBI Registered', 'Research Analyst', 'Mutual Fund Advisory'].map((item) => (
                  <span key={item} className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-xs font-medium text-amber-100">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className={`${glassCard} rounded-[28px] p-5`}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Realtime analytics</p>
              <div className="mt-4 h-20 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-3">
                <svg viewBox="0 0 260 80" className="h-full w-full">
                  <motion.path
                    d="M0 56 C26 52, 48 28, 72 30 C98 32, 120 18, 146 20 C174 22, 194 8, 220 12 C236 14, 248 10, 260 8"
                    fill="none"
                    stroke={isAmberTheme ? '#ffd27a' : '#7C5CFF'}
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                  />
                </svg>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                <span>Win rate 74%</span>
                <span>Risk-first output</span>
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
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <motion.div variants={revealItem} className="max-w-2xl">
              <p className={sectionHeader}>Academy</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Learn through the real app experience.</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                The academy flow is shown directly from the product so users instantly understand the learning side of PLANITT AI.
              </p>
            </motion.div>

            <motion.div variants={revealItem} whileHover={cardHover} transition={microTransition} className={`${glassCard} overflow-hidden rounded-[20px] p-2 sm:p-4`}>
              <MobileShowcase
                src="/Learning.png"
                alt="Planitt academy learning screen"
                className="rounded-[26px]"
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
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div variants={revealItem} className="max-w-2xl">
              <p className={sectionHeader}>AI Chatbot</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Recommendation chatbot, built into the product.</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Users can ask about stocks, crypto, forex, and current setups, then get fast AI-led responses inside the application experience.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Market questions', 'Live prompts', 'Setup guidance'].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={revealItem} whileHover={cardHover} transition={microTransition} className={`${glassCard} overflow-hidden rounded-[30px] p-4 sm:p-5`}>
              <div className="rounded-[26px] border border-white/10 bg-[#11172a]">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7C5CFF]/12 text-[#c9bcff]">
                      <BrainCircuit className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">Trado</p>
                      <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        Live preview
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 px-5 py-5">
                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5 text-lg font-medium leading-9 text-slate-100">
                    Hi, I am Trado. Ask about stocks, crypto, forex, or today&apos;s opportunities.
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5 text-lg font-medium leading-9 text-slate-100">
                    Try prompts like &quot;What is the risk on BTC today?&quot; or &quot;Show buy signals in forex.&quot;
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Suggested prompts</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {['Ask about stocks, crypto, forex', 'What looks strongest today?', 'Show me lower-risk setups'].map((prompt) => (
                        <div key={prompt} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">
                          {prompt}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
            <motion.div variants={revealItem} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
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
                  8605727484
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
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Start from the signal.</h2>
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

        <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[24px] border border-white/10 bg-[#0D1321]/85 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.26em] text-slate-500">Top setup</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">NIFTY Breakout</h2>
                <p className="mt-2 text-sm text-slate-400">AI confidence high. Risk mapped.</p>
              </div>
              <div className="rounded-2xl border border-[#7C5CFF]/20 bg-[#7C5CFF]/10 px-3 py-2 text-right">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#c9bcff]">Confidence</p>
                <p className="text-xl font-semibold text-white">87%</p>
              </div>
            </div>

            <div className="mt-5 h-24 overflow-hidden rounded-[20px] border border-white/10 bg-black/20 p-3">
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

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ['Entry', '24,120'],
                ['Target', '24,480'],
                ['Stop', '23,940'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{value}</p>
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
