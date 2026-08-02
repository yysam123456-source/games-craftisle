"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Search, X, Gamepad2, Loader2 } from "lucide-react";
import { getAllGames } from "@/data/games";
import { GameCard } from "@/components/games/GameCard";

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isClient, setIsClient] = useState(false);

  const games = getAllGames().filter((g) => g.isActive);

  // Read initial query from the URL on the client (avoids useSearchParams Suspense requirement)
  useEffect(() => {
    setIsClient(true);
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") || "";
    if (q) setQuery(q);
  }, []);

  // Keep the URL in sync (?q=) for shareable / refreshable results
  useEffect(() => {
    if (!isClient) return;
    const trimmed = query.trim();
    const current = new URLSearchParams(window.location.search).get("q") || "";
    if (trimmed === current) return;
    const url = trimmed.length >= 1 ? `/search?q=${encodeURIComponent(trimmed)}` : "/search";
    router.replace(url, { scroll: false });
  }, [query, isClient, router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return games.filter((game) => {
      const titleMatch = game.title.toLowerCase().includes(q);
      const descMatch = game.description?.toLowerCase().includes(q) || false;
      const categoryMatch = game.category.toLowerCase().includes(q);
      const tagsMatch = game.tags?.some((tag) => tag.toLowerCase().includes(q)) || false;
      return titleMatch || descMatch || categoryMatch || tagsMatch;
    });
  }, [query, games]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-[300px] h-[300px] rounded-full bg-brand-cyan/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
            <span className="bg-gradient-to-r from-primary via-brand-cyan to-brand-pink bg-clip-text text-transparent">
              Search Games
            </span>
          </h1>

          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              placeholder="Type game name, category, or keyword..."
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-card/80 backdrop-blur-sm border border-white/[0.06] text-foreground placeholder:text-muted-foreground focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Search across {games.length} games by name, category, or tag.
          </p>
        </div>

        {/* Results */}
        {!isClient ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : query.trim().length < 2 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Start Searching</h2>
            <p className="text-muted-foreground">Type at least 2 characters to find games</p>
          </div>
        ) : results.length > 0 ? (
          <>
            <p className="text-center text-muted-foreground mb-8">
              {results.length} result{results.length === 1 ? "" : "s"} for{" "}
              <span className="text-foreground font-semibold">&ldquo;{query.trim()}&rdquo;</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((game, index) => (
                <motion.div
                  key={game.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <GameCard game={game} index={index} />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Gamepad2 className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No games found</h2>
            <p className="text-muted-foreground">Try different keywords or categories</p>
          </div>
        )}
      </div>
    </div>
  );
}
