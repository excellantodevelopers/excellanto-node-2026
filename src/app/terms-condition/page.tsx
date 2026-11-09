import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { FadeIn } from "@/components/animations/fade-in";
import { BlogPortableText } from "@/components/blog/portable-text";
import { getLegalPage } from "@/lib/cms/content";
import type { PortableTextBlock } from "@portabletext/react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PageBreadcrumbSchema } from "@/components/seo/page-schemas";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("terms-condition");
  if (!page) return { title: "Terms & Conditions" };
  return buildPageMetadata({
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.description,
    path: "/terms-condition",
  });
}

export default async function TermsPage() {
  const page = await getLegalPage("terms-condition");
  if (!page) notFound();

  return (
    <>
      <PageBreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: page.title, path: "/terms-condition" },
        ]}
      />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />
      <section className="section-padding bg-white">
        <div className="container-xl max-w-3xl space-y-6">
          <FadeIn>
            {page.content?.length ? (
              <BlogPortableText value={page.content as PortableTextBlock[]} />
            ) : null}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
