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
  | "external";

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
  createdAt: Date;
  updatedAt: Date;
}
