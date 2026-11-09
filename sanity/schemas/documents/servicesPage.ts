import { defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Index",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Hero eyebrow", type: "string" }),
    defineField({ name: "title", title: "Hero title", type: "string" }),
    defineField({ name: "heroImage", title: "Hero image", type: "siteImage" }),
    defineField({ name: "viewMore", title: "View more text", type: "string" }),
    defineField({ name: "categoryEyebrow", title: "Category eyebrow", type: "string", initialValue: "Services" }),
    defineField({ name: "cardLinkLabel", title: "Card link label", type: "string", initialValue: "View More" }),
    defineField({
      name: "categories",
      title: "Service groups",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "ID",
              type: "string",
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
            defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "title", subtitle: "id" } },
        },
      ],
    }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3 }),
  ],
  preview: {
    prepare() {
      return { title: "Services Index" };
    },
  },
});
