import { BlogCard } from "@/components/blog/blog-card";
import { FadeIn } from "@/components/animations/fade-in";
import type { BlogPost } from "@/lib/sanity/types";

interface BlogRelatedProps {
  posts: BlogPost[];
  title?: string;
  readMoreLabel?: string;
}

export function BlogRelated({
  posts,
  title = "Recent Articles",
  readMoreLabel = "Read more",
}: BlogRelatedProps) {
  if (!posts.length) return null;

  return (
    <section className="border-t border-border bg-surface section-padding !pt-14">
      <div className="container-xl">
        <FadeIn>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                Keep reading
              </p>
              <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-secondary md:text-3xl">
                {title}
              </h2>
            </div>
          </div>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <FadeIn key={post.slug}>
              <BlogCard post={post} readMoreLabel={readMoreLabel} variant="grid" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
