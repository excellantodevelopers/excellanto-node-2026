import type { Metadata } from "next";
import { getAllPublishedBlogs } from "@/lib/sanity/blog-service";
import { getBlogPage } from "@/lib/cms/content";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogEmptyState } from "@/components/blog/blog-empty-state";
import { PageHero } from "@/components/ui/page-hero";
import { CTA } from "@/components/sections/cta";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/fade-in";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PageBreadcrumbSchema } from "@/components/seo/page-schemas";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBlogPage();
  return buildPageMetadata({
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.title,
    path: "/blog",
    image: page.heroImage,
  });
}

export default async function BlogPage() {
  const [blogs, page] = await Promise.all([getAllPublishedBlogs(), getBlogPage()]);
  const [featured, ...rest] = blogs;

  return (
    <>
      <PageBreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: page.title, path: "/blog" },
        ]}
      />
      <PageHero eyebrow={page.eyebrow} title={page.title} image={page.heroImage} />

      <section className="section-padding bg-surface">
        <div className="container-xl space-y-12">
          {blogs.length === 0 ? (
            <BlogEmptyState message={page.emptyMessage} />
          ) : (
            <>
              {featured ? (
                <FadeIn>
                  <BlogCard
                    post={featured}
                    readMoreLabel={page.readMoreLabel}
                    variant="featured"
                    priority
                  />
                </FadeIn>
              ) : null}

              {rest.length > 0 ? (
                <div>
                  <FadeIn>
                    <div className="mb-8 border-b border-border pb-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                        All articles
                      </p>
                      <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-secondary md:text-3xl">
                        More from the blog
                      </h2>
                    </div>
                  </FadeIn>
                  <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post) => (
                      <StaggerItem key={post.slug}>
                        <BlogCard post={post} readMoreLabel={page.readMoreLabel} />
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
