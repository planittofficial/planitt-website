import Image from "next/image";

export interface Project {
  title: string;
  description: string;
  image: string;
  liveLink?: string;
  domain?: string; // e.g. "App Development" | "Web Development"
  year?: string; // e.g. "2025"
  status?: string; // e.g. "Completed" | "Live" | "Coming Soon" | "In Progress"
  client?: string; // e.g. "Mauryan Jewels" | "In-House"
  techStack?: string[]; // e.g. ["React Native", "Node.js", "MongoDB", "Security", "+1"]
  tags?: string[];
  platformIcons?: ("playstore" | "appstore" | "web")[];
  imageFit?: "cover" | "contain";
  darkBg?: boolean; // ✅ NEW
}

function PlayStoreIcon() {
  return (
    <svg className="w-4 h-4 fill-white/90 shrink-0" viewBox="0 0 24 24" aria-label="Google Play">
      <path d="M3.609 1.814L13.793 12 3.61 22.186a2.04 2.04 0 0 1-.22-.934V2.748c0-.348.08-.673.22-.934zM15.207 13.414l2.45 2.45-12.83 7.373 10.38-9.823zm0-2.828L4.827.763l12.83 7.373-2.45 2.45zm1.414 1.414l3.65-2.097c.94-.54.94-1.423 0-1.963l-3.65-2.097-2.121 2.12 2.121 2.121z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="w-4 h-4 fill-white/90 shrink-0" viewBox="0 0 24 24" aria-label="Apple App Store">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.35-.56.65-1.06 1.7-0.93 2.73 1.01.08 2.03-.48 2.65-1.23" />
    </svg>
  );
}

function WebLinkIcon() {
  return (
    <svg className="w-4 h-4 stroke-white/90 fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Website">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

interface ProjectSectionProps {
  title?: string;
  subtitle?: string;
  projects: Project[];
  accentColor?: "blue" | "indigo" | "rose" | "orange" | "green" | "cyan";
}

export default function ProjectSection({
  title = "Our Featured Projects",
  subtitle = "Check out some of our recent work across various industries.",
  projects,
  accentColor = "blue",
}: ProjectSectionProps) {
  const spinnerColor = {
    blue: "border-blue-600",
    indigo: "border-indigo-600",
    rose: "border-rose-600",
    orange: "border-orange-600",
    green: "border-green-600",
    cyan: "border-cyan-600",
  }[accentColor];

  return (
    <section>
      {/* Header */}
      <div className="mb-5 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const cleanTitle = project.title.replace(/\s*↗$/, "");
            const tagsToRender = project.techStack || project.tags || [];
            const hasPlayStore = project.platformIcons?.includes("playstore") || project.liveLink?.includes("play.google.com");
            const hasAppStore = project.platformIcons?.includes("appstore");
            const hasWebLink = project.platformIcons?.includes("web") || (project.liveLink && !project.liveLink.includes("play.google.com"));
            const status = project.status || "Completed";

            return (
              <a
                key={index}
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block h-80 sm:h-[350px] rounded-3xl overflow-hidden
                           border border-gray-200 dark:border-neutral-800
                           ${project.darkBg ? "bg-[#18191B]" : "bg-gray-100 dark:bg-neutral-900"}
                           transition-all duration-300
                           hover:-translate-y-1.5 hover:shadow-2xl dark:hover:shadow-neutral-950/70`}
              >
                {/* Status Badge (Top Right) */}
                <div className="absolute top-4 right-4 z-20">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-all ${
                      status.toLowerCase() === "completed"
                        ? "text-[#4ADE80] bg-[#143E24]/85 border border-[#22C55E]/40"
                        : status.toLowerCase() === "live"
                        ? "text-emerald-400 bg-emerald-950/85 border border-emerald-500/40"
                        : status.toLowerCase() === "coming soon"
                        ? "text-amber-300 bg-amber-950/85 border border-amber-500/40"
                        : "text-sky-300 bg-sky-950/85 border border-sky-500/40"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                {/* Image / Logo in Background */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`transition-all duration-500
                    ${project.imageFit === "contain"
                      ? "object-contain p-8 group-hover:scale-105"
                      : "object-cover group-hover:scale-105"}
                  `}
                />

                {/* Card Content Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/35 backdrop-blur-sm
                             opacity-0 group-hover:opacity-100
                             transition-all duration-300
                             flex flex-col justify-end p-5 sm:p-6 z-10 text-left"
                >
                  {/* Title & Platform Icons */}
                  <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                    <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                      {cleanTitle}
                    </h3>
                    <div className="flex items-center gap-2">
                      {hasPlayStore && <PlayStoreIcon />}
                      {hasAppStore && <AppleIcon />}
                      {hasWebLink && <WebLinkIcon />}
                    </div>
                  </div>

                  {/* Domain & Year */}
                  {(project.domain || project.year) && (
                    <div className="flex items-center gap-2.5 mb-2">
                      {project.domain && (
                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 font-medium text-xs backdrop-blur-sm border border-white/10">
                          {project.domain}
                        </span>
                      )}
                      {project.year && (
                        <span className="text-gray-300 font-medium text-xs">
                          {project.year}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Short Description */}
                  <p className="text-gray-200 text-xs sm:text-sm leading-relaxed mb-2 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Client */}
                  {project.client && (
                    <p className="text-xs text-gray-300 font-medium mb-2.5">
                      Client: <span className="text-white font-medium">{project.client}</span>
                    </p>
                  )}

                  {/* Tech Stack Badges */}
                  {tagsToRender.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {tagsToRender.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs rounded-full bg-white/10 border border-white/10 text-gray-200 font-medium whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div
          className="py-20 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl
                        flex flex-col items-center text-center bg-gray-50 dark:bg-gray-800/50"
        >
          <div
            className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm
                          flex items-center justify-center mb-4"
          >
            <div
              className={`w-8 h-8 rounded-full border-4
                          border-t-transparent animate-spin ${spinnerColor}`}
            />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Projects Coming Soon
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            We&apos;re currently working on some amazing projects. Check back
            soon to see our latest work.
          </p>
        </div>
      )}
    </section>
  );
}
