"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, FileText, Search } from "lucide-react";

type StudyDomain = "financial" | "technical";

interface CaseStudy {
  title: string;
  description: string;
  industry: string;
  pdf: string;
  domain: StudyDomain;
}

const caseStudies: CaseStudy[] = [
  {
    title: "Investor Dashboard Platform",
    description:
      "An in-house private fintech platform built for investors to track portfolios, profits, and growth analytics securely.",
    industry: "Fintech | In-house",
    pdf: "/case-studies/investor-dashboard.pdf",
    domain: "financial",
  },
  {
    title: "ZeyNix E-commerce Platform",
    description:
      "A high-performance fashion e-commerce platform focused on scalability, UX, and conversion optimization.",
    industry: "E-commerce",
    pdf: "/case-studies/zeynix-case-study.pdf",
    domain: "technical",
  },
  {
    title: "Krypsm Trading Dashboard",
    description:
      "A secure crypto trading dashboard with real-time analytics, charts, and role-based access control.",
    industry: "Fintech | Web App",
    pdf: "/case-studies/krypsm-case-study.pdf",
    domain: "financial",
  },
];

const normalize = (value: string) => value.toLowerCase().trim();

export default function CaseStudiesPage() {
  const [mode, setMode] = useState<StudyDomain>("technical");
  const [query, setQuery] = useState("");

  const isFinancial = mode === "financial";

  const palette = isFinancial
    ? {
        page: "from-[#fff8e8] via-white to-[#f3e0af] dark:from-[#1f1a11] dark:via-[#221c13] dark:to-[#3b2d17]",
        tabActive: "from-[#b78622] to-[#d8b35c] text-white",
        tabIdle: "text-gray-700 dark:text-gray-300 hover:bg-[#fff5dc] dark:hover:bg-[#44351b]",
        headerAccent: "text-[#b78622] dark:text-[#e7c973]",
        cardBase: "bg-gray-50 dark:bg-gray-900",
        cardHover: "hover:border-[#c79a3a] dark:hover:border-[#e7c973]",
        iconTone: "bg-[#fff1cf] dark:bg-[#4a3818]/70 text-[#b78622] dark:text-[#e7c973]",
        textTone: "text-[#a9781e] dark:text-[#e7c973]",
        chipTone: "bg-[#fff2d1] text-[#9f7220] dark:bg-[#4a3818]/70 dark:text-[#e7c973]",
      }
    : {
        page: "from-sky-50 via-white to-cyan-100 dark:from-[#0b1220] dark:via-[#0d1727] dark:to-[#122235]",
        tabActive: "from-cyan-500 to-sky-600 text-white",
        tabIdle: "text-gray-700 dark:text-gray-300 hover:bg-sky-100 dark:hover:bg-slate-800",
        headerAccent: "text-sky-700 dark:text-cyan-300",
        cardBase: "bg-white dark:bg-gray-800",
        cardHover: "hover:border-sky-400 dark:hover:border-cyan-400",
        iconTone: "bg-sky-100 dark:bg-cyan-900/40 text-sky-700 dark:text-cyan-300",
        textTone: "text-sky-700 dark:text-cyan-300",
        chipTone: "bg-sky-100 text-sky-700 dark:bg-cyan-900/40 dark:text-cyan-300",
      };

  const domainLabel = isFinancial ? "Financial" : "Technical";

  const visibleStudies = useMemo(() => {
    const q = normalize(query);
    return caseStudies.filter((item) => {
      if (item.domain !== mode) return false;
      if (!q) return true;
      const corpus = normalize(`${item.title} ${item.description} ${item.industry}`);
      return corpus.includes(q);
    });
  }, [mode, query]);

  return (
    <section className={`bg-gradient-to-br ${palette.page} text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className={`text-xs font-semibold uppercase tracking-[0.25em] mb-3 ${palette.headerAccent}`}>Case Library</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Case Studies</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore real delivery stories with scope, approach, and outcomes. Switch domain and search quickly to find relevant work.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="bg-white/80 dark:bg-gray-900/70 rounded-2xl p-1.5 border border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-1 shadow-sm">
            <button
              onClick={() => setMode("technical")}
              className={`h-11 rounded-xl font-semibold transition-all duration-200 ${
                !isFinancial ? `bg-gradient-to-r ${palette.tabActive}` : palette.tabIdle
              }`}
            >
              Technical
            </button>
            <button
              onClick={() => setMode("financial")}
              className={`h-11 rounded-xl font-semibold transition-all duration-200 ${
                isFinancial ? `bg-gradient-to-r ${palette.tabActive}` : palette.tabIdle
              }`}
            >
              Financial
            </button>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white/85 px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-900/70">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${palette.chipTone}`}>{domainLabel}</span>
                <span>{visibleStudies.length} case {visibleStudies.length === 1 ? "study" : "studies"}</span>
              </div>

              <label className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search title or industry"
                  className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-800 outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900/40"
                />
              </label>
            </div>
          </div>
        </div>

        {visibleStudies.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleStudies.map((item) => (
              <a
                key={item.title}
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative ${palette.cardBase} border border-gray-200 dark:border-gray-800 rounded-2xl p-6 ${palette.cardHover} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${palette.iconTone}`}>
                    <FileText />
                  </div>
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${palette.textTone}`}>{item.industry}</span>
                </div>

                <h3 className="text-xl font-semibold mb-2 leading-snug">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">{item.description}</p>

                <div className={`mt-auto flex items-center gap-2 ${palette.textTone} font-medium`}>
                  View Case Study
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto rounded-2xl border border-dashed border-gray-300 bg-white/75 p-8 text-center dark:border-gray-700 dark:bg-gray-900/60">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">No case studies found</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Try another keyword or clear search to see all {domainLabel.toLowerCase()} case studies.
            </p>
          </div>
        )}

        <p className={`text-center mt-10 text-sm ${palette.headerAccent}`}>
          Showing {domainLabel.toLowerCase()} case studies
        </p>
      </div>
    </section>
  );
}
