'use client';
import Link from "next/link";
import ProjectSection from "@/components/ProjectSection";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, CheckCircle, Code2, Shield, Target } from 'lucide-react';

type HomeMode = 'all' | 'financial' | 'technical';

type PortfolioProps = {
    mode?: HomeMode;
};

const Portfolio = ({ mode = 'all' }: PortfolioProps) => {
    return (
        <section id="portfolio" className={"py-12 transition-colors duration-300 sm:py-20 sm:pb-0"}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center sm:mb-16"
                >
                    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Our Portfolio
                    </h2>
                    <ProjectSection
                        title="Web Development Projects"
                        subtitle="A showcase of our high-performance websites and mobile applications."
                        accentColor="blue"
                        projects={[
                            {
                                title: "ZeyNix Website",
                                description:
                                    "A premium e-commerce platform for fashion enthusiasts, featuring a seamless shopping experience and responsive design.",
                                image: "/Zeynix.png",
                                liveLink: "https://www.zeynix.in/",
                                tags: ["E-commerce", "React", "Next.js"],
                            },
                            {
                                title: "Krypsm Website",
                                description:
                                    "A secure and intuitive cryptocurrency trading platform dashboard with real-time data visualization.",
                                image: "/Krypsm.png",
                                liveLink: "https://krypsm.com/",
                                tags: ["Web App", "Fintech", "Dashboard"],
                            },
                            {
                                title: "Sawarnaratna Website",
                                description:
                                    "A dry fruit gifting website where customers can build their own custom gift hampers for friends and family through a simple, responsive shopping flow.",
                                image: "/sawarnaratna.png",
                                liveLink: "https://sawarnaratna.netlify.app/",
                                tags: ["E-commerce", "Gift Hampers", "Custom Orders"],
                            },
                            {
                                title: "Capita Prime LLC Website",
                                description:
                                    "A real estate website built for Dubai customers, focused on presenting land-selling opportunities with a professional layout and lead-oriented experience.",
                                image: "/CapitaPrime.png",
                                liveLink: "https://capitaprimellc.netlify.app/",
                                tags: ["Real Estate", "Dubai Market", "Lead Generation"],
                            },
                            {
                                title: "Coffee Culture Website",
                                description:
                                    "A coffee shop website designed to showcase products, services, and events while providing an easy-to-use online ordering system.",
                                image: "/Coffee-Culture.jpg",
                                liveLink: "https://coffeeculturenagpur.com/",
                                tags: ["Food & Beverage", "Online Ordering", "Event Management"],
                            },
                        ]}
                    />

                    <ProjectSection
                        title="App Development Projects"
                        subtitle="Selected mobile applications and internal digital products."
                        accentColor="indigo"
                        projects={[ // add new projects here
                            {
                                title: "Investor Dashboard App",
                                description:
                                    "A private in-house mobile application built for our investors to track their portfolio, profits, growth analytics, and real-time performance insights. The platform focuses on security, scalability, and data transparency.",
                                image: "/planitt-logo.png",
                                imageFit: "contain", // full logo
                                darkBg: true, // ✅ black background
                                tags: ["In-house", "Fintech", "Dashboard"],
                            },
                            {
                                title: "Bhav App",
                                description:
                                    "Bhav App is mainly designed for jewelery shopkeepers, whose customers will connect with them through this app. Sellers can add products to their inventory and customers can send a purchase or sale request based on the product of their choice. The seller may subsequently review and accept or reject the request.",
                                image: "/bhav.png",
                                imageFit: "cover", // full logo
                                darkBg: true, // ✅ black background
                                tags: ["Client-Project", "Gold & Silver"],
                            },
                            {
                                title: "Coming Soon",
                                description:
                                    "A recommendation app that will recommend stocks, mutual funds, futures & options, forex and crypto.",
                                image: "/planitt-app-black.png",
                                imageFit: "contain", // full logo
                                darkBg: true, // ✅ black background
                                tags: ["In-house", "Fintech", "Dashboard"],
                            },
                        ]}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio;
