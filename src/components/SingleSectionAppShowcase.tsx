'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ScreenItem = {
  image: string;
  title: string;
};

const screens: ScreenItem[] = [
  { image: '/screens/screen1.png', title: 'Home Feed' },
  { image: '/screens/screen2.png', title: 'Insights Panel' },
  { image: '/screens/screen3.png', title: 'Portfolio View' },
  { image: '/screens/screen4.png', title: 'Market Watch' },
];

export default function SingleSectionAppShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgFarRef = useRef<HTMLDivElement | null>(null);
  const bgNearRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const headingWrapRef = useRef<HTMLDivElement | null>(null);
  const screenRefs = useRef<Array<HTMLDivElement | null>>([]);
  const titleRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(screenRefs.current, { opacity: 0, y: 45, scale: 0.92, rotateY: 8, rotateX: 3 });
      gsap.set(screenRefs.current[0], { opacity: 1, y: 0, scale: 1, rotateY: 0, rotateX: 0 });
      gsap.set(titleRefs.current, { opacity: 0, y: 12 });
      gsap.set(titleRefs.current[0], { opacity: 1, y: 0 });

      const steps = screens.length - 1;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${120 + steps * 85}%`,
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        bgFarRef.current,
        { yPercent: -10, scale: 1.08, opacity: 0.2 },
        { yPercent: 11, scale: 1, opacity: 0.42, ease: 'none' },
        0
      )
        .fromTo(
          bgNearRef.current,
          { yPercent: 8, scale: 1.04, opacity: 0.28 },
          { yPercent: -10, scale: 1.12, opacity: 0.58, ease: 'none' },
          0
        )
        .fromTo(
          phoneRef.current,
          { opacity: 0, y: 95, scale: 0.82, rotateX: 10, rotateY: -12, transformPerspective: 1400 },
          { opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0, duration: 0.32, ease: 'expo.out' },
          0.05
        )
        .fromTo(
          headingWrapRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' },
          0.07
        );

      for (let i = 0; i < steps; i += 1) {
        const currentScreen = screenRefs.current[i];
        const nextScreen = screenRefs.current[i + 1];
        const currentTitle = titleRefs.current[i];
        const nextTitle = titleRefs.current[i + 1];
        const base = 0.32 + i * 0.24;

        // Middle transition uses a flip-style handoff.
        if (i === 1) {
          tl.to(currentScreen, { opacity: 0, rotateY: 85, scale: 1.03, duration: 0.14, ease: 'power2.in' }, base)
            .fromTo(
              nextScreen,
              { opacity: 0, rotateY: -90, scale: 0.96, y: 0 },
              { opacity: 1, rotateY: 0, scale: 1, y: 0, duration: 0.16, ease: 'power2.out' },
              base + 0.14
            );
        } else {
          tl.to(
            currentScreen,
            {
              opacity: 0,
              y: -36,
              scale: 1.04,
              rotateY: i % 2 === 0 ? -11 : 11,
              duration: 0.13,
              ease: 'power2.inOut',
            },
            base
          ).fromTo(
            nextScreen,
            {
              opacity: 0,
              y: 38,
              scale: 0.92,
              rotateY: i % 2 === 0 ? 11 : -11,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateY: 0,
              duration: 0.16,
              ease: 'expo.out',
            },
            base + 0.11
          );
        }

        tl.to(currentTitle, { opacity: 0, y: -10, duration: 0.1, ease: 'power2.out' }, base)
          .fromTo(nextTitle, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.14, ease: 'power2.out' }, base + 0.11)
          .to({}, { duration: 0.08 }, base + 0.19);
      }

      tl.to(
        phoneRef.current,
        { opacity: 0, y: -70, scale: 1.03, rotateY: 8, duration: 0.2, ease: 'power3.inOut' },
        0.92
      ).to(headingWrapRef.current, { opacity: 0, y: -14, duration: 0.16, ease: 'power2.inOut' }, 0.93);
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black">
      <div
        ref={bgFarRef}
        className="absolute inset-[-12%] bg-[radial-gradient(circle_at_16%_25%,rgba(56,189,248,0.2),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.14),transparent_38%),linear-gradient(180deg,#020202_0%,#050505_45%,#020202_100%)]"
      />
      <div
        ref={bgNearRef}
        className="pointer-events-none absolute inset-[-12%] bg-[radial-gradient(circle_at_50%_48%,rgba(14,165,233,0.18),transparent_60%)]"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <div ref={headingWrapRef} className="mb-8 h-10">
          {screens.map((screen, index) => (
            <p
              key={screen.title}
              ref={(el) => {
                titleRefs.current[index] = el;
              }}
              className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap text-xs font-medium uppercase tracking-[0.34em] text-white/78"
            >
              {screen.title}
            </p>
          ))}
        </div>

        <div
          ref={phoneRef}
          className="relative h-[76vh] w-[min(86vw,360px)] rounded-[2.8rem] border border-white/15 bg-zinc-950 p-3 shadow-[0_0_60px_rgba(56,189,248,0.24)]"
        >
          <div className="absolute left-1/2 top-3 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black/70" />

          <div className="relative h-full overflow-hidden rounded-[2.2rem] bg-black [transform-style:preserve-3d]">
            {screens.map((screen, index) => (
              <div
                key={screen.image}
                ref={(el) => {
                  screenRefs.current[index] = el;
                }}
                className="absolute inset-0"
              >
                <Image
                  src={screen.image}
                  alt={screen.title}
                  fill
                  sizes="(max-width: 768px) 86vw, 360px"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,transparent_20%,rgba(255,255,255,0.2)_48%,transparent_80%)] mix-blend-screen opacity-35" />
          </div>
        </div>
      </div>
    </section>
  );
}
