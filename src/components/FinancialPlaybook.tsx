'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, BarChart3, BookOpen, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { eyebrow, revealItem, revealSection, sectionShell } from './about/about-shared';

const whatsapp = 'https://wa.me/919699480916';
const program = 'Complete Stock Market & Trading Mastery Program';
const whatsappLink = (message: string) => `${whatsapp}?text=${encodeURIComponent(message)}`;

const pillars = [
  { icon: BookOpen, title: 'Market Foundations', detail: 'Equity, F&O, forex and crypto — from first principles to practical decisions.', accent: '#f5b544' },
  { icon: BarChart3, title: 'Live Chart Practice', detail: 'Price action, technical analysis and real-market sessions — not just recorded theory.', accent: '#06b6d4' },
  { icon: Sparkles, title: 'Algo Trading Toolkit', detail: 'Build automated strategies and use custom TradingView indicators.', accent: '#7C5CFF' },
  { icon: ShieldCheck, title: 'Risk & Discipline', detail: 'Risk management and trading psychology to protect capital and stay consistent.', accent: '#f7c86e' },
] as const;

export default function FinancialPlaybook() {
  const generalMessage = `Hi! I'm interested in the ${program}.`;

  return (
    <motion.section id="financial-playbook" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={revealSection} className={`${sectionShell} border-t border-white/[0.06]`}>
      <div className="pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full bg-[#7C5CFF]/10 blur-[110px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-[#f5b544]/10 blur-[100px]" />

      <div className="relative grid items-center gap-8 border-b border-white/[0.08] pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <motion.div variants={revealItem}>
          <span className={eyebrow}><BookOpen className="h-3.5 w-3.5" /> Financial Learning Desk</span>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">Complete Stock Market &amp; <span className="bg-gradient-to-r from-[#f5b544] to-[#f7c86e] bg-clip-text text-transparent">Trading Mastery</span></h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">A practitioner-led program covering live markets, real charts, risk discipline and the tools used by modern traders.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3"><a href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#f5b544] px-4 py-2.5 text-sm font-bold text-[#0B0F19] transition hover:bg-[#f7c86e]"><MessageCircle className="h-4 w-4" /> Message Piyush</a><a href="#batches-pricing" className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-[#f5b544]/50 dark:text-white">See pricing <ArrowUpRight className="h-4 w-4" /></a></div>
          <p className="mt-5 text-xs text-slate-500"><strong className="text-slate-900 dark:text-white">Piyush Tembhekar</strong> · Founder &amp; CEO, Planitt · 6+ years in markets</p>
        </motion.div>

        <motion.div variants={revealItem} className="relative mx-auto w-full max-w-[250px]">
          <div className="overflow-hidden rounded-3xl border border-[#f5b544]/30 bg-[#111827] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"><Image src="/CEO_Photo.png" alt="Piyush Tembhekar" width={400} height={480} className="aspect-[5/6] w-full rounded-2xl object-cover object-top" priority /></div>
          <div className="absolute -bottom-3 -left-5 flex h-16 w-16 -rotate-6 flex-col items-center justify-center rounded-full border border-[#8f6c22] bg-[#f5b544] text-center text-[#0B0F19] shadow-lg"><span className="font-mono text-lg font-bold leading-none">6+</span><span className="text-[7px] font-bold uppercase">years</span></div>
        </motion.div>
      </div>

      <motion.div variants={revealItem} className="relative border-b border-white/[0.08] py-10"><div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#b78622] dark:text-[#f7c86e]">The essentials</p><h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">What you&apos;ll learn</h3></div><span className="hidden font-mono text-[10px] text-slate-500 sm:block">04 PILLARS</span></div><div className="grid gap-3 sm:grid-cols-2">{pillars.map(({ icon: Icon, title, detail, accent }) => <div key={title} className="flex gap-3 rounded-2xl border border-white/[0.09] bg-white/[0.03] p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${accent}18` }}><Icon className="h-4 w-4" style={{ color: accent }} /></div><div><h4 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h4><p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{detail}</p></div></div>)}</div></motion.div>

      <motion.div id="batches-pricing" variants={revealItem} className="relative border-b border-white/[0.08] py-10"><div className="mb-5"><p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#b78622] dark:text-[#f7c86e]">Choose your format</p><h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Batches &amp; pricing</h3></div><div className="grid gap-4 md:grid-cols-2">{[['Online batch', 'Live online sessions from anywhere.', '₹9,999', 'Online'], ['Offline batch', 'Classroom sessions with hands-on desk time.', '₹14,999', 'Offline']].map(([title, description, price, batch]) => <div key={title} className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5"><div><h4 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h4><p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{description}</p></div><div className="shrink-0 text-right"><p className="font-mono text-xl font-bold text-[#b78622] dark:text-[#f7c86e]">{price}</p><a href={whatsappLink(`Hi! I'd like to join the ${batch} batch of the ${program}.`)} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-[#b78622] dark:text-white dark:hover:text-[#f7c86e]"><MessageCircle className="h-3.5 w-3.5" /> Reserve</a></div></div>)}</div></motion.div>

      <motion.div variants={revealItem} className="flex flex-wrap items-center justify-between gap-5 pt-10"><div><p className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">Small batches. Practical learning.</p><p className="mt-2 text-xs text-slate-500">Educational content only. Trading involves market risk.</p></div><a href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#f5b544] px-4 py-2.5 text-sm font-bold text-[#0B0F19] transition hover:bg-[#f7c86e]"><MessageCircle className="h-4 w-4" /> Message on WhatsApp</a></motion.div>
    </motion.section>
  );
}