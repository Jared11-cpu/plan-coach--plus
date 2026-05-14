"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { BigButton } from "@/components/big-button";
import { GlassCard } from "@/components/glass-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/use-plan-store";
import type { CoachMessage } from "@/types";

const suggestions = ["我今天很累", "我不想做了", "这个任务太难", "帮我重新安排"];

function TypingText({ text, active }: { text: string; active: boolean }) {
  const [visible, setVisible] = useState(active ? "" : text);

  useEffect(() => {
    if (!active) {
      setVisible(text);
      return;
    }

    setVisible("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisible(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, 18);

    return () => window.clearInterval(timer);
  }, [active, text]);

  return <>{visible}</>;
}

function MessageBubble({ message, latestAssistant }: { message: CoachMessage; latestAssistant: boolean }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-3xl rounded-[2rem] px-7 py-6 text-2xl font-semibold leading-10 shadow-soft-ring backdrop-blur",
          isUser ? "bg-slate-950 text-white" : "bg-white/70 text-slate-900"
        )}
      >
        {isUser ? message.content : <TypingText text={message.content} active={latestAssistant} />}
      </div>
    </motion.div>
  );
}

export function CoachChat() {
  const [input, setInput] = useState("");
  const messages = usePlanStore((state) => state.coachMessages);
  const sendCoachMessage = usePlanStore((state) => state.sendCoachMessage);
  const isCoachTyping = usePlanStore((state) => state.isCoachTyping);
  const scrollRef = useRef<HTMLDivElement>(null);

  const latestAssistantId = useMemo(
    () => [...messages].reverse().find((message) => message.role === "assistant")?.id,
    [messages]
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isCoachTyping]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const clean = input.trim();
    if (!clean) return;
    setInput("");
    await sendCoachMessage(clean);
  };

  const quickSend = async (text: string) => {
    setInput("");
    await sendCoachMessage(text);
  };

  return (
    <main className="min-h-screen px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-5 inline-flex items-center gap-3 rounded-full bg-white/70 px-5 py-3 text-base font-bold text-slate-600 shadow-sm backdrop-blur">
            <Sparkles className="h-5 w-5 text-teal-600" />
            AI Coach Chat
          </p>
          <h1 className="text-5xl font-black tracking-tight text-slate-950 sm:text-7xl">和你的 AI 教练说说话</h1>
          <p className="mt-6 max-w-3xl text-2xl font-semibold leading-10 text-slate-600">
            这里不是说教区。你可以真实地说累、说卡住、说不想做，系统会把计划调小。
          </p>
        </div>

        <GlassCard className="p-5 sm:p-8">
          <div className="max-h-[58vh] min-h-[440px] space-y-6 overflow-y-auto rounded-[2rem] bg-white/35 p-5 sm:p-7">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  latestAssistant={message.id === latestAssistantId}
                />
              ))}
            </AnimatePresence>
            {isCoachTyping ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="rounded-[2rem] bg-white/70 px-7 py-6 text-2xl font-bold text-slate-500 shadow-soft-ring">
                  AI 正在重新压小任务...
                </div>
              </motion.div>
            ) : null}
            <div ref={scrollRef} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {suggestions.map((item) => (
              <Button
                key={item}
                variant="secondary"
                size="lg"
                className="rounded-full text-lg"
                onClick={() => void quickSend(item)}
              >
                {item}
              </Button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
            <Textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="告诉 AI Coach：我今天很累 / 这个任务太难 / 帮我重新安排"
              className="min-h-28 text-2xl"
            />
            <BigButton type="submit" data-testid="send-coach-message" icon={<Send className="h-6 w-6" />}>
              发送
            </BigButton>
          </form>
        </GlassCard>
      </div>
    </main>
  );
}
