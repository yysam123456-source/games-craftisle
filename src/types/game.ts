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
  instructions: string;
  controls: GameControls;
  isOriginal: boolean;
  isActive: boolean;
  playCount: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
