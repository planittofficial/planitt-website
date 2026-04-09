'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type HorizontalScreensSectionProps = {
  images: string[];
  title?: string;
};

export default function HorizontalScreensSection({ images, title }: HorizontalScreensSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgFarRef = useRef<HTMLDivElement | null>(null);
  const bgMidRef = useRef<HTMLDivElement | null>(null);
  const bgNearRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const innerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const zoomRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dimRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || images.length < 5) return;

    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const positions = {
        leftFar: -Math.min(760, Math.max(520, vw * 0.4)),
        leftNear: -Math.min(460, Math.max(300, vw * 0.24)),
        center: 0,
        rightNear: Math.min(460, Math.max(300, vw * 0.24)),
        rightFar: Math.min(760, Math.max(520, vw * 0.4)),
      };
      const cards = cardRefs.current;
      const inners = innerRefs.current;
      const zoomLayers = zoomRefs.current;
      const dimLayers = dimRefs.current;
      const screen1 = cards[0];
      const screen2 = cards[1];
      const screen3 = cards[2];
      const screen4 = cards[3];
      const screen5 = cards[4];

      if (!screen1 || !screen2 || !screen3 || !screen4 || !screen5) return;

      gsap.set(cards, {
        x: positions.center,
        y: 18,
        opacity: 0,
        scale: 0.82,
        rotateY: 0,
        rotateX: 0,
        rotateZ: 0,
        filter: 'blur(6px)',
        zIndex: 5,
        transformPerspective: 0,
      });
      gsap.set(inners, { scale: 1.06, yPercent: 3 });
      gsap.set(zoomLayers, { scale: 1 });
      gsap.set(dimLayers, { opacity: 0 });
      gsap.set(screen1, {
        x: positions.center,
        y: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        rotateZ: 0,
        filter: 'blur(0px)',
        zIndex: 40,
      });
      gsap.set(inners[0], { scale: 1, yPercent: 0 });
      gsap.set(titleRef.current, { opacity: 0.95, y: 0 });
      gsap.set(bgFarRef.current, { opacity: 0.34 });
      gsap.set(bgMidRef.current, { opacity: 0.26 });
      gsap.set(bgNearRef.current, { opacity: 0.2 });

      gsap.to(inners, {
        y: (i) => (i % 2 === 0 ? -7 : 7),
        duration: (i) => 3.2 + i * 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=270%',
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: [0, 0.2, 0.4, 0.6, 0.8, 1],
            delay: 0.04,
            duration: { min: 0.34, max: 0.56 },
            ease: 'power2.inOut',
          },
        },
      });

      tl.fromTo(
        bgFarRef.current,
        { yPercent: -12, scale: 1.08 },
        { yPercent: 10, scale: 1.02, ease: 'none' },
        0
      )
        .fromTo(
          bgMidRef.current,
          { yPercent: 8, scale: 1.04 },
          { yPercent: -8, scale: 1.1, ease: 'none' },
          0
        )
        .fromTo(
          bgNearRef.current,
          { yPercent: -5, scale: 1.02 },
          { yPercent: 6, scale: 1.12, ease: 'none' },
          0
        )

        // 1 moves left, 2 appears center.
        .to(
          screen1,
          {
            x: positions.leftFar,
            y: 4,
            scale: 0.82,
            opacity: 0.5,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            zIndex: 16,
            filter: 'blur(0px)',
            ease: 'power3.inOut',
            duration: 0.16,
          },
          0.08
        )
        .fromTo(
          screen2,
          { x: 180, y: -42, opacity: 0, scale: 0.78, rotateY: 0, rotateX: 0, zIndex: 36 },
          {
            x: positions.center,
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            zIndex: 40,
            filter: 'blur(0px)',
            ease: 'power3.out',
            duration: 0.18,
          },
          0.08
        )
        .to({}, { duration: 0.08 }, 0.29)

        // 2 moves left beside 1, 5 appears center.
        .to(
          screen2,
          {
            x: positions.leftNear,
            y: 4,
            scale: 0.86,
            opacity: 0.64,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            zIndex: 18,
            ease: 'power3.inOut',
            duration: 0.16,
          },
          0.46
        )
        .fromTo(
          screen5,
          { x: 190, y: 62, opacity: 0, scale: 0.78, rotateY: 0, rotateX: 0, zIndex: 37 },
          {
            x: positions.center,
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            zIndex: 40,
            filter: 'blur(0px)',
            ease: 'power3.out',
            duration: 0.18,
          },
          0.46
        )
        .to({}, { duration: 0.09 }, 0.64)

        // 5 moves rightmost, 4 appears center.
        .to(
          screen5,
          {
            x: positions.rightFar,
            y: 6,
            scale: 0.82,
            opacity: 0.5,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            zIndex: 16,
            ease: 'power3.inOut',
            duration: 0.16,
          },
          0.82
        )
        .fromTo(
          screen4,
          { x: 170, y: -92, opacity: 0, scale: 0.78, rotateY: 0, rotateX: 0, zIndex: 38 },
          {
            x: positions.center,
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            zIndex: 40,
            filter: 'blur(0px)',
            ease: 'power3.out',
            duration: 0.18,
          },
          0.82
        )
        .to({}, { duration: 0.08 }, 1.0)

        // 4 moves beside 5, 3 appears center and stays.
        .to(
          screen4,
          {
            x: positions.rightNear,
            y: 4,
            scale: 0.86,
            opacity: 0.64,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            zIndex: 18,
            ease: 'power3.inOut',
            duration: 0.16,
          },
          1.14
        )
        .fromTo(
          screen3,
          { x: 0, y: 120, opacity: 0, scale: 0.75, rotateY: 0, rotateX: 0, zIndex: 39 },
          {
            x: positions.center,
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            zIndex: 42,
            filter: 'blur(0px)',
            ease: 'power3.out',
            duration: 0.2,
          },
          1.14
        )
        .to({}, { duration: 0.18 }, 1.36);

      const removeHoverListeners: Array<() => void> = [];
      cards.forEach((card, index) => {
        if (!card) return;

        const onEnter = () => {
          cards.forEach((_, i) => {
            gsap.to(dimLayers[i], {
              opacity: i === index ? 0 : 0.52,
              duration: 0.36,
              ease: 'power3.out',
              overwrite: 'auto',
            });
            gsap.to(zoomLayers[i], {
              scale: i === index ? 1.08 : 0.96,
              y: i === index ? -4 : 0,
              duration: 0.42,
              ease: i === index ? 'expo.out' : 'power3.out',
              overwrite: 'auto',
            });
            gsap.to(cards[i], {
              zIndex: i === index ? 70 : 12,
              duration: 0.2,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          });
        };

        const onLeave = () => {
          cards.forEach((_, i) => {
            gsap.to(dimLayers[i], {
              opacity: 0,
              duration: 0.34,
              ease: 'power3.out',
              overwrite: 'auto',
            });
            gsap.to(zoomLayers[i], {
              scale: 1,
              y: 0,
              duration: 0.42,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          });
        };

        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
        card.addEventListener('focusin', onEnter);
        card.addEventListener('focusout', onLeave);

        removeHoverListeners.push(() => {
          card.removeEventListener('mouseenter', onEnter);
          card.removeEventListener('mouseleave', onLeave);
          card.removeEventListener('focusin', onEnter);
          card.removeEventListener('focusout', onLeave);
        });
      });

      return () => {
        removeHoverListeners.forEach((remove) => remove());
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, [images]);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black">
      <div
        ref={bgFarRef}
        className="absolute inset-[-14%] bg-[radial-gradient(circle_at_16%_20%,rgba(168,85,247,0.18),transparent_34%),radial-gradient(circle_at_85%_74%,rgba(14,165,233,0.14),transparent_40%),linear-gradient(180deg,#030303_0%,#050505_48%,#020202_100%)]"
      />
      <div
        ref={bgMidRef}
        className="pointer-events-none absolute inset-[-12%] bg-[radial-gradient(circle_at_22%_72%,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_72%_28%,rgba(236,72,153,0.16),transparent_36%)]"
      />
      <div
        ref={bgNearRef}
        className="pointer-events-none absolute inset-[-10%] bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.18),transparent_62%)]"
      />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        {title ? (
          <p
            ref={titleRef}
            className="pointer-events-none absolute top-14 text-center text-xs font-medium uppercase tracking-[0.35em] text-white/75"
          >
            {title}
          </p>
        ) : null}

        <div className="relative h-[72vh] w-full max-w-[1750px]">
          {images.slice(0, 5).map((image, index) => (
            <div
              key={`${image}-${index}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="absolute left-1/2 top-1/2 h-[72vh] w-[min(82vw,340px)] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-[2.6rem] border border-white/15 bg-zinc-950 p-3 shadow-[0_0_45px_rgba(14,165,233,0.2)] [transform:rotate(0deg)]"
            >
              <div className="pointer-events-none absolute inset-[-10%] -z-10 rounded-[3rem] bg-[radial-gradient(circle,rgba(56,189,248,0.32),transparent_62%)] blur-xl" />
              <div
                ref={(el) => {
                  innerRefs.current[index] = el;
                }}
                className="relative h-full overflow-hidden rounded-[2rem] bg-black"
              >
                <div
                  ref={(el) => {
                    zoomRefs.current[index] = el;
                  }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={image}
                    alt={`App screen ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 82vw, 340px"
                    className="object-cover [transform:rotate(0deg)]"
                    priority={index === 0}
                  />
                </div>
                <div
                  ref={(el) => {
                    dimRefs.current[index] = el;
                  }}
                  className="pointer-events-none absolute inset-0 bg-black/65"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,transparent_24%,rgba(255,255,255,0.36)_50%,transparent_76%)] mix-blend-screen opacity-30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
