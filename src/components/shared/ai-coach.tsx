"use client";

// The AI Financial Coach modal — session-199, the reference's anatomy
// (live-observed + VLM): "AI Financial Coach" header with the bot icon
// tile, scrollable message list with avatar'd bubbles, the suggested-
// question chips, and the "Ask me about your finances..." input + send.

import * as React from "react";
import { Bot, Send, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AI_SUGGESTED_QUESTIONS } from "@/lib/constants";
import { useWealthOs } from "@/stores/wealthos-store";
import { cn } from "@/lib/utils";

interface CoachMessage {
  role: "user" | "assistant";
  content: string;
}

export function AiCoachDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const askCoach = useWealthOs((s) => s.askCoach);
  const [messages, setMessages] = React.useState<CoachMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);

  // The greeting bubble on open (the reference's opening message genus) —
  // RENDER-TIME adjustment (no setState inside an effect): the greeting
  // seeds the thread the first time the dialog opens.
  const [greeted, setGreeted] = React.useState(false);
  if (open && !greeted) {
    setGreeted(true);
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm your AI financial coach. Ask me about your spending, savings goals, or investments — or pick a question below.",
      },
    ]);
  }

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  const send = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || busy) return;
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setBusy(true);
    const res = await askCoach(trimmed);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: res.ok
          ? res.data.answer
          : "Sorry — I couldn't analyze your finances just now. Please try again.",
      },
    ]);
    setBusy(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[80vh] max-w-2xl flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b border-stone-200 px-5 py-4 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900 text-white dark:bg-amber-500 dark:text-stone-900">
              <Bot className="h-5 w-5" />
            </span>
            <DialogTitle>AI Financial Coach</DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            Ask questions about your finances and get AI-powered insights.
          </DialogDescription>
        </DialogHeader>

        {/* Session-219 (R-16, F-219j): the message LIST is the polite live
             region — assistant replies are announced when they land (the
             old aria-live wrapped only the textless dots row). */}
        <div ref={listRef} aria-live="polite" className="flex-1 space-y-4 overflow-y-auto px-5 py-4 scrollbar-thin">
          {messages.map((message, i) => (
            <div
              key={i}
              className={cn("flex gap-2.5", message.role === "user" && "flex-row-reverse")}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  message.role === "assistant"
                    ? "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300"
                    : "bg-amber-500 text-stone-900",
                )}
                aria-hidden="true"
              >
                {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </span>
              <div
                className={cn(
                  "max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  message.role === "assistant"
                    ? "rounded-tl-sm bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-200"
                    : "rounded-tr-sm bg-amber-500 text-stone-900",
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          {busy ? (
            <div className="flex gap-2.5">
              {/* F-219j: the thinking state is announced (sr-only text —
                  the dots alone say nothing). */}
              <span className="sr-only">Coach is thinking…</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                <Bot className="h-4 w-4" />
              </span>
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-stone-100 px-4 py-3 dark:bg-stone-800">
                <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400 [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400 [animation-delay:300ms]" />
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-t border-stone-200 px-5 py-3 dark:border-stone-800">
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {AI_SUGGESTED_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                disabled={busy}
                onClick={() => void send(question)}
                className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:border-amber-300 hover:text-amber-700 disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-amber-500/40 dark:hover:text-amber-300"
              >
                {question}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about your finances..."
              aria-label="Ask the AI coach a question"
              className="h-11 flex-1 rounded-lg border border-stone-200 bg-white px-3.5 text-sm text-stone-900 shadow-sm placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
            />
            <button
              type="submit"
              disabled={busy || input.trim().length === 0}
              aria-label="Send question"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-stone-900 shadow-md shadow-amber-500/25 transition-all hover:from-amber-600 hover:to-yellow-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
