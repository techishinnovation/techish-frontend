"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";
import useSWR from "swr";

import { api } from "@/lib/api";
import type { ChatTurn, SiteSettingsPublic } from "@/lib/types";

const fetcher = (url: string) => api.get(url).then((res) => res.data as SiteSettingsPublic);

const WELCOME_MESSAGE: ChatTurn = {
  role: "model",
  text: "Hi! I'm the Techish Innovation assistant. Ask me about our services, our work, or how to get in touch.",
};

export default function ChatbotWidget() {
  const pathname = usePathname();
  const { data } = useSWR("/settings/public/", fetcher, { revalidateOnFocus: false });
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatTurn[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/feedback")) return null;
  if (!data?.chatbot_enabled) return null;

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", text } as ChatTurn];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/chatbot/message/", {
        message: text,
        history: nextMessages,
      });
      setMessages((prev) => [...prev, { role: "model", text: res.data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I'm having trouble responding right now. Please try again shortly, or reach us through the Contact Us page.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        data-cursor-hover="true"
        aria-label="Open chat assistant"
        className="fixed bottom-6 right-6 z-[90] inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary via-primary to-secondary text-white shadow-xl shadow-primary/40 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-secondary/40"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-primary/60 animate-ping" />}
        <span className="relative">{open ? <FiX size={22} /> : <FiMessageCircle size={22} />}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-[90] flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-primary to-secondary px-4 py-3.5 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 font-heading font-bold">
                T
              </span>
              <div>
                <p className="text-sm font-semibold">Techish Assistant</p>
                <p className="text-xs text-white/80">Ask about our services & work</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-primary text-white rounded-br-sm"
                      : "mr-auto bg-background-subtle text-foreground rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {loading && (
                <div className="mr-auto flex items-center gap-1 rounded-2xl rounded-bl-sm bg-background-subtle px-3.5 py-2.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground-muted [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground-muted [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground-muted" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your question..."
                className="flex-1 rounded-full border border-border bg-background-subtle px-4 py-2 text-sm outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                data-cursor-hover="true"
                aria-label="Send message"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white disabled:opacity-40"
              >
                <FiSend size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
