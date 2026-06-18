"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, useEffect, useRef } from "react";

interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 磁力强度 0-1
}

// 磁力跟随组件（按钮/卡片悬停时轻微向鼠标方向吸引）
export function MagneticWrapper({ 
  children, 
  className = "",
  strength = 0.3 
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 鼠标光晕效果（跟随鼠标的小光点）
export function MouseGlow({ 
  children, 
  className = "",
  glowColor = "rgba(139, 92, 246, 0.15)" 
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: string;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        animate={{
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute rounded-full blur-[60px] w-[200px] h-[200px]"
        style={{
          background: glowColor,
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
        }}
      />
      {children}
    </div>
  );
}

// 倾斜跟随鼠标（3D 效果）
export function TiltCard({ 
  children, 
  className = "",
  tiltStrength = 15 
}: { 
  children: React.ReactNode; 
  className?: string;
  tiltStrength?: number;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    
    setRotateY(percentX * tiltStrength);
    setRotateX(-percentY * tiltStrength);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        rotateX: { duration: 0.15, ease: "easeOut" },
        rotateY: { duration: 0.15, ease: "easeOut" },
        scale: { duration: 0.3, ease: [0.2, 0.65, 0.3, 0.9] },
      }}
      className={`preserve-3d ${className}`}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
}
