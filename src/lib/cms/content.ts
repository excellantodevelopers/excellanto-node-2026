import { sanityFetch } from "@/lib/sanity/client";
import {
  defaultAbout,
  defaultBlogPage,
  defaultContact,
  defaultHomepage,
  defaultLegalPages,
  defaultServices,
  defaultServicesPage,
  defaultSettings,
  getDefaultServiceBySlug,
  isServiceCategoryId,
} from "./defaults";
import {
  aboutPageQuery,
  allServicesQuery,
  blogPageQuery,
  contactPageQuery,
  homepageQuery,
  legalPageBySlugQuery,
  serviceBySlugQuery,
  servicesPageQuery,
  siteSettingsQuery,
} from "./queries";
import { pickArray, pickText, resolveCmsImage, resolveHeroBanner, type CmsImageValue } from "./resolve";
import { serviceBannerImages } from "@/lib/images";
import type {
  CmsAbout,
  CmsBlogPage,
  CmsCategory,
  CmsContact,
  CmsCta,
  CmsHomepage,
  CmsLegalPage,
  CmsNavLink,
  CmsService,
  CmsServicesPage,
  CmsSettings,
} from "./types";
import { industries, mobileAppPage, websiteDevPage } from "@/lib/data";
import { mobileAppImages, websiteDevImages } from "@/lib/images";

type RawCta = { label?: string | null; href?: string | null } | null;
type RawLink = { label?: string | null; href?: string | null; mega?: boolean | null } | null;

function cta(value: RawCta, fallback: CmsCta): CmsCta {
  return {
    label: pickText(value?.label, fallback.label),
    href: pickText(value?.href, fallback.href),
  };
}

function links(value: RawLink[] | null | undefined, fallback: CmsNavLink[]): CmsNavLink[] {
  if (!value?.length) return fallback;
  return value
    .filter((item): item is NonNullable<RawLink> => Boolean(item?.label && item?.href))
    .map((item) => ({
      label: item.label as string,
      href: item.href as string,
      mega: Boolean(item.mega),
    }));
}

