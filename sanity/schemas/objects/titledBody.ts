import { defineField, defineType } from "sanity";

export const titledBody = defineType({
  name: "titledBody",
  title: "Title & text",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "body", title: "Text", type: "text", rows: 4 }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});
