'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Building2, Sparkles, CheckCircle2 } from 'lucide-react';
import React from 'react';
import {
  sectionShell,
  eyebrow,
  revealSection,
  revealItem,
  MagneticWrapper,
} from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 8 — Recognition (RTMNU & DPIIT)
   Dual Institutional Prestige Showcase
   ───────────────────────────────────────────────────────────────────────────── */

interface Credential {
  icon: React.ElementType;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  accent: string;
  tags: string[];
}

const credentials: Credential[] = [
  {
    icon: Building2,
    badge: 'Incubation Partner',
    title: 'RTMNU Incubation Centre',
    subtitle: 'Rashtrasant Tukadoji Maharaj Nagpur University',
    description:
      'Officially incubated under RTMNU Incubation Center, fostering academic research, fintech product development, and technological innovation.',
    image: '/rtmnu-logo.png',
    accent: '#f5b544',
    tags: ['University Incubated', 'Fintech Research', 'Academic Alliance'],
  },
  {
    icon: Award,
    badge: 'Government Certification',
    title: 'DPIIT Recognition',
    description:
      'Officially recognized by the Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry, Government of India.',
    subtitle: 'Startup India Flagship Program',
    image: '/dpiit.png',
    accent: '#38bdf8',
    tags: ['Govt Certified', 'Startup India', 'Validated Innovation'],
  },
];

export default function Recognition() {
  return (
    <motion.section
      id="recognition"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Top Divider */}
      <div className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-[#f5b544]/30 to-transparent" />

      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <span className={eyebrow}>
            <Sparkles className="h-3.5 w-3.5" /> 08 / Institutional Validation
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Recognized &{' '}
            <span className="bg-gradient-to-r from-[#f5b544] to-[#f7c86e] bg-clip-text text-transparent">
              Certified.
            </span>
          </h2>
        </div>

        <p className="max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
          Backed by institutional incubation and government certifications that validate our technical and advisory standards.
        </p>
      </div>

      {/* Credentials Dual Showcase */}
      <div className="grid gap-8 md:grid-cols-2">
        {credentials.map((cred, index) => (
          <motion.div
            key={cred.title}
            variants={revealItem}
            className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-slate-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20 dark:hover:bg-white/[0.04]"
          >
            {/* Header Line & Icon */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-6">
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10"
                    style={{ backgroundColor: `${cred.accent}15` }}
                  >
                    <cred.icon className="h-6 w-6" style={{ color: cred.accent }} />
                  </div>
                  <div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.25em]"
                      style={{ color: cred.accent }}
                    >
                      {cred.badge}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {cred.title}
                    </h3>
                  </div>
                </div>

                <CheckCircle2 className="h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: cred.accent }} />
              </div>

              {/* Subtitle & Description */}
              <div className="mt-6 space-y-2">
                <p className="text-xs font-mono text-[#b78622] dark:text-[#f7c86e]">
                  {cred.subtitle}
                </p>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {cred.description}
                </p>
              </div>
            </div>

            {/* Logo Presenter & Tags */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/[0.08] space-y-6">
              {/* Logo Frame */}
              <div className="relative flex h-28 w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/[0.06] dark:bg-black/30 p-4">
                {cred.image ? (
                  <div className="relative h-16 w-40 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={cred.image}
                      alt={cred.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="text-xs font-mono uppercase text-slate-500">
                    Official Seal
                  </span>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {cred.tags.map((t) => (
                  <MagneticWrapper key={t} strength={0.12}>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cred.accent }} />
                      {t}
                    </span>
                  </MagneticWrapper>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Structural Accent Bottom Line */}
      <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </motion.section>
  );
}
