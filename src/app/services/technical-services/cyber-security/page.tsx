import Link from "next/link";
import ProjectSection from "@/components/ProjectSection";
import { Shield, Bug, Lock, AlertTriangle, Eye, FileCheck } from "lucide-react";

export default function CyberSecurityPage() {
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Cyber Security
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Comprehensive cyber security solutions to protect your systems,
            networks, and sensitive data from evolving digital threats.
          </p>
        </div>

        {/* Core Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Shield />}
            title="Threat Protection"
            description="Multi-layered security solutions to prevent cyber attacks and breaches."
          />
          <FeatureCard
            icon={<Bug />}
            title="Vulnerability Assessment"
            description="Identify and eliminate security weaknesses before attackers do."
          />
          <FeatureCard
            icon={<Lock />}
            title="Data Security"
            description="Protect sensitive business and customer data with robust encryption."
          />
          <FeatureCard
            icon={<Eye />}
            title="Monitoring & Detection"
            description="Continuous monitoring to detect threats in real time."
          />
          <FeatureCard
            icon={<FileCheck />}
            title="Compliance & Audits"
            description="Ensure compliance with security standards and regulations."
          />
          <FeatureCard
            icon={<AlertTriangle />}
            title="Risk Management"
            description="Assess, mitigate, and manage cyber security risks effectively."
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
        Advanced threat detection & response
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        End-to-end data encryption
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Regular security audits & compliance
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Secure authentication & authorization
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Vulnerability scanning & patching
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Incident response & recovery planning
      </li>
    </ul>
  </div>
</section>

        {/* What We Do */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">
            Our Cyber Security Approach
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
            Our security-first approach focuses on prevention, detection, and
            response. We help businesses build strong defenses and maintain
            trust in an increasingly connected world.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <InfoBox
              title="Assess & Analyze"
              text="We evaluate your systems, infrastructure, and processes to identify risks."
            />
            <InfoBox
              title="Protect & Monitor"
              text="Security controls and monitoring are implemented to prevent and detect threats."
            />
            <InfoBox
              title="Respond & Improve"
              text="Rapid incident response with continuous improvement strategies."
            />
          </div>
        </div>

        {/* Projects */}
        <ProjectSection
          title="Cyber Security Implementations"
          subtitle="Secure systems and successful risk mitigation stories coming soon."
          accentColor="blue"
          projects={[]}
        />

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">
            Secure Your Business Today
          </h3>
          <p className="mb-6 max-w-2xl mx-auto text-blue-100">
            Let’s strengthen your cyber defenses and protect your digital assets
            with enterprise-grade security solutions.
          </p>

          <Link
            href="/main#contact"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition mx-auto"
          >
            Get Free Security Consultation →
          </Link>
        </div>
      </div>
    </section>
  );
}
function InfoBox({ title, text }: { title: string; text: string }) {
  return (
    <div
      className="
      relative overflow-hidden
      bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700
      rounded-2xl p-6
      transition-all duration-300
      hover:-translate-y-1
      group
    "
    >
      <div className="relative z-10 text-center">
        <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{title}</h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{text}</p>
      </div>
    </div>
  );
}
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
    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-blue-500 transition group">
      <div className="mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
}
