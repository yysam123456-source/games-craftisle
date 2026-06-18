"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Gamepad2 } from "lucide-react";
import { getAllGames } from "@/data/games";
import type { Game } from "@/types/game";
import { cn } from "@/lib/utils";

interface GameSearchProps {
  onSelect?: (game: Game) => void;
  placeholder?: string;
  className?: string;
}

// 搜索建议组件
export function GameSearch({ onSelect, placeholder = "Search games...", className }: GameSearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const games = getAllGames().filter((g) => g.isActive);

  // 简单的搜索逻辑（避免 Fuse.js 的类型问题）
  const searchResults = useMemo(() => {
    if (!query || query.length < 2) return [];
    
    const normalizedQuery = query.toLowerCase();
    const results = games.filter((game) => {
      const titleMatch = game.title.toLowerCase().includes(normalizedQuery);
      const descMatch = game.description?.toLowerCase().includes(normalizedQuery) || false;
      const categoryMatch = game.category.toLowerCase().includes(normalizedQuery);
      const tagsMatch = game.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery)) || false;
      
      return titleMatch || descMatch || categoryMatch || tagsMatch;
    });
    
    return results.slice(0, 8);
  }, [query, games]);

  const handleSelect = useCallback(
    (game: Game) => {
      setQuery("");
      setIsFocused(false);
      
      // 如果没有提供 onSelect 回调，则自动导航到游戏页面
      if (onSelect) {
        onSelect(game);
      } else {
        window.location.href = `/play/${game.slug}`;
      }
    },
    [onSelect]
  );

  return (
    <div className={cn("relative", className)}>
      {/* 搜索输入框 */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-card/80 backdrop-blur-sm border border-white/[0.06] text-foreground placeholder:text-muted-foreground focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 搜索结果下拉 */}
      <AnimatePresence>
        {isFocused && (query.length >= 2 || searchResults.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-card/95 backdrop-blur-xl border border-white/[0.06] shadow-2xl z-50 overflow-hidden"
          >
            {searchResults.length > 0 ? (
              <div className="py-2 max-h-[400px] overflow-y-auto">
                {searchResults.map((game, index) => (
                  <motion.button
                    key={game.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleSelect(game)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-primary/10 transition-colors text-left"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {game.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {game.category} • {game.tags?.slice(0, 2).join(", ")}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : query.length >= 2 ? (
              <div className="py-8 text-center">
                <Gamepad2 className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No games found</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Try different keywords
                </p>
              </div>
            ) : (
              <div className="py-4">
                <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Quick Search
                </p>
                <div className="px-4 flex flex-wrap gap-2">
                  {["puzzle", "action", "strategy", "casual"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 搜索页面组件
export function SearchResults({ query }: { query: string }) {
  const games = getAllGames().filter((g) => g.isActive);
  
  const searchResults = useMemo(() => {
    if (!query) return games;
    
    const normalizedQuery = query.toLowerCase();
    return games.filter((game) => {
      const titleMatch = game.title.toLowerCase().includes(normalizedQuery);
      const descMatch = game.description?.toLowerCase().includes(normalizedQuery) || false;
      const categoryMatch = game.category.toLowerCase().includes(normalizedQuery);
      const tagsMatch = game.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery)) || false;
      
      return titleMatch || descMatch || categoryMatch || tagsMatch;
    });
  }, [query, games]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {searchResults.map((game, index) => (
        <motion.div
          key={game.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          {/* 这里应该复用 GameCard 组件，但为了避免循环依赖，我直接创建一个简单的卡片 */}
          <a
            href={`/play/${game.slug}`}
            className="block group"
          >
            <div className="rounded-2xl overflow-hidden bg-card/80 backdrop-blur-sm border border-white/[0.06] hover:border-primary/30 transition-all duration-500">
              <div className="aspect-video overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {game.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {game.category}
                </p>
              </div>
            </div>
          </a>
        </motion.div>
      ))}
    </div>
  );
}
