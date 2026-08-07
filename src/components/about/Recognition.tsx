'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { Award, Building2 } from 'lucide-react';
import React, { MouseEvent } from 'react';
import {
  sectionShell,
  eyebrow,
  sectionHeading,
} from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 8 — Recognition (RTMNU & DPIIT) - Premium Redesign
   ───────────────────────────────────────────────────────────────────────────── */

interface Credential {
  icon: React.ElementType;
  badge: string;
  title: string;
  description: string;
  image?: string;
  accent: string;
}

const credentials: Credential[] = [
  {
    icon: Building2,
    badge: 'Incubation',
    title: 'RTMNU Incubation',
    description:
      '[Description to be added — incubation status under Rashtrasant Tukadoji Maharaj Nagpur University]',
    image: '/rtmnu-logo.png',
    accent: 'rgba(245, 181, 68,', // Brand gold accent
  },
  {
    icon: Award,
    badge: 'Certification',
    title: 'DPIIT Recognition',
    description:
      'Officially recognized by the Department for Promotion of Industry and Internal Trade (DPIIT) as an innovative startup driving technological advancement.',
    image: '/dpiit.png',
    accent: 'rgba(56, 189, 248,', // Blue accent
  },
];

// --- Premium Card Component ---
function CredentialCard({ cred, index }: { cred: Credential; index: number }) {
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
        hidden: { opacity: 0, y: 40, scale: 0.95, rotateX: 10 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 20,
            mass: 1,
            delay: index * 0.15,
          },
        },
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-2xl transition-colors duration-500 hover:border-white/20 sm:p-10"
    >
      {/* Dynamic Hover Background Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${cred.accent} 0.1),
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
              400px circle at ${mouseX}px ${mouseY}px,
              ${cred.accent} 0.4),
              transparent 40%
            )
          `,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Header: Icon & Badge */}
        <div className="flex items-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] shadow-inner shadow-white/10 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/[0.08]">
            {/* Soft pulse glow behind icon */}
            <div className="absolute inset-0 rounded-2xl bg-current opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-40" style={{ color: `${cred.accent} 1)` }} />
            <cred.icon className="relative z-10 h-8 w-8 text-white transition-colors duration-300" style={{ color: `${cred.accent} 1)` }} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-300" style={{ color: `${cred.accent} 0.8)` }}>
              {cred.badge}
            </p>
          </div>
        </div>

        {/* Content: Title & Description */}
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60">
            {cred.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
            {cred.description}
          </p>
        </div>

        {/* Floating Logo Presenter */}
        <div className="relative mt-4 flex h-32 w-full items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-black/20 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {cred.image ? (
            <motion.div
              className="relative h-20 w-40 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]"
            >
              <Image
                src={cred.image}
                alt={cred.title}
                fill
                className="object-contain"
              />
            </motion.div>
          ) : (
            <div className="flex h-12 w-28 items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.03]">
              <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-slate-600">
                Logo
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Recognition() {
  return (
    <motion.section
      id="recognition"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`relative overflow-hidden ${sectionShell}`}
    >
      {/* ─────────────────────────────────────────────────────────────────────────
          Background: Ambient Glows & Noise
          ───────────────────────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-40 mix-blend-screen">
        <motion.div
          animate={{
            rotate: [0, 90, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-[20%] right-[10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(245,181,68,0.15),transparent_60%)] blur-[100px]"
        />
        <motion.div
          animate={{
            rotate: [0, -90, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-[20%] left-[10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.12),transparent_60%)] blur-[120px]"
        />
      </div>

      {/* Subtle Noise Overlay for premium texture */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* ─────────────────────────────────────────────────────────────────────────
          Header
          ───────────────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          },
        }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <p className={eyebrow}>
          <span className="bg-gradient-to-r from-[#f5b544] to-[#f7c86e] bg-clip-text text-transparent">Recognized & Certified</span>
        </p>
        <h2 className={`mt-4 ${sectionHeading} drop-shadow-sm`}>
          Incubation & Certifications
        </h2>
        <p className="mt-6 mx-auto max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          Backed by institutional recognition and government certifications that validate our commitment to driving technological advancement.
        </p>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────────────────
          Credentials Grid
          ───────────────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="relative z-10 mx-auto mt-20 grid max-w-5xl gap-8 md:grid-cols-2"
      >
        {credentials.map((cred, i) => (
          <CredentialCard key={i} cred={cred} index={i} />
        ))}
      </motion.div>
    </motion.section>
  );
}

