import { defineField, defineType } from "sanity";

export const siteImage = defineType({
  name: "siteImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Upload",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "url",
      title: "Or image URL",
      type: "url",
      description: "Used if no file is uploaded.",
      validation: (Rule) =>
        Rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "alt", media: "image" },
    prepare({ title, media }) {
      return { title: title || "Image", media };
    },
  },
});
