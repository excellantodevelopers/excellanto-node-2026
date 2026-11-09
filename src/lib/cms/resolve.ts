import type { SiteImage } from "@/lib/images";
import { serviceBannerImages } from "@/lib/images";
import { buildSanityImageUrlOrNull } from "@/lib/sanity/image";

export type CmsImageValue = {
  image?: unknown;
  url?: string | null;
  alt?: string | null;
} | null;

export function resolveCmsImage(
  value: CmsImageValue | undefined,
  fallback: SiteImage,
  width = 1600
): SiteImage {
    const uploaded = buildSanityImageUrlOrNull(value?.image as never, width, { quality: 85 });
  const src = uploaded || value?.url || fallback.src;
  return {
    src,
    alt: value?.alt || fallback.alt,
  };
}

/** Always use the local service banner — CMS must not override hero/banner images. */
export function resolveServiceBannerImage(
  slug: string,
  value: CmsImageValue | undefined,
  fallback: SiteImage
): SiteImage {
  const local = serviceBannerImages[slug];
  if (local) {
    return {
      src: local.src,
      alt: pickText(value?.alt ?? undefined, local.alt || fallback.alt),
    };
  }
  return resolveCmsImage(value, fallback);
}

const LEGACY_HERO_IMAGE_PREFIXES = ["/images/ai/", "hero-dashboard-preview"];

export function resolveHeroBanner(
  raw: Record<string, unknown>,
  fallback: SiteImage
): SiteImage {
  if (raw.heroBannerImage) {
    return resolveCmsImage(raw.heroBannerImage as CmsImageValue, fallback);
  }

  const legacy = raw.heroDashboardImage as CmsImageValue;
  const legacyUrl = legacy?.url || "";
  const usesLegacyAsset = LEGACY_HERO_IMAGE_PREFIXES.some((prefix) => legacyUrl.includes(prefix));

  if (legacy && !usesLegacyAsset) {
    return resolveCmsImage(legacy, fallback);
  }

  return fallback;
}

export function pickText(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

export function pickArray<T>(value: T[] | null | undefined, fallback: T[]): T[] {
  return value && value.length > 0 ? value : fallback;
}
