import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailContent } from "@/components/blog/blog-detail-content";
import {
  getAllPublishedBlogs,
  getBlogBySlug,
  getPublishedBlogSlugs,
} from "@/lib/sanity/blog-service";
import { getBlogPage, getSiteSettings } from "@/lib/cms/content";
import { CTA } from "@/components/sections/cta";
import { buildPageMetadata, getSiteBaseUrl } from "@/lib/seo/metadata";
import { PageBreadcrumbSchema } from "@/components/seo/page-schemas";
import { JsonLd, blogPostingSchema } from "@/lib/seo/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post, page] = await Promise.all([getBlogBySlug(slug), getBlogPage()]);
  if (!post) return { title: page.articleFallbackTitle };

  return buildPageMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.publishedAt,
    authors: post.author ? [post.author] : undefined,
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, page, recentPosts, settings, baseUrl] = await Promise.all([
    getBlogBySlug(slug),
    getBlogPage(),
    getAllPublishedBlogs(),
    getSiteSettings(),
    getSiteBaseUrl(),
  ]);
  if (!post) notFound();

  const pageUrl = `${baseUrl}/blog/${post.slug}`;
  const imageUrl = post.image.src.startsWith("http")
    ? post.image.src
    : `${baseUrl}${post.image.src.startsWith("/") ? post.image.src : `/${post.image.src}`}`;

  return (
    <>
      <PageBreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: page.title, path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <JsonLd
        data={blogPostingSchema({
          title: post.seoTitle || post.title,
          description: post.seoDescription || post.excerpt,
          url: pageUrl,
          image: imageUrl,
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          author: post.author,
          publisher: settings.name,
          publisherLogo: `${baseUrl}/images/excellanto-favicon.png`,
        })}
      />
      <BlogDetailContent
        post={post}
        recentPosts={recentPosts}
        backLabel={page.backToBlog}
        byPrefix={page.byPrefix}
      />

      <CTA />
    </>
  );
}
