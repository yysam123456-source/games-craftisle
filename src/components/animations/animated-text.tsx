"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
}

export function AnimatedText({
  text,
  className = "",
  once = true,
  delay = 0,
}: AnimatedTextProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * 0.03,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={variants}
          className="inline-block"
          style={{ willChange: "transform, opacity" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface AnimatedWordsProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
}

export function AnimatedWords({
  text,
  className = "",
  once = true,
  delay = 0,
}: AnimatedWordsProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{ once }}
          transition={{
            delay: delay + i * 0.06,
            duration: 0.5,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block mr-[0.25em]"
          style={{ willChange: "transform, opacity, filter" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
