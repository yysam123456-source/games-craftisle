export type GameCategory = 
  | "puzzle"
  | "arcade"
  | "strategy"
  | "casual"
  | "action"
  | "building";

export type GameSource = 
  | "embed"
  | "phaser"
  | "canvas"
  | "external"
  | "self-hosted";

export interface GameControls {
  keyboard?: boolean | string[];
  mouse?: boolean;
  touch?: boolean;
  gamepad?: boolean;
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: GameCategory;
  tags: string[];
  source: GameSource;
  sourceUrl?: string;
  thumbnail: string;
  /** Decorative background image URL for the game player page */
  backgroundImage?: string;
  /** CSS gradient or pattern class for game page theme */
  themeGradient?: string;
  instructions: string;
  controls: GameControls;
  isOriginal: boolean;
  isActive: boolean;
  playCount: number;
  rating: number;
  featured?: boolean;
  difficulty?: string;
  estimatedTime?: string;
  /** Disable iframe sandbox (needed for WebAssembly / Web Worker games like 3D) */
  disableSandbox?: boolean;
  /** Whether this game actually reads the ?difficulty= URL param. 
   *  If false/undefined, the difficulty selector is hidden and only Start button is shown. */
  supportsDifficulty?: boolean;
  /** If true, game has its own native UI — hide our immersive top/bottom bars and show minimal exit button instead */
  hasNativeUI?: boolean;
  /**
   * 🔴 2026-10-20：可选的专用 SEO 标题/描述（留空则走通用模板，行为完全不变）。
   *   用途：GSC 实测 sudoku 是全站单条最大曝光源（`sudoku game` 167 曝光），
   *   但通用模板只产出 "Sudoku - Play Free Online"，不含 game / puzzle / number 变体，
   *   而真实查询是 `sudoku puzzle game`(15, p56) / `sudoku number game`(14, p59)。
   *   字段可选 ⇒ 其余游戏零影响。
   */
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}
