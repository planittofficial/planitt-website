'use client';

import React, { useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

/* ------------------------------------------------------------------ */
/*  Star field – deterministic positions via PRNG                      */
/* ------------------------------------------------------------------ */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
}

function generateStars(count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: seededRandom(i * 1.31) * 100,
      y: seededRandom(i * 2.47) * 100,
      size: seededRandom(i * 3.83) * 1.8 + 0.3,
      opacity: seededRandom(i * 4.19) * 0.6 + 0.15,
      delay: seededRandom(i * 5.67) * 6,
    });
  }
  return stars;
}

/* ------------------------------------------------------------------ */
/*  Network path – animated data-flow lines                            */
/* ------------------------------------------------------------------ */
interface NetworkPath {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

const NETWORK_PATHS: NetworkPath[] = [
  { x1: 20, y1: 55, x2: 40, y2: 45, delay: 0 },
  { x1: 40, y1: 45, x2: 58, y2: 38, delay: 0.6 },
  { x1: 58, y1: 38, x2: 72, y2: 48, delay: 1.2 },
  { x1: 15, y1: 48, x2: 35, y2: 52, delay: 1.8 },
  { x1: 35, y1: 52, x2: 55, y2: 42, delay: 2.4 },
  { x1: 62, y1: 52, x2: 78, y2: 55, delay: 3.0 },
  { x1: 48, y1: 60, x2: 65, y2: 50, delay: 3.6 },
];

/* ------------------------------------------------------------------ */
/*  Pulsing city nodes                                                 */
/* ------------------------------------------------------------------ */
interface CityNode {
  x: number;
  y: number;
  size: number;
  delay: number;
}

const CITY_NODES: CityNode[] = [
  { x: 20, y: 55, size: 3.5, delay: 0 },
  { x: 28, y: 48, size: 3, delay: 0.3 },
  { x: 40, y: 45, size: 4, delay: 0.6 },
  { x: 48, y: 60, size: 3, delay: 0.9 },
  { x: 55, y: 42, size: 3.5, delay: 1.2 },
  { x: 58, y: 38, size: 4.5, delay: 1.5 },
  { x: 62, y: 52, size: 3, delay: 1.8 },
  { x: 72, y: 48, size: 3.5, delay: 2.1 },
  { x: 78, y: 55, size: 3, delay: 2.4 },
  { x: 15, y: 48, size: 4, delay: 2.7 },
];

/* ================================================================== */
/*  CinematicFooter                                                    */
/* ================================================================== */
export default function CinematicFooter() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const brandRef = useRef<HTMLDivElement | null>(null);
  const isBrandInView = useInView(brandRef, { once: true, amount: 0.3 });

  const stars = useMemo(() => generateStars(140), []);

