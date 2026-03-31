'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, CheckCircle, Code2, Shield, Target } from 'lucide-react';

type HomeMode = 'all' | 'financial' | 'technical';

type AboutProps = {
    mode?: HomeMode;
};

const About = ({ mode = 'all' }: AboutProps) => {
    const isTechnical = mode === 'technical';
    const isFinancial = mode === 'financial';

    const sectionClass = isTechnical
        ? 'bg-sky-50 dark:bg-slate-950'
        : 'bg-gray-50 dark:bg-gray-950';

    const accentText = isTechnical
        ? 'text-[#0b6cb8] dark:text-[#8fd3ff]'
        : 'text-[#b78622] dark:text-[#e7c973]';

    const iconWrap = isTechnical
        ? 'bg-[#d7ecfb] dark:bg-[#12324b]'
        : 'bg-[#fff3d4] dark:bg-[#4a3a1e]/70';

    const iconColor = isTechnical
        ? 'text-[#1496cf] dark:text-[#8fd3ff]'
        : 'text-[#b78622] dark:text-[#e7c973]';

    const impactCardClass = isTechnical
        ? 'bg-gradient-to-br from-[#18a8d3] to-[#1196cf] dark:from-[#11759c] dark:to-[#0d6281]'
        : 'bg-gradient-to-br from-[#b78622] to-[#d9b55d] dark:from-[#8a6722] dark:to-[#a98537]';

    const impactIconClass = isTechnical ? 'text-[#e7f8ff]' : 'text-[#fff2c7]';
    const impactTextClass = isTechnical ? 'text-[#f3fbff]' : 'text-[#fff8e7]';

    const intro = isTechnical
        ? {
            lead: 'Planitt provides modern technical execution led by ',
            name: 'Parth Shende',
            body: 'We help organizations build digital systems with reliable delivery in app, web, cloud, and automation.',
        }
        : isFinancial
            ? {
                lead: 'Planitt provides trusted financial advisory led by ',
                name: 'Piyush Tembhekar',
                body: 'We help individuals and families with wealth planning, protection, and long-term financial decisions.',
            }
            : {
                lead: 'Planitt combines financial advisory and technical execution led by ',
                name: 'Piyush Tembhekar and Parth Shende',
                body: 'We help individuals, families, and organizations with practical financial guidance and reliable digital delivery.',
            };

    const values = isTechnical
        ? [
            {
                icon: Shield,
                title: 'Trust & Transparency',
                description: 'We maintain clarity across advisory, execution, and communication.',
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
        ]
        : [
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
                icon: Award,
                title: 'Expert Leadership',
                description: 'Our finance and technical leaders guide each engagement end-to-end.',
            },
        ];

    const profile = isTechnical
        ? {
            image: '/Parth_shende(Technical_Head).png',
            alt: 'Parth Shende',
            name: 'Parth Shende',
            meta: '',
            role: 'Technical Lead',
            roleClass: 'text-[#0b6cb8] dark:text-[#8fd3ff]',
            description: 'Leads technical services delivery across apps, websites, cloud, and automation.',
        }
        : {
            image: '/CEO_Photo.png',
            alt: 'Piyush Tembhekar',
            name: 'Piyush Tembhekar',
            meta: 'ARN - 338883',
            role: 'CEO, Financial Distribution',
            roleClass: 'text-[#b78622] dark:text-[#e7c973]',
            description: 'Leads planning across wealth management, insurance, NPS, and long-term advisory.',
        };

    const impactTitle = isTechnical ? 'Technical Impact' : isFinancial ? 'Financial Impact' : 'Planitt Impact';

    const achievements = isTechnical
        ? ['50+ Happy Clients', '6+ Years of Advisory Experience', 'Web, App, Cloud Delivery Capability']
        : isFinancial
            ? ['50+ Happy Clients', 'Rs 50+ Lakhs AUM', '6+ Years of Advisory Experience']
            : ['50+ Happy Clients', 'Rs 50+ Lakhs AUM', 'Web, App, Cloud Delivery Capability'];

    return (
        <section id="about" className={`py-12 transition-colors duration-300 sm:py-20 ${sectionClass}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8 sm:space-y-10"
                    >
                        <div>
                            <h2 className="mb-6 font-heading text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                                About Planitt
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
                                {intro.lead}
                                <span className={`font-semibold ${accentText}`}>{intro.name}</span>.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">{intro.body}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className={`rounded-xl border border-transparent bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 ${
                                        values.length % 2 === 1 && index === values.length - 1 ? 'sm:col-span-2 sm:max-w-[calc(50%-0.75rem)]' : ''
                                    }`}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className={`rounded-lg p-3 ${iconWrap}`}>
                                            <value.icon className={`h-6 w-6 ${iconColor}`} />
                                        </div>
                                        <div>
                                            <h3 className="mb-2 font-heading text-lg font-semibold text-gray-900 dark:text-white">
                                                {value.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
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
                            <div className="grid grid-cols-1 gap-6">
                                <div className="mx-auto flex w-full max-w-md flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-xl transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 sm:p-6">
                                    <div className="mb-4 text-center">
                                        <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl transition-all duration-300 dark:border-gray-800 dark:bg-gray-800 sm:h-44 sm:w-44">
                                            <Image
                                                src={profile.image}
                                                alt={profile.alt}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                        <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                                            {profile.name}
                                        </h3>
                                        {profile.meta ? (
                                            <p className="text-[10px] font-semibold text-gray-900 dark:text-gray-100 sm:text-xs">
                                                {profile.meta}
                                            </p>
                                        ) : null}
                                        <p className={`text-xs font-semibold sm:text-sm ${profile.roleClass}`}>{profile.role}</p>
                                    </div>
                                    <p className="flex-1 text-center text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                                        {profile.description}
                                    </p>
                                </div>
                            </div>

                            <div className={`mx-auto w-full max-w-md rounded-2xl border border-white/10 p-5 text-white shadow-lg sm:p-6 lg:p-7 ${impactCardClass}`}>
                                <h3 className="mb-5 text-center font-heading text-xl font-bold sm:text-2xl">{impactTitle}</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {achievements.map((achievement, index) => (
                                        <motion.div
                                            key={achievement}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: index * 0.08 }}
                                            viewport={{ once: true }}
                                            className={`flex items-center gap-3 rounded-xl border border-white/5 bg-white/10 px-4 py-3.5 transition-colors hover:bg-white/15 ${
                                                index === achievements.length - 1 ? 'sm:col-span-2' : ''
                                            }`}
                                        >
                                            <CheckCircle className={`h-5 w-5 shrink-0 ${impactIconClass}`} />
                                            <p className={`text-sm font-semibold leading-tight sm:text-base ${impactTextClass}`}>{achievement}</p>
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
