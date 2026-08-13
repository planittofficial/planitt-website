'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Users } from 'lucide-react';
import {
  sectionShell,
  eyebrow,
  revealSection,
  revealItem,
  MagneticWrapper,
} from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 7 — Our Team
   3, 3, 1 Grid Layout — All 7 Members Share Identical Styling & Height
   ───────────────────────────────────────────────────────────────────────────── */

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const allMembers: TeamMember[] = [
  // Row 1 (3 members)
  {
    name: 'Piyush Tembhekar',
    role: 'CEO & FOUNDER',
    image: '/CEO_Photo.png',
  },
  {
    name: 'Sarth Srivastava',
    role: 'CTO & CO-FOUNDER',
    image: '/sarth_avatar.jpeg',
  },
  {
    name: 'Om Shrikhande',
    role: 'SOFTWARE DEVELOPER',
    image: '/om_profile.jpeg',
  },
  // Row 2 (3 members)
  {
    name: 'Ansh Mishra',
    role: 'SOFTWARE DEVELOPER',
    image: '/ansh_profile.jpeg',
  },
  {
    name: 'T. Devashish Pillay',
    role: 'SOFTWARE DEVELOPER',
    image: '/dev_profile.jpeg',
  },
  {
    name: 'Shivam Badade',
    role: 'SOFTWARE DEVELOPER',
    image: '/shivam_profile.jpg',
  },
  // Row 3 (1 member - centered)
  {
    name: 'Harsh R. Meshram',
    role: 'SOFTWARE DEVELOPER',
    image: '/Harsh_profile.jpg',
  },
];

export default function OurTeam() {
  return (
    <motion.section
      id="our-team"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Top Divider */}
      <div className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-[#f5b544]/30 to-transparent" />

      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <span className={eyebrow}>
            <Sparkles className="h-3.5 w-3.5" /> 07 / The Planitt Team
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            The People Behind{' '}
            <span className="bg-gradient-to-r from-[#f5b544] to-[#f7c86e] bg-clip-text text-transparent">
              Planitt.
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-full bg-white dark:bg-white/[0.02] shadow-sm">
          <Users className="h-4 w-4 text-[#b78622] dark:text-[#f5b544]" />
          <span>7 CORE CONTRIBUTORS</span>
        </div>
      </div>

      {/* 3, 3, 1 Grid — All 7 members share identical card height and structure */}
      <motion.div
        variants={revealItem}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
      >
        {allMembers.map((member, index) => (
          <div
            key={member.name}
            className={index === 6 ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''}
          >
            <MagneticWrapper strength={0.12} className="h-full">
              <div className="group relative flex flex-col items-center justify-center text-center rounded-3xl border border-slate-200 bg-white p-7 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-[#b78622]/40 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-[#f5b544]/40 dark:hover:bg-white/[0.04] hover:-translate-y-1 h-full">
                {/* Member Image Frame */}
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/15 dark:bg-white/[0.02] shadow-lg group-hover:scale-105 group-hover:border-[#b78622]/50 dark:group-hover:border-[#f5b544]/50 transition-all duration-400">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="mt-5 space-y-1.5 flex flex-col items-center">
                  <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-[#b78622] dark:text-[#f5b544]">
                    {member.role}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#b78622] dark:group-hover:text-[#f7c86e] transition-colors">
                    {member.name}
                  </h3>
                </div>
              </div>
            </MagneticWrapper>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
