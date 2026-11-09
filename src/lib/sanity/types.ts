import type { PortableTextBlock } from "@portabletext/react";

type SanityImageSource = unknown;

export type BlogExternalImageBlock = {
  _type: "externalImage";
  _key: string;
  url: string;
  alt: string;
};

export type BlogContentBlock = PortableTextBlock | BlogExternalImageBlock;

export type SanityBlogListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedDate: string;
  category: string | null;
  author: string | null;
  featuredImage: SanityImageSource | null;
  featuredImageAlt?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  tags?: string[] | null;
};

export type SanityBlogDetail = SanityBlogListItem & {
  content?: PortableTextBlock[] | null;
};

/** Normalized shape consumed by existing blog UI components. */
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  publishedAt?: string;
  category: string;
  author?: string;
  tags?: string[];
  image: {
    src: string;
    alt: string;
  };
  content?: BlogContentBlock[];
  seoTitle?: string;
  seoDescription?: string;
};
