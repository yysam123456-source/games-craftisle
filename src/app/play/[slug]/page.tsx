import { notFound } from "next/navigation";
import { games } from "@/data/games";
import { GameIframe } from "@/components/games/GameIframe";
import { Metadata } from "next";

interface GamePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);

  if (!game) {
    return {
      title: "Game Not Found",
    };
  }

  return {
    title: `${game.title} - Play Free Online | Craftisle Games`,
    description: game.description,
    keywords: [...game.tags, "free games", "online games", game.title],
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary">Home</a>
        <span className="mx-2">/</span>
        <span>{game.title}</span>
      </nav>

      {/* Game Title */}
      <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
      <p className="text-muted-foreground mb-6">{game.description}</p>

      {/* Game Iframe */}
      <div className="mb-8">
        <GameIframe game={game} />
      </div>

      {/* Game Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Instructions */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <div className="prose prose-sm max-w-none">
            <p>{game.instructions}</p>
          </div>
        </section>

        {/* Controls */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Controls</h2>
          <div className="space-y-2">
            {game.controls.keyboard && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">⌨️</span>
                <span>
                  Keyboard: {Array.isArray(game.controls.keyboard)
                    ? game.controls.keyboard.join(", ")
                    : "Supported"}
                </span>
              </div>
            )}
            {game.controls.mouse && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">🖱️</span>
                <span>Mouse: Supported</span>
              </div>
            )}
            {game.controls.touch && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <span>Touch: Supported</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Tags */}
      <section className="mt-8 pt-8 border-t">
        <h2 className="text-xl font-semibold mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

// Generate static paths
export async function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}
