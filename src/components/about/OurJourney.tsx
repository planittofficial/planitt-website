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
   Section 3 — Our Journey (Timeline)
   ───────────────────────────────────────────────────────────────────────────── */

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    year: '2020',
    title: 'The Inception',
    description: 'Planitt begins as a specialized financial advisory firm, focused on bringing structured, data-driven wealth management to individuals and businesses.',
  },
  {
    year: '2021',
    title: 'The Dual Engine',
    description: 'Recognizing the need for robust digital infrastructure, Planitt expands its operations to include end-to-end technical services under expert leadership.',
  },
  {
    year: '2022',
    title: 'Institutional Recognition',
    description: 'Planitt is incubated under RTMNU and receives official DPIIT recognition, validating our innovative approach to fintech and digital services.',
  },
  {
    year: '2023',
    title: 'AI & Automation',
    description: 'Launch of the Planitt Recommendation System, bringing AI-driven market forecasting and advanced algorithmic trading capabilities to our clients.',
  },
  {
    year: '2024',
    title: 'Planitt Academy',
    description: 'Expanding our impact through education by launching expert-led masterclasses in algorithmic trading, personal finance, and full-stack development.',
  },
];

function MilestoneCard({ ms, isLeft, index }: { ms: Milestone; isLeft: boolean; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 20, delay: index * 0.15 }}
      className={`relative mb-16 flex items-center last:mb-0
        md:w-1/2
        ${isLeft ? 'md:ml-0 md:pr-16 md:justify-end' : 'md:ml-auto md:pl-16 md:justify-start'}
        pl-12 md:pl-0 w-full`}
    >
      {/* Dot marker */}
      <motion.div
        whileInView={{ scale: [0, 1.2, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ type: 'spring', stiffness: 200, delay: index * 0.15 + 0.2 }}
        className={`absolute top-1/2 -translate-y-1/2 z-20 flex h-[20px] w-[20px] items-center justify-center
          left-[15px]
          md:left-auto
          ${isLeft ? 'md:-right-[10px]' : 'md:-left-[10px]'}`}
      >
        <div className="h-4 w-4 rounded-full border-4 border-black bg-[#f5b544] shadow-[0_0_20px_rgba(245,181,68,0.6)]" />
      </motion.div>

      {/* Connecting horizontal line to dot (desktop only) */}
      <div className={`hidden md:block absolute top-1/2 h-px w-8 bg-gradient-to-r from-transparent to-[#f5b544]/50 
        ${isLeft ? 'right-0' : 'left-0 bg-gradient-to-l'}`} 
      />

      {/* Content card */}
      <motion.div
        whileHover={cardHover}
        onMouseMove={handleMouseMove}
        className="group relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 shadow-xl backdrop-blur-2xl transition-colors duration-500 hover:border-white/20 sm:p-10"
      >
        {/* Dynamic Hover Background Glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                rgba(245, 181, 68, 0.1),
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

        <div className={`relative z-10 flex flex-col ${isLeft ? 'md:items-end md:text-right' : 'items-start text-left'}`}>
          <span className="inline-block rounded-full border border-[#f5b544]/25 bg-gradient-to-r from-[#f5b544]/10 to-[#f7c86e]/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f7c86e] shadow-inner">
            {ms.year}
          </span>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60">
            {ms.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
            {ms.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function OurJourney() {
  return (
    <motion.section
      id="our-journey"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-[30%] -z-10 h-[1000px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(245,181,68,0.05),transparent_70%)] blur-[100px]" />

      {/* Header */}
      <motion.div variants={revealItem} className="relative z-10 mx-auto max-w-3xl text-center">
        <p className={eyebrow}>Our Journey</p>
        <h2 className={sectionHeading}>The Planitt Story</h2>
        <p className="mt-6 max-w-2xl mx-auto text-base leading-relaxed text-slate-400 sm:text-lg">
          From a bold idea to a growing platform — every milestone has shaped who we are today.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative mx-auto mt-24 max-w-5xl">
        {/* Vertical connecting line */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute left-[24px] top-0 w-[2px] bg-gradient-to-b from-[#f5b544]/60 via-[#f5b544]/20 to-transparent md:left-1/2 md:-translate-x-px" 
        />

        {milestones.map((ms, i) => (
          <MilestoneCard key={i} ms={ms} isLeft={i % 2 === 0} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
