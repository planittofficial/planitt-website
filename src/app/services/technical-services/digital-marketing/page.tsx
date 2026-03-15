import Link from "next/link";
import ProjectSection from "@/components/ProjectSection";
import {
  Search,
  Share2,
  BarChart,
  TrendingUp,
  Target,
  PenTool,
} from "lucide-react";

export default function DigitalMarketingPage() {
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Digital Marketing
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Data-driven digital marketing strategies designed to increase brand
            visibility, attract the right audience, and convert traffic into
            revenue.
          </p>
        </div>

        {/* Core Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Search />}
            title="Search Engine Optimization (SEO)"
            description="Improve organic rankings, website visibility, and long-term traffic growth."
          />
          <FeatureCard
            icon={<Share2 />}
            title="Social Media Marketing"
            description="Build brand authority and engagement across social platforms."
          />
          <FeatureCard
            icon={<BarChart />}
            title="Paid Advertising"
            description="High-ROI Google & social ad campaigns focused on conversions."
          />
          <FeatureCard
            icon={<PenTool />}
            title="Content Marketing"
            description="Strategic content that educates, engages, and builds trust."
          />
          <FeatureCard
            icon={<Target />}
            title="Audience Targeting"
            description="Reach the right users with precision targeting and analytics."
          />
          <FeatureCard
            icon={<TrendingUp />}
            title="Performance Analytics"
            description="Track growth, measure ROI, and continuously optimize campaigns."
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
        SEO & SEM optimization
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Data-driven campaign strategies
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Multi-channel marketing automation
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        High-conversion landing pages
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Advanced audience segmentation
      </li>
      <li className="flex items-start gap-3">
        <span className="text-indigo-600 font-bold">•</span>
        Real-time performance tracking
      </li>
    </ul>
  </div>
</section>

        {/* What We Do */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">
            Our Digital Marketing Approach
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
            We combine strategy, creativity, and analytics to deliver measurable
            marketing results. Our approach focuses on understanding your
            business goals and executing campaigns that drive sustainable
            growth.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <InfoBox
              title="Strategy & Planning"
              text="We analyze your market, competitors, and audience to create a clear marketing roadmap."
            />
            <InfoBox
              title="Execution & Optimization"
              text="Campaigns are launched with continuous monitoring and optimization."
            />
            <InfoBox
              title="Reporting & Growth"
              text="Transparent reporting to measure success and scale what works."
            />
          </div>
        </div>

        {/* Projects */}
        <ProjectSection
          title="Digital Marketing Campaigns"
          subtitle="Our latest marketing success stories are coming soon."
          accentColor="rose"
          projects={[]}
        />

        

        {/* CTA */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-10 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">
            Ready to Grow Your Brand Online?
          </h3>
          <p className="mb-6 max-w-2xl mx-auto text-pink-50">
            Let’s create a digital marketing strategy that delivers real,
            measurable business growth.
          </p>

          <Link
            href="/main#contact"
            className="inline-flex items-center gap-2 bg-white text-rose-600 px-8 py-4 rounded-lg font-semibold hover:bg-pink-50 transition mx-auto"
          >
            Get Free Marketing Consultation →
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
      hover:border-rose-500/30
      hover:shadow-[0_0_30px_rgba(225,29,72,0.1)]
      group
    "
    >
      {/* Gradient Hover */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br from-pink-500/5 to-rose-500/5
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
      />

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
    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-rose-500 transition group">
      <div className="mb-4 text-rose-500 dark:text-rose-400 group-hover:scale-110 transition">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
}
