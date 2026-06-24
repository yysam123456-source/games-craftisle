import { Game } from "@/types/game";

// ===== Self-Hosted Games Only =====
// All games have local HTML/JS/CSS code in /public/games/<slug>/

export const games: Game[] = [
  // ===== Wordle - Daily Word Puzzle =====
  {
    id: "wordle",
    slug: "wordle",
    title: "Wordle",
    description: "The viral daily word puzzle! Guess the 5-letter word in 6 tries. Green = correct, Yellow = wrong position, Gray = not in word.",
    category: "puzzle",
    tags: ["wordle", "words", "puzzle", "daily", "viral"],
    source: "self-hosted",
    sourceUrl: "/games/wordle/index.html",
    thumbnail: "/games/wordle/thumbnail.svg",
    instructions: "Type a 5-letter word and press Enter. Green = correct position, Yellow = wrong position, Gray = not in word.",
    controls: { keyboard: true, mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 50000000,
    rating: 4.9,
    difficulty: "Medium",
    estimatedTime: "2-5 minutes",
    featured: true,
    createdAt: new Date("2026-06-23"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== 2048 - Classic Number Puzzle =====
  {
    id: "2048",
    slug: "2048",
    title: "2048",
    description: "The legendary number puzzle! Merge tiles to reach 2048. Simple to learn, impossible to put down.",
    category: "puzzle",
    tags: ["2048", "numbers", "puzzle", "slide", "classic"],
    source: "self-hosted",
    sourceUrl: "/games/2048/index.html",
    thumbnail: "/games/2048/thumbnail.svg",
    instructions: "Use arrow keys or swipe to move tiles. Merge matching numbers. Goal: 2048 tile!",
    controls: { keyboard: ["Arrow Keys", "WASD"], mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 125430,
    rating: 4.9,
    difficulty: "Medium",
    estimatedTime: "5-30 minutes",
    featured: true,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== Chess - Classic Strategy =====
  {
    id: "chess",
    slug: "chess",
    title: "Chess",
    description: "The ultimate strategy game. Play against AI or practice tactics. White moves first, goal: Checkmate!",
    category: "strategy",
    tags: ["chess", "strategy", "classic", "board", "smart"],
    source: "self-hosted",
    sourceUrl: "/games/chess/index.html",
    thumbnail: "/games/chess/thumbnail.svg",
    instructions: "White moves first. Each piece moves differently. Goal: Checkmate the opponent's king!",
    controls: { keyboard: true, mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 89000,
    rating: 4.8,
    difficulty: "Hard",
    estimatedTime: "10-60 minutes",
    featured: true,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== Minesweeper - Logic Puzzle =====
  {
    id: "minesweeper",
    slug: "minesweeper",
    title: "Minesweeper",
    description: "Classic logic puzzle! Clear the minefield without detonating a mine. Numbers show adjacent mines.",
    category: "puzzle",
    tags: ["minesweeper", "logic", "puzzle", "classic", "windows"],
    source: "self-hosted",
    sourceUrl: "/games/minesweeper/index.html",
    thumbnail: "/games/minesweeper/thumbnail.svg",
    instructions: "Left-click to reveal. Right-click to flag mines. Numbers show adjacent mines.",
    controls: { keyboard: true, mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 67000,
    rating: 4.7,
    difficulty: "Medium",
    estimatedTime: "5-20 minutes",
    featured: false,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== Snake - Classic Arcade =====
  {
    id: "snake",
    slug: "snake",
    title: "Snake",
    description: "The classic mobile game! Eat food, grow longer, don't hit yourself or the walls.",
    category: "arcade",
    tags: ["snake", "classic", "arcade", "mobile", "retro"],
    source: "self-hosted",
    sourceUrl: "/games/snake/index.html",
    thumbnail: "/games/snake/thumbnail.svg",
    instructions: "Use arrow keys to control the snake. Eat food to grow. Don't hit walls or yourself!",
    controls: { keyboard: ["Arrow Keys"], mouse: false, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 156000,
    rating: 4.8,
    difficulty: "Easy to Hard",
    estimatedTime: "1-10 minutes",
    featured: true,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== Sudoku - Number Puzzle =====
  {
    id: "sudoku",
    slug: "sudoku",
    title: "Sudoku",
    description: "The addictive number placement puzzle. Fill the grid with 1-9, no repeats in rows/columns/boxes!",
    category: "puzzle",
    tags: ["sudoku", "numbers", "puzzle", "logic", "brain"],
    source: "self-hosted",
    sourceUrl: "/games/sudoku/index.html",
    thumbnail: "/games/sudoku/thumbnail.svg",
    instructions: "Fill each row, column, and 3x3 box with digits 1-9. No repeats allowed!",
    controls: { keyboard: true, mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 92000,
    rating: 4.8,
    difficulty: "Medium",
    estimatedTime: "5-30 minutes",
    featured: false,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== Slope - 3D Endless Runner =====
  {
    id: "slope",
    slug: "slope",
    title: "Slope",
    description: "A legendary 3D endless runner where you control a ball racing down a neon-lit slope!",
    category: "arcade",
    tags: ["slope", "3d", "runner", "speed", "reflexes", "neon"],
    source: "self-hosted",
    sourceUrl: "/games/slope/index.html",
    thumbnail: "/games/slope/thumbnail.svg",
    instructions: "Use Left/Right arrow keys to steer the ball. Stay on the track and avoid red obstacles!",
    controls: { keyboard: ["Left/Right Arrow Keys"], mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 212345,
    rating: 4.8,
    difficulty: "Hard",
    estimatedTime: "30 seconds to 5 minutes",
    featured: true,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== Time Shooter 3 - Time-Bending FPS =====
  {
    id: "time-shooter-3",
    slug: "time-shooter-3",
    title: "Time Shooter 3",
    description: "A unique FPS where time moves only when you move! Clear enemy waves strategically.",
    category: "action",
    tags: ["time", "shooter", "fps", "puzzle", "slow-motion"],
    source: "self-hosted",
    sourceUrl: "/games/time-shooter-3/index.html",
    thumbnail: "/games/time-shooter-3/thumbnail.svg",
    instructions: "WASD to move. Mouse to aim and shoot. Time moves ONLY when you move!",
    controls: { keyboard: ["WASD", "Mouse"], mouse: true, touch: false, gamepad: true },
    isOriginal: false,
    isActive: true,
    playCount: 5000000,
    rating: 4.8,
    difficulty: "Medium to Hard",
    estimatedTime: "5-15 minutes per level",
    featured: true,
    createdAt: new Date("2026-06-23"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== Infinite Craft - Element Combination =====
  {
    id: "infinite-craft",
    slug: "infinite-craft",
    title: "Infinite Craft",
    description: "Combine elements to discover new ones! Start with Water, Fire, Wind, and Earth. 1200+ elements to discover!",
    category: "casual",
    tags: ["infinite", "craft", "combination", "discovery", "elements"],
    source: "self-hosted",
    sourceUrl: "/games/infinite-craft/index.html",
    thumbnail: "/games/infinite-craft/thumbnail.svg",
    instructions: "Drag elements to combine them. Discover all 1200+ elements!",
    controls: { keyboard: false, mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 5000000,
    rating: 4.9,
    difficulty: "Easy",
    estimatedTime: "Endless discovery",
    featured: true,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== Space Invaders - Classic Arcade =====
  {
    id: "spaceinvaders",
    slug: "spaceinvaders",
    title: "Space Invaders",
    description: "The legendary 1978 arcade shooter! Blast waves of alien invaders. Speed increases each wave!",
    category: "arcade",
    tags: ["space", "invaders", "classic", "arcade", "shooter", "retro"],
    source: "self-hosted",
    sourceUrl: "/games/spaceinvaders/index.html",
    thumbnail: "/games/spaceinvaders/thumbnail.svg",
    instructions: "Use Left/Right Arrow Keys to move. Press Space to fire. Destroy all aliens!",
    controls: { keyboard: ["Left/Right Arrow Keys", "Space"], mouse: false, touch: false, gamepad: true },
    isOriginal: false,
    isActive: true,
    playCount: 345000,
    rating: 4.8,
    difficulty: "Medium to Hard",
    estimatedTime: "Endless waves",
    featured: true,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== HexGL - Futuristic 3D Racing =====
  {
    id: "hexgl",
    slug: "hexgl",
    title: "HexGL",
    description: "A fast-paced, futuristic 3D racing game built with Three.js. Race at breakneck speeds!",
    category: "arcade",
    tags: ["hexgl", "racing", "3d", "three.js", "futuristic", "speed"],
    source: "self-hosted",
    sourceUrl: "/games/hexgl/index.html",
    thumbnail: "/games/hexgl/thumbnail.svg",
    instructions: "Use Arrow Keys to steer and accelerate. Avoid obstacles. Race to the finish!",
    controls: { keyboard: ["Up Arrow (Accelerate)", "Down Arrow (Brake)", "Left/Right (Steer)"], mouse: false, touch: false, gamepad: true },
    isOriginal: false,
    isActive: true,
    playCount: 78900,
    rating: 4.8,
    difficulty: "Hard",
    estimatedTime: "2-5 minutes per race",
    featured: true,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== Island Builder - 3D Planet Building =====
  {
    id: "island-builder",
    slug: "island-builder",
    title: "Island Builder",
    description: "Build your dream island! Place houses, trees, decorations and watch your island come to life.",
    category: "building",
    tags: ["island", "builder", "isometric", "sandbox", "creative", "relaxing"],
    source: "self-hosted",
    sourceUrl: "/games/island-builder/play.html",
    thumbnail: "/games/island-builder/thumbnail.svg",
    instructions: "Click or tap to place buildings. Use the toolbar to select different objects. Build your dream island!",
    controls: { keyboard: false, mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 0,
    rating: 4.8,
    difficulty: "Easy",
    estimatedTime: "Endless creativity",
    featured: true,
    createdAt: new Date("2026-06-20"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== Messenger - 3D Planet Delivery =====
  {
    id: "messenger",
    slug: "messenger",
    title: "Messenger",
    description: "Step into the shoes of a messenger on a tiny, beautiful planet. Explore and deliver letters!",
    category: "casual",
    tags: ["messenger", "3d", "delivery", "planet", "exploration", "three.js"],
    source: "self-hosted",
    sourceUrl: "/games/messenger/index.html",
    thumbnail: "/games/messenger/thumbnail.svg",
    instructions: "Click BEGIN to start. Use WASD to move; mouse to look around. Interact with NPCs!",
    controls: { keyboard: ["WASD", "Mouse"], mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 0,
    rating: 4.9,
    difficulty: "Easy",
    estimatedTime: "10-20 min",
    featured: true,
    createdAt: new Date("2026-06-21"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== Tiny World Builder - Voxel 3D World =====
  {
    id: "tiny-world-builder",
    slug: "tiny-world-builder",
    title: "Tiny World Builder",
    description: "A charming voxel-style 3D world builder powered by Three.js. Place blocks and create!",
    category: "building",
    tags: ["voxel", "3d", "builder", "three.js", "creative", "blocks"],
    source: "self-hosted",
    sourceUrl: "/games/tiny-world-builder/index.html",
    thumbnail: "/games/tiny-world-builder/thumbnail.svg",
    instructions: "Left-click to place blocks. Right-click to remove. Scroll to zoom, drag to rotate view.",
    controls: { keyboard: ["WASD", "Shift"], mouse: true, touch: false, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 0,
    rating: 4.7,
    difficulty: "Easy",
    estimatedTime: "Endless creativity",
    featured: true,
    createdAt: new Date("2026-06-20"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== Geo Quiz - Geography Quiz =====
  {
    id: "geoquiz",
    slug: "geoquiz",
    title: "Geo Quiz",
    description: "Test your geography knowledge! Identify countries, capitals, flags, and landmarks.",
    category: "puzzle",
    tags: ["geo", "quiz", "geography", "education", "flags", "countries"],
    source: "self-hosted",
    sourceUrl: "/games/geoquiz/index.html",
    thumbnail: "/games/geoquiz/thumbnail.svg",
    instructions: "Read the question and select the correct answer. Multiple game modes available!",
    controls: { keyboard: true, mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 45600,
    rating: 4.7,
    difficulty: "Medium",
    estimatedTime: "3-15 minutes",
    featured: false,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== Password Game - Puzzle Challenge =====
  {
    id: "password-game",
    slug: "password-game",
    title: "Password Game",
    description: "Create a password that satisfies increasingly absurd rules. A hilarious puzzle game!",
    category: "puzzle",
    tags: ["password", "puzzle", "humor", "challenge", "rules"],
    source: "self-hosted",
    sourceUrl: "/games/password-game/index.html",
    thumbnail: "/games/password-game/thumbnail.svg",
    instructions: "Follow the rules to create a valid password. New rules keep appearing. It gets ridiculous!",
    controls: { keyboard: true, mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 78000,
    rating: 4.8,
    difficulty: "Medium to Hard",
    estimatedTime: "10-30 minutes",
    featured: false,
    createdAt: new Date("2026-06-16"),
    updatedAt: new Date("2026-06-23"),
  },

  // ===== A Dark Room - Text Adventure/Idle =====
  {
    id: "adarkroom",
    slug: "adarkroom",
    title: "A Dark Room",
    description: "A minimalist text adventure that evolves into an idle game. Start a fire, build a village, explore the wasteland.",
    category: "casual",
    tags: ["text", "adventure", "idle", "minimalist", "story"],
    source: "self-hosted",
    sourceUrl: "/games/adarkroom/index.html",
    thumbnail: "/games/adarkroom/thumbnail.svg",
    instructions: "Click the buttons to stoke the fire, build, and explore. The game evolves as you progress!",
    controls: { keyboard: true, mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 6300,
    rating: 4.7,
    difficulty: "Easy",
    estimatedTime: "Endless",
    featured: true,
    hasNativeUI: true,
    createdAt: new Date("2026-06-24"),
    updatedAt: new Date("2026-06-24"),
  },

  // ===== Progress Knight - Idle RPG =====
  {
    id: "progress-knight",
    slug: "progress-knight",
    title: "Progress Knight",
    description: "A text-based incremental RPG! Train stats, get a job, buy gear, and climb the ranks.",
    category: "strategy",
    tags: ["rpg", "idle", "text", "fantasy", "incremental"],
    source: "self-hosted",
    sourceUrl: "/games/progress-knight/index.html",
    thumbnail: "/games/progress-knight/thumbnail.svg",
    instructions: "Train stats to get a job. Work to earn coins. Buy gear to get stronger. Rebirth to progress faster!",
    controls: { keyboard: true, mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 13900,
    rating: 4.6,
    difficulty: "Medium",
    estimatedTime: "Endless",
    featured: true,
    hasNativeUI: true,
    createdAt: new Date("2026-06-24"),
    updatedAt: new Date("2026-06-24"),
  },

  // ===== 1255 Burgomaster - Town Building RPG =====
  {
    id: "1255-burgomaster",
    slug: "1255-burgomaster",
    title: "1255 Burgomaster",
    description: "A Travian-style town building game with RPG elements. Build your medieval town and defend it!",
    category: "strategy",
    tags: ["town", "building", "rpg", "medieval", "strategy", "travian"],
    source: "self-hosted",
    sourceUrl: "/games/1255-burgomaster/index.html",
    thumbnail: "/games/1255-burgomaster/thumbnail.svg",
    instructions: "Build houses to grow population. Build walls and towers to defend. Hire heroes to lead campaigns!",
    controls: { keyboard: false, mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 11800,
    rating: 4.5,
    difficulty: "Medium",
    estimatedTime: "Endless",
    featured: false,
    hasNativeUI: true,
    createdAt: new Date("2026-06-24"),
    updatedAt: new Date("2026-06-24"),
  },

  // ===== React Tetris - Classic Block Puzzle =====
  {
    id: "react-tetris",
    slug: "react-tetris",
    title: "React Tetris",
    description: "A pixel-perfect React implementation of the classic Tetris game. Smooth controls, great visuals!",
    category: "puzzle",
    tags: ["tetris", "blocks", "puzzle", "classic", "react", "pixel"],
    source: "self-hosted",
    sourceUrl: "/games/react-tetris/index.html",
    thumbnail: "/games/react-tetris/thumbnail.svg",
    instructions: "Arrow keys to move/rotate. Complete horizontal lines to clear them. Speed increases!",
    controls: { keyboard: ["Arrow Keys", "Space"], mouse: false, touch: true, gamepad: true },
    isOriginal: false,
    isActive: true,
    playCount: 7400,
    rating: 4.8,
    difficulty: "Medium to Hard",
    estimatedTime: "Endless",
    featured: true,
    hasNativeUI: true,
    createdAt: new Date("2026-06-24"),
    updatedAt: new Date("2026-06-24"),
  },

  // ===== Life Restart - Life Simulation =====
  {
    id: "lifeRestart",
    slug: "lifeRestart",
    title: "Life Restart",
    description: "人生重开模拟器！Relive your life from birth, make choices, and see where life takes you.",
    category: "casual",
    tags: ["life", "simulation", "life-restart", "choices", "story", "中文"],
    source: "self-hosted",
    sourceUrl: "/games/lifeRestart/index.html",
    thumbnail: "/games/lifeRestart/thumbnail.svg",
    instructions: "Click to start. Make choices at each life stage. See how your life turns out!",
    controls: { keyboard: false, mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 9600,
    rating: 4.9,
    difficulty: "Easy",
    estimatedTime: "5-30 minutes per life",
    featured: true,
    hasNativeUI: true,
    createdAt: new Date("2026-06-24"),
    updatedAt: new Date("2026-06-24"),
  },

  // ===== Evolve - Idle/Civilization Evolution =====
  {
    id: "evolve-idle",
    slug: "evolve-idle",
    title: "Evolve",
    description: "The ultimate idle/incremental game! Start as a primitive tribe and evolve through the ages to reach the modern era and beyond.",
    category: "strategy",
    tags: ["evolve", "idle", "incremental", "civilization", "clicker", "addictive"],
    source: "self-hosted",
    sourceUrl: "/games/evolve-idle/index.html",
    thumbnail: "/games/evolve-idle/thumbnail.svg",
    instructions: "Click to gather resources. Unlock new technologies. Evolve your civilization through different eras!",
    controls: { keyboard: true, mouse: true, touch: true, gamepad: false },
    isOriginal: false,
    isActive: true,
    playCount: 10000,
    rating: 4.8,
    difficulty: "Easy to Hard",
    estimatedTime: "Endless",
    featured: true,
    hasNativeUI: true,
    createdAt: new Date("2026-06-24"),
    updatedAt: new Date("2026-06-24"),
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

export function getGameBySlug(slug: string): Game | undefined {
  return games.find(g => g.slug === slug);
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

export function getActiveGames(): Game[] {
  return games.filter(g => g.isActive);
}

export function searchGames(query: string): Game[] {
  const q = query.toLowerCase();
  return games.filter(g =>
    g.title.toLowerCase().includes(q) ||
    g.description.toLowerCase().includes(q) ||
    g.tags.some(t => t.toLowerCase().includes(q))
  );
}
