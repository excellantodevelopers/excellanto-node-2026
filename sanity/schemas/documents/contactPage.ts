import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Hero eyebrow", type: "string" }),
    defineField({ name: "title", title: "Hero title", type: "string" }),
    defineField({ name: "heroImage", title: "Hero image", type: "siteImage" }),
    defineField({ name: "officeImage", title: "Office image", type: "siteImage" }),
    defineField({ name: "infoEyebrow", title: "Info eyebrow", type: "string" }),
    defineField({ name: "infoTitle", title: "Info title", type: "string" }),
    defineField({ name: "addressLabel", title: "Address label", type: "string" }),
    defineField({ name: "phoneLabel", title: "Phone label", type: "string" }),
    defineField({ name: "emailLabel", title: "Email label", type: "string" }),
    defineField({ name: "formEyebrow", title: "Form eyebrow", type: "string" }),
    defineField({ name: "formTitle", title: "Form title", type: "string" }),
    defineField({ name: "formBody", title: "Form introduction", type: "text", rows: 3 }),
    defineField({ name: "firstNameLabel", title: "First name label", type: "string" }),
    defineField({ name: "lastNameLabel", title: "Last name label", type: "string" }),
    defineField({ name: "emailFieldLabel", title: "Email field label", type: "string" }),
    defineField({ name: "messageLabel", title: "Message field label", type: "string" }),
    defineField({ name: "submitLabel", title: "Submit button", type: "string" }),
    defineField({ name: "successTitle", title: "Success title", type: "string" }),
    defineField({ name: "successBody", title: "Success message", type: "text", rows: 3 }),
    defineField({ name: "successResetLabel", title: "Success reset button", type: "string" }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3 }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
