"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Message = { role: "user" | "assistant"; content: string };

export default function AskMatheesha({ lang, dict }: { lang: Locale; dict: Dictionary["ask"] }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function ask(question: string) {
    const text = question.trim().slice(0, 1000);
    if (!text || busy) return;

    const history: Message[] = [...messages, { role: "user", content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, lang }),
      });
      if (!response.ok || !response.body) throw new Error(String(response.status));

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: answer }]);
      }
      if (!answer.trim()) throw new Error("empty");
    } catch {
      // Drop the unanswered turn so the conversation stays well-formed.
      setMessages(messages);
      setInput(text);
      setError(dict.error);
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    ask(input);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="ask-matheesha"
        className="fixed bottom-6 left-6 z-[90] inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-3 text-sm font-semibold text-black shadow-lg shadow-black/40 transition hover:bg-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
      >
        {open ? <X size={18} aria-hidden="true" /> : <MessageCircle size={18} aria-hidden="true" />}
        <span className="hidden sm:inline">{open ? dict.close : dict.open}</span>
        <span className="sr-only sm:hidden">{open ? dict.close : dict.open}</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.section
            id="ask-matheesha"
            role="dialog"
            aria-label={dict.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-4 right-4 z-[90] flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d16]/95 shadow-2xl shadow-black/60 backdrop-blur sm:left-6 sm:right-auto sm:w-[380px]"
            onKeyDown={(event) => event.key === "Escape" && setOpen(false)}
          >
            <header className="border-b border-white/10 px-5 py-4">
              <p className="text-sm font-semibold text-white">{dict.title}</p>
              <p className="mt-1 text-xs text-slate-400">{dict.intro}</p>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4" aria-live="polite">
              {messages.length === 0 ? (
                <div className="flex flex-wrap gap-2">
                  {dict.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => ask(suggestion)}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-left text-xs text-slate-200 transition hover:border-yellow-400 hover:text-yellow-400"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${
                    message.role === "user"
                      ? "ml-auto bg-yellow-400 text-black"
                      : "bg-white/[0.06] text-slate-100"
                  }`}
                >
                  {message.content ||
                    (busy ? (
                      <span className="inline-flex items-center gap-2 text-slate-400">
                        <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                        {dict.thinking}
                      </span>
                    ) : null)}
                </div>
              ))}
              {error ? (
                <p role="alert" className="text-xs text-red-300">
                  {error}
                </p>
              ) : null}
            </div>

            <form onSubmit={onSubmit} className="flex gap-2 border-t border-white/10 p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={dict.placeholder}
                maxLength={1000}
                aria-label={dict.placeholder}
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-yellow-400/70"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-black transition hover:bg-yellow-300 disabled:opacity-50"
                aria-label={dict.send}
              >
                {busy ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </form>
            <p className="px-5 pb-3 text-[10px] text-slate-500">{dict.disclaimer}</p>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}
