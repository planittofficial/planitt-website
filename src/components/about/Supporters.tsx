'use client';

import { motion } from 'framer-motion';
import {
  sectionShell,
  eyebrow,
  sectionHeading,
  revealSection,
  revealItem,
  cardHover,
  microTransition,
} from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 4 — Supporters & Collaborators
   ───────────────────────────────────────────────────────────────────────────── */

const PLACEHOLDER_COUNT = 8;

export default function Supporters() {
  return (
    <motion.section
      id="supporters"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Header */}
      <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
        <p className={eyebrow}>Backed By</p>
        <h2 className={sectionHeading}>Our Supporters & Collaborators</h2>
        <p className="mt-4 max-w-2xl mx-auto text-sm leading-6 text-slate-400 sm:text-base">
          Trusted by organizations and partners who share our vision for innovation.
        </p>
      </motion.div>

      {/* Logo grid */}
      <motion.div
        variants={revealSection}
        className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4"
      >
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            variants={revealItem}
            whileHover={cardHover}
            transition={microTransition}
            className="group flex h-20 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.03] backdrop-blur-lg transition-all duration-300 hover:border-[#f5b544]/30 hover:bg-white/[0.06] sm:h-24"
          >
            {/* Placeholder — swap with <Image src="/supporters/logo-N.png" /> later */}
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-600 transition-colors group-hover:text-slate-400">
              Logo
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
