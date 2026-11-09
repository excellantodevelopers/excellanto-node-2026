/**
 * Images mapped from excellanto.com wp-content uploads.
 * Alts use section/service titles from the reference site.
 */

export type SiteImage = {
  src: string;
  alt: string;
};

const e = (path: string) =>
  path.startsWith("http") ? path : `https://excellanto.com/wp-content/uploads/${path}`;

const BANNER_CACHE_VERSION = "20260824";

/** Premium service hero banners — 1920×800, unique photorealistic per service */
const serviceBanner = (slug: string, alt: string): SiteImage => ({
  src: `/images/services/banners/${slug}.jpg?v=${BANNER_CACHE_VERSION}`,
  alt,
});

export const serviceBannerImages: Record<string, SiteImage> = {
  "mobile-app-development": serviceBanner(
    "mobile-app-development",
    "Mobile App Development — professional team reviewing mobile applications"
  ),
  "website-development": serviceBanner(
    "website-development",
    "Website Development — web developers building modern websites"
  ),
  "ai-driven-operations-automation": serviceBanner(
    "ai-driven-operations-automation",
    "AI-Driven Operations Automation — operations team optimizing business workflows"
  ),
  "intelligent-cloud-management": serviceBanner(
    "intelligent-cloud-management",
    "Intelligent Cloud Management — cloud engineers managing enterprise infrastructure"
  ),
  "smart-home-automation-powered-by-ai-llm-home-assistant": serviceBanner(
    "smart-home-automation-powered-by-ai-llm-home-assistant",
    "Smart Home Automation Powered by AI & LLM Home Assistant — smart home professional consultation"
  ),
  "it-strategy-innovation-consulting": serviceBanner(
    "it-strategy-innovation-consulting",
    "IT Strategy & Innovation Consulting — executive strategy session"
  ),
  "predictive-performance-marketing": serviceBanner(
    "predictive-performance-marketing",
    "Predictive Performance Marketing — marketing team analyzing campaign performance"
  ),
  "social-media-intelligence": serviceBanner(
    "social-media-intelligence",
    "Social Media Intelligence — team analyzing social media insights"
  ),
  "seo-cognition": serviceBanner(
    "seo-cognition",
    "SEO Cognition — SEO specialist optimizing search performance"
  ),
  "staffing-recruitment-service": serviceBanner(
    "staffing-recruitment-service",
    "Staffing Recruitment Service — recruiter meeting qualified candidate"
  ),
};

export const sectionImages = {
  hero: {
    src: "/images/homepage-banner.png",
    alt: "AI Powered IT Solutions & Staffing — modern office overlooking city skyline",
  },
  heroSecondary: {
    src: e("2026/03/medium-shot-men-working-together-office-2.jpg"),
    alt: "Staffing Recruitment Service",
  },
  valueProp: {
    src: "/images/ai/homepage-value-prop.png",
    alt: "Why your business needs AI powered IT solution",
  },
  whyChooseUs: {
    src: "/images/ai/homepage-why-choose.png",
    alt: "Medium shot of men working together in office",
  },
  aboutStrengths: {
    src: e("2026/02/m07tejm07tejm07t.png"),
    alt: "Elevate experience with our expertise",
  },
  aboutTechnology: {
    src: e("2026/02/lvvknmlvvknmlvvk.png"),
    alt: "Empowering progress through smart technology",
  },
  contactOffice: {
    src: e("2026/03/medium-shot-men-working-together-office.jpg"),
    alt: "Excellanto office team collaboration",
  },
  servicesHero: {
    src: e("2024/05/s4-img-1.webp"),
    alt: "Delivering reliable solutions tailored to your business needs",
  },
  aboutHero: {
    src: e("2026/02/m07tejm07tejm07t.png"),
    alt: "Your partner for superior IT solutions",
  },
  blogHero: {
    src: e("2026/05/Digital-Marketing.jpeg"),
    alt: "Latest news and articles from the blog",
  },
  contactHero: {
    src: e("2026/03/young-employees-sitting-office-table-using-laptop-2.jpg"),
    alt: "Contact Excellanto",
  },
  process: {
    src: e("2024/05/c4-img-1.webp"),
    alt: "Our work process",
  },
  cta: {
    src: "/images/ai/homepage-cta.png",
    alt: "Get AI automation solutions for your business",
  },
  brands: {
    src: e("2024/05/c4-phone.webp"),
    alt: "We build modern experience with brands",
  },
} as const satisfies Record<string, SiteImage>;

