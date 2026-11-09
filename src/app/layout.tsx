import type { Metadata, Viewport } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CmsProvider } from "@/lib/cms/provider";
import { getCmsBundle, getSiteSettings } from "@/lib/cms/content";
import { defaultSettings } from "@/lib/cms/defaults";
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT } from "@/lib/seo/constants";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/seo/schema";
import "./globals.css";

const display = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1220",
};

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteSettings();
  const title = siteConfig.seoTitle || `${siteConfig.name} | AI-Powered IT Solutions & Staffing`;
  const description = siteConfig.seoDescription || siteConfig.description;
  const baseUrl = siteConfig.url || defaultSettings.url;
  const ogImage = `${baseUrl}${DEFAULT_OG_IMAGE}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: siteConfig.seoKeywords?.length
      ? siteConfig.seoKeywords
      : defaultSettings.seoKeywords,
    authors: [{ name: siteConfig.seoAuthor || defaultSettings.seoAuthor || siteConfig.name }],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: baseUrl,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: ogImage, alt: DEFAULT_OG_IMAGE_ALT, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.png", type: "image/png", sizes: "32x32" },
        { url: "/images/excellanto-favicon.png", type: "image/png", sizes: "78x78" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cms = await getCmsBundle();
  const settings = cms.settings;
  const baseUrl = settings.url || defaultSettings.url;
  const logoUrl = settings.logo?.src
    ? `${baseUrl}${settings.logo.src.startsWith("/") ? settings.logo.src : `/${settings.logo.src}`}`
    : `${baseUrl}/images/excellanto-logo-white.png`;
  const sameAs = [settings.social.facebook, settings.social.instagram, settings.social.linkedin].filter(
    (url) => url && !url.endsWith("/")
  );

  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <JsonLd
          data={[
            organizationSchema({
              name: settings.name,
              url: baseUrl,
              logo: logoUrl,
              description: settings.description,
              email: settings.email,
              phone: settings.phone,
              address: settings.address,
              sameAs,
            }),
            websiteSchema(settings.name, baseUrl),
          ]}
        />
        <CmsProvider value={cms}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
          >
            {cms.settings.skipToContent}
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </CmsProvider>
      </body>
    </html>
  );
}
