import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/cms/content";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const base = settings.url.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/industries"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
