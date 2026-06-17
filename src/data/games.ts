import { Game } from "@/types/game";

// ===== Hand-Curated High-Quality Classic Games =====
// 8 classic games with clean data (no quote issues)

export const games: Game[] = [
  // ===== 2048 - Classic Number Puzzle =====
  {
    id: "2048",
    slug: "2048",
    title: "2048",
    description: "2048 is a legendary number puzzle game that took the world by storm. Slide numbered tiles on a 4x4 grid to combine matching numbers. Simple to learn but impossible to master.",
    category: "puzzle",
    tags: ["2048", "numbers", "puzzle", "slide", "classic"],
    source: "embed",
    sourceUrl: "/games/2048/index.html",
    thumbnail: "/games/2048/thumbnail.png",
    instructions: "Use arrow keys or swipe to move tiles. When two tiles with the same number collide, they merge into their sum. Goal: create a 2048 tile!",
    controls: { keyboard: ["Arrow Keys", "WASD"], mouse: false, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 125430,
    rating: 4.9,
    difficulty: "Medium",
    estimatedTime: "5-30 minutes",
    featured: true,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-17"),
  },

  // ===== Tetris - The Ultimate Classic =====
  {
    id: "tetris",
    slug: "tetris",
    title: "Tetris",
    description: "Tetris is the most iconic puzzle game of all time. Rotate and arrange falling tetrominoes to complete horizontal lines. From 1984 to today, Tetris remains the perfect game.",
    category: "puzzle",
    tags: ["tetris", "classic", "puzzle", "falling blocks", "retro", "timeless"],
    source: "embed",
    sourceUrl: "/games/tetris/index.html",
    thumbnail: "/games/tetris/thumbnail.png",
    instructions: "Use Arrow Keys to move and rotate pieces. Complete horizontal lines to clear them and score points. The game speeds up as you progress!",
    controls: { keyboard: ["Arrow Keys", "Space"], mouse: false, touch: true, gamepad: true },
    isOriginal: false,
    isActive: true,
    playCount: 234567,
    rating: 5.0,
    difficulty: "Easy to Learn, Hard to Master",
    estimatedTime: "Endless",
    featured: true,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-17"),
  },

  // ===== Snake - The Eternal Classic =====
  {
    id: "snake",
    slug: "snake",
    title: "Snake",
    description: "Snake is the ultimate classic arcade game. Control the growing snake to eat food and grow longer - but don't hit the walls or your own tail!",
    category: "arcade",
    tags: ["snake", "classic", "arcade", "reaction", "retro", "addictive"],
    source: "embed",
    sourceUrl: "/games/snake/index.html",
    thumbnail: "/games/snake/thumbnail.png",
    instructions: "Use arrow keys to control the snake's direction. Eat food to grow longer and score points. Don't hit the walls or your own tail!",
    controls: { keyboard: ["Arrow Keys"], mouse: false, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 198765,
    rating: 4.8,
    difficulty: "Easy",
    estimatedTime: "2-10 minutes per game",
    featured: true,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-17"),
  },

  // ===== Sudoku - Number Logic Puzzle =====
  {
    id: "sudoku",
    slug: "sudoku",
    title: "Sudoku",
    description: "Sudoku is the world's most popular logic-based number placement puzzle. Fill a 9x9 grid so that each column, row, and 3x3 box contains digits 1-9.",
    category: "puzzle",
    tags: ["sudoku", "numbers", "logic", "puzzle", "brain training", "classic"],
    source: "embed",
    sourceUrl: "/games/sudoku/index.html",
    thumbnail: "/games/sudoku/thumbnail.png",
    instructions: "Fill the 9x9 grid with digits 1-9. Each row, column, and 3x3 box must contain all digits 1-9 without repetition. No math needed!",
    controls: { keyboard: ["1-9", "Delete"], mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 167890,
    rating: 4.9,
    difficulty: "Variable (Easy to Expert)",
    estimatedTime: "5-30 minutes per puzzle",
    featured: true,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-17"),
  },

  // ===== Minesweeper - Logic & Luck =====
  {
    id: "minesweeper",
    slug: "minesweeper",
    title: "Minesweeper",
    description: "Minesweeper is the classic logic puzzle that shipped with Windows for decades. Uncover all safe cells without detonating any mines.",
    category: "puzzle",
    tags: ["minesweeper", "logic", "puzzle", "classic", "retro", "deduction"],
    source: "embed",
    sourceUrl: "/games/minesweeper/index.html",
    thumbnail: "/games/minesweeper/thumbnail.png",
    instructions: "Left-click to uncover cells. Right-click to flag mines. Numbers indicate how many mines are adjacent. Goal: uncover all safe cells!",
    controls: { keyboard: ["Arrow Keys", "Space"], mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 145230,
    rating: 4.7,
    difficulty: "Easy to Expert",
    estimatedTime: "1-30 minutes per game",
    featured: true,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-17"),
  },

  // ===== Chess - The Game of Kings =====
  {
    id: "chess",
    slug: "chess",
    title: "Chess",
    description: "Chess is the ultimate strategy game, played by emperors and geniuses for over 1500 years. Two players, 64 squares, 32 pieces - infinite possibilities.",
    category: "strategy",
    tags: ["chess", "strategy", "classic", "two-player", "brain", "tactics"],
    source: "embed",
    sourceUrl: "/games/chess/index.html",
    thumbnail: "/games/chess/thumbnail.png",
    instructions: "White moves first. Each piece moves differently. Goal: checkmate your opponent's king. Tip: control the center and keep your king safe!",
    controls: { keyboard: false, mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 234567,
    rating: 5.0,
    difficulty: "Easy to Learn, Lifetime to Master",
    estimatedTime: "10 minutes to 6 hours",
    featured: true,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-17"),
  },

  // ===== Flappy Bird - The Phenomenon =====
  {
    id: "flappy-wings",
    slug: "flappy-wings",
    title: "Flappy Wings",
    description: "Flappy Wings is inspired by the legendary Flappy Bird. Tap to keep your bird airborne and navigate through green pipes without hitting them.",
    category: "arcade",
    tags: ["flappy", "bird", "arcade", "tap", "reaction", "addictive"],
    source: "embed",
    sourceUrl: "/games/flappy-wings/index.html",
    thumbnail: "/games/flappy-wings/thumbnail.png",
    instructions: "Click or tap to make the bird flap and go up. Release to let it fall. Navigate through the green pipes without hitting them. One hit = game over!",
    controls: { keyboard: ["Space"], mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 189234,
    rating: 4.6,
    difficulty: "Brutal",
    estimatedTime: "10 seconds to 5 minutes per game",
    featured: true,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-17"),
  },

  // ===== Slope - 3D Speed Challenge =====
  {
    id: "slope",
    slug: "slope",
    title: "Slope",
    description: "Slope is an exhilarating 3D endless runner where you control a ball racing down a neon-lit slope at breakneck speeds. Dodge red obstacles and survive!",
    category: "arcade",
    tags: ["slope", "3d", "runner", "speed", "reflexes", "addictive"],
    source: "embed",
    sourceUrl: "/games/slope/index.html",
    thumbnail: "/games/slope/thumbnail.png",
    instructions: "Use Left/Right arrow keys to steer the ball. Stay on the narrow track and avoid red obstacles. The game gets faster as you progress!",
    controls: { keyboard: ["Arrow Keys"], mouse: false, touch: false, gamepad: true },
    isOriginal: false,
    isActive: true,
    playCount: 212345,
    rating: 4.8,
    difficulty: "Hard",
    estimatedTime: "30 seconds to 5 minutes per game",
    featured: true,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-17"),
  },
];

// ===== Helper Functions =====

export function getAllGames(): Game[] {
  return games;
}

export function getFeaturedGames(): Game[] {
  return games.filter(g => g.featured);
}

export function getGamesByCategory(category: string): Game[] {
  return games.filter(g => g.category === category);
}

export function getRelatedGames(slug: string, limit: number = 4): Game[] {
  const game = games.find(g => g.slug === slug);
  if (!game) return games.slice(0, limit);
  
  const related = games
    .filter(g => g.slug !== slug)
    .map(g => ({
      game: g,
      score: g.tags.filter(t => game.tags.includes(t)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.game);
  
  return related;
}
