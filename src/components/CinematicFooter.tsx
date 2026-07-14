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
      size: seededRandom(i * 3.83) * 1.5 + 0.4,
      opacity: seededRandom(i * 4.19) * 0.5 + 0.15,
      delay: seededRandom(i * 5.67) * 6,
    });
  }
  return stars;
}

/* ------------------------------------------------------------------ */
/*  City Nodes & Data Routes definition                               */
/* ------------------------------------------------------------------ */
interface CityNode {
  name: string;
  market: string;
  x: number; // percentage of container width
  y: number; // percentage of container height
  pulseDelay: number;
  lineHeight: string; // dashed line height for staggered layout
}

// Compressed coordinates (36% to 64%) to ensure all 5 cities are visible on standard viewports
const CITIES: CityNode[] = [
  { name: 'New York', market: 'NYSE · ACTIVE', x: 36, y: 33, pulseDelay: 0, lineHeight: 'h-6' },
  { name: 'London', market: 'LSE · ACTIVE', x: 43, y: 28, pulseDelay: 0.4, lineHeight: 'h-10' },
  { name: 'Mumbai', market: 'NSE · ACTIVE', x: 50, y: 26, pulseDelay: 0.8, lineHeight: 'h-6' },
  { name: 'Singapore', market: 'SGX · ACTIVE', x: 57, y: 28, pulseDelay: 1.2, lineHeight: 'h-10' },
  { name: 'Hong Kong', market: 'HKEX · ACTIVE', x: 64, y: 33, pulseDelay: 1.6, lineHeight: 'h-6' },
];

const ROUTES = [
  { id: 'ny-london', d: 'M 36 33 Q 39.5 25 43 28', color: '#22d3ee', duration: '4.5s', delay: '0s' },
  { id: 'london-mumbai', d: 'M 43 28 Q 46.5 22 50 26', color: '#7C5CFF', duration: '4s', delay: '1s' },
  { id: 'mumbai-singapore', d: 'M 50 26 Q 53.5 22 57 28', color: '#f5b544', duration: '3.8s', delay: '0.5s' },
  { id: 'singapore-hk', d: 'M 57 28 Q 60.5 25 64 33', color: '#22d3ee', duration: '3.5s', delay: '1.8s' },
  { id: 'hk-ny', d: 'M 64 33 Q 50 12 36 33', color: '#7C5CFF', duration: '7s', delay: '0.8s' },
];

