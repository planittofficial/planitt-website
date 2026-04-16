import Link from 'next/link';
import {
  calculatorCatalog,
  calculatorCardClass,
  calculatorHeaderCopy,
  calculatorIconWrapClass,
  calculatorPageAccent,
  calculatorShellClass,
} from '@/components/calculators/catalog';

export default function CalculatorsPage() {
  return (
    <main className={calculatorShellClass}>
      <section className="relative overflow-hidden px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,181,68,0.16),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(124,92,255,0.08),transparent_24%)] dark:bg-[radial-gradient(circle_at_top,rgba(245,181,68,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(124,92,255,0.12),transparent_24%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#f7c86e]">
              {calculatorHeaderCopy.eyebrow}
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-gray-950 dark:text-white sm:text-6xl">
              {calculatorHeaderCopy.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {calculatorHeaderCopy.subtitle}
            </p>
            <div className="mt-6 inline-flex items-center rounded-full border border-[#f5b544]/20 bg-[#f5b544]/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#f7c86e]">
              {calculatorHeaderCopy.badge}
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {calculatorCatalog.map((item) => (
              <Link
                key={item.slug}
                href={`/calculators/${item.slug}`}
                className={`${calculatorCardClass} group overflow-hidden p-6 hover:-translate-y-1 hover:border-[#f5b544]/30 hover:shadow-[0_22px_60px_rgba(245,181,68,0.12)]`}
              >
                <div className={`h-1 w-24 rounded-full bg-gradient-to-r ${calculatorPageAccent}`} />
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div className={calculatorIconWrapClass}>{item.icon}</div>
                  <span className="text-sm font-medium text-slate-500 transition group-hover:text-[#f7c86e]">
                    Open
                  </span>
                </div>
                <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-gray-950 dark:text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                <div className="mt-8 border-t border-black/5 pt-5 text-sm font-semibold text-[#c58313] dark:border-white/10 dark:text-[#f7c86e]">
                  {calculatorHeaderCopy.cta}
                </div>
              </Link>
            ))}

            <div className={`${calculatorCardClass} flex items-center justify-center p-6 text-center`}>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{calculatorHeaderCopy.hubNote}</p>
                <Link
                  href={calculatorHeaderCopy.academyHref}
                  className="mt-4 inline-flex items-center justify-center rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-[#f5b544]/30 hover:text-[#c58313] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-[#f7c86e]"
                >
                  Academy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
