import { games } from "@/data/games";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface SolverPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: SolverPageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return {};
  return {
    title: `${game.title} Solver & Answers | Craftisle Games`,
    description: `Online ${game.title} solver! Auto-calculate answers, hints, and solutions. ${game.description}`,
    keywords: [`${game.title} solver`, `${game.title} answers`, `${game.title} hints`, game.title, "game solver"],
  };
}

// Return solver tips based on game category
function getSolverTips(category: string): string {
  if (category === "puzzle") return "Start with the most constrained area, gradually narrow down options.";
  if (category === "arcade") return "Master the rhythm, anticipate obstacles, maintain smooth control.";
  if (category === "casual") return "Be patient, observe patterns, don't rush.";
  if (category === "strategy") return "Plan 3 steps ahead, weigh trade-offs, choose optimal solutions.";
  return "Practice more, master the game patterns.";
}

export default async function SolverPage({ params }: SolverPageProps) {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return notFound();

  const tips = getSolverTips(game.category);

  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <a href="/" className="font-bold text-lg">Craftisle Games</a>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-sm text-muted-foreground mb-4">
          <a href="/" className="hover:underline">Home</a> / 
          <a href={`/play/${game.slug}`} className="hover:underline">{game.title}</a> / 
          <span>Solver</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">{game.title} Solver</h1>
        <p className="text-muted-foreground mb-8">Auto-calculate answers online, supports hints and step-by-step solutions.</p>

        {/* How to Use */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
          <div className="bg-card rounded-lg p-6 border space-y-3 text-sm">
            <p>① When stuck in the game, record the current state</p>
            <p>② Input the current state on this page</p>
            <p>③ Click "Calculate Answer" to get complete solution steps</p>
            <p>④ View hints (no spoilers)</p>
          </div>
        </section>

        {/* Online Solver Tool (Static Demo) */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Online Solver</h2>
          <div className="bg-card rounded-lg p-8 border text-center">
            <p className="text-muted-foreground mb-4">
              When stuck in the game, record the current state and use this solver to get hints.
            </p>
            <div className="bg-muted rounded p-4 text-sm text-left">
              <p className="font-semibold mb-2">Hint:</p>
              <p>{tips}</p>
            </div>
          </div>
        </section>

        {/* Solver Tips */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Solver Tips</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <details key={n} className="bg-card rounded-lg p-4 border cursor-pointer">
                <summary className="font-semibold cursor-pointer">Tip {n}</summary>
                <p className="mt-2 text-sm text-muted-foreground">
                  {n === 1 && "Start with the most constrained area, gradually narrow down options."}
                  {n === 2 && "Mark confirmed answers to avoid repeated guesses."}
                  {n === 3 && "Use elimination to remove impossible options."}
                  {n === 4 && "Practice more, remember common patterns and rules."}
                  {n === 5 && "Stay calm, don't rush, play steadily."}
                </p>
              </details>
            ))}
          </div>
        </section>

        <div className="text-center py-8">
          <a
            href={`/play/${game.slug}`}
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Back to {game.title} →
          </a>
        </div>
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
