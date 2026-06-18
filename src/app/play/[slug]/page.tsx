import { notFound } from "next/navigation";
import { games, getRelatedGames } from "@/data/games";
import { GameDetailClient } from "./GameDetailClient";
import type { Game } from "@/types/game";
import fs from "fs";
import path from "path";

interface GamePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: GamePageProps) {
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
    keywords: [...game.tags, "free games", "online games", game.title, "play online", "free browser game"],
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

  // Read game guide markdown file (server-side only)
  let gameGuide = "";
  try {
    const mdPath = path.join(process.cwd(), "src", "content", "games", `${slug}.md`);
    gameGuide = fs.readFileSync(mdPath, "utf-8");
  } catch {
    // No guide found, that's ok
  }

  const relatedGames = getRelatedGames(slug, 4);

  // JSON-LD Structured Data
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

  // Pass all data to the client component for animated rendering
  return (
    <GameDetailClient
      game={game}
      gameGuide={gameGuide}
      relatedGames={relatedGames}
      jsonLd={jsonLd}
    />
  );
}

// Generate static paths for all games
export async function generateStaticParams() {
  return games.map((game: Game) => ({
    slug: game.slug,
  }));
}
