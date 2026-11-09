import Link from "next/link";
import { ArrowUpRight, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionImage } from "@/components/ui/section-image";
import type { BlogPost } from "@/lib/sanity/types";

export type BlogCardVariant = "grid" | "featured" | "horizontal";

interface BlogCardProps {
  post: BlogPost;
  readMoreLabel?: string;
  variant?: BlogCardVariant;
  className?: string;
  priority?: boolean;
}

export function BlogCard({
  post,
  readMoreLabel = "Read more",
  variant = "grid",
  className,
  priority = false,
}: BlogCardProps) {
  const href = `/blog/${post.slug}`;

  if (variant === "featured") {
    return (
      <article
        className={cn(
          "pro-card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-[0_24px_48px_-24px_rgb(15_23_42_/_0.18)]",
          className
        )}
      >
        <Link href={href} className="relative block overflow-hidden">
          <SectionImage
            {...post.image}
            className="aspect-[16/9] w-full md:aspect-[21/9]"
            sizes="(max-width: 1024px) 100vw, 1200px"
            priority={priority}
            imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1220]/70 via-[#0b1220]/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <BlogMeta post={post} light />
            <h2 className="font-display mt-4 max-w-3xl text-2xl font-bold tracking-tight text-white transition-colors md:text-3xl lg:text-4xl">
              {post.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 line-clamp-2 md:text-base">
              {post.excerpt}
            </p>
          </div>
        </Link>
        <div className="flex items-center justify-between gap-4 border-t border-border bg-white px-6 py-4 md:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Featured article
          </span>
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            {readMoreLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article
        className={cn(
          "group grid gap-4 overflow-hidden sm:grid-cols-[10rem_1fr] sm:gap-5",
          className
        )}
      >
        <Link href={href} className="pro-card block overflow-hidden">
          <SectionImage
            {...post.image}
            className="aspect-[16/10] w-full sm:aspect-square sm:h-full"
            sizes="(max-width: 640px) 100vw, 160px"
            imgClassName="transition-transform duration-500 group-hover:scale-[1.05]"
          />
        </Link>
        <div className="flex min-w-0 flex-col justify-center py-1">
          <BlogMeta post={post} compact />
          <h3 className="font-display mt-2 text-base font-bold leading-snug tracking-tight text-secondary transition-colors group-hover:text-primary md:text-lg">
            <Link href={href}>{post.title}</Link>
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted line-clamp-2">{post.excerpt}</p>
          <Link
            href={href}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            {readMoreLabel}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "pro-card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-24px_rgb(15_23_42_/_0.15)]",
        className
      )}
    >
      <Link href={href} className="relative block overflow-hidden">
        <SectionImage
          {...post.image}
          className="aspect-[16/10]"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={priority}
          imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <BlogMeta post={post} />
        <h2 className="font-display mt-3 text-lg font-bold leading-snug tracking-tight text-secondary transition-colors group-hover:text-primary md:text-xl">
          <Link href={href}>{post.title}</Link>
        </h2>
        <p className="mt-2.5 flex-1 text-sm leading-6 text-muted line-clamp-3">{post.excerpt}</p>
        {post.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-surface px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          {readMoreLabel}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}

function BlogMeta({
  post,
  light = false,
  compact = false,
}: {
  post: BlogPost;
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 text-[11px]",
        light ? "text-white/90" : "text-muted",
        compact && "gap-2"
      )}
    >
      <span
        className={cn(
          "rounded-md px-2 py-1 font-semibold uppercase tracking-[0.06em]",
          light ? "bg-white/15 text-white backdrop-blur-sm" : "bg-surface text-primary"
        )}
      >
        {post.category}
      </span>
      <span className={cn("inline-flex items-center gap-1", light && "text-slate-200")}>
        <Calendar className="h-3.5 w-3.5 shrink-0" />
        {post.date}
      </span>
      {post.author && !compact ? (
        <span className={cn("inline-flex items-center gap-1", light && "text-slate-200")}>
          <User className="h-3.5 w-3.5 shrink-0" />
          {post.author}
        </span>
      ) : null}
    </div>
  );
}
