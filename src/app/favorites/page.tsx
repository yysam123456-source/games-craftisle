"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart, Trash2, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { games } from "@/data/games";
import type { Game } from "@/types/game";
import { sounds } from "@/lib/sound-effects";

export default function FavoritesPage() {
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const [isClient, setIsClient] = useState(false);

  // 从 localStorage 加载收藏列表
  useEffect(() => {
    setIsClient(true);
    try {
      const favorites = JSON.parse(localStorage.getItem("craftisle-favorites") || "[]");
      setFavoriteSlugs(favorites);
      
      // 查找收藏的游戏
      const favoriteGamesList = favorites
        .map((slug: string) => games.find((g: Game) => g.slug === slug))
        .filter((game: Game | undefined) => game !== undefined);
      
      setFavoriteGames(favoriteGamesList);
    } catch (error) {
      console.warn("Failed to load favorites:", error);
    }
  }, []);

  // 移除收藏
  const removeFavorite = (slug: string) => {
    try {
      const newFavorites = favoriteSlugs.filter((s) => s !== slug);
      localStorage.setItem("craftisle-favorites", JSON.stringify(newFavorites));
      setFavoriteSlugs(newFavorites);
      setFavoriteGames((prev) => prev.filter((g) => g.slug !== slug));
      sounds.buttonClick();
    } catch (error) {
      console.warn("Failed to remove favorite:", error);
    }
  };

  // 清空收藏
  const clearAllFavorites = () => {
    if (confirm("Are you sure you want to remove all favorites?")) {
      try {
        localStorage.setItem("craftisle-favorites", "[]");
        setFavoriteSlugs([]);
        setFavoriteGames([]);
        sounds.buttonClick();
      } catch (error) {
        console.warn("Failed to clear favorites:", error);
      }
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle meteor background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-400 fill-red-400" />
              <h1 className="text-4xl md:text-5xl font-extrabold">
                <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                  Favorite Games
                </span>
              </h1>
            </div>
            
            {favoriteGames.length > 0 && (
              <button
                onClick={clearAllFavorites}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all duration-300 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>
          <p className="text-muted-foreground text-lg">
            {favoriteGames.length === 0
              ? "You haven't added any games to favorites yet."
              : `You have ${favoriteGames.length} favorite game${favoriteGames.length === 1 ? "" : "s"}.`}
          </p>
        </motion.div>

        {/* Favorite Games Grid */}
        {favoriteGames.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-20"
          >
            <div className="mb-6">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground/30" />
            </div>
            <h2 className="text-2xl font-bold mb-4">No Favorites Yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Click the heart button on any game to add it to your favorites. Your favorite games will appear here for quick access.
            </p>
            <Link
              href="/#all-games"
              onClick={() => sounds.buttonClick()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              <Gamepad2 className="w-5 h-5" />
              Browse Games
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteGames.map((game, index) => (
              <motion.div
                key={game.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="group relative rounded-2xl overflow-hidden bg-card/60 backdrop-blur-sm border border-white/[0.04] hover:border-red-400/30 transition-all duration-500">
                  <Link href={`/play/${game.slug}`}>
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                        <span className="text-white font-bold text-lg">Play Now →</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-red-400 transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {game.description}
                      </p>
                    </div>
                  </Link>
                  
                  {/* Remove button */}
                  <button
                    onClick={() => removeFavorite(game.slug)}
                    className="absolute top-2 right-2 p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-red-500/80 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    title="Remove from favorites"
                  >
                    <Heart className="w-4 h-4 fill-red-400 text-red-400" />
                  </button>
                  
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-red-400/5 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
