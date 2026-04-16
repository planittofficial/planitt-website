'use client';

import { motion } from 'framer-motion';
import { Bitcoin, CandlestickChart, CircleDollarSign, Sparkles, TrendingDown, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';

type MarketFilter = 'All' | 'Stocks' | 'Crypto' | 'Forex';

type Opportunity = {
  market: Exclude<MarketFilter, 'All'>;
  asset: string;
  signal: 'Buy' | 'Sell';
  risk: 'Low' | 'Medium' | 'High';
  reason: string;
};

const opportunities: Opportunity[] = [
  {
    market: 'Stocks',
    asset: 'NIFTY 50',
    signal: 'Buy',
    risk: 'Medium',
    reason: 'Momentum breadth is improving while price holds above the short-term support zone.',
  },
  {
    market: 'Stocks',
    asset: 'HDFC Bank',
    signal: 'Buy',
    risk: 'Low',
    reason: 'Volume recovery and stable sector rotation support a cleaner accumulation setup.',
  },
  {
    market: 'Crypto',
    asset: 'BTC / USDT',
    signal: 'Buy',
    risk: 'High',
    reason: 'Breakout pressure is building, but volatility remains elevated near resistance.',
  },
  {
    market: 'Crypto',
    asset: 'ETH / USDT',
    signal: 'Sell',
    risk: 'High',
    reason: 'Weak follow-through after rejection suggests waiting for a better entry zone.',
  },
  {
    market: 'Forex',
    asset: 'USD / INR',
    signal: 'Sell',
    risk: 'Medium',
    reason: 'Range resistance is holding and mean-reversion signals are strengthening intraday.',
  },
  {
    market: 'Forex',
    asset: 'EUR / USD',
    signal: 'Buy',
    risk: 'Medium',
    reason: 'Higher-low structure and improving macro sentiment support selective upside.',
  },
];

const marketTabs: MarketFilter[] = ['All', 'Stocks', 'Crypto', 'Forex'];

const sectionReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const },
  },
};

const marketIcon = {
  Stocks: <CandlestickChart className="h-4 w-4" />,
  Crypto: <Bitcoin className="h-4 w-4" />,
  Forex: <CircleDollarSign className="h-4 w-4" />,
};

const riskStyle = {
  Low: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
  Medium: 'border-amber-300/20 bg-amber-300/10 text-amber-200',
  High: 'border-rose-400/20 bg-rose-400/10 text-rose-300',
};

export default function TodaysOpportunities() {
  const [activeMarket, setActiveMarket] = useState<MarketFilter>('All');

  const visibleOpportunities = useMemo(() => {
    if (activeMarket === 'All') return opportunities;
    return opportunities.filter((item) => item.market === activeMarket);
  }, [activeMarket]);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionReveal}
      className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(124,92,255,0.18),transparent_30%),radial-gradient(circle_at_86%_76%,rgba(34,211,238,0.12),transparent_34%)]" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div variants={itemReveal} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7C5CFF]/20 bg-[#7C5CFF]/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-[#d4cbff]">
              <Sparkles className="h-3.5 w-3.5" />
              Live market layer
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Today&apos;s Opportunities
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              A quick product-style view of what Planitt could surface first: signal, risk, and reason in one scan.
            </p>
          </motion.div>

          <motion.div variants={itemReveal} className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-black/20 p-1">
            {marketTabs.map((market) => (
              <motion.button
                key={market}
                type="button"
                onClick={() => setActiveMarket(market)}
                whileHover={{ scale: 1.04, filter: 'brightness(1.08)' }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeMarket === market
                    ? 'bg-[#7C5CFF] text-white shadow-[0_10px_28px_rgba(124,92,255,0.28)]'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {market}
              </motion.button>
            ))}
          </motion.div>
        </div>

        <motion.div
          key={activeMarket}
          initial="hidden"
          animate="visible"
          variants={sectionReveal}
          className="relative z-10 mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {visibleOpportunities.map((item) => (
            <motion.article
              key={`${item.market}-${item.asset}`}
              variants={itemReveal}
              whileHover={{
                scale: 1.03,
                boxShadow: '0 18px 52px rgba(124,92,255,0.14)',
              }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="rounded-[24px] border border-white/10 bg-black/20 p-5 backdrop-blur transition duration-300 hover:border-[#7C5CFF]/30 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7C5CFF]/10 text-[#d4cbff]">
                    {marketIcon[item.market]}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.market}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{item.asset}</h3>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    item.signal === 'Buy'
                      ? 'border border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
                      : 'border border-rose-400/20 bg-rose-400/10 text-rose-300'
                  }`}
                >
                  {item.signal === 'Buy' ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {item.signal}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${riskStyle[item.risk]}`}>
                  {item.risk} risk
                </span>
                <span className="text-xs text-slate-500">Updated now</span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-300">{item.reason}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
