'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { GraduationCap, Briefcase, Quote, Star } from 'lucide-react';
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
   Section 6 — Testimonials (About Page variant)
   ───────────────────────────────────────────────────────────────────────────── */

type Track = 'courses' | 'services';

interface TestimonialCard {
  quote: string;
  name: string;
  role: string;
  location: string;
}

const coursesTestimonials: TestimonialCard[] = [
  {
    quote: 'The algorithmic trading course completely changed my approach to the markets. The practical, hands-on sessions helped me build and deploy my first automated strategy within weeks.',
    name: 'Arjun Mehta',
    role: 'Algorithmic Trading Masterclass',
    location: 'Delhi',
  },
  {
    quote: 'I came in with zero background in finance. The instructors break down complex concepts into digestible pieces. I now feel confident managing my own diverse portfolio.',
    name: 'Sneha Patel',
    role: 'Personal Finance Fundamentals',
    location: 'Ahmedabad',
  },
  {
    quote: 'The full-stack development bootcamp at Planitt Academy gave me the exact skills I needed to pivot my career. The mentorship and real-world projects were invaluable.',
    name: 'Karan Desai',
    role: 'Full-Stack Web Development',
    location: 'Pune',
  },
];

const servicesTestimonials: TestimonialCard[] = [
  {
    quote: 'The Bhav app revolutionized how we track bullion investments. The real-time market updates and secure payment integration have streamlined our operations significantly.',
    name: 'Vipin Soni',
    role: 'Bhav App',
    location: 'India',
  },
  {
    quote: 'Working with Planitt Solutions was a game-changer for our e-commerce platform. They delivered a seamless shopping experience with robust payment systems.',
    name: 'Mohak Wankhede',
    role: 'Zeynix.Co',
    location: 'India',
  },
  {
    quote: 'The Krypsm platform showcases Planitt mastery of complex financial applications. Their implementation of advanced security measures has given us a competitive edge.',
    name: 'Mubashshir Ali',
    role: 'Krypsm',
    location: 'India',
  },
  {
    quote: 'Piyush helped me start my SIP journey 3 years ago. I built a corpus through disciplined investing and structured guidance.',
    name: 'Priya Sharma',
    role: 'School Teacher',
    location: 'Mumbai',
  },
  {
    quote: 'I was confused about planning. The team gave me a clear roadmap across insurance, mutual funds, and retirement planning.',
    name: 'Rajesh Kumar',
    role: 'Software Engineer',
    location: 'Bangalore',
  },
  {
    quote: 'The balance of growth and safety in my portfolio was exactly what I needed. The advisory quality has been consistent.',
    name: 'Amit Singh',
    role: 'Business Owner',
    location: 'Pune',
  },
];

const tracks: { key: Track; label: string; icon: React.ElementType }[] = [
  { key: 'courses', label: 'Courses & Academy', icon: GraduationCap },
  { key: 'services', label: 'Technical & Financial', icon: Briefcase },
];

function TestimonialCard({ t, activeTrack, index }: { t: TestimonialCard; activeTrack: Track; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isCourses = activeTrack === 'courses';
  const accentColor = isCourses ? 'rgba(124, 92, 255,' : 'rgba(245, 181, 68,';
  const hexColor = isCourses ? '#7C5CFF' : '#f5b544';

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={cardHover}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-2xl transition-colors duration-500 hover:border-white/20"
    >
      {/* Dynamic Hover Background Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${accentColor} 0.15),
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
              250px circle at ${mouseX}px ${mouseY}px,
              ${accentColor} 0.5),
              transparent 40%
            )
          `,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />

      {/* Decorative gradient */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-[40px] opacity-40 transition-opacity duration-500 group-hover:opacity-60" style={{ backgroundColor: hexColor }} />

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Quote icon */}
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl shadow-inner ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110" style={{ backgroundColor: `${accentColor} 0.1)` }}>
          <Quote className="h-6 w-6" style={{ color: hexColor }} />
        </div>

        {/* Quote text */}
        <p className="flex-1 text-base italic leading-relaxed text-slate-300 transition-colors duration-300 group-hover:text-white">
          &ldquo;{t.quote}&rdquo;
        </p>

        {/* Stars */}
        <div className="mt-8 flex gap-1.5">
          {Array.from({ length: 5 }).map((_, s) => (
            <Star key={s} className="h-4 w-4" style={{ fill: hexColor, color: hexColor }} />
          ))}
        </div>

        {/* Attribution */}
        <div className="mt-5 border-t border-white/10 pt-5">
          <p className="text-base font-semibold tracking-tight text-white">{t.name}</p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: hexColor }}>{t.role}</p>
          <p className="mt-1 text-xs text-slate-500 transition-colors duration-300 group-hover:text-slate-400">{t.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutTestimonials() {
  const [active, setActive] = useState<Track>('courses');
  const testimonials = active === 'courses' ? coursesTestimonials : servicesTestimonials;

  return (
    <motion.section
      id="about-testimonials"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Header */}
      <motion.div variants={revealItem} className="relative z-10 mx-auto max-w-3xl text-center">
        <p className={eyebrow}>What People Say</p>
        <h2 className={sectionHeading}>Testimonials</h2>
        <p className="mt-6 max-w-2xl mx-auto text-base leading-relaxed text-slate-400 sm:text-lg">
          Hear from our students, learners, and service clients about their experience with Planitt.
        </p>
      </motion.div>

      {/* Segmented Control Toggle */}
      <motion.div variants={revealItem} className="relative z-10 mx-auto mt-12 flex max-w-md items-center justify-center">
        <div className="relative inline-flex rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-2xl shadow-xl">
          {tracks.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300
                ${active === t.key ? 'text-[#0B0F19]' : 'text-slate-400 hover:text-white'}
              `}
            >
              {active === t.key && (
                <motion.div
                  layoutId="active-testimonial-pill"
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{
                    background: t.key === 'courses' 
                      ? 'linear-gradient(90deg, #7C5CFF, #9a82ff)' 
                      : 'linear-gradient(90deg, #f5b544, #f7c86e)'
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Testimonial cards */}
      <div className="relative z-10 mx-auto mt-16 max-w-7xl min-h-[400px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.map((t, i) => (
              <motion.div key={i} className="h-full">
                <TestimonialCard t={t} activeTrack={active} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
