"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/types/game";
import { cn } from "@/lib/utils";
import { TiltCard, MouseGlow } from "@/components/animations/mouse-follower";
import { soundManager } from "@/lib/sound-effects";

interface GameCardProps {
  game: Game;
  index?: number;
}

export function GameCard({ game, index = 0 }: GameCardProps) {
  const handleMouseEnter = () => {
    soundManager.play("buttonHover");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.2, 0.65, 0.3, 0.9],
      }}
      onMouseEnter={handleMouseEnter}
    >
      <TiltCard 
        tiltStrength={10} 
        className="group perspective-[1000px]"
      >
        <Link href={`/play/${game.slug}`} className="block">
          {/* Card with glow border */}
          <div
            className={cn(
              "relative rounded-2xl overflow-hidden",
              "bg-card/80 backdrop-blur-sm",
              "border border-white/[0.06]",
              "transition-all duration-500",
              "hover:border-primary/30",
              "hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
              "before:absolute before:inset-0 before:rounded-2xl before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
              "before:bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.65_0.25_295/0.15),transparent_70%)]"
            )}
            style={{ willChange: "transform" }}
          >
          {/* Thumbnail */}
          <div className="aspect-video overflow-hidden relative">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="w-full h-full"
            >
              <Image
                src={game.thumbnail}
                alt={`${game.title} game thumbnail`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                unoptimized
              />
            </motion.div>

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
              <div className="w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_oklch(0.65_0.25_295/0.5)]">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-sm text-white/90 border border-white/10">
                {game.category}
              </span>
            </div>
          </div>

          {/* Game info */}
          <div className="p-5 space-y-3">
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors duration-300">
              {game.title}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {game.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {game.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[11px] rounded-md bg-primary/5 text-primary/70 border border-primary/10 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Rating and play count */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 text-sm">⭐</span>
                <span className="text-sm font-semibold">{game.rating}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="text-sm">🎮</span>
                <span className="text-xs">{(game.playCount / 1000).toFixed(0)}K plays</span>
              </div>
            </div>
          </div>

          {/* Bottom glow line on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(90deg, transparent, oklch(0.65 0.25 295/0.8), transparent)",
            }}
          />
        </div>
      </Link>
    </TiltCard>
    </motion.div>
  );
}
