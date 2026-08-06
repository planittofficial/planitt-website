'use client';

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
    <div className="min-h-screen overflow-x-hidden bg-[#0B0F19] text-white">
      {/* Subtle background grid */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#0B0F19]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(245,181,68,0.08),transparent_30%),radial-gradient(circle_at_85%_14%,rgba(124,92,255,0.06),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(245,181,68,0.05),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:110px_110px] opacity-[0.15]" />

      <VisionMission />
      <WhatWeDo />
      <OurJourney />
      <Supporters />
      <Achievements />
      <AboutTestimonials />
      <OurTeam />
      <Recognition />
    </div>
  );
}
