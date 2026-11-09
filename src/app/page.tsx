import { Hero } from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { ValueProp } from "@/components/sections/value-prop";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Brands } from "@/components/sections/brands";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { BlogPreview } from "@/components/sections/blog-preview";
import { CTA } from "@/components/sections/cta";
import { Testimonials } from "@/components/sections/testimonials";
import { getLatestBlogs } from "@/lib/sanity/blog-service";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/cms/content";
import { buildPageMetadata, getSiteBaseUrl } from "@/lib/seo/metadata";
import { JsonLd, webPageSchema } from "@/lib/seo/schema";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildPageMetadata({
    title: settings.seoTitle || `${settings.name} | AI-Powered IT Solutions & Staffing`,
    description: settings.seoDescription || settings.description,
    path: "/",
  });
}

export default async function HomePage() {
  const [latestBlogs, settings, baseUrl] = await Promise.all([
    getLatestBlogs(6),
    getSiteSettings(),
    getSiteBaseUrl(),
  ]);

  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: settings.seoTitle || `${settings.name} | AI-Powered IT Solutions & Staffing`,
          description: settings.seoDescription || settings.description,
          url: baseUrl,
        })}
      />
      <Hero />
      <Capabilities />
      <ValueProp />
      <Services />
      <Process />
      <Brands />
      <WhyChooseUs />
      <Testimonials />
      <BlogPreview posts={latestBlogs} />
      <CTA />
    </>
  );
}
