import { games } from "@/data/games";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ArchivePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArchivePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return {};
  return {
    title: `${game.title} Archive & Daily Challenges | Craftisle Games`,
    description: `Browse ${game.title} archive and daily challenges. Free online, no download.`,
    keywords: [`${game.title} archive`, `${game.title} daily`, "daily challenge", game.title],
  };
}

// Generate mock history records
function generateHistory(gameSlug: string) {
  const dates = [];
  for (let i = 30; i >= 1; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push({
      date: d.toISOString().split("T")[0],
      number: `#${Math.floor(Math.random() * 1000) + 1}`,
      difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
      solved: Math.random() > 0.3,
    });
  }
  return dates;
}

export default async function ArchivePage({ params }: ArchivePageProps) {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return notFound();

  const history = generateHistory(game.slug);

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
          <span>Archive</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">{game.title} Archive</h1>
        <p className="text-muted-foreground mb-8">
          Browse the past 30 days of daily challenges. Free online.
        </p>

        {/* Today's Challenge CTA */}
        <section className="mb-8 text-center">
          <a
            href={`/play/${game.slug}`}
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Start Today's Challenge →
          </a>
        </section>

        {/* History List */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Challenge History</h2>
          <div className="space-y-2">
            {history.map((item, idx) => (
              <div
                key={idx}
                className="bg-card rounded-lg p-4 border flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground w-24">{item.date}</span>
                  <span className="font-semibold">{item.number}</span>
                  <span
                    className={
                      item.difficulty === "Easy"
                        ? "text-green-600"
                        : item.difficulty === "Medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }
                  >
                    {item.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {item.solved && (
                    <span className="text-green-600 text-xs">Passed ✓</span>
                  )}
                  <a
                    href={`/play/${game.slug}`}
                    className="text-primary hover:underline text-xs"
                  >
                    Challenge
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notes */}
        <section className="mt-8 bg-muted/50 rounded-lg p-6 text-sm text-muted-foreground">
          <p>📅 Daily challenges update at 00:00 Beijing Time.</p>
          <p>💡 Past challenges are free forever, replay anytime.</p>
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
