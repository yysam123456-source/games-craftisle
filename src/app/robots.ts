import type { MetadataRoute } from "next";

// Required for `output: 'export'` static builds in Next 16.
export const dynamic = "force-static";

const BASE_URL = "https://game.craftisle.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
