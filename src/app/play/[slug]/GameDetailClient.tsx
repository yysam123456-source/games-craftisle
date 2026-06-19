"use client";

import { GameIframe } from "@/components/games/GameIframe";
import { motion, AnimatePresence } from "motion/react";
import type { Game } from "@/types/game";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useEffect, useCallback } from "react";
import { Share2, Heart, ChevronDown, ChevronUp, Info } from "lucide-react";
import { sounds } from "@/lib/sound-effects";

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
  const [isFavorite, setIsFavorite] = useState(false);
  const [infoExpanded, setInfoExpanded] = useState(false);
  
  // 收藏功能
  useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('craftisle-favorites') || '[]');
      setIsFavorite(favorites.includes(game.slug));
    } catch { /* ignore */ }
    
    // 记录最近游玩
    try {
      const recent = JSON.parse(localStorage.getItem('craftisle-recent') || '[]');
      const newRecent = [
        { slug: game.slug, title: game.title, thumbnail: game.thumbnail, playedAt: new Date().toISOString() },
        ...recent.filter((g: any) => g.slug !== game.slug)
      ].slice(0, 20);
      localStorage.setItem('craftisle-recent', JSON.stringify(newRecent));
    } catch { /* ignore */ }
  }, [game.slug]);

  const toggleFavorite = useCallback(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('craftisle-favorites') || '[]');
      const newFavorites = isFavorite
        ? favorites.filter((slug: string) => slug !== game.slug)
        : [...favorites, game.slug];
      localStorage.setItem('craftisle-favorites', JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
      sounds.buttonClick();
    } catch { /* ignore */ }
  }, [isFavorite, game.slug]);

  const shareGame = useCallback(() => {
    const shareData = { title: game.title, text: game.description, url: `https://games.craftisle.com/play/${game.slug}` };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareData.url).then(() => {
        alert('Link copied!');
      }).catch(() => {});
    }
    sounds.buttonClick();
  }, [game]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO: 全屏游戏区域 ===== */}
      <div className="relative w-full">
        <GameIframe game={game} />
        
        {/* 紧贴游戏上方的信息条 - 半透明浮动 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 mx-3 md:mx-6 -mt-6"
        >
          {/* 游戏标题卡片 */}
          <div className="bg-card/90 backdrop-blur-xl rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/40 overflow-hidden">
            {/* 主信息行 */}
            <div className="px-5 py-4 flex flex-wrap items-center gap-3">
              {/* 左：标题 */}
              <h1 className="text-xl md:text-2xl font-extrabold flex items-center gap-3 min-w-0 flex-1">
                <span className="bg-gradient-to-r from-primary via-brand-cyan to-brand-pink bg-clip-text text-transparent truncate">
                  {game.title}
                </span>
              </h1>

              {/* 标签组 */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {game.category}
                </span>
                {game.featured && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    ⭐ Featured
                  </span>
                )}
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={toggleFavorite}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    isFavorite
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-white/[0.05] text-muted-foreground hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                  title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-400' : ''}`} />
                </button>
                <button
                  onClick={shareGame}
                  className="p-2 rounded-xl bg-white/[0.05] text-muted-foreground hover:bg-white/[0.08] border border-white/[0.06] transition-all duration-300"
                  title="Share this game"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                
                {/* 展开/收起详情 */}
                <button
                  onClick={() => { setInfoExpanded(!infoExpanded); sounds.buttonClick(); }}
                  className="p-2 rounded-xl bg-white/[0.05] text-muted-foreground hover:bg-white/[0.08] border border-white/[0.06] transition-all duration-300 flex items-center gap-1.5"
                  title={infoExpanded ? "Hide details" : "Show details"}
                >
                  <Info className="w-4 h-4" />
                  {infoExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* 可折叠的详细信息区 */}
            <AnimatePresence mode="wait">
              {infoExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-2 border-t border-white/[0.06] space-y-4">
                    {/* Meta 信息 */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      <span>⭐ <strong className="text-foreground">{game.rating}</strong>/5.0</span>
                      <span>🎮 {game.playCount.toLocaleString()} plays</span>
                      {game.difficulty && <span>📊 {game.difficulty}</span>}
                      {game.estimatedTime && <span>⏱️ {game.estimatedTime}</span>}
                    </div>
                    
                    {/* 描述 */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {game.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {game.tags.map((tag: string) => (
                        <span key={tag} className="px-2.5 py-0.5 text-xs rounded-md bg-primary/5 text-primary/70 border border-primary/10 font-medium hover:bg-primary/10 cursor-default transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* ===== 下方内容区域 ===== */}
      <div className="container mx-auto px-4 max-w-7xl mt-8">

        {/* Game Guide & Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* How to Play */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl p-6 md:p-8 bg-card/60 backdrop-blur-sm border border-white/[0.04] overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px]" />
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
                📖 How to Play
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">{game.instructions}</p>
            </motion.section>

            {/* Detailed Guide */}
            {gameGuide && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative rounded-2xl p-6 md:p-8 bg-card/60 backdrop-blur-sm border border-white/[0.04] overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-cyan/5 rounded-full blur-[80px]" />
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                  📚 Complete Game Guide
                </h2>
                <div className="prose prose-sm max-w-none prose-invert prose-headings:font-bold prose-h2:text-lg prose-p:leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{gameGuide}</ReactMarkdown>
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Controls */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl p-6 bg-card/60 backdrop-blur-sm border border-white/[0.04] overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-[50px]" />
              <h3 className="text-lg font-bold mb-4">🎮 Controls</h3>
              <div className="space-y-3">
                {game.controls.keyboard && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-xl">⌨️</span>
                    <div>
                      <div className="text-sm font-medium">Keyboard</div>
                      <div className="text-xs text-muted-foreground">
                        {Array.isArray(game.controls.keyboard) ? game.controls.keyboard.join(", ") : "Supported"}
                      </div>
                    </div>
                  </div>
                )}
                {game.controls.mouse && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-xl">🖱️</span><div><div className="text-sm font-medium">Mouse</div><div className="text-xs text-muted-foreground">Supported</div></div>
                  </div>
                )}
                {game.controls.touch && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-xl">📱</span><div><div className="text-sm font-medium">Touch</div><div className="text-xs text-muted-foreground">Mobile friendly</div></div>
                  </div>
                )}
                {game.controls.gamepad && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-xl">🎮</span><div><div className="text-sm font-medium">Gamepad</div><div className="text-xs text-muted-foreground">Controller supported</div></div>
                  </div>
                )}
              </div>
            </motion.section>

            {/* Share */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl p-6 bg-card/60 backdrop-blur-sm border border-white/[0.04]"
            >
              <h3 className="text-lg font-bold mb-4">Share This Game</h3>
              <div className="flex flex-wrap gap-2">
                <button onClick={shareGame} className="flex-1 min-w-[80px] py-2 rounded-xl text-xs font-medium bg-white/[0.05] text-muted-foreground hover:bg-white/[0.08] border border-white/[0.04] flex items-center justify-center gap-1.5"><Share2 className="w-3.5 h-3.5" /> Share</button>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${game.title}!`)}&url=${encodeURIComponent(`https://games.craftisle.com/play/${game.slug}`)}`} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[80px] py-2 rounded-xl text-xs font-medium bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/20 text-center" onClick={() => sounds.buttonClick()}>🐦 Twitter</a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://games.craftisle.com/play/${game.slug}`)}`} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[80px] py-2 rounded-xl text-xs font-medium bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 border border-[#1877F2]/20 text-center" onClick={() => sounds.buttonClick()}>📘 Facebook</a>
                <a href={`https://wa.me/?text=${encodeURIComponent(`${game.title} - Free online!`)} ${encodeURIComponent(`https://games.craftisle.com/play/${game.slug}`)}`} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[80px] py-2 rounded-xl text-xs font-medium bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/20 text-center" onClick={() => sounds.buttonClick()}>💬 WhatsApp</a>
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
            <h2 className="text-2xl font-bold mb-6">🎮 Related Games</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {relatedGames.map((rg: Game, i: number) => (
                <motion.a
                  key={rg.id}
                  href={`/play/${rg.slug}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group block rounded-xl overflow-hidden bg-card/60 backdrop-blur-sm border border-white/[0.04] hover:border-primary/30 transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img src={rg.thumbnail} alt={rg.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-xs font-semibold">Play →</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{rg.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{rg.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.section>
        )}

        {/* Comments Placeholder */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-8 bg-card/60 backdrop-blur-sm border border-white/[0.04] text-center mb-8"
        >
          <h2 className="text-xl font-bold mb-3">💬 Comments</h2>
          <p className="text-muted-foreground text-sm">Coming soon! Sign in to leave a comment.</p>
        </motion.section>
      </div>
    </div>
  );
}
