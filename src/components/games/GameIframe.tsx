"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Maximize2, Minimize2, Volume2, VolumeX, X, Play, Settings, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import type { Game } from "@/types/game";
import { sounds } from "@/lib/sound-effects";

interface GameIframeProps {
  game: Game;
  width?: string;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

type DifficultyLevel = 'easy' | 'medium' | 'hard';
type GamePhase = 'start' | 'loading' | 'playing';

const DIFFICULTY_OPTIONS = [
  { value: 'easy' as const, label: 'Easy', desc: 'Relaxed pace', color: 'from-emerald-500 to-green-400' },
  { value: 'medium' as const, label: 'Medium', desc: 'Balanced', color: 'from-blue-500 to-cyan-400' },
  { value: 'hard' as const, label: 'Hard', desc: 'Maximum difficulty', color: 'from-red-500 to-orange-400' },
];

export function GameIframe({ game, width = "100%", onFullscreenChange }: GameIframeProps) {
  const [phase, setPhase] = useState<GamePhase>('start');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [controlsHovered, setControlsHovered] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('easy');
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleStartGame = useCallback(() => {
    sounds.gameStart();
    setPhase('loading');
    setIsLoading(true);
    const sep = game.sourceUrl!.includes('?') ? '&' : '?';
    setIframeSrc(game.sourceUrl! + sep + 'difficulty=' + selectedDifficulty);
  }, [game.sourceUrl, selectedDifficulty]);

  const handleRestart = useCallback(() => {
    sounds.buttonClick();
    setPhase('start');
    setIsLoading(false);
    setError(null);
    setIframeSrc(null);
  }, []);

  const resetControlsTimer = useCallback(() => {
    if (!isFullscreen) return;
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => {
      if (isFullscreen && !controlsHovered) setShowControls(false);
    }, 3000);
  }, [isFullscreen, controlsHovered]);

