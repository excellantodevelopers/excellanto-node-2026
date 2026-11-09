/**
 * Seeds the production dataset with current excellanto.com site copy.
 * Run from sanity/: npm run seed
 */
import { createClient } from "@sanity/client";
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(path.join(__dirname, "..", ".env"));
loadEnvFile(path.join(__dirname, "..", "..", ".env.local"));

function readCliAuthToken() {
  const candidates = [
    path.join(os.homedir(), ".config", "sanity", "config.json"),
    path.join(os.homedir(), "AppData", "Roaming", "sanity", "config.json"),
  ];
  for (const filePath of candidates) {
    if (!fs.existsSync(filePath)) continue;
    try {
      const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
      if (parsed.authToken) return parsed.authToken;
    } catch {
      // ignore unreadable config
    }
  }
  return undefined;
}

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";
const token = process.env.SANITY_AUTH_TOKEN || readCliAuthToken();

if (!projectId) {
  throw new Error("Missing SANITY_STUDIO_PROJECT_ID in sanity/.env");
}
if (!token) {
  throw new Error(
    "Missing Sanity auth token. Run `npx sanity login` in sanity/, then `npm run seed`."
  );
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});
const wp = (path) => `https://excellanto.com/wp-content/uploads/${path}`;

const key = (id) => id.replace(/[^a-zA-Z0-9_-]/g, "-");
const img = (url, alt) => ({ _type: "siteImage", url, alt });
const cta = (label, href) => ({ _type: "ctaButton", label, href });
const nav = (label, href, mega = false) => ({
  _type: "navLink",
  _key: key(href),
  label,
  href,
  mega,
});
const titled = (title, body) => ({ _type: "titledBody", title, body });
const block = (text, style, id) => ({
  _type: "block",
  _key: id,
  style,
  markDefs: [],
  children: [{ _type: "span", _key: `${id}-span`, text, marks: [] }],
});

