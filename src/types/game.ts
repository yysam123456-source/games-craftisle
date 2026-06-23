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
  createdAt: Date;
  updatedAt: Date;
}
