'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Image from 'next/image';
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
   Section 7 — Our Team
   ───────────────────────────────────────────────────────────────────────────── */

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const team: TeamMember[] = [
  {
    name: 'Piyush Tembhekar',
    role: 'CEO, Financial Distribution',
    image: '/CEO_Photo.png',
  },
  {
    name: 'Sarth Srivastava',
    role: 'CTO, Technical Delivery',
    image: '/sarth_avatar.jpeg',
  },
  {
    name: 'Om Shrikhande',
    role: 'Software Developer',
    image: '/om_profile.jpeg',
  },
  {
    name: 'Ansh Mishra',
    role: 'Software Developer',
    image: '/ansh_profile.jpeg',
  },
  {
    name: 'T. Devashish Pillay',
    role: 'Software Developer',
    image: '/dev_profile.jpeg',
  },
  {
    name: 'Shivam Badade',
    role: 'Software Developer',
    image: '/shivam_profile.jpg',
  },
  {
    name: 'Harsh R. Meshram',
    role: 'Digital Marketer',
    image: '/Harsh_profile.jpg',
  },
];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
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
      className="group relative flex flex-col items-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 text-center shadow-2xl backdrop-blur-2xl transition-colors duration-500 hover:border-white/20 sm:p-10"
    >
      {/* Dynamic Hover Background Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 181, 68, 0.1),
              transparent 40%
            )
          `,
        }}
      />
      {/* Animated Border Reveal on Hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
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

      {/* Avatar Container */}
      <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-b from-white/10 to-transparent p-1 shadow-inner transition-transform duration-500 group-hover:scale-110">
        <div className="relative h-full w-full overflow-hidden rounded-full border border-white/20 bg-black/50">
           <Image
             src={member.image}
             alt={member.name}
             fill
             sizes="128px"
             className="object-cover transition-transform duration-700 group-hover:scale-110"
           />
           {/* Subtle highlight overlay */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50" />
        </div>
        {/* Outer Glow */}
        <div className="absolute -inset-4 -z-10 rounded-full bg-[#f5b544]/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="relative z-10 mt-6 flex flex-col items-center">
        <h3 className="text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60">
          {member.name}
        </h3>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[#f7c86e] transition-colors duration-300">
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}

export default function OurTeam() {
  return (
    <motion.section
      id="our-team"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute right-[10%] top-1/2 -z-10 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.06),transparent_60%)] blur-[100px]" />

      {/* Header */}
      <motion.div variants={revealItem} className="relative z-10 mx-auto max-w-3xl text-center">
        <p className={eyebrow}>The People Behind Planitt</p>
        <h2 className={sectionHeading}>Our Team</h2>
        <p className="mt-6 max-w-2xl mx-auto text-base leading-relaxed text-slate-400 sm:text-lg">
          A passionate team of financial experts and technologists building the future of Planitt.
        </p>
      </motion.div>

      {/* Team grid */}
      <motion.div
        variants={revealSection}
        className="relative z-10 mx-auto mt-20 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {team.map((member, i) => (
          <TeamCard key={i} member={member} index={i} />
        ))}
      </motion.div>
    </motion.section>
  );
}
