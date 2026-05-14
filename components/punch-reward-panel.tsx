"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, FileText, Mic2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PunchRewardPanelProps {
  proofCount: number;
  hasNextTask: boolean;
  onNext: () => void;
  onViewProof: () => void;
  onGenerateStory: () => void;
}

export function PunchRewardPanel({
  proofCount,
  hasNextTask,
  onNext,
  onViewProof,
  onGenerateStory
}: PunchRewardPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      className="mt-8 rounded-[2.4rem] border border-[#bfe7d5] bg-[#eef8f3]/92 p-6 shadow-[0_26px_80px_rgba(43,38,30,0.09)]"
      data-testid="punch-reward-panel"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3 text-[#10634c]">
            <BadgeCheck className="h-7 w-7" />
            <p className="text-base font-black uppercase tracking-[0.22em]">Proof Created</p>
          </div>
          <h4 className="mt-4 text-3xl font-black leading-tight tracking-[-0.05em] text-[#123f39] sm:text-4xl">
            这一张卡完成了，你又多了一条可以展示的 Proof。
          </h4>
          <p className="mt-3 text-lg font-bold leading-7 text-[#4f6b61]">
            当前 Proof 数量：{proofCount}。继续下一张，执行闭环会越来越清楚。
          </p>
        </div>
        <Sparkles className="hidden h-16 w-16 text-[#d5a928] lg:block" />
      </div>

      <div className="mt-7 grid gap-3 lg:grid-cols-3">
        {hasNextTask ? (
          <Button
            size="xl"
            className="rounded-full bg-[#211f1c] text-xl text-[#f8f3ea] hover:bg-[#2e2a24]"
            onClick={onNext}
            data-testid="punch-next-task"
          >
            继续下一个任务
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        ) : (
          <Button
            size="xl"
            className="rounded-full bg-[#211f1c] text-xl text-[#f8f3ea] hover:bg-[#2e2a24]"
            onClick={onGenerateStory}
            data-testid="punch-finish-story"
          >
            生成演示脚本
            <Mic2 className="ml-3 h-6 w-6" />
          </Button>
        )}
        <Button
          size="xl"
          variant="secondary"
          className="rounded-full bg-white/78 text-xl text-[#211f1c]"
          onClick={onViewProof}
          data-testid="punch-view-proof"
        >
          <FileText className="mr-3 h-6 w-6" />
          查看 Proof
        </Button>
        <Button
          size="xl"
          variant="outline"
          className="rounded-full border-[#d8cbb9] bg-white/42 text-xl text-[#211f1c]"
          onClick={onGenerateStory}
          data-testid="punch-generate-story"
        >
          <Mic2 className="mr-3 h-6 w-6" />
          生成演示脚本
        </Button>
      </div>
    </motion.div>
  );
}
