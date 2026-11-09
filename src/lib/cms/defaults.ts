import {
  aboutContent,
  brandsHeading,
  capabilities,
  footerLinks,
  heroCopy,
  navLinks,
  processIntro,
  processSteps,
  serviceCategories,
  services,
  siteConfig,
  valueProp,
  whyChooseCardsIntro,
  whyChooseUs,
  type ServiceCategoryId,
} from "@/lib/data";
import {
  brandLogos,
  getCapabilityImage,
  getServiceImage,
  processImages,
  sectionImages,
} from "@/lib/images";
import type {
  CmsAbout,
  CmsBlogPage,
  CmsCategory,
  CmsContact,
  CmsHomepage,
  CmsLegalPage,
  CmsService,
  CmsServicesPage,
  CmsSettings,
} from "./types";

export const defaultSettings: CmsSettings = {
  name: siteConfig.name,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  url: siteConfig.url,
  phone: siteConfig.phone,
  phoneSecondary: siteConfig.phoneSecondary,
  email: siteConfig.email,
  emailSecondary: siteConfig.emailSecondary,
  address: siteConfig.address,
  social: { ...siteConfig.social },
  navLinks: navLinks.map((link) => ({
    label: link.label,
    href: link.href,
    mega: "mega" in link ? Boolean(link.mega) : false,
  })),
  headerCta: { label: "Let’s Talk", href: "/contact" },
  primaryCta: { label: heroCopy.primaryCta, href: "/contact" },
  secondaryCta: { label: heroCopy.secondaryCta, href: "/contact" },
  footerServicesTitle: "Services",
  footerCompanyTitle: "Quick Links",
  footerResourcesTitle: "say hello",
  footerCompanyLinks: [...footerLinks.company],
  footerResourceLinks: [...footerLinks.resources],
  copyright: "All Rights Reserved by Excellanto Ventures",
  footerTagline: "AI Software · Digital Marketing · Workflow Automation",
  skipToContent: "Skip to content",
  viewMore: "View More",
  viewAllServices: "View all services",
  backToServices: "Services",
  backToBlog: "Back to Blog",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  logoAriaLabel: "Excellanto home",
  megaMenuAria: "Services mega menu",
  serviceEyebrow: "Service",
  byPrefix: "By",
  articleFallbackTitle: "Article",
  primaryNavAria: "Primary",
  mobileNavAria: "Mobile",
  seoAuthor: "Excellanto Ventures",
  seoTitle: `${siteConfig.name} | AI-Powered IT Solutions & Staffing`,
  seoDescription: siteConfig.description,
  seoKeywords: [
    "AI Web & Mobile Solutions",
    "Digital Marketing",
    "SEO Services",
    "Excellanto",
  ],
  logo: { src: "/images/excellanto-logo-white.png", alt: "Excellanto" },
};

const serviceIconNames: Record<string, string> = {
  "mobile-app-development": "Smartphone",
  "website-development": "MonitorSmartphone",
  "ai-driven-operations-automation": "Bot",
  "intelligent-cloud-management": "Cloud",
  "smart-home-automation-powered-by-ai-llm-home-assistant": "House",
  "it-strategy-innovation-consulting": "Compass",
  "predictive-performance-marketing": "TrendingUp",
  "social-media-intelligence": "Share2",
  "seo-cognition": "Search",
  "staffing-recruitment-service": "UserCheck",
};

export const defaultCategories: CmsCategory[] = serviceCategories.map((c) => ({
  id: c.id,
  title: c.title,
}));

export const defaultServices: CmsService[] = services.map((service, index) => {
  const iconName = serviceIconNames[service.slug] ?? "Compass";
  return {
    slug: service.slug,
    title: service.title,
    shortTitle: service.shortTitle,
    description: service.description,
    megaDescription: service.megaDescription,
    iconName,
    category: service.category,
    featured: service.featured,
    sortOrder: index,
    features: service.features,
    detailIntro: service.detailIntro,
    image: getServiceImage(service.slug),
    sidebarTitle: "Contact Us",
    sidebarBody: "Get AI Automation Solutions for Your Business",
    sidebarCta: { label: "Message Now", href: "/contact" },
    pageCta: { label: heroCopy.primaryCta, href: "/contact" },
    bannerEyebrow:
      service.slug === "mobile-app-development"
        ? "Mobile App Development"
        : service.slug === "website-development"
          ? "Website Development"
          : "Service",
    backLabel: "Services",
    cardLinkLabel: "View More",
  };
});