export const capabilityImages: Record<string, SiteImage> = {
  "Workflow & Process Automation": {
    src: "/images/ai/capability-automation.png",
    alt: "Workflow & Process Automation",
  },
  "Data Analytics & Business Intelligence": {
    src: "/images/ai/capability-analytics.png",
    alt: "Data Analytics & Business Intelligence",
  },
  "Next Gen Digital Marketing": {
    src: "/images/ai/capability-marketing.png",
    alt: "Next Gen Digital Marketing",
  },
  "HR Recruitment Employee Engagement": {
    src: "/images/ai/capability-hr.png",
    alt: "HR Recruitment Employee Engagement",
  },
};

export const serviceImages: Record<string, SiteImage> = {
  "mobile-app-development": serviceBannerImages["mobile-app-development"],
  "website-development": serviceBannerImages["website-development"],
  "ai-driven-operations-automation": serviceBannerImages["ai-driven-operations-automation"],
  "intelligent-cloud-management": serviceBannerImages["intelligent-cloud-management"],
  "smart-home-automation-powered-by-ai-llm-home-assistant":
    serviceBannerImages["smart-home-automation-powered-by-ai-llm-home-assistant"],
  "it-strategy-innovation-consulting": serviceBannerImages["it-strategy-innovation-consulting"],
  "predictive-performance-marketing": serviceBannerImages["predictive-performance-marketing"],
  "social-media-intelligence": serviceBannerImages["social-media-intelligence"],
  "seo-cognition": serviceBannerImages["seo-cognition"],
  "staffing-recruitment-service": serviceBannerImages["staffing-recruitment-service"],
};

export const processImages: SiteImage[] = [
  {
    src: e("2024/05/s4-img-1.webp"),
    alt: "Project Definition",
  },
  {
    src: e("2024/05/s4-img-2.webp"),
    alt: "Project Analysis",
  },
  {
    src: e("2024/05/s4-img-3.webp"),
    alt: "Planning & Execution",
  },
  {
    src: e("2024/05/s4-img-4.webp"),
    alt: "Results Delivery",
  },
];

export const brandLogos: SiteImage[] = Array.from({ length: 31 }, (_, index) => {
  const id = String(index + 1).padStart(2, "0");
  return {
    src: `/images/brands/2026/${id}.png`,
    alt: `Brand partner ${index + 1}`,
  };
});

export const mobileAppImages = {
  hero: serviceBannerImages["mobile-app-development"],
  process: [
    {
      src: e("2026/03/adult-woman-presenting-business-plan.jpg"),
      alt: "Discovery & Strategy",
    },
    {
      src: e("2026/03/standard-quality-control-concept-m-1.jpg"),
      alt: "UI/UX Design",
    },
    {
      src: e("2024/05/c4-img-1.webp"),
      alt: "Agile Development",
    },
    {
      src: e("2026/03/standard-quality-control-concept-m-2.jpg"),
      alt: "Quality Assurance",
    },
  ],
  industries: {
    src: e("2026/03/medium-shot-men-working-together-office-2.jpg"),
    alt: "Industries We Serve",
  },
  brandsVisual: {
    src: e("2024/05/c4-phone.webp"),
    alt: "We Build Modern Experience with Brands",
  },
} as const;

