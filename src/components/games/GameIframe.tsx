"use client";

import { useState } from "react";
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
  height = "600px" 
}: GameIframeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!game.sourceUrl) {
    return (
      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="flex items-center justify-center h-[600px] bg-muted/50">
          <p className="text-muted-foreground">游戏源URL未配置</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="relative" style={{ height }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">加载游戏中...</p>
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
            display: isLoading ? "none" : "block",
            width: "100%",
          }}
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError("游戏加载失败，请刷新页面重试");
          }}
          loading="lazy"
        />
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="text-center">
              <p className="text-red-500 mb-2">{error}</p>
              <button 
                onClick={() => {
                  setError(null);
                  setIsLoading(true);
                  const iframe = document.querySelector(`iframe[title="${game.title}"]`) as HTMLIFrameElement;
                  if (iframe) {
                    iframe.src = iframe.src;
                  }
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                重试
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
