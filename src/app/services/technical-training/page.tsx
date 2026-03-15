import Link from 'next/link';
import ServicePageLayout from '@/components/ServicePageLayout';
import {
    BookOpen,
    Briefcase,
    Cloud,
    Code2,
    Database,
    Lock,
    Rocket,
    Smartphone,
    Users
} from 'lucide-react';

export default function TechnicalTrainingPage() {
    const tracks = [
        {
            title: 'Full Stack Web Development',
            icon: <Code2 className="h-6 w-6" />,
            duration: '16 Weeks',
            level: 'Beginner to Advanced',
            topics: ['HTML/CSS/JavaScript', 'React + Next.js', 'Node.js + APIs', 'Git + Deployment']
        },
        {
            title: 'Mobile App Development',
            icon: <Smartphone className="h-6 w-6" />,
            duration: '14 Weeks',
            level: 'Beginner to Intermediate',
            topics: ['React Native Basics', 'State Management', 'API Integration', 'App Publishing Guide']
        },
        {
            title: 'Cloud & DevOps Foundations',
            icon: <Cloud className="h-6 w-6" />,
            duration: '10 Weeks',
            level: 'Intermediate',
            topics: ['Linux & Networking', 'Docker Basics', 'CI/CD Workflows', 'Cloud Deployment']
        },
        {
            title: 'Cybersecurity Essentials',
            icon: <Lock className="h-6 w-6" />,
            duration: '8 Weeks',
            level: 'Beginner',
            topics: ['Security Fundamentals', 'OWASP Top 10', 'Secure Coding', 'System Hardening']
        }
    ];

    const roadmap = [
        {
            phase: 'Phase 1',
            title: 'Foundation',
            points: ['Core concepts and setup', 'Hands-on coding exercises', 'Weekly mentor review']
        },
        {
            phase: 'Phase 2',
            title: 'Build',
            points: ['Mini projects for each module', 'Code review and debugging practice', 'Team collaboration with Git']
        },
        {
            phase: 'Phase 3',
            title: 'Career Launch',
            points: ['Capstone project', 'Resume + portfolio support', 'Mock interview and guidance']
        }
    ];

    const stack = [
        'JavaScript',
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'Express',
        'MongoDB',
        'PostgreSQL',
        'Docker',
        'GitHub Actions',
        'AWS Basics',
        'Vercel'
    ];

    return (
        <ServicePageLayout
            serviceName="Technical Training"
            serviceDescription="Industry-focused training programs designed to make you job-ready with practical projects, mentor feedback, and portfolio outcomes."
            serviceIcon={<BookOpen className="h-12 w-12 text-white" />}
            serviceColor="bg-gradient-to-r from-blue-600 to-blue-700"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                <section>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Choose Your Training Track</h2>
                        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Learn through real implementation, not only theory. Every track includes assignments, assessments, and project reviews.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {tracks.map((track) => (
                            <div
                                key={track.title}
                                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6"
                            >
                                <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-4">
                                    {track.icon}
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{track.title}</h3>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    <span className="font-medium">{track.duration}</span> | <span>{track.level}</span>
                                </div>
                                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                    {track.topics.map((topic) => (
                                        <li key={topic} className="flex items-start gap-2">
                                            <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                                            <span>{topic}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Learning Roadmap</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {roadmap.map((item) => (
                            <div key={item.phase} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <div className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">{item.phase}</div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1 mb-3">{item.title}</h3>
                                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                    {item.points.map((point) => (
                                        <li key={point} className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-0.5">•</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            Tools & Tech You Will Use
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {stack.map((item) => (
                                <span
                                    key={item}
                                    className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm border border-gray-200 dark:border-gray-700"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            Career Support Included
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                            <li className="flex items-start gap-2"><span className="text-emerald-600 dark:text-emerald-400">✓</span><span>Resume and LinkedIn optimization</span></li>
                            <li className="flex items-start gap-2"><span className="text-emerald-600 dark:text-emerald-400">✓</span><span>Portfolio and GitHub project polishing</span></li>
                            <li className="flex items-start gap-2"><span className="text-emerald-600 dark:text-emerald-400">✓</span><span>Mock interviews and technical feedback</span></li>
                            <li className="flex items-start gap-2"><span className="text-emerald-600 dark:text-emerald-400">✓</span><span>Guidance for internships and entry-level roles</span></li>
                        </ul>
                    </div>
                </section>

                <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/10 rounded-xl p-4">
                            <Users className="h-6 w-6 mb-2" />
                            <h4 className="font-semibold">Small Batches</h4>
                            <p className="text-sm text-blue-100 mt-1">Focused mentoring and regular doubt-solving sessions.</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4">
                            <Rocket className="h-6 w-6 mb-2" />
                            <h4 className="font-semibold">Project-First</h4>
                            <p className="text-sm text-blue-100 mt-1">Build portfolio-ready projects from week one.</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4">
                            <BookOpen className="h-6 w-6 mb-2" />
                            <h4 className="font-semibold">Flexible Learning</h4>
                            <p className="text-sm text-blue-100 mt-1">Weekend and weekday options with guided practice.</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/main#contact"
                            className="inline-flex items-center justify-center rounded-lg bg-white text-blue-700 px-6 py-3 font-semibold hover:bg-blue-50 transition-colors"
                        >
                            Book Free Counselling
                        </Link>
                        <Link
                            href="/main#services"
                            className="inline-flex items-center justify-center rounded-lg border border-white/40 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
                        >
                            Explore More Services
                        </Link>
                    </div>
                </section>
            </div>
        </ServicePageLayout>
    );
}
