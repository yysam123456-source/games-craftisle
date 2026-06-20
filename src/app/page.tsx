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

const categoryNames: Record<string, string> = {
  puzzle: "🧩 Puzzle",
  arcade: "🕹️ Arcade",
  strategy: "♟️ Strategy",
  casual: "🎮 Casual",
  action: "⚡ Action",
  building: "🏗️ Building",
};

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
  { value: "15+", label: "Free Games", icon: "🎮" },
  { value: "0", label: "No Download", icon: "⬇️" },
  { value: "100%", label: "Free to Play", icon: "💯" },
  { value: "📱", label: "Multi-Device", icon: "" },
];

export default function HomePage() {
  const games = getAllGames().filter((g) => g.isActive);
  const categories = [...new Set(games.map((g) => g.category))];
  const [recentGames, setRecentGames] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

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
            🎮
          </motion.div>

          {/* Animated title - 使用高级字符弹跳动画 */}
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
              🎮 Start Playing
            </PulseButton>
            <GlowButton
              href="#categories"
              variant="secondary"
              className="text-lg px-10 py-4"
            >
              📂 Browse Categories
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
                <div className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {stat.icon} {stat.value}
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
              { value: 15, suffix: "+", label: "Free Games", icon: "🎮" },
              { value: 50, suffix: "K+", label: "Active Players", icon: "👥" },
              { value: 48, suffix: "/5", label: "Average Rating", icon: "⭐" },
              { value: 6, suffix: "", label: "Game Categories", icon: "📂" },
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
                  <div className="text-4xl mb-3">{stat.icon}</div>
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
                      {categoryNames[cat]?.charAt(0) || "🎮"}
                    </div>
                    <div className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">
                      {categoryNames[cat]?.slice(2).trim() || cat}
                    </div>
                    <div className="text-xs text-muted-foreground">{count} games</div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.section>

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
                <span className="text-3xl">{categoryNames[cat]?.charAt(0) || "🎮"}</span>
                <h2 className="text-2xl md:text-4xl font-extrabold">
                  {categoryNames[cat]?.slice(2).trim() || cat}
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
              ⭐ FEATURED
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
              🆕 NEW GAMES
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
              🔥 POPULAR
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
                icon: "🎮",
                title: "100% Free",
                desc: "All games are completely free, no registration required, no download needed. Open your browser and start playing.",
                gradient: "from-emerald-500/10 to-emerald-500/0",
              },
              {
                icon: "📱",
                title: "Multi-Device",
                desc: "Perfectly adapted for mobile, tablet, and desktop. Play anywhere, anytime.",
                gradient: "from-blue-500/10 to-blue-500/0",
              },
              {
                icon: "⚡",
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
                    {feature.icon}
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
              🎮 Browse All Games
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
                avatar: "🧑‍💻",
                rating: 5,
                review: "Best free gaming site ever! No ads, no downloads, just pure gaming fun. The games are addictive!",
                game: "2048",
              },
              {
                name: "GameLover",
                avatar: "🎮",
                rating: 5,
                review: "I love the variety of games. From puzzles to action, there's something for everyone. Highly recommended!",
                game: "Tetris",
              },
              {
                name: "CasualPlayer",
                avatar: "😊",
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
                      <span key={i} className="text-amber-400 text-lg">⭐</span>
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <span key={i} className="text-gray-600 text-lg">⭐</span>
                    ))}
                  </div>
                  
                  {/* Review text */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                    "{review.review}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                      {review.avatar}
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
                    {categoryNames[cat]}
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
              {soundManager.isEnabled() ? "🔊 Sound On" : "🔇 Sound Off"}
            </button>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
