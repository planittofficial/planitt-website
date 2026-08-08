'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import React, { MouseEvent } from 'react';
import {
  sectionShell,
  eyebrow,
  sectionHeading,
  revealSection,
  revealItem,
  cardHover,
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

function StatCard({ stat, index }: { stat: StatSlot; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: 'spring', stiffness: 100, damping: 20, delay: index * 0.1 },
        },
      }}
      whileHover={cardHover}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 text-center shadow-2xl backdrop-blur-2xl transition-colors duration-500 hover:border-white/20 sm:p-10"
    >
      {/* Dynamic Hover Background Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 181, 68, 0.15),
              transparent 40%
            )
          `,
        }}
      />
      {/* Animated Border Reveal on Hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 181, 68, 0.5),
              transparent 40%
            )
          `,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />

      {/* Subtle static glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,181,68,0.04),transparent_70%)]" />
      
      <div className="relative z-10 flex flex-col items-center justify-center">
        <p className="bg-gradient-to-br from-[#f5b544] to-[#f7c86e] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent drop-shadow-sm transition-transform duration-500 group-hover:scale-110 sm:text-5xl">
          {stat.value}
        </p>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <motion.section
      id="achievements"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Header */}
      <motion.div variants={revealItem} className="relative z-10 mx-auto max-w-3xl text-center">
        <p className={eyebrow}>Milestones</p>
        <h2 className={sectionHeading}>Our Achievements</h2>
        <p className="mt-6 max-w-2xl mx-auto text-base leading-relaxed text-slate-400 sm:text-lg">
          Numbers that reflect the trust our clients place in us — and the impact we&apos;ve delivered.
        </p>
      </motion.div>

      {/* Stat grid */}
      <motion.div
        variants={revealSection}
        className="relative z-10 mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-6 lg:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </motion.div>
    </motion.section>
  );
}
