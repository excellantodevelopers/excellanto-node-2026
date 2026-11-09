import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Industries",
    description: "Industry-specific IT solutions from Excellanto.",
    path: "/industries",
    noIndex: true,
  });
}

/** Industries content lives on service pages (e.g. Mobile App Development). */
export default function IndustriesPage() {
  redirect("/services/mobile-app-development");
}
