import { defineField, defineType } from "sanity";

export const navLink = defineType({
  name: "navLink",
  title: "Navigation link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "href", title: "Path", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "mega",
      title: "Show services mega menu",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