export async function getSiteSettings(): Promise<CmsSettings> {
  const raw = await sanityFetch<Record<string, unknown> | null>(siteSettingsQuery);
  if (!raw) return defaultSettings;

  return {
    name: pickText(raw.name as string, defaultSettings.name),
    tagline: pickText(raw.tagline as string, defaultSettings.tagline),
    description: pickText(raw.description as string, defaultSettings.description),
    url: pickText(raw.url as string, defaultSettings.url),
    logo: raw.logo ? resolveCmsImage(raw.logo as CmsImageValue, { src: "/images/excellanto-logo-white.png", alt: "Excellanto" }) : defaultSettings.logo,
    phone: pickText(raw.phone as string, defaultSettings.phone),
    phoneSecondary: pickText(raw.phoneSecondary as string, defaultSettings.phoneSecondary),
    email: pickText(raw.email as string, defaultSettings.email),
    emailSecondary: pickText(raw.emailSecondary as string, defaultSettings.emailSecondary),
    address: pickText(raw.address as string, defaultSettings.address),
    social: {
      facebook: pickText(raw.facebook as string, defaultSettings.social.facebook),
      instagram: pickText(raw.instagram as string, defaultSettings.social.instagram),
      linkedin: pickText(raw.linkedin as string, defaultSettings.social.linkedin),
    },
    navLinks: links(raw.navLinks as RawLink[], defaultSettings.navLinks),
    headerCta: cta(raw.headerCta as RawCta, defaultSettings.headerCta),
    primaryCta: cta(raw.primaryCta as RawCta, defaultSettings.primaryCta),
    secondaryCta: cta(raw.secondaryCta as RawCta, defaultSettings.secondaryCta),
    footerServicesTitle: pickText(raw.footerServicesTitle as string, defaultSettings.footerServicesTitle),
    footerCompanyTitle: pickText(raw.footerCompanyTitle as string, defaultSettings.footerCompanyTitle),
    footerResourcesTitle: pickText(raw.footerResourcesTitle as string, defaultSettings.footerResourcesTitle),
    footerCompanyLinks: links(raw.footerCompanyLinks as RawLink[], defaultSettings.footerCompanyLinks),
    footerResourceLinks: links(raw.footerResourceLinks as RawLink[], defaultSettings.footerResourceLinks),
    copyright: pickText(raw.copyright as string, defaultSettings.copyright),
    footerTagline: pickText(raw.footerTagline as string, defaultSettings.footerTagline),
    skipToContent: pickText(raw.skipToContent as string, defaultSettings.skipToContent),
    viewMore: pickText(raw.viewMore as string, defaultSettings.viewMore),
    viewAllServices: pickText(raw.viewAllServices as string, defaultSettings.viewAllServices),
    backToServices: pickText(raw.backToServices as string, defaultSettings.backToServices),
    backToBlog: pickText(raw.backToBlog as string, defaultSettings.backToBlog),
    openMenu: pickText(raw.openMenu as string, defaultSettings.openMenu),
    closeMenu: pickText(raw.closeMenu as string, defaultSettings.closeMenu),
    logoAriaLabel: pickText(raw.logoAriaLabel as string, defaultSettings.logoAriaLabel),
    megaMenuAria: pickText(raw.megaMenuAria as string, defaultSettings.megaMenuAria),
    serviceEyebrow: pickText(raw.serviceEyebrow as string, defaultSettings.serviceEyebrow),
    byPrefix: pickText(raw.byPrefix as string, defaultSettings.byPrefix),
    articleFallbackTitle: pickText(raw.articleFallbackTitle as string, defaultSettings.articleFallbackTitle),
    primaryNavAria: pickText(raw.primaryNavAria as string, defaultSettings.primaryNavAria),
    mobileNavAria: pickText(raw.mobileNavAria as string, defaultSettings.mobileNavAria),
    seoTitle: (raw.seoTitle as string) || defaultSettings.seoTitle,
    seoDescription: (raw.seoDescription as string) || defaultSettings.seoDescription,
    seoAuthor: pickText(raw.seoAuthor as string, defaultSettings.seoAuthor ?? ""),
    seoKeywords: pickArray(raw.seoKeywords as string[], defaultSettings.seoKeywords ?? []),
  };
}