export const websiteDevImages = {
  hero: serviceBannerImages["website-development"],
  offerings: [
    {
      src: e("2026/03/young-employees-sitting-office-table-using-laptop-2.jpg"),
      alt: "Responsive Website Design",
    },
    {
      src: e("2026/03/cheerful-team-engineers-using-laptop-server-farm-analyzing-data-1.jpg"),
      alt: "Custom Web Application Development",
    },
    {
      src: e("2026/03/social-media-marketing-concept-marketing-with-applications-1.jpg"),
      alt: "CMS Development",
    },
    {
      src: e("2026/03/group-industry-experts-engineers-analyzing-solar-panel-systems-1-1.jpg"),
      alt: "API Integration",
    },
    {
      src: e("2026/03/woman-interacting-with-futuristic-holographic-interface-1.jpg"),
      alt: "UI/UX Design Services",
    },
  ],
  process: [
    {
      src: e("2026/03/adult-woman-presenting-business-plan.jpg"),
      alt: "Consultation",
    },
    {
      src: e("2026/05/strategy-business-brainstorming-graphic-concept.jpg"),
      alt: "Wireframing",
    },
    {
      src: e("2026/03/futuristic-time-machine-1.jpg"),
      alt: "QA Testing +",
    },
    {
      src: e("2026/03/medium-shot-men-working-together-office-2.jpg"),
      alt: "Development",
    },
  ],
  redesign: {
    src: e("2026/03/cheerful-team-engineers-using-laptop-server-farm-analyzing-data-1.jpg"),
    alt: "Modernize Your Website",
  },
  highlights: {
    src: e("2026/03/social-media-marketing-concept-marketing-with-applications-1.jpg"),
    alt: "Security-first, Responsive, Cross-browser, Fast Performance",
  },
} as const;

export const socialMediaImages = {
  hero: serviceBannerImages["social-media-intelligence"],
  intelligenceHub: {
    src: e("2026/03/social-media-marketing-concept-marketing-with-applications-1.jpg"),
    alt: "Social applications and marketing intelligence concept",
  },
  audience: {
    src: e("2026/02/AI-meeting_50.png"),
    alt: "AI-powered audience analytics and team collaboration",
  },
  contentStrategy: {
    src: e("2026/05/Digital-Marketing.jpeg"),
    alt: "Data-driven digital marketing and content strategy",
  },
  realtime: {
    src: e("2026/03/woman-interacting-with-futuristic-holographic-interface-1.jpg"),
    alt: "Real-time social intelligence and live data monitoring",
  },
  competitive: {
    src: e("2026/03/cheerful-team-engineers-using-laptop-server-farm-analyzing-data-1.jpg"),
    alt: "Competitive analytics and market intelligence",
  },
  process: {
    src: e("2026/05/strategy-business-brainstorming-graphic-concept.jpg"),
    alt: "Strategic planning for social media intelligence",
  },
  impact: {
    src: e("2026/03/group-industry-experts-engineers-analyzing-solar-panel-systems-1-1.jpg"),
    alt: "Cross-functional business impact from social insights",
  },
  idealFor: {
    src: e("2026/03/medium-shot-men-working-together-office-2.jpg"),
    alt: "Teams leveraging social media intelligence",
  },
} as const;

export const aiDrivenOperationsImages = {
  hero: serviceBannerImages["ai-driven-operations-automation"],
  heroAccent: {
    src: e("2026/03/futuristic-time-machine-1.jpg"),
    alt: "futuristic time machine 1",
  },
  capabilities: {
    src: e("2026/03/woman-interacting-with-futuristic-holographic-interface-1.jpg"),
    alt: "woman interacting with futuristic holographic interface 1",
  },
  experience: {
    src: e("2026/03/cheerful-team-engineers-using-laptop-server-farm-analyzing-data-1.jpg"),
    alt: "Built with experience, designed for real business challenges",
  },
  process: {
    src: e("2026/05/strategy-business-brainstorming-graphic-concept.jpg"),
    alt: "A clear and structured approach that ensures results",
  },
  industries: {
    src: e("2026/03/group-industry-experts-engineers-analyzing-solar-panel-systems-1-1.jpg"),
    alt: "Supporting businesses across industries with tailored solutions",
  },
  impact: {
    src: e("2026/03/medium-shot-men-working-together-office-2.jpg"),
    alt: "Where AI automation creates the biggest impact in your business",
  },
  future: {
    src: e("2026/02/AI-meeting_50.png"),
    alt: "Building a smarter and future-ready business environment",
  },
} as const;

