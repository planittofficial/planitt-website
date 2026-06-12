'use client';

import Image from 'next/image';
import {
  BrainCircuit,
  CandlestickChart,
  Layers3,
  ShieldCheck,
  Sparkles,
  Target,
  Wallet,
} from 'lucide-react';
import { animate, motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import AnimatedText from './AnimatedText';
import HeroParticles from './HeroParticles';
import TradoChatbotShowcase from './TradoChatbotShowcase';
import TradingAlgorithmsSection from './TradingAlgorithmsSection';
import HowItWorksSection from './HowItWorksSection';
import FaqSection from './FaqSection';
import LearningJourneySection from './LearningJourneySection';
import MarketTicker from './MarketTicker';
import CinematicFooter from './CinematicFooter';

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
const cardHover = { scale: 1.02, boxShadow: '0 20px 58px rgba(124,92,255,0.14), py-3' };
const microTransition = { duration: 0.24, ease: 'easeOut' as const };
const scrollCueTransition = { duration: 2.0, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' as const };

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
  const [accentTheme, setAccentTheme] = useState<'violet' | 'amber'>('violet');
  const [bias, setBias] = useState<'Bullish' | 'Bearish' | 'Neutral'>('Bullish');
  const [confidence, setConfidence] = useState(74);
  const heroRef = useRef<HTMLElement | null>(null);
  const showcaseRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const { scrollYProgress: showcaseScrollProgress } = useScroll({
    target: showcaseRef,
    offset: ['start end', 'end start'],
  });
  const heroBackdropY = useTransform(heroScrollProgress, [0, 1], [0, -24]);
  const heroGridY = useTransform(heroScrollProgress, [0, 1], [0, -14]);
  const heroTextY = useTransform(heroScrollProgress, [0, 1], [0, -34]);
  const heroGlowY = useTransform(heroScrollProgress, [0, 1], [0, 80]);
  const showcaseIntroY = useTransform(showcaseScrollProgress, [0, 1], [24, -12]);
  const showcaseCardOneY = useTransform(showcaseScrollProgress, [0, 1], [34, -34]);
  const showcaseCardTwoY = useTransform(showcaseScrollProgress, [0, 1], [12, -18]);
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

  useEffect(() => {
    const biasOptions: Array<'Bullish' | 'Bearish' | 'Neutral'> = ['Bullish', 'Bearish', 'Neutral'];

    const updateData = () => {
      setBias(biasOptions[Math.floor(Math.random() * biasOptions.length)]);
      setConfidence(Math.floor(Math.random() * (95 - 65 + 1) + 65));
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
          className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[110px_110px] opacity-[0.12]"
        />

        {/* Fixed Market Ticker – stays visible below header while scrolling */}
        <MarketTicker />
        {/* Spacer: header (64px) + ticker (46px) = 110px */}
        <div className="h-[110px]" />

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
            className="relative mx-auto max-w-6xl px-4 pb-36 pt-20 sm:px-6 sm:pb-40 sm:pt-24 lg:px-8 lg:pb-29 lg:pt-32"
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
                  href="https://app.planitt.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={buttonHover}
                  transition={microTransition}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:border-white/20 hover:bg-white/10 sm:min-h-0 sm:px-7"
                >
                  Explore Signals
                </motion.a>
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

            <motion.a
              href="#live-signals"
              variants={revealItem}
              whileHover={{ scale: 1.06 }}
              transition={microTransition}
              aria-label="Scroll to live signals"
              className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center justify-center text-white/85 transition hover:text-white sm:bottom-7 lg:bottom-10"
            >
              <div className="relative flex h-16 w-11 items-start justify-center rounded-full border-2 border-white/195 bg-black/10 pt-2 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                <span className="pointer-events-none absolute top-[9px] text-[7px] font-medium uppercase tracking-[0.16em] text-white/92">
                  SCROLL
                </span>
                <motion.div
                  animate={{ y: [0, 14, 0] }}
                  transition={scrollCueTransition}
                  className="mt-4 h-3.5 w-[5px] rounded-full bg-white/95"
                />
              </div>
            </motion.a>
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

        <HowItWorksSection />



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
              className={`${glassCard} relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl p-2 sm:p-3`}
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
                  <div className="mt-5 min-h-[200px] flex-1 overflow-hidden rounded-3xl border border-white/10 bg-[#0B0F19] sm:min-h-[280px]">
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


        </motion.section>

        <LearningJourneySection />

        <TradingAlgorithmsSection />
        <FaqSection />

        <CinematicFooter />
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



