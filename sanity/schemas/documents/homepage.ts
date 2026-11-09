import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "capabilities", title: "Capabilities" },
    { name: "value", title: "Value proposition" },
    { name: "services", title: "Services" },
    { name: "process", title: "Process" },
    { name: "brands", title: "Brands" },
    { name: "why", title: "Why choose us" },
    { name: "blog", title: "Blog preview" },
    { name: "cta", title: "CTA" },
    { name: "testimonials", title: "Testimonials" },
  ],
  fields: [
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroTitle", title: "Headline", type: "string", group: "hero" }),
    defineField({ name: "heroHighlight", title: "Highlighted word", type: "string", group: "hero", description: "Colored word at the end of the headline, e.g. Staffing" }),
    defineField({ name: "heroSubtitle", title: "Subtitle", type: "string", group: "hero" }),
    defineField({ name: "heroBody", title: "Paragraph", type: "text", rows: 5, group: "hero" }),
    defineField({ name: "heroPrimaryCta", title: "Primary button", type: "ctaButton", group: "hero" }),
    defineField({ name: "heroSecondaryCta", title: "Secondary button", type: "ctaButton", group: "hero" }),
    defineField({ name: "heroDashboardImage", title: "Hero banner image (legacy)", type: "siteImage", group: "hero" }),
    defineField({ name: "heroBannerImage", title: "Hero banner image", type: "siteImage", group: "hero" }),

    defineField({ name: "capabilitiesEyebrow", title: "Eyebrow", type: "string", group: "capabilities" }),
    defineField({ name: "capabilitiesTitle", title: "Title", type: "string", group: "capabilities" }),
    defineField({ name: "capabilities", title: "Capability cards", type: "array", group: "capabilities", of: [{ type: "capabilityItem" }] }),

    defineField({ name: "valueEyebrow", title: "Eyebrow", type: "string", group: "value" }),
    defineField({ name: "valueTitle", title: "Title", type: "string", group: "value" }),
    defineField({ name: "valueBody", title: "Paragraph", type: "text", rows: 6, group: "value" }),
    defineField({ name: "valueCta", title: "Button", type: "ctaButton", group: "value" }),
    defineField({ name: "valueImage", title: "Image", type: "siteImage", group: "value" }),

    defineField({ name: "servicesEyebrow", title: "Eyebrow", type: "string", group: "services" }),
    defineField({ name: "servicesTitle", title: "Title", type: "string", group: "services" }),
    defineField({ name: "servicesAside", title: "Aside text", type: "string", group: "services" }),
    defineField({ name: "servicesViewMore", title: "View more link text", type: "string", group: "services" }),
    defineField({ name: "servicesViewMoreHref", title: "View more link", type: "string", group: "services" }),
    defineField({ name: "servicesCardLink", title: "Service card link", type: "string", group: "services", initialValue: "View More" }),

    defineField({ name: "processEyebrow", title: "Eyebrow", type: "string", group: "process" }),
    defineField({ name: "processTitle", title: "Title", type: "string", group: "process" }),
    defineField({ name: "processIntro", title: "Introduction", type: "text", rows: 4, group: "process" }),
    defineField({ name: "processSteps", title: "Steps", type: "array", group: "process", of: [{ type: "processStep" }] }),

    defineField({ name: "brandsEyebrow", title: "Eyebrow", type: "string", group: "brands" }),
    defineField({ name: "brandsTitle", title: "Title", type: "string", group: "brands" }),
    defineField({ name: "brandsBackground", title: "Background image", type: "siteImage", group: "brands" }),
    defineField({ name: "brandLogos", title: "Brand logos", type: "array", group: "brands", of: [{ type: "siteImage" }] }),

    defineField({ name: "whyEyebrow", title: "Eyebrow", type: "string", group: "why" }),
    defineField({ name: "whyTitle", title: "Title", type: "string", group: "why" }),
    defineField({ name: "whyBody", title: "Paragraph", type: "text", rows: 5, group: "why" }),
    defineField({ name: "whyImage", title: "Image", type: "siteImage", group: "why" }),
    defineField({ name: "whyCta", title: "Button", type: "ctaButton", group: "why" }),
    defineField({ name: "whyCards", title: "Cards", type: "array", group: "why", of: [{ type: "whyChooseItem" }] }),

    defineField({ name: "blogEyebrow", title: "Eyebrow", type: "string", group: "blog" }),
    defineField({ name: "blogTitle", title: "Title", type: "string", group: "blog" }),
    defineField({ name: "blogLinkLabel", title: "Explore link label", type: "string", group: "blog" }),

    defineField({ name: "ctaEyebrow", title: "Eyebrow", type: "string", group: "cta" }),
    defineField({ name: "ctaTitle", title: "Title", type: "string", group: "cta" }),
    defineField({ name: "ctaImage", title: "Background image", type: "siteImage", group: "cta" }),
    defineField({ name: "ctaPrimary", title: "Primary button", type: "ctaButton", group: "cta" }),
    defineField({ name: "ctaSecondary", title: "Secondary button", type: "ctaButton", group: "cta" }),

    defineField({ name: "testimonialsEyebrow", title: "Eyebrow", type: "string", group: "testimonials" }),
    defineField({ name: "testimonialsTitle", title: "Title", type: "string", group: "testimonials" }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "testimonials",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
      description: "Managed under Testimonials. Shown only if at least one is published.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
