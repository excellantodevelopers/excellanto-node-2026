import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getServices, getServicesPage } from "@/lib/cms/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionImage } from "@/components/ui/section-image";
import { CTA } from "@/components/sections/cta";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/fade-in";
import { PageHero } from "@/components/ui/page-hero";
import { getCmsIcon } from "@/lib/cms/icons";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PageBreadcrumbSchema } from "@/components/seo/page-schemas";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicesPage();
  return buildPageMetadata({
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.title,
    path: "/services",
    image: page.heroImage,
  });
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([getServicesPage(), getServices()]);

  return (
    <>
      <PageBreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: page.title, path: "/services" },
        ]}
      />
      <PageHero
        variant="banner"
        eyebrow={page.eyebrow}
        title={page.title}
        image={page.heroImage}
      />

      <section className="section-padding bg-surface">
        <div className="container-xl space-y-16">
          {page.categories.map((category, catIndex) => {
            const items = services.filter((s) => s.category === category.id);
            if (!items.length) return null;
            return (
              <div key={category.id}>
                <FadeIn>
                  <SectionHeading
                    align="left"
                    eyebrow={page.categoryEyebrow}
                    title={category.title}
                    className="mb-8 max-w-2xl"
                  />
                </FadeIn>

                <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((service) => {
                    const Icon = getCmsIcon(service.iconName);
                    return (
                      <StaggerItem key={service.slug}>
                        <article className="pro-card group flex h-full flex-col overflow-hidden">
                          <SectionImage
                            {...service.image}
                            className="aspect-[16/10]"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                          <div className="flex flex-1 flex-col p-5">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-primary">
                              <Icon className="h-5 w-5" />
                            </div>
                            <h2 className="font-display text-lg font-bold tracking-tight text-secondary">
                              {service.title}
                            </h2>
                            <p className="mt-2.5 flex-1 text-sm leading-6 text-muted">
                              {service.description}
                            </p>
                            <ul className="mt-4 space-y-2">
                              {service.features.slice(0, 3).map((f) => (
                                <li
                                  key={f}
                                  className="flex items-start gap-2 text-xs leading-5 text-muted"
                                >
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                            <Link
                              href={`/services/${service.slug}`}
                              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                            >
                              {service.cardLinkLabel || page.cardLinkLabel}
                              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                          </div>
                        </article>
                      </StaggerItem>
                    );
                  })}
                </Stagger>

                {catIndex === 0 && (
                  <p className="sr-only">{services.length} services available</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <CTA />
    </>
  );
}
