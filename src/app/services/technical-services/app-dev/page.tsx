import Link from "next/link";
import ProjectSection from "@/components/ProjectSection";
import {
  Smartphone,
  Layers,
  Zap,
  Code,
  ShieldCheck,
  Globe,
} from "lucide-react";
import {
  SiReact,
  SiFlutter,
  SiExpo,
  SiFirebase,
  SiTypescript,
  SiApple,
  SiAndroid,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

export default function AppDevPage() {
  const monthlyPrice = 6999;
  const annualPrice = 59999;
  const discount = 29 / 100 * (monthlyPrice * 12);
  const annualBill = parseFloat(discount.toFixed(0)) / 12;

  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            App Development
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            Native and cross-platform mobile applications built with modern
            technologies to deliver performance, scalability, and exceptional
            user experience.
          </p>
        </div>

        {/* Core Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Smartphone />}
            title="Mobile App Development"
            description="High-quality Android and iOS applications tailored to your business goals."
          />
          <FeatureCard
            icon={<Layers />}
            title="Cross-Platform Apps"
            description="Single codebase applications using modern cross-platform frameworks."
          />
          <FeatureCard
            icon={<Zap />}
            title="High Performance"
            description="Fast, responsive, and optimized applications for smooth user experience."
          />
          <FeatureCard
            icon={<Code />}
            title="Clean & Scalable Code"
            description="Maintainable architecture designed for long-term growth."
          />
          <FeatureCard
            icon={<ShieldCheck />}
            title="Secure Applications"
            description="Security best practices to protect data and user privacy."
          />
          <FeatureCard
            icon={<Globe />}
            title="API & Backend Integration"
            description="Seamless integration with APIs, cloud services, and databases."
          />
        </div>
        {/* Key Features */}
        <section className="mb-20">
          <div className="max-w-5xl mx-auto bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white text-center">
              Key Features
            </h2>

            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                Modern frameworks (React Native & Flutter)
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                High performance & native-like experience
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                Secure & scalable app architecture
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                Fully responsive across iOS & Android
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                Clean, maintainable codebase
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                Offline-first capabilities & sync
              </li>
            </ul>
          </div>
        </section>

        {/* Technologies */}
        <div className="mb-20">
          <h2 className="text-2xl text-center font-semibold mb-8">Technologies We Use</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <TechItem icon={<SiReact />} label="React" color="text-cyan-500" />
            <TechItem
              icon={<TbBrandReactNative />}
              label="React Native"
              color="text-sky-500"
            />
            <TechItem icon={<SiFlutter />} label="Flutter" color="text-blue-400" />
            <TechItem
              icon={<SiExpo />}
              label="Expo"
              color="text-gray-900 dark:text-gray-100"
            />
            <TechItem
              icon={<SiTypescript />}
              label="TypeScript"
              color="text-blue-600"
            />
            <TechItem
              icon={<SiFirebase />}
              label="Firebase"
              color="text-yellow-500"
            />
            <TechItem
              icon={<SiAndroid />}
              label="Android (Kotlin)"
              color="text-green-500"
            />
            <TechItem icon={<SiApple />} label="iOS (Swift)" color="text-orange-600" />
          </div>
        </div>

        {/* Our Approach */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">
            Our App Development Approach
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
            We follow a structured and transparent development process that
            ensures quality, scalability, and timely delivery of your mobile
            applications.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <InfoBox
              title="Ideation & Planning"
              text="We understand your requirements, users, and business goals to plan the right solution."
            />
            <InfoBox
              title="Design & Development"
              text="UI/UX design combined with clean, scalable development practices."
            />
            <InfoBox
              title="Testing & Launch"
              text="Thorough testing, deployment, and ongoing support after launch."
            />
          </div>
        </div>

        {/* Projects */}
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


        {/* Maintenance & Support Plans */}
        <section className="mt-24 mb-24">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Maintenance & Support Plans
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Keep your website secure, fast, and up-to-date with our flexible
              maintenance and support plans.
            </p>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Monthly Plan */}
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-7 transition">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Monthly Maintenance
              </h3>

              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                ₹{monthlyPrice}
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">per month</p>

              <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  Bug fixes and minor updates
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  Performance optimization
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  Security updates
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  Basic feature additions
                </li>
              </ul>
            </div>

            {/* Annual Plan */}
            <div
              className="relative rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-7 shadow-sm
                transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Annual Maintenance
              </h3>

              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                ₹{annualPrice}
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                ₹{annualBill} per month {" "}
                <span className="text-green-600 dark:text-green-400 font-medium">
                  (29% off)
                </span>
              </p>

              <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  Everything in Monthly Plan
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  Priority support
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  Advanced feature development
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  Quarterly performance reviews
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Important Terms & Conditions */}
        <section className="mb-24">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Important Terms & Conditions
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Please review the following terms carefully to ensure clarity and
              transparency throughout the project lifecycle.
            </p>
          </div>

          {/* Content Box */}
          <div className="max-w-5xl mx-auto bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:hover:bg-gray-700 hover:border-indigo-500 rounded-2xl p-6 space-y-4">
            {/* Item */}
            <div className="group rounded-xl border border-transparent p-4 transition">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-2">
                📄 Project Scope
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                The quoted price includes complete website development with backend
                and database integration. Hosting and publishing services are included;
                however, domain purchases or app store subscriptions must be handled
                separately.
              </p>
            </div>

            {/* Item */}
            <div className="group rounded-xl border border-transparent p-4 transition">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-2">
                ⏱ Revision Policy
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Changes requested within the first month after project completion are
                included at no additional cost. After one month, further changes may
                be charged based on complexity and time required.
              </p>
            </div>

            {/* Item */}
            <div className="group rounded-xl border border-transparent p-4 transition">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🛠 Maintenance Scope
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Maintenance plans cover bug fixes, feature additions, and incremental
                improvements only. Major redevelopment or architectural changes are
                not included and will be quoted separately.
              </p>
            </div>

            {/* Item */}
            <div className="group rounded-xl border border-transparent p-4 transition">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-2">
                📝 Agreements
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Separate agreements will be signed for project development, monthly
                maintenance, and annual maintenance. All terms must be finalized and
                approved before work begins.
              </p>
            </div>
          </div>
        </section>
        {/* CTA */}
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-10 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Have an App Idea?</h3>
          <p className="mb-6 max-w-2xl mx-auto text-indigo-100">
            Let’s turn your idea into a high-performing mobile application that
            users love.
          </p>
          <Link
            href="/main#contact"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Get Free Consultation →
          </Link>
        </div>
      </div >
    </section >
  );
}

/* ---------- Components ---------- */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-indigo-500 transition group">
      <div className="mb-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function InfoBox({ title, text }: { title: string; text: string }) {
  return (
    <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 transition group">
      <div className="relative z-10 text-center">
        <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{title}</h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{text}</p>
      </div>
    </div>
  );
}

function TechItem({
  icon,
  label,
  color = "text-blue-600",
}: {
  icon: React.ReactNode;
  label: string;
  color?: string;
}) {
  return (
    <div
      className="
  relative overflow-hidden
  flex flex-col items-center justify-center gap-3
  bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700
  rounded-xl p-6
  text-gray-700 dark:text-gray-300
  transition-all duration-300
  hover:-translate-y-1
  hover:border-transparent
  group
"
    >
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className={`text-3xl ${color} group-hover:scale-110 transition`}>
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
      </div>
    </div>
  );
}
