'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Globe } from 'lucide-react';

// Job data structure
interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    snippet: string;
    description: string;
    requirements: string[];
    niceToHave: string[];
    responsibilities: string[];
    benefits: string[];
    contact?: string;
}

// Team member data structure
interface TeamMember {
    name: string;
    role: string;
    image: string;
    portfolio?: string;
}

// Team members data
const teamMembers: TeamMember[] = [
    {
        name: 'Piyush Tembhekar',
        role: 'CEO, Financial Distribution',
        image: '/CEO_Photo.png',
        portfolio: '#',
    },
    {
        name: 'Sarth Srivastava',
        role: 'CTO, Technical Delivery',
        image: '/sarth_avatar.jpeg',
        portfolio: '#',
    },
    {
        name: 'Om Shrikhande',
        role: 'Software Developer',
        image: '/om_profile.jpeg', // Default image as requested
        portfolio: 'https://omshrikhande.netlify.app/',
    },
    {
        name: 'Ansh Mishra',
        role: 'Software Developer',
        image: '/ansh_profile.jpeg', // Default image as requested
        portfolio: 'https://ansh-dev-portfolio.netlify.app/',
    },
    {
        name: 'T. Devashish Pillay ',
        role: 'Software Developer',
        image: '/dev_profile.jpeg', // Default image as requested
        portfolio: 'https://misude.netlify.app/',
    },
    {
        name: 'Shivam Badade',
        role: 'Software Developer',
        image: '/shivam_profile.jpg', // Default image as requested
        portfolio: 'https://dev.netlify.app/',
    },
    {
        name: 'Harsh R. Meshram ',
        role: 'Digital Marketer',
        image: '/Harsh_profile.jpg', // Default image as requested
        portfolio: 'https://harshrmeshram.vercel.app/',
    },

];

