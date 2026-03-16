'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Target, Shield, CheckCircle, Code2 } from 'lucide-react';

type HomeMode = 'all' | 'financial' | 'technical';

type AboutProps = {
    mode?: HomeMode;
};

const About = ({ mode = 'all' }: AboutProps) => {
    const isFinancial = mode === 'financial';
    const isTechnical = mode === 'technical';
    const palette = isTechnical
        ? {
            leadName: 'text-sky-700 dark:text-cyan-300',
            valueBg: 'bg-sky-100 dark:bg-cyan-900/40',
            valueIcon: 'text-cyan-600 dark:text-cyan-300',
            roleText: 'text-sky-700 dark:text-cyan-300',
            leadBadge: 'bg-sky-100 dark:bg-cyan-900/40 text-sky-700 dark:text-cyan-300',
            impactBg: 'from-cyan-500 to-sky-600 dark:from-cyan-700 dark:to-sky-800',
            impactIcon: 'text-sky-50',
            impactText: 'text-sky-50',
        }
        : {
            leadName: 'text-[#b78622] dark:text-[#e7c973]',
            valueBg: 'bg-[#fff3d4] dark:bg-[#4a3a1e]/70',
            valueIcon: 'text-[#b78622] dark:text-[#e7c973]',
            roleText: 'text-[#b78622] dark:text-[#e7c973]',
            leadBadge: 'bg-[#fff3d4] dark:bg-[#4a3a1e]/70 text-[#9f7220] dark:text-[#e7c973]',
            impactBg: 'from-[#b78622] to-[#d9b55d] dark:from-[#8a6722] dark:to-[#a98537]',
            impactIcon: 'text-[#fff2c7]',
            impactText: 'text-[#fff8e7]',
        };

    const values = [
        {
            icon: Shield,
            title: 'Trust & Transparency',
            description: 'We maintain clarity across advisory, execution, and communication.',
        },
        {
            icon: Target,
            title: 'Goal-Oriented Planning',
            description: 'Every solution is aligned to business and personal outcomes.',
        },
        {
            icon: Code2,
            title: 'Technical Excellence',
            description: 'Modern engineering practices ensure quality, speed, and reliability.',
        },
        {
            icon: Award,
            title: 'Expert Leadership',
            description: 'Our finance and technical leaders guide each engagement end-to-end.',
        },
    ];

    const achievements = [
        '50+ Happy Clients',
        'Rs 50+ Lakhs AUM',
        '6+ Years of Advisory Experience',
        'Web, App, Cloud Delivery Capability',
    ];

    const visibleValues = values.filter((value) => {
        if (isFinancial) {
            return value.title !== 'Technical Excellence';
        }
        if (isTechnical) {
            return value.title !== 'Goal-Oriented Planning';
        }
        return true;
    });

    const visibleAchievements = achievements.filter((achievement) => {
        if (isFinancial) {
            return achievement !== 'Web, App, Cloud Delivery Capability';
        }
        if (isTechnical) {
            return achievement !== 'Rs 50+ Lakhs AUM';
        }
        return true;
    });

    return (
        <section id="about" className={`py-12 sm:py-20 ${isTechnical ? 'bg-sky-50 dark:bg-slate-950' : 'bg-gray-50 dark:bg-gray-950'} transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8 sm:space-y-10"
                    >
                        <div>
                            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                About Planitt
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                {isFinancial ? (
                                    <>Planitt provides trusted financial advisory led by <span className={`font-semibold ${palette.leadName}`}>Piyush Tembhekar</span>.</>
                                ) : isTechnical ? (
                                    <>Planitt provides modern technical execution led by <span className={`font-semibold ${palette.leadName}`}>Parth Shende</span>.</>
                                ) : (
                                    <>Planitt is a fintech and technology solutions company, led by <span className="font-semibold text-[#b78622] dark:text-[#e7c973]">Piyush Tembhekar</span> and <span className="font-semibold text-[#444747] dark:text-[#c7cccc]">Parth Shende</span>.</>
                                )}
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                {isFinancial
                                    ? 'We help individuals and families with wealth planning, protection, and long-term financial decisions.'
                                    : isTechnical
                                        ? 'We help organizations build digital systems with reliable delivery in app, web, cloud, and automation.'
                                        : 'We help teachers, young professionals, organizations, and growing businesses by combining financial advisory with technical implementation for practical, measurable growth.'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {visibleValues.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-transparent dark:border-gray-800"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className={`${palette.valueBg} p-3 rounded-lg`}>
                                            <value.icon className={`h-6 w-6 ${palette.valueIcon}`} />
                                        </div>
                                        <div>
                                            <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                {value.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                {value.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {!isTechnical && (
                                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100 dark:border-gray-800 transition-colors duration-300 flex flex-col">
                                        <div className="text-center mb-4">
                                            <div className="relative w-32 h-32 sm:w-44 sm:h-44 mx-auto mb-4 bg-white dark:bg-gray-800 rounded-full overflow-hidden shadow-xl border-4 border-white dark:border-gray-800 transition-all duration-300">
                                                <Image
                                                    src="/CEO_Photo.png"
                                                    alt="Piyush Tembhekar"
                                                    fill
                                                    className="object-cover"
                                                    priority
                                                />
                                            </div>
                                            <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                                Piyush Tembhekar
                                            </h3>
                                            <p className="text-gray-900 dark:text-gray-100 text-[10px] sm:text-xs font-semibold">
                                                ARN - 338883
                                            </p>
                                            <p className={`${palette.roleText} font-semibold text-xs sm:text-sm`}>
                                                CEO, Financial Distribution
                                            </p>
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center flex-1">
                                            Leads planning across wealth management, insurance, NPS, and long-term advisory.
                                        </p>
                                    </div>
                                )}

                                {!isFinancial && (
                                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100 dark:border-gray-800 transition-colors duration-300 flex flex-col">
                                        <div className="text-center mb-4">
                                            <div className="relative w-32 h-32 sm:w-44 sm:h-44 mx-auto mb-4 bg-white dark:bg-gray-800 rounded-full overflow-hidden shadow-xl border-4 border-white dark:border-gray-800 transition-all duration-300">
                                                <Image
                                                    src="/Parth_shende(Technical_Head).png"
                                                    alt="Parth Shende"
                                                    fill
                                                    className="object-cover"
                                                    priority
                                                />
                                            </div>
                                            <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                                Parth Shende
                                            </h3>
                                            <p className="text-sky-700 dark:text-cyan-300 font-semibold text-xs sm:text-sm">
                                                Technical Lead
                                            </p>
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center flex-1">
                                            Leads technical services delivery across apps, websites, cloud, and automation.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className={`bg-gradient-to-r ${
                                mode === 'all'
                                    ? 'from-[#b78622] to-zinc-600'
                                    : palette.impactBg
                            } rounded-2xl p-6 sm:p-8 text-white w-full`}>
                                <h3 className="font-heading text-xl sm:text-2xl font-bold mb-6 text-center">
                                    {isFinancial ? 'Financial Impact' : isTechnical ? 'Technical Impact' : 'Our Impact'}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {visibleAchievements.map((achievement, index) => (
                                        <motion.div
                                            key={achievement}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: index * 0.08 }}
                                            viewport={{ once: true }}
                                            className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-3"
                                        >
                                            <CheckCircle className={`h-4 w-4 ${palette.impactIcon}`} />
                                            <p className={`${palette.impactText} text-sm font-medium`}>
                                                {achievement}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;


