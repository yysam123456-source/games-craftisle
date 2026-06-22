"use client";

import { getAllGames, getGamesByCategory } from "@/data/games";
import { GameCard } from "@/components/games/GameCard";
import { GameSearch } from "@/components/games/GameSearch";
import { AnimatedWordsAdvanced, CharacterPop, Typewriter } from "@/components/animations/text-animate";
import { ParticleBackground } from "@/components/animations/particle-background";
import { GlowButton, PulseButton } from "@/components/animations/shimmer-button";
import { TiltCard } from "@/components/animations/mouse-follower";
import { GlassCard, AnimatedCounter } from "@/components/animations/premium-components";
import { soundManager } from "@/lib/sound-effects";
import { motion, type Variants } from "motion/react";
import { useState, useEffect } from "react";
import {
  Gamepad2, Download, Trophy, Smartphone, Users, Star, FolderOpen,
  Puzzle, Target, Zap, Building2, Calendar, Sparkles, Flame,
  Volume2, VolumeX, ChevronRight, Heart, Clock
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categoryIcons: Record<string, any> = {
  puzzle: Puzzle,
  arcade: Gamepad2,
  strategy: Target,
  casual: Gamepad2,
  action: Zap,
  building: Building2,
};

const categoryLabels: Record<string, string> = {
  puzzle: "Puzzle",
  arcade: "Arcade",
  strategy: "Strategy",
  casual: "Casual",
  action: "Action",
  building: "Building",
};

function CategoryIcon({ cat, className = "" }: { cat: string; className?: string }) {
  const Icon = categoryIcons[cat] || Gamepad2;
  return <Icon className={className} strokeWidth={1.5} />;
}

const categoryDescriptions: Record<string, string> = {
  puzzle: "Challenge your logic and mind with Sudoku, Minesweeper, word puzzles and more!",
  arcade: "Timeless classic arcade games. Snake, Tetris, Brick Breaker — can't stop playing!",
  strategy: "Plan your moves, test your strategy. Chess and more await your challenge!",
  casual: "Relaxing and fun, perfect for killing time anytime, anywhere!",
  action: "Test your reaction speed, challenge your limits!",
  building: "Unleash your creativity, build your own world!",
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] },
  },
};

const stats = [
  { value: "15+", label: "Free Games", Icon: Gamepad2 },
  { value: "0", label: "No Download", Icon: Download },
  { value: "100%", label: "Free to Play", Icon: Trophy },
  { value: "", label: "Multi-Device", Icon: Smartphone },
];

