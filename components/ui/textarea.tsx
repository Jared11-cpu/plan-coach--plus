import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "min-h-36 w-full rounded-3xl border border-white/70 bg-white/70 px-7 py-6 text-xl text-slate-950 shadow-inner shadow-white/35 outline-none backdrop-blur placeholder:text-slate-400 focus:border-teal-300 focus:ring-4 focus:ring-teal-300/20",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
