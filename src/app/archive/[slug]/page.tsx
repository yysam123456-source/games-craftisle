import { notFound } from "next/navigation";
import { games } from "@/data/games";
import { Metadata } from "next";
import type { Game } from "@/types/game";

interface ArchivePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArchivePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g: Game) => g.slug === slug);

  if (!game) {
    return {
      title: "Game Not Found",
    };
  }

  return {
    title: `${game.title} Archive & History | Craftisle Games`,
    description: `Browse ${game.title} archive and history. View past challenges and solutions.`,
    keywords: [...game.tags, "archive", "history", game.title],
    alternates: {
      canonical: `/archive/${game.slug}`,
    },
  };
}

export default async function ArchivePage({ params }: ArchivePageProps) {
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
        <span>Archive</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">{game.title} Archive</h1>
      <p className="text-muted-foreground mb-6">
        Browse {game.title} archive and history.
      </p>

      <div className="bg-card rounded-lg p-8 border text-center">
        <p className="text-muted-foreground mb-4">
          Archive coming soon...
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
