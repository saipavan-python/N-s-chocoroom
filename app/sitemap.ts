import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL;
  if (!siteUrl) return [];
  return [{ url: new URL("/", siteUrl).toString(), changeFrequency: "monthly", priority: 1 }];
}

