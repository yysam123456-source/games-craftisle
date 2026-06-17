import { notFound } from "next/navigation";
import { games } from "@/data/games";
import { GameIframe } from "@/components/games/GameIframe";
import { Metadata } from "next";
import type { Game } from "@/types/game";

interface GamePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g: Game) => g.slug === slug);

  if (!game) {
    return {
      title: "Game Not Found",
    };
  }

  return {
    title: `${game.title} - Play Free Online | Craftisle Games`,
    description: game.description,
    keywords: [...game.tags, "free games", "online games", game.title],
    alternates: {
      canonical: `/play/${game.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `https://games.craftisle.com/play/${game.slug}`,
      title: `${game.title} - Play Free Online | Craftisle Games`,
      description: game.description,
      siteName: "Craftisle Games",
      images: [
        {
          url: `https://games.craftisle.com${game.thumbnail}`,
          width: 1200,
          height: 630,
          alt: `${game.title} - Free Online Game`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} - Play Free Online | Craftisle Games`,
      description: game.description,
      images: [`https://games.craftisle.com${game.thumbnail}`],
    },
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = games.find((g: Game) => g.slug === slug);

  if (!game) {
    notFound();
  }

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.description,
    url: `https://games.craftisle.com/play/${game.slug}`,
    image: `https://games.craftisle.com${game.thumbnail}`,
    genre: game.category,
    gamePlatform: "Web Browser",
    operatingSystem: "Any",
    applicationCategory: "Game",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: game.rating.toString(),
      ratingCount: game.playCount.toString(),
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary">
          Home
        </a>
        <span className="mx-2">/</span>
        <a href={`#${game.category}`} className="hover:text-primary">
          {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
        </a>
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
          <h2 className="text-xl font-semibold mb-4">How to Play</h2>
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
                  Keyboard:{" "}
                  {Array.isArray(game.controls.keyboard)
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
          {game.tags.map((tag: string) => (
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
  return games.map((game: Game) => ({
    slug: game.slug,
  }));
}

// Revalidate every 60 seconds
export const revalidate = 60;
