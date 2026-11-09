import { defineField, defineType } from "sanity";

export const blogPage = defineType({
  name: "blogPage",
  title: "Blog Listing",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Hero eyebrow", type: "string" }),
    defineField({ name: "title", title: "Hero title", type: "string" }),
    defineField({ name: "heroImage", title: "Hero image", type: "siteImage" }),
    defineField({ name: "emptyMessage", title: "Empty state message", type: "text", rows: 2 }),
    defineField({ name: "readMoreLabel", title: "Read more label", type: "string" }),
    defineField({ name: "backToBlog", title: "Back to blog", type: "string", initialValue: "Back to Blog" }),
    defineField({ name: "byPrefix", title: "Author prefix", type: "string", initialValue: "By" }),
    defineField({ name: "articleFallbackTitle", title: "Missing article title", type: "string", initialValue: "Article" }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3 }),
  ],
  preview: {
    prepare() {
      return { title: "Blog Listing" };
    },
  },
});
