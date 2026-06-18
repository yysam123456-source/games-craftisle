"use client";

import { GameIframe } from "@/components/games/GameIframe";
import { CharacterPop, AnimatedWordsAdvanced } from "@/components/animations/text-animate";
import { MeteorBackground } from "@/components/animations/meteor-background";
import { GlowButton, PulseButton } from "@/components/animations/shimmer-button";
import { MouseGlow } from "@/components/animations/mouse-follower";
import { motion, type Variants } from "motion/react";
import type { Game } from "@/types/game";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useEffect, useCallback } from "react";
import { Share2, Heart, Check } from "lucide-react";
import { sounds } from "@/lib/sound-effects";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] },
  },
};

interface GameDetailClientProps {
  game: Game;
  gameGuide: string;
  relatedGames: Game[];
  jsonLd: Record<string, unknown>;
}

export function GameDetailClient({
  game,
  gameGuide,
  relatedGames,
  jsonLd,
}: GameDetailClientProps) {
  // 收藏功能
  const [isFavorite, setIsFavorite] = useState(false);
  
  // 初始化收藏状态和记录最近游玩
  useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('craftisle-favorites') || '[]');
      setIsFavorite(favorites.includes(game.slug));
    } catch {
      // Ignore
    }
    
    // 记录最近游玩
    try {
      const recent = JSON.parse(localStorage.getItem('craftisle-recent') || '[]');
      const newRecent = [
        { slug: game.slug, title: game.title, thumbnail: game.thumbnail, playedAt: new Date().toISOString() },
        ...recent.filter((g: any) => g.slug !== game.slug)
      ].slice(0, 20); // 最多保留20个
      
      localStorage.setItem('craftisle-recent', JSON.stringify(newRecent));
    } catch (error) {
      console.warn('Failed to record recent play:', error);
    }
  }, [game.slug]);
  
  // 切换收藏状态
  const toggleFavorite = useCallback(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('craftisle-favorites') || '[]');
      const newFavorites = isFavorite
        ? favorites.filter((slug: string) => slug !== game.slug)
        : [...favorites, game.slug];
      
      localStorage.setItem('craftisle-favorites', JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
      sounds.buttonClick();
    } catch (error) {
      console.warn('Failed to toggle favorite:', error);
    }
  }, [isFavorite, game.slug]);
  
  // 分享功能
  const shareGame = useCallback(() => {
    const shareData = {
      title: game.title,
      text: game.description,
      url: `https://games.craftisle.com/play/${game.slug}`,
    };
    
    if (navigator.share) {
      navigator.share(shareData).catch(err => console.log('Share cancelled:', err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.url).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareData.url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link copied to clipboard!');
      });
    }
    sounds.buttonClick();
  }, [game]);
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle meteor background */}
      <MeteorBackground count={8} className="opacity-20" />

      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-sm text-muted-foreground"
        >
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <span className="mx-2">/</span>
          <a href={`#${game.category}`} className="hover:text-primary transition-colors">
            {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
          </a>
          <span className="mx-2">/</span>
          <span className="text-foreground">{game.title}</span>
        </motion.nav>

        {/* Game Title & Meta Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-primary via-brand-cyan to-brand-pink bg-clip-text text-transparent">
                <CharacterPop text={game.title} delay={0.2} />
              </span>
            </h1>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                {game.category}
              </span>
              {game.featured && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  ⭐ Featured
                </span>
              )}
            </div>
            
            {/* 收藏和分享按钮 */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={toggleFavorite}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  isFavorite
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-white/[0.05] text-muted-foreground hover:bg-white/[0.08] border border-white/[0.04]'
                }`}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-400' : ''}`} />
              </button>
              <button
                onClick={shareGame}
                className="p-2.5 rounded-xl bg-white/[0.05] text-muted-foreground hover:bg-white/[0.08] border border-white/[0.04] transition-all duration-300"
                title="Share this game"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">⭐</span>
              <span><strong className="text-foreground">{game.rating}</strong> / 5.0</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎮</span>
              <span>{game.playCount.toLocaleString()} plays</span>
            </div>
            {game.difficulty && (
              <div className="flex items-center gap-2">
                <span>📊</span>
                <span>Difficulty: {game.difficulty}</span>
              </div>
            )}
            {game.estimatedTime && (
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>{game.estimatedTime}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-3xl"
        >
          {game.description}
        </motion.p>

        {/* Game Iframe - 沉浸式体验 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-12"
        >
          <GameIframe game={game} />
        </motion.div>

        {/* Game Guide Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content: Instructions & Long Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* How to Play */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-2xl p-6 md:p-8 bg-card/60 backdrop-blur-sm border border-white/[0.04] overflow-hidden"
            >
              {/* Glow decoration */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px]" />
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 relative z-10">
                <span>📖</span> How to Play
              </h2>
              <div className="prose prose-sm max-w-none prose-invert">
                <p className="text-lg leading-relaxed text-muted-foreground">{game.instructions}</p>
              </div>
            </motion.section>

            {/* Detailed Game Guide (Markdown) */}
            {gameGuide && (
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative rounded-2xl p-6 md:p-8 bg-card/60 backdrop-blur-sm border border-white/[0.04] overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-cyan/5 rounded-full blur-[80px]" />
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10">
                  <span>📚</span> Complete Game Guide
                </h2>
                <div className="prose prose-sm max-w-none prose-invert prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-p:leading-relaxed prose-a:text-primary prose-strong:font-semibold prose-ul:list-disc prose-ol:list-decimal">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {gameGuide}
                  </ReactMarkdown>
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar: Controls & Info */}
          <div className="space-y-6">
            {/* Controls */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-2xl p-6 bg-card/60 backdrop-blur-sm border border-white/[0.04] overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-[50px]" />
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
                <span>🎮</span> Controls
              </h3>
              <div className="space-y-4">
                {game.controls.keyboard && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-2xl">⌨️</span>
                    <div>
                      <div className="font-medium text-sm">Keyboard</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {Array.isArray(game.controls.keyboard)
                          ? game.controls.keyboard.join(", ")
                          : "Supported"}
                      </div>
                    </div>
                  </div>
                )}
                {game.controls.mouse && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-2xl">🖱️</span>
                    <div>
                      <div className="font-medium text-sm">Mouse</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Supported</div>
                    </div>
                  </div>
                )}
                {game.controls.touch && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-2xl">📱</span>
                    <div>
                      <div className="font-medium text-sm">Touch</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Mobile friendly</div>
                    </div>
                  </div>
                )}
                {game.controls.gamepad && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-2xl">🎮</span>
                    <div>
                      <div className="font-medium text-sm">Gamepad</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Controller supported</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>

            {/* Tags */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-2xl p-6 bg-card/60 backdrop-blur-sm border border-white/[0.04]"
            >
              <h3 className="text-xl font-bold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-sm font-medium bg-primary/5 text-primary/70 border border-primary/10 hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Share */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-2xl p-6 bg-card/60 backdrop-blur-sm border border-white/[0.04]"
            >
              <h3 className="text-xl font-bold mb-4">Share This Game</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={shareGame}
                  className="flex-1 min-w-[120px] py-2.5 rounded-xl text-sm font-medium bg-white/[0.05] text-muted-foreground hover:bg-white/[0.08] hover:text-foreground transition text-center border border-white/[0.04] flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${game.title} - free online!`)}&url=${encodeURIComponent(`https://games.craftisle.com/play/${game.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] py-2.5 rounded-xl text-sm font-medium bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition text-center border border-[#1DA1F2]/20 flex items-center justify-center gap-2"
                  onClick={() => sounds.buttonClick()}
                >
                  🐦 Twitter
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://games.craftisle.com/play/${game.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] py-2.5 rounded-xl text-sm font-medium bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition text-center border border-[#1877F2]/20 flex items-center justify-center gap-2"
                  onClick={() => sounds.buttonClick()}
                >
                  📘 Facebook
                </a>
                <a
                  href={`https://www.reddit.com/submit?url=${encodeURIComponent(`https://games.craftisle.com/play/${game.slug}`)}&title=${encodeURIComponent(game.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] py-2.5 rounded-xl text-sm font-medium bg-[#FF4500]/10 text-[#FF4500] hover:bg-[#FF4500]/20 transition text-center border border-[#FF4500]/20 flex items-center justify-center gap-2"
                  onClick={() => sounds.buttonClick()}
                >
                  🤖 Reddit
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Check out ${game.title} - Free online game! https://games.craftisle.com/play/${game.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] py-2.5 rounded-xl text-sm font-medium bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition text-center border border-[#25D366]/20 flex items-center justify-center gap-2"
                  onClick={() => sounds.buttonClick()}
                >
                  💬 WhatsApp
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(`https://games.craftisle.com/play/${game.slug}`)}&text=${encodeURIComponent(game.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] py-2.5 rounded-xl text-sm font-medium bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc]/20 transition text-center border border-[#0088cc]/20 flex items-center justify-center gap-2"
                  onClick={() => sounds.buttonClick()}
                >
                  ✈️ Telegram
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://games.craftisle.com/play/${game.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] py-2.5 rounded-xl text-sm font-medium bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition text-center border border-[#0A66C2]/20 flex items-center justify-center gap-2"
                  onClick={() => sounds.buttonClick()}
                >
                  💼 LinkedIn
                </a>
              </div>
            </motion.section>
          </div>
        </div>

        {/* Related Games */}
        {relatedGames.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2">
              <span>🎮</span> Related Games
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedGames.map((relatedGame: Game, i: number) => (
                <motion.div
                  key={relatedGame.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a
                    href={`/play/${relatedGame.slug}`}
                    className="group block relative rounded-2xl overflow-hidden bg-card/60 backdrop-blur-sm border border-white/[0.04] hover:border-primary/30 transition-all duration-500"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={relatedGame.thumbnail}
                        alt={relatedGame.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                        <span className="text-white font-bold text-lg">Play Now →</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                        {relatedGame.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedGame.description}
                      </p>
                    </div>
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/5 to-transparent" />
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Comments Placeholder */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-8 bg-card/60 backdrop-blur-sm border border-white/[0.04] text-center"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[100px]" />
          </div>
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2 relative z-10">
            <span>💬</span> Comments
          </h2>
          <div className="relative z-10">
            <p className="text-muted-foreground mb-2">Comments coming soon!</p>
            <p className="text-sm text-muted-foreground">Sign in to leave a comment and rate this game.</p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