const services = [
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortTitle: "Mobile App Development",
    description:
      "Why Choose Our Mobile App Development Services? We understand that every business is unique. Our expert team of developers crafts tailored mobile apps to match your specific needs and goals.",
    megaDescription: "Custom mobile apps for iOS and Android",
    icon: "Smartphone",
    category: "development",
    featured: false,
    sortOrder: 0,
    features: [
      "CUSTOM SOLUTION",
      "CUTTING EDGE TECHNOLOGY",
      "CROSS PLATFORM EXPERTISE",
      "AGILE DEVELOPMENT",
      "QUALITY ASSURANCE",
    ],
    detailIntro:
      "At Excellanto, we believe that exceptional mobile app development goes far beyond writing lines of code — it’s about understanding your business, your audience, and your vision.",
    image: img(wp("2026/03/person-using-ar-technology-perform-their-occupation.jpg"), "Mobile App Development"),
    bannerEyebrow: "Mobile App Development",
    mobileHeroEyebrow: "Mobile App Development",
    mobileHeroTitle: "Why Choose Our Mobile App Development Services?",
    mobileHeroImage: img(
      wp("2026/03/person-using-ar-technology-perform-their-occupation.jpg"),
      "Why Choose Our Mobile App Development Services?"
    ),
    mobileWhyChoose: [
      {
        _key: "mw1",
        title: "CUSTOM SOLUTION",
        body: "We understand that every business is unique. Our expert team of developers crafts tailored mobile apps to match your specific needs and goals.",
      },
      {
        _key: "mw2",
        title: "CUTTING EDGE TECHNOLOGY",
        body: "Excellanto stays at the forefront of mobile technology, using the latest tools and frameworks to deliver high-performance, scalable, and secure applications.",
      },
      {
        _key: "mw3",
        title: "CROSS PLATFORM EXPERTISE",
        body: "Our development team is proficient in building apps for both iOS and Android platforms, reducing development time and costs without compromising quality.",
      },
      {
        _key: "mw4",
        title: "AGILE DEVELOPMENT",
        body: "We follow Agile methodologies to ensure transparency, adaptability, and timely delivery of your mobile app.",
      },
      {
        _key: "mw5",
        title: "QUALITY ASSURANCE",
        body: "Rigorous testing and quality checks are an essential part of our development process, guaranteeing a bug-free, smooth-running application.",
      },
    ],
    mobileProcessEyebrow: "our process",
    mobileProcessTitle: "How We Build Powerful Mobile Apps That Deliver Results",
    mobileProcessIntro:
      "At Excellanto, we believe that exceptional mobile app development goes far beyond writing lines of code — it’s about understanding your business, your audience, and your vision.",
    mobileProcessSteps: [
      {
        _type: "processStep",
        _key: "mp1",
        step: "01",
        title: "Discovery & Strategy",
        body: "Every successful app starts with a strong foundation. We begin by analyzing your idea, target audience, and industry trends to create a clear strategy for your mobile application development journey.",
        image: img(wp("2026/03/adult-woman-presenting-business-plan.jpg"), "Discovery & Strategy"),
      },
      {
        _type: "processStep",
        _key: "mp2",
        step: "02",
        title: "UI/UX Design",
        body: "Design isn’t just about aesthetics — it’s about experience. Our design team creates intuitive, engaging interfaces that offer seamless navigation and drive user retention.",
        image: img(wp("2026/03/standard-quality-control-concept-m-1.jpg"), "UI/UX Design"),
      },
      {
        _type: "processStep",
        _key: "mp3",
        step: "03",
        title: "Agile Development",
        body: "Our expert mobile app developers follow agile methodologies to accelerate the development process while maintaining flexibility and focus on performance and quality.",
        image: img(wp("2024/05/c4-img-1.webp"), "Agile Development"),
      },
      {
        _type: "processStep",
        _key: "mp4",
        step: "04",
        title: "Quality Assurance",
        body: "We perform rigorous testing, including functionality validation, and device compatibility checks to ensure your app performs seamlessly under various conditions.",
        image: img(wp("2026/03/standard-quality-control-concept-m-2.jpg"), "Quality Assurance"),
      },
    ],
    mobileBrandsTitle: "We Build Modern Experience with Brands",
    mobileIndustriesEyebrow: "chy choose us",
    mobileIndustriesTitle: "Industries We Serve",
    mobileIndustriesIntro:
      "From agile startups to established enterprises, we help brands across industries leverage cutting-edge mobile application development to stay competitive in the digital space.",
    mobileIndustriesImage: img(wp("2026/03/medium-shot-men-working-together-office-2.jpg"), "Industries We Serve"),
    mobileIndustries: [
      { _key: "i1", title: "E-Commerce", icon: "ShoppingCart" },
      { _key: "i2", title: "Healthcare", icon: "HeartPulse" },
      { _key: "i3", title: "Finance", icon: "Landmark" },
      { _key: "i4", title: "Education", icon: "Globe" },
      { _key: "i5", title: "Travel", icon: "Plane" },
      { _key: "i6", title: "Real Estate", icon: "Building2" },
    ],
  },
  {
    slug: "website-development",
    title: "Website Development",
    shortTitle: "Website Development",
    description:
      "Our Offerings Include Responsive Website Design, Custom Web Application Development, CMS Development, API Integration, and UI/UX Design Services.",
    megaDescription: "Responsive websites, CMS & UI/UX",
    icon: "MonitorSmartphone",
    category: "development",
    featured: false,
    sortOrder: 1,
    features: [
      "Responsive Website Design",
      "Custom Web Application Development",
      "CMS Development",
      "API Integration",
      "UI/UX Design Services",
      "Website Redesign & Migration",
    ],
    detailIntro:
      "Mobile-friendly designs that adapt to all screen sizes. Tailored solutions for your unique business needs.",
    image: img(wp("2026/03/apps-workplace-social-media-holding-profession.jpg"), "Website Development"),
    bannerEyebrow: "Website Development",
    websiteHeroEyebrow: "Website Development",
    websiteHeroTitle: "Why Choose Excellanto?",
    websiteHeroImage: img(wp("2026/03/apps-workplace-social-media-holding-profession.jpg"), "Why Choose Excellanto?"),
    websiteOfferingsTitle: "Our Offerings Include",
    websiteOfferings: [
      {
        _key: "wo1",
        title: "Responsive Website Design",
        body: "Mobile-friendly designs that adapt to all screen sizes.",
        image: img(wp("2026/03/young-employees-sitting-office-table-using-laptop-2.jpg"), "Responsive Website Design"),
      },
      {
        _key: "wo2",
        title: "Custom Web Application Development",
        body: "Tailored solutions for your unique business needs.",
        image: img(
          wp("2026/03/cheerful-team-engineers-using-laptop-server-farm-analyzing-data-1.jpg"),
          "Custom Web Application Development"
        ),
      },
      {
        _key: "wo3",
        title: "CMS Development",
        body: "WordPress, Joomla, Drupal solutions",
        image: img(
          wp("2026/03/social-media-marketing-concept-marketing-with-applications-1.jpg"),
          "CMS Development"
        ),
      },
      {
        _key: "wo4",
        title: "API Integration",
        body: "Seamless backend solutions",
        image: img(
          wp("2026/03/group-industry-experts-engineers-analyzing-solar-panel-systems-1-1.jpg"),
          "API Integration"
        ),
      },
      {
        _key: "wo5",
        title: "UI/UX Design Services",
        body: "Beautiful, user-friendly interfaces",
        image: img(
          wp("2026/03/woman-interacting-with-futuristic-holographic-interface-1.jpg"),
          "UI/UX Design Services"
        ),
      },
    ],
    websiteWhyTitle: "Why Choose Excellanto?",
    websiteWhyChoose: [
      { _key: "ww1", title: "100% Customized", body: "Tailored solutions for your business needs" },
      { _key: "ww2", title: "Cross-browser Compatible", body: "W3C validated code that works everywhere" },
      { _key: "ww3", title: "SEO-Optimized", body: "Better visibility on search engines" },
      { _key: "ww4", title: "Expert UI/UX", body: "Designs focused on conversion" },
    ],
    websiteProcessSteps: [
      {
        _type: "processStep",
        _key: "wp1",
        step: "01",
        title: "Consultation",
        body: "Requirement Gathering",
        image: img(wp("2026/03/adult-woman-presenting-business-plan.jpg"), "Consultation"),
      },
      {
        _type: "processStep",
        _key: "wp2",
        step: "02",
        title: "Wireframing",
        body: "Design Planning",
        image: img(wp("2026/05/strategy-business-brainstorming-graphic-concept.jpg"), "Wireframing"),
      },
      {
        _type: "processStep",
        _key: "wp3",
        step: "03",
        title: "QA Testing +",
        body: "Performance Optimization",
        image: img(wp("2026/03/futuristic-time-machine-1.jpg"), "QA Testing +"),
      },
      {
        _type: "processStep",
        _key: "wp4",
        step: "04",
        title: "Development",
        body: "Coding",
        image: img(wp("2026/03/medium-shot-men-working-together-office-2.jpg"), "Development"),
      },
    ],
    websiteRedesignEyebrow: "Website Redesign & Migration",
    websiteRedesignTitle: "Modernize Your Website",
    websiteRedesignItems: [
      "Revamp outdated websites for modern appeal",
      "Migrate from Wix, Squarespace to WordPress",
      "Improve site speed and responsiveness",
      "Retain SEO rankings and URL structure",
    ],
    websiteRedesignImage: img(
      wp("2026/03/cheerful-team-engineers-using-laptop-server-farm-analyzing-data-1.jpg"),
      "Modernize Your Website"
    ),
    websiteHighlights: ["Security-first", "Responsive", "Cross-browser", "Fast Performance"],
    websiteHighlightsImage: img(
      wp("2026/03/social-media-marketing-concept-marketing-with-applications-1.jpg"),
      "Security-first, Responsive, Cross-browser, Fast Performance"
    ),
    websiteDiscoverMore: "Discover More",
  },
  {
    slug: "ai-driven-operations-automation",
    title: "AI-Driven Operations Automation",
    shortTitle: "AI-Driven Operations Automation",
    description:
      "Leverage AI-powered automation to streamline business workflows, reduce manual processes, and improve operational efficiency. Our intelligent systems enable faster decision-making, optimize routine operations, and provide predictive insights that help organizations build scalable, high-performance digital operations.",
    megaDescription: "AI workflows & process automation",
    icon: "Bot",
    category: "ai-cloud",
    featured: true,
    sortOrder: 2,
    features: [
      "AI-based workflow automation",
      "Intelligent process optimization",
      "Robotic Process Automation (RPA)",
      "Enterprise system integration (ERP, CRM, APIs)",
    ],
    detailIntro:
      "Turning everyday operations into intelligent, automated systems. Traditional automation focuses only on repetitive tasks, but modern businesses require much more than that. Our AI-driven approach ensures that your operations are not only automated but also capable of learning, adapting, and improving over time.",
    image: img("/images/services/ai-driven-operations-automation.png", "AI-Driven Operations Automation"),
  },
  {
    slug: "intelligent-cloud-management",
    title: "Intelligent Cloud Management",
    shortTitle: "Intelligent Cloud Management",
    description:
      "Optimize enterprise cloud infrastructure with AI-driven resource management and performance monitoring. Our intelligent cloud solutions improve scalability, strengthen security, and reduce operational costs while delivering reliable performance across hybrid and multi-cloud environments.",
    megaDescription: "Hybrid & multi-cloud management",
    icon: "Cloud",
    category: "ai-cloud",
    featured: true,
    sortOrder: 3,
    features: [
      "Multi-cloud & hybrid environment management",
      "Cloud infrastructure optimization",
      "Resource allocation & cost control",
      "Continuous performance monitoring",
      "Security management & compliance support",
      "Automation of cloud operations",
    ],
    detailIntro:
      "Bringing structure and control to complex cloud environments. At Excellanto, we deliver Intelligent Cloud Management solutions that bring clarity, control, and performance to your cloud ecosystem while supporting long-term business growth.",
    image: img("/images/services/intelligent-cloud-management.png", "Intelligent Cloud Management"),
  },
  {
    slug: "smart-home-automation-powered-by-ai-llm-home-assistant",
    title: "Smart Home Automation Powered by AI & LLM Home Assistant",
    shortTitle: "Smart Home Automation",
    description:
      "Experience the next generation of home automation with an AI-powered Large Language Model (LLM) Home Assistant that understands natural conversations and intelligently manages your connected devices. Move beyond traditional automation rules and enjoy a home that adapts to your lifestyle, preferences, and daily routines.",
    megaDescription: "AI & LLM Home Assistant",
    icon: "House",
    category: "development",
    featured: false,
    sortOrder: 4,
    features: [
      "Open, Flexible & Vendor-Independent Automation",
      "Hybrid Architecture for Maximum Performance",
      "Freedom from Vendor Lock-In",
    ],
    detailIntro:
      "Transform Your Home Into an Intelligent Living Space. Our smart home solutions combine advanced automation technologies with cutting-edge AI to create a seamless, intuitive, and future-ready living environment.",
    image: img(wp("2026/06/freedom-maq15gmaq15gmaq1.png"), "Smart Home Automation Powered by AI & LLM Home Assistant"),
  },
  {
    slug: "it-strategy-innovation-consulting",
    title: "IT Strategy & Innovation Consulting",
    shortTitle: "IT Strategy & Innovation Consulting",
    description:
      "Partner with Excellanto experts to design strategic IT roadmaps and innovation-driven transformation initiatives. We help organizations align technology investments with business goals, accelerate digital adoption, and build future-ready enterprise technology ecosystems.",
    megaDescription: "IT strategy & innovation consulting",
    icon: "Compass",
    category: "ai-cloud",
    featured: true,
    sortOrder: 5,
    features: [
      "Strategic IT roadmaps",
      "Innovation-driven transformation",
      "Align technology with business goals",
      "Accelerate digital adoption",
    ],
    detailIntro:
      "Turning technology decisions into business advantages. Partner with Excellanto experts to design strategic IT roadmaps and innovation-driven transformation initiatives.",
    image: img("/images/services/it-strategy-innovation-consulting.jpg", "IT Strategy & Innovation Consulting"),
  },
  {
    slug: "predictive-performance-marketing",
    title: "Predictive Performance Marketing",
    shortTitle: "Predictive Performance Marketing",
    description:
      "Run high-impact marketing campaigns powered by predictive analytics and AI-driven optimization. Identify high-conversion opportunities, forecast customer behavior, and maximize campaign ROI with intelligent targeting and continuous performance improvements.",
    megaDescription: "Predictive analytics & campaign ROI",
    icon: "TrendingUp",
    category: "marketing",
    featured: true,
    sortOrder: 6,
    features: [
      "Predictive Analytics",
      "Audience Segmentation",
      "Campaign Optimization",
      "Budget Optimization",
      "Multi-Channel Execution",
      "Performance Tracking",
    ],
    detailIntro:
      "Marketing that focuses on conversions, not just visibility. Run high-impact marketing campaigns powered by predictive analytics and AI-driven optimization.",
    image: img("/images/services/predictive-performance-marketing.jpeg", "Predictive Performance Marketing"),
  },
  {
    slug: "social-media-intelligence",
    title: "Social Media Intelligence",
    shortTitle: "Social Media Intelligence",
    description:
      "At Excellanto, we transform social media activity into actionable intelligence that drives business decisions, strengthens brand positioning, and delivers measurable growth.",
    megaDescription: "Social media intelligence & analytics",
    icon: "Share2",
    category: "marketing",
    featured: true,
    sortOrder: 7,
    features: [
      "Identify what content drives real engagement",
      "Track how users interact with your brand",
      "Discover hidden opportunities for growth",
      "Align social media efforts with business goals",
    ],
    detailIntro:
      "Social media platforms are constantly generating valuable data. Excellanto applies AI-driven analytics, behavioral tracking, and predictive insights to convert this data into strategies that improve engagement, optimize campaigns, and accelerate business outcomes.",
    image: img("/images/services/social-media-intelligence.jpg", "Social Media Intelligence"),
  },
  {
    slug: "seo-cognition",
    title: "SEO Cognition",
    shortTitle: "SEO Cognition",
    description:
      "At Excellanto, we deliver advanced Search Engine Optimization services designed to position your business at the top of search results, attract high-intent traffic, and convert visibility into measurable growth.",
    megaDescription: "AI-driven SEO & organic growth",
    icon: "Search",
    category: "marketing",
    featured: true,
    sortOrder: 8,
    features: [
      "Achieve higher rankings for competitive keywords",
      "Attract targeted users actively searching for your services",
      "Generate qualified organic leads consistently",
      "Strengthen brand authority in your industry",
    ],
    detailIntro:
      "Our expert SEO team works as an extension of your business—analyzing, optimizing, and refining every element of your website to ensure it performs effectively across search engines.",
    image: img("/images/services/seo-cognition.jpeg", "SEO Cognition"),
  },
  {
    slug: "staffing-recruitment-service",
    title: "Staffing Recruitment Service",
    shortTitle: "Staffing Recruitment Service",
    description:
      "Building the right team is no longer a routine hiring activity—it is a business-critical function that directly impacts growth, delivery capability, and long-term success.",
    megaDescription: "Strategic staffing & recruitment",
    icon: "UserCheck",
    category: "talent",
    featured: false,
    sortOrder: 9,
    features: [
      "Stronger and more capable teams",
      "Reduced employee turnover",
      "Faster project execution",
      "Improved overall performance",
    ],
    detailIntro:
      "At Excellanto, we approach staffing and recruitment as a strategic business solution, not a transactional service. We work closely with organizations to understand how talent fits into their larger vision, and then we design hiring strategies that deliver not just candidates, but the right people who can create measurable impact.",
    image: img(wp("2026/05/strategy-business-brainstorming-graphic-concept.jpg"), "Staffing Recruitment Service"),
  },
];

