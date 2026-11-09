import type { BlogContentBlock, BlogExternalImageBlock } from "@/lib/sanity/types";
import fs from "fs";
import path from "path";

export type RefBlogEntry = {
  title?: string;
  headings?: { tag: string; text: string }[];
  paragraphs?: string[];
  images?: string[];
};

export const BLOG_SLUG_TO_URL: Record<string, string> = {
  "seo-vs-aeo-vs-aio-vs-geo-key-differences":
    "https://excellanto.com/seo-vs-aeo-vs-aio-vs-geo-key-differences.htm",
  "ai-seo-and-digital-marketing-agency-delhi":
    "https://excellanto.com/ai-seo-and-digital-marketing-agency-delhi.htm",
  "cyber-security-services-in-new-friends-colony-delhi":
    "https://excellanto.com/cyber-security-services-in-new-friends-colony-delhi.htm",
  "digital-marketing-company-in-east-of-kailash-delhi":
    "https://excellanto.com/digital-marketing-company-in-east-of-kailash-delhi.htm",
  "seo-services-provider-near-govindpuri-delhi":
    "https://excellanto.com/seo-services-provider-near-govindpuri-delhi.htm",
};

const JUNK_TEXT =
  /all rights reserved|hacked by|support@excellanto|connect with excellanto|^tag:|^share:|recent posts|recent comments|quick links|say hello|archives|categories|search|categorys|^\? /i;

let refBlogsCache: Record<string, RefBlogEntry> | null = null;

function getRefBlogs(): Record<string, RefBlogEntry> {
  if (!refBlogsCache) {
    const filePath = path.join(process.cwd(), "scripts", "ref-blogs.json");
    refBlogsCache = JSON.parse(fs.readFileSync(filePath, "utf8")) as Record<string, RefBlogEntry>;
  }
  return refBlogsCache;
}

function isJunk(text: string): boolean {
  return !text?.trim() || text.trim().length < 3 || JUNK_TEXT.test(text.trim());
}

function makeTextBlock(text: string, style: string, key: string): BlogContentBlock {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-span`, text, marks: [] }],
  } as BlogContentBlock;
}

function makeListBlock(text: string, key: string): BlogContentBlock {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-span`, text, marks: [] }],
  } as BlogContentBlock;
}

function makeExternalImageBlock(url: string, alt: string, key: string): BlogExternalImageBlock {
  return {
    _type: "externalImage",
    _key: key,
    url,
    alt,
  };
}

function contentHasStructure(content: BlogContentBlock[] | null | undefined): boolean {
  if (!content?.length) return false;
  return content.some(
    (block) =>
      block._type === "block" &&
      "style" in block &&
      ["h2", "h3", "blockquote"].includes(String(block.style))
  );
}

function contentHasLists(content: BlogContentBlock[] | null | undefined): boolean {
  if (!content?.length) return false;
  return content.some((block) => block._type === "block" && "listItem" in block);
}

export function buildContentFromRefBlogs(slug: string): BlogContentBlock[] {
  const url = BLOG_SLUG_TO_URL[slug];
  if (!url) return [];

  const entry = getRefBlogs()[url];
  if (!entry) return [];

  const blocks: BlogContentBlock[] = [];
  let keyIndex = 0;
  const nextKey = () => `${slug}-ref-${keyIndex++}`;

  const headings = (entry.headings || []).filter(
    (heading) =>
      ["h2", "h3", "h4"].includes(heading.tag) &&
      !isJunk(heading.text) &&
      heading.text.length <= 140
  );

  const paragraphs = (entry.paragraphs || [])
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 30 && !isJunk(paragraph))
    .filter((paragraph) => {
      const matchedHeadings = headings.filter(
        (heading) => heading.tag === "h2" && paragraph.includes(heading.text)
      );
      return matchedHeadings.length < 3;
    });

  let imageInserted = false;

  for (let index = 0; index < paragraphs.length; index += 1) {
    const paragraph = paragraphs[index];
    const matchedHeading = headings.find(
      (heading) =>
        paragraph === heading.text ||
        paragraph.startsWith(`${heading.text} `) ||
        paragraph.startsWith(heading.text)
    );

    if (matchedHeading) {
      blocks.push(
        makeTextBlock(
          matchedHeading.text,
          matchedHeading.tag === "h2" ? "h2" : "h3",
          nextKey()
        )
      );
      const remainder = paragraph.slice(matchedHeading.text.length).trim();
      if (remainder.length > 40) {
        blocks.push(makeTextBlock(remainder, "normal", nextKey()));
      }
      continue;
    }

    if (paragraph.endsWith(":") && paragraph.length < 180) {
      const listItems: string[] = [];
      let cursor = index + 1;
      while (cursor < paragraphs.length) {
        const candidate = paragraphs[cursor];
        if (
          candidate.length > 130 ||
          candidate.endsWith(".") ||
          headings.some((heading) => candidate.startsWith(heading.text))
        ) {
          break;
        }
        listItems.push(candidate);
        cursor += 1;
        if (listItems.length >= 6) break;
      }

      if (listItems.length >= 2) {
        blocks.push(makeTextBlock(paragraph, "normal", nextKey()));
        for (const item of listItems) {
          blocks.push(makeListBlock(item, nextKey()));
        }
        index = cursor - 1;
        continue;
      }
    }

    blocks.push(makeTextBlock(paragraph, "normal", nextKey()));

    if (!imageInserted && entry.images?.[0] && blocks.length >= 3) {
      blocks.push(
        makeExternalImageBlock(
          entry.images[0],
          entry.title?.replace(/\s*-\s*Excellanto.*$/i, "") || "Blog illustration",
          nextKey()
        )
      );
      imageInserted = true;
    }
  }

  for (const heading of headings) {
    const exists = blocks.some(
      (block) =>
        block._type === "block" &&
        "children" in block &&
        block.children?.[0] &&
        "text" in block.children[0] &&
        block.children[0].text === heading.text
    );
    if (!exists && heading.tag === "h2") {
      blocks.push(makeTextBlock(heading.text, "h2", nextKey()));
    }
  }

  return blocks;
}

export function resolveBlogContent(
  slug: string,
  sanityContent?: BlogContentBlock[] | null
): BlogContentBlock[] {
  const refContent = buildContentFromRefBlogs(slug);
  const sanityBlocks = sanityContent?.filter(Boolean) ?? [];

  if (refContent.length > 0) {
    const sanityIsRich =
      contentHasStructure(sanityBlocks) &&
      sanityBlocks.length >= refContent.length * 0.75;
    if (!sanityIsRich) return refContent;
  }

  if (sanityBlocks.length > 0) return sanityBlocks;
  return refContent;
}

export function contentBlockCount(content: BlogContentBlock[] | undefined): number {
  if (!content?.length) return 0;
  return content.filter((block) => block._type === "block" || block._type === "externalImage")
    .length;
}

export function sanityContentIsUsable(content: BlogContentBlock[] | null | undefined): boolean {
  return contentBlockCount(content ?? []) > 0;
}

export { contentHasLists, contentHasStructure };
