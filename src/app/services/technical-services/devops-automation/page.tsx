import Link from "next/link";
import ProjectSection from "@/components/ProjectSection";
import { GitBranch, Repeat, Server, Activity } from "lucide-react";

export default function DevOpsPage() {
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">


        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            DevOps & Automation
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Automate deployments and improve system reliability with DevOps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard icon={<GitBranch />} title="CI/CD Pipelines" description="Automated deployments" />
          <FeatureCard icon={<Repeat />} title="Automation" description="Reduced manual effort" />
          <FeatureCard icon={<Server />} title="Infrastructure" description="Cloud & IaC" />
          <FeatureCard icon={<Activity />} title="Monitoring" description="Logs & performance" />
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
        Automated CI/CD pipelines
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Infrastructure as Code (Terraform/Ansible)
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Docker & Kubernetes orchestration
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Real-time logging & monitoring
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Automated testing & quality gates
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Seamless environment management
      </li>
    </ul>
  </div>
</section>

        {/* Projects */}
        <ProjectSection
          title="DevOps & Automation Projects"
          subtitle="Our latest DevOps and automation implementations are coming soon."
          accentColor="indigo"
          projects={[]}
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
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-7 hover:border-indigo-500 transition">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Monthly Maintenance
              </h3>

              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                ₹6,999
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
                ₹29,999
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                per year{" "}
                <span className="text-green-600 dark:text-green-400 font-medium">
                  (Save ₹54,000)
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

        <CTA />
      </div>
    </section>
  );
}
function CTA() {
  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-700 to-slate-900 rounded-2xl p-10 text-white text-center">
      <h3 className="text-2xl font-bold mb-3">
        Ready to Automate Your Infrastructure?
      </h3>

      <p className="mb-6 max-w-2xl mx-auto text-indigo-50">
        Let’s build reliable CI/CD pipelines, automate deployments, and
        scale your infrastructure with modern DevOps practices.
      </p>

      <Link
        href="/main#contact"
        className="
          inline-flex items-center justify-center
          bg-white text-indigo-900
          px-8 py-4 rounded-lg
          font-semibold
          hover:bg-indigo-50 transition
        "
      >
        Get Free DevOps Consultation →
      </Link>
    </div>
  );
}


/* ---------- Feature Card Component ---------- */
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
      <div className="mb-4 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {description}
      </p>
    </div>
  );
}
