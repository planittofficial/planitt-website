'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Cpu, ShieldCheck, Users } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import CandlestickChart from './CandlestickChart';

export default function LandingPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'problem' | 'solution'>('problem');

  const goToSite = () => router.push('/main');

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(45,55,72,0.85),transparent_65%)]">
        <div className="absolute inset-0">
          <div className="absolute -left-20 -top-28 h-96 w-96 rounded-full bg-gradient-to-br from-sky-500/40 via-purple-500/35 to-transparent blur-3xl" />
          <div className="absolute right-16 top-24 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-400/30 via-indigo-400/10 to-transparent blur-3xl" />
          <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-400/20 via-sky-400/10 to-transparent blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-medium tracking-wide text-white/80 backdrop-blur">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  Early access coming soon
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-semibold tracking-tight text-white leading-tight break-words">
                  Planitt Multi Asset Recommendations Platform
                </h1>

                <p className="mx-auto lg:mx-0 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed">
                  One unified platform for real-time, explainable signals across stocks, derivatives, mutual funds,
                  forex, and crypto — powered by AI + human analysis.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-center lg:justify-start">
                  <a
                    href="#how-it-works"
                    className="flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-10 py-4 text-sm font-semibold text-white/90 transition hover:bg-white/15"
                  >
                    How it works
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-1 shadow-2xl shadow-black/40 backdrop-blur">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950/70 to-slate-900/70">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),transparent_55%)]" />
                  <div className="relative flex h-full flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white/80">Planitt • Live</p>
                        <p className="text-xs text-white/50">Multi-Asset Recommendation Engine</p>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" /> Active
                      </span>
                    </div>

                    <div className="mx-auto mt-8 w-full">
                      <CandlestickChart height={210} />
                    </div>

                    <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between rounded-full border border-emerald-400/40 bg-emerald-400/5 px-4 py-3">
                        <div className="text-xs font-semibold text-emerald-200">Target</div>
                        <div className="flex items-center gap-2 text-xl font-semibold text-emerald-200">
                          ₹600
                          <span className="text-sm font-medium text-emerald-400">↑14%</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-white/70">
                        <div className="space-y-1 col-span-2 sm:col-span-1">
                          <div className="text-[10px] uppercase tracking-wide text-white/40">Buying range</div>
                          <div className="text-sm font-semibold text-white">₹500 - ₹520</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[10px] uppercase tracking-wide text-white/40">Stop loss</div>
                          <div className="text-sm font-semibold text-white">₹240</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[10px] uppercase tracking-wide text-white/40">Horizon</div>
                          <div className="text-sm font-semibold text-white">3-12 mo</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <button className="rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500">
                            Buy
                          </button>
                          <button className="text-xs font-semibold text-white/70 hover:text-white">
                            Why this trade?
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/50">
                          <span className="inline-flex h-3 w-3 rounded-full bg-white/20" />
                          120k+ people invested in this trade
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-300 via-sky-300 to-indigo-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="insights" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Insight</h2>
              <p className="mt-2 text-lg text-white/70">
                Why today’s investing experience feels disconnected — and how Planitt brings it all together.
              </p>
            </div>

            <div className="inline-flex rounded-full bg-white/10 p-1 text-sm font-medium text-white/80">
              <button
                type="button"
                onClick={() => setSelectedTab('problem')}
                className={`rounded-full px-4 py-2 transition ${selectedTab === 'problem' ? 'bg-white/20 text-white' : 'hover:bg-white/15'
                  }`}
              >
                The problem
              </button>
              <button
                type="button"
                onClick={() => setSelectedTab('solution')}
                className={`rounded-full px-4 py-2 transition ${selectedTab === 'solution' ? 'bg-white/20 text-white' : 'hover:bg-white/15'
                  }`}
              >
                Our solution
              </button>
            </div>
          </div>

          {selectedTab === 'problem' ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-xl shadow-black/20">
              <h3 className="text-xl font-semibold text-white">Why investing feels hard today</h3>
              <ul className="mt-6 space-y-4 text-white/70">
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-emerald-400" />
                  Retail investors jump between multiple apps and unverified tips, leading to inconsistent strategies and unmanaged risk.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-emerald-400" />
                  Most platforms focus on a single asset class and lack true real-time, AI-driven signals.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-emerald-400" />
                  Recommendations are rarely backed by research, so you’re left guessing when to enter, exit, or protect your capital.
                </li>
              </ul>
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-xl shadow-black/20">
              <h3 className="text-xl font-semibold text-white">What Planitt delivers</h3>
              <ul className="mt-6 space-y-4 text-white/70">
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-emerald-400" />
                  Combines AI market scanning with human analyst validation for explainable, actionable calls.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-emerald-400" />
                  Covers all major asset classes under one unified dashboard.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-emerald-400" />
                  Each recommendation includes entry, target, stop-loss, risk score, holding period, and rationale.
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">How it works</h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              A simple 4-step flow that turns signals into decisions.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                id: 1,
                title: 'Scan the market',
                description:
                  'Scans stocks, F&O, mutual funds, forex, and crypto for high-probability opportunities.',
              },
              {
                id: 2,
                title: 'Rank & validate',
                description:
                  'Signals are scored for risk & probability, then validated by analyst research.',
              },
              {
                id: 3,
                title: 'Deliver calls',
                description:
                  'Recommendations include entry, targets, stop-loss, risk score, holding period, and rationale.',
              },
              {
                id: 4,
                title: 'Track & refine',
                description:
                  'Monitor performance and update strategy from a single dashboard.',
              },
            ].map((step) => (
              <div
                key={step.id}
                className="relative h-56 rounded-3xl border border-white/10 bg-white/5 p-6 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-sm font-semibold text-slate-950">
                    {step.id}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="screens" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">App screens</h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Preview the clean, dark-mode experience for watchlists, news, history, and account setup.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { src: '/dark-watchlist-screen.png', alt: 'Dark watchlist screen' },
              { src: '/dark-news-screen.png', alt: 'Dark news screen' },
              { src: '/dark-history-screen.png', alt: 'Dark history screen' },
              { src: '/dark-home-subscribed-screen.png', alt: 'Dark subscribed home screen' },
            ].map((screen) => (
              <div
                key={screen.src}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(10,14,24,0.98))] p-3 shadow-[0_26px_70px_-32px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="absolute -left-8 top-10 h-36 w-36 rounded-full bg-emerald-400/30 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:bg-emerald-300/40" />
                <div className="absolute -right-10 bottom-12 h-40 w-40 rounded-full bg-sky-400/28 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:bg-sky-300/38" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_42%)] opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,#0a0a0a_0%,#050505_100%)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <img
                    src={screen.src}
                    alt={screen.alt}
                    className="h-full w-full rounded-[1.1rem] object-contain object-center"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="download" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-white">Why Planitt?</h2>
          <p className="mx-auto max-w-3xl text-lg text-white/70">
            Retail investors are forced to jump between multiple apps and unverified tips. Planitt unifies all major asset classes under one roof with AI-driven signals backed by human research.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <Callout
            title="Multi‑asset coverage"
            description="One dashboard for stocks, F&O, mutual funds, forex, and crypto — no switching apps."
            icon={<Cpu className="h-5 w-5" />}
          />
          <Callout
            title="AI + Analyst Validation"
            description="Our models surface high-probability calls, and analysts validate with context and risk scoring."
            icon={<Users className="h-5 w-5" />}
          />
          <Callout
            title="Transparent, actionable calls"
            description="Each recommendation includes entry, target, stop‑loss, risk score, and holding horizon."
            icon={<ShieldCheck className="h-5 w-5" />}
          />
        </div>
      </section>

      <section id="market" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Market landscape</h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Most competitors focus only on equities and long-term portfolios. Planitt fills the gap with multi-asset, real-time, research-backed recommendations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
              <h3 className="text-xl font-semibold text-white">What others miss</h3>
              <ul className="mt-4 space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-emerald-400" />
                  Limited to one asset class (typically equities)
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-emerald-400" />
                  Lack real-time, AI-powered signals with analyst validation
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-emerald-400" />
                  No unified dashboard for crypto, forex, derivatives, and mutual funds
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
              <h3 className="text-xl font-semibold text-white">Scalability & growth</h3>
              <p className="mt-4 text-white/70">
                Planitt is built as a cloud-native SaaS platform designed to scale: the AI engine and analyst workflow grow automatically with users without linear cost increases.
              </p>
              <ul className="mt-4 space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-emerald-400" />
                  Supports 100k+ users with a centralized AI research engine
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-emerald-400" />
                  Built for broker integrations, B2B licensing, and international markets
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/50">Ready to explore?</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Get started with Planitt
            </h2>
          </div>
          <div className="fixed bottom-6 right-4 z-[90] flex flex-col items-center gap-3 sm:right-6 sm:flex-row lg:right-8">
            <button
              type="button"
              onClick={goToSite}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 px-10 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:shadow-emerald-500/50"
            >
              Continue to site
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function TrendRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
      <span className="text-sm font-medium text-white/80">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

function Callout({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex h-7 items-center justify-center text-emerald-300">{icon}</div>
      <div>
        <p className="text-base font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-white/70">{description}</p>
      </div>
    </div>
  );
}
