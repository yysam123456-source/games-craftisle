import { games } from "@/data/games";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface AlternativesPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: AlternativesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return {};
  return {
    title: `Games Like ${game.title} | Craftisle Games`,
    description: `Discover great free web games similar to ${game.title}! Curated recommendations, free online play.`,
    keywords: [`games like ${game.title}`, `${game.title} alternatives`, "similar games", game.title],
  };
}

export default async function AlternativesPage({ params }: AlternativesPageProps) {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return notFound();

  // Same category recommendations (exclude self)
  const sameCategory = games.filter(g => g.category === game.category && g.slug !== game.slug);
  const otherGames = games.filter(g => g.slug !== game.slug && g.isActive).slice(0, 8);

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
          <span>Alternatives</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">Games Like {game.title}</h1>
        <p className="text-muted-foreground mb-8">
          Discover more free web games of the same type. No download, click to play.
        </p>

        {/* Same Category Recommendations */}
        {sameCategory.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Same Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sameCategory.map((g) => (
                <a
                  key={g.slug}
                  href={`/play/${g.slug}`}
                  className="bg-card rounded-lg p-4 border hover:border-primary transition text-center"
                >
                  <div className="text-4xl mb-2">🎮</div>
                  <div className="font-semibold text-sm">{g.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{g.category}</div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* More Recommendations */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">More Free Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherGames.map((g) => (
              <a
                key={g.slug}
                href={`/play/${g.slug}`}
                className="bg-card rounded-lg p-4 border hover:border-primary transition text-center"
              >
                <div className="text-4xl mb-2">🎮</div>
                <div className="font-semibold text-sm">{g.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{g.category}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Why Play on Craftisle Games */}
        <section className="bg-muted/50 rounded-lg p-6 text-sm text-muted-foreground">
          <h3 className="font-semibold text-foreground mb-2">Why Play on Craftisle Games?</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>✅ 100% free, no registration</li>
            <li>✅ Click and play, no download</li>
            <li>✅ Supports mobile, tablet, desktop</li>
            <li>✅ New content daily</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <a
            href={`/play/${game.slug}`}
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Back to {game.title} →
          </a>
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
