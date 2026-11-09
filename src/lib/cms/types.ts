import type { SiteImage } from "@/lib/images";
import type { ServiceCategoryId } from "@/lib/data";

export type CmsCta = {
  label: string;
  href: string;
};

export type CmsNavLink = {
  label: string;
  href: string;
  mega?: boolean;
};

export type CmsSettings = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  logo?: SiteImage;
  phone: string;
  phoneSecondary: string;
  email: string;
  emailSecondary: string;
  address: string;
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  navLinks: CmsNavLink[];
  headerCta: CmsCta;
  primaryCta: CmsCta;
  secondaryCta: CmsCta;
  footerServicesTitle: string;
  footerCompanyTitle: string;
  footerResourcesTitle: string;
  footerCompanyLinks: CmsNavLink[];
  footerResourceLinks: CmsNavLink[];
  copyright: string;
  footerTagline: string;
  skipToContent: string;
  viewMore: string;
  viewAllServices: string;
  backToServices: string;
  backToBlog: string;
  openMenu: string;
  closeMenu: string;
  logoAriaLabel: string;
  megaMenuAria: string;
  serviceEyebrow: string;
  byPrefix: string;
  articleFallbackTitle: string;
  primaryNavAria: string;
  mobileNavAria: string;
  seoTitle?: string;
  seoDescription?: string;
  seoAuthor?: string;
  seoKeywords?: string[];
};

export type CmsCapability = {
  title: string;
  iconName: string;
  image: SiteImage;
};

export type CmsWhyCard = {
  title: string;
  description: string;
  iconName: string;
};

export type CmsProcessStep = {
  step: string;
  title: string;
  description: string;
  image?: SiteImage;
};

export type CmsTestimonial = {
  quote: string;
  name: string;
  role?: string;
  image?: SiteImage;
};

export type CmsHomepage = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    body: string;
    primaryCta: CmsCta;
    secondaryCta: CmsCta;
    bannerImage: SiteImage;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    items: CmsCapability[];
  };
  valueProp: {
    eyebrow: string;
    title: string;
    body: string;
    cta: CmsCta;
    image: SiteImage;
  };
  services: {
    eyebrow: string;
    title: string;
    aside: string;
    viewMore: string;
    viewMoreHref: string;
    cardLink: string;
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: CmsProcessStep[];
  };
  brands: {
    eyebrow: string;
    title: string;
    background: SiteImage;
    logos: SiteImage[];
  };
  why: {
    eyebrow: string;
    title: string;
    body: string;
    image: SiteImage;
    cta: CmsCta;
    cards: CmsWhyCard[];
  };
  blogPreview: {
    eyebrow: string;
    title: string;
    linkLabel: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    image: SiteImage;
    primary: CmsCta;
    secondary: CmsCta;
  };
  testimonials: CmsTestimonial[];
  testimonialsEyebrow: string;
  testimonialsTitle: string;
};

export type CmsService = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  megaDescription: string;
  iconName: string;
  category: ServiceCategoryId;
  featured: boolean;
  sortOrder: number;
  orderRank?: string;
  features: string[];
  detailIntro?: string;
  image: SiteImage;
  sidebarTitle: string;
  sidebarBody: string;
  sidebarCta: CmsCta;
  pageCta: CmsCta;
  bannerEyebrow: string;
  backLabel: string;
  cardLinkLabel: string;
  seoTitle?: string;
  seoDescription?: string;
  mobile?: Record<string, unknown>;
  website?: Record<string, unknown>;
  socialMedia?: Record<string, unknown>;
  seoCognition?: Record<string, unknown>;
  staffingRecruitment?: Record<string, unknown>;
  aiDrivenOperations?: Record<string, unknown>;
  intelligentCloudManagement?: Record<string, unknown>;
  itStrategyInnovation?: Record<string, unknown>;
  predictivePerformanceMarketing?: Record<string, unknown>;
};

export type CmsCategory = {
  id: ServiceCategoryId;
  title: string;
};

export type CmsAbout = {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: SiteImage;
  mission: { title: string; body: string };
  vision: { title: string; body: string };
  values: { title: string; body: string };
  strengthsEyebrow: string;
  strengthsTitle: string;
  strengthsBody: string;
  strengthsImage: SiteImage;
  techEyebrow: string;
  techTitle: string;
  techBody: string;
  techHighlights: string[];
  techImage: SiteImage;
  seoTitle?: string;
  seoDescription?: string;
};

export type CmsContact = {
  eyebrow: string;
  title: string;
  heroImage: SiteImage;
  officeImage: SiteImage;
  infoEyebrow: string;
  infoTitle: string;
  addressLabel: string;
  phoneLabel: string;
  emailLabel: string;
  formEyebrow: string;
  formTitle: string;
  formBody: string;
  firstNameLabel: string;
  lastNameLabel: string;
  emailFieldLabel: string;
  messageLabel: string;
  submitLabel: string;
  successTitle: string;
  successBody: string;
  successResetLabel: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type CmsServicesPage = {
  eyebrow: string;
  title: string;
  heroImage: SiteImage;
  viewMore: string;
  categoryEyebrow: string;
  cardLinkLabel: string;
  categories: CmsCategory[];
  seoTitle?: string;
  seoDescription?: string;
};

export type CmsBlogPage = {
  eyebrow: string;
  title: string;
  heroImage: SiteImage;
  emptyMessage: string;
  readMoreLabel: string;
  backToBlog: string;
  byPrefix: string;
  articleFallbackTitle: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type CmsLegalPage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  content?: unknown[];
  seoTitle?: string;
  seoDescription?: string;
};

export type CmsContextValue = {
  settings: CmsSettings;
  services: CmsService[];
  categories: CmsCategory[];
  homepage: CmsHomepage;
};
