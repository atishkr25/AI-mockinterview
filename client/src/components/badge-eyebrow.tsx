import React from "react";
import { cn } from "@/lib/utils";

export const BadgeEyebrow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "text-xs font-semibold text-brand bg-brand-50 px-3 py-1 rounded-full uppercase tracking-[0.08em]",
        className
      )}
    >
      {children}
    </span>
  );
};