  const toggleFullscreen = useCallback(() => {
    sounds.buttonClick();
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => {
        setIsFullscreen(true); onFullscreenChange?.(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false); onFullscreenChange?.(false);
      }).catch(() => {});
    }
  }, [onFullscreenChange]);

  useEffect(() => {
    const handler = () => {
      const f = !!document.fullscreenElement;
      setIsFullscreen(f); onFullscreenChange?.(f);
      if (f) resetControlsTimer(); else setShowControls(true);
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, [onFullscreenChange, resetControlsTimer]);

  useEffect(() => {
    const kb = (e: KeyboardEvent) => {
      if (e.key === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const t = e.target as HTMLElement;
        if (['INPUT','TEXTAREA'].includes(t.tagName) || t.isContentEditable) return;
        e.preventDefault(); toggleFullscreen();
      }
    };
    window.addEventListener('keydown', kb);
    return () => window.removeEventListener('keydown', kb);
  }, [toggleFullscreen]);

  useEffect(() => {
    if (phase !== 'loading') return;
    const t = setTimeout(() => { if (isLoading) { setIsLoading(false); setPhase('playing'); } }, 5000);
    return () => clearTimeout(t);
  }, [phase, isLoading]);

  const onIframeLoad = useCallback(() => {
    setTimeout(() => { setIsLoading(false); setPhase('playing'); sounds.gameStart(); }, 500);
  }, []);

  if (!game.sourceUrl) {
    return <div className="flex items-center justify-center h-[500px] bg-muted/30 rounded-xl"><p className="text-muted-foreground">Game source URL not configured</p></div>;
  }

  const bgImage = game.backgroundImage ? "url(" + game.backgroundImage + ")" : undefined;

  return (
    <div ref={containerRef} className={"relative group/game" + (isFullscreen ? " fixed inset-0 z-[9999]" : "")} style={{ width: isFullscreen ? "100vw" : width }} onMouseMove={resetControlsTimer}>

      {/* Game viewport */}
      <div className={(isFullscreen ? "h-screen" : "aspect-video") + " relative overflow-hidden transition-all duration-500"}
           style={bgImage ? { backgroundImage: bgImage, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" } : { backgroundColor: "#000" }}
           onDoubleClick={() => { if (!isFullscreen && phase === "playing") toggleFullscreen(); }}>

        {/* START SCREEN */}
        {phase === "start" && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/95 backdrop-blur-md">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-[100px] animate-pulse" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-brand-pink/10 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className="absolute w-1 h-1 rounded-full bg-white/20 animate-bounce"
                     style={{ left: (15+i*15) + "%", top: (20+(i%3)*30) + "%", animationDelay: (i*0.4) + "s", animationDuration: (2+i*0.5) + "s" }} />
              ))}
            </div>

            <div className="relative z-10 text-center max-w-md mx-auto px-6">
              <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary via-brand-cyan to-brand-pink p-[2px] shadow-2xl shadow-primary/20">
                <div className="w-full h-full rounded-2xl bg-black/90 flex items-center justify-center">
                  <img src={game.thumbnail} alt="" className="w-full h-full object-cover rounded-2xl opacity-60" />
                </div>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
                <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">{game.title}</span>
              </h2>
              <p className="text-sm text-white/40 mb-8 max-w-xs mx-auto">{game.description.slice(0,80)}...</p>

              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-white/30 mb-3 flex items-center justify-center gap-2">
                  <Settings className="w-3.5 h-3.5" /> Difficulty
                </p>
                <div className="flex gap-2 justify-center">
                  {DIFFICULTY_OPTIONS.map(opt => {
                    const active = selectedDifficulty === opt.value;
                    return (
                      <button key={opt.value} onClick={() => { setSelectedDifficulty(opt.value); sounds.buttonClick(); }}
                              className={active
                                ? "relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 bg-gradient-to-r " + opt.color + " text-white shadow-lg scale-105"
                                : "relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 bg-white/[0.06] text-white/50 hover:bg-white/[0.10] hover:text-white/70 border border-white/[0.06]"}>
                        {opt.label}
                        {active && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-current opacity-60" />}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-white/25 mt-2">{DIFFICULTY_OPTIONS.find(d => d.value === selectedDifficulty)?.desc}</p>
              </div>

              <button onClick={handleStartGame}
                      className="group relative px-12 py-4 rounded-2xl bg-gradient-to-r from-primary via-brand-cyan to-brand-pink text-white font-bold text-lg shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3"><Play className="w-6 h-6 fill-white" /> START GAME</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>

              <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-white/20">
                <span>{game.controls.keyboard ? (Array.isArray(game.controls.keyboard) ? game.controls.keyboard.join(", ") : "Keyboard") : "Mouse/Touch"}</span>
                <span>{game.estimatedTime}</span>
              </div>
            </div>
          </div>
        )}

        {/* LOADING */}
        {(phase === "loading" || isLoading) && phase !== "start" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/92 z-20 backdrop-blur-sm transition-opacity duration-500">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary to-brand-pink p-[2px] animate-pulse">
                <div className="w-full h-full rounded-2xl bg-black/90 flex items-center justify-center text-3xl">🎮</div>
              </div>
              <p className="text-white font-semibold text-lg mb-3">Preparing {game.title}...</p>
              <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto">
                <div className="h-full bg-gradient-to-r from-primary via-brand-cyan to-brand-pink rounded-full animate-loading-bar" style={{ width: "65%" }} />
              </div>
            </div>
          </div>
        )}

        {/* IFRAME */}
        {phase !== "start" && (
          <iframe ref={iframeRef} src={iframeSrc || undefined} title={game.title} width="100%" height="100%"
                  style={{ border: "none", display: "block", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
                  allow="fullscreen;accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                  allowFullScreen onLoad={onIframeLoad}
                  onError={() => { setIsLoading(false); setError("Failed to load. Click Retry."); }} />
        )}

        {/* ERROR */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/95 z-20">
            <div className="text-center p-8">
              <p className="text-red-400 mb-6 text-lg font-semibold">{error}</p>
              <button onClick={() => { sounds.buttonClick(); setError(null); setIsLoading(true); setPhase("loading"); }}
                      className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 font-medium transition-all hover:scale-105">Retry Loading</button>
            </div>
          </div>
        )}

        {/* CONTROLS BAR (playing only) */}
        {phase === "playing" && (
          <div className={"absolute bottom-0 left-0 right-0 z-30 transition-all duration-300 ease-out " + (showControls || !isFullscreen || controlsHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none")}
               onMouseEnter={() => setControlsHovered(true)} onMouseLeave={() => setControlsHovered(false)}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="relative flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={"w-2 h-2 rounded-full flex-shrink-0 " + (isLoading ? "bg-amber-400 animate-pulse" : "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]")} />
                <span className="text-sm font-medium text-white/90 truncate max-w-[180px] md:max-w-[300px]">{game.title}</span>
                <span className={"px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-gradient-to-r " + (DIFFICULTY_OPTIONS.find(d => d.value === selectedDifficulty)?.color || "") + " text-white/90"}>{selectedDifficulty}</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => { sounds.buttonClick(); setSoundEnabled(!soundEnabled); }} className="p-2 rounded-lg hover:bg-white/15 text-white/60 hover:text-white">{soundEnabled ? <Volume2 className="w-[18px]" /> : <VolumeX className="w-[18px]" />}</button>
                <button onClick={handleRestart} className="p-2 rounded-lg hover:bg-white/15 text-white/60 hover:text-white" title="Restart"><RotateCcw className="w-[18px]" /></button>
                <button onClick={toggleFullscreen} className="p-2 rounded-lg hover:bg-white/15 text-white/60 hover:text-white">{isFullscreen ? <Minimize2 className="w-[18px]" /> : <Maximize2 className="w-[18px]" />}</button>
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen close */}
        {isFullscreen && phase === "playing" && (
          <button onClick={() => document.fullscreenElement && document.exitFullscreen()}
                  className="absolute top-4 right-4 z-30 p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white/60 hover:text-white opacity-0 group-hover/game:opacity-100 focus:opacity-100 transition-all duration-200 backdrop-blur-sm">
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Corner decorations */}
        {phase !== "start" && !isFullscreen && (
          <>
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-xl pointer-events-none z-10" />
            <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary/20 rounded-tr-xl pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/20 rounded-bl-xl pointer-events-none z-10" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-xl pointer-events-none z-10" />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/[0.04] pointer-events-none z-10" />
          </>
        )}
      </div>

      {/* Hint bar */}
      {!isFullscreen && phase === "playing" && (
        <div className="mt-2.5 flex items-center justify-between px-1 text-[11px] text-muted-foreground/50">
          <span>Double-click or F for fullscreen</span>
          <span>F = Fullscreen | R = Restart</span>
        </div>
      )}

    </div>
  );
}
