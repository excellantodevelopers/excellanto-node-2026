import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "values", title: "Mission / Vision / Values" },
    { name: "strengths", title: "Strengths" },
    { name: "tech", title: "Technology" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", group: "hero" }),
    defineField({ name: "title", title: "Title", type: "string", group: "hero" }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 6, group: "hero" }),
    defineField({ name: "heroImage", title: "Hero image", type: "siteImage", group: "hero" }),
    defineField({ name: "mission", title: "Mission", type: "titledBody", group: "values" }),
    defineField({ name: "vision", title: "Vision", type: "titledBody", group: "values" }),
    defineField({ name: "values", title: "Core values", type: "titledBody", group: "values" }),
    defineField({ name: "strengthsEyebrow", title: "Strengths eyebrow", type: "string", group: "strengths" }),
    defineField({ name: "strengthsTitle", title: "Strengths title", type: "string", group: "strengths" }),
    defineField({ name: "strengthsBody", title: "Strengths text", type: "text", rows: 5, group: "strengths" }),
    defineField({ name: "strengthsImage", title: "Strengths image", type: "siteImage", group: "strengths" }),
    defineField({ name: "techEyebrow", title: "Technology eyebrow", type: "string", group: "tech" }),
    defineField({ name: "techTitle", title: "Technology title", type: "string", group: "tech" }),
    defineField({ name: "techBody", title: "Technology text", type: "text", rows: 5, group: "tech" }),
    defineField({ name: "techHighlights", title: "Highlights", type: "array", group: "tech", of: [{ type: "string" }] }),
    defineField({ name: "techImage", title: "Technology image", type: "siteImage", group: "tech" }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3, group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
