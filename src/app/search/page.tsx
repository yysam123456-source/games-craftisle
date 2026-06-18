import { Metadata } from "next";
import { GameSearch, SearchResults } from "@/components/games/GameSearch";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";

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
            <SearchResults query={query} />
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
