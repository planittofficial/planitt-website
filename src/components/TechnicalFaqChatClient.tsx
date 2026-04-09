"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  HelpCircle,
  RefreshCcw,
  SendHorizonal,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { technicalFaqPrompts } from "@/lib/technicalFaq";

type Msg = { id: string; role: "user" | "bot"; text: string };
type ChatState = Record<string, unknown>;

type TechnicalFaqResponse = {
  reply: string;
  state?: ChatState;
  suggestions?: string[];
  ctoPromotion?: {
    title: string;
    lines: string[];
  } | null;
  error?: string;
};

type TechnicalFaqChatClientProps = {
  embedded?: boolean;
};

const uid = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

const TypingIndicator = () => (
  <div className="flex items-center gap-1">
    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.2s] dark:bg-gray-500" />
    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.1s] dark:bg-gray-500" />
    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500" />
  </div>
);

export default function TechnicalFaqChatClient({ embedded = false }: TechnicalFaqChatClientProps) {
  const pathname = usePathname();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<ChatState>({});
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>(technicalFaqPrompts.slice(0, 6));
  const [ctoPromotion, setCtoPromotion] = useState<{ title: string; lines: string[] } | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);
  const hasConversation = messages.length > 0 || loading;
  const visiblePrompts = suggestions.length > 0 ? suggestions.slice(0, 6) : technicalFaqPrompts.slice(0, 6);

  const reset = () => {
    setMessages([]);
    setInput("");
    setSelectedPrompt(null);
    setSuggestions(technicalFaqPrompts.slice(0, 6));
    setCtoPromotion(null);
    setState({});
  };

  const callApi = async (message: string) => {
    const res = await fetch("/api/technical-faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, pathname, state }),
    });
    const data = (await res.json()) as TechnicalFaqResponse;
    if (!res.ok || data.error) throw new Error(data.error || `Request failed (${res.status}).`);
    return data;
  };

  const sendMessage = async (rawText: string, isPrompt = false) => {
    const text = rawText.trim();
    if (!text || loading) return;

    setInput("");
    if (isPrompt) setSelectedPrompt(text);
    setMessages((prev) => [...prev, { id: uid(), role: "user", text }]);
    setLoading(true);

    try {
      const data = await callApi(text);
      setState(data.state ?? {});
      setMessages((prev) => [...prev, { id: uid(), role: "bot", text: data.reply }]);
      if (data.suggestions?.length) setSuggestions(data.suggestions);
      if (data.ctoPromotion) setCtoPromotion(data.ctoPromotion);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "bot", text: error instanceof Error ? error.message : "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const starterSection = (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">FAQ Bot</p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Ask about pricing, scope, maintenance, timelines, or technical services.
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-gray-700 shadow-sm sm:inline-flex dark:border-[#31415f] dark:bg-[#0f1726] dark:text-gray-100">
          <HelpCircle className="h-3.5 w-3.5 text-[#4f7cff]" />
          Technical help
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {visiblePrompts.map((prompt) => (
          <motion.button
            key={prompt}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              void sendMessage(prompt, true);
            }}
            className="group rounded-[1.4rem] border border-gray-200 bg-white p-4 text-left shadow-sm transition-all hover:border-[#4f7cff]/40 hover:shadow-[0_18px_38px_-28px_rgba(79,124,255,0.65)] dark:border-[#243047] dark:bg-[linear-gradient(180deg,#08111f_0%,#0d1728_100%)]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-medium leading-6 text-gray-800 dark:text-gray-100">{prompt}</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-gray-500 transition-colors group-hover:border-[#4f7cff]/30 group-hover:bg-[#4f7cff] group-hover:text-white dark:border-[#31415f] dark:bg-[#142136] dark:text-[#d6deee]">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const helperLine = (
    <div className="rounded-xl border border-gray-200/80 bg-white/80 px-3 py-2 text-xs text-gray-600 shadow-sm dark:border-[#243047] dark:bg-[#0f1726]/80 dark:text-gray-300">
      Ask about pricing, scope, maintenance, timelines, or technical services.
    </div>
  );

  const activeSessionBar = hasConversation ? (
    <div className="flex items-center justify-between gap-3 rounded-[1.2rem] border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-[#243047] dark:bg-[linear-gradient(180deg,#08111f_0%,#0d1728_100%)]">
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gray-400 dark:text-gray-500">Current Topic</p>
        <div className="mt-1 inline-flex max-w-full items-center gap-2 rounded-full bg-[#4f7cff]/10 px-3 py-1.5 text-xs font-semibold text-[#305fd4] dark:text-[#a9c0ff]">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{selectedPrompt || "Technical FAQ"}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={reset}
        className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:border-[#4f7cff]/30 hover:text-[#305fd4] dark:border-[#31415f] dark:bg-[#142136] dark:text-gray-100"
      >
        <RefreshCcw className="h-3.5 w-3.5" />
        New chat
      </button>
    </div>
  ) : null;

  const chatThread = (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.8rem] border border-gray-200 bg-white shadow-[0_24px_60px_-44px_rgba(15,17,23,0.45)] dark:border-[#243047] dark:bg-[linear-gradient(180deg,#07101d_0%,#091425_100%)]">
      <div className="border-b border-gray-100 px-4 py-3 dark:border-[#1c2940]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Technical FAQ</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#111318] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white dark:bg-[#142136]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#7ea1ff]" />
            Scoped
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        <div className="space-y-3">
          {!hasConversation ? (
            <div className="rounded-[1.4rem] border border-dashed border-gray-200 bg-gray-50/80 p-4 text-sm text-gray-600 dark:border-[#243047] dark:bg-[#0d1728]/70 dark:text-[#d3dbea]">
              <p className="font-semibold text-gray-900 dark:text-white">Ask about technical plans, service scope, maintenance, or revisions.</p>
              <p className="mt-1.5 leading-relaxed">This assistant only answers Planitt technical-service FAQs from the website content, so the replies stay specific and useful.</p>
            </div>
          ) : null}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[92%] rounded-[1.45rem] px-4 py-3 text-sm leading-relaxed shadow-sm ${
                m.role === "user"
                  ? "ml-auto bg-[linear-gradient(135deg,#5b84ff_0%,#3f6df2_55%,#2448b8_100%)] text-white"
                  : "mr-auto border border-gray-200 bg-gray-50 text-gray-900 dark:border-[#243047] dark:bg-[#0f1726] dark:text-[#eef2ff]"
              }`}
            >
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] opacity-60">
                {m.role === "user" ? "You" : "FAQ Bot"}
              </div>
              <div className="whitespace-pre-line">{m.text}</div>
            </div>
          ))}

          {loading ? (
            <div className="mr-auto inline-flex items-center gap-2 rounded-[1.45rem] border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 dark:border-[#243047] dark:bg-[#0f1726] dark:text-[#d3dbea]">
              <TypingIndicator />
              Preparing answer
            </div>
          ) : null}

          {ctoPromotion ? (
            <div className="rounded-[1.5rem] border border-[#2563eb]/25 bg-[linear-gradient(135deg,#2563eb_0%,#0f172a_100%)] p-5 text-sm text-white shadow-[0_22px_44px_-24px_rgba(37,99,235,0.7)] dark:border-[#60a5fa]/20 dark:bg-[linear-gradient(135deg,#1d4ed8_0%,#082f49_100%)]">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#bfdbfe]">
                {ctoPromotion.title}
              </p>
              <div className="space-y-2">
                {ctoPromotion.lines.map((line, index) => (
                  <p
                    key={`${ctoPromotion.title}-${index}`}
                    className={index === ctoPromotion.lines.length - 1 ? "font-semibold text-[#93c5fd]" : "text-white/90"}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

        </div>
      </div>
    </div>
  );

  const composer = (
    <div className="shrink-0 rounded-[1.7rem] border border-gray-200 bg-white p-3 shadow-[0_20px_50px_-40px_rgba(15,17,23,0.45)] dark:border-[#243047] dark:bg-[linear-gradient(180deg,#08111f_0%,#0d1728_100%)]">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void sendMessage(input);
            }
          }}
          placeholder="Ask about development plans, scope, revisions, or support..."
          rows={2}
          className="min-h-[64px] flex-1 resize-none rounded-[1.35rem] border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4f7cff]/35 dark:border-[#31415f] dark:bg-[#020817] dark:text-white dark:placeholder:text-[#7f8aa3]"
        />
        <button
          type="button"
          onClick={() => void sendMessage(input)}
          disabled={!canSend}
          className="inline-flex min-h-[64px] items-center justify-center gap-2 rounded-[1.35rem] bg-[linear-gradient(135deg,#7da0ff_0%,#4f7cff_58%,#274cbc_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_-18px_rgba(79,124,255,0.9)] transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:min-w-[132px]"
        >
          <SendHorizonal className="h-4 w-4" />
          Ask
        </button>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className="flex h-full min-h-0 flex-col gap-3 bg-[radial-gradient(circle_at_10%_0%,rgba(79,124,255,0.14),transparent_30%),linear-gradient(180deg,#f5f8ff_0%,#ffffff_44%,#ffffff_100%)] p-3 dark:bg-[radial-gradient(circle_at_top,rgba(79,124,255,0.2),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(28,64,122,0.3),transparent_28%),linear-gradient(180deg,#050b14_0%,#08111f_48%,#0b1320_100%)] sm:p-4">
        {hasConversation ? activeSessionBar : starterSection}
        {hasConversation ? helperLine : null}
        {chatThread}
        {composer}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-[2rem] border border-gray-200 bg-[linear-gradient(180deg,#eff5ff_0%,#ffffff_28%)] shadow-[0_34px_90px_-55px_rgba(15,17,23,0.55)] dark:border-[#243047] dark:bg-[linear-gradient(180deg,#050b14_0%,#091120_28%)]"
    >
      <div className="border-b border-gray-200 bg-[linear-gradient(135deg,#0b1220_0%,#11203c_50%,#18345a_100%)] px-6 py-8 text-white dark:border-[#243047] sm:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">
            <HelpCircle className="h-3.5 w-3.5 text-[#a9c0ff]" />
            Technical FAQ
          </div>
          <h2 className="mt-3 text-3xl font-heading font-bold tracking-tight sm:text-4xl">Answers for plans, scope, and support</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
            This assistant is limited to Planitt technical-service questions so users get direct answers instead of an open-ended chatbot flow.
          </p>
        </div>
      </div>

      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-h-[70vh] flex-col gap-4">
          {hasConversation ? activeSessionBar : starterSection}
          {hasConversation ? helperLine : null}
          {chatThread}
          {composer}
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.6rem] border border-gray-200 bg-white p-5 shadow-sm dark:border-[#243047] dark:bg-[linear-gradient(180deg,#08111f_0%,#0d1728_100%)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gray-400 dark:text-gray-500">Best Questions</p>
            <div className="mt-3 space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="rounded-2xl bg-gray-50 p-3 dark:bg-[#0f1726]">Ask what is included in a service.</div>
              <div className="rounded-2xl bg-gray-50 p-3 dark:bg-[#0f1726]">Ask about maintenance or revision policy.</div>
              <div className="rounded-2xl bg-gray-50 p-3 dark:bg-[#0f1726]">Ask how project scope and delivery flow work.</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
