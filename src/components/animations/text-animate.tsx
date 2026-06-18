"use client";

import { motion, type Variants } from "motion/react";
import { useState, useEffect, useRef } from "react";

interface TextAnimateProps {
  text: string;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

// 逐字显示动画
export function TextAnimate({ text, delay = 0, className = "", as: Tag = "div" }: TextAnimateProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 50); // 每个字符50ms
    
    return () => clearInterval(interval);
  }, [text]);
  
  return (
    <Tag className={`${className} ${isAnimating ? "border-r-2 border-primary" : ""}`}>
      {displayedText}
    </Tag>
  );
}

// 单词逐个淡入动画（改进版）
interface AnimatedWordsProps {
  text: string;
  delay?: number;
  className?: string;
  wordClassName?: string;
}

export function AnimatedWordsAdvanced({ 
  text, 
  delay = 0, 
  className = "",
  wordClassName = ""
}: AnimatedWordsProps) {
  const words = text.split(/\s+/);
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.08,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className={`inline-block mr-2 ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// 字符逐个弹跳出现动画
interface CharacterPopProps {
  text: string;
  delay?: number;
  className?: string;
}

export function CharacterPop({ text, delay = 0, className = "" }: CharacterPopProps) {
  const characters = text.split("");
  
  return (
    <span className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: delay + i * 0.03,
          }}
          className="inline-block"
          style={{ originY: 0.7 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// 文字渐变光晕扫过效果
interface GradientTextProps {
  text: string;
  className?: string;
  gradientClassName?: string;
}

export function GradientText({ text, className = "", gradientClassName = "" }: GradientTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          repeatDelay: 3,
          duration: 2,
          ease: "easeInOut",
        }}
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent ${gradientClassName}`}
        style={{ zIndex: 11 }}
      />
    </span>
  );
}

// 打字机效果（带光标）
interface TypewriterProps {
  texts: string[];
  delay?: number;
  className?: string;
}

export function Typewriter({ texts, delay = 0, className = "" }: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  
  useEffect(() => {
    if (isWaiting) return;
    
    const currentText = texts[currentTextIndex];
    let timeout: NodeJS.Timeout;
    
    if (!isDeleting && displayedText.length < currentText.length) {
      // 打字
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, 100);
    } else if (!isDeleting && displayedText.length === currentText.length) {
      // 打完字，等待2秒后开始删除
      setIsWaiting(true);
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setIsWaiting(false);
      }, 2000);
    } else if (isDeleting && displayedText.length > 0) {
      // 删除
      timeout = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1));
      }, 50);
    } else if (isDeleting && displayedText.length === 0) {
      // 删除完毕，切换到下一个文本
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }
    
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, isWaiting, currentTextIndex, texts]);
  
  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
        className="ml-1 inline-block w-0.5 h-[1em] bg-primary align-middle"
      />
    </span>
  );
}

// 文字模糊清除效果（从模糊到清晰）
interface BlurRevealProps {
  text: string;
  delay?: number;
  className?: string;
}

export function BlurReveal({ text, delay = 0, className = "" }: BlurRevealProps) {
  const words = text.split(/\s+/);
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.1,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// 文字渐变填充动画（从空心到实心）
interface GradientFillProps {
  text: string;
  className?: string;
  gradientColors?: string;
}

export function GradientFill({ 
  text, 
  className = "",
  gradientColors = "from-primary via-brand-cyan to-brand-pink"
}: GradientFillProps) {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
      className={`inline-block bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent bg-no-repeat`}
      style={{ backgroundSize: "0% 100%" }}
    >
      {text}
    </motion.span>
  );
}

// 文字波浪动画（每个字符上下波动）
interface WaveTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function WaveText({ text, className = "", delay = 0 }: WaveTextProps) {
  const characters = text.split("");
  
  return (
    <span className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            delay: delay + i * 0.1,
            ease: "easeInOut",
          }}
          className="inline-block"
          style={{ originY: 0.7 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
