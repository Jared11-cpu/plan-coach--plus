import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-slate-950 text-white shadow-lg shadow-slate-950/15 hover:-translate-y-0.5 hover:bg-slate-900",
        secondary: "bg-white/70 text-slate-950 shadow-sm hover:bg-white",
        ghost: "text-slate-700 hover:bg-white/60 hover:text-slate-950",
        outline: "border border-white/70 bg-white/35 text-slate-900 hover:bg-white/75",
        success: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600",
        warm: "bg-amber-300 text-slate-950 shadow-lg shadow-amber-300/25 hover:bg-amber-200"
      },
      size: {
        default: "h-12 px-6 text-base",
        lg: "h-16 px-8 text-lg",
        xl: "h-20 px-10 text-xl",
        icon: "h-12 w-12"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
