"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ShimmerButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
} & HTMLMotionProps<"button">;

export function ShimmerButton({
  children,
  className = "",
  href,
  className: _cn,
  ...props
}: ShimmerButtonProps) {
  const baseClass = cn(
    "relative overflow-hidden rounded-lg font-semibold transition-all",
    "bg-primary text-primary-foreground",
    "hover:shadow-[0_0_30px_-10px_var(--primary)]",
    className
  );

  const content = (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={baseClass}
      {...props}
    >
      {/* Shimmer effect */}
      <span
        className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
          width: "200%",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }
  return content;
}

type GlowButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary";
};

export function GlowButton({
  children,
  href,
  className = "",
  variant = "primary",
}: GlowButtonProps) {
  const baseClass = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-bold text-lg overflow-hidden transition-all duration-300",
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:shadow-[0_0_40px_-10px_oklch(0.65_0.25_295/0.6)]"
      : "bg-card/80 text-foreground border border-white/10 hover:border-primary/50",
    className
  );

  const content = (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={baseClass}
      style={{ willChange: "transform" } as React.CSSProperties}
    >
      {/* Glow background on hover */}
      <motion.span
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, oklch(0.65 0.25 295/0.2), transparent 70%)",
        } as React.CSSProperties}
      />
      <span className="relative z-10">{children}</span>
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }
  return content;
}
