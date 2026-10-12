import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  accent?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  accent,
  className,
  as: Component = "h2",
}) => {
  return (
    <Component
      className={cn(
        "font-extrabold text-navy leading-[1.08] tracking-[-0.025em]",
        Component === "h1"
          ? "text-5xl md:text-[4.25rem]"
          : "text-3xl md:text-[2.5rem] leading-[1.12]",
        className
      )}
    >
      {title}
      {accent && (
        <span className="font-display italic font-normal text-brand">
          {accent}
        </span>
      )}
    </Component>
  );
};