const JUNK_PARAGRAPH = /all rights reserved|hacked by|support@excellanto\.com|connect with excellanto|^tag:|^share:|recent posts|quick links|say hello/i;

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function paragraphsToBlocks(paragraphs, prefix) {
  return paragraphs
    .map((text) => text.trim())
    .filter((text) => text.length > 40 && !JUNK_PARAGRAPH.test(text))
    .map((text, index) => block(text, "normal", `${prefix}-${index}`));
}

async function uploadImageFromUrl(url, filename) {
  if (!url) return null;
  const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!response.ok) {
    console.warn(`Skipping image ${url}: ${response.status}`);
    return null;
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  return client.assets.upload("image", buffer, { filename });
}

async function fetchBlogFromSite(url) {
  const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, redirect: "follow" });
  if (!response.ok) return null;
  const html = await response.text();
  const title = htmlToText((html.match(/<title[^>]*>([^<]+)<\/title>/i) || [])[1] || "");
  const headings = [...html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map((match) => ({
    tag: match[1].toLowerCase(),
    text: htmlToText(match[2]),
  }));
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => htmlToText(match[1]))
    .filter((text) => text.length > 30 && !text.startsWith("Excellanto is at the forefront"));
  const images = [
    ...new Set(
      [...html.matchAll(/src=["']([^"']*wp-content\/uploads[^"']+)["']/gi)].map((match) => {
        try {
          return new URL(match[1], url).href;
        } catch {
          return match[1];
        }
      })
    ),
  ].filter((src) => !/-\d+x\d+\./.test(src) && !/logo/i.test(src));
  return { title, headings, paragraphs, images };
}

