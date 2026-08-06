'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import Image from 'next/image';
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

export default function OurTeam() {
  return (
    <motion.section
      id="our-team"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Header */}
      <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
        <p className={eyebrow}>The People Behind Planitt</p>
        <h2 className={sectionHeading}>Our Team</h2>
        <p className="mt-4 max-w-2xl mx-auto text-sm leading-6 text-slate-400 sm:text-base">
          A passionate team of financial experts and technologists building the future of Planitt.
        </p>
      </motion.div>

      {/* Team grid */}
      <motion.div
        variants={revealSection}
        className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {team.map((member, i) => (
          <motion.div
            key={i}
            variants={revealItem}
            whileHover={cardHover}
            transition={microTransition}
            className={`${glassCard} ${goldHover} flex flex-col items-center p-8 text-center`}
          >
            {/* Avatar */}
            <div className="relative flex h-24 w-24 overflow-hidden items-center justify-center rounded-full border-2 border-white/10 bg-white/[0.04]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <h3 className="mt-5 text-base font-semibold text-white">{member.name}</h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-[#f7c86e]/80">
              {member.role}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
