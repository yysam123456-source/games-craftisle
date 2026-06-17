"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import type { Game } from "@/types/game";

interface GameIframeProps {
  game: Game;
  width?: string;
  height?: string;
}

export function GameIframe({
  game,
  width = "100%",
  height = "85vh"
}: GameIframeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auto-hide loader after 3 seconds as fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!game.sourceUrl) {
    return (
      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-center h-[600px] bg-muted/50">
          <p className="text-muted-foreground">Game source URL not configured</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="relative" style={{ minHeight: "700px" }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10 transition-opacity duration-500 rounded-t-lg">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Loading {game.title}...</p>
            </div>
          </div>
        )}
        
        <iframe
          src={game.sourceUrl}
          title={game.title}
          width={width}
          height={height}
          style={{ 
            border: "none",
            width: "100%",
            minHeight: "700px",
          }}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => {
            setTimeout(() => setIsLoading(false), 200);
          }}
          onError={() => {
            setIsLoading(false);
            setError("Game failed to load. Click Retry.");
          }}
          loading="lazy"
        />
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-20 rounded-lg">
            <div className="text-center p-6">
              <p className="text-red-500 mb-4 text-lg font-semibold">{error}</p>
              <button 
                onClick={() => {
                  setError(null);
                  setIsLoading(true);
                }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium text-base"
              >
                🔄 Retry Loading
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
