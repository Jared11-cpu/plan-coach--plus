import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  dark?: boolean;
}

export function GlassCard({ className, dark, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        dark ? "glass-dark text-white" : "glass text-slate-950",
        "rounded-3xl",
        className
      )}
      {...props}
    />
  );
}
