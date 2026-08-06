'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap, Briefcase, Quote, Star } from 'lucide-react';
import {
  sectionShell,
  eyebrow,
  sectionHeading,
  glassCard,
  goldHover,
  revealSection,
  revealItem,
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

export default function AboutTestimonials() {
  const [active, setActive] = useState<Track>('courses');
  const testimonials = active === 'courses' ? coursesTestimonials : servicesTestimonials;

  return (
    <motion.section
      id="about-testimonials"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealSection}
      className={sectionShell}
    >
      {/* Header */}
      <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
        <p className={eyebrow}>What People Say</p>
        <h2 className={sectionHeading}>Testimonials</h2>
        <p className="mt-4 max-w-2xl mx-auto text-sm leading-6 text-slate-400 sm:text-base">
          Hear from our students, learners, and service clients about their experience with Planitt.
        </p>
      </motion.div>

      {/* Track toggle */}
      <motion.div variants={revealItem} className="mx-auto mt-10 flex max-w-md items-center justify-center">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
          {tracks.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300
                ${active === t.key
                  ? 'bg-gradient-to-r from-[#f5b544]/90 to-[#f7c86e]/80 text-[#0B0F19] shadow-[0_8px_30px_rgba(245,181,68,0.3)]'
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Testimonial cards */}
      <div className="mt-12 min-h-[360px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid gap-6 md:grid-cols-3"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className={`${glassCard} ${goldHover} relative flex flex-col overflow-hidden p-7`}
              >
                {/* Decorative gradient */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#f5b544]/5 blur-3xl" />

                <div className="relative flex flex-1 flex-col">
                  {/* Quote icon */}
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5b544]/10">
                    <Quote className="h-5 w-5 text-[#f7c86e]" />
                  </div>

                  {/* Quote text */}
                  <p className="flex-1 text-sm italic leading-7 text-slate-300">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Stars */}
                  <div className="mt-5 flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-[#f5b544] text-[#f5b544]" />
                    ))}
                  </div>

                  {/* Attribution */}
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="mt-0.5 text-xs text-[#f7c86e]/80">{t.role}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