export const defaultHomepage: CmsHomepage = {
  hero: {
    eyebrow: heroCopy.eyebrow,
    title: "AI Powered IT Solutions &",
    highlight: "Staffing",
    subtitle: heroCopy.subtitle,
    body: heroCopy.body,
    primaryCta: { label: heroCopy.primaryCta, href: "/contact" },
    secondaryCta: { label: heroCopy.secondaryCta, href: "/contact" },
    bannerImage: sectionImages.hero,
  },
  capabilities: {
    eyebrow: "Digital Transformation",
    title: "Streamlining Operations Accelerating Outcomes",
    items: capabilities.map((item) => ({
      title: item.title,
      iconName:
        item.title.includes("Workflow")
          ? "Bot"
          : item.title.includes("Data")
            ? "Database"
            : item.title.includes("Marketing")
              ? "TrendingUp"
              : "Users",
      image: getCapabilityImage(item.title),
    })),
  },
  valueProp: {
    eyebrow: valueProp.eyebrow,
    title: valueProp.title,
    body: valueProp.body,
    cta: { label: "Contact Us", href: "/contact" },
    image: sectionImages.valueProp,
  },
  services: {
    eyebrow: "our capabilities",
    title: "Want to see our professional Services",
    aside: "Click here to View More",
    viewMore: "Want to see our professional Services. Click here to View More",
    viewMoreHref: "/services",
    cardLink: "View More",
  },
  process: {
    eyebrow: "our process",
    title: "Our Work Process",
    intro: processIntro,
    steps: processSteps.map((step, index) => ({
      step: step.step,
      title: step.title,
      description: step.description,
      image: processImages[index],
    })),
  },
  brands: {
    eyebrow: "Brands",
    title: brandsHeading,
    background: sectionImages.brands,
    logos: [...brandLogos],
  },
  why: {
    eyebrow: whyChooseCardsIntro.eyebrow,
    title: whyChooseCardsIntro.title,
    body: whyChooseCardsIntro.body,
    image: sectionImages.whyChooseUs,
    cta: { label: "Contact Us", href: "/contact" },
    cards: whyChooseUs.map((card) => ({
      title: card.title,
      description: card.description,
      iconName:
        card.title === "Dedicated Team"
          ? "Users"
          : card.title.includes("Award")
            ? "Award"
            : card.title.includes("24/7")
              ? "Headphones"
              : "LayoutDashboard",
    })),
  },
  blogPreview: {
    eyebrow: "Our Blog",
    title: "Latest News & Articles From the Blog",
    linkLabel: "Explore More",
  },
  cta: {
    eyebrow: "contact us",
    title: "Get AI Automation Solutions for Your Business",
    image: sectionImages.cta,
    primary: { label: "Message Now", href: "/contact" },
    secondary: { label: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
  },
  testimonials: [],
  testimonialsEyebrow: "Testimonials",
  testimonialsTitle: "What our clients say",
};

export const defaultAbout: CmsAbout = {
  eyebrow: aboutContent.eyebrow,
  title: aboutContent.title,
  intro: aboutContent.intro,
  seoTitle: "About Us | AI-Powered IT Solutions Company",
  seoDescription:
    "Learn about Excellanto — our mission, vision, values, and strengths in AI-powered IT solutions, digital marketing, and staffing services.",
  heroImage: sectionImages.aboutHero,
  mission: aboutContent.mission,
  vision: aboutContent.vision,
  values: aboutContent.values,
  strengthsEyebrow: aboutContent.strengthsEyebrow,
  strengthsTitle: aboutContent.strengthsTitle,
  strengthsBody: aboutContent.strengthsBody,
  strengthsImage: sectionImages.aboutStrengths,
  techEyebrow: aboutContent.techEyebrow,
  techTitle: aboutContent.techTitle,
  techBody: aboutContent.techBody,
  techHighlights: [...aboutContent.techHighlights],
  techImage: sectionImages.aboutTechnology,
};

export const defaultContact: CmsContact = {
  eyebrow: "Contact Us",
  title: "Get AI Automation Solutions for Your Business",
  seoTitle: "Contact Us | Get AI Automation Solutions",
  seoDescription:
    "Contact Excellanto for AI-powered IT solutions, digital marketing, and staffing. Call +91 96677 97078 or email support@excellanto.com.",
  heroImage: sectionImages.contactHero,
  officeImage: sectionImages.contactOffice,
  infoEyebrow: "Contact Info",
  infoTitle: "Get AI Automation Solutions for Your Business",
  addressLabel: "Office Address",
  phoneLabel: "Phone Number",
  emailLabel: "Mail Address",
  formEyebrow: "Contact Us",
  formTitle: "Comment or Message",
  formBody: "",
  firstNameLabel: "First",
  lastNameLabel: "Last",
  emailFieldLabel: "Email",
  messageLabel: "Comment or Message",
  submitLabel: "Submit",
  successTitle: "Submit",
  successBody: "Comment or Message",
  successResetLabel: "Comment or Message",
};

export const defaultServicesPage: CmsServicesPage = {
  eyebrow: "Services",
  title: "Delivering reliable solutions tailored to your business needs",
  seoTitle: "IT & Digital Marketing Services",
  seoDescription:
    "Explore Excellanto services: mobile app development, website development, AI automation, cloud management, SEO, social media intelligence, and staffing.",
  heroImage: sectionImages.servicesHero,
  viewMore: "Want to see our professional Services. Click here to View More",
  categoryEyebrow: "Services",
  cardLinkLabel: "View More",
  categories: defaultCategories,
};

export const defaultBlogPage: CmsBlogPage = {
  eyebrow: "Our Blog",
  title: "Latest News & Articles From the Blog",
  seoTitle: "Blog | IT, AI & Digital Marketing Insights",
  seoDescription:
    "Read the latest articles from Excellanto on AI, IT solutions, SEO, digital marketing, and technology trends for modern businesses.",
  heroImage: sectionImages.blogHero,
  emptyMessage: "No blog articles are available right now. Please check back soon.",
  readMoreLabel: "Read more",
  backToBlog: "Back to Blog",
  byPrefix: "By",
  articleFallbackTitle: "Article",
};

export function getDefaultServiceBySlug(slug: string): CmsService | undefined {
  return defaultServices.find((s) => s.slug === slug);
}

export function isServiceCategoryId(value: string): value is ServiceCategoryId {
  return ["development", "ai-cloud", "marketing", "talent"].includes(value);
}

function legalBlock(text: string, style: "normal" | "h2" = "normal", key: string) {
  return {
    _type: "block" as const,
    _key: key,
    style,
    markDefs: [] as unknown[],
    children: [{ _type: "span" as const, _key: `${key}-span`, text, marks: [] as string[] }],
  };
}

export const defaultLegalPages: Record<string, CmsLegalPage> = {
  "privacy-policy": {
    slug: "privacy-policy",
    eyebrow: "Legal",
    title: "Privacy Policy",
    description: "How Excellanto Ventures collects, uses, and protects your information.",
    seoTitle: "Privacy Policy",
    seoDescription: "Privacy Policy for Excellanto Ventures.",
    content: [
      legalBlock(
        'Excellanto Ventures ("Excellanto") respects your privacy. This policy explains what information we collect when you use our website or contact us, and how we use it to deliver IT solutions, digital marketing, and related services.',
        "normal",
        "privacy-1"
      ),
      legalBlock("Information we collect", "h2", "privacy-h1"),
      legalBlock(
        "When you submit a contact form or reach out by phone or email, we may collect your name, email address, phone number, company details, and message content.",
        "normal",
        "privacy-2"
      ),
      legalBlock("How we use information", "h2", "privacy-h2"),
      legalBlock(
        "We use your information to respond to inquiries, provide proposals, improve our services, and communicate about projects. We do not sell your personal data.",
        "normal",
        "privacy-3"
      ),
      legalBlock("Contact", "h2", "privacy-h3"),
      legalBlock(
        "For privacy questions, email support@excellanto.com or call +91 96677 97078.",
        "normal",
        "privacy-4"
      ),
    ],
  },
  "terms-condition": {
    slug: "terms-condition",
    eyebrow: "Legal",
    title: "Terms & Conditions",
    description: "Please read these terms carefully before using our website or engaging our services.",
    seoTitle: "Terms & Conditions",
    seoDescription: "Terms and conditions for using Excellanto Ventures services and website.",
    content: [
      legalBlock(
        "By accessing https://excellanto.com or engaging Excellanto Ventures, you agree to these terms. Our services include AI-powered software solutions, digital marketing, workflow automation, and staffing.",
        "normal",
        "terms-1"
      ),
      legalBlock("Use of website", "h2", "terms-h1"),
      legalBlock(
        "Content on this website is for general information. You may not misuse the site, attempt unauthorized access, or use our materials without permission.",
        "normal",
        "terms-2"
      ),
      legalBlock("Services & engagements", "h2", "terms-h2"),
      legalBlock(
        "Specific project scopes, timelines, and fees are defined in separate agreements. Nothing on this website constitutes a binding offer unless confirmed in writing.",
        "normal",
        "terms-3"
      ),
      legalBlock("Contact", "h2", "terms-h3"),
      legalBlock("Questions about these terms? Reach us at support@excellanto.com.", "normal", "terms-4"),
    ],
  },
};
