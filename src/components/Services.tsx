"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Target,
    Heart,
    Calendar,
    Calculator,
    Wallet,
    ArrowRight,
    Globe,
    SmartphoneCharging,
    Pen,
    InfinityIcon,
    ShieldCheck,
    CloudCheck,
    type LucideIcon,
} from 'lucide-react';

type ServiceDomain = 'financial' | 'technical';
type HomeMode = 'all' | 'financial' | 'technical';

type ServiceItem = {
    icon: LucideIcon;
    title: string;
    description: string;
    url: string;
    domain: ServiceDomain;
};

type ServicesProps = {
    mode?: HomeMode;
};

const Services = ({ mode = 'all' }: ServicesProps) => {
    const financialServices: ServiceItem[] = [
        {
            icon: Target,
            title: 'Goal Setting',
            description: 'Calculate the monthly SIP required to achieve your financial goals with inflation adjustment.',
            url: '/services/financial-services/goal-setting',
            domain: 'financial',
        },
        {
            icon: Heart,
            title: 'Insurance & NPS',
            description: 'Comprehensive life and health insurance solutions to protect your loved ones.',
            url: '/services/financial-services/insurance',
            domain: 'financial',
        },
        {
            icon: Calendar,
            title: 'SIP & SWP',
            description: 'Retirement planning with tax benefits and long-term wealth accumulation.',
            url: '/services/financial-services/nps',
            domain: 'financial',
        },
        {
            icon: Calculator,
            title: 'Budgeting',
            description: 'Track your spending and savings patterns with visual insights and planning tools.',
            url: '/services/financial-services/budgeting',
            domain: 'financial',
        },
        {
            icon: Wallet,
            title: 'Daily SIP Tracker',
            description: 'Monitor and manage your daily expenses effectively to stay within your budget.',
            url: '/services/financial-services/Daily-Expense-Tracker',
            domain: 'financial',
        },
    ];

    const technicalServices: ServiceItem[] = [
        {
            icon: SmartphoneCharging,
            title: 'Application Development',
            description: 'Native and cross-platform applications built with modern architecture.',
            url: '/services/technical-services/app-dev',
            domain: 'technical',
        },
        {
            icon: Globe,
            title: 'Website Development',
            description: 'High-performance websites that deliver clear user journeys and conversions.',
            url: '/services/technical-services/web-dev',
            domain: 'technical',
        },
        {
            icon: CloudCheck,
            title: 'Cloud Services',
            description: 'Scalable and secure cloud solutions tailored to your business operations.',
            url: '/services/technical-services/cloud-services',
            domain: 'technical',
        },
        {
            icon: Pen,
            title: 'Digital Marketing',
            description: 'Campaigns and brand communication designed for measurable growth.',
            url: '/services/technical-services/digital-marketing',
            domain: 'technical',
        },
        {
            icon: InfinityIcon,
            title: 'DevOps & Automation',
            description: 'Automated delivery pipelines for faster releases and stable operations.',
            url: '/services/technical-services/devops-automation',
            domain: 'technical',
        },
        {
            icon: ShieldCheck,
            title: 'Cyber Security',
            description: 'Prevention, detection, and response strategies to reduce cyber risk.',
            url: '/services/technical-services/cyber-security',
            domain: 'technical',
        },
    ];

    const allServices = [...financialServices, ...technicalServices];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    const [active, setActive] = useState<'all' | 'financial' | 'technical'>('all');

    const effectiveMode = mode === 'all' ? active : mode;

    const visibleServices =
        effectiveMode === 'all'
            ? allServices
            : effectiveMode === 'financial'
                ? financialServices
                : technicalServices;
    const sectionTag = effectiveMode === 'technical' ? 'Technical Solutions' : effectiveMode === 'financial' ? 'Financial Solutions' : 'Unified Solutions';

    return (
        <section
            id="services"
            className={`py-12 sm:py-20 ${effectiveMode === 'technical' ? 'bg-sky-50 dark:bg-slate-950' : 'bg-gray-50 dark:bg-gray-900'} transition-colors duration-300`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.24em] ${effectiveMode === 'technical' ? 'text-sky-700 dark:text-cyan-300' : 'text-[#a9781e] dark:text-[#e7c973]'}`}>
                        {sectionTag}
                    </p>
                    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Our Solutions
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        We deliver financial advisory and technical execution under one roof, so your strategy and implementation stay aligned.
                    </p>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        {visibleServices.length} services available
                    </p>
                </motion.div>

                {mode === 'all' && (
                    <motion.div className="w-full mb-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-sm border border-gray-100 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-3 gap-2 transition-colors duration-300">
                            <button
                                onClick={() => setActive('all')}
                                className={`py-3 px-4 text-center rounded-lg font-medium transition-all duration-200 ${active === 'all'
                                    ? 'bg-gradient-to-r from-[#b78622] to-zinc-600 text-white shadow-lg'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                All Solutions
                            </button>
                            <button
                                onClick={() => setActive('financial')}
                                className={`py-3 px-4 text-center rounded-lg font-medium transition-all duration-200 ${active === 'financial'
                                    ? 'bg-gradient-to-r from-[#b78622] to-[#d8b35c] text-white shadow-lg'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                Financial
                            </button>
                             <button
                                 onClick={() => setActive('technical')}
                                 className={`py-3 px-4 text-center rounded-lg font-medium transition-all duration-200 ${active === 'technical'
                                     ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-lg'
                                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                     }`}
                             >
                                Technical
                            </button>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    key={effectiveMode}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {visibleServices.map((service) => (
                        <motion.div
                            key={`${service.domain}-${service.title}`}
                            variants={itemVariants}
                            className="group"
                        >
                            {(() => {
                                const isFinancialCard = service.domain === 'financial';
                                const iconGradient = isFinancialCard
                                    ? 'from-[#b78622] to-[#e6c671]'
                                    : 'from-cyan-400 to-sky-500';
                                 const hoverTitle = isFinancialCard
                                     ? 'group-hover:text-[#b78622] dark:group-hover:text-[#e7c973]'
                                     : 'group-hover:text-sky-700 dark:group-hover:text-cyan-300';
                                 const domainBadge = isFinancialCard
                                     ? 'bg-[#fff6df] text-[#9e721f] dark:bg-[#3d3118] dark:text-[#e3c46d]'
                                     : 'bg-sky-100 text-sky-700 dark:bg-cyan-900/40 dark:text-cyan-300';
                                 const arrowColor = isFinancialCard
                                     ? 'text-[#b78622] dark:text-[#e7c973]'
                                     : 'text-sky-700 dark:text-cyan-300';

                                return (
                            <a
                                href={service.url}
                                className="block bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full cursor-pointer"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div
                                        className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${iconGradient} group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <service.icon className="h-8 w-8 text-white" />
                                    </div>
                                    {effectiveMode === 'all' && (
                                        <span className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${domainBadge}`}>
                                            {service.domain}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <h3 className={`font-heading text-xl font-bold text-gray-900 dark:text-white ${hoverTitle} transition-colors duration-300`}>
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div className="pt-4 flex justify-end">
                                        <span className={`mr-2 text-sm font-medium ${arrowColor}`}>Explore</span>
                                        <ArrowRight
                                            className={`h-5 w-5 ${arrowColor} group-hover:translate-x-1 transition-transform duration-200`}
                                        />
                                    </div>
                                </div>
                            </a>
                                );
                            })()}
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                     <div className={`bg-gradient-to-r ${
                         effectiveMode === 'financial'
                             ? 'from-[#b78622] via-[#cfaa4f] to-[#e5c46f]'
                         : effectiveMode === 'technical'
                                ? 'from-cyan-500 via-sky-500 to-sky-600'
                                : 'from-[#b78622] via-[#cfaa4f] to-zinc-600'
                     } rounded-2xl p-8 text-white shadow-xl`}>
                        <h3 className="font-heading text-2xl font-bold mb-4">
                            {effectiveMode === 'financial'
                                ? 'Plan Your Financial Growth'
                                : effectiveMode === 'technical'
                                    ? 'Build Your Technical Roadmap'
                                    : 'Build Growth Across Finance and Technology'}
                        </h3>
                        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                            {effectiveMode === 'financial'
                                ? 'Get personalized guidance for SIP, protection planning, and long-term wealth decisions.'
                                : effectiveMode === 'technical'
                                    ? 'Get practical execution support for apps, web platforms, cloud, and secure delivery.'
                                    : 'Get domain-specific advisory and execution plans from our team based on your goals, stage, and budget.'}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {effectiveMode !== 'technical' && (
                                <a
                                    href="/services/financial-services/budgeting"
                                    className="inline-flex items-center px-7 py-3 bg-white text-[#9f7220] font-semibold rounded-lg hover:bg-[#fff8ea] transition-colors duration-300 shadow-lg"
                                >
                                    Explore Financial
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            )}
                             {effectiveMode !== 'financial' && (
                                 <a
                                     href="/services/technical-training"
                                     className="inline-flex items-center px-7 py-3 bg-sky-50 text-sky-700 font-semibold rounded-lg hover:bg-cyan-100 transition-colors duration-300 shadow-lg"
                                 >
                                     Explore Technical
                                     <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;



