'use client';

import { motion } from 'framer-motion';
import {
  sectionShell,
  eyebrow,
  sectionHeading,
  revealSection,
  revealItem,
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

export default function OurJourney() {
  return (
    <motion.section
      id="our-journey"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Header */}
      <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
        <p className={eyebrow}>Our Journey</p>
        <h2 className={sectionHeading}>The Planitt Story</h2>
        <p className="mt-4 max-w-2xl mx-auto text-sm leading-6 text-slate-400 sm:text-base">
          From a bold idea to a growing platform — every milestone has shaped who we are today.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative mx-auto mt-16 max-w-4xl">
        {/* Vertical connecting line */}
        <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#f5b544]/60 via-[#f5b544]/30 to-transparent md:left-1/2 md:-translate-x-px" />

        {milestones.map((ms, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32, x: 0 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
              className={`relative mb-12 flex items-start last:mb-0
                md:w-1/2
                ${isLeft ? 'md:ml-0 md:pr-12 md:text-right' : 'md:ml-auto md:pl-12 md:text-left'}
                pl-16 md:pl-0`}
            >
              {/* Dot marker */}
              <div
                className={`absolute top-1.5 z-10 flex h-[14px] w-[14px] items-center justify-center
                  left-[18px]
                  md:left-auto
                  ${isLeft ? 'md:-right-[7px]' : 'md:-left-[7px]'}`}
              >
                <div className="h-3 w-3 rounded-full border-2 border-[#f5b544] bg-[#0B0F19] shadow-[0_0_12px_rgba(245,181,68,0.4)]" />
              </div>

              {/* Content card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-lg transition duration-300 hover:border-[#f5b544]/25 hover:bg-white/[0.06]">
                <span className="inline-block rounded-full border border-[#f5b544]/25 bg-[#f5b544]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7c86e]">
                  {ms.year}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{ms.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{ms.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
