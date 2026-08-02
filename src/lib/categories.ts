import { Puzzle, Gamepad2, Target, Zap, Building2 } from "lucide-react";
import type { ComponentType } from "react";
import { getActiveGames } from "@/data/games";

export interface CategoryMeta {
  slug: string;
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  description: string;
  count: number;
}

const META: Record<string, Omit<CategoryMeta, "slug" | "count">> = {
  puzzle: {
    label: "Puzzle",
    icon: Puzzle,
    description:
      "Challenge your logic and mind with Sudoku, Minesweeper, word puzzles and more!",
  },
  arcade: {
    label: "Arcade",
    icon: Gamepad2,
    description:
      "Timeless classic arcade games. Snake, Tetris, Brick Breaker — can't stop playing!",
  },
  strategy: {
    label: "Strategy",
    icon: Target,
    description: "Plan your moves, test your strategy. Chess and more await your challenge!",
  },
  casual: {
    label: "Casual",
    icon: Gamepad2,
    description: "Relaxing and fun, perfect for killing time anytime, anywhere!",
  },
  action: {
    label: "Action",
    icon: Zap,
    description: "Test your reaction speed, challenge your limits!",
  },
  building: {
    label: "Building",
    icon: Building2,
    description: "Unleash your creativity, build your own world!",
  },
};

export const ALL_CATEGORY_SLUGS = Object.keys(META);

export function getCategoryList(): CategoryMeta[] {
  const games = getActiveGames();
  const slugs = [...new Set(games.map((g) => g.category))];
  return slugs.map((slug) => {
    const meta = META[slug] || {
      label: slug,
      icon: Gamepad2,
      description: "",
    };
    return {
      slug,
      count: games.filter((g) => g.category === slug).length,
      ...meta,
    };
  });
}

export function getCategoryMeta(slug: string): Omit<CategoryMeta, "slug" | "count"> | undefined {
  return META[slug];
}
