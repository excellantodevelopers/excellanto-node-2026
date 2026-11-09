import { getSiteSettings } from "@/lib/cms/content";
import type { CmsService } from "@/lib/cms/types";
import { getSiteBaseUrl } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";

export async function ServicePageSchemas({ service }: { service: CmsService }) {
  const [baseUrl, settings] = await Promise.all([getSiteBaseUrl(), getSiteSettings()]);
  const pageUrl = `${baseUrl}/services/${service.slug}`;
  const image = service.image?.src
    ? `${baseUrl}${service.image.src.startsWith("/") ? service.image.src : `/${service.image.src}`}`
    : undefined;

  return (
    <JsonLd
      data={[
        breadcrumbSchema(baseUrl, [
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]),
        serviceSchema({
          name: service.title,
          description: service.seoDescription || service.description,
          url: pageUrl,
          provider: settings.name,
          image,
        }),
      ]}
    />
  );
}

export async function PageBreadcrumbSchema({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const baseUrl = await getSiteBaseUrl();
  return <JsonLd data={breadcrumbSchema(baseUrl, items)} />;
}
