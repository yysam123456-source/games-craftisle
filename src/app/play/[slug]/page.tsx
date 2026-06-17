import { notFound } from "next/navigation";
import { games, getRelatedGames } from "@/data/games";
import { GameIframe } from "@/components/games/GameIframe";
import { Metadata } from "next";
import type { Game } from "@/types/game";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fs from "fs";
import path from "path";

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

  // Read game guide markdown file
  let gameGuide = "";
  try {
    const mdPath = path.join(process.cwd(), "src", "content", "games", `${slug}.md`);
    gameGuide = fs.readFileSync(mdPath, "utf-8");
  } catch (err) {
    console.warn(`No game guide found for ${slug}`);
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
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

      {/* Game Title & Meta Info */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <h1 className="text-4xl font-bold">{game.title}</h1>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {game.category}
          </span>
          {game.featured && (
            <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 rounded-full text-sm font-medium">
              ⭐ Featured
            </span>
          )}
        </div>
      </div>

      {/* Game Meta Info */}
      <div className="flex flex-wrap gap-6 mb-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>⭐</span>
          <span><strong>{game.rating}</strong> / 5.0</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🎮</span>
          <span>{game.playCount.toLocaleString()} plays</span>
        </div>
        {game.difficulty && (
          <div className="flex items-center gap-2">
            <span>📊</span>
            <span>Difficulty: {game.difficulty}</span>
          </div>
        )}
        {game.estimatedTime && (
          <div className="flex items-center gap-2">
            <span>⏱️</span>
            <span>{game.estimatedTime}</span>
          </div>
        )}
      </div>

      {/* Short Description */}
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        {game.description}
      </p>

      {/* Game Iframe */}
      <div className="mb-12">
        <GameIframe game={game} />
      </div>

      {/* Game Guide Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Content: Instructions & Long Description */}
        <div className="lg:col-span-2 space-y-8">
          {/* How to Play */}
          <section className="bg-card rounded-xl p-6 border">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>📖</span> How to Play
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-lg leading-relaxed">{game.instructions}</p>
            </div>
          </section>

          {/* Detailed Game Guide (Markdown) */}
          {gameGuide && (
            <section className="bg-card rounded-xl p-6 border">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span>📚</span> Complete Game Guide
              </h2>
              <div className="prose prose-sm max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-p:leading-relaxed prose-a:text-primary prose-strong:font-semibold prose-ul:list-disc prose-ol:list-decimal">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {gameGuide}
                </ReactMarkdown>
              </div>
            </section>
          )}

          {/* How to Play */}
        </div>

        {/* Sidebar: Controls & Info */}
        <div className="space-y-6">
          {/* Controls */}
          <section className="bg-card rounded-xl p-6 border">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>🎮</span> Controls
            </h3>
            <div className="space-y-3">
              {game.controls.keyboard && (
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⌨️</span>
                  <div>
                    <div className="font-medium">Keyboard</div>
                    <div className="text-sm text-muted-foreground">
                      {Array.isArray(game.controls.keyboard)
                        ? game.controls.keyboard.join(", ")
                        : "Supported"}
                    </div>
                  </div>
                </div>
              )}
              {game.controls.mouse && (
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🖱️</span>
                  <div>
                    <div className="font-medium">Mouse</div>
                    <div className="text-sm text-muted-foreground">Supported</div>
                  </div>
                </div>
              )}
              {game.controls.touch && (
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <div className="font-medium">Touch</div>
                    <div className="text-sm text-muted-foreground">Mobile friendly</div>
                  </div>
                </div>
              )}
              {game.controls.gamepad && (
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎮</span>
                  <div>
                    <div className="font-medium">Gamepad</div>
                    <div className="text-sm text-muted-foreground">Controller supported</div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Tags */}
          <section className="bg-card rounded-xl p-6 border">
            <h3 className="text-xl font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-secondary/80 transition cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Share */}
          <section className="bg-card rounded-xl p-6 border">
            <h3 className="text-xl font-bold mb-4">Share This Game</h3>
            <div className="flex gap-3">
              <a
                href={`mailto:?subject=Check out ${game.title}&body=Play free online: https://games.craftisle.com/play/${game.slug}`}
                className="flex-1 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition text-center"
              >
                📧 Email
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=Check out ${game.title} - free online!&url=${encodeURIComponent(`https://games.craftisle.com/play/${game.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 bg-[#1DA1F2] text-white rounded-lg text-sm font-medium hover:opacity-90 transition text-center"
              >
                🐦 Twitter
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Related Games */}
      {relatedGames.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>🎮</span> Related Games
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedGames.map((relatedGame: Game) => (
              <a
                key={relatedGame.id}
                href={`/play/${relatedGame.slug}`}
                className="bg-card rounded-xl overflow-hidden border hover:border-primary transition group"
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={relatedGame.thumbnail}
                    alt={relatedGame.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                    <span className="text-white font-medium">Play Now →</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1">{relatedGame.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relatedGame.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Comments Placeholder */}
      <section className="bg-card rounded-xl p-6 border">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>💬</span> Comments
        </h2>
        <div className="text-center py-8 text-muted-foreground">
          <p className="mb-2">Comments coming soon!</p>
          <p className="text-sm">Sign in to leave a comment and rate this game.</p>
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
