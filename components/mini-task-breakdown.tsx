"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { MiniTask } from "@/types";

interface MiniTaskBreakdownProps {
  items: MiniTask[];
  open: boolean;
}

export function MiniTaskBreakdown({ items, open }: MiniTaskBreakdownProps) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className="mt-6 grid gap-3">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                className="flex items-center gap-4 rounded-2xl border border-white/70 bg-white/70 p-5 text-lg font-bold text-slate-700"
                data-testid="mini-task"
              >
                <CheckCircle2 className="h-6 w-6 text-teal-600" />
                {item.title}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
