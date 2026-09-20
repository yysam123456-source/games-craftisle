// Category cornerstone content for SEO T2 enrichment.
// Each category gets a lead intro, 2-3 real guide paragraphs, and 4 FAQs.
// Kept separate from the page so content stays editable and the page stays thin.

export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface CategoryContent {
  intro: string;
  paragraphs: string[];
  faqs: CategoryFaq[];
}

export const CATEGORY_CONTENT: Record<string, CategoryContent> = {
  puzzle: {
    intro:
      "Puzzle games turn simple rules into satisfying “aha” moments — and our collection leans hard into logic, language, and numbers.",
    paragraphs: [
      "Every title here rewards careful thinking over fast reflexes. Sudoku and 2048 train numerical pattern recognition; Minesweeper and the Geo Quiz sharpen deductive reasoning; Wordle and the Password Game play with language and constraints. React Tetris bridges the gap with spatial planning under pressure.",
      "What makes puzzles so enduring is the loop: a clear goal, limited moves, and that click when the solution finally lands. They are perfect for a short brain warm-up between tasks, and many — like Sudoku or Wordle — build a daily habit that genuinely improves focus.",
      "Best of all, there is nothing to install. The whole shelf runs in your browser and is free to play, so you can jump straight into a five-minute mental stretch whenever you like.",
    ],
    faqs: [
      {
        question: "Puzzle games are suitable for whom?",
        answer:
          "Almost everyone. Whether you want to train logical thinking, kill a few spare minutes, or brainstorm with your kids, you can find a comfortable difficulty here.",
      },
      {
        question: "Do these games need to be downloaded or installed?",
        answer:
          "No. Everything runs directly in your browser — open and play instantly, with no storage taken up on your device.",
      },
      {
        question: "Are the puzzle games free?",
        answer:
          "Completely free. Every puzzle game on Craftisle is free to play with no paywall or in-app purchases.",
      },
      {
        question: "Can a beginner with no experience get started?",
        answer:
          "Yes. Each game ships with instructions, and the difficulty ramps from easy to hard (Wordle to Sudoku), so newcomers pick it up quickly.",
      },
    ],
  },

  arcade: {
    intro:
      "Arcade games are pure, immediate fun — the kind you can pick up in five seconds and chase a high score on for an hour.",
    paragraphs: [
      "Our arcade shelf is a love letter to the classics. Snake and Space Invaders recreate the 1978–90s coin-op feel; Slope and HexGL push it into 3D with neon speed and breakneck racing. They are built for reflexes, not for reading manuals.",
      "The magic of arcade gaming is the score chase. Because rounds are short and failure is instant, you are always one run away from beating your best — that tight feedback loop is exactly why these games have lasted 40+ years.",
      "All of them run right in your browser with keyboard, mouse, or gamepad support, so you can relive the arcade anywhere, on any device.",
    ],
    faqs: [
      {
        question: "What devices work best for arcade games?",
        answer:
          "Desktop, phone, or tablet all work. Most support keyboard and gamepad, and several (Snake, Slope) also support touch controls.",
      },
      {
        question: "Do I need an emulator or installer?",
        answer:
          "No. The games run straight in the page — just click and play, no extra software required.",
      },
      {
        question: "Are the arcade games free?",
        answer:
          "All of them are free, with no download fee and no in-app purchases.",
      },
      {
        question: "Can slower players still enjoy them?",
        answer:
          "Yes. While arcade games favor reaction speed, titles like Snake let you set the pace, so practice alone can earn a high score.",
      },
    ],
  },

  strategy: {
    intro:
      "Strategy games reward patience and planning — every decision compounds, and the best players think two moves ahead.",
    paragraphs: [
      "This shelf spans the whole strategic spectrum. Chess is the timeless test of pure tactics; Mindustry Classic blends factory-building with tower defense; 1255 Burgomaster adds medieval town management and RPG campaigns. If you prefer watching systems grow, Progress Knight and Evolve are idle/incremental strategy — train, earn, and rebirth.",
      "Unlike arcade titles, strategy games rarely punish you for slowing down. You can spend ten minutes or an hour on a single session, weighing trade-offs and long-term payoffs — which is exactly what makes them so satisfying for analytical minds.",
      "All run in-browser, free to play, with no downloads: whether you want a five-minute chess puzzle or a deep factory run, the session is yours to shape.",
    ],
    faqs: [
      {
        question: "Is the strategy shelf hard to get into?",
        answer:
          "Not at all. From chess to idle evolution games, the difficulty curve is friendly — start with relaxed idle strategy, then graduate to factories and tower defense.",
      },
      {
        question: "Do I need to download or register an account?",
        answer:
          "Neither. Play directly in the browser; progression games (Evolve, Mindustry) auto-save to your local device.",
      },
      {
        question: "Are they all free?",
        answer:
          "Yes — every strategy game on the site is free, with no paywall.",
      },
      {
        question: "Can they be played with others?",
        answer:
          "Some can. Chess lets you practice against AI; city-building and idle titles are better suited to solo, deep sessions you can return to anytime.",
      },
    ],
  },

  casual: {
    intro:
      "Casual games are the digital equivalent of a comfortable chair — no pressure, no fail state, just gentle fun on your schedule.",
    paragraphs: [
      "This is our most relaxing corner. Infinite Craft lets you combine elements and discover 1,200+ surprises; A Dark Room and Messenger are story-rich, low-key adventures; Samsy Ninja and Jungle Trail are beautiful 3D explorations you simply wander through. None of them demand reflexes or punish mistakes.",
      "Casual titles are built for real life: pick up for two minutes, put down without losing progress. They are ideal during a break, on a commute, or whenever you want to unwind without commitment.",
      "Everything here is free, runs in your browser, and needs no download — pure, low-stress play.",
    ],
    faqs: [
      {
        question: "Are casual games good for spare moments?",
        answer:
          "Perfectly. Most have no fail state and let you drop out anytime, so a few minutes while waiting or at lunch is completely pressure-free.",
      },
      {
        question: "Do they need to be downloaded or installed?",
        answer:
          "No — they run in the browser and are ready to play immediately.",
      },
      {
        question: "Are these games paid?",
        answer:
          "All free, with no in-app purchases.",
      },
      {
        question: "Can kids or older players enjoy them?",
        answer:
          "Yes. The controls are simple and the pacing is calm, making them suitable for relaxing entertainment at any age.",
      },
    ],
  },

  action: {
    intro:
      "Action games are where reaction speed meets adrenaline — and our standout, Time Shooter 3, flips the genre on its head.",
    paragraphs: [
      "Time Shooter 3 is a first-person shooter with a brilliant twist: time only moves when you move. Stand still and the world freezes, letting you line up the perfect shot before stepping forward and unleashing chaos. It is a puzzle and a shooter at once.",
      "Because action games live or die on responsiveness, we have optimized controls for keyboard + mouse and gamepad, with low-latency play right in the browser. More fast-paced titles are on the way as the shelf grows.",
      "Free to play, no download — just load up and test your limits.",
    ],
    faqs: [
      {
        question: "Do action games demand high-end hardware?",
        answer:
          "No. They run smoothly in the browser and support keyboard + mouse and gamepad, so a typical PC is more than enough.",
      },
      {
        question: "Do I need to download or install anything?",
        answer:
          "No client required — click and play.",
      },
      {
        question: "Are they all free?",
        answer:
          "Yes, completely free.",
      },
      {
        question: "Can less twitchy players still enjoy them?",
        answer:
          "Yes. In Time Shooter 3, for example, time only flows when you move, so standing still lets you aim calmly — lowering the demand for lightning-fast reactions.",
      },
    ],
  },

  building: {
    intro:
      "Building games hand you a blank canvas and say “make something” — no timers, no game over, just pure creation.",
    paragraphs: [
      "Our building shelf spans styles. Island Builder and Tiny World Builder offer voxel and object placement you can shape endlessly; Iso Middle Earth is an isometric realm painter where you choose a location (Shire, Mordor, Rivendell…), paint terrain, place characters, and export your map as PNG or JSON. All progress auto-saves to your browser.",
      "The appeal is ownership. Unlike puzzle or action titles, there is no “winning” — your satisfaction comes from the world you assemble, tile by tile. It is meditative, open-ended, and great for sparking creativity.",
      "Every builder is free and runs in-browser with no download, so your imagination is the only limit.",
    ],
    faqs: [
      {
        question: "Do building games have a fail state or time limit?",
        answer:
          "No. These games typically have no fail state and no countdown, so you can build freely at your own pace.",
      },
      {
        question: "Do they need to be downloaded?",
        answer:
          "No — they run directly in the browser, nothing to install.",
      },
      {
        question: "Can my creations be saved or exported?",
        answer:
          "Yes. For example, Iso Middle Earth exports your map as a PNG image or JSON project, and progress auto-saves to your browser locally.",
      },
      {
        question: "Are the building games free?",
        answer:
          "All of them are free to play, with no in-app purchases.",
      },
    ],
  },
};

export function getCategoryContent(slug: string): CategoryContent | undefined {
  return CATEGORY_CONTENT[slug];
}

// Canonical site origin used for JSON-LD absolute URLs.
export const SITE_ORIGIN = "https://game.craftisle.com";
