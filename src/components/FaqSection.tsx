'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, HelpCircle as HelpIcon, Sparkles } from 'lucide-react';

const sectionReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const faqData = [
  {
    id: '01',
    question: 'How are signals generated?',
    answer: 'Signals combine technical indicators, multi timeframe checks, and confidence filters. They are powered by our proprietary models and live as well as historical data.',
  },
  {
    id: '02',
    question: 'Does Planitt execute trades automatically?',
    answer: 'No, Planitt is an advisory and analysis platform. We provide high-probability signals, setups, and risk context, but you maintain full control and execute trades manually or via your broker.',
  },
  {
    id: '03',
    question: 'How frequently are updates pushed?',
    answer: 'Market scans run continuously in the background. Signals and recommendations are updated in real-time as technical pressure or macro sentiment shifts.',
  },
  {
    id: '04',
    question: 'Do I need an account to browse courses and algo?',
    answer: 'You can explore basic platform details and features anonymously, but accessing active signals, purchasing algorithms, or viewing advanced academy content requires an active account.',
  },
  {
    id: '05',
    question: 'How do subscriptions and billing work?',
    answer: 'Subscriptions are billed monthly or annually. You can upgrade, downgrade, or cancel at any time directly from your account dashboard.',
  },
  {
    id: '06',
    question: 'What data do you collect?',
    answer: 'We collect minimal data necessary to run your account, track active subscriptions, and customize your dashboard preferences. We do not sell or share your data with third parties.',
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      variants={itemReveal}
      whileHover={{ y: -2 }}
      className={`rounded-2xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
        isOpen
          ? 'border-[#7C5CFF]/50 bg-white/[0.04] shadow-[0_12px_40px_rgba(124,92,255,0.12)]'
          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-base font-semibold text-white tracking-tight sm:text-lg">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
            isOpen
              ? 'border-[#7C5CFF]/30 bg-[#7C5CFF]/10 text-purple-300'
              : 'border-white/10 bg-black/25 text-slate-400'
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-6 pt-1 text-sm sm:text-base leading-relaxed text-slate-300 border-t border-white/5 bg-black/10">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('01');

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionReveal}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 border-t border-white/10 bg-[#060913]/90"
    >
      {/* CSS Keyframes for floating visual assets */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes faq-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
          }
          @keyframes faq-pulse-glow {
            0%, 100% { opacity: 0.2; transform: scale(0.95); }
            50% { opacity: 0.45; transform: scale(1.05); }
          }
          @keyframes faq-spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes faq-spin-reverse {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
          .faq-animate-float { animation: faq-float 6s ease-in-out infinite; }
          .faq-animate-pulse-glow { animation: faq-pulse-glow 5s ease-in-out infinite; }
          .faq-animate-spin-slow { animation: faq-spin-slow 24s linear infinite; }
          .faq-animate-spin-reverse { animation: faq-spin-reverse 18s linear infinite; }
        `
      }} />

      {/* Glow Effects */}
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#7C5CFF]/8 blur-3xl opacity-50" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[250px] w-[450px] rounded-full bg-cyan-500/5 blur-3xl opacity-40" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Grid */}
        <div className="grid gap-10 md:grid-cols-12 md:items-center mb-14">
          
          {/* Text Content */}
          <motion.div variants={itemReveal} className="md:col-span-7">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#d4cbff]">
              <HelpCircle className="h-3.5 w-3.5 text-purple-400" />
              FAQ
            </div>

            {/* Headline */}
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
              Frequently asked <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">questions</span>
            </h2>

            {/* Description */}
            <p className="mt-4 text-base leading-relaxed text-slate-300 font-medium max-w-xl">
              Quick answers about models, data, and automated signals on Planitt. For billing or account help,{' '}
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-cyan-400 underline hover:text-cyan-300 transition-colors cursor-pointer"
              >
                visit the support page
              </a>.
            </p>
          </motion.div>

          {/* Decorative floating Question orb centerpiece */}
          <motion.div variants={itemReveal} className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative flex items-center justify-center w-[200px] h-[200px]">
              
              {/* Outer ambient glow */}
              <div className="absolute w-[140px] h-[140px] rounded-full bg-gradient-to-tr from-purple-500/15 via-indigo-500/5 to-cyan-500/15 blur-2xl faq-animate-pulse-glow" />

              {/* Rotating outer orbital paths */}
              <div className="absolute inset-0 rounded-full border border-dashed border-purple-500/20 faq-animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-white/5 faq-animate-spin-reverse" />

              {/* Glowing decorative floating bubble */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="relative z-10 w-[90px] h-[90px] rounded-full flex items-center justify-center border border-white/10 bg-white/[0.04] shadow-[0_15px_35px_rgba(124,92,255,0.15)] backdrop-blur-md faq-animate-float cursor-pointer"
              >
                <HelpIcon className="h-9 w-9 text-purple-300 drop-shadow-[0_0_8px_#a855f7]" />
                
                {/* Embedded sparkles detail */}
                <div className="absolute -top-1.5 -right-1">
                  <Sparkles className="h-4 w-4 text-cyan-300 animate-pulse" />
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* FAQ Accordions List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqData.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

      </div>
    </motion.section>
  );
}
