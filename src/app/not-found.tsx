import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/cms/content";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildPageMetadata({
    title: `Page Not Found | ${settings.name}`,
    description: `The page you requested could not be found on ${settings.name}. Browse our services, blog, or contact us for assistance.`,
    path: "/404",
    noIndex: true,
    includeCanonical: false,
  });
}

export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <section className="section-padding bg-surface">
      <div className="container-xl max-w-2xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          404
        </p>
        <h1 className="font-display mt-3 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          The page you are looking for may have been moved or no longer exists.
          Use the links below to continue browsing {settings.name}.
        </p>
        <nav
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          aria-label="Helpful links"
        >
          <Link
            href="/"
            className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-secondary transition-colors hover:border-primary/25 hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-secondary transition-colors hover:border-primary/25 hover:text-primary"
          >
            Services
          </Link>
          <Link
            href="/blog"
            className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-secondary transition-colors hover:border-primary/25 hover:text-primary"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-secondary transition-colors hover:border-primary/25 hover:text-primary"
          >
            Contact
          </Link>
        </nav>
      </div>
    </section>
  );
}
