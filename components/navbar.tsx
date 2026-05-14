"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, ChartNoAxesCombined, MessageCircle, Timer, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BrainCircuit },
  { href: "/coach", label: "AI Coach", icon: MessageCircle },
  { href: "/focus", label: "Focus", icon: Timer },
  { href: "/review", label: "Review", icon: Sparkles },
  { href: "/analytics", label: "Analytics", icon: ChartNoAxesCombined }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-white/55 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/15">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-black tracking-tight text-slate-950">Plan Coach</p>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">AI Action System</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 transition",
                  active ? "bg-slate-950 text-white shadow-lg shadow-slate-950/15" : "hover:bg-white/70 hover:text-slate-950"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/dashboard"
          className="rounded-2xl bg-white/70 px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-white"
        >
          进入计划
        </Link>
      </div>
    </header>
  );
}
