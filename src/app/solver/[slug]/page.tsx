import { notFound } from "next/navigation";
import { games } from "@/data/games";
import { Metadata } from "next";
import type { Game } from "@/types/game";

interface SolverPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: SolverPageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g: Game) => g.slug === slug);

  if (!game) {
    return {
      title: "Game Not Found",
    };
  }

  return {
    title: `${game.title} Solver & Answers | Craftisle Games`,
    description: `Get help with ${game.title}. Find solutions, hints, and answers to improve your gameplay.`,
    keywords: [...game.tags, "solver", "answers", "hints", game.title],
    alternates: {
      canonical: `/solver/${game.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `https://games.craftisle.com/solver/${game.slug}`,
      title: `${game.title} Solver & Answers | Craftisle Games`,
      description: `Get help with ${game.title}. Find solutions and hints!`,
      siteName: "Craftisle Games",
    },
  };
}

export default async function SolverPage({ params }: SolverPageProps) {
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
        <span>Solver</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">{game.title} Solver & Answers</h1>
      <p className="text-muted-foreground mb-6">
        Need help with {game.title}? Find solutions, hints, and answers here.
      </p>

      <div className="bg-card rounded-lg p-8 border text-center">
        <p className="text-muted-foreground mb-4">
          Solver tool coming soon...
        </p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return games.map((game: Game) => ({
    slug: game.slug,
  }));
}
