"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Sparkles } from "lucide-react";
import type { ProofItem } from "@/types";

interface ProofWallProps {
  proofs: ProofItem[];
}

export function ProofWall({ proofs }: ProofWallProps) {
  return (
    <section id="proof-wall" data-testid="proof-wall" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[1500px]">
        <p className="mb-5 text-base font-black uppercase tracking-[0.3em] text-[#81796e]">Proof Wall</p>
        <h2 className="max-w-6xl text-5xl font-black leading-[1.02] tracking-[-0.07em] text-[#211f1c] sm:text-7xl">
          完成不只是打勾，它会变成能展示的证据。
        </h2>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <AnimatePresence>
            {proofs.length > 0 ? (
              proofs.map((proof, index) => (
                <motion.article
                  key={proof.id}
                  data-testid="proof-card"
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className="min-h-[360px] rounded-[2.5rem] border border-[#cfe8df] bg-[#eef8f3]/86 p-7 shadow-[0_28px_90px_rgba(43,38,30,0.08)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#211f1c] text-[#f8f3ea]">
                      <BadgeCheck className="h-7 w-7" />
                    </div>
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0f766e]">Proof #{proofs.length - index}</p>
                  </div>
                  <h3 className="mt-8 text-4xl font-black tracking-[-0.06em] text-[#211f1c]">{proof.title}</h3>
                  <p className="mt-5 text-xl font-bold leading-8 text-[#21433d]">{proof.evidence}</p>
                  <p className="mt-5 text-lg font-bold leading-7 text-[#5f6e66]">{proof.value}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {proof.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/72 px-4 py-2 text-sm font-black text-[#123f39]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 rounded-[1.5rem] bg-white/66 p-4 text-base font-black leading-6 text-[#123f39]">
                    下一步：{proof.nextStep}
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div
                data-testid="proof-wall-empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-3 rounded-[2.5rem] border border-[#e7ded1] bg-[#fbf7ef]/72 p-10 text-center shadow-[0_28px_90px_rgba(43,38,30,0.07)]"
              >
                <Sparkles className="mx-auto h-10 w-10 text-[#a08753]" />
                <h3 className="mt-6 text-4xl font-black tracking-[-0.06em] text-[#211f1c]">
                  完成第一个任务后，第一条 Proof 会出现在这里。
                </h3>
                <p className="mx-auto mt-5 max-w-2xl text-xl font-bold leading-8 text-[#746b60]">
                  这就是 Plan Coach 和 Todo List 的分界线：完成动作会自动变成演示证据。
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
