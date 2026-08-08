'use client';

import { motion } from 'framer-motion';
import VisionMission from './VisionMission';
import WhatWeDo from './WhatWeDo';
import OurJourney from './OurJourney';
import Supporters from './Supporters';
import Achievements from './Achievements';
import AboutTestimonials from './AboutTestimonials';
import OurTeam from './OurTeam';
import Recognition from './Recognition';

/* ─────────────────────────────────────────────────────────────────────────────
   About Page — Body Assembly
   Assembles all 8 sections in order. Drop into any page shell.
   No header, navbar, or footer — those come from the app layout.
   ───────────────────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0B0F19] text-white selection:bg-[#f5b544]/30 selection:text-white">
      {/* Dynamic Animated Mesh Gradient Background */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#0B0F19]" />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute -top-[20%] left-[10%] h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(245,181,68,0.08),transparent_60%)] blur-[100px]"
        />
        <motion.div
          animate={{
            rotate: [0, -5, 5, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute right-[5%] top-[40%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.06),transparent_60%)] blur-[100px]"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute -bottom-[20%] left-[30%] h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(245,181,68,0.05),transparent_60%)] blur-[100px]"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-[0.2] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />

      {/* Sections */}
      <div className="relative z-10">
        <VisionMission />
        <WhatWeDo />
        <OurJourney />
        <Supporters />
        <Achievements />
        <AboutTestimonials />
        <OurTeam />
        <Recognition />
      </div>
    </div>
  );
}
