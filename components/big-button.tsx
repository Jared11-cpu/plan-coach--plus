import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BigButtonProps extends ButtonProps {
  icon?: ReactNode;
  showArrow?: boolean;
}

export function BigButton({ className, children, icon, showArrow = false, ...props }: BigButtonProps) {
  return (
    <Button
      size="xl"
      className={cn("group gap-3 rounded-3xl text-lg sm:text-xl", className)}
      {...props}
    >
      {icon}
      <span>{children}</span>
      {showArrow ? <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" /> : null}
    </Button>
  );
}
