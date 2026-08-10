'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap, Briefcase, Quote, Star, Sparkles, UserCheck } from 'lucide-react';
import React from 'react';
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
  { key: 'courses', label: 'Courses & Academy', icon: GraduationCap },
  { key: 'services', label: 'Technical & Advisory Services', icon: Briefcase },
];

export default function AboutTestimonials() {
  const [activeTrack, setActiveTrack] = useState<Track>('courses');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const testimonials = activeTrack === 'courses' ? coursesTestimonials : servicesTestimonials;
  const current = testimonials[activeIndex] || testimonials[0];
  const accentColor = activeTrack === 'courses' ? '#7C5CFF' : '#f5b544';

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
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Real Stories From{' '}
            <span className="bg-gradient-to-r from-[#f5b544] via-[#f7c86e] to-[#7C5CFF] bg-clip-text text-transparent">
              Our Community.
            </span>
          </h2>
        </div>

        {/* Track Control Switcher */}
        <div className="relative inline-flex shrink-0 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md">
          {tracks.map((t) => {
            const isActive = activeTrack === t.key;
            return (
              <button
                key={t.key}
                onClick={() => {
                  setActiveTrack(t.key);
                  setActiveIndex(0);
                }}
                className={`relative z-10 flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
                  isActive ? 'text-[#0B0F19]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTrackPill"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{
                      background: t.key === 'courses'
                        ? 'linear-gradient(90deg, #7C5CFF, #9a82ff)'
                        : 'linear-gradient(90deg, #f5b544, #f7c86e)',
                    }}
                    transition={springSmooth}
                  />
                )}
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Quote Spotlight Composition */}
      <motion.div variants={revealItem} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-14 backdrop-blur-xl">
        {/* Oversized Background Quote Watermark */}
        <div className="pointer-events-none absolute -left-6 -top-6 text-white/[0.03] select-none">
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
            <blockquote className="text-2xl font-serif italic text-white sm:text-3xl lg:text-4xl leading-relaxed">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Author Metadata Bar */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">{current.name}</h3>
                <p className="text-xs font-bold uppercase tracking-wider mt-0.5" style={{ color: accentColor }}>
                  {current.role} • {current.location}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <UserCheck className="h-4 w-4 text-[#f5b544]" />
                <span>VERIFIED REVIEWS</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Interactive Author Selector Pins */}
        <div className="mt-10 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mr-2">
            Select Reviewer:
          </span>
          {testimonials.map((t, i) => {
            const isSelected = activeIndex === i;
            return (
              <MagneticWrapper key={t.id} strength={0.15}>
                <button
                  onClick={() => setActiveIndex(i)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    isSelected
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'bg-white/[0.02] text-slate-400 hover:text-white border border-transparent'
                  }`}
                >
                  {t.name}
                </button>
              </MagneticWrapper>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
}
