'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type FlipScreenSectionProps = {
  frontImage: string;
  backImage: string;
  title?: string;
};

export default function FlipScreenSection({ frontImage, backImage, title }: FlipScreenSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const frontRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(backRef.current, { rotateY: -180 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=125%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        bgRef.current,
        { yPercent: -8, opacity: 0.3 },
        { yPercent: 12, opacity: 0.55, ease: 'none' },
        0
      )
        .fromTo(
          wrapperRef.current,
          { opacity: 0, y: 88, scale: 0.82, rotateX: 10, transformPerspective: 1400 },
          { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.3, ease: 'expo.out' },
          0.12
        )
        .to(wrapperRef.current, { rotateY: 190, duration: 0.3, ease: 'power2.inOut' }, 0.42)
        .to({}, { duration: 0.12 }, 0.65)
        .to(wrapperRef.current, { opacity: 0, y: -64, scale: 1.03, duration: 0.24, ease: 'power3.inOut' }, 0.76);
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black">
      <div
        ref={bgRef}
        className="absolute inset-[-12%] bg-[radial-gradient(circle_at_22%_30%,rgba(14,165,233,0.16),transparent_36%),radial-gradient(circle_at_80%_72%,rgba(244,63,94,0.15),transparent_40%),linear-gradient(180deg,#030303_0%,#050505_50%,#020202_100%)]"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        {title ? <p className="mb-7 text-xs font-medium uppercase tracking-[0.35em] text-white/75">{title}</p> : null}

        <div className="relative h-[75vh] w-[min(86vw,360px)] [perspective:1500px]">
          <div
            ref={wrapperRef}
            className="relative h-full w-full rounded-[2.8rem] border border-white/15 bg-zinc-950 p-3 shadow-[0_0_60px_rgba(125,211,252,0.2)] [transform-style:preserve-3d]"
          >
            <div ref={frontRef} className="absolute inset-3 rounded-[2.2rem] bg-black [backface-visibility:hidden]">
              <Image src={frontImage} alt="App screen front" fill sizes="(max-width: 768px) 86vw, 360px" className="rounded-[2.2rem] object-cover" />
            </div>

            <div
              ref={backRef}
              className="absolute inset-3 rounded-[2.2rem] bg-black [backface-visibility:hidden] [transform:rotateY(180deg)]"
            >
              <Image src={backImage} alt="App screen back" fill sizes="(max-width: 768px) 86vw, 360px" className="rounded-[2.2rem] object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
