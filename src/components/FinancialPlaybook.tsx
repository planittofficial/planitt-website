'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, BarChart3, BookOpen, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { eyebrow, revealItem, revealSection, sectionShell } from './about/about-shared';

const whatsapp = 'https://wa.me/919699480916';
const program = 'Complete Stock Market & Trading Mastery Program';
const whatsappLink = (message: string) => `${whatsapp}?text=${encodeURIComponent(message)}`;

const curriculum = [
  ['Indian Stock Market', 'Equity, futures & options'],
  ['Forex Trading', 'Global currency market'],
  ['Crypto Market Trading', 'Understand the digital asset market'],
  ['Price Action & Technical Analysis', 'Read charts with a repeatable process'],
  ['Risk Management & Psychology', 'Protect capital and build discipline'],
  ['Live Market Training', 'Daily practical sessions'],
  ['Algo Trading', 'Build & use automated strategies'],
  ['Custom Indicators on TradingView', 'Special tools for smarter trading'],
] as const;

const formats = [
  { title: 'Live market sessions', description: 'Daily practical sessions on live charts — not recorded slides. Learn alongside real market hours.', icon: BarChart3 },
  { title: 'Algo trading toolkit', description: "Learn to build and deploy automated strategies, so your edge keeps working when you're away from the screen.", icon: Sparkles },
  { title: 'Custom TradingView tools', description: 'Work with custom indicators built for the way this program teaches you to read price.', icon: ShieldCheck },
] as const;

