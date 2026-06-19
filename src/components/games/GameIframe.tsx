"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2, Maximize2, Minimize2, Volume2, VolumeX, X } from "lucide-react";
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

  const playGameStart = () => sounds.gameStart();
  const playButtonClick = () => sounds.buttonClick();

  // 自动隐藏控制栏
  const resetControlsTimer = useCallback(() => {
    if (!isFullscreen) return;
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isFullscreen && !controlsHovered) setShowControls(false);
    }, 3000);
  }, [isFullscreen, controlsHovered]);

  // 全屏功能
  const toggleFullscreen = useCallback(() => {
    playButtonClick();
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => {
        setIsFullscreen(true);
        onFullscreenChange?.(true);
      }).catch(console.error);
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
        onFullscreenChange?.(false);
      }).catch(console.error);
    }
  }, [playButtonClick, onFullscreenChange]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fs = !!document.fullscreenElement;
      setIsFullscreen(fs);
      onFullscreenChange?.(fs);
      if (fs) resetControlsTimer(); else setShowControls(true);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [onFullscreenChange, resetControlsTimer]);

  const handleDoubleClick = useCallback(() => {
    if (!isFullscreen) toggleFullscreen();
  }, [isFullscreen, toggleFullscreen]);

  // F键全屏
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const t = e.target as HTMLElement;
        if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return;
        e.preventDefault();
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleFullscreen]);

  // 超时自动隐藏loader
  useEffect(() => {
    const timer = setTimeout(() => { if (isLoading) { setIsLoading(false); playGameStart(); } }, 4000);
    return () => clearTimeout(timer);
  }, [isLoading, playGameStart]);

  if (!game.sourceUrl) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-muted/30 rounded-xl">
        <p className="text-muted-foreground">Game source URL not configured</p>
      </div>
    );
  }

  // 根据游戏类型选择背景样式
  const getBackgroundStyle = (): React.CSSProperties & { backgroundImage?: string; backgroundSize?: string; backgroundPosition?: string } => {
    if (game.backgroundImage) {
      return {
        backgroundImage: `url(${game.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    
    // 默认根据分类生成CSS图案背景
    const patterns: Record<string, string> = {
      puzzle: `radial-gradient(circle at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 50%), 
               radial-gradient(circle at 80% 50%, rgba(236,72,153,0.06) 0%, transparent 50%)`,
      action: `radial-gradient(circle at 30% 20%, rgba(239,68,68,0.1) 0%, transparent 40%),
               radial-gradient(circle at 70% 80%, rgba(59,130,246,0.08) 0%, transparent 40%)`,
      arcade: `radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.12) 0%, transparent 60%)`,
      strategy: `linear-gradient(135deg, rgba(34,197,94,0.05) 0%, rgba(59,130,246,0.05) 100%)`,
      casual: `radial-gradient(circle at 80% 20%, rgba(251,191,36,0.08) 0%, transparent 40%)`,
      building: `conic-gradient(from 45deg at 10% 90%, rgba(99,102,241,0.05) 0%, transparent 50%)`,
    };
    
    return { backgroundImage: patterns[game.category] || patterns.arcade };
  };

  const bgStyle = getBackgroundStyle();

  return (
    <div 
      ref={containerRef}
      className={`relative group/game ${isFullscreen ? 'fixed inset-0 z-[9999]' : ''}`}
      style={{ width: isFullscreen ? '100vw' : width }}
      onMouseMove={resetControlsTimer}
    >
      {/* ===== 游戏主容器：带装饰背景的全屏区域 ===== */}
      <div
        className={`relative overflow-hidden ${isFullscreen ? 'h-screen' : 'aspect-video'}`}
        style={{
          ...bgStyle,
          backgroundColor: '#000',
          backgroundRepeat: 'no-repeat',
        }}
        onDoubleClick={handleDoubleClick}
      >
        {/* 装饰性边框光晕 - 模拟截图3的效果 */}
        {!isFullscreen && (
          <>
            {/* 四角装饰 */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-xl pointer-events-none z-10" />
            <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary/20 rounded-tr-xl pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/20 rounded-bl-xl pointer-events-none z-10" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-xl pointer-events-none z-10" />
            
            {/* 微妙的内发光边缘 */}
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/[0.04] pointer-events-none z-10" />
          </>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/92 z-20 backdrop-blur-sm transition-opacity duration-500">
            <div className="text-center">
              {/* 游戏图标动画 */}
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary to-brand-pink p-[2px] animate-pulse">
                <div className="w-full h-full rounded-2xl bg-black/90 flex items-center justify-center text-3xl">
                  🎮
                </div>
              </div>
              <p className="text-white font-semibold text-lg mb-3">Loading {game.title}...</p>
              <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto">
                <div className="h-full bg-gradient-to-r from-primary via-brand-cyan to-brand-pink rounded-full animate-loading-bar" style={{ width: '65%' }} />
              </div>
              <p className="text-xs text-white/40 mt-3">Double-click for fullscreen mode</p>
            </div>
          </div>
        )}

        {/* Iframe - 占满整个容器，无间隙无白边 */}
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
            zIndex: 1,
          }}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setTimeout(() => { setIsLoading(false); playGameStart(); }, 500)}
          onError={() => { setIsLoading(false); setError("Failed to load. Click Retry."); }}
        />

        {/* Error Overlay */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/95 z-20">
            <div className="text-center p-8">
              <p className="text-red-400 mb-6 text-lg font-semibold">{error}</p>
              <button
                onClick={() => { playButtonClick(); setError(null); setIsLoading(true); }}
                className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 font-medium transition-all hover:scale-105"
              >Retry Loading</button>
            </div>
          </div>
        )}

        {/* ===== 底部控制栏 ===== */}
        <div 
          className={`absolute bottom-0 left-0 right-0 z-30 transition-all duration-300 ease-out ${
            showControls || !isFullscreen || controlsHovered
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
          onMouseEnter={() => setControlsHovered(true)}
          onMouseLeave={() => setControlsHovered(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          <div className="relative flex items-center justify-between px-4 py-3 md:py-3">
            {/* 左侧状态 */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isLoading ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'}`} />
              <span className="text-sm font-medium text-white/90 truncate max-w-[180px] md:max-w-[300px]">{game.title}</span>
            </div>
            
            {/* 右侧操作按钮 */}
            <div className="flex items-center gap-1 md:gap-1.5">
              <button onClick={() => { playButtonClick(); setSoundEnabled(!soundEnabled); }} className="p-2 rounded-lg hover:bg-white/15 transition-all duration-200 text-white/60 hover:text-white" title={soundEnabled ? "Mute" : "Unmute"}>
                {soundEnabled ? <Volume2 className="w-[18px] h-[18px]" /> : <VolumeX className="w-[18px] h-[18px]" />}
              </button>
              
              <button onClick={toggleFullscreen} className="p-2 rounded-lg hover:bg-white/15 transition-all duration-200 text-white/60 hover:text-white" title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
                {isFullscreen ? <Minimize2 className="w-[18px] h-[18px]" /> : <Maximize2 className="w-[18px] h-[18px]" />}
              </button>
              
              {isFullscreen && (
                <span className="hidden sm:inline text-[11px] text-white/40 ml-1">ESC to exit</span>
              )}
            </div>
          </div>
        </div>

        {/* 全屏关闭按钮 */}
        {isFullscreen && (
          <button
            onClick={() => document.fullscreenElement && document.exitFullscreen()}
            className="absolute top-4 right-4 z-30 p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white/60 hover:text-white opacity-0 group-hover/game:opacity-100 focus:opacity-100 transition-all duration-200 backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 非全屏提示条 */}
      {!isFullscreen && (
        <div className="mt-2.5 flex items-center justify-between px-1 text-[11px] text-muted-foreground/50">
          <span>🖱️ Double-click or press F for immersive fullscreen</span>
          <span>⌨️ F = Fullscreen</span>
        </div>
      )}
    </div>
  );
}
