import { notFound } from "next/navigation";
import { games } from "@/data/games";
import { Metadata } from "next";
import type { Game } from "@/types/game";

interface StrategyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: StrategyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g: Game) => g.slug === slug);

  if (!game) {
    return {
      title: "Game Not Found",
    };
  }

  return {
    title: `${game.title} Strategy & Tips - How to Win | Craftisle Games`,
    description: `Learn the best strategies and tips for ${game.title}. Master the game with our comprehensive guide and improve your score!`,
    keywords: [...game.tags, "strategy", "tips", "guide", game.title],
    alternates: {
      canonical: `/strategy/${game.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `https://games.craftisle.com/strategy/${game.slug}`,
      title: `${game.title} Strategy & Tips - How to Win | Craftisle Games`,
      description: `Learn the best strategies and tips for ${game.title}. Master the game with our comprehensive guide!`,
      siteName: "Craftisle Games",
    },
  };
}

export default async function StrategyPage({ params }: StrategyPageProps) {
  const { slug } = await params;
  const game = games.find((g: Game) => g.slug === slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-4 text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary">Home</a>
        <span className="mx-2">/</span>
        <a href={`/play/${game.slug}`} className="hover:text-primary">{game.title}</a>
        <span className="mx-2">/</span>
        <span>Strategy</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">{game.title} Strategy & Tips</h1>
      <p className="text-muted-foreground mb-6">
        Master {game.title} with our comprehensive strategy guide. Learn the best tips and tricks to improve your score!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Basic Strategy</h2>
          <div className="prose prose-sm max-w-none">
            <p>Coming soon: Detailed strategy guide for {game.title}...</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Advanced Tips</h2>
          <div className="prose prose-sm max-w-none">
            <p>Coming soon: Advanced tips and tricks...</p>
          </div>
        </section>
      </div>

      <section className="mt-8 pt-8 border-t">
        <h2 className="text-2xl font-semibold mb-4">Related Games</h2>
        <p>Coming soon: Links to similar games...</p>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return games.map((game: Game) => ({
    slug: game.slug,
  }));
}