export default function FinancialPlaybook() {
  const generalMessage = `Hi! I'm interested in the ${program}.`;
  return (
    <motion.section id="financial-playbook" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={revealSection} className={`${sectionShell} border-t border-white/[0.06]`}>
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#7C5CFF]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 top-[38%] h-80 w-80 rounded-full bg-[#f5b544]/10 blur-[110px]" />

      <div className="relative grid items-center gap-12 border-b border-white/[0.08] pb-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <motion.div variants={revealItem}>
          <span className={eyebrow}><BookOpen className="h-3.5 w-3.5" /> A practitioner-led trading program</span>
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">Complete Stock Market &amp; <span className="bg-gradient-to-r from-[#f5b544] to-[#f7c86e] bg-clip-text text-transparent">Trading Mastery</span> Program</h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">Learn equity, F&amp;O, forex and crypto trading the way it&apos;s actually practised — live sessions, real charts, and the tools professional traders use every day.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#f5b544] px-5 py-3 text-sm font-bold text-[#0B0F19] transition hover:-translate-y-0.5 hover:bg-[#f7c86e]"><MessageCircle className="h-4 w-4" /> Message Piyush on WhatsApp</a>
            <a href="#batches-pricing" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-[#f5b544]/50 dark:text-white">View batches <ArrowUpRight className="h-4 w-4" /></a>
          </div>
          <p className="mt-7 border-t border-white/[0.08] pt-5 text-sm text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Piyush Tembhekar</strong> — Founder &amp; CEO, Planitt. 6+ years in equity markets and investment advisory.</p>
        </motion.div>

        <motion.div variants={revealItem} className="relative mx-auto w-full max-w-sm">
          <div className="relative overflow-hidden rounded-3xl border border-[#f5b544]/30 bg-[#111827] p-3 shadow-[0_25px_80px_rgba(0,0,0,0.3)]"><div className="absolute inset-3 rounded-2xl border border-[#f5b544]/20" /><Image src="/CEO_Photo.png" alt="Piyush Tembhekar, course instructor" width={500} height={600} className="relative aspect-[5/6] w-full rounded-2xl object-cover object-top" priority /></div>
          <div className="absolute -bottom-5 -left-5 flex h-24 w-24 -rotate-6 flex-col items-center justify-center rounded-full border border-[#8f6c22] bg-[#f5b544] text-center text-[#0B0F19] shadow-xl"><span className="font-mono text-2xl font-bold leading-none">6+</span><span className="mt-1 max-w-[62px] text-[9px] font-bold uppercase leading-tight">years in the markets</span></div>
        </motion.div>
      </div>

      <motion.div variants={revealItem} className="relative border-b border-white/[0.08] py-16">
        <div className="mb-8 max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#b78622] dark:text-[#f7c86e]">The curriculum</p><h3 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">What&apos;s covered</h3><p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">Eight modules, taught in sequence, from first principles to building your own automated strategy.</p></div>
        <div className="grid gap-x-12 sm:grid-cols-2">{curriculum.map(([title, detail], index) => <div key={title} className="flex items-start justify-between gap-4 border-b border-white/[0.08] py-4"><div><p className="font-semibold text-slate-900 dark:text-white">{title}</p><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{detail}</p></div><span className="mt-1 shrink-0 font-mono text-sm text-[#b78622] dark:text-[#f7c86e]">{String(index + 1).padStart(2, '0')}</span></div>)}</div>
      </motion.div>

      <motion.div variants={revealItem} className="relative border-b border-white/[0.08] bg-white/[0.02] py-16">
        <div className="max-w-3xl"><p className="font-heading text-2xl font-semibold leading-snug text-slate-900 dark:text-white sm:text-3xl">Built from practice, not just theory.</p><p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-400">Piyush has spent the last six-plus years inside India&apos;s equity and forex markets — first as a Mutual Fund Distributor advising retail investors, and now as <strong className="text-slate-900 dark:text-white">Founder &amp; CEO of Planitt</strong>, an AI-powered investment platform built for Indian traders. This program is drawn from that same practitioner&apos;s playbook: what actually holds up on a live chart, not just what reads well in a textbook.</p></div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3"><div><p className="font-mono text-3xl font-bold text-[#b78622] dark:text-[#f7c86e]">6+</p><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Years in equity markets &amp; investment advisory</p></div><div><p className="font-mono text-3xl font-bold text-[#b78622] dark:text-[#f7c86e]">4</p><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Markets covered — equity, F&amp;O, forex &amp; crypto</p></div><div><p className="font-mono text-3xl font-bold text-[#b78622] dark:text-[#f7c86e]">1:1</p><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Practitioner-led, not pre-recorded theory</p></div></div>
      </motion.div>

      <motion.div variants={revealItem} className="border-b border-white/[0.08] py-16"><div className="mb-8 max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#b78622] dark:text-[#f7c86e]">The learning experience</p><h3 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">How it&apos;s taught</h3><p className="mt-3 text-base text-slate-600 dark:text-slate-400">Three things that set this apart from a typical trading course.</p></div><div className="grid gap-8 md:grid-cols-3">{formats.map(({ title, description, icon: Icon }) => <div key={title} className="border-t-2 border-[#f5b544] pt-5"><Icon className="h-5 w-5 text-[#f5b544]" /><h4 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{title}</h4><p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{description}</p></div>)}</div></motion.div>

      <motion.div id="batches-pricing" variants={revealItem} className="border-b border-white/[0.08] py-16"><div className="mb-8 max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#b78622] dark:text-[#f7c86e]">Choose your format</p><h3 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Batches &amp; pricing</h3><p className="mt-3 text-base text-slate-600 dark:text-slate-400">Choose the format that fits how you learn.</p></div><div className="border-t border-[#f5b544]/40">{[['Online batch', 'Full course, live online — join from anywhere, sessions included.', '₹9,999', 'Online'], ['Offline batch', 'Full course, in person — classroom-based sessions with hands-on desk time.', '₹19,999', 'Offline']].map(([title, description, price, batch]) => <div key={title} className="flex flex-wrap items-end justify-between gap-6 border-b border-white/[0.08] py-7"><div><h4 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h4><p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">{description}</p></div><div className="text-left sm:text-right"><p className="font-mono text-3xl font-bold text-[#b78622] dark:text-[#f7c86e]">{price}</p><a href={whatsappLink(`Hi! I'd like to join the ${batch} batch of the ${program}.`)} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#f5b544]/40 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-[#f5b544]/10 dark:text-white"><MessageCircle className="h-4 w-4 text-[#f5b544]" /> Reserve on WhatsApp</a></div></div>)}</div></motion.div>

      <motion.div variants={revealItem} className="flex flex-wrap items-end justify-between gap-8 py-16"><div><p className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl">Seats are kept small so every session stays practical.</p><p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Educational content only — trading in financial markets carries risk, and past performance does not guarantee future results.</p></div><div className="flex flex-col items-start gap-3"><a href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#f5b544] px-5 py-3 text-sm font-bold text-[#0B0F19] transition hover:bg-[#f7c86e]"><MessageCircle className="h-4 w-4" /> Message Piyush on WhatsApp</a><span className="font-mono text-sm text-slate-500">+91 96994 80916</span></div></motion.div>
    </motion.section>
  );
}