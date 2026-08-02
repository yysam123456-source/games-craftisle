import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { getGamesByCategory, getActiveGames } from "@/data/games";
import { GameCard } from "@/components/games/GameCard";
import { getCategoryMeta, ALL_CATEGORY_SLUGS } from "@/lib/categories";

export function generateStaticParams() {
  return ALL_CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = getCategoryMeta(slug);
  const label = meta?.label || slug;
  return {
    title: `${label} Games - Craftisle Games`,
    description: meta?.description || `Play free ${label} games online at Craftisle Games.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getCategoryMeta(slug);
  if (!meta) notFound();

  const games = getActiveGames().filter((g) => g.category === slug);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        {/* Breadcrumb / back */}
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> All Categories
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <meta.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold">{meta.label} Games</h1>
            <p className="text-muted-foreground mt-1 max-w-2xl">{meta.description}</p>
            <p className="text-sm text-muted-foreground/70 mt-1">{games.length} games available</p>
          </div>
        </div>

        {/* Games grid */}
        {games.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game, i) => (
              <GameCard key={game.slug} game={game} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Gamepad2 className="w-14 h-14 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No games yet</h2>
            <p className="text-muted-foreground">Check back soon for new {meta.label} games.</p>
          </div>
        )}
      </div>
    </div>
  );
}
