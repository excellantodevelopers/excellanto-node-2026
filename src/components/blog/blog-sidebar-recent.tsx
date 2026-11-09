import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { SectionImage } from "@/components/ui/section-image";
import type { BlogPost } from "@/lib/sanity/types";

interface BlogSidebarRecentProps {
  posts: BlogPost[];
  currentSlug: string;
}

export function BlogSidebarRecent({ posts, currentSlug }: BlogSidebarRecentProps) {
  const items = posts.filter((post) => post.slug !== currentSlug).slice(0, 5);
  if (!items.length) return null;

  return (
    <div className="blog-sidebar-card">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
            Stay informed
          </p>
          <h2 className="font-display mt-1 text-lg font-bold tracking-tight text-secondary">
            Recent Insights
          </h2>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          View all
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <ul className="space-y-3">
        {items.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex gap-3 rounded-xl border border-transparent p-2 transition-all duration-200 hover:border-border hover:bg-surface/80 hover:shadow-[0_8px_24px_-16px_rgb(15_23_42_/_0.12)]"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-white">
                <SectionImage
                  {...post.image}
                  className="h-full w-full"
                  sizes="64px"
                  imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex-1 py-0.5">
                <p className="font-display text-sm font-bold leading-snug tracking-tight text-secondary transition-colors group-hover:text-primary line-clamp-2">
                  {post.title}
                </p>
                <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-muted">
                  <Calendar className="h-3 w-3 shrink-0" />
                  {post.date}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
