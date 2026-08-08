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
   Section 4 — Supporters & Collaborators
   ───────────────────────────────────────────────────────────────────────────── */

const PLACEHOLDER_COUNT = 8;

function SupporterCard({ index }: { index: number }) {
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
          transition: { type: 'spring', stiffness: 100, damping: 20, delay: index * 0.05 },
        },
      }}
      whileHover={{ y: -5, scale: 1.05 }}
      onMouseMove={handleMouseMove}
      className="group relative flex h-24 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-xl backdrop-blur-2xl transition-colors duration-500 hover:border-white/20 sm:h-28"
    >
      {/* Dynamic Hover Background Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              150px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 181, 68, 0.15),
              transparent 40%
            )
          `,
        }}
      />
      {/* Animated Border Reveal on Hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              150px circle at ${mouseX}px ${mouseY}px,
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

      <div className="relative z-10 flex h-full w-full items-center justify-center p-4">
        {/* Placeholder — swap with <Image src="/supporters/logo-N.png" /> later */}
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 transition-colors duration-300 group-hover:text-[#f7c86e]">
          Logo
        </span>
      </div>
    </motion.div>
  );
}

export default function Supporters() {
  return (
    <motion.section
      id="supporters"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Header */}
      <motion.div variants={revealItem} className="relative z-10 mx-auto max-w-3xl text-center">
        <p className={eyebrow}>Backed By</p>
        <h2 className={sectionHeading}>Our Supporters & Collaborators</h2>
        <p className="mt-6 max-w-2xl mx-auto text-base leading-relaxed text-slate-400 sm:text-lg">
          Trusted by organizations and partners who share our vision for innovation.
        </p>
      </motion.div>

      {/* Logo grid */}
      <motion.div
        variants={revealSection}
        className="relative z-10 mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4"
      >
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <SupporterCard key={i} index={i} />
        ))}
      </motion.div>
    </motion.section>
  );
}
