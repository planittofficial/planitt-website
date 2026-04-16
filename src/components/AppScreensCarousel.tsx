'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

type AppScreensCarouselProps = {
  images: string[];
  title?: string;
  subtitle?: string;
};

const cardReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function AppScreensCarousel({
  images,
  title = 'App Screens Showcase',
  subtitle = 'Swipe through a product-style preview of the Planitt mobile experience.',
}: AppScreensCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (direction: 'left' | 'right') => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const card = scroller.querySelector<HTMLElement>('[data-carousel-card]');
    const scrollAmount = card ? card.offsetWidth + 24 : scroller.clientWidth * 0.8;

    scroller.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] px-4 py-10 backdrop-blur-2xl sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,92,255,0.16),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(34,211,238,0.12),transparent_34%)]" />

      <div className="relative z-10 mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <motion.div variants={cardReveal} className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-[#c9bcff]">
            Product screens
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">{subtitle}</p>
        </motion.div>

        <motion.div variants={cardReveal} className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollByCard('left')}
            aria-label="Scroll screenshots left"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur transition duration-300 hover:scale-105 hover:border-[#7C5CFF]/30 hover:bg-white/15"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard('right')}
            aria-label="Scroll screenshots right"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur transition duration-300 hover:scale-105 hover:border-[#7C5CFF]/30 hover:bg-white/15"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      </div>

      <motion.div
        ref={scrollerRef}
        variants={stagger}
        className="relative z-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[calc(50%-min(76vw,180px))] pb-4 pt-2 [scrollbar-width:none] sm:gap-6 sm:px-[calc(50%-190px)] lg:px-[calc(50%-210px)] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <motion.article
            key={image}
            data-carousel-card
            variants={cardReveal}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 24px 70px rgba(124,92,255,0.18)',
            }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="group relative min-w-[min(76vw,360px)] snap-center rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-2xl sm:min-w-[380px] lg:min-w-[420px]"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(124,92,255,0.18),transparent_48%)] opacity-0 transition duration-300 group-hover:opacity-100" />
            <div className="relative aspect-[9/16] overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#0B0F19]">
              <Image
                src={image}
                alt={`Planitt app screenshot ${index + 1}`}
                fill
                sizes="(max-width: 640px) 76vw, (max-width: 1024px) 380px, 420px"
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                priority={index === 0}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.2),transparent_24%,transparent_72%,rgba(124,92,255,0.14))] opacity-60" />
            </div>
            <div className="mt-4 flex items-center justify-between px-1">
              <p className="text-sm font-semibold text-white">Screen {index + 1}</p>
              <span className="rounded-full border border-[#7C5CFF]/20 bg-[#7C5CFF]/10 px-3 py-1 text-xs text-[#d4cbff]">
                Snap view
              </span>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
