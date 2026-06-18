"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";

interface MeteorBackgroundProps {
  count?: number;
  color?: string;
  minDuration?: number;
  maxDuration?: number;
  minDelay?: number;
  maxDelay?: number;
  className?: string;
}

export function MeteorBackground({
  count = 15,
  color = "var(--primary)",
  minDuration = 3,
  maxDuration = 8,
  minDelay = 0,
  maxDelay = 5,
  className = "",
}: MeteorBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />
    );
  }

  const meteors = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100 + 10}%`,
    duration: minDuration + Math.random() * (maxDuration - minDuration),
    delay: minDelay + Math.random() * (maxDelay - minDelay),
    size: 1 + Math.random() * 2,
    trailLength: 50 + Math.random() * 100,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {meteors.map((m) => (
        <motion.div
          key={m.id}
          className="absolute rotate-[215deg]"
          style={{
            top: m.top,
            left: m.left,
            width: `${m.size}px`,
            height: `${m.trailLength}px`,
            background: `linear-gradient(to bottom, ${color}, transparent)`,
            borderRadius: "50%",
            filter: "blur(0.5px)",
          }}
          animate={{
            x: [-100, -600],
            y: [0, 400],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: m.duration,
            repeat: Infinity,
            delay: m.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  hoverScale?: number;
}

export function GlowCard({
  children,
  className = "",
  glowColor,
  hoverScale = 1.02,
}: GlowCardProps) {
  return (
    <motion.div
      className={`relative rounded-2xl border border-white/5 bg-card/80 backdrop-blur-sm overflow-hidden group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: hoverScale,
        transition: { duration: 0.3, ease: [0.2, 0.65, 0.3, 0.9] },
      }}
      style={{
        willChange: "transform, opacity",
        boxShadow: glowColor
          ? `0 0 30px -10px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.05)`
          : "0 0 30px -10px oklch(0.65 0.25 295 / 0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${glowColor || "oklch(0.65 0.25 295 / 0.6)"}, transparent)`,
        }}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${glowColor || "oklch(0.65 0.25 295 / 0.08)"}, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}
