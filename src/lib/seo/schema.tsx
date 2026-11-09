type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload.length === 1 ? payload[0] : payload) }}
    />
  );
}

type OrganizationSchemaInput = {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  sameAs?: string[];
};

export function organizationSchema(input: OrganizationSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name,
    url: input.url,
    ...(input.logo && { logo: input.logo }),
    ...(input.description && { description: input.description }),
    ...(input.email && { email: input.email }),
    ...(input.phone && { telephone: input.phone }),
    ...(input.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: input.address,
        addressCountry: "IN",
      },
    }),
    ...(input.sameAs?.length && { sameAs: input.sameAs }),
  };
}

export function websiteSchema(name: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
  };
}

export function breadcrumbSchema(
  baseUrl: string,
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  url: string;
  provider: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    provider: {
      "@type": "Organization",
      name: input.provider,
    },
    ...(input.image && { image: input.image }),
  };
}

export function blogPostingSchema(input: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  publisher: string;
  publisherLogo?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url: input.url,
    mainEntityOfPage: input.url,
    ...(input.image && { image: input.image }),
    ...(input.datePublished && { datePublished: input.datePublished }),
    ...(input.dateModified && { dateModified: input.dateModified }),
    ...(input.author && {
      author: { "@type": "Person", name: input.author },
    }),
    publisher: {
      "@type": "Organization",
      name: input.publisher,
      ...(input.publisherLogo && {
        logo: { "@type": "ImageObject", url: input.publisherLogo },
      }),
    },
  };
}

export function webPageSchema(input: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: input.url,
  };
}
