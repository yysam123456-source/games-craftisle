import { Metadata } from "next";
import { GameSearch, SearchResults } from "@/components/games/GameSearch";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  const query = searchParams.q || "";
  return {
    title: query
      ? `Search: ${query} - Craftisle Games`
      : "Search Games - Craftisle Games",
    description: `Search free online HTML5 games. Find puzzle, action, strategy and more games.`,
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-[300px] h-[300px] rounded-full bg-brand-cyan/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Search header */}
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
            <span className="bg-gradient-to-r from-primary via-brand-cyan to-brand-pink bg-clip-text text-transparent">
              Search Games
            </span>
          </h1>
          
          {/* Search component */}
          <GameSearch
            placeholder="Type game name, category, or keyword..."
            className="max-w-2xl mx-auto"
          />
        </div>

        {/* Search results */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          }
        >
          {query ? (
            <SearchResultsContent query={query} />
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Start Searching</h2>
              <p className="text-muted-foreground">
                Type at least 2 characters to search for games
              </p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}

// 搜索结果内容组件（客户端）
function SearchResultsContent({ query }: { query: string }) {
  const games = require("@/data/games").getAllGames().filter((g: any) => g.isActive);
  
  const Fuse = require("fuse.js");
  const fuse = new Fuse(games, {
    keys: [
      { name: "title", weight: 0.4 },
      { name: "description", weight: 0.3 },
      { name: "category", weight: 0.2 },
      { name: "tags", weight: 0.1 },
    ],
    threshold: 0.4,
    includeMatches: true,
  });

  const results = query ? fuse.search(query) : [];
  const searchResults = results.map((result: any) => result.item);

  if (results.length === 0 && query) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/20 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">No games found</h2>
        <p className="text-muted-foreground">
          Try different keywords or browse all games
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6">
        Found {searchResults.length} game{searchResults.length !== 1 ? "s" : ""} for "{query}"
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {searchResults.map((game: any, index: number) => (
          <div
            key={game.slug}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
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
          </div>
        ))}
      </div>
    </div>
  );
}