export async function getHomepage(): Promise<CmsHomepage> {
  const raw = await sanityFetch<Record<string, unknown> | null>(homepageQuery);
  const d = defaultHomepage;
  if (!raw) return d;

  const capabilities = Array.isArray(raw.capabilities)
    ? (raw.capabilities as { title?: string; icon?: string; image?: CmsImageValue }[]).map((item, i) => {
        const fallback = d.capabilities.items[i] ?? d.capabilities.items[0];
        return {
          title: pickText(item.title, fallback.title),
          iconName: pickText(item.icon, fallback.iconName),
          image: resolveCmsImage(item.image, fallback.image),
        };
      })
    : d.capabilities.items;

  const processSteps = Array.isArray(raw.processSteps)
    ? (raw.processSteps as { step?: string; title?: string; body?: string; image?: CmsImageValue }[]).map((item, i) => {
        const fallback = d.process.steps[i] ?? d.process.steps[0];
        return {
          step: pickText(item.step, fallback.step),
          title: pickText(item.title, fallback.title),
          description: pickText(item.body, fallback.description),
          image: resolveCmsImage(item.image, fallback.image ?? { src: "", alt: fallback.title }),
        };
      })
    : d.process.steps;

  const whyCards = Array.isArray(raw.whyCards)
    ? (raw.whyCards as { title?: string; description?: string; icon?: string }[]).map((item, i) => {
        const fallback = d.why.cards[i] ?? d.why.cards[0];
        return {
          title: pickText(item.title, fallback.title),
          description: pickText(item.description, fallback.description),
          iconName: pickText(item.icon, fallback.iconName),
        };
      })
    : d.why.cards;

  const cmsBrandLogos = Array.isArray(raw.brandLogos) ? (raw.brandLogos as CmsImageValue[]) : [];
  const logos =
    cmsBrandLogos.length >= d.brands.logos.length
      ? cmsBrandLogos.map((logo, i) => resolveCmsImage(logo, d.brands.logos[i] ?? d.brands.logos[0]))
      : d.brands.logos;

  const testimonials = Array.isArray(raw.testimonials)
    ? (raw.testimonials as { quote?: string; name?: string; role?: string; isPublished?: boolean; image?: CmsImageValue }[])
        .filter((item) => item?.isPublished !== false && item?.quote && item?.name)
        .map((item) => ({
          quote: item.quote as string,
          name: item.name as string,
          role: item.role || undefined,
          image: item.image ? resolveCmsImage(item.image, { src: "", alt: item.name as string }) : undefined,
        }))
    : [];

  return {
    hero: {
      eyebrow: d.hero.eyebrow,
      title: pickText(raw.heroTitle as string, d.hero.title),
      highlight: pickText(raw.heroHighlight as string, d.hero.highlight),
      subtitle: pickText(raw.heroSubtitle as string, d.hero.subtitle),
      body: pickText(raw.heroBody as string, d.hero.body),
      primaryCta: cta(raw.heroPrimaryCta as RawCta, d.hero.primaryCta),
      secondaryCta: cta(raw.heroSecondaryCta as RawCta, d.hero.secondaryCta),
      bannerImage: resolveHeroBanner(raw, d.hero.bannerImage),
    },
    capabilities: {
      eyebrow: pickText(raw.capabilitiesEyebrow as string, d.capabilities.eyebrow),
      title: pickText(raw.capabilitiesTitle as string, d.capabilities.title),
      items: pickArray(capabilities, d.capabilities.items),
    },
    valueProp: {
      eyebrow: pickText(raw.valueEyebrow as string, d.valueProp.eyebrow),
      title: pickText(raw.valueTitle as string, d.valueProp.title),
      body: pickText(raw.valueBody as string, d.valueProp.body),
      cta: cta(raw.valueCta as RawCta, d.valueProp.cta),
      image: resolveCmsImage(raw.valueImage as CmsImageValue, d.valueProp.image),
    },
    services: {
      eyebrow: pickText(raw.servicesEyebrow as string, d.services.eyebrow),
      title: pickText(raw.servicesTitle as string, d.services.title),
      aside: pickText(raw.servicesAside as string, d.services.aside),
      viewMore: pickText(raw.servicesViewMore as string, d.services.viewMore),
      viewMoreHref: pickText(raw.servicesViewMoreHref as string, d.services.viewMoreHref),
      cardLink: pickText(raw.servicesCardLink as string, d.services.cardLink),
    },
    process: {
      eyebrow: pickText(raw.processEyebrow as string, d.process.eyebrow),
      title: pickText(raw.processTitle as string, d.process.title),
      intro: pickText(raw.processIntro as string, d.process.intro),
      steps: pickArray(processSteps, d.process.steps),
    },
    brands: {
      eyebrow: pickText(raw.brandsEyebrow as string, d.brands.eyebrow),
      title: pickText(raw.brandsTitle as string, d.brands.title),
      background: resolveCmsImage(raw.brandsBackground as CmsImageValue, d.brands.background),
      logos: pickArray(logos, d.brands.logos),
    },
    why: {
      eyebrow: pickText(raw.whyEyebrow as string, d.why.eyebrow),
      title: pickText(raw.whyTitle as string, d.why.title),
      body: pickText(raw.whyBody as string, d.why.body),
      image: resolveCmsImage(raw.whyImage as CmsImageValue, d.why.image),
      cta: cta(raw.whyCta as RawCta, d.why.cta),
      cards: pickArray(whyCards, d.why.cards),
    },
    blogPreview: {
      eyebrow: pickText(raw.blogEyebrow as string, d.blogPreview.eyebrow),
      title: pickText(raw.blogTitle as string, d.blogPreview.title),
      linkLabel: pickText(raw.blogLinkLabel as string, d.blogPreview.linkLabel),
    },
    cta: {
      eyebrow: pickText(raw.ctaEyebrow as string, d.cta.eyebrow),
      title: pickText(raw.ctaTitle as string, d.cta.title),
      image: resolveCmsImage(raw.ctaImage as CmsImageValue, d.cta.image),
      primary: cta(raw.ctaPrimary as RawCta, d.cta.primary),
      secondary: cta(raw.ctaSecondary as RawCta, d.cta.secondary),
    },
    testimonials,
    testimonialsEyebrow: pickText(raw.testimonialsEyebrow as string, d.testimonialsEyebrow),
    testimonialsTitle: pickText(raw.testimonialsTitle as string, d.testimonialsTitle),
  };
}