const blogSeeds = [
  {
    slug: "seo-vs-aeo-vs-aio-vs-geo-key-differences",
    url: "https://excellanto.com/seo-vs-aeo-vs-aio-vs-geo-key-differences.htm",
    title: "SEO vs AEO vs AIO vs GEO: Key Differences in Modern Search Optimization",
    categoryTitle: "SEO",
    imageUrl: "https://excellanto.com/wp-content/uploads/2026/05/SEO-services.jpeg",
    publishedDate: "2026-05-12T00:00:00.000Z",
  },
  {
    slug: "ai-seo-and-digital-marketing-agency-delhi",
    url: "https://excellanto.com/ai-seo-and-digital-marketing-agency-delhi.htm",
    title: "AI Powered Internet Marketing Agency in Delhi",
    categoryTitle: "Digital Marketing",
    imageUrl: "https://excellanto.com/wp-content/uploads/2026/05/Digital-Marketing.jpeg",
    publishedDate: "2026-05-08T00:00:00.000Z",
  },
  {
    slug: "cyber-security-services-in-new-friends-colony-delhi",
    url: "https://excellanto.com/cyber-security-services-in-new-friends-colony-delhi.htm",
    title: "Cyber Security Services in New Friends Colony Delhi",
    categoryTitle: "Cyber Security",
    imageUrl: "https://excellanto.com/wp-content/uploads/2026/03/medium-shot-men-working-together-office-2.jpg",
    publishedDate: "2026-03-20T00:00:00.000Z",
  },
  {
    slug: "digital-marketing-company-in-east-of-kailash-delhi",
    url: "https://excellanto.com/digital-marketing-company-in-east-of-kailash-delhi.htm",
    title: "Digital Marketing Company in East of Kailash Delhi",
    categoryTitle: "Digital Marketing",
    imageUrl: "https://excellanto.com/wp-content/uploads/2026/05/Digital-Marketing.jpeg",
    publishedDate: "2026-05-02T00:00:00.000Z",
  },
  {
    slug: "seo-services-provider-near-govindpuri-delhi",
    url: "https://excellanto.com/seo-services-provider-near-govindpuri-delhi.htm",
    title: "SEO Services Provider Near Govindpuri Delhi",
    categoryTitle: "SEO",
    imageUrl: "https://excellanto.com/wp-content/uploads/2026/05/SEO-services.jpeg",
    publishedDate: "2026-04-18T00:00:00.000Z",
  },
];

