'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Building2, ShieldCheck } from 'lucide-react';
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
   Section 8 — Recognition (RTMNU & DPIIT)
   ───────────────────────────────────────────────────────────────────────────── */

interface Credential {
  icon: React.ElementType;
  badge: string;
  title: string;
  description: string;
  image?: string;
}

const credentials: Credential[] = [
  {
    icon: Building2,
    badge: 'Incubation',
    title: 'RTMNU Incubation',
    description:
      '[Description to be added — incubation status under Rashtrasant Tukadoji Maharaj Nagpur University]',
    image: '/rtmnu-logo.png',
  },
  {
    icon: Award,
    badge: 'Certification',
    title: 'DPIIT Recognition',
    description:
      'Officially recognized by the Department for Promotion of Industry and Internal Trade (DPIIT) as an innovative startup driving technological advancement.',
    image: '/dpiit.png',
  },
];

export default function Recognition() {
  return (
    <motion.section
      id="recognition"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Header */}
      <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
        <p className={eyebrow}>Recognized & Certified</p>
        <h2 className={sectionHeading}>Incubation & Certifications</h2>
        <p className="mt-4 max-w-2xl mx-auto text-sm leading-6 text-slate-400 sm:text-base">
          Backed by institutional recognition and government certifications that validate our commitment.
        </p>
      </motion.div>

      {/* Credential badges */}
      <motion.div
        variants={revealSection}
        className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-2"
      >
        {credentials.map((cred, i) => (
          <motion.div
            key={i}
            variants={revealItem}
            whileHover={cardHover}
            transition={microTransition}
            className="rounded-[26px] border border-[#f5b544]/20 bg-[linear-gradient(180deg,rgba(245,181,68,0.08),rgba(255,255,255,0.03))] p-6 backdrop-blur-xl transition duration-300 hover:border-[#f5b544]/35 sm:p-8"
          >
            <div className="flex items-start gap-5">
              {/* Icon */}
              <div className="flex h-14 w-14 flex-none items-center justify-center rounded-[20px] bg-[#f5b544]/[0.12] text-[#f7c86e]">
                <cred.icon className="h-7 w-7" />
              </div>

              <div>
                {/* Eyebrow badge */}
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#f7c86e]/80">
                  {cred.badge}
                </p>

                {/* Title */}
                <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.02em] text-white">
                  {cred.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-slate-400">{cred.description}</p>

                {/* Logo */}
                {cred.image ? (
                  <div className="mt-4 relative h-16 w-32 opacity-80 transition-opacity duration-300 hover:opacity-100">
                    <Image
                      src={cred.image}
                      alt={cred.title}
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                ) : (
                  <div className="mt-4 flex h-12 w-28 items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.03]">
                    <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-slate-600">
                      Logo
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
