import { createImageUrlBuilder } from "@sanity/image-url";
import { getSanityClient } from "./client";

type SanityImageSource = unknown;

const fallbackBlogImage =
  "https://excellanto.com/wp-content/uploads/2026/05/Digital-Marketing.jpeg";

export function buildSanityImageUrl(
  source: SanityImageSource | null | undefined,
  width: number,
  options?: { height?: number; quality?: number }
): string {
  const client = getSanityClient();
  if (!client || !source) return fallbackBlogImage;

  let builder = createImageUrlBuilder(client).image(source as never).width(width).auto("format");

  if (options?.height) {
    builder = builder.height(options.height);
  }

  if (options?.quality) {
    builder = builder.quality(options.quality);
  }

  return builder.url();
}

export function buildSanityImageUrlOrNull(
  source: SanityImageSource | null | undefined,
  width: number,
  options?: { height?: number; quality?: number }
): string | null {
  const client = getSanityClient();
  if (!client || !source) return null;

  try {
    let builder = createImageUrlBuilder(client).image(source as never).width(width).auto("format");
    if (options?.height) builder = builder.height(options.height);
    if (options?.quality) builder = builder.quality(options.quality);
    return builder.url() || null;
  } catch {
    return null;
  }
}
export function getBlogImageFromSanity(
  source: SanityImageSource | null | undefined,
  alt: string,
  width = 1200
): { src: string; alt: string } {
  return {
    src: buildSanityImageUrl(source, width, { quality: 85 }),
    alt: alt || "Excellanto blog article",
  };
}