/* ================================================================== */
/*  CinematicFooter                                                    */
/* ================================================================== */
export default function CinematicFooter() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const brandRef = useRef<HTMLDivElement | null>(null);
  const isBrandInView = useInView(brandRef, { once: true, amount: 0.15 });

  const stars = useMemo(() => generateStars(130), []);

  /* Scroll-driven transforms ---------------------------------------- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  // Layer 1 – Star field Parallax (deepest background layer)
  const starsY = useTransform(scrollYProgress, [0, 1], [-60, 30]);
  const starsOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  // Layer 2 – Nebula Parallax
  const nebulaY = useTransform(scrollYProgress, [0, 1], [-100, 50]);
  const nebulaOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 0.95]);

  // Layer 3 – Atmospheric Glow Parallax (behind Earth)
  const glowY = useTransform(scrollYProgress, [0.08, 0.95], [380, 5]);
  const glowScale = useTransform(scrollYProgress, [0.08, 0.95], [0.88, 1.08]);
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);

  // Layer 4 – Earth Horizon Parallax (emerging dynamically)
  const earthY = useTransform(scrollYProgress, [0.08, 0.95], [350, 0]);
  const earthScale = useTransform(scrollYProgress, [0.08, 0.95], [0.85, 1.05]);
  const earthOpacity = useTransform(scrollYProgress, [0.08, 0.25], [0, 1]);

  // Layer 5 – Branding Reveal Parallax (delayed to appear only after Earth has emerged)
  const brandOpacity = useTransform(scrollYProgress, [0.65, 0.95], [0, 1]);
  const brandY = useTransform(scrollYProgress, [0.65, 0.95], [60, 0]);

  const ctaOpacity = useTransform(scrollYProgress, [0.75, 0.98], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.75, 0.98], [30, 0]);

  return (
    <footer
      ref={sectionRef}
      id="cinematic-footer"
      className="relative overflow-hidden bg-[#020408]"
      style={{ minHeight: '140vh' }}
    >
      {/* ── Layer 0 : Deep-space background ────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080b12] via-[#03050a] to-[#010204]" />

      {/* ── Layer 1 : Star field ─────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: starsY, opacity: starsOpacity }}
      >
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

        {/* Shooting star effect */}
        <motion.div
          className="absolute h-px w-24 bg-gradient-to-r from-transparent via-white/75 to-transparent"
          style={{ top: '15%', left: '55%', rotate: '-22deg' }}
          animate={{ x: [-100, 500], opacity: [0, 0.8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 14, ease: 'easeIn' }}
        />
      </motion.div>

      {/* ── Layer 2 : Nebula background clouds ─────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen"
        style={{ y: nebulaY, opacity: nebulaOpacity }}
      >
        {/* Deep blue/purple cloud left */}
        <motion.div
          className="absolute -left-1/4 top-1/4 h-[90vh] w-[90vw] rounded-full bg-gradient-to-br from-[#7C5CFF]/12 to-[#3b82f6]/4 blur-[130px]"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Cyan cloud right */}
        <motion.div
          className="absolute -right-1/4 top-1/3 h-[85vh] w-[85vw] rounded-full bg-gradient-to-bl from-[#06b6d4]/8 to-transparent blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2.5,
          }}
        />
        {/* Magenta highlight center-left */}
        <motion.div
          className="absolute left-[25%] top-[10%] h-[65vh] w-[65vw] rounded-full bg-gradient-to-tr from-[#ec4899]/6 to-transparent blur-[110px]"
          animate={{
            scale: [1, 1.1, 1],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </motion.div>

      {/* ── Layer 3 : Atmospheric glow (behind Earth) ────────────── */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          y: glowY,
          scale: glowScale,
          opacity: glowOpacity,
          width: 'min(300vw, 3600px)',
          height: 'min(65vh, 650px)',
        }}
      >
        {/* Primary blue atmospheric band */}
        <div className="absolute inset-0 rounded-t-[50%] bg-gradient-to-t from-[#0a6abf]/45 via-[#1e90ff]/18 to-transparent blur-[80px]" />
        {/* Cyan edge highlight */}
        <div className="absolute inset-x-[8%] bottom-0 h-[60%] rounded-t-[50%] bg-gradient-to-t from-[#22d3ee]/14 via-transparent to-transparent blur-[60px]" />
        {/* Warm city-light glow */}
        <div className="absolute inset-x-[18%] bottom-0 h-[50%] rounded-t-[50%] bg-gradient-to-t from-[#f5b544]/8 via-transparent to-transparent blur-[70px]" />
        {/* Purple/Indigo deep space blend */}
        <div className="absolute inset-x-[30%] bottom-0 h-[40%] rounded-t-[50%] bg-gradient-to-t from-[#7C5CFF]/12 via-transparent to-transparent blur-[80px]" />
      </motion.div>

      {/* ── Layer 4 : Earth Horizon (Hero image & active network) ─── */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"
        style={{
          y: earthY,
          scale: earthScale,
          opacity: earthOpacity,
          width: 'min(300vw, 3600px)',
          height: 'min(65vh, 650px)',
        }}
      >
        <div className="relative h-full w-full pointer-events-auto">
          {/* Earth Image Masked Dome */}
          <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: '50% 50% 0 0' }}>
            <Image
              src="/earth-night.png"
              alt="Earth at night – global market visualization"
              fill
              className="object-cover"
              style={{ objectPosition: 'center 30%' }}
              sizes="100vw"
              priority={false}
            />
            {/* Dark overlay to blend edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020408]/65 via-transparent to-[#020408]/35" />
            {/* Side vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#020408_95%)]" />
          </div>

          {/* Atmospheric rim light – the iconic blue edge */}
          <div
            className="absolute inset-x-0 top-0 h-[12px] sm:h-[18px]"
            style={{ borderRadius: '50% 50% 0 0' }}
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent opacity-95 blur-[4px]" />
          </div>
          <div
            className="absolute inset-x-[3%] -top-[3px] h-[5px]"
            style={{ borderRadius: '50% 50% 0 0' }}
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[2px]" />
          </div>

          {/* Outer glow halo */}
          <div
            className="absolute -top-16 inset-x-[-10%] h-24 blur-3xl"
            style={{ borderRadius: '50% 50% 0 0' }}
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-[#38bdf8]/30 to-transparent" />
          </div>

          {/* SVG network connections */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {ROUTES.map((route) => (
              <React.Fragment key={route.id}>
                {/* Background faint path line */}
                <path
                  d={route.d}
                  stroke={route.color}
                  strokeWidth="0.08"
                  fill="none"
                  opacity="0.15"
                />
                {/* Pulsing dashed route overlay */}
                <path
                  d={route.d}
                  stroke={route.color}
                  strokeWidth="0.15"
                  strokeDasharray="1 8"
                  fill="none"
                  opacity="0.45"
                />
                {/* Animated traveling particle */}
                <circle r="0.3" fill={route.color} filter="url(#glow)">
                  <animateMotion
                    path={route.d}
                    dur={route.duration}
                    begin={route.delay}
                    repeatCount="indefinite"
                    calcMode="linear"
                  />
                </circle>
                {/* Secondary particle with offset to make the route look active */}
                <circle r="0.25" fill={route.color} filter="url(#glow)" opacity="0.7">
                  <animateMotion
                    path={route.d}
                    dur={route.duration}
                    begin={`${parseFloat(route.delay) + parseFloat(route.duration) / 2}s`}
                    repeatCount="indefinite"
                    calcMode="linear"
                  />
                </circle>
              </React.Fragment>
            ))}
          </svg>

          {/* City Nodes & Labels */}
          {CITIES.map((city) => (
            <div
              key={city.name}
              className="absolute pointer-events-auto group/node"
              style={{
                left: `${city.x}%`,
                top: `${city.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Inner anchor dot */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="absolute h-4 w-4 rounded-full bg-amber-400/30 blur-sm"
                  animate={{ scale: [1, 2, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: city.pulseDelay, ease: 'easeInOut' }}
                />
                <div className="h-2 w-2 rounded-full bg-amber-400 ring-2 ring-white/20" />
              </div>

              {/* Elegant City Label Container with HUD vertical line – always visible, enhanced on hover */}
              <div
                className="absolute flex flex-col items-center pointer-events-none transition-all duration-300 group-hover/node:scale-105 opacity-100 group-hover/node:pointer-events-auto"
                style={{
                  bottom: '6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                {/* HUD Glass Card */}
                <div className="rounded-md border border-white/10 bg-slate-950/90 px-1.5 py-0.5 sm:px-2 sm:py-1 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.6)] flex flex-col items-center gap-0.5 min-w-[60px] sm:min-w-[85px] text-center">
                  <span className="text-[7px] sm:text-[9px] font-bold tracking-widest text-white uppercase leading-none">{city.name}</span>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[5.5px] sm:text-[6.5px] font-semibold tracking-wider text-slate-400 uppercase leading-none">{city.market}</span>
                  </div>
                </div>

                {/* HUD dashed callout line to staggered height */}
                <div className={`w-px border-l border-dashed border-amber-400/40 mt-1 ${city.lineHeight}`} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Layer 5 : Content (Branding reveal & CTA) ──────────────── */}
      <div className="relative z-10 w-full min-h-[140vh]">
        
        {/* Top/Middle: Brand reveal container (positioned precisely relative to horizon) */}
        <motion.div
          ref={brandRef}
          className="absolute left-0 right-0 text-center px-4 bottom-[460px] sm:bottom-[490px] md:bottom-[510px]"
          style={{ opacity: brandOpacity, y: brandY }}
        >
          {/* Eyebrow */}
          <motion.p
            className="text-[10px] font-medium uppercase tracking-[0.45em] text-slate-400 sm:text-[11px]"
            initial={{ opacity: 0, y: 8 }}
            animate={isBrandInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            Global Market Intelligence
          </motion.p>

          {/* PLANITT logo layout (Ghost outline behind, solid white in front) */}
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
        </motion.div>

        {/* Bottom: Headline + Tagline + CTA buttons + Copyright (inside Earth shadow) */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-12 sm:pb-16 lg:pb-20 z-20">
          {/* Headline */}
          <motion.p
            className="mx-auto text-center max-w-lg text-lg leading-relaxed text-slate-300 sm:text-xl lg:text-2xl px-4"
            style={{ opacity: ctaOpacity, y: ctaY }}
          >
            Markets never sleep.
            <br />
            <span className="bg-gradient-to-r from-[#7C5CFF] via-indigo-300 to-cyan-400 bg-clip-text text-transparent font-medium">
              Neither does PLANITT.
            </span>
          </motion.p>

          {/* Trust tagline */}
          <motion.p
            className="mx-auto mt-4 text-center max-w-xs text-[10px] font-medium uppercase tracking-[0.28em] text-slate-500 sm:text-[11px] px-4"
            style={{ opacity: ctaOpacity, y: ctaY }}
          >
            SEBI-Registered · AI-Powered · 24/7
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 px-4 sm:gap-4 mt-8 z-20"
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

            <motion.a
              href="https://app.planitt.in/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, borderColor: 'rgba(124,92,255,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-[0_12px_40px_rgba(124,92,255,0.15)]"
            >
              <Sparkles className="h-4 w-4 text-[#c9bcff]" />
              Explore Signals
            </motion.a>

            <motion.a
              href="mailto:planittsolutions@gmail.com"
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
            className="mt-16 text-center sm:mt-20 z-20"
            style={{ opacity: ctaOpacity }}
          >
            <div className="mx-auto mb-4 h-px w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="text-[10px] tracking-[0.22em] text-slate-600 sm:text-[11px]">
              © {new Date().getFullYear()} PLANITT · All Rights Reserved
            </p>
            <p className="mt-1.5 text-[9px] tracking-[0.18em] text-slate-700 sm:text-[10px]">
              Plan with signal. Move with conviction.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
