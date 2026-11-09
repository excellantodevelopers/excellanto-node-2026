import type { Metadata } from "next";
import { ContactClient } from "./contact-client";
import { getContactPage, getSiteSettings } from "@/lib/cms/content";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PageBreadcrumbSchema } from "@/components/seo/page-schemas";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [contact, settings] = await Promise.all([getContactPage(), getSiteSettings()]);
  return buildPageMetadata({
    title: contact.seoTitle || contact.title,
    description:
      contact.seoDescription ||
      `${contact.title}. Contact ${settings.name} at ${settings.email} or ${settings.phone}. ${settings.address}`,
    path: "/contact",
    image: contact.heroImage,
  });
}

export default async function ContactPage() {
  const contact = await getContactPage();
  return (
    <>
      <PageBreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: contact.title, path: "/contact" },
        ]}
      />
      <ContactClient page={contact} />
    </>
  );
}
