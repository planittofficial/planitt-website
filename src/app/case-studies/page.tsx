"use client";

import { useMemo, useState } from "react";
import { FileText, ArrowUpRight } from "lucide-react";

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

export default function CaseStudiesPage() {
  const [mode, setMode] = useState<StudyDomain>("technical");

  const isFinancial = mode === "financial";

  const palette = isFinancial
      ? {
        page: "from-[#fff8e8] via-white to-[#f3e0af] dark:from-[#1f1a11] dark:via-[#221c13] dark:to-[#3b2d17]",
        tabActive: "from-[#b78622] to-[#d8b35c] text-white",
        tabIdle:
          "text-gray-700 dark:text-gray-300 hover:bg-[#fff5dc] dark:hover:bg-[#44351b]",
        headerAccent: "text-[#b78622] dark:text-[#e7c973]",
        cardBase: "bg-gray-50 dark:bg-gray-900",
        cardHover: "hover:border-[#c79a3a] dark:hover:border-[#e7c973]",
        iconTone:
          "bg-[#fff1cf] dark:bg-[#4a3818]/70 text-[#b78622] dark:text-[#e7c973]",
        textTone: "text-[#a9781e] dark:text-[#e7c973]",
      }
    : {
        page: "from-sky-50 via-white to-cyan-100 dark:from-[#0b1220] dark:via-[#0d1727] dark:to-[#122235]",
        tabActive: "from-cyan-500 to-sky-600 text-white",
        tabIdle:
          "text-gray-700 dark:text-gray-300 hover:bg-sky-100 dark:hover:bg-slate-800",
        headerAccent: "text-sky-700 dark:text-cyan-300",
        cardBase: "bg-white dark:bg-gray-800",
        cardHover: "hover:border-sky-400 dark:hover:border-cyan-400",
        iconTone:
          "bg-sky-100 dark:bg-cyan-900/40 text-sky-700 dark:text-cyan-300",
        textTone: "text-sky-700 dark:text-cyan-300",
      };

  const filteredStudies = useMemo(
    () => caseStudies.filter((item) => item.domain === mode),
    [mode]
  );

  return (
    <section
      className={`bg-gradient-to-br ${palette.page} text-gray-900 dark:text-gray-100 transition-colors duration-300`}
    >
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Case Studies</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Detailed breakdowns of our projects, processes, and results,
            available as downloadable PDFs.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-10">
          <div className="bg-white/80 dark:bg-gray-900/70 rounded-2xl p-1.5 border border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-1">
            <button
              onClick={() => setMode("technical")}
              className={`h-11 rounded-xl font-semibold transition-all duration-200 ${
                !isFinancial
                  ? `bg-gradient-to-r ${palette.tabActive}`
                  : palette.tabIdle
              }`}
            >
              Technical
            </button>
            <button
              onClick={() => setMode("financial")}
              className={`h-11 rounded-xl font-semibold transition-all duration-200 ${
                isFinancial
                  ? `bg-gradient-to-r ${palette.tabActive}`
                  : palette.tabIdle
              }`}
            >
              Financial
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((item) => (
            <a
              key={item.title}
              href={item.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative ${palette.cardBase} border border-gray-200 dark:border-gray-800 rounded-2xl p-6 ${palette.cardHover} hover:shadow-xl transition`}
            >
              <div
                className={`mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl ${palette.iconTone}`}
              >
                <FileText />
              </div>

              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {item.description}
              </p>

              <span className={`text-xs font-medium ${palette.textTone}`}>
                {item.industry}
              </span>

              <div
                className={`mt-6 flex items-center gap-2 ${palette.textTone} font-medium`}
              >
                View Case Study
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
                />
              </div>
            </a>
          ))}
        </div>

        <p className={`text-center mt-10 text-sm ${palette.headerAccent}`}>
          Showing {isFinancial ? "financial" : "technical"} case studies
        </p>
      </div>
    </section>
  );
}