export const intelligentCloudManagementImages = {
  hero: serviceBannerImages["intelligent-cloud-management"],
  heroAccent: {
    src: e("2026/03/group-industry-experts-engineers-analyzing-solar-panel-systems-1-1.jpg"),
    alt: "group industry experts engineers analyzing solar panel systems 1 1",
  },
  results: {
    src: e("2026/03/group-industry-experts-engineers-analyzing-solar-panel-systems-1-1.jpg"),
    alt: "group industry experts engineers analyzing solar panel systems 1 1",
  },
  businessFunctions: {
    src: e("2026/03/cheerful-team-engineers-using-laptop-server-farm-analyzing-data-1.jpg"),
    alt: "cheerful team engineers using laptop server farm analyzing data 1",
  },
  industries: {
    src: e("2026/03/cheerful-team-engineers-using-laptop-server-farm-analyzing-data-1.jpg"),
    alt: "cheerful team engineers using laptop server farm analyzing data 1",
  },
  infrastructure: {
    src: e("2026/03/young-employees-sitting-office-table-using-laptop-2-1.jpg"),
    alt: "Designed around your infrastructure, not forced onto it",
  },
  process: {
    src: e("2026/05/strategy-business-brainstorming-graphic-concept.jpg"),
    alt: "A practical approach that ensures smooth execution",
  },
} as const;

export const itStrategyInnovationImages = {
  hero: serviceBannerImages["it-strategy-innovation-consulting"],
  heroAccent: {
    src: e("2026/05/strategy-business-brainstorming-graphic-concept.jpg"),
    alt: "IT Strategy & Innovation Consulting",
  },
  infrastructure: {
    src: e("2026/03/young-employees-sitting-office-table-using-laptop-2-1.jpg"),
    alt: "Designed around your infrastructure, not forced onto it",
  },
  results: {
    src: e("2026/03/group-industry-experts-engineers-analyzing-solar-panel-systems-1-1.jpg"),
    alt: "When cloud management is done right, results follow naturally",
  },
} as const;

export const predictivePerformanceMarketingImages = {
  hero: serviceBannerImages["predictive-performance-marketing"],
  heroAccent: {
    src: e("2024/05/ch4-img-2.webp"),
    alt: "ch4 img 2",
  },
  whyChooseUs: {
    src: e("2024/05/ch4-img-1.webp"),
    alt: "ch4 img 1",
  },
  overview: {
    src: e("2026/05/Digital-Marketing.jpeg"),
    alt: "Predictive Performance Marketing",
  },
  conversions: {
    src: e("2024/05/ch1-img-2.webp"),
    alt: "ch1 img 2",
  },
  dataExecution: {
    src: e("2024/05/bg-il-2.webp"),
    alt: "bg il 2",
  },
  capabilities: {
    src: e("2026/05/Digital-Marketing.jpeg"),
    alt: "Key capabilities that power your marketing growth",
  },
  process: {
    src: e("2026/05/strategy-business-brainstorming-graphic-concept.jpg"),
    alt: "A clear and structured approach that ensures results",
  },
  idealFor: {
    src: e("2024/05/ch4-img-1.webp"),
    alt: "Designed for businesses focused on growth",
  },
  impact: {
    src: e("2024/05/ch4-img-2.webp"),
    alt: "Where predictive performance marketing creates impact",
  },
} as const;

