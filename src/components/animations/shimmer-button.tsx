"use client";

import { motion, type Variants } from "motion/react";
import { ReactNode } from "react";
import { MouseGlow, MagneticWrapper } from "./mouse-follower";
import { soundManager } from "@/lib/sound-effects";

interface ShimmerButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

// 高级光泽按钮（改进版）
export function GlowButton({ 
  children, 
  href, 
  variant = "primary", 
  className = "",
  onClick 
}: ShimmerButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center px-8 py-3.5 rounded-2xl font-bold text-base transition-all duration-500 group overflow-hidden";
  
  const variants = {
    primary: "bg-primary text-primary-foreground shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)]",
    secondary: "bg-card/80 backdrop-blur-sm text-foreground border border-white/10 hover:border-primary/30",
  };
  
  const handleClick = () => {
    soundManager.play("buttonClick");
    if (onClick) onClick();
  };
  
  const content = (
    <MagneticWrapper strength={0.2} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {/* 光泽扫过效果 */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          repeatDelay: 3,
          duration: 1.5,
          ease: "easeInOut",
        }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>
      
      {/* 鼠标跟随光晕 */}
      <MouseGlow glowColor={variant === "primary" ? "rgba(139, 92, 246, 0.3)" : "rgba(255, 255, 255, 0.1)"}>
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </MouseGlow>
      
      {/* 外发光 */}
      {variant === "primary" && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="absolute inset-0 -z-10 rounded-2xl bg-primary/50 blur-[20px]"
        />
      )}
    </MagneticWrapper>
  );
  
  if (href) {
    return (
      <a href={href} className="inline-block" onClick={handleClick}>
        {content}
      </a>
    );
  }
  
  return (
    <button onClick={handleClick} className="inline-block">
      {content}
    </button>
  );
}

// 脉冲按钮（带呼吸效果）
export function PulseButton({ 
  children, 
  href,
  className = "",
  onClick 
}: ShimmerButtonProps) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center justify-center px-8 py-3.5 rounded-2xl font-bold text-base bg-primary text-primary-foreground overflow-hidden ${className}`}
      onClick={onClick}
    >
      {/* 脉冲光环 */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-2xl border-2 border-primary"
      />
      
      {/* 光泽 */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          repeatDelay: 3,
          duration: 1.5,
        }}
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      
      <span className="relative z-10">{children}</span>
    </motion.div>
  );
  
  if (href) {
    return <a href={href}>{content}</a>;
  }
  
  return content;
}

// 浮动标签按钮（带向上浮动效果）
export function FloatingButton({ 
  children, 
  href,
  className = "",
  onClick 
}: ShimmerButtonProps) {
  const content = (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.1 }}
      className={`inline-flex items-center justify-center px-8 py-3.5 rounded-2xl font-bold text-base bg-gradient-to-r from-primary to-purple-600 text-white shadow-[0_10px_30px_rgba(139,92,246,0.4)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.6)] transition-shadow duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
  
  if (href) {
    return <a href={href}>{content}</a>;
  }
  
  return content;
}
