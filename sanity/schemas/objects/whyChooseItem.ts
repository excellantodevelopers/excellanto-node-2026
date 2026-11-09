import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "./iconName";

export const whyChooseItem = defineType({
  name: "whyChooseItem",
  title: "Why choose us card",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: ICON_OPTIONS },
    }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});
