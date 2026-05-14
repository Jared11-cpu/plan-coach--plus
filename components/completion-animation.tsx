"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

interface CompletionAnimationProps {
  active: boolean;
}

export function CompletionAnimation({ active }: CompletionAnimationProps) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/70"
            initial={{ scale: 0.35, opacity: 0.75 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-emerald-300/16"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.div
            className="absolute right-8 top-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30"
            initial={{ scale: 0, rotate: -18 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
          >
            <Check className="h-10 w-10" />
          </motion.div>
          {Array.from({ length: 9 }).map((_, index) => (
            <span
              key={index}
              className="absolute bottom-8 h-2 w-2 animate-float-up rounded-full bg-amber-300"
              style={{
                left: `${18 + index * 8}%`,
                animationDelay: `${index * 0.08}s`
              }}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
