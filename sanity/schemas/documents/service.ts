import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "../objects/iconName";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  orderings: [orderRankOrdering],
  groups: [
    { name: "main", title: "Overview", default: true },
    { name: "page", title: "Service page" },
    { name: "mobile", title: "Mobile app page" },
    { name: "website", title: "Website page" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "main", validation: (Rule) => Rule.required() }),
    defineField({ name: "shortTitle", title: "Short title (menus)", type: "string", group: "main" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "main",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "main",
      options: {
        list: [
          { title: "Development", value: "development" },
          { title: "AI, Cloud & Consulting", value: "ai-cloud" },
          { title: "Digital Marketing", value: "marketing" },
          { title: "Staffing", value: "talent" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      group: "main",
      options: { list: ICON_OPTIONS },
    }),
    defineField({ name: "featured", title: "Show on homepage", type: "boolean", group: "main", initialValue: false }),
    defineField({ name: "sortOrder", title: "Display order", type: "number", group: "main", initialValue: 0 }),
    orderRankField({ type: "service", hidden: true }),
    defineField({ name: "megaDescription", title: "Mega menu description", type: "string", group: "main" }),
    defineField({ name: "description", title: "Short description", type: "text", rows: 4, group: "main" }),
    defineField({ name: "image", title: "Image", type: "siteImage", group: "main" }),
    defineField({ name: "detailIntro", title: "Detail introduction", type: "text", rows: 5, group: "page" }),
    defineField({ name: "features", title: "Features", type: "array", group: "page", of: [{ type: "string" }] }),
    defineField({ name: "bannerEyebrow", title: "Banner eyebrow", type: "string", group: "page" }),
    defineField({ name: "backLabel", title: "Back link label", type: "string", group: "page", initialValue: "Services" }),
    defineField({ name: "cardLinkLabel", title: "Card link label", type: "string", group: "page", initialValue: "View More" }),
    defineField({ name: "sidebarTitle", title: "Sidebar title", type: "string", group: "page" }),
    defineField({ name: "sidebarBody", title: "Sidebar text", type: "text", rows: 3, group: "page" }),
    defineField({ name: "sidebarCta", title: "Sidebar button", type: "ctaButton", group: "page" }),
    defineField({ name: "pageCta", title: "Page button", type: "ctaButton", group: "page" }),

    defineField({
      name: "mobileHeroEyebrow",
      title: "Hero eyebrow",
      type: "string",
      group: "mobile",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "mobile-app-development",
    }),
    defineField({
      name: "mobileHeroTitle",
      title: "Hero title",
      type: "string",
      group: "mobile",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "mobile-app-development",
    }),
    defineField({
      name: "mobileHeroImage",
      title: "Hero image",
      type: "siteImage",
      group: "mobile",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "mobile-app-development",
    }),
    defineField({
      name: "mobileWhyChoose",
      title: "Why choose cards",
      type: "array",
      group: "mobile",
      of: [{ type: "titledBody" }],
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "mobile-app-development",
    }),
    defineField({
      name: "mobileProcessEyebrow",
      title: "Process eyebrow",
      type: "string",
      group: "mobile",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "mobile-app-development",
    }),
    defineField({
      name: "mobileProcessTitle",
      title: "Process title",
      type: "string",
      group: "mobile",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "mobile-app-development",
    }),
    defineField({
      name: "mobileProcessIntro",
      title: "Process intro",
      type: "text",
      rows: 4,
      group: "mobile",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "mobile-app-development",
    }),
    defineField({
      name: "mobileProcessSteps",
      title: "Process steps",
      type: "array",
      group: "mobile",
      of: [{ type: "processStep" }],
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "mobile-app-development",
    }),
    defineField({
      name: "mobileBrandsTitle",
      title: "Brands title",
      type: "string",
      group: "mobile",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "mobile-app-development",
    }),
    defineField({
      name: "mobileIndustriesEyebrow",
      title: "Industries eyebrow",
      type: "string",
      group: "mobile",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "mobile-app-development",
    }),
    defineField({
      name: "mobileIndustriesTitle",
      title: "Industries title",
      type: "string",
      group: "mobile",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "mobile-app-development",
    }),
    defineField({
      name: "mobileIndustriesIntro",
      title: "Industries intro",
      type: "text",
      rows: 4,
      group: "mobile",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "mobile-app-development",
    }),
    defineField({
      name: "mobileIndustriesImage",
      title: "Industries image",
      type: "siteImage",
      group: "mobile",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "mobile-app-development",
    }),
    defineField({
      name: "mobileIndustries",
      title: "Industries",
      type: "array",
      group: "mobile",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: ICON_OPTIONS },
            }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "mobile-app-development",
    }),

    defineField({
      name: "websiteHeroEyebrow",
      title: "Hero eyebrow",
      type: "string",
      group: "website",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "website-development",
    }),
    defineField({
      name: "websiteHeroTitle",
      title: "Hero title",
      type: "string",
      group: "website",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "website-development",
    }),
    defineField({
      name: "websiteHeroImage",
      title: "Hero image",
      type: "siteImage",
      group: "website",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "website-development",
    }),
    defineField({
      name: "websiteOfferingsTitle",
      title: "Offerings title",
      type: "string",
      group: "website",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "website-development",
    }),
    defineField({
      name: "websiteOfferings",
      title: "Offerings",
      type: "array",
      group: "website",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Text", type: "text", rows: 3 }),
            defineField({ name: "image", title: "Image", type: "siteImage" }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "website-development",
    }),
    defineField({
      name: "websiteWhyTitle",
      title: "Why choose title",
      type: "string",
      group: "website",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "website-development",
    }),
    defineField({
      name: "websiteWhyChoose",
      title: "Why choose cards",
      type: "array",
      group: "website",
      of: [{ type: "titledBody" }],
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "website-development",
    }),
    defineField({
      name: "websiteProcessSteps",
      title: "Process steps",
      type: "array",
      group: "website",
      of: [{ type: "processStep" }],
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "website-development",
    }),
    defineField({
      name: "websiteRedesignEyebrow",
      title: "Redesign eyebrow",
      type: "string",
      group: "website",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "website-development",
    }),
    defineField({
      name: "websiteRedesignTitle",
      title: "Redesign title",
      type: "string",
      group: "website",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "website-development",
    }),
    defineField({
      name: "websiteRedesignItems",
      title: "Redesign items",
      type: "array",
      group: "website",
      of: [{ type: "string" }],
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "website-development",
    }),
    defineField({
      name: "websiteRedesignImage",
      title: "Redesign image",
      type: "siteImage",
      group: "website",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "website-development",
    }),
    defineField({
      name: "websiteHighlights",
      title: "Highlights",
      type: "array",
      group: "website",
      of: [{ type: "string" }],
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "website-development",
    }),
    defineField({
      name: "websiteHighlightsImage",
      title: "Highlights image",
      type: "siteImage",
      group: "website",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "website-development",
    }),
    defineField({
      name: "websiteDiscoverMore",
      title: "Discover more label",
      type: "string",
      group: "website",
      hidden: ({ document }) =>
        (document?.slug as { current?: string } | undefined)?.current !== "website-development",
    }),

    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3, group: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image.image" },
  },
});
