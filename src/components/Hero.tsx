'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Landmark, Shield, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

type HomeMode = 'financial' | 'technical';

type HeroProps = {
    mode?: HomeMode;
    onModeChange?: (mode: HomeMode) => void;
};

const Hero = ({ mode = 'financial', onModeChange }: HeroProps) => {
    const isTechnical = mode === 'technical';
    const palette = isTechnical
        ? {
            bg: 'from-sky-50 via-white to-cyan-100 dark:from-[#0b1220] dark:via-[#0d1727] dark:to-[#122235]',
            orbA: 'bg-sky-200 dark:bg-cyan-900/50',
            orbB: 'bg-cyan-300 dark:bg-sky-900/50',
            orbC: 'bg-sky-300 dark:bg-cyan-800/50',
            toggleBorder: 'border-cyan-300/70 dark:border-cyan-700/60',
            toggleShadow: 'shadow-[0_8px_30px_rgba(6,182,212,0.24)]',
            toggleActive: 'from-cyan-400 to-sky-500',
            heading: 'from-sky-700 to-cyan-500 dark:from-sky-300 dark:to-cyan-300',
            shield: 'text-cyan-500 dark:text-cyan-300',
            secondary: 'text-sky-600 dark:text-sky-300',
            people: 'text-cyan-600 dark:text-cyan-300',
            primaryBtn: 'from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700',
            secondaryBtn: 'from-sky-600 to-cyan-700 hover:from-sky-700 hover:to-cyan-800',
            cardBg: 'from-sky-50 to-cyan-100 dark:from-sky-950/70 dark:to-cyan-950/70',
            cardBorder: 'border-cyan-300/50 dark:border-cyan-700/60',
            cardLabel: 'text-sky-700 dark:text-cyan-300',
        }
        : {
            bg: 'from-[#fef5dc] via-white to-[#f8e3a7] dark:from-[#2f2712] dark:via-[#1c1a14] dark:to-[#2a2212]',
            orbA: 'bg-[#f1d58c] dark:bg-[#7a5b22]',
            orbB: 'bg-[#f5c867] dark:bg-[#7a642f]',
            orbC: 'bg-[#dfb35d] dark:bg-[#6b5221]',
            toggleBorder: 'border-[#eccd7e]/70 dark:border-[#7a642f]/60',
            toggleShadow: 'shadow-[0_8px_30px_rgba(201,158,67,0.24)]',
            toggleActive: 'from-[#c9952d] to-[#e5c26b]',
            heading: 'from-[#b78622] to-[#d9b051] dark:from-[#f3dc9a] dark:to-[#e7c973]',
            shield: 'text-[#b78622] dark:text-[#e7c973]',
            secondary: 'text-[#a27015] dark:text-[#ddbc66]',
            people: 'text-[#8f6a21] dark:text-[#d2b36b]',
            primaryBtn: 'from-[#b78622] to-[#d7ac49] hover:from-[#a7771b] hover:to-[#c89e41]',
            secondaryBtn: 'from-[#3f3520] to-[#65512a] hover:from-[#312816] hover:to-[#544122]',
            cardBg: 'from-[#fff7e3] to-[#f5e1ad] dark:from-[#3b2f17]/60 dark:to-[#5a461f]/50',
            cardBorder: 'border-[#d3af5e]/40 dark:border-[#8a6a2f]/60',
            cardLabel: 'text-[#9f7220] dark:text-[#e7c973]',
        };

    const heading = isTechnical ? 'Technology Partner' : 'Finance Partner';

    const description = isTechnical
        ? 'We deliver modern web, app, cloud, and automation solutions to help your business ship faster and scale reliably.'
        : 'We provide strategic financial planning, insurance, SIP, and retirement advisory to help you build long-term wealth securely.';

    return (
        <section className={`relative bg-linear-to-br ${palette.bg} overflow-hidden transition-colors duration-300`}>
            <div className="absolute inset-0">
                <div className={`absolute top-20 left-10 w-72 h-72 ${palette.orbA} rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20 animate-pulse`}></div>
                <div className={`absolute top-40 right-10 w-72 h-72 ${palette.orbB} rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20 animate-pulse delay-1000`}></div>
                <div className={`absolute -bottom-8 left-20 w-72 h-72 ${palette.orbC} rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20 animate-pulse delay-2000`}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-12 lg:pb-24">
                <div className="w-full max-w-md mx-auto mb-10 lg:mb-14">
                    <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-2">
                        Select Focus
                    </p>
                    <div className={`relative rounded-2xl border ${palette.toggleBorder} bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl p-1.5 ${palette.toggleShadow}`}>
                        <motion.div
                            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] rounded-xl bg-gradient-to-r ${palette.toggleActive} shadow-lg`}
                            animate={{ x: isTechnical ? '100%' : 0 }}
                            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                        />
                        <div className="relative grid grid-cols-2 gap-1">
                            <button
                                onClick={() => onModeChange?.('financial')}
                                suppressHydrationWarning
                                className={`h-12 rounded-xl px-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                                    !isTechnical
                                        ? 'text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-[#4b4e4e] dark:hover:text-[#c7cccc]'
                                }`}
                            >
                                <Landmark className="h-4 w-4" />
                                Financial
                            </button>
                            <button
                                onClick={() => onModeChange?.('technical')}
                                suppressHydrationWarning
                                className={`h-12 rounded-xl px-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                                    isTechnical
                                        ? 'text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-[#4b4e4e] dark:hover:text-[#c7cccc]'
                                }`}
                            >
                                <Cpu className="h-4 w-4" />
                                Technical
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="space-y-8"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`hero-copy-${mode}`}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.32 }}
                                className="space-y-5"
                            >
                                <h1 className="font-heading text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                                    Your Trusted
                                    <span className={`block text-transparent bg-clip-text bg-linear-to-r ${palette.heading}`}>
                                        {heading}
                                    </span>
                                </h1>

                                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {description}
                                </p>

                                <div className="flex flex-wrap gap-6">
                                    <div className="flex items-center space-x-2">
                                        <Shield className={`h-6 w-6 ${palette.shield}`} />
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">Compliance First</span>
                                    </div>
                                    {!isTechnical ? (
                                        <div className="flex items-center space-x-2">
                                            <TrendingUp className={`h-6 w-6 ${palette.secondary}`} />
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">Financial Growth</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <Code2 className={`h-6 w-6 ${palette.secondary}`} />
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">Engineering Delivery</span>
                                        </div>
                                    )}
                                    <div className="flex items-center space-x-2">
                                        <Users className={`h-6 w-6 ${palette.people}`} />
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">Expert-Led Team</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    {!isTechnical ? (
                                        <>
                                            <Link
                                                href="/services/financial-services/budgeting"
                                                suppressHydrationWarning
                                                className={`inline-flex items-center justify-center px-8 py-4 bg-linear-to-r ${palette.primaryBtn} text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                                            >
                                                Explore Financial
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Link>
                                            <a
                                                href="https://www.assetplus.in/mfd/ARN-338883"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                suppressHydrationWarning
                                                className={`inline-flex items-center justify-center px-8 py-4 bg-linear-to-r ${palette.secondaryBtn} text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                                            >
                                                Contact Advisor
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href="/services/technical-training"
                                                suppressHydrationWarning
                                                className={`inline-flex items-center justify-center px-8 py-4 bg-linear-to-r ${palette.primaryBtn} text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                                            >
                                                Explore Technical
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Link>
                                            <Link
                                                href="/main#contact"
                                                suppressHydrationWarning
                                                className={`inline-flex items-center justify-center px-8 py-4 bg-linear-to-r ${palette.secondaryBtn} text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                                            >
                                                Start Project
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`hero-snapshot-${mode}`}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -12 }}
                                    transition={{ duration: 0.28 }}
                                    className="space-y-5"
                                >
                                    <div className="text-center">
                                        <h3 className="font-heading text-2xl font-bold text-gray-800 dark:text-white mb-1">
                                            {isTechnical ? 'Technical Snapshot' : 'Financial Snapshot'}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {isTechnical
                                                ? 'Focused engineering for scalable digital outcomes'
                                                : 'Focused advisory for long-term financial outcomes'}
                                        </p>
                                    </div>

                                    {!isTechnical ? (
                                        <div className={`rounded-xl p-5 bg-linear-to-r ${palette.cardBg} border ${palette.cardBorder}`}>
                                            <p className={`text-sm font-semibold tracking-wide ${palette.cardLabel} uppercase mb-3`}>Financial</p>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700 dark:text-gray-300">Planning</span>
                                                    <span className={`font-semibold ${palette.cardLabel}`}>SIP, NPS, Insurance</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700 dark:text-gray-300">Advisory</span>
                                                    <span className={`font-semibold ${palette.cardLabel}`}>Goal-based</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={`rounded-xl p-5 bg-linear-to-r ${palette.cardBg} border ${palette.cardBorder}`}>
                                            <p className={`text-sm font-semibold tracking-wide ${palette.cardLabel} uppercase mb-3`}>Technical</p>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700 dark:text-gray-300">Delivery</span>
                                                    <span className={`font-semibold ${palette.cardLabel}`}>Web, Apps, Cloud</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700 dark:text-gray-300">Operations</span>
                                                    <span className={`font-semibold ${palette.cardLabel}`}>DevOps, Security</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;