export default function HomePage() {
  const games = getAllGames().filter((g) => g.isActive);
  const categories = [...new Set(games.map((g) => g.category))];
  const [recentGames, setRecentGames] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [dailyGame, setDailyGame] = useState<any>(null);

  // 计算每日游戏（基于日期 deterministic）
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % games.length;
    setDailyGame(games[index]);
  }, [games]);

  // 从 localStorage 加载最近游玩记录
  useEffect(() => {
    setIsClient(true);
    try {
      const recent = JSON.parse(localStorage.getItem('craftisle-recent') || '[]');
      // 只显示最近5个
      setRecentGames(recent.slice(0, 5));
    } catch (error) {
      console.warn('Failed to load recent games:', error);
    }
  }, []);

  // Schema.org JSON-LD
  const schemaWebSite = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Craftisle Games",
    "url": "https://games.craftisle.com",
    "description": "Play 15+ free HTML5 games online! No download required, play directly in your browser.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://games.craftisle.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });

  const schemaItemList = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Free Online HTML5 Games",
    "description": "Curated list of free HTML5 games",
    "numberOfItems": games.length,
    "itemListElement": games.slice(0, 10).map((game, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "VideoGame",
        "name": game.title,
        "description": game.description,
        "url": `https://games.craftisle.com/play/${game.slug}`,
        "image": `https://games.craftisle.com${game.thumbnail}`,
        "genre": game.category,
        "gamePlatform": "Web Browser",
        "operatingSystem": "Any",
        "applicationCategory": "Game",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": game.rating,
          "ratingCount": game.playCount
        }
      }
    }))
  });

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaWebSite }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaItemList }} />
      {/* ===== Hero Section ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Three.js Particle Background */}
        <ParticleBackground 
          particleCount={150}
          particleColor="#8b5cf6"
          particleSize={2}
          speed={0.5}
          mouseInteraction={true}
          className="absolute inset-0 z-0"
        />

        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 max-w-5xl">
          {/* Floating emoji */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="text-7xl md:text-8xl mb-6 inline-block"
          >
            <Gamepad2 className="w-20 h-20 md:w-24 md:h-24 text-primary" strokeWidth={1.5} />
          </motion.div>

          {/* Animated title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            <span className="block text-foreground">
              <CharacterPop text="Free Online" delay={0.2} />
            </span>
            <span
              className="block mt-2"
              style={{
                background: "linear-gradient(135deg, oklch(0.65 0.25 295), oklch(0.75 0.18 210), oklch(0.70 0.22 350))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <CharacterPop text="HTML5 Games" delay={0.5} />
            </span>
          </h1>

          {/* Animated description - 使用高级单词淡入 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            <AnimatedWordsAdvanced 
              text="No download needed, play directly in your browser!" 
              delay={1.2} 
            />
            <br />
            <span className="text-primary font-semibold">
              <Typewriter 
                texts={["Click and play", "Supports all devices", "100% Free"]} 
                delay={2} 
                className="inline-block"
              />
            </span>
          </motion.p>

          {/* CTA Buttons - 使用脉冲和浮动效果 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <PulseButton href="#all-games" className="text-lg px-10 py-4">
              <Gamepad2 className="w-5 h-5 mr-2 inline -mt-0.5" /> Start Playing
            </PulseButton>
            <GlowButton
              href="#categories"
              variant="secondary"
              className="text-lg px-10 py-4"
            >
              <FolderOpen className="w-5 h-5 mr-2 inline -mt-0.5" /> Browse Categories
            </GlowButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + i * 0.1 }}
                className="text-center group cursor-default"
                whileHover={{ y: -4 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 flex items-center justify-center gap-2">
                  <stat.Icon className="w-6 h-6" strokeWidth={1.5} />{stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== Quick Search ===== */}
      <section className="relative py-12 border-b border-white/[0.04]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Quick Search
            </p>
            <GameSearch
              placeholder="Search games by name, category, or keyword..."
              onSelect={(game) => {
                window.location.href = `/play/${game.slug}`;
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== Animated Stats ===== */}
      <section className="relative py-20 md:py-28 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/3 blur-[150px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: 15, suffix: "+", label: "Free Games", Icon: Gamepad2 },
              { value: 50, suffix: "K+", label: "Active Players", Icon: Users },
              { value: 48, suffix: "/5", label: "Average Rating", Icon: Star },
              { value: 6, suffix: "", label: "Game Categories", Icon: FolderOpen },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.2, 0.65, 0.3, 0.9] }}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <GlassCard className="text-center p-6">
                  <div className="text-4xl mb-3"><stat.Icon className="w-10 h-10 mx-auto text-primary" strokeWidth={1.5} /></div>
                  <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
                    <AnimatedCounter 
                      to={stat.value} 
                      duration={2} 
                      delay={i * 0.2}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Categories ===== */}
      <motion.section
        id="categories"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 md:py-28 border-b border-white/[0.04] relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4"
            >
              EXPLORE CATEGORIES
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">
              <AnimatedWordsAdvanced text="Game Categories" delay={0.2} />
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Choose your favorite game type and start challenging!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => {
              const count = games.filter((g) => g.category === cat).length;
              return (
                <motion.a
                  key={cat}
                  href={`#cat-${cat}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="relative group rounded-2xl p-6 bg-card/60 backdrop-blur-sm border border-white/[0.04] hover:border-primary/30 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="relative z-10 text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      <CategoryIcon cat={cat} className="w-10 h-10 mx-auto text-primary" />
                    </div>
                    <div className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">
                      {categoryLabels[cat] || cat}
                    </div>
                    <div className="text-xs text-muted-foreground">{count} games</div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ===== Game of the Day (Hero) ===== */}
      {dailyGame && (
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-20 md:py-28 border-b border-white/[0.04] relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-[10%] w-[500px] h-[500px] rounded-full bg-amber-500/4 blur-[120px]" />
            <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-primary/4 blur-[100px]" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4"
              >
                <Calendar className="w-4 h-4 mr-1 inline -mt-0.5" /> DAILY CHALLENGE
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-3">
                Game of the Day
              </h2>
              <p className="text-muted-foreground text-base max-w-lg mx-auto">
                A new challenge every day. Come back daily for a fresh game!
              </p>
            </div>

            <Link href={`/play/${dailyGame.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative mx-auto max-w-2xl rounded-2xl overflow-hidden bg-card/80 backdrop-blur-sm border border-white/[0.06] hover:border-primary/30 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)] cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="aspect-video overflow-hidden relative">
                  {dailyGame.thumbnail ? (
                    <Image
                      src={dailyGame.thumbnail}
                      alt={`${dailyGame.title} - Game of the Day`}
                      fill
                      sizes="(max-width: 768px) 100vw, 672px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-brand-cyan/20 flex items-center justify-center">
                      <Gamepad2 className="w-16 h-16 text-primary/40" strokeWidth={1} />
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white/90 border border-white/15">
                      {dailyGame.category}
                    </span>
                  </div>

                  {/* Favorite button placeholder area */}
                  <div className="absolute top-4 right-4">
                    <Heart className="w-5 h-5 text-white/70 group-hover:text-red-400 transition-colors" />
                  </div>
                </div>

                {/* Game info */}
                <div className="p-6 md:p-8 space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                    {dailyGame.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
                    {dailyGame.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {dailyGame.tags.slice(0, 4).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs rounded-lg bg-primary/8 text-primary/70 border border-primary/10 font-medium hover:bg-primary/14 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Rating + plays + CTA row */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" strokeWidth={0} />
                        <span className="text-sm font-bold">{dailyGame.rating}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Gamepad2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        <span className="text-xs">{(dailyGame.playCount / 1000).toFixed(1)}K plays</span>
                      </div>
                      {dailyGame.difficulty && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span className="text-xs capitalize">{dailyGame.difficulty}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                      Play Now
                      <ChevronRight className="w-4 h-4" strokeWidth={2} />
                    </div>
                  </div>
                </div>

                {/* Bottom glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(90deg, transparent, oklch(0.75_0.18_210/0.8), transparent)" }} />
              </motion.div>
            </Link>
          </div>
        </motion.section>
      )}

      {/* ===== Games by Category ===== */}
      {categories.map((cat, catIdx) => {
        const catGames = games.filter((g) => g.category === cat);
        return (
          <motion.section
            id={`cat-${cat}`}
            key={cat}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="py-20 md:py-28 border-b border-white/[0.04] last:border-0 relative"
          >
            {/* Section header */}
            <div className="container mx-auto px-4 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-3"
              >
                {(() => { const CatIcon = categoryIcons[cat] || Gamepad2; return <CatIcon className="w-8 h-8 text-primary" strokeWidth={1.5} />; })()}
                <h2 className="text-2xl md:text-4xl font-extrabold">
                  {categoryLabels[cat] || cat}
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground text-sm md:text-base max-w-2xl"
              >
                {categoryDescriptions[cat]}
              </motion.p>
            </div>

            {/* Games grid */}
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {catGames.map((game, i) => (
                  <GameCard key={game.id} game={game} index={i} />
                ))}
              </div>
            </div>
          </motion.section>
        );
      })}

      {/* ===== Featured Games ===== */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 md:py-28 border-b border-white/[0.04] relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4"
            >
              <Star className="w-4 h-4 mr-1 inline -mt-0.5 text-amber-400" /> FEATURED
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">
              Editor's Choice
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Hand-picked favorites by our team. Don't miss these!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.filter(g => g.featured).slice(0, 8).map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== New Games ===== */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 md:py-28 border-b border-white/[0.04] relative"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-500/3 blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4"
            >
              <Sparkles className="w-4 h-4 mr-1 inline -mt-0.5 text-emerald-400" /> NEW GAMES
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">
              Fresh Arrivals
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Brand new games just added. Be the first to play!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...games]
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice(0, 8)
              .map((game, i) => (
                <GameCard key={game.id} game={game} index={i} />
              ))}
          </div>
        </div>
      </motion.section>

      {/* ===== Popular Games ===== */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 md:py-28 border-b border-white/[0.04] relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 mb-4"
            >
              <Flame className="w-4 h-4 mr-1 inline -mt-0.5 text-red-400" /> POPULAR
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">
              Most Played
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              The games everyone's talking about. Join the fun!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...games]
              .sort((a, b) => b.playCount - a.playCount)
              .slice(0, 8)
              .map((game, i) => (
                <GameCard key={game.id} game={game} index={i} />
              ))}
          </div>
        </div>
      </motion.section>

      {/* ===== All Games ===== */}
      <motion.section
        id="all-games"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 md:py-28 relative"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/3 blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4"
            >
              ALL GAMES
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">
              Every Game
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Curated {games.length} free HTML5 games, click to play!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== Recent Games ===== */}
      {isClient && recentGames.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-20 md:py-28 border-t border-white/[0.04] relative"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4"
              >
                RECENT
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">
                Recently Played
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Games you've played recently. Click to play again!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {recentGames.map((recent: any, i: number) => {
                const game = games.find((g: any) => g.slug === recent.slug);
                if (!game) return null;
                return (
                  <motion.div
                    key={recent.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <GameCard game={game} index={i} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>
      )}

      {/* ===== Why Choose Us ===== */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 md:py-28 border-t border-white/[0.04] relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4"
            >
              WHY CHOOSE US
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Why Choose Craftisle?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We are committed to providing the best gaming experience. No barriers, just play.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                Icon: Gamepad2,
                title: "100% Free",
                desc: "All games are completely free, no registration required, no download needed. Open your browser and start playing.",
                gradient: "from-emerald-500/10 to-emerald-500/0",
              },
              {
                Icon: Smartphone,
                title: "Multi-Device",
                desc: "Perfectly adapted for mobile, tablet, and desktop. Play anywhere, anytime.",
                gradient: "from-blue-500/10 to-blue-500/0",
              },
              {
                Icon: Zap,
                title: "Instant Play",
                desc: "No loading waits, click and play. Perfect for killing time whenever you have a few minutes.",
                gradient: "from-amber-500/10 to-amber-500/0",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.2, 0.65, 0.3, 0.9] }}
              >
                <GlassCard className="p-8 text-center group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.Icon className="w-10 h-10 mx-auto text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== CTA Section ===== */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 md:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[150px]" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6"
          >
            Ready to Play?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto"
          >
            Join thousands of players enjoying free HTML5 games. No ads interrupting your fun.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <GlowButton href="#all-games" className="text-lg px-12 py-5">
              <Gamepad2 className="w-5 h-5 mr-2 inline -mt-0.5" /> Browse All Games
            </GlowButton>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== Player Reviews ===== */}
      <section className="py-20 md:py-28 border-t border-white/[0.04] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-cyan/3 blur-[150px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4"
            >
              PLAYER REVIEWS
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">
              What Players Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Real reviews from our gaming community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "GamerPro",
                initials: "GP",
                rating: 5,
                review: "Best free gaming site ever! No ads, no downloads, just pure gaming fun. The games are addictive!",
                game: "2048",
              },
              {
                name: "GameLover",
                initials: "GL",
                rating: 5,
                review: "I love the variety of games. From puzzles to action, there's something for everyone. Highly recommended!",
                game: "Tetris",
              },
              {
                name: "CasualPlayer",
                initials: "CP",
                rating: 4,
                review: "Perfect for killing time. The games load instantly and run smoothly on my phone. Great job!",
                game: "Flappy Wings",
              },
            ].map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.2, 0.65, 0.3, 0.9] }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <GlassCard className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" strokeWidth={0} />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gray-600/30" strokeWidth={1.5} />
                    ))}
                  </div>
                  
                  {/* Review text */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                    "{review.review}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {review.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{review.name}</div>
                      <div className="text-xs text-muted-foreground">Played {review.game}</div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-white/[0.04] py-16 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-primary to-brand-cyan bg-clip-text text-transparent">
                Craftisle Games
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Curated free HTML5 games. No download, click to play. Supports mobile, tablet, and desktop.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-semibold mb-4 text-foreground">Categories</h4>
              <div className="space-y-2 text-sm">
                {categories.map((cat) => (
                  <a
                    key={cat}
                    href={`#cat-${cat}`}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {categoryLabels[cat]}
                  </a>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-semibold mb-4 text-foreground">Related Sites</h4>
              <div className="space-y-2 text-sm">
                {[
                  { name: "CrazyGames", url: "https://crazygames.com" },
                  { name: "Poki Games", url: "https://poki.com" },
                  { name: "Neal.fun", url: "https://neal.fun" },
                ].map((site) => (
                  <a
                    key={site.name}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {site.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-white/[0.04] pt-8 text-center text-sm text-muted-foreground flex items-center justify-center gap-4"
          >
            © 2026 Craftisle Games. Free online HTML5 games platform.
            <button
              onClick={() => {
                const newState = !soundManager.isEnabled();
                soundManager.setEnabled(newState);
                window.location.reload();
              }}
              className="ml-4 px-3 py-1 rounded-full text-xs bg-white/5 hover:bg-white/10 transition-colors"
            >
              {soundManager.isEnabled() ? <><Volume2 className="w-4 h-4 inline mr-1 -mt-0.5" /> Sound On</> : <><VolumeX className="w-4 h-4 inline mr-1 -mt-0.5" /> Sound Off</>}
            </button>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
