'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Bot, MessageSquare, Sparkles, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
};

const suggestions = [
  'Ask about stocks, crypto, forex',
  'What looks strongest today?',
  'Show me lower-risk setups',
];

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    text: 'Hi, I am your AI advisor. Ask about stocks, crypto, forex, or today’s opportunities.',
  },
  {
    id: 'hint',
    role: 'assistant',
    text: 'Try prompts like “What is the risk on BTC today?” or “Show buy signals in forex.”',
  },
];

const cannedResponses: Record<string, string> = {
  'Ask about stocks, crypto, forex':
    'Planitt can surface quick signals across stocks, crypto, and forex so you can compare momentum, risk, and setup quality in one place.',
  'What looks strongest today?':
    'Crypto is showing the fastest momentum, stocks look steadier on risk-adjusted strength, and forex setups are cleaner when volatility compresses.',
  'Show me lower-risk setups':
    'Lower-risk setups usually combine trend alignment, tighter stop zones, and higher confidence signals. Defensive stock breakouts and major forex pairs often fit that profile.',
};

export default function LandingAiAdvisorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const timeouts = timeoutsRef.current;

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  const canInteract = useMemo(() => !isTyping, [isTyping]);

  const handleSuggestionClick = (suggestion: string) => {
    if (!canInteract) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: suggestion,
    };

    setMessages((current) => [...current, userMessage]);
    setIsTyping(true);

    const responseTimeout = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: cannedResponses[suggestion] ?? cannedResponses['Ask about stocks, crypto, forex'],
        },
      ]);
      setIsTyping(false);
    }, 1100);

    timeoutsRef.current.push(responseTimeout);
  };

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="advisor-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="pointer-events-auto mb-4 w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-[28px] border border-white/10 bg-[#0f1629]/85 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
          >
            <div className="relative border-b border-white/10 px-5 py-4">
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#7C5CFF]/70 to-transparent" />
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#7C5CFF]/30 bg-[#7C5CFF]/15 text-[#d2c8ff]">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">AI Advisor</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </span>
                      Live preview
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close AI advisor"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="max-h-[22rem] space-y-3 overflow-y-auto px-5 py-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, delay: index * 0.04, ease: 'easeOut' }}
                  className={[
                    'rounded-2xl border px-4 py-3 text-sm leading-6',
                    message.role === 'assistant'
                      ? 'border-white/10 bg-white/[0.04] text-slate-200'
                      : 'ml-auto max-w-[88%] border-[#7C5CFF]/25 bg-[#7C5CFF]/12 text-white',
                  ].join(' ')}
                >
                  {message.text}
                </motion.div>
              ))}

              <AnimatePresence>
                {isTyping ? (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300"
                  >
                    <span className="text-slate-400">Trado is typing</span>
                    <span className="flex items-center gap-1">
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          className="h-1.5 w-1.5 rounded-full bg-[#a892ff]"
                          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                          transition={{
                            duration: 0.9,
                            ease: 'easeInOut',
                            repeat: Infinity,
                            delay: dot * 0.12,
                          }}
                        />
                      ))}
                    </span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                Suggested prompts
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: 0.14 + index * 0.06, ease: 'easeOut' }}
                    whileHover={canInteract ? { scale: 1.03, filter: 'brightness(1.08)' } : undefined}
                    whileTap={canInteract ? { scale: 0.98 } : undefined}
                    disabled={!canInteract}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-left text-xs text-slate-300 transition hover:border-[#7C5CFF]/30 hover:bg-[#7C5CFF]/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        whileHover={{ scale: 1.05, filter: 'brightness(1.08)' }}
        whileTap={{ scale: 0.97 }}
        animate={{ y: [0, -6, 0] }}
        transition={{
          y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
          duration: 0.22,
          ease: 'easeOut',
        }}
        className="pointer-events-auto relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-[#131c31]/85 px-4 py-3 text-sm font-medium text-white shadow-[0_18px_42px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
        aria-expanded={isOpen}
        aria-label="Open AI advisor"
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,92,255,0.28),_transparent_60%)]" />
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#7C5CFF]/25 bg-[#7C5CFF]/15 text-[#d2c8ff]">
          {isOpen ? <MessageSquare className="h-4.5 w-4.5" /> : <Sparkles className="h-4.5 w-4.5" />}
        </span>
        <span className="relative">
          <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">Trado AI</span>
          <span className="block">Ask the advisor</span>
        </span>
      </motion.button>
    </div>
  );
}
