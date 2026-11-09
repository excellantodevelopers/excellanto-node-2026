import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Sparkles, Tag, User } from "lucide-react";
import { BlogPortableText } from "@/components/blog/portable-text";
import { BlogQueryForm } from "@/components/blog/blog-query-form";
import { BlogShare } from "@/components/blog/blog-share";
import { BlogSidebarRecent } from "@/components/blog/blog-sidebar-recent";
import { SectionImage } from "@/components/ui/section-image";
import { FadeIn } from "@/components/animations/fade-in";
import { estimateReadingTime, formatReadingTime } from "@/lib/blog/reading-time";
import { contentBlockCount } from "@/lib/blog/content";
import type { BlogPost } from "@/lib/sanity/types";

interface BlogDetailContentProps {
  post: BlogPost;
  recentPosts: BlogPost[];
  backLabel: string;
  byPrefix: string;
}

export function BlogDetailContent({
  post,
  recentPosts,
  backLabel,
  byPrefix,
}: BlogDetailContentProps) {
  const readingTime = formatReadingTime(estimateReadingTime(post.content, post.excerpt));
  const hasContent = contentBlockCount(post.content) > 0;

  return (
    <section className="blog-detail-page relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_0%_0%,rgb(29_78_216_/_0.05),transparent_55%),radial-gradient(ellipse_60%_40%_at_100%_20%,rgb(8_145_178_/_0.05),transparent_50%)]" />

      <div className="container-xl relative section-padding !pb-16">
        <FadeIn>
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2 text-sm font-semibold text-muted backdrop-blur-sm transition-all duration-200 hover:border-primary/25 hover:text-primary hover:shadow-[0_8px_24px_-16px_rgb(15_23_42_/_0.12)]"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </FadeIn>

        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,13fr)_minmax(240px,7fr)] lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)] lg:gap-12">
          <main className="min-w-0">
            <FadeIn delay={0.05}>
              <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary shadow-[0_32px_64px_-32px_rgb(15_23_42_/_0.28)]">
                <SectionImage
                  {...post.image}
                  className="aspect-[16/10] w-full lg:aspect-[21/9]"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  priority
                  imgClassName="transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1220]/55 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 md:left-6 md:top-6">
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                    {post.category}
                  </span>
                </div>
              </div>
            </FadeIn>

            <article className="mt-8 md:mt-10">
              <header>
                <div className="mb-5 flex flex-wrap items-center gap-2 md:hidden">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">
                    {post.category}
                  </span>
                </div>

                <h1 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-secondary md:text-4xl lg:text-[2.85rem]">
                  {post.title}
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary/75" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary/75" />
                    {readingTime}
                  </span>
                  {post.author ? (
                    <span className="inline-flex items-center gap-2">
                      <User className="h-4 w-4 text-primary/75" />
                      {byPrefix} {post.author}
                    </span>
                  ) : null}
                </div>

                {post.tags?.length ? (
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <Tag className="h-4 w-4 text-muted" aria-hidden />
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </header>

              <div className="blog-detail-intro mt-8">
                <Sparkles className="blog-detail-intro-icon h-5 w-5 text-primary" aria-hidden />
                <p>{post.excerpt}</p>
              </div>

              <div className="blog-article-body mt-10">
                {hasContent && post.content ? (
                  <BlogPortableText value={post.content} />
                ) : (
                  <div className="space-y-5 text-base leading-8 text-muted">
                    <p>{post.excerpt}</p>
                  </div>
                )}
              </div>

              <div className="mt-12 border-t border-border pt-8">
                <BlogShare title={post.title} slug={post.slug} />
              </div>
            </article>

            <div className="mt-12 space-y-6 lg:hidden">
              <BlogSidebarRecent posts={recentPosts} currentSlug={post.slug} />
              <BlogQueryForm />
            </div>
          </main>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <BlogQueryForm />
              <BlogSidebarRecent posts={recentPosts} currentSlug={post.slug} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
