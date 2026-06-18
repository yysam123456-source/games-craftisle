"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2, Maximize2, Minimize2, Volume2, VolumeX } from "lucide-react";
import type { Game } from "@/types/game";
import { sounds } from "@/lib/sound-effects";

interface GameIframeProps {
  game: Game;
  width?: string;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

export function GameIframe({ game, width = "100%", onFullscreenChange }: GameIframeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(600);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  
  // 音效
  const playGameStart = () => sounds.gameStart();
  const playButtonClick = () => sounds.buttonClick();

  // 动态计算iframe高度
  useEffect(() => {
    const calculateHeight = () => {
      if (window.innerWidth < 768) {
        // 移动端：85vh
        setIframeHeight(Math.floor(window.innerHeight * 0.85));
      } else {
        // 桌面端：calc(100vh - 250px)，最小600px
        setIframeHeight(Math.max(600, window.innerHeight - 250));
      }
    };
    
    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, []);

  // 监听 postMessage 调整高度
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "game-resize" && typeof event.data.height === "number") {
        const newHeight = Math.max(400, Math.min(event.data.height, window.innerHeight * 0.9));
        setIframeHeight(newHeight);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // 全屏功能
  const toggleFullscreen = useCallback(() => {
    playButtonClick();
    
    if (!document.fullscreenElement) {
      // 进入全屏
      if (containerRef.current) {
        containerRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
          onFullscreenChange?.(true);
          // 全屏时使用100vh
          setIframeHeight(window.innerHeight);
        }).catch(err => {
          console.error("全屏失败:", err);
        });
      }
    } else {
      // 退出全屏
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
        onFullscreenChange?.(false);
        // 恢复原有高度
        if (window.innerWidth < 768) {
          setIframeHeight(Math.floor(window.innerHeight * 0.85));
        } else {
          setIframeHeight(Math.max(600, window.innerHeight - 250));
        }
      }).catch(err => {
        console.error("退出全屏失败:", err);
      });
    }
  }, [playButtonClick, onFullscreenChange]);

  // 监听全屏变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      onFullscreenChange?.(isCurrentlyFullscreen);
      
      if (!isCurrentlyFullscreen) {
        // 恢复原有高度
        if (window.innerWidth < 768) {
          setIframeHeight(Math.floor(window.innerHeight * 0.85));
        } else {
          setIframeHeight(Math.max(600, window.innerHeight - 250));
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [onFullscreenChange]);

  // 自动隐藏loader
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        playGameStart();
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isLoading, playGameStart]);

  // 定期测量高度（fallback）
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
      if (h > 400) {
        setIframeHeight(Math.min(h + 20, window.innerHeight * 0.9));
      }
    } catch {
      // Cross-origin or not ready - ignore
    }
  }, []);

  useEffect(() => {
    const intervals = [500, 1500, 3000, 6000].map((delay) =>
      setTimeout(tryMeasureHeight, delay)
    );
    return () => intervals.forEach(clearTimeout);
  }, [tryMeasureHeight]);

  if (!game.sourceUrl) {
    return (
      <div className="rounded-2xl border bg-card/80 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-center h-[400px] bg-muted/50">
          <p className="text-muted-foreground">Game source URL not configured</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`rounded-2xl border bg-card/80 backdrop-blur-sm overflow-hidden relative ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : ''
      }`} 
      style={{ width }}
    >
      {/* 游戏控制栏 */}
      <div className="flex items-center justify-between px-4 py-2 bg-card/90 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            isLoading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
          }`} />
          <span className="text-sm font-medium">{game.title}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* 音效开关 */}
          <button
            onClick={() => {
              playButtonClick();
              setSoundEnabled(!soundEnabled);
            }}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title={soundEnabled ? "Disable sound" : "Enable sound"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
          
          {/* 全屏按钮 */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      
      {/* 游戏iframe */}
      <div
        className="relative transition-all duration-300 ease-in-out"
        style={{ height: `${iframeHeight}px` }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10 transition-opacity duration-500">
            <div className="text-center">
              <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-base text-muted-foreground font-medium">Loading {game.title}...</p>
              <div className="mt-4 w-48 h-1 bg-muted rounded-full overflow-hidden mx-auto">
                <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
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
            height: "100%",
            display: "block",
          }}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setTimeout(() => {
            setIsLoading(false);
            playGameStart();
          }, 500)}
          onError={() => {
            setIsLoading(false);
            setError("Game failed to load. Click Retry.");
          }}
          loading="lazy"
        />

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-20">
            <div className="text-center p-8">
              <p className="text-red-500 mb-6 text-lg font-semibold">{error}</p>
              <button
                onClick={() => {
                  playButtonClick();
                  setError(null);
                  setIsLoading(true);
                }}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 font-medium text-base transition-colors"
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
