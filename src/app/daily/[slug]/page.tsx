import { games } from "@/data/games";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Game } from "@/types/game";

interface DailyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const DAILY_GAMES = ["messenger", "samsy-ninja"];

export async function generateMetadata({ params }: DailyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return {};
  return {
    title: `Game of the Day: ${game.title} | Craftisle Games`,
    description: `Play today's featured games including ${game.title}! New challenges every day.`,
    keywords: [game.title, "daily game", "free online game", "game of the day", "samsy ninja", "messenger"],
    alternates: {
      canonical: `/daily/${game.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `https://games.craftisle.com/daily/${game.slug}`,
      title: `Game of the Day: ${game.title} | Craftisle Games`,
      description: `Play today's featured games including ${game.title}!`,
      siteName: "Craftisle Games",
    },
    twitter: {
      card: "summary_large_image",
      title: `Game of the Day: ${game.title} | Craftisle Games`,
      description: `Play today's featured games including ${game.title}!`,
    },
  };
}

export default async function DailyPage({ params }: DailyPageProps) {
  const { slug } = await params;
  const primaryGame = games.find(g => g.slug === slug);
  if (!primaryGame) return notFound();

  const secondarySlug = DAILY_GAMES.find(s => s !== primaryGame.slug) || DAILY_GAMES[1];
  const secondaryGame = games.find(g => g.slug === secondarySlug);
  if (!secondaryGame) return notFound();

  const featuredGames: Game[] = [primaryGame, secondaryGame];

  // Generate daily challenge seed based on date (deterministic, same result on same day)
  const today = new Date();
  const daySeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const dayNumber = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) / 86400000) + 1;

  return (
    <main className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <a href="/" className="font-bold text-lg">Craftisle Games</a>
          <div className="hidden md:flex gap-4 text-sm">
            <a href="/" className="hover:underline">All Games</a>
            <a href={`/play/${primaryGame.slug}`} className="hover:underline">Play {primaryGame.title}</a>
            {secondaryGame && (
              <a href={`/play/${secondaryGame.slug}`} className="hover:underline">Play {secondaryGame.title}</a>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-4">
          <a href="/" className="hover:underline">Home</a> / 
          <a href={`/daily/${primaryGame.slug}`} className="hover:underline">Daily Challenge</a>
        </div>

        {/* Daily Challenge Header */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 border mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🎯</span>
            <div>
              <h1 className="text-3xl font-bold">Game of the Day</h1>
              <p className="text-muted-foreground">Day #{dayNumber} · {today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </div>
          <p className="text-lg mb-6">
            Two featured experiences today! Explore both games and challenge yourself.
          </p>

          {/* Featured Games Grid */}
          <div className="grid grid-cols-2 gap-4">
            {featuredGames.map((game) => (
              <a
                key={game.slug}
                href={`/play/${game.slug}`}
                className="group block bg-background/70 backdrop-blur-sm rounded-lg border hover:border-primary transition overflow-hidden"
              >
                <div className="relative h-28 w-full overflow-hidden">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-1.5 py-0.5 bg-black/60 text-white text-[10px] rounded font-medium capitalize">
                      {game.category}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-base font-bold mb-1 group-hover:text-primary transition">{game.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{game.description}</p>
                  <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs font-semibold group-hover:opacity-90 transition">
                    Play →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Today's Challenge Rules */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Today's Rules</h2>
          <div className="bg-card rounded-lg p-6 border space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📋</span>
              <div>
                <h3 className="font-semibold">Challenge Goal</h3>
                <p className="text-sm text-muted-foreground mt-1">Explore both featured games and complete their unique experiences. Enjoy the journey!</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⏱️</span>
              <div>
                <h3 className="font-semibold">Time Limit</h3>
                <p className="text-sm text-muted-foreground mt-1">No strict time limit. Play at your own pace and discover both worlds.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <h3 className="font-semibold">Scoring</h3>
                <p className="text-sm text-muted-foreground mt-1">Multi-dimensional scoring: exploration, interaction quality, and creative discovery.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="font-semibold">Today's Hint</h3>
                <p className="text-sm text-muted-foreground mt-1">{getDailyTip("casual", "Daily", dayNumber)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Past Challenges */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Past Challenges</h2>
          <div className="bg-card rounded-lg p-6 border">
            <p className="text-muted-foreground mb-4">View past daily challenge records:</p>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 14 }, (_, i) => {
                const d = new Date(today);
                d.setDate(d.getDate() - 13 + i);
                const isToday = i === 13;
                const isFuture = d > today;
                return (
                  <a
                    key={i}
                    href={isFuture ? "#" : `/daily/${primaryGame.slug}`}
                    className={`text-center p-2 rounded-lg text-sm transition ${
                      isToday
                        ? "bg-primary text-primary-foreground font-bold"
                        : isFuture
                        ? "bg-muted/30 text-muted-foreground/50 cursor-not-allowed"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <div className="text-xs opacity-70">{d.toLocaleDateString("en-US", { weekday: "short" })}</div>
                    <div className="font-medium">{d.getDate()}</div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leaderboard Preview */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Today's Leaderboard</h2>
          <div className="bg-card rounded-lg p-6 border">
            <div className="space-y-3">
              {[
                { rank: 1, name: "🥇 PlayerOne", score: 12500, time: "02:34" },
                { rank: 2, name: "🥈 GameMaster", score: 12450, time: "03:12" },
                { rank: 3, name: "🥉 SpeedRunner", score: 12380, time: "03:45" },
                { rank: 4, name: "ProGamer_2026", score: 12200, time: "04:01" },
                { rank: 5, name: "CasualPlayer", score: 12050, time: "05:20" },
              ].map((entry) => (
                <div key={entry.rank} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <span className="w-8 h-8 flex items-center justify-center bg-background rounded-full font-bold text-sm">
                    {entry.rank}
                  </span>
                  <span className="flex-1 font-medium">{entry.name}</span>
                  <span className="font-mono font-bold text-primary">{entry.score.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">{entry.time}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Your score will appear here after completing today's challenge!
            </p>
          </div>
        </section>

        {/* Challenge Stats */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Days Played", value: "0", icon: "📅" },
              { label: "High Score", value: "-", icon: "🏆" },
              { label: "Avg Score", value: "-", icon: "📊" },
              { label: "Best Rank", value: "-", icon: "🏅" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-lg p-4 border text-center">
                <span className="text-2xl">{stat.icon}</span>
                <div className="text-2xl font-bold mt-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/play/${primaryGame.slug}`}
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Play {primaryGame.title} →
            </a>
            <a
              href={`/play/${secondaryGame.slug}`}
              className="inline-block bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-80 transition"
            >
              Play {secondaryGame.title} →
            </a>
          </div>
        </section>

        {/* Related Links */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">More Content</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <a href={`/play/${primaryGame.slug}`} className="bg-card rounded-lg p-4 border hover:border-primary transition text-center">
              <span className="text-2xl">🎮</span>
              <div className="text-sm font-medium mt-2">Play {primaryGame.title}</div>
            </a>
            <a href={`/play/${secondaryGame.slug}`} className="bg-card rounded-lg p-4 border hover:border-primary transition text-center">
              <span className="text-2xl">🥷</span>
              <div className="text-sm font-medium mt-2">Play {secondaryGame.title}</div>
            </a>
            <a href={`/strategy/${primaryGame.slug}`} className="bg-card rounded-lg p-4 border hover:border-primary transition text-center">
              <span className="text-2xl">📖</span>
              <div className="text-sm font-medium mt-2">Strategy</div>
            </a>
            <a href={`/archive/${primaryGame.slug}`} className="bg-card rounded-lg p-4 border hover:border-primary transition text-center">
              <span className="text-2xl">📚</span>
              <div className="text-sm font-medium mt-2">Archive</div>
            </a>
            <a href={`/alternatives/${primaryGame.slug}`} className="bg-card rounded-lg p-4 border hover:border-primary transition text-center">
              <span className="text-2xl">🔗</span>
              <div className="text-sm font-medium mt-2">Alternatives</div>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

// Generate static paths
export async function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}

// ===== Helper Functions =====

function getDailyDescription(category: string): string {
  const descriptions: Record<string, string> = {
    puzzle: "A new puzzle or sudoku every day, test your logic skills!",
    arcade: "Today's level difficulty upgraded, can you break your record?",
    casual: "Fun daily tasks, complete to earn achievement badges!",
    strategy: "Strategic daily challenge, requires careful planning!",
    action: "Fast-paced daily challenge, test your reaction and skill limits!",
  };
  return descriptions[category] || "What new challenge awaits you today? Start playing to find out!";
}

function getDailyGoal(category: string, title: string): string {
  if (title.includes("2048")) return "Goal: merge tiles to create the target number within limited moves.";
  if (title.toLowerCase().includes("wordle") || title.toLowerCase().includes("word")) return "Guess: guess today's mystery word in fewest attempts.";
  if (title.toLowerCase().includes("tetris")) return "Clear goal: clear specified number of rows while staying alive.";
  if (title.toLowerCase().includes("snake")) return "Length goal: grow the snake to specified length without hitting walls.";
  if (title.toLowerCase().includes("sudoku")) return "Solve goal: complete today's expert-level sudoku puzzle.";
  if (title.toLowerCase().includes("minesweeper")) return "Mine goal: mark all mine positions within time limit.";
  if (title.toLowerCase().includes("flappy")) return "Pass goal: navigate through more pipes, beat yesterday's record.";
  if (title.toLowerCase().includes("chess")) return "Tactical goal: find the best solution for today's endgame.";

  const goals: Record<string, string> = {
    puzzle: "Solve today's puzzle under given constraints.",
    arcade: "Beat yesterday's score, set a new record!",
    casual: "Complete all fun daily tasks.",
    strategy: "Achieve today's goal with optimal strategy.",
    action: "Complete the challenge in shortest time.",
  };
  return goals[category] || "Complete today's challenge goal.";
}

function getTimeLimit(category: string): string {
  const limits: Record<string, string> = {
    puzzle: "No time limit, fewer moves = higher score.",
    arcade: "No time limit, pursue highest score.",
    casual: "Casual mode, play at your own pace.",
    strategy: "Recommended: complete thinking within 10 minutes.",
    action: "Timed mode, faster = better!",
  };
  return limits[category] || "No strict time limit, just do your best.";
}

function getScoringCriteria(category: string): string {
  const criteria: Record<string, string> = {
    puzzle: "⭐ Fewer moves = ⭐⭐  Shorter time = ⭐⭐⭐  Zero hints",
    arcade: "Based on final score and combo bonuses.",
    casual: "Comprehensive scoring: task completion + quality.",
    strategy: "Rated on strategy efficiency and result quality.",
    action: "Shortest time wins, measured in milliseconds.",
  };
  return criteria[category] || "Multi-dimensional scoring: performance, speed, accuracy.";
}

function getDailyTip(category: string, title: string, dayNumber: number): string {
  const tips: Record<string, string[]> = {
    puzzle: [
      "Start with the most constrained cells first.",
      "Use elimination to narrow down possibilities.",
      "If stuck, revisit known conditions from a new angle.",
    ],
    arcade: [
      "Maintain rhythm, don't make mistakes from rushing.",
      "Observe pattern rules, anticipate next changes.",
      "Warm up with a few rounds before the real challenge.",
    ],
    casual: [
      "Relax and enjoy the process.",
      "Try different approaches for unexpected fun.",
      "Challenging with friends makes it more fun!",
    ],
    strategy: [
      "Plan the overall strategy first, then execute specific steps.",
      "Weigh short-term gains vs long-term benefits.",
      "Review past decisions, find areas to improve.",
    ],
    action: [
      "Stay focused, avoid distractions.",
      "Find the operation rhythm that suits you.",
      "Remember the strategy for key moments.",
    ],
  };

  const categoryTips = tips[category] || tips.casual!;
  // Deterministically select hint using dayNumber
  return categoryTips[dayNumber % categoryTips.length];
}

function getMockScore(category: string): number {
  const scores: Record<string, number> = {
    puzzle: 9800,
    arcade: 12500,
    casual: 7500,
    strategy: 10200,
    action: 15800,
  };
  return scores[category] || 10000;
}