  /* Scroll-driven transforms ---------------------------------------- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  // Stage 1 – Stars appear
  const starsOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  // Stage 2 – Earth rises
  const earthY = useTransform(scrollYProgress, [0.08, 0.5], [300, 0]);
  const earthScale = useTransform(scrollYProgress, [0.08, 0.5], [0.85, 1]);
  const earthOpacity = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);

  // Atmosphere glow
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const glowScale = useTransform(scrollYProgress, [0.15, 0.45], [0.6, 1]);

  // Stage 3 – Network
  const networkOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 0.7]);

  // Stage 4 – Brand
  const brandOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const brandY = useTransform(scrollYProgress, [0.5, 0.7], [50, 0]);

  // CTA
  const ctaOpacity = useTransform(scrollYProgress, [0.65, 0.82], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.65, 0.82], [30, 0]);

  return (
    <footer
      ref={sectionRef}
      id="cinematic-footer"
      className="relative overflow-hidden bg-[#020408]"
      style={{ minHeight: '120vh' }}
    >
      {/* ── LAYER 0 : Deep-space gradient ────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] via-[#040710] to-[#010306]" />

      {/* ── LAYER 1 : Star field ─────────────────────────────────── */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ opacity: starsOpacity }}>
        {stars.map((star, i) => (
          <motion.div
            key={`s-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
              scale: [0.8, 1.15, 0.8],
            }}
            transition={{
              duration: 3 + star.delay * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: star.delay,
            }}
          />
        ))}

        {/* Shooting star effect – rare, subtle */}
        <motion.div
          className="absolute h-px w-20 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          style={{ top: '18%', left: '60%', rotate: '-25deg' }}
          animate={{ x: [-100, 400], opacity: [0, 0.7, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 12, ease: 'easeIn' }}
        />
      </motion.div>

      {/* ── LAYER 2 : Atmospheric glow (behind Earth) ────────────── */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          opacity: glowOpacity,
          scale: glowScale,
          width: 'min(180vw, 2000px)',
          height: 'min(55vh, 520px)',
        }}
      >
        {/* Primary blue atmospheric band */}
        <div className="absolute inset-0 rounded-t-[50%] bg-gradient-to-t from-[#0a6abf]/40 via-[#1e90ff]/15 to-transparent blur-3xl" />
        {/* Cyan edge highlight */}
        <div className="absolute inset-x-[10%] bottom-0 h-[50%] rounded-t-[50%] bg-gradient-to-t from-[#22d3ee]/10 via-transparent to-transparent blur-2xl" />
        {/* Warm city-light glow */}
        <div className="absolute inset-x-[20%] bottom-0 h-[40%] rounded-t-[50%] bg-gradient-to-t from-[#f5b544]/6 via-transparent to-transparent blur-3xl" />
        {/* Purple accent */}
        <div className="absolute inset-x-[35%] bottom-0 h-[30%] rounded-t-[50%] bg-gradient-to-t from-[#7C5CFF]/10 via-transparent to-transparent blur-3xl" />
      </motion.div>

      {/* ── LAYER 3 : Earth image ────────────────────────────────── */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          y: earthY,
          scale: earthScale,
          opacity: earthOpacity,
          width: 'min(200vw, 2400px)',
          height: 'min(70vh, 700px)',
        }}
      >
        <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: '50% 50% 0 0' }}>
          <Image
            src="/earth-night.png"
            alt="Earth at night – global market visualization"
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority={false}
          />
          {/* Dark overlay to blend edges – kept light to preserve Earth detail */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020408]/50 via-transparent to-[#020408]/20" />
          {/* Side vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#020408_95%)]" />
        </div>

        {/* Atmospheric rim light – the iconic blue edge */}
        <div
          className="absolute inset-x-0 top-0 h-[10px] sm:h-[14px]"
          style={{ borderRadius: '50% 50% 0 0' }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent opacity-90 blur-[3px]" />
        </div>
        <div
          className="absolute inset-x-[3%] -top-[3px] h-[4px]"
          style={{ borderRadius: '50% 50% 0 0' }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[1px]" />
        </div>

        {/* Outer glow halo */}
        <div
          className="absolute -top-12 inset-x-[-8%] h-20 blur-2xl"
          style={{ borderRadius: '50% 50% 0 0' }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-[#38bdf8]/25 to-transparent" />
        </div>
      </motion.div>

      {/* ── LAYER 4 : Network overlay (on top of Earth) ──────────── */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          opacity: networkOpacity,
          y: earthY,
          scale: earthScale,
          width: 'min(200vw, 2400px)',
          height: 'min(70vh, 700px)',
        }}
      >
        {/* SVG network connections */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="netGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(124,92,255,0)" />
              <stop offset="50%" stopColor="rgba(124,92,255,0.5)" />
              <stop offset="100%" stopColor="rgba(124,92,255,0)" />
            </linearGradient>
          </defs>
          {NETWORK_PATHS.map((path, i) => (
            <motion.line
              key={`np-${i}`}
              x1={path.x1}
              y1={path.y1}
              x2={path.x2}
              y2={path.y2}
              stroke="url(#netGrad)"
              strokeWidth="0.12"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.7, 0] }}
              transition={{
                duration: 3.5,
                delay: path.delay,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: 'easeInOut',
              }}
            />
          ))}
        </svg>

        {/* Pulsing city-light nodes */}
        {CITY_NODES.map((city, i) => (
          <div
            key={`cn-${i}`}
            className="absolute"
            style={{
              left: `${city.x}%`,
              top: `${city.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Outer pulse ring */}
            <motion.div
              className="absolute rounded-full bg-[#fde68a]/20"
              style={{
                width: city.size * 4,
                height: city.size * 4,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [1, 2.5, 1],
                opacity: [0.15, 0.4, 0.15],
              }}
              transition={{
                duration: 3,
                delay: city.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Core dot */}
            <motion.div
              className="rounded-full bg-[#fde68a] shadow-[0_0_6px_rgba(253,230,138,0.6)]"
              style={{ width: city.size, height: city.size }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 2.2,
                delay: city.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        ))}
      </motion.div>

      {/* ── LAYER 5 : Content ────────────────────────────────────── */}
      <div className="relative z-10 flex min-h-[120vh] flex-col items-center justify-end pb-12 sm:pb-16 lg:pb-20">

        {/* Brand reveal */}
        <motion.div
          ref={brandRef}
          className="mb-8 text-center px-4"
          style={{ opacity: brandOpacity, y: brandY }}
        >
          {/* Eyebrow */}
          <motion.p
            className="text-[10px] font-medium uppercase tracking-[0.45em] text-slate-500 sm:text-[11px]"
            initial={{ opacity: 0, y: 8 }}
            animate={isBrandInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            Global Market Intelligence
          </motion.p>

          {/* PLANITT ghost + solid text */}
          <div className="relative mt-5">
            <p className="select-none text-center font-black uppercase leading-none tracking-[0.18em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] text-[clamp(3rem,14vw,10rem)] sm:tracking-[0.24em]">
              PLANITT
            </p>
            <motion.p
              className="-mt-[0.72em] text-center font-black uppercase leading-none tracking-[0.14em] text-white text-[clamp(2.6rem,12vw,9rem)] sm:tracking-[0.2em]"
              initial={{ opacity: 0 }}
              animate={isBrandInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 1 }}
            >
              PLANITT
            </motion.p>
          </div>

          {/* Headline */}
          <motion.p
            className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-slate-300 sm:text-xl lg:text-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={isBrandInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.8, ease: 'easeOut' }}
          >
            Markets never sleep.
            <br />
            <span className="bg-gradient-to-r from-[#7C5CFF] via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Neither does PLANITT.
            </span>
          </motion.p>

          {/* Trust tagline */}
          <motion.p
            className="mx-auto mt-3 max-w-xs text-[10px] font-medium uppercase tracking-[0.28em] text-slate-600 sm:text-[11px]"
            initial={{ opacity: 0 }}
            animate={isBrandInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.85, duration: 0.7 }}
          >
            SEBI-Registered · AI-Powered · 24/7
          </motion.p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 px-4 sm:gap-4"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <motion.button
            type="button"
            onClick={() => router.push('/main')}
            whileHover={{ scale: 1.05, boxShadow: '0 24px 64px rgba(124,92,255,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-2.5 rounded-full bg-[#7C5CFF] px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_48px_rgba(124,92,255,0.35)] transition-all duration-300 hover:shadow-[0_22px_60px_rgba(124,92,255,0.45)]"
          >
            {/* Glow pulse behind button */}
            <span className="absolute inset-0 -z-10 animate-pulse rounded-full bg-[#7C5CFF]/30 blur-xl" />
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>

          <motion.button
            type="button"
            onClick={() => {
              const el = document.getElementById('live-signals');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else router.push('/main');
            }}
            whileHover={{ scale: 1.04, borderColor: 'rgba(124,92,255,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-[0_12px_40px_rgba(124,92,255,0.15)]"
          >
            <Sparkles className="h-4 w-4 text-[#c9bcff]" />
            Explore Signals
          </motion.button>

          <motion.a
            href="mailto:planitt.official@gmail.com"
            whileHover={{ scale: 1.04, borderColor: 'rgba(56,189,248,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-[0_12px_40px_rgba(56,189,248,0.15)]"
          >
            <MessageCircle className="h-4 w-4 text-cyan-300" />
            Talk to an Expert
          </motion.a>
        </motion.div>

        {/* Bottom copyright */}
        <motion.div
          className="mt-14 text-center sm:mt-16"
          style={{ opacity: ctaOpacity }}
        >
          <div className="mx-auto mb-4 h-px w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="text-[10px] tracking-[0.22em] text-slate-600 sm:text-[11px]">
            © {new Date().getFullYear()} PLANITT · All Rights Reserved
          </p>
          <p className="mt-1 text-[9px] tracking-[0.18em] text-slate-700 sm:text-[10px]">
            Plan with signal. Move with conviction.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
