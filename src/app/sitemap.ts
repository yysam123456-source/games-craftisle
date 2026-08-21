import type { MetadataRoute } from "next";
import { getActiveGames } from "@/data/games";
import { ALL_CATEGORY_SLUGS } from "@/lib/categories";

// Required for `output: 'export'` static builds in Next 16.
export const dynamic = "force-static";

const BASE_URL = "https://games.craftisle.com";

/**
 * Sitemap for games.craftisle.com.
 * Covers the indexable surface: home, category hub, every active game's
 * /play/<slug> detail page, and every /category/<slug> page.
 * Previously MISSING — without it Google discovers game pages far slower,
 * which undercuts the entire topical-authority (T2) effort.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const games = getActiveGames();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const gameRoutes: MetadataRoute.Sitemap = games.map((g) => ({
    url: `${BASE_URL}/play/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = ALL_CATEGORY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...gameRoutes, ...categoryRoutes];
}
