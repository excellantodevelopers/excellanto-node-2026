import { defineField, defineType } from "sanity";

export const processStep = defineType({
  name: "processStep",
  title: "Process step",
  type: "object",
  fields: [
    defineField({ name: "step", title: "Step number", type: "string", initialValue: "01" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "body", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "image", title: "Image", type: "siteImage" }),
  ],
  preview: {
    select: { step: "step", title: "title" },
    prepare({ step, title }) {
      return { title: `${step ?? ""} ${title ?? "Step"}`.trim() };
    },
  },
});
