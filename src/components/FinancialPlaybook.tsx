'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Compass, ShieldCheck, TrendingUp } from 'lucide-react';
import { eyebrow, revealItem, revealSection, sectionShell } from './about/about-shared';

const modules = [
  { number: '01', icon: BookOpen, title: 'Market Foundations', description: 'Build a clear mental model of markets, instruments, and the decisions behind every investment.', accent: '#f5b544' },
  { number: '02', icon: Compass, title: 'Goal-Based Planning', description: 'Connect today’s choices to real goals with a plan that is measurable, flexible, and personal.', accent: '#7C5CFF' },
  { number: '03', icon: TrendingUp, title: 'Portfolio Discipline', description: 'Learn how allocation, consistency, and time work together to support long-term wealth creation.', accent: '#06b6d4' },
  { number: '04', icon: ShieldCheck, title: 'Risk & Review', description: 'Make risk visible, review progress regularly, and keep your strategy aligned as life changes.', accent: '#f7c86e' },
] as const;

export default function FinancialPlaybook() {
  return (
    <motion.section id="financial-playbook" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={revealSection} className={`${sectionShell} border-t border-white/[0.06]`}>
      <div className="pointer-events-none absolute -right-32 top-16 h-72 w-72 rounded-full bg-[#7C5CFF]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 bottom-8 h-64 w-64 rounded-full bg-[#f5b544]/10 blur-[100px]" />
      <div className="relative grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <motion.div variants={revealItem} className="lg:sticky lg:top-28">
          <span className={eyebrow}><BookOpen className="h-3.5 w-3.5" /> Financial Learning Desk</span>
          <h2 className="mt-5 max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-5xl">Turn market noise into a <span className="bg-gradient-to-r from-[#f5b544] to-[#f7c86e] bg-clip-text text-transparent">repeatable wealth plan.</span></h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">A practitioner-led framework for understanding markets, planning with purpose, and investing with the patience that long-term outcomes require.</p>
          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-[#f5b544]/20 bg-[#f5b544]/[0.06] p-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#f5b544]/40 bg-[#0B0F19]"><Image src="/CEO_Photo.png" alt="Piyush Tembhekar" width={48} height={48} className="h-full w-full object-cover" /></div><div><p className="text-sm font-bold text-slate-900 dark:text-white">Piyush Tembhekar</p><p className="text-xs text-[#b78622] dark:text-[#f7c86e]">ARN - 338883 · Financial Distribution</p></div></div>
        </motion.div>
        <motion.div variants={revealItem}>
          <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">The framework</p><h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">What we help you build</h3></div><span className="hidden rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-slate-500 sm:inline-flex">04 MODULES</span></div>
          <div className="grid gap-4 sm:grid-cols-2">{modules.map((module) => <motion.article key={module.number} variants={revealItem} whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-md transition-colors dark:border-white/10 dark:bg-white/[0.03] dark:shadow-xl"><div className="absolute inset-x-0 top-0 h-px opacity-70" style={{ background: `linear-gradient(90deg, ${module.accent}, transparent)` }} /><div className="flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10" style={{ backgroundColor: `${module.accent}18` }}><module.icon className="h-5 w-5" style={{ color: module.accent }} /></div><span className="font-mono text-[10px] font-bold tracking-[0.2em] text-slate-400 dark:text-slate-500">{module.number}</span></div><h4 className="mt-6 text-lg font-bold tracking-tight text-slate-900 dark:text-white">{module.title}</h4><p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{module.description}</p><div className="mt-5 h-1 w-8 rounded-full transition-all duration-300 group-hover:w-14" style={{ backgroundColor: module.accent }} /></motion.article>)}</div>
          <motion.a variants={revealItem} href="/calculators" className="mt-5 flex items-center justify-between gap-4 rounded-3xl border border-[#f5b544]/25 bg-gradient-to-r from-[#f5b544]/15 to-[#7C5CFF]/10 p-5 transition hover:border-[#f5b544]/50"><div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b78622] dark:text-[#f7c86e]">Start with your numbers</p><p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white sm:text-base">Explore the tools built for your next financial decision.</p></div><ArrowUpRight className="h-5 w-5 shrink-0 text-[#b78622] dark:text-[#f7c86e]" /></motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
