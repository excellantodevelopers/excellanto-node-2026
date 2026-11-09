import type { MetadataRoute } from "next";
import { getAllPublishedBlogs } from "@/lib/sanity/blog-service";
import { getServices, getSiteSettings } from "@/lib/cms/content";

function parseDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, services, blogs] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getAllPublishedBlogs(),
  ]);
  const base = settings.url.replace(/\/$/, "");

  const staticRoutes = [
    "",
    "/services",
    "/about",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms-condition",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blogs.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: parseDate(b.publishedAt) ?? new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
