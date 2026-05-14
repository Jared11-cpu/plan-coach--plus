"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const anchors = [
  { href: "#innovation", label: "Idea" },
  { href: "#execution-map", label: "Map" },
  { href: "#proof-wall", label: "Proof" },
  { href: "#demo-story", label: "Demo" },
  { href: "#judge", label: "Judge" },
  { href: "#minimum-win", label: "Win" },
  { href: "#coach", label: "Coach" },
  { href: "#memory", label: "Memory" }
];

export function MinimalNavbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-5 sm:px-8">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#211f1c] text-[#f7f2e9] shadow-[0_18px_45px_rgba(31,29,25,0.16)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="leading-none">
            <p className="text-xl font-black tracking-[-0.03em] text-[#211f1c]">Plan Coach</p>
            <p className="mt-1 text-[11px] font-black uppercase tracking-[0.28em] text-[#81796e]">AI Action</p>
          </div>
        </a>

        <nav className="hidden items-center gap-2 rounded-full border border-[#ded7cc]/70 bg-[#f8f3ea]/75 p-1.5 shadow-[0_16px_45px_rgba(43,38,30,0.08)] backdrop-blur-xl lg:flex">
          {anchors.map((anchor) => (
            <a
              key={anchor.href}
              href={anchor.href}
              className={cn(
                "rounded-full px-5 py-3 text-sm font-black uppercase tracking-[-0.01em] text-[#4c463f] transition",
                "hover:bg-white hover:text-[#211f1c] hover:shadow-sm"
              )}
            >
              {anchor.label}
            </a>
          ))}
        </nav>

        <a
          href="#top"
          className="rounded-full border border-[#ded7cc]/80 bg-white/80 px-5 py-3 text-sm font-black text-[#211f1c] shadow-[0_16px_45px_rgba(43,38,30,0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white"
        >
          生成执行系统
        </a>
      </div>
    </header>
  );
}
