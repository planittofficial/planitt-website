"use client";

import Link from "next/link";
import { MessageCircle, PhoneCall, Send } from "lucide-react";

type HomeMode = "financial" | "technical";

export default function StickyMobileCTA({ mode }: { mode: HomeMode }) {
  const isTechnical = mode === "technical";

  return (
    <div className="fixed bottom-3 left-1/2 z-40 w-[calc(100%-1.25rem)] -translate-x-1/2 md:hidden">
      <div className="rounded-2xl border border-white/35 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/92 backdrop-blur-xl p-2 shadow-2xl">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <a
            href="tel:+918605727484"
            className="btn-depth min-h-11 rounded-xl flex items-center justify-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100"
          >
            <PhoneCall className="h-4 w-4" />
            Call
          </a>

          <a
            href="https://wa.me/918605727484"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-depth min-h-11 rounded-xl flex items-center justify-center gap-1.5 bg-green-600 text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>

          <Link
            href={isTechnical ? "/main#contact" : "/services/financial-services/budgeting"}
            className={`btn-depth min-h-11 rounded-xl flex items-center justify-center gap-1.5 text-white ${
              isTechnical ? "bg-gradient-to-r from-cyan-500 to-sky-600" : "bg-[#b78622]"
            }`}
          >
            <Send className="h-4 w-4" />
            {isTechnical ? "Start" : "Plan"}
          </Link>
        </div>
      </div>
    </div>
  );
}


