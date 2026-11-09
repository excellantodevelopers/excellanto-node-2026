import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Role / company", type: "string" }),
    defineField({ name: "image", title: "Photo", type: "siteImage" }),
    defineField({ name: "isPublished", title: "Published", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "name", subtitle: "quote" },
  },
});
