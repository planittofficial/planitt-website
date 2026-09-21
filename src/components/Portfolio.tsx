'use client';
import ProjectSection from "@/components/ProjectSection";
import { motion } from 'framer-motion';

type HomeMode = 'all' | 'financial' | 'technical';

type PortfolioProps = {
    mode?: HomeMode;
};

const Portfolio = ({ mode = 'all' }: PortfolioProps) => {
    const isTechnical = mode === 'technical';
    const isFinancial = mode === 'financial';
    const sectionClass = isTechnical
        ? 'bg-white dark:bg-slate-950'
        : isFinancial
            ? 'bg-[#fffbef] dark:bg-[#2a2111]'
            : 'bg-gray-50 dark:bg-gray-950';
    const accentClass = isTechnical
        ? 'text-sky-700 dark:text-cyan-300'
        : 'text-[#a9781e] dark:text-[#e7c973]';

    return (
        <section id="portfolio" className={`py-12 transition-colors duration-300 sm:py-10 ${sectionClass}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center sm:mb-16"
                >
                    <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.24em] ${accentClass}`}>
                        Delivery Proof
                    </p>
                    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Our Portfolio
                    </h2>
                    <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
                        Real product and platform implementations across web and app delivery.
                    </p>
                    <div className="mb-12 grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-900/70 ">
                            <p className={`font-semibold ${accentClass}`}>Web Projects</p>
                            <p className="text-gray-600 dark:text-gray-400">E-commerce, dashboards, lead-gen</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-900/70">
                            <p className={`font-semibold ${accentClass}`}>App Projects</p>
                            <p className="text-gray-600 dark:text-gray-400">In-house and client builds</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-900/70">
                            <p className={`font-semibold ${accentClass}`}>Focus</p>
                            <p className="text-gray-600 dark:text-gray-400">Performance, UX, scalability</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-25">
                        <ProjectSection
                            title="Web Development Projects"
                            subtitle="A showcase of our high-performance websites and mobile applications."
                            accentColor="blue"
                            projects={[
                                {
                                    title: "Alvestt",
                                    domain: "Web Platform",
                                    year: "2026",
                                    status: "Live",
                                    description:
                                        "AI-powered market signals, algorithmic trading tools, and multi-asset investment intelligence platform.",
                                    client: "In-House",
                                    techStack: ["Next.js", "TypeScript", "Python", "FastAPI", "+2"],
                                    image: "/alvestt-homepage-dark.png",
                                    liveLink: "https://www.alvestt.com/",
                                    platformIcons: ["web"],
                                },
                                {
                                    title: "Planitt CRM",
                                    domain: "Web Development",
                                    year: "2026",
                                    status: "Completed",
                                    description:
                                        "Unified CRM workspace to streamline lead pipelines, team task allocations, and customer engagement.",
                                    client: "In-House",
                                    techStack: ["React", "Node.js", "PostgreSQL", "Tailwind", "+1"],
                                    image: "/Planitt-CRM.png",
                                    liveLink: "https://crm.planitt.in/",
                                    platformIcons: ["web"],
                                },
                                {
                                    title: "Coffee Culture",
                                    domain: "Web Development",
                                    year: "2025",
                                    status: "Completed",
                                    description:
                                        "Boutique cafe showcase website featuring signature menus, live event highlights, and online reservations.",
                                    client: "Coffee Culture",
                                    techStack: ["Next.js", "React", "Tailwind CSS", "SEO"],
                                    image: "/Coffee-Culture.jpg",
                                    liveLink: "https://coffeeculturenagpur.com/",
                                    platformIcons: ["web"],
                                },
                                {
                                    title: "Capita Prime LLC",
                                    domain: "Web Development",
                                    year: "2025",
                                    status: "Completed",
                                    description:
                                        "Luxury real estate investment portal showcasing premier Dubai land acquisitions and high-net-worth deals.",
                                    client: "Capita Prime Dubai",
                                    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "CRM"],
                                    image: "/CapitaPrime.png",
                                    liveLink: "https://capitaprimellc.netlify.app/",
                                    platformIcons: ["web"],
                                },
                                {
                                    title: "Sawarnaratna",
                                    domain: "E-commerce",
                                    year: "2024",
                                    status: "Completed",
                                    description:
                                        "Custom luxury dry fruit gifting platform with interactive hamper builders and seamless checkout.",
                                    client: "Sawarnaratna",
                                    techStack: ["React", "Next.js", "E-commerce", "Stripe/UPI"],
                                    image: "/sawarnaratna.png",
                                    liveLink: "https://sawarnaratna.netlify.app/",
                                    platformIcons: ["web"],
                                },
                                {
                                    title: "Krypsm",
                                    domain: "Web Application",
                                    year: "2024",
                                    status: "Completed",
                                    description:
                                        "Cryptocurrency market intelligence terminal with real-time candlestick charts and automated portfolio tracking.",
                                    client: "Krypsm Global",
                                    techStack: ["React", "TypeScript", "Chart.js", "Web3", "+1"],
                                    image: "/Krypsm.png",
                                    liveLink: "https://krypsm.com/",
                                    platformIcons: ["web"],
                                },
                            ]}
                        />

                        <ProjectSection
                            title="App Development Projects"
                            subtitle="Selected mobile applications and internal digital products."
                            accentColor="indigo"
                            projects={[ // add new projects here
                                {
                                    title: "Alvestt App",
                                    domain: "App Development",
                                    year: "2026",
                                    status: "Live",
                                    description:
                                        "Cross-asset algorithmic trading and portfolio recommendation mobile application for retail traders.",
                                    client: "In-House",
                                    techStack: ["React Native", "Python", "FastAPI", "WebSockets"],
                                    image: "/alvest-without-bg.svg",
                                    liveLink: "https://play.google.com/store/apps/details?id=com.alvestt.alvesttapp&pcampaignid=web_share",
                                    imageFit: "contain",
                                    darkBg: true,
                                    platformIcons: ["playstore", "appstore"],
                                },
                                {
                                    title: "Bhav App",
                                    domain: "App Development",
                                    year: "2025",
                                    status: "Completed",
                                    description:
                                        "Secure mobile bullion tracking application with real-time and live market updates.",
                                    client: "Mauryan Jewels",
                                    techStack: ["React Native", "Node.js", "MongoDB", "Security", "+1"],
                                    image: "/bhav.png",
                                    liveLink: "https://play.google.com/store/apps/details?id=com.vipinsoni.bhav",
                                    imageFit: "cover",
                                    darkBg: true,
                                    platformIcons: ["playstore", "appstore"],
                                },
                                {
                                    title: "Investor Dashboard App",
                                    domain: "App Development",
                                    year: "2024",
                                    status: "Completed",
                                    description:
                                        "Private mobile portal for investors to monitor portfolio balances, capital allocations, and yield metrics.",
                                    client: "In-House",
                                    techStack: ["React Native", "Node.js", "PostgreSQL", "Biometrics"],
                                    image: "/planitt-logo.png",
                                    imageFit: "contain",
                                    darkBg: true,
                                    platformIcons: ["playstore", "appstore"],
                                },
                            ]}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio;
