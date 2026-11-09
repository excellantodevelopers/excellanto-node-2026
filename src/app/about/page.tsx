import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { AboutPageSections } from "@/components/sections/about-page-sections";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Process } from "@/components/sections/process";
import { CTA } from "@/components/sections/cta";
import { getAboutPage } from "@/lib/cms/content";
import { buildPageMetadata, getSiteBaseUrl } from "@/lib/seo/metadata";
import { PageBreadcrumbSchema } from "@/components/seo/page-schemas";
import { JsonLd, webPageSchema } from "@/lib/seo/schema";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  return buildPageMetadata({
    title: about.seoTitle || about.title,
    description: about.seoDescription || about.intro,
    path: "/about",
    image: about.heroImage,
  });
}

export default async function AboutPage() {
  const [about, baseUrl] = await Promise.all([getAboutPage(), getSiteBaseUrl()]);

  return (
    <>
      <PageBreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: about.title, path: "/about" },
        ]}
      />
      <JsonLd
        data={webPageSchema({
          name: about.seoTitle || about.title,
          description: about.seoDescription || about.intro,
          url: `${baseUrl}/about`,
        })}
      />
      <PageHero
        variant="banner"
        eyebrow={about.eyebrow}
        title={about.title}
        description={about.intro}
        image={about.heroImage}
        showCtas={false}
        showBrandName={false}
        imageUnoptimized
      />

      <AboutPageSections about={about} />

      <div className="border-t border-border/80">
        <WhyChooseUs />
      </div>
      <Process />
      <CTA />
    </>
  );
}