// Sample job data
const initialJobs: Job[] = [
    {
        id: 'financial-advisor',
        title: 'Financial Advisor',
        department: 'Advisory',
        location: 'Nagpur/Work from office',
        type: 'Full-time',
        snippet: 'Help clients achieve their financial goals through personalized planning and investment strategies.',
        description: 'We are looking for a passionate Financial Advisor to join our growing team. You will work directly with clients to understand their financial goals and develop personalized strategies to help them achieve those goals.',
        requirements: [
            'Bachelor\'s degree in Finance, Economics, or related field',
            'Valid financial advisory certifications (CFP, CFA, or equivalent)',
            'Atleast one year of experience in financial planning or wealth management',
            'Strong understanding of investment products and financial markets'
        ],
        niceToHave: [
            'Experience with financial planning software',
            'Knowledge of tax planning strategies',
            'Strong network in the Nagpur region'
        ],
        responsibilities: [
            'Conduct financial needs analysis for clients',
            'Develop personalized financial plans',
            'Recommend appropriate investment strategies',
            'Monitor client portfolios and make adjustments as needed',
            'Stay current on market trends and regulatory changes'
        ],
        benefits: [
            'Competitive salary and commission structure',
            'Health insurance coverage',
            'Professional development opportunities',
            'Collaborative work environment',
            'Work-life balance'
        ]
    },
    {
        id: 'app-development-intern',
        title: 'App Development Intern',
        department: 'Technology',
        location: 'Nagpur/Work from office',
        type: 'Internship',
        snippet: 'Build cross-platform mobile applications and gain real-world experience in app development with our technology team.',
        description: 'Join our technology team as an App Development Intern and work on building and maintaining cross-platform mobile applications. You will collaborate with experienced developers, contribute to live projects, and gain hands-on experience with modern mobile development frameworks.',
        requirements: [
            'Currently pursuing a degree in Computer Science, IT, or related field',
            'Basic knowledge of mobile app development (Flutter, React Native, or native Android/iOS)',
            'Familiarity with Dart, JavaScript, or Swift/Kotlin',
            'Eagerness to learn and adapt to new technologies'
        ],
        niceToHave: [
            'Published apps on Play Store or App Store',
            'Experience with state management solutions',
            'Understanding of RESTful APIs and backend integration',
            'Interest in fintech or financial applications'
        ],
        responsibilities: [
            'Assist in building and maintaining mobile applications',
            'Collaborate with the design team to implement pixel-perfect UI',
            'Write clean, well-documented, and testable code',
            'Participate in code reviews and team stand-ups',
            'Help with bug fixes, testing, and QA processes'
        ],
        benefits: [
            'Official Offer Letter',
            'Completion Certificate',
            'Dedicated Mentor Support',
            'Live Learning Sessions',
            'Hands-on experience with Live Projects'
        ],
        contact: '8275441457'
    },
    {
        id: 'web-development-intern',
        title: 'Web Development Intern',
        department: 'Technology',
        location: 'Nagpur/Work from office',
        type: 'Internship',
        snippet: 'Gain hands-on experience building real-world web applications using modern frameworks alongside our development team.',
        description: 'We are looking for a motivated Web Development Intern to join our technology team. You will work on real projects, contribute to our codebase, and learn modern web development practices in a collaborative environment.',
        requirements: [
            'Currently pursuing a degree in Computer Science, IT, or related field',
            'Basic knowledge of HTML, CSS, and JavaScript',
            'Familiarity with at least one frontend framework (React, Next.js, or Angular)',
            'Eagerness to learn and adapt to new technologies'
        ],
        niceToHave: [
            'Experience with TypeScript and Next.js',
            'Understanding of Git and version control',
            'Personal projects or contributions to open-source',
            'Interest in fintech or financial applications'
        ],
        responsibilities: [
            'Assist in developing and maintaining web applications',
            'Write clean, well-documented, and responsive code',
            'Participate in code reviews and team stand-ups',
            'Help with bug fixes, testing, and QA processes',
            'Contribute to technical documentation'
        ],
        benefits: [
            'Official Offer Letter',
            'Completion Certificate',
            'Dedicated Mentor Support',
            'Live Learning Sessions',
            'Hands-on experience with Live Projects'
        ],
        contact: '8275441457'
    },
    {
        id: 'digital-marketing-intern',
        title: 'Digital Marketing Intern',
        department: 'Marketing',
        location: 'Nagpur/Work from office',
        type: 'Internship',
        snippet: 'Learn and execute digital marketing strategies including SEO, social media, and content marketing for financial services.',
        description: 'We are looking for an enthusiastic Digital Marketing Intern to join our marketing team. This position offers hands-on experience in digital marketing, SEO, social media management, content creation, and campaign analytics for financial services.',
        requirements: [
            'Currently pursuing a degree in Marketing, Communications, or related field',
            'Strong written and verbal communication skills',
            'Familiarity with social media platforms and digital marketing concepts',
            'Basic understanding of content creation and copywriting'
        ],
        niceToHave: [
            'Experience with marketing automation tools (Google Ads, Meta Ads)',
            'Knowledge of SEO best practices and analytics tools',
            'Interest in financial services industry',
            'Basic understanding of graphic design (Canva, Figma)'
        ],
        responsibilities: [
            'Assist in creating content for social media and blog posts',
            'Help monitor and analyze marketing campaign performance',
            'Support the team in organizing marketing events and campaigns',
            'Conduct market research and competitor analysis',
            'Contribute ideas for digital marketing initiatives'
        ],
        benefits: [
            'Official Offer Letter',
            'Completion Certificate',
            'Dedicated Mentor Support',
            'Live Learning Sessions',
            'Hands-on experience with Live Projects'
        ],
        contact: '8275441457'
    },
    {
        id: 'ui-ux-design-intern',
        title: 'UI/UX Design Intern',
        department: 'Design',
        location: 'Nagpur/Work from office',
        type: 'Internship',
        snippet: 'Create intuitive and visually stunning user interfaces and experiences for our financial planning platform.',
        description: 'Join our design team as a UI/UX Design Intern and help shape the user experience of our financial planning platform. You will work on wireframing, prototyping, and designing beautiful interfaces that make complex financial tools simple and delightful to use.',
        requirements: [
            'Currently pursuing a degree in Design, HCI, or related field',
            'Proficiency in design tools such as Figma, Adobe XD, or Sketch',
            'Basic understanding of UI/UX design principles and user-centered design',
            'An eye for clean and modern aesthetics'
        ],
        niceToHave: [
            'Experience with design systems and component libraries',
            'Knowledge of prototyping and interaction design',
            'Portfolio showcasing personal or academic design projects',
            'Understanding of front-end development basics (HTML, CSS)'
        ],
        responsibilities: [
            'Assist in designing wireframes, mockups, and prototypes',
            'Conduct user research and usability testing',
            'Collaborate with developers to implement design specifications',
            'Help maintain and evolve the design system',
            'Contribute to improving the overall user experience'
        ],
        benefits: [
            'Official Offer Letter',
            'Completion Certificate',
            'Dedicated Mentor Support',
            'Live Learning Sessions',
            'Hands-on experience with Live Projects'
        ],
        contact: '8275441457'
    },
    {
        id: 'ai-ml-intern',
        title: 'AI & ML Intern',
        department: 'Technology',
        location: 'Nagpur/Work from office',
        type: 'Internship',
        snippet: 'Explore and apply artificial intelligence and machine learning techniques to solve real-world financial problems.',
        description: 'We are seeking a curious and driven AI & ML Intern to join our technology team. You will work on building intelligent models, analyzing data, and developing AI-powered features that enhance our financial planning platform with smart insights and automation.',
        requirements: [
            'Currently pursuing a degree in Computer Science, Data Science, AI/ML, or related field',
            'Basic knowledge of Python and machine learning libraries (NumPy, Pandas, Scikit-learn)',
            'Understanding of fundamental ML concepts (regression, classification, clustering)',
            'Eagerness to learn and experiment with new AI technologies'
        ],
        niceToHave: [
            'Experience with deep learning frameworks (TensorFlow, PyTorch)',
            'Knowledge of NLP or computer vision techniques',
            'Familiarity with data visualization tools',
            'Interest in applying AI to financial data and analytics'
        ],
        responsibilities: [
            'Assist in building and training machine learning models',
            'Perform data cleaning, preprocessing, and feature engineering',
            'Help evaluate model performance and iterate on improvements',
            'Collaborate with the development team to integrate ML features',
            'Document experiments, findings, and model architectures'
        ],
        benefits: [
            'Official Offer Letter',
            'Completion Certificate',
            'Dedicated Mentor Support',
            'Live Learning Sessions',
            'Hands-on experience with Live Projects'
        ],
        contact: '8275441457'
    },
    {
        id: 'python-development-intern',
        title: 'Python Development Intern',
        department: 'Technology',
        location: 'Nagpur/Work from office',
        type: 'Internship',
        snippet: 'Develop backend services, automation scripts, and data-driven solutions using Python for our financial platform.',
        description: 'Join our technology team as a Python Development Intern and work on building robust backend services, automation tools, and data pipelines. You will gain hands-on experience writing production-quality Python code in a collaborative environment.',
        requirements: [
            'Currently pursuing a degree in Computer Science, IT, or related field',
            'Proficiency in Python programming fundamentals',
            'Basic understanding of data structures and algorithms',
            'Eagerness to learn and adapt to new frameworks and tools'
        ],
        niceToHave: [
            'Experience with Django, Flask, or FastAPI',
            'Familiarity with databases (SQL, MongoDB)',
            'Knowledge of web scraping or data processing libraries',
            'Understanding of REST APIs and microservices architecture'
        ],
        responsibilities: [
            'Assist in developing backend services and APIs',
            'Write automation scripts and data processing pipelines',
            'Participate in code reviews and agile team meetings',
            'Help with debugging, testing, and optimization',
            'Contribute to technical documentation and best practices'
        ],
        benefits: [
            'Official Offer Letter',
            'Completion Certificate',
            'Dedicated Mentor Support',
            'Live Learning Sessions',
            'Hands-on experience with Live Projects'
        ],
        contact: '8275441457'
    },
    {
        id: 'business-development-associate-intern',
        title: 'Business Development Associate (BDA)',
        department: 'Business Development',
        location: 'Nagpur/Work from office',
        type: 'Internship',
        snippet: 'Drive business growth by identifying new opportunities, building client relationships, and supporting strategic initiatives.',
        description: 'We are looking for a proactive Business Development Associate (BDA) Intern to help us expand our market presence. You will assist in identifying potential clients, building relationships, and supporting the team in executing growth strategies for our financial services.',
        requirements: [
            'Currently pursuing a degree in Business Administration, Marketing, Finance, or related field',
            'Strong communication and interpersonal skills',
            'Basic understanding of sales processes and business development concepts',
            'Self-motivated with a results-oriented mindset'
        ],
        niceToHave: [
            'Experience in sales, client interaction, or business development',
            'Knowledge of CRM tools (Salesforce, HubSpot)',
            'Interest in financial services and fintech industry',
            'Understanding of market research and lead generation techniques'
        ],
        responsibilities: [
            'Assist in identifying and researching potential business opportunities',
            'Help generate and qualify leads through various channels',
            'Support the team in client outreach and relationship management',
            'Conduct market research and competitive analysis',
            'Prepare presentations and proposals for potential clients'
        ],
        benefits: [
            'Official Offer Letter',
            'Completion Certificate',
            'Dedicated Mentor Support',
            'Live Learning Sessions',
            'Hands-on experience with Live Projects'
        ],
        contact: '8275441457'
    },
    {
        id: 'marketing-intern',
        title: 'Marketing Intern',
        department: 'Marketing',
        location: 'Nagpur/Work from office',
        type: 'Internship',
        snippet: 'Assist in creating and implementing marketing strategies, campaigns, and brand initiatives for our financial services.',
        description: 'We are looking for an enthusiastic Marketing Intern to join our team. This position offers hands-on experience in marketing strategy, content creation, campaign management, and brand building for financial services.',
        requirements: [
            'Currently pursuing a degree in Marketing, Communications, or related field',
            'Strong written and verbal communication skills',
            'Familiarity with social media platforms and marketing concepts',
            'Basic understanding of graphic design principles'
        ],
        niceToHave: [
            'Experience with marketing automation tools',
            'Knowledge of SEO best practices',
            'Interest in financial services industry',
            'Experience with Canva, Figma, or Adobe Creative Suite'
        ],
        responsibilities: [
            'Assist in creating content for social media and blog posts',
            'Help monitor and analyze marketing campaign performance',
            'Support the team in organizing marketing events',
            'Conduct market research and competitor analysis',
            'Contribute ideas for marketing initiatives'
        ],
        benefits: [
            'Official Offer Letter',
            'Completion Certificate',
            'Dedicated Mentor Support',
            'Live Learning Sessions',
            'Hands-on experience with Live Projects'
        ],
        contact: '8275441457'
    },
    {
        id: 'software-developer-intern',
        title: 'Software Developer Intern',
        department: 'Technology',
        location: 'Nagpur/Work from office',
        type: 'Internship',
        snippet: 'Gain hands-on experience building real-world web and mobile applications alongside our development team.',
        description: 'We are looking for a motivated Software Developer Intern to join our technology team. You will work on real projects, contribute to our codebase, and learn modern development practices in a collaborative environment.',
        requirements: [
            'Currently pursuing a degree in Computer Science, IT, or related field',
            'Basic knowledge of HTML, CSS, and JavaScript',
            'Familiarity with at least one programming language (Python, Java, or TypeScript)',
            'Eagerness to learn and adapt to new technologies'
        ],
        niceToHave: [
            'Experience with React or Next.js',
            'Understanding of Git and version control',
            'Personal projects or contributions to open-source',
            'Interest in fintech or financial applications'
        ],
        responsibilities: [
            'Assist in developing and maintaining web applications',
            'Write clean, well-documented code under mentorship',
            'Participate in code reviews and team stand-ups',
            'Help with bug fixes, testing, and QA processes',
            'Contribute to technical documentation'
        ],
        benefits: [
            'Official Offer Letter',
            'Completion Certificate',
            'Dedicated Mentor Support',
            'Live Learning Sessions',
            'Hands-on experience with Live Projects'
        ],
        contact: '8275441457'
    },
    {
        id: 'data-analytics-intern',
        title: 'Data Analytics Intern',
        department: 'Technology',
        location: 'Nagpur/Work from office',
        type: 'Internship',
        snippet: 'Analyze complex financial datasets, build dynamic dashboards, and extract insights to drive business and product decisions.',
        description: 'We are looking for a passionate Data Analytics Intern to join our team. In this role, you will work closely with the technology, product, and business teams to transform raw data into actionable insights, build interactive reports, and support data-driven decision-making for our financial services platform.',
        requirements: [
            'Currently pursuing a degree in Data Science, Statistics, Mathematics, Computer Science, or related field',
            'Strong understanding of database concepts and proficiency in writing SQL queries',
            'Solid programming skills in Python (specifically Pandas, NumPy) or R for data manipulation',
            'Familiarity with data visualization tools (Tableau, Power BI, or Python visualization libraries)',
            'Analytical mindset with strong problem-solving skills and attention to detail'
        ],
        niceToHave: [
            'Basic understanding of statistical concepts and predictive modeling',
            'Familiarity with Excel (advanced functions, pivot tables)',
            'Interest in personal finance, investing, or fintech industries',
            'Experience with Git and version control'
        ],
        responsibilities: [
            'Perform exploratory data analysis to discover trends, patterns, and insights',
            'Design, develop, and maintain clean, interactive dashboards for internal stakeholders',
            'Extract and clean data from various sources using SQL and Python',
            'Collaborate with product and marketing teams to define and track key business metrics',
            'Document analysis methodologies and present findings clearly to team members'
        ],
        benefits: [
            'Official Offer Letter',
            'Completion Certificate',
            'Dedicated Mentor Support',
            'Live Learning Sessions',
            'Hands-on experience with Live Projects'
        ],
        contact: '8275441457'
    }
];