function mapService(raw: Record<string, unknown>, fallback?: CmsService): CmsService {
  const slug = pickText(raw.slug as string, fallback?.slug ?? "");
  const base = fallback ?? getDefaultServiceBySlug(slug);
  const iconName = pickText(raw.icon as string, base?.iconName ?? "Compass");
  const categoryRaw = pickText(raw.category as string, base?.category ?? "development");
  const category = isServiceCategoryId(categoryRaw) ? categoryRaw : "development";

  return {
    slug,
    title: pickText(raw.title as string, base?.title ?? slug),
    shortTitle: pickText(raw.shortTitle as string, base?.shortTitle ?? (raw.title as string) ?? slug),
    description: pickText(raw.description as string, base?.description ?? ""),
    megaDescription: pickText(raw.megaDescription as string, base?.megaDescription ?? ""),
    iconName,
    category,
    featured: typeof raw.featured === "boolean" ? raw.featured : Boolean(base?.featured),
    sortOrder: typeof raw.sortOrder === "number" ? raw.sortOrder : (base?.sortOrder ?? 0),
    orderRank: typeof raw.orderRank === "string" ? raw.orderRank : base?.orderRank,
    features: pickArray(raw.features as string[], base?.features ?? []),
    detailIntro: pickText(raw.detailIntro as string, base?.detailIntro ?? ""),
    image: (() => {
      const banner = serviceBannerImages[slug];
      if (banner) {
        return {
          src: banner.src,
          alt: pickText((raw.image as CmsImageValue)?.alt, banner.alt),
        };
      }
      return resolveCmsImage(raw.image as CmsImageValue, base?.image ?? { src: "", alt: slug });
    })(),
    sidebarTitle: pickText(raw.sidebarTitle as string, base?.sidebarTitle ?? "Contact Us"),
    sidebarBody: pickText(raw.sidebarBody as string, base?.sidebarBody ?? ""),
    sidebarCta: cta(raw.sidebarCta as RawCta, base?.sidebarCta ?? { label: "Message Now", href: "/contact" }),
    pageCta: cta(raw.pageCta as RawCta, base?.pageCta ?? { label: "Let’s Talk", href: "/contact" }),
    bannerEyebrow: pickText(raw.bannerEyebrow as string, base?.bannerEyebrow ?? "Service"),
    backLabel: pickText(raw.backLabel as string, base?.backLabel ?? "Services"),
    cardLinkLabel: pickText(raw.cardLinkLabel as string, base?.cardLinkLabel ?? "View More"),
    seoTitle: (raw.seoTitle as string) || base?.seoTitle,
    seoDescription: (raw.seoDescription as string) || base?.seoDescription,
    mobile: raw,
    website: raw,
  };
}

export async function getServices(): Promise<CmsService[]> {
  const raw = await sanityFetch<Record<string, unknown>[] | null>(allServicesQuery);
  if (!raw?.length) return defaultServices;
  return raw
    .filter((item) => item?.slug)
    .map((item) => mapService(item, getDefaultServiceBySlug(item.slug as string)))
    .sort((a, b) => {
      if (a.orderRank && b.orderRank && a.orderRank !== b.orderRank) {
        return a.orderRank < b.orderRank ? -1 : 1;
      }
      return a.sortOrder - b.sortOrder;
    });
}

