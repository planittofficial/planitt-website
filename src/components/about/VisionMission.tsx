'use client';

import { motion } from 'framer-motion';
import { Eye, Rocket } from 'lucide-react';
import {
  sectionShell,
  eyebrow,
  sectionHeading,
  glassCard,
  goldHover,
  revealSection,
  revealItem,
  cardHover,
  microTransition,
} from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 1 — Vision & Mission
   ───────────────────────────────────────────────────────────────────────────── */

export default function VisionMission() {
  return (
    <motion.section
      id="vision-mission"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Header */}
      <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
        <p className={eyebrow}>Who We Are</p>
        <h2 className={sectionHeading}>Plan Your Dreams With Us</h2>
        <p className="mt-4 max-w-2xl mx-auto text-sm leading-6 text-slate-400 sm:text-base">
          Building the future of accessible, intelligent financial planning and technology services — one milestone at a time.
        </p>
      </motion.div>

      {/* Vision & Mission cards */}
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {/* Vision */}
        <motion.div
          variants={revealItem}
          whileHover={cardHover}
          transition={microTransition}
          className={`${glassCard} ${goldHover} relative overflow-hidden p-8 sm:p-10`}
        >
          {/* Decorative glow */}
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#f5b544]/8 blur-3xl" />

          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5b544]/10 text-[#f7c86e]">
              <Eye className="h-7 w-7" />
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-white">
              Our Vision
            </h3>
            <p className="mt-4 leading-7 text-slate-400">
              To be the most trusted dual-engine platform, empowering individuals with clear, goal-oriented financial guidance and organizations with reliable, modern technical execution.
            </p>
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div
          variants={revealItem}
          whileHover={cardHover}
          transition={microTransition}
          className={`${glassCard} ${goldHover} relative overflow-hidden p-8 sm:p-10`}
        >
          {/* Decorative glow */}
          <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-[#7C5CFF]/8 blur-3xl" />

          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7C5CFF]/10 text-[#c9bcff]">
              <Rocket className="h-7 w-7" />
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-white">
              Our Mission
            </h3>
            <p className="mt-4 leading-7 text-slate-400">
              To deliver practical financial advisory and expert digital solutions under one roof. We prioritize trust, transparency, and expert leadership to ensure quality and reliability in every engagement.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