export const seoCognitionImages = {
  hero: serviceBannerImages["seo-cognition"],
  strategy: {
    src: e("2026/03/young-employees-sitting-office-table-using-laptop-2-1.jpg"),
    alt: "SEO team optimizing search performance",
  },
  keywords: {
    src: e("2026/05/SEO-services.jpeg"),
    alt: "Keyword intelligence and SEO research",
  },
  onPage: {
    src: e("2024/05/ch4-img-1.webp"),
    alt: "On-page SEO optimization and content structure",
  },
  technical: {
    src: e("2024/05/ch4-img-2.webp"),
    alt: "Technical SEO and website foundation",
  },
  content: {
    src: e("2024/05/ch1-img-2.webp"),
    alt: "SEO content strategy and authority building",
  },
  accent: {
    src: e("2024/05/bg-il-2.webp"),
    alt: "Structured SEO growth framework",
  },
} as const;

export const staffingRecruitmentImages = {
  hero: serviceBannerImages["staffing-recruitment-service"],
  approach: {
    src: e("2024/05/feh-n3-img-1.webp"),
    alt: "Focused hiring approach and candidate evaluation",
  },
  expertise: {
    src: e("2026/03/medium-shot-men-working-together-office.jpg"),
    alt: "Technology professionals collaborating in office",
  },
  process: {
    src: e("2026/05/strategy-business-brainstorming-graphic-concept.jpg"),
    alt: "Structured hiring process workflow",
  },
  segments: [
    {
      src: e("2024/05/ch4-img-1.webp"),
      alt: "Startup team building foundational talent",
    },
    {
      src: e("2024/05/ch4-img-2.webp"),
      alt: "Growing company scaling quality teams",
    },
    {
      src: e("2024/05/ch4-img-3.webp"),
      alt: "Enterprise specialized hiring solutions",
    },
  ],
  impact: {
    src: e("2026/03/medium-shot-men-working-together-office.jpg"),
    alt: "Long-term value from better hiring decisions",
  },
} as const;

export const blogImages: Record<string, SiteImage> = {
  "seo-vs-aeo-vs-aio-vs-geo-key-differences": {
    src: e("2026/05/SEO-services.jpeg"),
    alt: "SEO vs AEO vs AIO vs GEO: Key Differences in Modern Search Optimization",
  },
  "ai-seo-and-digital-marketing-agency-delhi": {
    src: e("2026/05/Digital-Marketing.jpeg"),
    alt: "AI Powered Internet Marketing Agency in Delhi",
  },
  "cyber-security-services-in-new-friends-colony-delhi": {
    src: e("2026/03/medium-shot-men-working-together-office-2.jpg"),
    alt: "Cyber Security Services in New Friends Colony Delhi",
  },
  "digital-marketing-company-in-east-of-kailash-delhi": {
    src: e("2026/05/Digital-Marketing.jpeg"),
    alt: "Digital Marketing Company in East of Kailash Delhi",
  },
  "seo-services-provider-near-govindpuri-delhi": {
    src: e("2026/05/SEO-services.jpeg"),
    alt: "SEO Services Provider Near Govindpuri Delhi",
  },
};

export function getServiceImage(slug: string): SiteImage {
  return (
    serviceImages[slug] ?? {
      src: e("2024/05/s4-img-1.webp"),
      alt: "Excellanto services",
    }
  );
}

export function getBlogImage(slug: string): SiteImage {
  return (
    blogImages[slug] ?? {
      src: e("2026/05/Digital-Marketing.jpeg"),
      alt: "Excellanto blog article",
    }
  );
}

export function getCapabilityImage(title: string): SiteImage {
  return (
    capabilityImages[title] ?? {
      src: e("2024/05/h2-item-1.webp"),
      alt: title,
    }
  );
}

export function getIndustryImage(title: string): SiteImage {
  return {
    src: e("2026/03/person-using-ar-technology-perform-their-occupation.jpg"),
    alt: title,
  };
}
