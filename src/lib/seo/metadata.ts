import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/cms/content";
import { defaultSettings } from "@/lib/cms/defaults";
import type { SiteImage } from "@/lib/images";
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT } from "@/lib/seo/constants";

export type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path including leading slash, e.g. `/about` or `/` */
  path: string;
  image?: string | SiteImage | { url: string; alt?: string };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
  includeCanonical?: boolean;
};

function resolveAbsoluteUrl(baseUrl: string, value: string): string {
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${baseUrl}${value.startsWith("/") ? value : `/${value}`}`;
}

export async function getSiteBaseUrl(): Promise<string> {
  const settings = await getSiteSettings();
  return settings.url || defaultSettings.url;
}

export async function buildPageMetadata(input: PageMetadataInput): Promise<Metadata> {
  const settings = await getSiteSettings();
  const baseUrl = settings.url || defaultSettings.url;
  const canonical = resolveAbsoluteUrl(baseUrl, input.path === "/" ? "/" : input.path);

  const imagePath =
    typeof input.image === "string"
      ? input.image
      : input.image && "src" in input.image
        ? input.image.src
        : input.image && "url" in input.image
          ? input.image.url
          : DEFAULT_OG_IMAGE;
  const imageAlt =
    input.image && typeof input.image === "object"
      ? "alt" in input.image && input.image.alt
        ? input.image.alt
        : "url" in input.image && input.image.alt
          ? input.image.alt
          : DEFAULT_OG_IMAGE_ALT
      : DEFAULT_OG_IMAGE_ALT;
  const imageUrl = resolveAbsoluteUrl(baseUrl, imagePath);

  const sharedOpenGraph = {
    locale: "en_US" as const,
    url: canonical,
    siteName: settings.name,
    title: input.title,
    description: input.description,
    images: [{ url: imageUrl, alt: imageAlt, width: 1200, height: 630 }],
  };

  const openGraph: Metadata["openGraph"] =
    input.type === "article"
      ? {
          ...sharedOpenGraph,
          type: "article",
          publishedTime: input.publishedTime,
          modifiedTime: input.modifiedTime,
          authors: input.authors,
          tags: input.tags,
        }
      : {
          ...sharedOpenGraph,
          type: "website",
        };

  return {
    title:
      input.path === "/"
        ? { absolute: input.title }
        : input.title,
    description: input.description,
    ...(input.includeCanonical !== false && { alternates: { canonical } }),
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [imageUrl],
    },
    ...(input.noIndex
      ? { robots: { index: false, follow: false } }
      : { robots: { index: true, follow: true } }),
  };
}
