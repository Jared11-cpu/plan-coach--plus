import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-16 w-full rounded-3xl border border-white/70 bg-white/70 px-7 text-xl text-slate-950 shadow-inner shadow-white/35 outline-none backdrop-blur placeholder:text-slate-400 focus:border-teal-300 focus:ring-4 focus:ring-teal-300/20",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
