import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Gamepad2, Link2, HelpCircle } from "lucide-react";
import { getActiveGames } from "@/data/games";
import { GameCard } from "@/components/games/GameCard";
import { getCategoryMeta, getCategoryList, ALL_CATEGORY_SLUGS } from "@/lib/categories";
import { getCategoryContent, SITE_ORIGIN } from "@/data/category-content";
import { JsonLd } from "@/components/JsonLd";

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
  const content = getCategoryContent(slug);
  const label = meta.label;

  const pageUrl = `${SITE_ORIGIN}/category/${slug}/`;

  // JSON-LD: WebPage + BreadcrumbList + FAQPage
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageUrl,
    url: pageUrl,
    name: `${label} Games - Craftisle Games`,
    description: meta.description,
    isPartOf: { "@type": "WebSite", "@id": `${SITE_ORIGIN}/#website` },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "Categories", item: `${SITE_ORIGIN}/categories/` },
      { "@type": "ListItem", position: 3, name: label, item: pageUrl },
    ],
  };

  const faqLd = content
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  // Related categories (silo): every other category links here
  const relatedCategories = getCategoryList().filter((c) => c.slug !== slug);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[120px]" />
      </div>

      {/* Structured data */}
      <JsonLd data={webPageLd} />
      <JsonLd data={breadcrumbLd} />
      {faqLd && <JsonLd data={faqLd} />}

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
            <h1 className="text-3xl md:text-5xl font-extrabold">{label} Games</h1>
            <p className="text-muted-foreground mt-1 max-w-2xl">{meta.description}</p>
            <p className="text-sm text-muted-foreground/70 mt-1">{games.length} games available</p>
          </div>
        </div>

        {/* Guide / intro */}
        {content && (
          <section className="mb-12 max-w-3xl">
            <p className="text-lg text-foreground/90 leading-relaxed font-medium">{content.intro}</p>
            <div className="mt-4 space-y-4">
              {content.paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </section>
        )}

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
            <p className="text-muted-foreground">Check back soon for new {label} games.</p>
          </div>
        )}

        {/* FAQ */}
        {content && content.faqs.length > 0 && (
          <section className="mt-16 max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {content.faqs.map((f, i) => (
                <div key={i} className="rounded-2xl bg-card/60 border border-white/[0.06] p-5">
                  <h3 className="font-semibold text-foreground">{f.question}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related categories (silo internal linking) */}
        <section className="mt-16">
          <div className="flex items-center gap-2 mb-6">
            <Link2 className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Explore Other Categories</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedCategories.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="group flex items-center gap-4 rounded-2xl p-4 bg-card/60 border border-white/[0.06] hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {c.label} Games
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