export default function CareersPage() {

    const [jobs] = useState<Job[]>(initialJobs);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        position: '',
        about: '',
        resume: null as File | null,
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error when user starts typing again
        if (submitError) setSubmitError(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Client-side file size validation (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setSubmitError('File size must be under 5MB. Please choose a smaller file.');
                e.target.value = '';
                return;
            }

            // Client-side file type validation
            const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ];
            if (!allowedTypes.includes(file.type)) {
                setSubmitError('Only PDF, DOC, and DOCX files are allowed.');
                e.target.value = '';
                return;
            }

            setFormData({
                ...formData,
                resume: file,
            });
            if (submitError) setSubmitError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Build FormData to send to the API (includes the file)
            const payload = new FormData();
            payload.append('name', formData.name);
            payload.append('email', formData.email);
            payload.append('phone', formData.phone);
            payload.append('linkedin', formData.linkedin);
            payload.append('position', formData.position);
            payload.append('about', formData.about);
            if (formData.resume) {
                payload.append('resume', formData.resume);
            }

            const response = await fetch('/api/apply', {
                method: 'POST',
                body: payload,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Something went wrong. Please try again.');
            }

            // Success
            setFormSubmitted(true);

            // Reset form after showing success
            setTimeout(() => {
                setFormSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    linkedin: '',
                    position: '',
                    about: '',
                    resume: null,
                });
                // Reset the file input
                const fileInput = document.getElementById('resume') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            }, 5000);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to submit application. Please try again or email us directly at planittsolutions@gmail.com.';
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 transition-colors duration-300">

            {/* Hero Section */}
            <section className="relative bg-linear-to-r from-[#ffdc40] to-zinc-900 text-white py-20 pt-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold my-10">Join Our Team</h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                            Help us shape the future of financial planning and make a difference in people&apos;s lives.
                        </p>
                    </div>
                </div>
                <div className="absolute inset-0 bg-black opacity-30"></div>
            </section>

            {/* Why Work With Us Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Why Work With Us</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 dark:text-[#e7c973]">Our Culture</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                At Planitt, we believe in fostering a collaborative environment where innovation thrives. Our team is dedicated to making financial planning accessible to everyone, and we&apos;re passionate about helping our clients achieve their goals.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                We value work-life balance and offer flexible working arrangements to ensure our team members can perform at their best. Our hybrid work policy allows for a mix of in-office collaboration and remote work, giving you the flexibility you need.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4 dark:text-[#e7c973]">Growth & Development</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                We&apos;re committed to helping our team members grow both personally and professionally. We provide ongoing training, mentorship, and opportunities to work on challenging projects that expand your skills and knowledge.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                As a growing company, we offer clear paths for advancement and the chance to make a significant impact. Join us and be part of shaping the future of financial planning in India.
                            </p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold mb-4 dark:text-white">Benefits & Perks</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-gray-950/50 border border-transparent dark:border-gray-700">
                                <h4 className="font-medium text-[#b78622] dark:text-[#e7c973]">Competitive Salary</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Compensation that values your expertise</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-gray-950/50 border border-transparent dark:border-gray-700">
                                <h4 className="font-medium text-[#b78622] dark:text-[#e7c973]">Learning Budget</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Resources for professional development</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-gray-950/50 border border-transparent dark:border-gray-700">
                                <h4 className="font-medium text-[#b78622] dark:text-[#e7c973]">Flexible Work</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Hybrid work policy for better work-life balance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Our Team Section */}
            <section className="py-16 bg-white dark:bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Meet Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800 text-center hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative w-32 h-32 mx-auto mb-6 bg-white dark:bg-gray-800 rounded-full overflow-hidden shadow-md border-4 border-white dark:border-gray-800">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                                <p className="text-[#b78622] dark:text-[#e7c973] font-semibold text-sm mb-6">{member.role}</p>

                                {member.portfolio && member.portfolio !== '#' && (
                                    <a
                                        href={member.portfolio}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#b78622]/10 dark:bg-[#e7c973]/10 text-[#b78622] dark:text-[#e7c973] rounded-full text-sm font-medium hover:bg-[#b78622] hover:text-white dark:hover:bg-[#e7c973] dark:hover:text-gray-900 transition-all duration-300"
                                    >
                                        <Globe className="w-4 h-4" />
                                        Portfolio
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Open Positions</h2>

                    {selectedJob ? (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/50 p-6 mb-8 border border-transparent dark:border-gray-700">
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="text-[#b78622] dark:text-[#e7c973] mb-4 flex items-center hover:text-[#9f7220] dark:hover:text-[#f0d996] transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Back to all positions
                            </button>

                            <h3 className="text-2xl font-bold mb-2 dark:text-white">{selectedJob.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-[#fff1cf] dark:bg-[#4a3818]/60 text-[#8f651a] dark:text-[#e7c973] text-sm px-3 py-1 rounded-full">{selectedJob.department}</span>
                                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm px-3 py-1 rounded-full">{selectedJob.location}</span>
                                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm px-3 py-1 rounded-full">{selectedJob.type}</span>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedJob.description}</p>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-2 dark:text-white">Responsibilities</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {selectedJob.responsibilities.map((item, index) => (
                                        <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-2 dark:text-white">Requirements</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {selectedJob.requirements.map((item, index) => (
                                        <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-2 dark:text-white">Nice to Have</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {selectedJob.niceToHave.map((item, index) => (
                                        <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-2 dark:text-white">{selectedJob.type === 'Internship' ? 'What you\'ll get' : 'Benefits'}</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {selectedJob.benefits.map((item, index) => (
                                        <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {selectedJob.contact && (
                                <div className="mb-8 bg-gradient-to-r from-[#fff8e7] to-[#fff1cf] dark:from-[#4a3818]/30 dark:to-[#3d2e12]/30 rounded-lg p-4 border border-[#e9c978]/30 dark:border-[#e7c973]/20">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#b78622]/10 dark:bg-[#e7c973]/10">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#b78622] dark:text-[#e7c973]" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Contact for more details</p>
                                            <a href={`tel:${selectedJob.contact}`} className="text-lg font-bold text-[#b78622] dark:text-[#e7c973] hover:underline">{selectedJob.contact}</a>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="text-center">
                                <a href="#application-form" className="inline-block bg-[#b78622] hover:bg-[#9f7220] text-white font-medium py-2 px-6 rounded-md transition-colors duration-300">
                                    Apply for this Position
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {/* Full-time Roles Section */}
                            <div>
                                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 border-b pb-2 border-gray-200 dark:border-gray-700">Full-Time Roles</h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {jobs.filter(job => job.type !== 'Internship').map((job) => (
                                        <div key={job.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/50 overflow-hidden border border-transparent dark:border-gray-700">
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold mb-2 dark:text-white">{job.title}</h3>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <span className="bg-[#fff1cf] dark:bg-[#4a3818]/60 text-[#8f651a] dark:text-[#e7c973] text-xs px-2 py-1 rounded-full">{job.department}</span>
                                                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">{job.location}</span>
                                                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs px-2 py-1 rounded-full">{job.type}</span>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 mb-4">{job.snippet}</p>
                                                <button
                                                    onClick={() => setSelectedJob(job)}
                                                    className="text-[#b78622] dark:text-[#e7c973] hover:text-[#8f651a] dark:hover:text-[#f0d996] font-medium flex items-center transition-colors"
                                                >
                                                    View Details
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Internships Section */}
                            <div>
                                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 border-b pb-2 border-gray-200 dark:border-gray-700">Internships</h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {jobs.filter(job => job.type === 'Internship').map((job) => (
                                        <div key={job.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/50 overflow-hidden border border-transparent dark:border-gray-700">
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold mb-2 dark:text-white">{job.title}</h3>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <span className="bg-[#fff1cf] dark:bg-[#4a3818]/60 text-[#8f651a] dark:text-[#e7c973] text-xs px-2 py-1 rounded-full">{job.department}</span>
                                                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">{job.location}</span>
                                                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs px-2 py-1 rounded-full">{job.type}</span>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 mb-4">{job.snippet}</p>
                                                <button
                                                    onClick={() => setSelectedJob(job)}
                                                    className="text-[#b78622] dark:text-[#e7c973] hover:text-[#8f651a] dark:hover:text-[#f0d996] font-medium flex items-center transition-colors"
                                                >
                                                    View Details
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Application Form Section */}
            <section id="application-form" className="py-16 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Apply Now</h2>

                    {formSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500 dark:text-green-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">Thank You for Your Application!</h3>
                            <p className="text-green-700 dark:text-green-400">We&apos;ve received your application and will be in touch soon.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/50 p-6 border border-transparent dark:border-gray-700">
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b78622] text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b78622] text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b78622] text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn Profile (Optional)</label>
                                    <input
                                        type="url"
                                        id="linkedin"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b78622] text-gray-900 dark:text-white"
                                        placeholder="https://linkedin.com/in/yourprofile"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position Applying For *</label>
                                <select
                                    id="position"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b78622] text-gray-900 dark:text-white"
                                >
                                    <option value="">Select a position</option>
                                    {jobs.map((job) => (
                                        <option key={job.id} value={job.title}>{job.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="about" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">About You *</label>
                                <textarea
                                    id="about"
                                    name="about"
                                    value={formData.about}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b78622] text-gray-900 dark:text-white resize-y"
                                    placeholder="Tell us a bit about yourself, your experience, or why you'd be a great fit for this role."
                                ></textarea>
                            </div>

                            <div className="mb-8">
                                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Resume (PDF/DOC) *</label>
                                <input
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    onChange={handleFileChange}
                                    required
                                    accept=".pdf,.doc,.docx"
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b78622] text-gray-900 dark:text-white"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Maximum file size: 5MB</p>
                            </div>

                            {submitError && (
                                <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 dark:text-red-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-red-700 dark:text-red-300 text-sm">{submitError}</p>
                                    </div>
                                </div>
                            )}

                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#b78622] hover:bg-[#9f7220] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 inline-flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit Application'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>

            {/* Hiring Process Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Our Hiring Process</h2>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-[#e9c978] dark:bg-zinc-700/50 transform -translate-x-1/2"></div>

                            {/* Timeline items */}
                            <div className="space-y-12">
                                {/* Step 1 */}
                                <div className="relative flex flex-col md:flex-row items-center">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#b78622] text-white font-bold z-10 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">1</div>
                                    <div className="mt-4 md:mt-0 md:w-1/2 md:pr-8 md:text-right md:mr-4">
                                        <h3 className="text-xl font-semibold text-[#b78622] dark:text-[#e7c973]">Resume Review</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Our team reviews your application and resume</p>
                                    </div>
                                    <div className="hidden md:block md:w-1/2 md:pl-12"></div>
                                </div>

                                {/* Step 2 */}
                                <div className="relative flex flex-col md:flex-row items-center">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#b78622] text-white font-bold z-10 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">2</div>
                                    <div className="hidden md:block md:w-1/2 md:pr-8"></div>
                                    <div className="mt-4 md:mt-0 md:w-1/2 md:pl-12">
                                        <h3 className="text-xl font-semibold text-[#b78622] dark:text-[#e7c973]">Assessment / Aptitude Test</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Short test to evaluate your problem-solving and role-related skills</p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="relative flex flex-col md:flex-row items-center">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#b78622] text-white font-bold z-10 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">3</div>
                                    <div className="mt-4 md:mt-0 md:w-1/2 md:pr-8 md:text-right md:mr-4">
                                        <h3 className="text-xl font-semibold text-[#b78622] dark:text-[#e7c973]">Final Interview</h3>
                                        <p className="text-gray-600 dark:text-gray-400">In-depth discussion with the team and leadership</p>
                                    </div>
                                    <div className="hidden md:block md:w-1/2 md:pl-12"></div>
                                </div>

                                {/* Step 4 */}
                                <div className="relative flex flex-col md:flex-row items-center">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#b78622] text-white font-bold z-10 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">4</div>
                                    <div className="hidden md:block md:w-1/2 md:pr-8"></div>
                                    <div className="mt-4 md:mt-0 md:w-1/2 md:pl-12">
                                        <h3 className="text-xl font-semibold text-[#b78622] dark:text-[#e7c973]">Offer Letter</h3>
                                        <p className="text-gray-600 dark:text-gray-400">If selected, you&apos;ll receive our offer</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-gray-700 dark:text-gray-300 mb-4">The entire process typically takes 4-6 weeks from application to offer.</p>
                            <p className="text-gray-700 dark:text-gray-300">
                                For any questions about the hiring process, please contact our HR team at{' '}
                                <a href="mailto:planittsolutions@gmail.com" className="text-[#b78622] dark:text-[#e7c973] hover:underline">planittsolutions@gmail.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}


