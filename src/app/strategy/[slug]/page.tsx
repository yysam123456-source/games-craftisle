import { games } from "@/data/games";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface StrategyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: StrategyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return {};
  return {
    title: `${game.title} Strategy & Tips | Craftisle Games`,
    description: `Master ${game.title}! Complete strategy guide, tips, tricks and high score tactics. ${game.description}`,
    keywords: [`${game.title} strategy`, `${game.title} tips`, `${game.title} tricks`, game.title, "game guide"],
  };
}

export default async function StrategyPage({ params }: StrategyPageProps) {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return notFound();

  return (
    <main className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <a href="/" className="font-bold text-lg">Craftisle Games</a>
          <div className="hidden md:flex gap-4 text-sm">
            <a href="/" className="hover:underline">All Games</a>
            <a href={`/play/${game.slug}`} className="hover:underline">Play Now</a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-4">
          <a href="/" className="hover:underline">Home</a> / 
          <a href={`/play/${game.slug}`} className="hover:underline">{game.title}</a> / 
          <span>Strategy</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">{game.title} Strategy Guide</h1>
        <p className="text-muted-foreground mb-8">Master game tactics, challenge high scores!</p>

        {/* Game Intro */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Game Intro</h2>
          <div className="bg-card rounded-lg p-6 border">
            <p className="mb-4">{game.description}</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><span className="font-semibold">Category:</span> {game.category}</div>
              <div><span className="font-semibold">Tags:</span> {game.tags.join(", ")}</div>
            </div>
          </div>
        </section>

        {/* How to Play */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
          <div className="bg-card rounded-lg p-6 border">
            <p className="mb-4">{game.instructions}</p>
            {game.controls.keyboard && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Keyboard Controls</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(game.controls.keyboard) ? (
                    (game.controls.keyboard as string[]).map((k: string) => (
                      <span key={k} className="bg-muted px-2 py-1 rounded text-sm">{k}</span>
                    ))
                  ) : (
                    <span className="bg-muted px-2 py-1 rounded text-sm">Keyboard supported</span>
                  )}
                </div>
              </div>
            )}
            {game.controls.mouse && (
              <p className="mt-2 text-sm text-muted-foreground">✅ Mouse supported</p>
            )}
            {game.controls.touch && (
              <p className="mt-1 text-sm text-muted-foreground">✅ Touch supported</p>
            )}
          </div>
        </section>

        {/* Tips & Tactics */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tips & Tactics</h2>
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">Basic Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Get familiar with basic controls, build muscle memory</li>
                <li>Stay focused, observe patterns</li>
                <li>Don't rush, play steadily</li>
                <li>Practice more, improve reaction speed</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">Advanced Strategy</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Analyze game rules, find optimal solutions</li>
                <li>Study high-score player replays</li>
                <li>Master key timing decisions</li>
                <li>Stay calm, avoid mistakes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
          <div className="space-y-4">
            <details className="bg-card rounded-lg p-4 border cursor-pointer">
              <summary className="font-semibold cursor-pointer">Where can I play this game?</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                You can click "Play Now" at the top of this page to play free directly in your browser, no download needed.
              </p>
            </details>
            <details className="bg-card rounded-lg p-4 border cursor-pointer">
              <summary className="font-semibold cursor-pointer">Is this game mobile-friendly?</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                {game.controls.touch ? "✅ Yes! The game is adapted for mobile touch controls." : "Currently optimized for desktop. Keyboard controls recommended for best experience."}
              </p>
            </details>
            <details className="bg-card rounded-lg p-4 border cursor-pointer">
              <summary className="font-semibold cursor-pointer">Is the game free?</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Completely free! You can play all games directly in your browser, no registration or payment required.
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <a
            href={`/play/${game.slug}`}
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Play {game.title} Now →
          </a>
        </section>

        {/* Related Games */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Related Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {games
              .filter((g) => g.slug !== game.slug && g.isActive)
              .slice(0, 4)
              .map((g) => (
                <a
                  key={g.slug}
                  href={`/play/${g.slug}`}
                  className="bg-card rounded-lg p-4 border hover:border-primary transition text-center"
                >
                  <div className="text-4xl mb-2">🎮</div>
                  <div className="font-semibold text-sm">{g.title}</div>
                </a>
              ))}
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
