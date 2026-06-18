"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import type { Game } from "@/types/game";

interface GameIframeProps {
  game: Game;
  width?: string;
}

export function GameIframe({ game, width = "100%" }: GameIframeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(550); // default
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Listen for postMessage from game to auto-resize
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "game-resize" && typeof event.data.height === "number") {
        // Clamp to reasonable bounds (min: 300px, max: 95vh)
        const newHeight = Math.max(300, Math.min(event.data.height, window.innerHeight * 0.95));
        setIframeHeight(newHeight);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Auto-hide loader after timeout as fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Fallback: try to measure iframe content height periodically
  const tryMeasureHeight = useCallback(() => {
    try {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentDocument || !iframe.contentWindow) return;

      const body = iframe.contentDocument.body;
      const html = iframe.contentDocument.documentElement;
      const h = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      if (h > 300) {
        setIframeHeight(Math.min(h + 20, window.innerHeight * 0.95));
      }
    } catch {
      // Cross-origin or not ready - ignore, postMessage will handle it
    }
  }, []);

  // Periodic measurement fallback for same-origin iframes
  useEffect(() => {
    const intervals = [500, 1500, 3000, 6000].map((delay) =>
      setTimeout(tryMeasureHeight, delay)
    );
    return () => intervals.forEach(clearTimeout);
  }, [tryMeasureHeight]);

  if (!game.sourceUrl) {
    return (
      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-center h-[400px] bg-muted/50">
          <p className="text-muted-foreground">Game source URL not configured</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden" style={{ width }}>
      <div
        className="relative transition-all duration-300 ease-in-out"
        style={{ height: `${iframeHeight}px` }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10 transition-opacity duration-500 rounded-t-lg">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Loading {game.title}...</p>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={game.sourceUrl}
          title={game.title}
          width="100%"
          style={{
            border: "none",
            width: "100%",
            height: `${iframeHeight}px`,
            display: "block",
          }}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setTimeout(() => setIsLoading(false), 200)}
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
                Retry Loading
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Height indicator (dev only - remove later) */}
      {/* <div className="text-xs text-muted-foreground/30 px-2 py-1 text-right">
        {iframeHeight}px
      </div> */}
    </div>
  );
}
