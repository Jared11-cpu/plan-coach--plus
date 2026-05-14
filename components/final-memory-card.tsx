"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FinalMemoryCardProps {
  line?: string;
  onGenerate: () => Promise<void>;
}

export function FinalMemoryCard({ line, onGenerate }: FinalMemoryCardProps) {
  return (
    <section id="memory" data-testid="final-memory-section" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-[3.5rem] bg-[#211f1c] px-7 py-16 text-center text-[#f8f3ea] shadow-[0_42px_140px_rgba(32,29,25,0.22)] sm:px-12 sm:py-24"
        >
          <div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_50%_20%,rgba(255,246,226,0.24),transparent_36%)]" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <p className="text-base font-black uppercase tracking-[0.36em] text-[#d8c79a]">The One Thing</p>
            <h2 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.07em] sm:text-7xl lg:text-8xl">
              如果评委只记住一句话：
            </h2>
            <div className="mt-10 rounded-[2.5rem] border border-white/10 bg-white/8 p-8 backdrop-blur">
              <p data-testid="final-memory-line" className="text-4xl font-black leading-tight tracking-[-0.06em] sm:text-6xl">
                {line ?? "Plan Coach 把目标变成行动，把行动变成证据。"}
              </p>
            </div>
            <Button
              size="xl"
              variant="secondary"
              data-testid="generate-final-memory"
              className="mt-10 rounded-full bg-[#f8f3ea] px-10 text-xl text-[#211f1c] hover:bg-white"
              onClick={() => void onGenerate()}
            >
              <Sparkles className="mr-3 h-6 w-6" />
              生成最终记忆金句
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
