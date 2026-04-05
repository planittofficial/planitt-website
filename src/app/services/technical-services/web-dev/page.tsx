import Link from "next/link";
import ProjectSection from "@/components/ProjectSection";
import {
  ArrowLeft,
} from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostman,
  SiGoogleanalytics,
} from "react-icons/si";

export default function WebDevPage() {
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Website Development
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            We build modern, fast, and scalable websites that combine stunning
            design with powerful technology to help your business grow online.
          </p>
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
                Modern frameworks (Next.js & React)
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                High performance & fast load times
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                Secure & reliable architecture
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                Fully responsive across all devices
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                Clean, maintainable codebase
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                Scalable, future-ready structure
              </li>
            </ul>
          </div>
        </section>

        {/* Technologies */}
        <div className="mb-20">
          <h2 className="text-2xl text-center font-semibold mb-8">Technologies We Use</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <TechItem
              icon={<SiNextdotjs />}
              label="Next.js"
              color="text-black"
            />
            <TechItem icon={<SiReact />} label="React" color="text-cyan-500" />
            <TechItem
              icon={<SiTypescript />}
              label="TypeScript"
              color="text-blue-600"
            />
            <TechItem
              icon={<SiTailwindcss />}
              label="Tailwind CSS"
              color="text-teal-500"
            />
            <TechItem
              icon={<SiNodedotjs />}
              label="Node.js"
              color="text-green-600"
            />
            <TechItem
              icon={<SiPostman />}
              label="REST APIs"
              color="text-orange-600"
            />
            <TechItem
              icon={<SiGoogleanalytics />}
              label="SEO Optimization"
              color="text-yellow-600"
            />
          </div>
        </div>

        {/* Our Approach */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">
            Our Web Development Approach
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
            We follow a structured and transparent development process that
            ensures quality, scalability, and timely delivery of your web
            projects.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <InfoBox
              title="Discovery & Planning"
              text="Understanding your business goals, target audience, and functional requirements."
            />
            <InfoBox
              title="UI/UX Design & Prototyping"
              text="Creating intuitive designs and interactive prototypes to visualize the end product."
            />
            <InfoBox
              title="Development & Deployment"
              text="Building with modern technologies followed by rigorous testing and successful launch."
            />
          </div>
        </div>

        {/* Projects */}
        <ProjectSection
          title="Web Development Projects"
          subtitle="A showcase of our high-performance websites and web applications."
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
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:hover:bg-gray-700 hover:border-indigo-500 p-7 transition">
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
              className="relative rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200  dark:hover:bg-gray-700 hover:border-indigo-500 p-7 shadow-sm
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


        {/* CTA */}
        <div className="max-w-5xl mx-auto bg-linear-to-r from-indigo-600 to-purple-700 rounded-2xl p-10 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">
            Ready to Build Your Website?
          </h3>
          <p className="mb-6 text-center max-auto text-blue-50">
            Let’s create a powerful online presence that drives traffic,
            engagement, and conversions for your business.
          </p>

          <Link
            href="/main#contact"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Build Your Website
            <ArrowLeft className="rotate-180" size={18} />
          </Link>
        </div>
      </div>
    </section>
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

