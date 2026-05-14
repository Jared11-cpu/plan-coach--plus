"use client";

import { FormEvent, useState } from "react";
import { Loader2, WandSparkles } from "lucide-react";
import { BigButton } from "@/components/big-button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface GoalInputProps {
  onGenerate: (goal: string) => Promise<void> | void;
  isLoading?: boolean;
  className?: string;
  placeholder?: string;
  buttonLabel?: string;
  loadingLabel?: string;
  fallbackGoal?: string;
}

export function GoalInput({
  onGenerate,
  isLoading,
  className,
  placeholder = "例如：我想在 30 天内学会 React",
  buttonLabel = "生成我的计划",
  loadingLabel = "正在生成",
  fallbackGoal = "我想在 30 天内学会 React"
}: GoalInputProps) {
  const [goal, setGoal] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanGoal = goal.trim() || fallbackGoal;
    await onGenerate(cleanGoal);
  };

  return (
    <form onSubmit={submit} className={cn("glass mx-auto w-full max-w-5xl rounded-[2rem] p-4 sm:p-5", className)}>
      <div className="flex flex-col gap-4 lg:flex-row">
        <Input
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          placeholder={placeholder}
          className="h-20 flex-1 border-transparent bg-white/80 text-2xl shadow-none sm:text-3xl"
        />
        <BigButton
          type="submit"
          data-testid="generate-plan"
          icon={isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <WandSparkles className="h-6 w-6" />}
          showArrow={!isLoading}
        >
          {isLoading ? loadingLabel : buttonLabel}
        </BigButton>
      </div>
    </form>
  );
}