async function seedBlogs() {
  const existing = await client.fetch(`*[_type == "blog"]{ "slug": slug.current, title }`);
  const existingSlugs = new Set((existing || []).map((item) => item.slug).filter(Boolean));
  const refPath = path.join(__dirname, "..", "..", "scripts", "ref-blogs.json");
  const scraped = fs.existsSync(refPath) ? JSON.parse(fs.readFileSync(refPath, "utf8")) : {};

  await client.createOrReplace({
    _id: "author-excellanto",
    _type: "author",
    name: "Excellanto Ventures",
    bio: "Excellanto is at the forefront of leading the way, powering next-generation enterprises with comprehensive AI powered Software Solutions, Next Gen Digital Marketing Services and Workflow Automation end-to-end solutions.",
  });

  const categoryIds = {};
  for (const title of [...new Set(blogSeeds.map((item) => item.categoryTitle))]) {
    const id = `category-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    categoryIds[title] = id;
    await client.createOrReplace({
      _id: id,
      _type: "category",
      title,
      slug: { _type: "slug", current: title.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
    });
  }

  let created = 0;
  for (const post of blogSeeds) {
    if (existingSlugs.has(post.slug)) continue;
    const local = scraped[post.url];
    const live = local?.paragraphs?.length ? local : await fetchBlogFromSite(post.url);
    const articleTitle =
      live?.headings?.find((item) => item.tag === "h3" && item.text && !JUNK_PARAGRAPH.test(item.text))?.text ||
      post.title;
    const paragraphs = live?.paragraphs || [];
    const content = paragraphsToBlocks(paragraphs, post.slug);
    const excerpt = paragraphs.find((text) => text.length > 80 && !JUNK_PARAGRAPH.test(text)) || articleTitle;
    const imageCandidates = [...new Set([post.imageUrl, ...(live?.images || [])].filter(Boolean))];
    let asset = null;
    for (const candidate of imageCandidates) {
      asset = await uploadImageFromUrl(candidate, `${post.slug}.jpg`);
      if (asset) break;
    }
    if (!asset) {
      console.warn(`No downloadable image for ${post.slug}; creating the post without a featured image.`);
    }

    await client.createOrReplace({
      _id: `blog-${post.slug}`,
      _type: "blog",
      title: articleTitle,
      slug: { _type: "slug", current: post.slug },
      excerpt: excerpt.slice(0, 500),
      content,
      author: { _type: "reference", _ref: "author-excellanto" },
      category: { _type: "reference", _ref: categoryIds[post.categoryTitle] },
      publishedDate: post.publishedDate,
      tags: [post.categoryTitle, "Excellanto"],
      isPublished: true,
      seoTitle: articleTitle.slice(0, 70),
      seoDescription: excerpt.slice(0, 160),
      ...(asset
        ? {
            featuredImage: {
              _type: "image",
              asset: { _type: "reference", _ref: asset._id },
              alt: articleTitle,
            },
          }
        : {}),
    });
    created += 1;
    console.log(`Seeded blog: ${articleTitle}`);
  }
  console.log(`Blog posts created: ${created}. Already present: ${existingSlugs.size}.`);
}

async function verifyCms() {
  const report = await client.fetch(`{
    "settings": *[_id == "siteSettings"][0]{ name, tagline, phone, email, "nav": count(navLinks), "footer": count(footerCompanyLinks) },
    "homepage": *[_id == "homepage"][0]{ heroTitle, heroHighlight, heroBody, servicesTitle, processTitle, ctaTitle, "capabilities": count(capabilities), "steps": count(processSteps), "why": count(whyCards) },
    "about": *[_id == "aboutPage"][0]{ title, eyebrow, "mission": mission.title },
    "contact": *[_id == "contactPage"][0]{ title, formTitle, firstNameLabel },
    "servicesPage": *[_id == "servicesPage"][0]{ title, "categories": count(categories) },
    "blogPage": *[_id == "blogPage"][0]{ title, readMoreLabel },
    "services": count(*[_type == "service"]),
    "serviceTitles": *[_type == "service"] | order(sortOrder asc) { title, "slug": slug.current },
    "legal": *[_type == "legalPage"]{ title, "slug": slug.current },
    "blogs": *[_type == "blog"]{ title, "slug": slug.current, isPublished }
  }`);
  console.log(JSON.stringify(report, null, 2));
  const missing = [];
  if (!report.settings?.name) missing.push("Site Settings");
  if (!report.homepage?.heroTitle) missing.push("Homepage");
  if (!report.about?.title) missing.push("About");
  if (!report.contact?.title) missing.push("Contact");
  if (!report.servicesPage?.title) missing.push("Services index");
  if (!report.blogPage?.title) missing.push("Blog listing");
  if (report.services < 10) missing.push("Services (expected 10)");
  if ((report.legal || []).length < 2) missing.push("Legal pages");
  if (missing.length) {
    throw new Error(`CMS verification failed. Empty or missing: ${missing.join(", ")}`);
  }
  console.log("Verification passed: Homepage and all CMS sections contain existing website content.");
}

export default async function seed() {
  const docs = [
    {
      _id: "siteSettings",
      _type: "siteSettings",
      name: "Excellanto",
      tagline: "AI Powered IT Solutions & Staffing",
      description:
        "Excellanto is at the forefront of leading the way, powering next-generation enterprises with comprehensive AI powered Software Solutions, Next Gen Digital Marketing Services and Workflow Automation end-to-end solutions, while extending our footprint as a global provider of onshore & outsourced IT services",
      url: "https://excellanto.com",
      logo: img("/images/excellanto-logo-white.png", "Excellanto"),
      phone: "+91 96677 97078",
      phoneSecondary: "+91 96677 97017",
      email: "support@excellanto.com",
      emailSecondary: "info@excellanto.com",
      address: "191-192 Neelkanth Plaza, Sant Nagar, 4th Floor East of Kailash New Delhi 110065",
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      linkedin: "https://in.linkedin.com/company/excellanto",
      navLinks: [
        nav("Home", "/"),
        nav("Services", "/services", true),
        nav("About Us", "/about"),
        nav("Blog", "/blog"),
        nav("Contact Us", "/contact"),
      ],
      headerCta: cta("Let’s Talk", "/contact"),
      primaryCta: cta("Let’s Talk", "/contact"),
      secondaryCta: cta("Contact Us", "/contact"),
      footerServicesTitle: "Services",
      footerCompanyTitle: "Quick Links",
      footerResourcesTitle: "say hello",
      footerCompanyLinks: [
        nav("About Us", "/about"),
        nav("Blog", "/blog"),
        nav("Contact Us", "/contact"),
      ],
      footerResourceLinks: [
        nav("All Services", "/services"),
        nav("Privacy Policy", "/privacy-policy"),
        nav("Terms condition", "/terms-condition"),
      ],
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
      seoTitle: "Excellanto | AI-Powered IT Solutions & Staffing",
      seoDescription:
        "Excellanto is at the forefront of leading the way, powering next-generation enterprises with comprehensive AI powered Software Solutions, Next Gen Digital Marketing Services and Workflow Automation end-to-end solutions, while extending our footprint as a global provider of onshore & outsourced IT services",
      seoAuthor: "Excellanto Ventures",
      seoKeywords: ["AI Web & Mobile Solutions", "Digital Marketing", "SEO Services", "Excellanto"],
    },
    {
      _id: "homepage",
      _type: "homepage",
      heroEyebrow: "",
      heroTitle: "AI Powered IT Solutions &",
      heroHighlight: "Staffing",
      heroSubtitle: "Streamlining Operations Accelerating Outcomes",
      heroBody:
        "We provide advanced AI-powered IT solutions that streamline business operations, improve strategic decision-making, and deliver measurable results. Our intelligent technology platforms enable organizations to scale efficiently, strengthen security, and operate with greater speed, agility, and confidence.",
      heroPrimaryCta: cta("Let’s Talk", "/contact"),
      heroSecondaryCta: cta("Contact Us", "/contact"),
      heroBannerImage: img("/images/homepage-banner.png", "AI Powered IT Solutions & Staffing"),
      heroDashboardImage: img("/images/homepage-banner.png", "AI Powered IT Solutions & Staffing"),
      capabilitiesEyebrow: "Digital Transformation",
      capabilitiesTitle: "Streamlining Operations Accelerating Outcomes",
      capabilities: [
        {
          _type: "capabilityItem",
          _key: "c1",
          title: "Workflow & Process Automation",
          icon: "Bot",
          image: img("/images/ai/capability-automation.png", "Workflow & Process Automation"),
        },
        {
          _type: "capabilityItem",
          _key: "c2",
          title: "Data Analytics & Business Intelligence",
          icon: "Database",
          image: img("/images/ai/capability-analytics.png", "Data Analytics & Business Intelligence"),
        },
        {
          _type: "capabilityItem",
          _key: "c3",
          title: "Next Gen Digital Marketing",
          icon: "TrendingUp",
          image: img("/images/ai/capability-marketing.png", "Next Gen Digital Marketing"),
        },
        {
          _type: "capabilityItem",
          _key: "c4",
          title: "HR Recruitment Employee Engagement",
          icon: "Users",
          image: img("/images/ai/capability-hr.png", "HR Recruitment Employee Engagement"),
        },
      ],
      valueEyebrow: "why choose us",
      valueTitle: "Why Your Business Needs AI Powered IT Solution",
      valueBody:
        "Modern enterprises require intelligent technology to remain competitive and efficient. AI-powered IT solutions from Excellanto help organizations automate operations, improve system performance, and make faster data-driven decisions that strengthen overall business productivity. Our AI-driven monitoring and predictive analytics enable businesses to detect potential system issues early, enhance cybersecurity protection, and maintain stable IT infrastructure. These intelligent solutions scale easily with growing business demands, providing a secure, flexible, and future-ready technology environment.",
      valueCta: cta("Contact Us", "/contact"),
      valueImage: img("/images/ai/homepage-value-prop.png", "Why your business needs AI powered IT solution"),
      servicesEyebrow: "our capabilities",
      servicesTitle: "Want to see our professional Services",
      servicesAside: "Click here to View More",
      servicesViewMore: "Want to see our professional Services. Click here to View More",
      servicesViewMoreHref: "/services",
      servicesCardLink: "View More",
      processEyebrow: "our process",
      processTitle: "Our Work Process",
      processIntro:
        "At Excellanto, our IT solutions process begins with a detailed understanding of your business requirements, followed by structured planning and solution design. Each implementation is carried out with precision, while continuous monitoring and optimization ensure reliable performance and long-term value for your organization.",
      processSteps: [
        {
          _type: "processStep",
          _key: "p1",
          step: "01",
          title: "Project Definition",
          body: "We work closely with organizations to clearly define project objectives by translating business goals into a well-structured scope. This step ensures clarity, alignment, and a strong foundation for successful project execution.",
          image: img(wp("2024/05/s4-img-1.webp"), "Project Definition"),
        },
        {
          _type: "processStep",
          _key: "p2",
          step: "02",
          title: "Project Analysis",
          body: "Our experts conduct thorough analysis to evaluate feasibility, identify potential challenges, and determine the most effective technology approach. This stage ensures that every solution is practical, scalable, and aligned with business outcomes.",
          image: img(wp("2024/05/s4-img-2.webp"), "Project Analysis"),
        },
        {
          _type: "processStep",
          _key: "p3",
          step: "03",
          title: "Planning & Execution",
          body: "We develop a detailed project plan and execute each phase with precision, ensuring efficient coordination, resource optimization, and timely delivery while maintaining high standards of quality and performance.",
          image: img(wp("2024/05/s4-img-3.webp"), "Planning & Execution"),
        },
        {
          _type: "processStep",
          _key: "p4",
          step: "04",
          title: "Results Delivery",
          body: "Our focus is on delivering measurable results that support business objectives. Every solution is implemented to create operational value, improve efficiency, and contribute to sustainable long-term growth.",
          image: img(wp("2024/05/s4-img-4.webp"), "Results Delivery"),
        },
      ],
      brandsEyebrow: "Brands",
      brandsTitle: "We Build Modern Experience with Brands",
      brandsBackground: img(wp("2024/05/c4-phone.webp"), "We build modern experience with brands"),
      brandLogos: Array.from({ length: 31 }, (_, index) => {
        const id = String(index + 1).padStart(2, "0");
        return {
          _type: "siteImage",
          _key: `br${id}`,
          url: `/images/brands/2026/${id}.png`,
          alt: `Brand partner ${index + 1}`,
        };
      }),
      whyEyebrow: "why choose us",
      whyTitle: "We Want to Work The Best!",
      whyBody:
        "At Excellanto, our goal is to work with forward-thinking organizations that value quality, innovation, and long-term success. We combine expertise, dedication, and advanced technology to deliver reliable IT solutions that help businesses operate efficiently and achieve measurable growth",
      whyImage: img("/images/ai/homepage-why-choose.png", "Medium shot of men working together in office"),
      whyCta: cta("Contact Us", "/contact"),
      whyCards: [
        {
          _type: "whyChooseItem",
          _key: "w1",
          title: "Dedicated Team",
          description:
            "Our experienced IT professionals work closely with your organization to deliver reliable technology solutions that improve efficiency, support innovation, and drive meaningful business outcomes.",
          icon: "Users",
        },
        {
          _type: "whyChooseItem",
          _key: "w2",
          title: "Award-Winning Expertise",
          description:
            "Our team brings proven industry experience and recognized excellence in delivering dependable, high-impact IT solutions designed to meet modern business challenges.",
          icon: "Award",
        },
        {
          _type: "whyChooseItem",
          _key: "w3",
          title: "24/7 Hours Support",
          description:
            "Our support team remains available around the clock to ensure your systems run smoothly, providing timely assistance and continuous monitoring whenever your business needs it.",
          icon: "Headphones",
        },
        {
          _type: "whyChooseItem",
          _key: "w4",
          title: "Clean & Structured Setup",
          description:
            "We implement well-organized and optimized system environments designed for strong performance, enhanced security, and scalable infrastructure that supports future growth",
          icon: "LayoutDashboard",
        },
      ],
      blogEyebrow: "Our Blog",
      blogTitle: "Latest News & Articles From the Blog",
      blogLinkLabel: "Explore More",
      ctaEyebrow: "contact us",
      ctaTitle: "Get AI Automation Solutions for Your Business",
      ctaImage: img("/images/ai/homepage-cta.png", "Get AI automation solutions for your business"),
      ctaPrimary: cta("Message Now", "/contact"),
      ctaSecondary: cta("+91 96677 97078", "tel:+919667797078"),
      testimonialsEyebrow: "Testimonials",
      testimonialsTitle: "What our clients say",
    },
    {
      _id: "aboutPage",
      _type: "aboutPage",
      eyebrow: "About Us",
      title: "Your Partner for Superior IT Solutions",
      intro:
        "At Excellanto, our strengths lie in combining deep industry expertise with innovative technology solutions. We excel in delivering tailored, scalable, and efficient systems that empower our clients to achieve their goals. From strategic planning to flawless execution, our team’s technical mastery, creativity, and commitment to excellence ensure we consistently turn challenges into opportunities.",
      heroImage: img(wp("2026/02/m07tejm07tejm07t.png"), "Your partner for superior IT solutions"),
      mission: titled(
        "Our Mission",
        "Our mission is to help enterprises accelerate adoption of new technologies, untangle complex issues that always emerge during digital evolution, and orchestrate ongoing innovation."
      ),
      vision: titled(
        "Our Vision",
        "Our vision is to become a globally recognized, trusted, and profitable IT solutions provider, guided by integrity, innovation, and excellence in everything we do."
      ),
      values: titled(
        "Core Values",
        "At Excellanto, we drive innovation to deliver smart, future-ready solutions, keeping our customers at the heart of everything we do. We act with integrity and transparency, and strive for excellence in every project, ensuring quality, precision, and continuous improvement"
      ),
      strengthsEyebrow: "Our Strengths",
      strengthsTitle: "Elevate Experience with Our Expertise",
      strengthsBody:
        "At Excellanto, our strengths lie in combining deep industry expertise with innovative technology solutions. We excel in delivering tailored, scalable, and efficient systems that empower our clients to achieve their goals. From strategic planning to flawless execution, our team’s technical mastery, creativity, and commitment to excellence ensure we consistently turn challenges into opportunities.",
      strengthsImage: img(wp("2026/02/m07tejm07tejm07t.png"), "Elevate experience with our expertise"),
      techEyebrow: "Technology & Innovation",
      techTitle: "Empowering Progress Through Smart Technology",
      techBody:
        "At Excellanto, we harness cutting-edge technology and AI-driven solutions to deliver smarter, faster, and more efficient systems. Innovation is at the core of everything we do—whether it’s streamlining processes, enhancing user experiences, or developing scalable solutions for complex challenges. By staying ahead of technological trends, we ensure our clients are equipped with future-ready tools that drive growth and success.",
      techHighlights: ["Cutting-Edge Technology", "Expertise & Excellence in Execution"],
      techImage: img(wp("2026/02/lvvknmlvvknmlvvk.png"), "Empowering progress through smart technology"),
      seoTitle: "About Us",
      seoDescription:
        "At Excellanto, our strengths lie in combining deep industry expertise with innovative technology solutions.",
    },
    {
      _id: "contactPage",
      _type: "contactPage",
      eyebrow: "Contact Us",
      title: "Get AI Automation Solutions for Your Business",
      heroImage: img(wp("2026/03/young-employees-sitting-office-table-using-laptop-2.jpg"), "Contact Excellanto"),
      officeImage: img(wp("2026/03/medium-shot-men-working-together-office.jpg"), "Excellanto office team collaboration"),
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
      seoTitle: "Contact Us",
    },
    {
      _id: "servicesPage",
      _type: "servicesPage",
      eyebrow: "Services",
      title: "Delivering reliable solutions tailored to your business needs",
      heroImage: img(wp("2024/05/s4-img-1.webp"), "Delivering reliable solutions tailored to your business needs"),
      viewMore: "Want to see our professional Services. Click here to View More",
      categoryEyebrow: "Services",
      cardLinkLabel: "View More",
      categories: [
        { _key: "cat-dev", id: "development", title: "Development" },
        { _key: "cat-ai", id: "ai-cloud", title: "AI, Cloud & Consulting" },
        { _key: "cat-mkt", id: "marketing", title: "Digital Marketing" },
        { _key: "cat-tal", id: "talent", title: "Staffing" },
      ],
      seoTitle: "Services",
    },
    {
      _id: "blogPage",
      _type: "blogPage",
      eyebrow: "Our Blog",
      title: "Latest News & Articles From the Blog",
      heroImage: img(wp("2026/05/Digital-Marketing.jpeg"), "Latest news and articles from the blog"),
      emptyMessage: "No blog articles are available right now. Please check back soon.",
      readMoreLabel: "Read more",
      backToBlog: "Back to Blog",
      byPrefix: "By",
      articleFallbackTitle: "Article",
      seoTitle: "Blog",
    },
    {
      _id: "legal-privacy-policy",
      _type: "legalPage",
      slug: { _type: "slug", current: "privacy-policy" },
      eyebrow: "Legal",
      title: "Privacy Policy",
      description: "How Excellanto Ventures collects, uses, and protects your information.",
      seoTitle: "Privacy Policy",
      seoDescription: "Privacy Policy for Excellanto Ventures.",
      content: [
        block(
          'Excellanto Ventures ("Excellanto") respects your privacy. This policy explains what information we collect when you use our website or contact us, and how we use it to deliver IT solutions, digital marketing, and related services.',
          "normal",
          "privacy-1"
        ),
        block("Information we collect", "h2", "privacy-h1"),
        block(
          "When you submit a contact form or reach out by phone or email, we may collect your name, email address, phone number, company details, and message content.",
          "normal",
          "privacy-2"
        ),
        block("How we use information", "h2", "privacy-h2"),
        block(
          "We use your information to respond to inquiries, provide proposals, improve our services, and communicate about projects. We do not sell your personal data.",
          "normal",
          "privacy-3"
        ),
        block("Contact", "h2", "privacy-h3"),
        block("For privacy questions, email support@excellanto.com or call +91 96677 97078.", "normal", "privacy-4"),
      ],
    },
    {
      _id: "legal-terms-condition",
      _type: "legalPage",
      slug: { _type: "slug", current: "terms-condition" },
      eyebrow: "Legal",
      title: "Terms & Conditions",
      description: "Please read these terms carefully before using our website or engaging our services.",
      seoTitle: "Terms & Conditions",
      seoDescription: "Terms and conditions for using Excellanto Ventures services and website.",
      content: [
        block(
          "By accessing https://excellanto.com or engaging Excellanto Ventures, you agree to these terms. Our services include AI-powered software solutions, digital marketing, workflow automation, and staffing.",
          "normal",
          "terms-1"
        ),
        block("Use of website", "h2", "terms-h1"),
        block(
          "Content on this website is for general information. You may not misuse the site, attempt unauthorized access, or use our materials without permission.",
          "normal",
          "terms-2"
        ),
        block("Services & engagements", "h2", "terms-h2"),
        block(
          "Specific project scopes, timelines, and fees are defined in separate agreements. Nothing on this website constitutes a binding offer unless confirmed in writing.",
          "normal",
          "terms-3"
        ),
        block("Contact", "h2", "terms-h3"),
        block("Questions about these terms? Reach us at support@excellanto.com.", "normal", "terms-4"),
      ],
    },
    ...services.map((service) => ({
      _id: `service-${service.slug}`,
      _type: "service",
      ...service,
      slug: { _type: "slug", current: service.slug },
      sidebarTitle: "Contact Us",
      sidebarBody: "Get AI Automation Solutions for Your Business",
      sidebarCta: cta("Message Now", "/contact"),
      pageCta: cta("Let’s Talk", "/contact"),
      backLabel: "Services",
      cardLinkLabel: "View More",
      bannerEyebrow: service.bannerEyebrow || "Service",
    })),
  ];

  const tx = client.transaction();
  for (const doc of docs) {
    tx.createOrReplace(doc);
  }
  await tx.commit();
  console.log(`Seeded ${docs.length} CMS documents (site settings, pages, services, legal).`);
  await seedBlogs();
  await verifyCms();
}

if (!process.argv.some((arg) => arg.includes("exec"))) {
  seed().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
