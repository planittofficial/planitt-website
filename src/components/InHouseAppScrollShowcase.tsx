'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const slides = [
  {
    title: 'Portfolio Dashboard',
    copy: 'A unified in-house dashboard to monitor performance, positions, and portfolio movement in one place.',
    image: '/1.jpg.jpeg',
  },
  {
    title: 'Opportunity Scanner',
    copy: 'Signal-first layout designed to surface high-priority opportunities with less noise and faster decision flow.',
    image: '/2.jpg.jpeg',
  },
  {
    title: 'Execution Layer',
    copy: 'A clean action surface for order context, confirmations, and rapid execution with better clarity.',
    image: '/3.jpg.jpeg',
  },
  {
    title: 'Watchlists & Alerts',
    copy: 'Structured watchlists with focused alerting to track momentum, risk, and critical market triggers.',
    image: '/4.jpg.jpeg',
  },
  {
    title: 'Analytics Snapshot',
    copy: 'Visual reporting blocks for trend interpretation, risk overview, and strategic follow-up planning.',
    image: '/5.jpg.jpeg',
  },
];

type InHouseAppScrollShowcaseProps = {
  theme?: 'dark' | 'light';
};

export default function InHouseAppScrollShowcase({ theme = 'light' }: InHouseAppScrollShowcaseProps) {
  const dark = theme === 'dark';
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeRef = useRef(0);
  const cooldownRef = useRef(0);
  const wheelAccumRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth < 768) return;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const lockTop = window.innerHeight * 0.2;
      const lockBottom = window.innerHeight * 0.8;
      const inLockZone = rect.top <= lockTop && rect.bottom >= lockBottom;
      if (!inLockZone) return;

      const now = performance.now();
      const delta = event.deltaY;
      const atFirst = activeRef.current === 0;
      const atLast = activeRef.current === slides.length - 1;

      // Release lock when user tries to scroll out of the section bounds.
      if ((atLast && delta > 0) || (atFirst && delta < 0)) {
        wheelAccumRef.current = 0;
        return;
      }

      event.preventDefault();
      if (now - cooldownRef.current < 320) return;

      wheelAccumRef.current += delta;
      const THRESHOLD = 40;

      if (wheelAccumRef.current > THRESHOLD && !atLast) {
        cooldownRef.current = now;
        wheelAccumRef.current = 0;
        setActive((v) => Math.min(v + 1, slides.length - 1));
      } else if (wheelAccumRef.current < -THRESHOLD && !atFirst) {
        cooldownRef.current = now;
        wheelAccumRef.current = 0;
        setActive((v) => Math.max(v - 1, 0));
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel as EventListener);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className={`relative hidden h-screen overflow-hidden rounded-[2rem] border md:block ${
          dark
            ? 'border-cyan-900/45 bg-[radial-gradient(circle_at_16%_10%,rgba(14,165,233,0.24),transparent_35%),radial-gradient(circle_at_84%_86%,rgba(34,211,238,0.2),transparent_38%),linear-gradient(180deg,#06101a_0%,#081522_45%,#091321_100%)]'
            : 'border-sky-200/60 bg-[radial-gradient(circle_at_16%_10%,rgba(56,189,248,0.2),transparent_35%),radial-gradient(circle_at_84%_86%,rgba(34,211,238,0.16),transparent_38%),linear-gradient(180deg,#f5fbff_0%,#eaf6ff_45%,#f4fbff_100%)]'
        }`}
      >
        <motion.div
          animate={{ y: active % 2 === 0 ? -8 : 10 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className={`pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full blur-3xl ${dark ? 'bg-cyan-500/18' : 'bg-cyan-300/24'}`}
        />
        <motion.div
          animate={{ y: active % 2 === 0 ? 12 : -10 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className={`pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full blur-3xl ${dark ? 'bg-sky-500/16' : 'bg-sky-300/24'}`}
        />

        <motion.div
          initial={false}
          animate={{ opacity: active > 0 ? 1 : 0, y: active > 0 ? 0 : 10 }}
          transition={{ duration: 0.35 }}
          className="pointer-events-none absolute left-1/2 top-5 z-30 w-[min(92%,760px)] -translate-x-1/2 rounded-2xl border border-cyan-300/25 bg-slate-950/45 px-5 py-3 text-center backdrop-blur"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/90">In-House App Experience</p>
          <h3 className="mt-1 text-xl font-bold text-white">Product Interface Preview</h3>
        </motion.div>

        <div className="mx-auto grid h-full w-full max-w-[1400px] grid-cols-[0.95fr_1.05fr] items-center gap-8 px-8 lg:px-10">
          <div className="space-y-7 self-center">
            <div>
              <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.24em] ${dark ? 'text-cyan-300' : 'text-sky-700'}`}>In-House App Experience</p>
              <h3 className={`font-heading text-4xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Scroll to Preview Our Product Interface</h3>
              <p className={`mt-4 max-w-xl text-lg leading-relaxed ${dark ? 'text-slate-300' : 'text-gray-600'}`}>
                This section is locked while animations play. Keep scrolling to move through screens.
              </p>
            </div>

            <div className="relative h-[220px] [perspective:1000px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`card-${active}`}
                  initial={{ opacity: 0, rotateY: 80 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -80 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute inset-0 rounded-2xl border p-5 ${dark ? 'border-cyan-500/45 bg-[#0b1a2b]/90' : 'border-sky-300 bg-white/92'}`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Screen {active + 1}</p>
                  <h4 className={`mt-2 text-2xl font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{slides[active].title}</h4>
                  <p className={`mt-3 text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-gray-600'}`}>{slides[active].copy}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-2">
              {slides.map((slide, i) => (
                <div key={slide.title} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= active ? 'bg-cyan-400' : dark ? 'bg-slate-700' : 'bg-slate-300'}`} />
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center self-center">
            <div className={`pointer-events-none absolute inset-0 rounded-[2rem] blur-2xl ${dark ? 'bg-[radial-gradient(circle,rgba(34,211,238,0.32),transparent_62%)]' : 'bg-[radial-gradient(circle,rgba(56,189,248,0.26),transparent_62%)]'}`} />

            <motion.div
              animate={{ rotateZ: active % 2 === 0 ? -1.2 : 1.2, y: active % 2 === 0 ? 4 : -4 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[72vh] w-[340px] rounded-[2.7rem] border border-slate-300/70 bg-slate-900 p-3 shadow-[0_24px_70px_-25px_rgba(2,6,23,0.86)]"
            >
              <div className="absolute left-1/2 top-3 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-slate-800" />
              <div className="relative h-full overflow-hidden rounded-[2rem] bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`screen-${active}`}
                    initial={{ opacity: 0, scale: 0.97, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.03, y: -18 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={slides[active].image} alt={slides[active].title} fill sizes="340px" className="object-cover" priority={active === 0} />
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  animate={{ x: active % 2 === 0 ? -10 : 10 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,transparent_18%,rgba(255,255,255,0.24)_48%,transparent_80%)] mix-blend-screen opacity-35"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="md:hidden">
        <div className="mb-6 text-center">
          <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.24em] ${dark ? 'text-cyan-300' : 'text-sky-700'}`}>In-House App Experience</p>
          <h3 className={`font-heading text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Application Screens</h3>
          <p className={`mt-2 text-sm ${dark ? 'text-slate-300' : 'text-gray-600'}`}>A quick look at our in-house product interface.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {slides.map((slide, index) => (
            <div key={slide.title} className={`overflow-hidden rounded-2xl border shadow-sm ${dark ? 'border-gray-800 bg-[#0b1523]' : 'border-gray-200 bg-white'}`}>
              <div className="relative h-80 w-full">
                <Image src={slide.image} alt={slide.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="px-4 py-3">
                <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${dark ? 'text-cyan-300' : 'text-sky-700'}`}>Screen {index + 1}</p>
                <p className={`mt-1 text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{slide.title}</p>
                <p className={`mt-1 text-xs ${dark ? 'text-slate-300' : 'text-gray-600'}`}>{slide.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
