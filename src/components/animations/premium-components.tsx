"use client";

import { motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

// 数字滚动动画组件
export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  className = "",
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedValue, setDisplayedValue] = useState(from);
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      
      setDisplayedValue(Math.floor(current));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay * 1000);
    
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, from, to, duration, delay]);
  
  return (
    <span ref={ref} className={className}>
      {prefix}{displayedValue}{suffix}
    </span>
  );
}

// 圆形进度条组件
interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  className = "",
  children,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = value / max;
  const strokeDashoffset = circumference * (1 - progress);
  
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/10"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-primary"
          initial={{ strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: strokeDashoffset }}
          transition={{ duration: 2, ease: [0.2, 0.65, 0.3, 0.9] }}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
          }}
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// 渐变边框卡片组件
interface GradientBorderCardProps {
  children: React.ReactNode;
  className?: string;
  gradientColors?: string;
  borderWidth?: number;
}

export function GradientBorderCard({
  children,
  className = "",
  gradientColors = "from-primary via-brand-cyan to-brand-pink",
  borderWidth = 2,
}: GradientBorderCardProps) {
  return (
    <div className={`relative rounded-2xl p-[${borderWidth}px] bg-gradient-to-r ${gradientColors}`}>
      <div className={`relative z-10 rounded-2xl bg-card/90 backdrop-blur-sm p-6`}>
        {children}
      </div>
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-brand-cyan/20 to-brand-pink/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10" />
    </div>
  );
}

// 图标悬浮动画组件
interface FloatingIconProps {
  icon: string;
  size?: number;
  className?: string;
  animationDelay?: number;
}

export function FloatingIcon({
  icon,
  size = 64,
  className = "",
  animationDelay = 0,
}: FloatingIconProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-8, 0, -8] }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut",
        delay: animationDelay,
      }}
      className={`flex items-center justify-center rounded-2xl bg-primary/10 text-[${size / 2}px]`}
      style={{ width: size, height: size }}
    >
      {icon}
    </motion.div>
  );
}

// 玻璃态卡片组件
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hoverEffect = true,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: [0.2, 0.65, 0.3, 0.9] }}
      className={`relative group rounded-3xl p-8 overflow-hidden
        bg-white/[0.05] backdrop-blur-xl
        border border-white/[0.08]
        hover:border-primary/30
        transition-all duration-500
        ${className}`}
    >
      {/* Glass reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[80px]" />
      </div>
    </motion.div>
  );
}
