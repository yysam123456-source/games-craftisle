"use client";

import { motion } from "motion/react";
import { Home, Search, Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-primary/20 to-brand-cyan/20 bg-clip-text text-transparent mb-4"
        >
          404
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground text-lg mb-10 max-w-md mx-auto"
        >
          The page you are looking for doesn't exist or has been moved.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>

          <Link
            href="/#all-games"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.05] text-foreground rounded-xl font-medium hover:bg-white/[0.08] transition-all duration-300 border border-white/[0.04]"
          >
            <Gamepad2 className="w-5 h-5" />
            Play Games
          </Link>
        </motion.div>

        {/* Popular Games */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <p className="text-sm text-muted-foreground mb-4">Popular Games</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["2048", "Tetris", "Snake", "Minesweeper"].map((game) => (
              <Link
                key={game}
                href={`/play/${game.toLowerCase()}`}
                className="px-4 py-2 rounded-lg bg-card/60 backdrop-blur-sm border border-white/[0.04] hover:border-primary/30 transition-all duration-300 text-sm"
              >
                {game}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
