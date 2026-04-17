import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  calculatorCatalog,
  calculatorCardClass,
  calculatorHeaderCopy,
  calculatorIconWrapClass,
  calculatorPageAccent,
  calculatorShellClass,
  getCalculatorBySlug,
  renderCalculator,
} from '@/components/calculators/catalog';

type CalculatorDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CalculatorDetailPage({ params }: CalculatorDetailPageProps) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  return (
    <main className={calculatorShellClass}>
      <section className="relative overflow-hidden px-4 pb-14 pt-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,181,68,0.14),transparent_28%),radial-gradient(circle_at_85%_16%,rgba(124,92,255,0.08),transparent_22%)] dark:bg-[radial-gradient(circle_at_top,rgba(245,181,68,0.14),transparent_28%),radial-gradient(circle_at_85%_16%,rgba(124,92,255,0.12),transparent_22%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/main" className="transition hover:text-gray-950 dark:hover:text-white">
              {calculatorHeaderCopy.breadcrumbHome}
            </Link>
            <span>&gt;</span>
            <Link href="/calculators" className="transition hover:text-gray-950 dark:hover:text-white">
              {calculatorHeaderCopy.breadcrumbCalculators}
            </Link>
            <span>&gt;</span>
            <span className="text-gray-950 dark:text-white">{calculator.title}</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className={`${calculatorCardClass} h-fit rounded-[30px] p-4 sm:p-5`}>
              <div className="px-2 pb-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#f7c86e]">
                  {calculatorHeaderCopy.sidebarTitle}
                </p>
              </div>

              <div className="space-y-2">
                {calculatorCatalog.map((item) => {
                  const isActive = item.slug === slug;

                  return (
                    <Link
                      key={item.slug}
                      href={`/calculators/${item.slug}`}
                      className={`flex items-center gap-3 rounded-[20px] border px-3 py-3 transition ${
                        isActive
                          ? 'border-[#f5b544]/30 bg-[#f5b544]/10 text-gray-950 dark:text-white'
                          : 'border-transparent bg-black/[0.03] text-slate-600 hover:border-black/10 hover:bg-black/[0.04] dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-white/10 dark:hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className={`${calculatorIconWrapClass} ${isActive ? 'bg-[#f5b544]/18 text-[#ffd27a]' : ''}`}>
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold">{item.title}</p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-500">{item.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </aside>

            <div className="min-w-0">
              <div className={`${calculatorCardClass} overflow-hidden rounded-[30px] p-2 sm:p-3`}>
                {renderCalculator(slug)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
