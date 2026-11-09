import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "./iconName";

export const capabilityItem = defineType({
  name: "capabilityItem",
  title: "Capability",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: ICON_OPTIONS },
    }),
    defineField({ name: "image", title: "Image", type: "siteImage" }),
  ],
  preview: { select: { title: "title", media: "image.image" } },
});
