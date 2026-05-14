"use client";

import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/use-plan-store";

const suggestions = ["来不及了", "评委会觉得普通吗", "帮我压缩成 MVP", "生成 60 秒 pitch"];

export function CoachPanel() {
  const [input, setInput] = useState("");
  const messages = usePlanStore((state) => state.coachMessages);
  const sendCoachMessage = usePlanStore((state) => state.sendCoachMessage);
  const isCoachTyping = usePlanStore((state) => state.isCoachTyping);
  const activateMinimumViableWin = usePlanStore((state) => state.activateMinimumViableWin);
  const generateDemoStoryForGoal = usePlanStore((state) => state.generateDemoStoryForGoal);
  const generateJudgeSimulationsForGoal = usePlanStore((state) => state.generateJudgeSimulationsForGoal);

  const visibleMessages = useMemo(() => messages.slice(-3), [messages]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const clean = input.trim();
    if (!clean) return;
    setInput("");
    await sendCoachMessage(clean);
  };

  const quickSend = async (message: string) => {
    setInput("");
    await sendCoachMessage(message);
    if (message.includes("MVP") || message.includes("压缩") || message.includes("来不及")) {
      await activateMinimumViableWin();
    }
    if (message.includes("pitch") || message.includes("演示")) {
      await generateDemoStoryForGoal();
    }
    if (message.includes("评委")) {
      await generateJudgeSimulationsForGoal();
    }
  };

  return (
    <div className="rounded-[2.5rem] border border-[#e7ded1] bg-[#fbf7ef]/88 p-5 shadow-[0_30px_100px_rgba(43,38,30,0.10)] backdrop-blur-xl sm:p-8">
      <div className="grid gap-4">
        <AnimatePresence initial={false}>
          {visibleMessages.map((message) => {
            const user = message.role === "user";
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={cn("flex", user ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-3xl rounded-[2rem] px-7 py-5 text-xl font-bold leading-8 sm:text-2xl sm:leading-10",
                    user
                      ? "bg-[#211f1c] text-[#f8f3ea]"
                      : "border border-[#ebe1d4] bg-white/78 text-[#25211c] shadow-[0_20px_60px_rgba(43,38,30,0.07)]"
                  )}
                >
                  {message.content}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isCoachTyping ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-black text-[#81796e]">
            AI 正在把计划压小一点...
          </motion.div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {suggestions.map((item) => (
          <Button
            key={item}
            variant="secondary"
            size="lg"
            className="rounded-full border border-[#e7ded1] bg-white/70 text-lg text-[#322d27] hover:bg-white"
            onClick={() => void quickSend(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto]">
        <Textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="告诉 AI Coach：我今天很累 / 这个任务太难 / 帮我重新安排"
          className="min-h-24 border-[#e7ded1] bg-white/72 text-xl shadow-none sm:text-2xl"
        />
        <Button
          type="submit"
          size="xl"
          data-testid="landing-coach-send"
          className="rounded-full bg-[#211f1c] px-10 text-xl text-[#f8f3ea] hover:bg-[#2e2a24]"
        >
          <Send className="mr-3 h-6 w-6" />
          发送
        </Button>
      </form>
    </div>
  );
}