export async function getService(slug: string): Promise<CmsService | null> {
  const raw = await sanityFetch<Record<string, unknown> | null>(serviceBySlugQuery, { slug });
  if (raw?.slug) return mapService(raw, getDefaultServiceBySlug(slug));
  return getDefaultServiceBySlug(slug) ?? null;
}

export async function getAboutPage(): Promise<CmsAbout> {
  const raw = await sanityFetch<Record<string, unknown> | null>(aboutPageQuery);
  const d = defaultAbout;
  if (!raw) return d;
  return {
    eyebrow: pickText(raw.eyebrow as string, d.eyebrow),
    title: pickText(raw.title as string, d.title),
    intro: pickText(raw.intro as string, d.intro),
    heroImage: resolveCmsImage(raw.heroImage as CmsImageValue, d.heroImage),
    mission: {
      title: pickText((raw.mission as { title?: string })?.title, d.mission.title),
      body: pickText((raw.mission as { body?: string })?.body, d.mission.body),
    },
    vision: {
      title: pickText((raw.vision as { title?: string })?.title, d.vision.title),
      body: pickText((raw.vision as { body?: string })?.body, d.vision.body),
    },
    values: {
      title: pickText((raw.values as { title?: string })?.title, d.values.title),
      body: pickText((raw.values as { body?: string })?.body, d.values.body),
    },
    strengthsEyebrow: pickText(raw.strengthsEyebrow as string, d.strengthsEyebrow),
    strengthsTitle: pickText(raw.strengthsTitle as string, d.strengthsTitle),
    strengthsBody: pickText(raw.strengthsBody as string, d.strengthsBody),
    strengthsImage: resolveCmsImage(raw.strengthsImage as CmsImageValue, d.strengthsImage),
    techEyebrow: pickText(raw.techEyebrow as string, d.techEyebrow),
    techTitle: pickText(raw.techTitle as string, d.techTitle),
    techBody: pickText(raw.techBody as string, d.techBody),
    techHighlights: pickArray(raw.techHighlights as string[], d.techHighlights),
    techImage: resolveCmsImage(raw.techImage as CmsImageValue, d.techImage),
    seoTitle: (raw.seoTitle as string) || d.seoTitle,
    seoDescription: (raw.seoDescription as string) || d.seoDescription,
  };
}

export async function getContactPage(): Promise<CmsContact> {
  const raw = await sanityFetch<Record<string, unknown> | null>(contactPageQuery);
  const d = defaultContact;
  if (!raw) return d;
  return {
    eyebrow: pickText(raw.eyebrow as string, d.eyebrow),
    title: pickText(raw.title as string, d.title),
    heroImage: resolveCmsImage(raw.heroImage as CmsImageValue, d.heroImage),
    officeImage: resolveCmsImage(raw.officeImage as CmsImageValue, d.officeImage),
    infoEyebrow: pickText(raw.infoEyebrow as string, d.infoEyebrow),
    infoTitle: pickText(raw.infoTitle as string, d.infoTitle),
    addressLabel: pickText(raw.addressLabel as string, d.addressLabel),
    phoneLabel: pickText(raw.phoneLabel as string, d.phoneLabel),
    emailLabel: pickText(raw.emailLabel as string, d.emailLabel),
    formEyebrow: pickText(raw.formEyebrow as string, d.formEyebrow),
    formTitle: pickText(raw.formTitle as string, d.formTitle),
    formBody: pickText(raw.formBody as string, d.formBody),
    firstNameLabel: pickText(raw.firstNameLabel as string, d.firstNameLabel),
    lastNameLabel: pickText(raw.lastNameLabel as string, d.lastNameLabel),
    emailFieldLabel: pickText(raw.emailFieldLabel as string, d.emailFieldLabel),
    messageLabel: pickText(raw.messageLabel as string, d.messageLabel),
    submitLabel: pickText(raw.submitLabel as string, d.submitLabel),
    successTitle: pickText(raw.successTitle as string, d.successTitle),
    successBody: pickText(raw.successBody as string, d.successBody),
    successResetLabel: pickText(raw.successResetLabel as string, d.successResetLabel),
    seoTitle: (raw.seoTitle as string) || d.seoTitle,
    seoDescription: (raw.seoDescription as string) || d.seoDescription,
  };
}

