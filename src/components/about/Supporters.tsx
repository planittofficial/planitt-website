'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Handshake } from 'lucide-react';
import {
  sectionShell,
  eyebrow,
  revealSection,
  revealItem,
  MagneticWrapper,
} from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 4 — Supporters & Collaborators
   Dual-Theme Adaptive Marquee displaying exclusively requested 7 partners:
   AMFI, Ancrew Global, AWS, CoinDCX, Razorpay, RTMNU, NISM
   ───────────────────────────────────────────────────────────────────────────── */

interface PartnerLogo {
  name: string;
  image: string;
}

const partnerLogos: PartnerLogo[] = [
  { name: 'AMFI', image: '/amfi.svg' },
  { name: 'Ancrew Global', image: '/ancrewglobal.png' },
  { name: 'AWS Cloud', image: '/aws.png' },
  { name: 'CoinDCX', image: '/coindcx.svg' },
  { name: 'Razorpay', image: '/razorpay.png' },
  { name: 'RTMNU Incubation', image: '/rtmnu.png' },
  { name: 'NISM', image: '/nism.png' },
];

function MarqueeRow({ items, direction = 'left' }: { items: PartnerLogo[]; direction?: 'left' | 'right' }) {
  const duplicated = [...items, ...items, ...items, ...items];

  return (
    <div className="flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: 25,
          ease: 'linear',
          repeat: Infinity,
        }}
        className="flex shrink-0 items-center gap-6 py-3"
      >
        {duplicated.map((item, idx) => (
          <MagneticWrapper key={`${item.name}-${idx}`} strength={0.15}>
            <div className="group relative flex h-24 w-56 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-[#b78622]/50 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-[#f5b544]/50 dark:hover:bg-white/[0.06] hover:scale-105">
              {/* Theme-Adaptive Explicit Container */}
              <div className="relative h-16 w-44 flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="200px"
                  className={`object-contain transition-all duration-300 group-hover:scale-105 ${
                    item.image === '/aws.png' ? 'invert dark:invert-0' : ''
                  } ${
                    item.image === '/rtmnu.png' ? 'dark:invert dark:brightness-200' : ''
                  }`}
                  priority={idx < 7}
                />
              </div>
            </div>
          </MagneticWrapper>
        ))}
      </motion.div>
    </div>
  );
}

export default function Supporters() {
  return (
    <motion.section
      id="supporters"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-slate-200 dark:border-white/[0.08] pb-12">
        <div>
          <span className={eyebrow}>
            <Sparkles className="h-3.5 w-3.5" /> 04 / Backed By & Partnered
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Our Supporters &{' '}
            <span className="bg-gradient-to-r from-[#f5b544] to-[#f7c86e] bg-clip-text text-transparent">
              Collaborators.
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-full bg-white dark:bg-white/[0.02] shadow-sm">
          <Handshake className="h-4 w-4 text-[#b78622] dark:text-[#f5b544]" />
          <span>STRATEGIC ECOSYSTEM</span>
        </div>
      </div>

      {/* Infinite Marquee Composition */}
      <motion.div variants={revealItem} className="space-y-6">
        <MarqueeRow items={partnerLogos} direction="left" />
        <MarqueeRow items={partnerLogos} direction="right" />
      </motion.div>
    </motion.section>
  );
}
