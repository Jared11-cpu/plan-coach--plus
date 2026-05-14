"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { analyticsMetrics } from "@/data/mock-data";
import { AIAdviceCard } from "@/components/ai-advice-card";
import { MoodSelector } from "@/components/mood-selector";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePlanStore } from "@/store/use-plan-store";
import type { Mood } from "@/types";

export function ReviewAnalyticsSection() {
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
    <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[3rem] border border-[#e7ded1] bg-[#fbf7ef]/86 p-6 shadow-[0_30px_100px_rgba(43,38,30,0.08)] sm:p-9">
        <p className="mb-5 text-base font-black uppercase tracking-[0.28em] text-[#81796e]">Daily Review</p>
        <h3 className="text-4xl font-black leading-[1.05] tracking-[-0.05em] text-[#211f1c] sm:text-6xl">
          今天发生了什么？
        </h3>
        <form onSubmit={submit} className="mt-8 space-y-6">
          <MoodSelector value={mood} onChange={setMood} />
          <Textarea
            value={completed}
            onChange={(event) => setCompleted(event.target.value)}
            placeholder="今天完成了什么"
            className="min-h-24 border-[#e7ded1] bg-white/72 text-xl shadow-none"
          />
          <Textarea
            value={blocker}
            onChange={(event) => setBlocker(event.target.value)}
            placeholder="没完成的原因"
            className="min-h-24 border-[#e7ded1] bg-white/72 text-xl shadow-none"
          />
          <Textarea
            value={tomorrowAdjust}
            onChange={(event) => setTomorrowAdjust(event.target.value)}
            placeholder="明天想调整什么"
            className="min-h-24 border-[#e7ded1] bg-white/72 text-xl shadow-none"
          />
          <Button
            type="submit"
            size="xl"
            data-testid="landing-submit-review"
            className="rounded-full bg-[#211f1c] px-10 text-xl text-[#f8f3ea] hover:bg-[#2e2a24]"
          >
            <Send className="mr-3 h-6 w-6" />
            生成 AI 复盘
          </Button>
        </form>
      </section>

      <section className="grid gap-6">
        {review ? (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <AIAdviceCard review={review} />
          </motion.div>
        ) : (
          <div className="rounded-[3rem] border border-[#e7ded1] bg-white/58 p-8 shadow-[0_30px_100px_rgba(43,38,30,0.08)]">
            <p className="text-base font-black uppercase tracking-[0.28em] text-[#81796e]">AI Poster</p>
            <h3 className="mt-6 max-w-3xl text-4xl font-black leading-[1.04] tracking-[-0.05em] text-[#211f1c] sm:text-6xl">
              复盘会生成一张可展示的高级计划海报。
            </h3>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {analyticsMetrics.map((metric, index) => (
            <motion.article
              key={metric.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.48, delay: index * 0.05 }}
              className="rounded-[2rem] border border-[#e7ded1] bg-white/62 p-6 shadow-[0_22px_70px_rgba(43,38,30,0.07)]"
            >
              <p className="text-lg font-black text-[#81796e]">{metric.label}</p>
              <h4 className="mt-4 text-5xl font-black tracking-[-0.07em] text-[#211f1c] sm:text-6xl">
                {metric.value}
              </h4>
              <p className="mt-5 text-lg font-bold leading-7 text-[#6f675e]">{metric.detail}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
