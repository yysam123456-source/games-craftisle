"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2, Maximize2, Minimize2, Volume2, VolumeX, ChevronDown, ChevronUp, X } from "lucide-react";
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [controlsHovered, setControlsHovered] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // 音效
  const playGameStart = () => sounds.gameStart();
  const playButtonClick = () => sounds.buttonClick();

  // 自动隐藏控制栏（全屏模式下）
  const resetControlsTimer = useCallback(() => {
    if (!isFullscreen) return;
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isFullscreen && !controlsHovered) {
        setShowControls(false);
      }
    }, 3000);
  }, [isFullscreen, controlsHovered]);

  // 全屏功能
  const toggleFullscreen = useCallback(() => {
    playButtonClick();

    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
          onFullscreenChange?.(true);
        }).catch(err => {
          console.error("全屏失败:", err);
        });
      }
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
        onFullscreenChange?.(false);
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
      if (isCurrentlyFullscreen) {
        resetControlsTimer();
      } else {
        setShowControls(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [onFullscreenChange, resetControlsTimer]);

  // 双击全屏
  const handleDoubleClick = useCallback(() => {
    if (!isFullscreen) {
      toggleFullscreen();
    }
  }, [isFullscreen, toggleFullscreen]);

  // 键盘快捷键：F = 全屏切换，ESC 由浏览器处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // F 键切换全屏
      if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // 检查焦点是否在输入框中
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
          return;
        }
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleFullscreen]);

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

  if (!game.sourceUrl) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-muted/30 rounded-xl">
        <p className="text-muted-foreground">Game source URL not configured</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative group/game ${isFullscreen ? 'fixed inset-0 z-[9999] bg-black' : ''}`}
      style={{ width: isFullscreen ? '100vw' : width }}
      onMouseMove={resetControlsTimer}
    >
      {/* 游戏iframe容器 - 无边框无padding，纯净体验 */}
      <div 
        className={`relative bg-black ${isFullscreen ? 'h-screen' : 'aspect-[4/3] md:aspect-video'}`}
        onDoubleClick={handleDoubleClick}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-20 transition-opacity duration-500">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-lg text-white/80 font-medium">Loading {game.title}...</p>
              <div className="mt-4 w-56 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto">
                <div className="h-full bg-gradient-to-r from-primary to-brand-cyan rounded-full animate-pulse" style={{ width: '65%' }} />
              </div>
            </div>
          </div>
        )}

        {/* Iframe - 占满整个容器 */}
        <iframe
          ref={iframeRef}
          src={game.sourceUrl}
          title={game.title}
          width="100%"
          height="100%"
          style={{
            border: "none",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
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
        />

        {/* Error Overlay */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/95 z-20">
            <div className="text-center p-8">
              <p className="text-red-400 mb-6 text-lg font-semibold">{error}</p>
              <button
                onClick={() => {
                  playButtonClick();
                  setError(null);
                  setIsLoading(true);
                }}
                className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 font-medium text-base transition-all hover:scale-105"
              >
                Retry Loading
              </button>
            </div>
          </div>
        )}

        {/* 悬浮控制栏 - 底部半透明 */}
        <div 
          className={`absolute bottom-0 left-0 right-0 z-30 transition-all duration-300 ease-out ${
            showControls || !isFullscreen || controlsHovered
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
          onMouseEnter={() => setControlsHovered(true)}
          onMouseLeave={() => setControlsHovered(false)}
        >
          {/* 渐变遮罩背景 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="relative flex items-center justify-between px-4 py-3 md:py-3">
            {/* 左侧：游戏名称 */}
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                isLoading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
              }`} />
              <span className="text-sm font-medium text-white/90 truncate max-w-[200px] md:max-w-none">
                {game.title}
              </span>
            </div>
            
            {/* 右侧：操作按钮 */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* 音效开关 */}
              <button
                onClick={() => {
                  playButtonClick();
                  setSoundEnabled(!soundEnabled);
                }}
                className="p-2 rounded-lg hover:bg-white/20 transition-all duration-200 text-white/70 hover:text-white"
                title={soundEnabled ? "Mute" : "Unmute"}
              >
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </button>
              
              {/* 全屏按钮 */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg hover:bg-white/20 transition-all duration-200 text-white/70 hover:text-white"
                title={isFullscreen ? "Exit fullscreen (ESC)" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5" />
                ) : (
                  <Maximize2 className="w-5 h-5" />
                )}
              </button>
              
              {/* ESC提示（仅全屏模式显示） */}
              {isFullscreen && (
                <span className="hidden md:inline text-xs text-white/50 ml-2">Press ESC to exit</span>
              )}
            </div>
          </div>
        </div>

        {/* 全屏模式下的关闭提示 */}
        {isFullscreen && (
          <button
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              }
            }}
            className="absolute top-4 right-4 z-30 p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white/70 hover:text-white opacity-0 group-hover/game:opacity-100 transition-all duration-200"
            title="Exit fullscreen"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 非全屏模式：底部提示条 */}
      {!isFullscreen && (
        <div className="mt-3 flex items-center justify-between px-1 text-xs text-muted-foreground/60">
          <span>Click fullscreen button or double-click game for immersive mode</span>
          <span className="opacity-60">Press F for fullscreen</span>
        </div>
      )}
    </div>
  );
}
