import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MutualFundBotClient from "@/components/MutualFundBotClient";

export const metadata: Metadata = {
  title: "Mutual Fund Bot (Preview) | Planitt",
  description: "A preview mutual fund recommendation bot based on your goal, horizon, and risk tolerance.",
};

export default function MutualFundBotPage() {
  return (
    <section className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#444747] dark:text-[#c7cccc] hover:text-[#525555] dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to landing page
        </Link>

        <div className="mt-6">
          <MutualFundBotClient />
        </div>
      </div>
    </section>
  );
}

