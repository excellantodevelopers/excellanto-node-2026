import type { BlogContentBlock } from "@/lib/sanity/types";

function blocksToPlainText(blocks: BlogContentBlock[] | undefined): string {
  if (!blocks?.length) return "";

  return blocks
    .map((block) => {
      if (block._type !== "block" || !("children" in block) || !block.children) return "";
      return block.children
        .map((child) => ("text" in child ? child.text || "" : ""))
        .join("");
    })
    .join(" ");
}

export function estimateReadingTime(
  content: BlogContentBlock[] | undefined,
  excerpt?: string
): number {
  const text = blocksToPlainText(content) || excerpt || "";
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