export async function getServicesPage(): Promise<CmsServicesPage> {
  const raw = await sanityFetch<Record<string, unknown> | null>(servicesPageQuery);
  const d = defaultServicesPage;
  if (!raw) return d;
  const categories = Array.isArray(raw.categories)
    ? (raw.categories as { id?: string; title?: string }[])
        .filter((item) => item.id && isServiceCategoryId(item.id))
        .map((item) => ({ id: item.id as CmsCategory["id"], title: pickText(item.title, item.id as string) }))
    : d.categories;
  return {
    eyebrow: pickText(raw.eyebrow as string, d.eyebrow),
    title: pickText(raw.title as string, d.title),
    heroImage: resolveCmsImage(raw.heroImage as CmsImageValue, d.heroImage),
    viewMore: pickText(raw.viewMore as string, d.viewMore),
    categoryEyebrow: pickText(raw.categoryEyebrow as string, d.categoryEyebrow),
    cardLinkLabel: pickText(raw.cardLinkLabel as string, d.cardLinkLabel),
    categories: pickArray(categories, d.categories),
    seoTitle: (raw.seoTitle as string) || d.seoTitle,
    seoDescription: (raw.seoDescription as string) || d.seoDescription,
  };
}

export async function getBlogPage(): Promise<CmsBlogPage> {
  const raw = await sanityFetch<Record<string, unknown> | null>(blogPageQuery);
  const d = defaultBlogPage;
  if (!raw) return d;
  return {
    eyebrow: pickText(raw.eyebrow as string, d.eyebrow),
    title: pickText(raw.title as string, d.title),
    heroImage: resolveCmsImage(raw.heroImage as CmsImageValue, d.heroImage),
    emptyMessage: pickText(raw.emptyMessage as string, d.emptyMessage),
    readMoreLabel: pickText(raw.readMoreLabel as string, d.readMoreLabel),
    backToBlog: pickText(raw.backToBlog as string, d.backToBlog),
    byPrefix: pickText(raw.byPrefix as string, d.byPrefix),
    articleFallbackTitle: pickText(raw.articleFallbackTitle as string, d.articleFallbackTitle),
    seoTitle: (raw.seoTitle as string) || d.seoTitle,
    seoDescription: (raw.seoDescription as string) || d.seoDescription,
  };
}

export async function getLegalPage(slug: string): Promise<CmsLegalPage | null> {
  const fallback = defaultLegalPages[slug] ?? null;
  const raw = await sanityFetch<CmsLegalPage | null>(legalPageBySlugQuery, { slug });
  if (!raw?.slug) return fallback;
  return {
    slug: raw.slug,
    eyebrow: pickText(raw.eyebrow, fallback?.eyebrow ?? "Legal"),
    title: pickText(raw.title, fallback?.title ?? slug),
    description: pickText(raw.description, fallback?.description ?? ""),
    content: pickArray(raw.content as unknown[], fallback?.content ?? []),
    seoTitle: raw.seoTitle || fallback?.seoTitle,
    seoDescription: raw.seoDescription || fallback?.seoDescription,
  };
}

export async function getCmsBundle() {
  const [settings, homepage, services, servicesPage] = await Promise.all([
    getSiteSettings(),
    getHomepage(),
    getServices(),
    getServicesPage(),
  ]);
  return { settings, homepage, services, categories: servicesPage.categories };
}

export { mobileAppPage, websiteDevPage, mobileAppImages, websiteDevImages, industries };
