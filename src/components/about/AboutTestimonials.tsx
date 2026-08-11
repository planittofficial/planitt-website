'use client';

import { useState } from 'react';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';
import { GraduationCap, Briefcase, Quote, Star, Sparkles, UserCheck } from 'lucide-react';
import React from 'react';
import { useHomeMode } from '@/context/HomeModeContext';
import {
  sectionShell,
  eyebrow,
  revealSection,
  revealItem,
  springSmooth,
  MagneticWrapper,
} from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   Section 6 — Testimonials
   Cinematic Quote Spotlight & Interactive Author Switcher
   ───────────────────────────────────────────────────────────────────────────── */

type Track = 'courses' | 'services';

interface Testimonial {
  id: string;
  quote: string;
  highlightText: string;
  name: string;
  role: string;
  location: string;
}

const coursesTestimonials: Testimonial[] = [
  {
    id: 'c1',
    quote:
      'The algorithmic trading course completely changed my approach to the markets. The practical, hands-on sessions helped me build and deploy my first automated strategy within weeks.',
    highlightText: 'deploy my first automated strategy within weeks',
    name: 'Arjun Mehta',
    role: 'Algorithmic Trading Masterclass',
    location: 'Delhi',
  },
  {
    id: 'c2',
    quote:
      'I came in with zero background in finance. The instructors break down complex concepts into digestible pieces. I now feel confident managing my own diverse portfolio.',
    highlightText: 'feel confident managing my own diverse portfolio',
    name: 'Sneha Patel',
    role: 'Personal Finance Fundamentals',
    location: 'Ahmedabad',
  },
  {
    id: 'c3',
    quote:
      'The full-stack development bootcamp at Planitt Academy gave me the exact skills I needed to pivot my career. The mentorship and real-world projects were invaluable.',
    highlightText: 'exact skills I needed to pivot my career',
    name: 'Karan Desai',
    role: 'Full-Stack Web Development',
    location: 'Pune',
  },
];

const servicesTestimonials: Testimonial[] = [
  {
    id: 's1',
    quote:
      'The Bhav app revolutionized how we track bullion investments. The real-time market updates and secure payment integration have streamlined our operations significantly.',
    highlightText: 'streamlined our operations significantly',
    name: 'Vipin Soni',
    role: 'Bhav App Client',
    location: 'India',
  },
  {
    id: 's2',
    quote:
      'Working with Planitt Solutions was a game-changer for our e-commerce platform. They delivered a seamless shopping experience with robust payment systems.',
    highlightText: 'seamless shopping experience with robust payment systems',
    name: 'Mohak Wankhede',
    role: 'Zeynix.Co Lead',
    location: 'India',
  },
  {
    id: 's3',
    quote:
      'Piyush helped me start my SIP journey 3 years ago. I built a corpus through disciplined investing and structured guidance.',
    highlightText: 'built a corpus through disciplined investing',
    name: 'Priya Sharma',
    role: 'SIP Wealth Advisory Client',
    location: 'Mumbai',
  },
];

const tracks: { key: Track; label: string; icon: React.ElementType }[] = [
  { key: 'courses', label: 'Courses & Technical', icon: GraduationCap },
  { key: 'services', label: 'Financial & Advisory', icon: Briefcase },
];

export default function AboutTestimonials() {
  const { homeMode, setHomeMode } = useHomeMode();
  const activeTrack: Track = homeMode === 'technical' ? 'courses' : 'services';
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const testimonials = activeTrack === 'courses' ? coursesTestimonials : servicesTestimonials;
  const current = testimonials[activeIndex] || testimonials[0];
  const accentColor = activeTrack === 'courses' ? '#06b6d4' : '#b78622';

  return (
    <motion.section
      id="about-testimonials"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/[0.08] pb-12">
        <div>
          <span className={eyebrow}>
            <Sparkles className="h-3.5 w-3.5" /> 06 / User Testimonials
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Real Stories From{' '}
            <span className="bg-gradient-to-r from-[#b78622] via-[#d8b35c] to-[#06b6d4] bg-clip-text text-transparent">
              Our Community.
            </span>
          </h2>
        </div>

        {/* Track Control Switcher */}
        <LayoutGroup id="testimonials-track-toggle">
          <div className="relative inline-flex shrink-0 rounded-full border border-slate-200 bg-slate-100/90 dark:border-white/10 dark:bg-white/[0.04] p-1.5 backdrop-blur-xl shadow-lg transition-colors duration-300">
            {tracks.map((t) => {
              const isActive = activeTrack === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => {
                    setHomeMode(t.key === 'courses' ? 'technical' : 'financial');
                    setActiveIndex(0);
                  }}
                  className={`relative overflow-hidden flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 cursor-pointer ${
                    isActive ? 'text-white drop-shadow-xs' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTrackPill"
                      className={`absolute inset-0 z-0 rounded-full ${
                        t.key === 'courses'
                          ? 'bg-gradient-to-r from-cyan-600 to-sky-600 dark:from-cyan-500 dark:to-sky-500 shadow-[0_4px_16px_rgba(6,182,212,0.4)]'
                          : 'bg-gradient-to-r from-[#b78622] to-[#d8b35c] dark:from-[#c9952d] dark:to-[#e5c26b] shadow-[0_4px_16px_rgba(183,134,34,0.4)]'
                      }`}
                      transition={springSmooth}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2.5">
                    <t.icon className="h-4 w-4" />
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      {/* Main Quote Spotlight Composition */}
      <motion.div variants={revealItem} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-14 backdrop-blur-xl shadow-xl dark:border-white/10 dark:bg-white/[0.02] transition-colors duration-300">
        {/* Oversized Background Quote Watermark */}
        <div className="pointer-events-none absolute -left-6 -top-6 text-slate-100 dark:text-white/[0.03] select-none">
          <Quote className="h-48 w-48" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
            transition={{ duration: 0.45 }}
            className="relative z-10 space-y-8"
          >
            {/* Stars */}
            <div className="flex gap-1.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-4 w-4" style={{ fill: accentColor, color: accentColor }} />
              ))}
            </div>

            {/* Giant Quotation */}
            <blockquote className="text-2xl font-serif italic text-slate-900 dark:text-white sm:text-3xl lg:text-4xl leading-relaxed">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Author Metadata Bar */}
            <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{current.name}</h3>
                <p className="text-xs font-bold uppercase tracking-wider mt-0.5" style={{ color: accentColor }}>
                  {current.role} • {current.location}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <UserCheck className="h-4 w-4 text-[#b78622] dark:text-[#f5b544]" />
                <span>VERIFIED REVIEWS</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Interactive Author Selector Pins */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mr-2">
            Select Reviewer:
          </span>
          {testimonials.map((t, i) => {
            const isSelected = activeIndex === i;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/[0.05] dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                {t.name}
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
}
