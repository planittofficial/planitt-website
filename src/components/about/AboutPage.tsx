'use client';

import VisionMission from './VisionMission';
import WhatWeDo from './WhatWeDo';
import OurJourney from './OurJourney';
import Supporters from './Supporters';
import Achievements from './Achievements';
import AboutTestimonials from './AboutTestimonials';
import OurTeam from './OurTeam';
import Recognition from './Recognition';
import { BackgroundGeometry } from './about-shared';

/* ─────────────────────────────────────────────────────────────────────────────
   About Page — Layered Atmospheric Background & Section Composition
   ───────────────────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0B0F19] text-white selection:bg-[#f5b544]/30 selection:text-white">
      {/* 1. Base Layer */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[#0B0F19]" />

      {/* 2. Atmospheric Lighting & Radial Gradients */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        {/* Warm Gold Top-Left Glow */}
        <div className="absolute -top-[15%] -left-[10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(245,181,68,0.07)_0%,rgba(11,15,25,0)_70%)] blur-[100px]" />

        {/* Deep Violet Secondary Atmosphere (Center Right) */}
        <div className="absolute top-[35%] -right-[15%] h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.05)_0%,rgba(11,15,25,0)_70%)] blur-[120px]" />

        {/* Muted Gold Accent Glow (Bottom Left) */}
        <div className="absolute -bottom-[10%] left-[20%] h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(245,181,68,0.04)_0%,rgba(11,15,25,0)_70%)] blur-[100px]" />
      </div>

      {/* 3. Financial Geometry Overlay */}
      <BackgroundGeometry className="-z-10" />

      {/* 4. Technical Micro-Grid Pattern & Vignette */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]" />

      {/* Soft Perimeter Vignette */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(11,15,25,0.8)_100%)]" />

      {/* Page Sections */}
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
