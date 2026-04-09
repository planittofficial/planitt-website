'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AppScreenSectionProps = {
  image: string;
  title?: string;
  priority?: boolean;
  index: number;
};

export default function AppScreenSection({ image, title, priority = false, index }: AppScreenSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgLayerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=115%',
          scrub: 0.55,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        bgLayerRef.current,
        { yPercent: -10, scale: 1.1, opacity: 0.25 },
        { yPercent: 10, scale: 1, opacity: 0.5, ease: 'none' },
        0
      )
        .fromTo(
          glowRef.current,
          { opacity: 0.25, scale: 0.8 },
          { opacity: 0.6, scale: 1.15, ease: 'none' },
          0
        )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 24 },
          { opacity: 0.9, y: 0, duration: 0.25, ease: 'power2.out' },
          0.08
        )
        .fromTo(
          phoneRef.current,
          {
            opacity: 0,
            scale: 0.8,
            y: 110,
            rotateX: 14,
            rotateY: index % 2 === 0 ? -16 : 16,
            transformPerspective: 1400,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.35,
            ease: 'expo.out',
          },
          0.12
        )
        .to(
          phoneRef.current,
          {
            opacity: 0,
            scale: 1.06,
            y: -75,
            rotateY: index % 2 === 0 ? 10 : -10,
            duration: 0.26,
            ease: 'power3.inOut',
          },
          0.79
        )
        .to(
          headingRef.current,
          { opacity: 0, y: -14, duration: 0.2, ease: 'power2.inOut' },
          0.8
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, [index]);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black">
      <div
        ref={bgLayerRef}
        className="absolute inset-[-10%] bg-[radial-gradient(circle_at_20%_25%,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_80%_75%,rgba(236,72,153,0.16),transparent_36%),linear-gradient(180deg,#030303_0%,#050505_50%,#020202_100%)]"
      />

      <div ref={glowRef} className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.2),transparent_58%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        {title ? (
          <p
            ref={headingRef}
            className="mb-7 text-center text-xs font-medium uppercase tracking-[0.35em] text-white/75"
          >
            {title}
          </p>
        ) : null}

        <div
          ref={phoneRef}
          className="relative h-[75vh] w-[min(86vw,360px)] rounded-[2.8rem] border border-white/15 bg-zinc-950 p-3 shadow-[0_0_55px_rgba(56,189,248,0.24)]"
        >
          <div className="absolute left-1/2 top-3 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black/70" />
          <div className="relative h-full overflow-hidden rounded-[2.2rem] bg-black">
            <Image
              src={image}
              alt={title ?? 'App screen'}
              fill
              sizes="(max-width: 768px) 86vw, 360px"
              className="object-cover"
              priority={priority}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,transparent_20%,rgba(255,255,255,0.2)_48%,transparent_80%)] mix-blend-screen opacity-35" />
          </div>
        </div>
      </div>
    </section>
  );
}
