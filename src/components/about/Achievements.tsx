'use client';

import { motion } from 'framer-motion';
import {
  sectionShell,
  eyebrow,
  sectionHeading,
  glassCard,
  revealSection,
  revealItem,
  cardHover,
  microTransition,
} from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 5 — Achievements (Stat Grid)
   ───────────────────────────────────────────────────────────────────────────── */

interface StatSlot {
  value: string;
  label: string;
}

const stats: StatSlot[] = [
  { value: '50+', label: 'Happy Clients' },
  { value: 'Rs 50L+', label: 'Portfolio Managed' },
  { value: '30+', label: 'Tech Deliveries' },
  { value: '6+', label: 'Years Experience' },
];

export default function Achievements() {
  return (
    <motion.section
      id="achievements"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Header */}
      <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
        <p className={eyebrow}>Milestones</p>
        <h2 className={sectionHeading}>Our Achievements</h2>
        <p className="mt-4 max-w-2xl mx-auto text-sm leading-6 text-slate-400 sm:text-base">
          Numbers that reflect the trust our clients place in us — and the impact we&apos;ve delivered.
        </p>
      </motion.div>

      {/* Stat grid */}
      <motion.div
        variants={revealSection}
        className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-5 lg:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={revealItem}
            whileHover={cardHover}
            transition={microTransition}
            className={`${glassCard} relative overflow-hidden p-6 text-center sm:p-8`}
          >
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,181,68,0.06),transparent_70%)]" />
            <div className="relative">
              <p className="text-3xl font-bold tracking-tight text-[#f7c86e] sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
