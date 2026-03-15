import Link from "next/link";
import ProjectSection from "@/components/ProjectSection";
import {
  Cloud,
  Server,
  ShieldCheck,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { SiAmazon, SiGooglecloud } from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";

export default function CloudServicesPage() {
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Cloud Services
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Secure, scalable cloud infrastructure to improve performance,
            reliability, and cost efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Cloud />}
            title="Cloud Migration"
            description="Move securely to cloud"
          />
          <FeatureCard
            icon={<Server />}
            title="Infrastructure"
            description="Reliable cloud architecture"
          />
          <FeatureCard
            icon={<ShieldCheck />}
            title="Security"
            description="Enterprise-grade protection"
          />
          <FeatureCard
            icon={<TrendingUp />}
            title="Optimization"
            description="Cost & performance tuning"
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
        Scalable infrastructure (AWS, Azure, GCP)
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        High availability & disaster recovery
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Secure cloud architecture & IAM
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Cost-efficient resource management
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Automated scaling & load balancing
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Real-time monitoring & proactive alerts
      </li>
    </ul>
  </div>
</section>

        <div className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-center dark:text-white">
            Technologies We Use
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <TechItem icon={<SiAmazon />} label="AWS" color="text-orange-500" />
            <TechItem
              icon={<FaMicrosoft />}
              label="Azure"
              color="text-blue-600"
            />
            <TechItem
              icon={<SiGooglecloud />}
              label="Google Cloud"
              color="text-blue-500"
            />
          </div>
        </div>

        {/* Projects */}
        <ProjectSection
          title="Cloud Case Studies"
          subtitle="Our latest cloud infrastructure projects are coming soon."
          accentColor="cyan"
          projects={[]}
        />

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-sky-700 rounded-2xl p-10 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">
            Ready to Scale Your Business?
          </h3>
          <p className="mb-6 max-w-2xl mx-auto text-blue-50">
            Let’s build a secure, scalable, and high-performing cloud
            infrastructure that powers your business growth.
          </p>
          <Link
            href="/main#contact"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Get Started with Cloud
            <ArrowLeft className="rotate-180" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Feature Card Component ---------- */
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
