import { Sparkles } from "lucide-react";
import { GlassCard } from "@/components/glass-card";
import type { DailyReview } from "@/types";

interface AIAdviceCardProps {
  review: DailyReview;
}

export function AIAdviceCard({ review }: AIAdviceCardProps) {
  return (
    <GlassCard className="overflow-hidden p-8 sm:p-10">
      <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-slate-950 px-5 py-3 text-lg font-bold text-white">
        <Sparkles className="h-5 w-5 text-amber-200" />
        AI 复盘海报
      </div>
      <div className="grid gap-5">
        <div className="rounded-[2rem] bg-white/70 p-7">
          <p className="text-base font-bold text-slate-500">今日总结</p>
          <h3 className="mt-4 text-2xl font-black leading-tight text-slate-950 sm:text-3xl">{review.summary}</h3>
        </div>
        <div className="rounded-[2rem] bg-teal-50/85 p-7">
          <p className="text-base font-bold text-teal-700">明天最小行动</p>
          <h3 className="mt-4 text-2xl font-black leading-tight text-teal-950 sm:text-3xl">{review.tomorrowMinimumAction}</h3>
        </div>
        <div className="rounded-[2rem] bg-amber-50/90 p-7">
          <p className="text-base font-bold text-amber-700">一句鼓励</p>
          <h3 className="mt-4 text-2xl font-black leading-tight text-amber-950 sm:text-3xl">{review.encouragement}</h3>
        </div>
        <div className="rounded-[2rem] bg-rose-50/90 p-7">
          <p className="text-base font-bold text-rose-700">计划调整建议</p>
          <h3 className="mt-4 text-2xl font-black leading-tight text-rose-950 sm:text-3xl">{review.adjustment}</h3>
        </div>
      </div>
    </GlassCard>
  );
}
