"use client";

import { motion } from "framer-motion";
import type { ReadinessScore } from "@/types";

interface ReadinessScoreCardProps {
  readiness: ReadinessScore;
  proofCount: number;
}

export function ReadinessScoreCard({ readiness, proofCount }: ReadinessScoreCardProps) {
  return (
    <div className="rounded-[2.5rem] border border-[#e7ded1] bg-[#fbf7ef]/78 p-8 shadow-[0_25px_80px_rgba(43,38,30,0.08)]">
      <p className="text-base font-black uppercase tracking-[0.24em] text-[#81796e]">
        Competition Readiness
      </p>
      <motion.div
        key={readiness.value}
        initial={{ opacity: 0.7, scale: 0.94 }}
        animate={{ opacity: 1, scale: [1, 1.04, 1] }}
        className="mt-5 text-7xl font-black tracking-[-0.08em] text-[#211f1c]"
      >
        {readiness.value}
        <span className="text-3xl text-[#81796e]">/100</span>
      </motion.div>
      <p className="mt-4 text-2xl font-black leading-8 text-[#211f1c]">{readiness.label}</p>
      <div className="mt-7 grid gap-3 text-lg font-bold text-[#746b60]">
        <p>Proof Count：{proofCount}</p>
        <p>Demo Confidence：{readiness.demoConfidence}</p>
        <p>Risk Level：{readiness.riskLevel}</p>
      </div>
      <div className="mt-7 rounded-[2rem] bg-[#eef8f3] p-5 text-lg font-black leading-7 text-[#123f39]">
        Next Best Move：{readiness.nextBestMove}
      </div>
    </div>
  );
}
