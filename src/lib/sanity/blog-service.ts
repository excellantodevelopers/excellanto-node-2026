import {
  allPublishedBlogsQuery,
  blogBySlugQuery,
  blogsByCategoryQuery,
  latestBlogsQuery,
  publishedBlogSlugsQuery,
} from "./queries";
import { sanityFetch, isSanityConfigured } from "./client";
import { getBlogImageFromSanity } from "./image";
import { resolveBlogContent } from "@/lib/blog/content";
import type { BlogPost, SanityBlogDetail, SanityBlogListItem } from "./types";

function formatPublishedDate(isoDate: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
}

function mapBlogListItem(post: SanityBlogListItem, imageWidth = 1200): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: formatPublishedDate(post.publishedDate),
    publishedAt: post.publishedDate,
    category: post.category ?? "Blog",
    author: post.author ?? undefined,
    tags: post.tags ?? undefined,
    image: getBlogImageFromSanity(
      post.featuredImage,
      post.featuredImageAlt || post.title,
      imageWidth
    ),
    seoTitle: post.seoTitle ?? undefined,
    seoDescription: post.seoDescription ?? undefined,
  };
}

function mapBlogDetail(post: SanityBlogDetail): BlogPost {
  return {
    ...mapBlogListItem(post, 1600),
    content: resolveBlogContent(post.slug, post.content ?? undefined),
  };
}

export async function getAllPublishedBlogs(): Promise<BlogPost[]> {
  if (!isSanityConfigured()) return [];

  const result = await sanityFetch<SanityBlogListItem[]>(allPublishedBlogsQuery);
  if (!result?.length) return [];

  return result.map((post) => mapBlogListItem(post));
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured() || !slug) return null;

  const result = await sanityFetch<SanityBlogDetail | null>(blogBySlugQuery, { slug });
  if (!result) return null;

  return mapBlogDetail(result);
}

export async function getBlogsByCategory(categorySlug: string): Promise<BlogPost[]> {
  if (!isSanityConfigured() || !categorySlug) return [];

  const result = await sanityFetch<SanityBlogListItem[]>(blogsByCategoryQuery, {
    categorySlug,
  });
  if (!result?.length) return [];

  return result.map((post) => mapBlogListItem(post));
}

export async function getLatestBlogs(limit = 3): Promise<BlogPost[]> {
  if (!isSanityConfigured()) return [];

  const result = await sanityFetch<SanityBlogListItem[]>(latestBlogsQuery, { limit });
  if (!result?.length) return [];

  return result.map((post) => mapBlogListItem(post, 900));
}

export async function getRelatedBlogs(currentSlug: string, limit = 3): Promise<BlogPost[]> {
  const all = await getAllPublishedBlogs();
  return all.filter((post) => post.slug !== currentSlug).slice(0, limit);
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) return [];

  const result = await sanityFetch<{ slug: string }[]>(publishedBlogSlugsQuery);
  if (!result?.length) return [];

  return result.map((item) => item.slug).filter(Boolean);
}
