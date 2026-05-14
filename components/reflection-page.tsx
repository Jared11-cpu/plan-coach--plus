"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { AIAdviceCard } from "@/components/ai-advice-card";
import { BigButton } from "@/components/big-button";
import { GlassCard } from "@/components/glass-card";
import { MoodSelector } from "@/components/mood-selector";
import { Textarea } from "@/components/ui/textarea";
import { usePlanStore } from "@/store/use-plan-store";
import type { Mood } from "@/types";

export function ReflectionPage() {
  const [mood, setMood] = useState<Mood>("一般");
  const [completed, setCompleted] = useState("");
  const [blocker, setBlocker] = useState("");
  const [tomorrowAdjust, setTomorrowAdjust] = useState("");
  const submitReflection = usePlanStore((state) => state.submitReflection);
  const review = usePlanStore((state) => state.review);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitReflection({ mood, completed, blocker, tomorrowAdjust });
  };

  return (
    <main className="min-h-screen px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black tracking-tight text-slate-950 sm:text-7xl">今天发生了什么？</h1>
        <p className="mt-6 max-w-3xl text-2xl font-semibold leading-10 text-slate-600">
          复盘不是审判自己，而是让明天的计划更贴近真实状态。
        </p>

        <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_0.9fr]">
          <GlassCard className="p-7 sm:p-9">
            <form onSubmit={submit} className="space-y-8">
              <section>
                <h2 className="mb-5 text-3xl font-black text-slate-950">心情选择</h2>
                <MoodSelector value={mood} onChange={setMood} />
              </section>
              <section>
                <h2 className="mb-4 text-3xl font-black text-slate-950">今天完成了什么</h2>
                <Textarea value={completed} onChange={(event) => setCompleted(event.target.value)} placeholder="例如：完成了 Hooks 基础练习，写出了计数器组件。" />
              </section>
              <section>
                <h2 className="mb-4 text-3xl font-black text-slate-950">没完成的原因</h2>
                <Textarea value={blocker} onChange={(event) => setBlocker(event.target.value)} placeholder="例如：任务太大、开始太晚、没有明确第一步。" />
              </section>
              <section>
                <h2 className="mb-4 text-3xl font-black text-slate-950">明天想调整什么</h2>
                <Textarea value={tomorrowAdjust} onChange={(event) => setTomorrowAdjust(event.target.value)} placeholder="例如：明天只保留一个 15 分钟任务。" />
              </section>
              <BigButton type="submit" data-testid="submit-review" icon={<Send className="h-6 w-6" />} showArrow>
                生成 AI 复盘
              </BigButton>
            </form>
          </GlassCard>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
            {review ? (
              <AIAdviceCard review={review} />
            ) : (
              <GlassCard className="flex min-h-[520px] items-center justify-center p-9 text-center">
                <div>
                  <p className="text-5xl font-black text-slate-950">等待复盘生成</p>
                  <p className="mx-auto mt-5 max-w-md text-2xl font-semibold leading-10 text-slate-500">
                    填完左侧内容后，AI 会生成一张高级复盘卡片，方便课堂答辩展示。
                  </p>
                </div>
              </GlassCard>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
