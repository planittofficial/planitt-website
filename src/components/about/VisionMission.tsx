'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Eye, Rocket } from 'lucide-react';
import React, { MouseEvent } from 'react';
import {
  sectionShell,
  eyebrow,
  sectionHeading,
  glassCard,
  goldHover,
  purpleHover,
  revealSection,
  revealItem,
  cardHover,
  microTransition,
} from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 1 — Vision & Mission
   ───────────────────────────────────────────────────────────────────────────── */

function VisionCard() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      variants={revealItem}
      whileHover={cardHover}
      transition={microTransition}
      onMouseMove={handleMouseMove}
      className={`${glassCard} ${goldHover} p-8 sm:p-10`}
    >
      {/* Dynamic Hover Background Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 181, 68, 0.1),
              transparent 40%
            )
          `,
        }}
      />
      {/* Ambient static glow */}
      <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#f5b544]/10 blur-[80px] transition-opacity duration-500 group-hover:opacity-60" />

      <div className="relative z-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] shadow-inner shadow-white/10 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#f5b544]/10">
          <Eye className="h-8 w-8 text-[#f7c86e]" />
        </div>
        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-[#f7c86e]">
          Our Vision
        </h3>
        <p className="mt-4 text-base leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
          To be the most trusted dual-engine platform, empowering individuals with clear, goal-oriented financial guidance and organizations with reliable, modern technical execution.
        </p>
      </div>
    </motion.div>
  );
}

function MissionCard() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      variants={revealItem}
      whileHover={cardHover}
      transition={microTransition}
      onMouseMove={handleMouseMove}
      className={`${glassCard} ${purpleHover} p-8 sm:p-10`}
    >
      {/* Dynamic Hover Background Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(124, 92, 255, 0.1),
              transparent 40%
            )
          `,
        }}
      />
      {/* Ambient static glow */}
      <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-[#7C5CFF]/10 blur-[80px] transition-opacity duration-500 group-hover:opacity-60" />

      <div className="relative z-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] shadow-inner shadow-white/10 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#7C5CFF]/10">
          <Rocket className="h-8 w-8 text-[#c9bcff]" />
        </div>
        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-[#c9bcff]">
          Our Mission
        </h3>
        <p className="mt-4 text-base leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
          To deliver practical financial advisory and expert digital solutions under one roof. We prioritize trust, transparency, and expert leadership to ensure quality and reliability in every engagement.
        </p>
      </div>
    </motion.div>
  );
}

export default function VisionMission() {
  return (
    <motion.section
      id="vision-mission"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Background ambient glow for the section */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_70%)] blur-[100px]" />

      {/* Header */}
      <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
        <p className={eyebrow}>Who We Are</p>
        <h2 className={sectionHeading}>Plan Your Dreams With Us</h2>
        <p className="mt-6 max-w-2xl mx-auto text-base leading-relaxed text-slate-400 sm:text-lg">
          Building the future of accessible, intelligent financial planning and technology services — one milestone at a time.
        </p>
      </motion.div>

      {/* Vision & Mission cards */}
      <div className="mt-20 grid gap-8 md:grid-cols-2 max-w-5xl mx-auto relative z-10">
        <VisionCard />
        <MissionCard />
      </div>
    </motion.section>
  );
}
