'use client';

import Image from 'next/image';

type MobileShowcaseProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function MobileShowcase({
  src,
  alt,
  className = '',
  priority = false,
}: MobileShowcaseProps) {
  return (
    <section className={`w-full ${className}`}>
      <div className="group relative aspect-video w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#111522] shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_20%,transparent_80%,rgba(255,255,255,0.02))]" />

        <div className="absolute inset-[18px] rounded-[28px] border border-white/8 bg-[#0b0f19]" />

        <div className="absolute inset-[18px] overflow-hidden rounded-[28px]">
          <div className="absolute inset-0 scale-[1.18] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.22]">
            <Image
              src={src}
              alt=""
              fill
              priority={priority}
              aria-hidden
              className="object-cover blur-[42px] brightness-[0.36] saturate-[1.1]"
              sizes="100vw"
            />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,92,255,0.18),transparent_30%),radial-gradient(circle_at_75%_28%,rgba(56,189,248,0.14),transparent_26%),radial-gradient(circle_at_55%_100%,rgba(168,85,247,0.12),transparent_34%)]" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/20" />
        </div>

        <div className="absolute inset-[18px] flex items-center justify-center rounded-[28px] px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
          <div className="relative h-full w-full max-w-[240px] sm:max-w-[260px] md:max-w-[280px] lg:max-w-[300px]">
            <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-[30px] bg-black/30 blur-2xl" />
            <div className="relative h-full w-full animate-[showcaseIn_700ms_cubic-bezier(0.22,1,0.36,1)_both] overflow-hidden rounded-[30px] border border-white/10 bg-[#05070d] shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02)_14%,transparent_30%,transparent_70%,rgba(0,0,0,0.08))]" />
              <div className="relative aspect-[9/16] h-full w-full">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  priority={priority}
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 28vw, 300px"
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes showcaseIn {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.965);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
