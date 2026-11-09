import {
  Bot,
  Cloud,
  Compass,
  TrendingUp,
  Share2,
  Search,
  Smartphone,
  Database,
  Users,
  Award,
  Headphones,
  LayoutDashboard,
  MonitorSmartphone,
  House,
  UserCheck,
  ShoppingCart,
  HeartPulse,
  Landmark,
  Globe,
  Plane,
  Building2,
  type LucideIcon,
} from "lucide-react";

/** Contact & company info from excellanto.com /contact-us/ and footer */
export const siteConfig = {
  name: "Excellanto",
  tagline: "AI Powered IT Solutions & Staffing",
  description:
    "Excellanto is at the forefront of leading the way, powering next-generation enterprises with comprehensive AI powered Software Solutions, Next Gen Digital Marketing Services and Workflow Automation end-to-end solutions, while extending our footprint as a global provider of onshore & outsourced IT services",
  phone: "+91 96677 97078",
  phoneSecondary: "+91 96677 97017",
  email: "support@excellanto.com",
  emailSecondary: "info@excellanto.com",
  url: "https://excellanto.com",
  address:
    "191-192 Neelkanth Plaza, Sant Nagar, 4th Floor East of Kailash New Delhi 110065",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://in.linkedin.com/company/excellanto",
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", mega: true },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
] as const;

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  megaDescription: string;
  icon: LucideIcon;
  category: ServiceCategoryId;
  featured: boolean;
  features: string[];
  detailIntro?: string;
};

export type ServiceCategoryId =
  | "development"
  | "ai-cloud"
  | "marketing"
  | "talent";

/** Category labels used only for mega-menu grouping — titles match service groups on excellanto.com */
export const serviceCategories: {
  id: ServiceCategoryId;
  title: string;
}[] = [
  { id: "development", title: "Development" },
  { id: "ai-cloud", title: "AI, Cloud & Consulting" },
  { id: "marketing", title: "Digital Marketing" },
  { id: "talent", title: "Staffing" },
];

export const services: Service[] = [
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortTitle: "Mobile App Development",
    description:
      "Why Choose Our Mobile App Development Services? We understand that every business is unique. Our expert team of developers crafts tailored mobile apps to match your specific needs and goals.",
    megaDescription: "Custom mobile apps for iOS and Android",
    icon: Smartphone,
    category: "development",
    featured: false,
    features: [
      "CUSTOM SOLUTION",
      "CUTTING EDGE TECHNOLOGY",
      "CROSS PLATFORM EXPERTISE",
      "AGILE DEVELOPMENT",
      "QUALITY ASSURANCE",
    ],
    detailIntro:
      "At Excellanto, we believe that exceptional mobile app development goes far beyond writing lines of code — it’s about understanding your business, your audience, and your vision.",
  },
  {
    slug: "website-development",
    title: "Website Development",
    shortTitle: "Website Development",
    description:
      "Our Offerings Include Responsive Website Design, Custom Web Application Development, CMS Development, API Integration, and UI/UX Design Services.",
    megaDescription: "Responsive websites, CMS & UI/UX",
    icon: MonitorSmartphone,
    category: "development",
    featured: false,
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
  },
  {
    slug: "ai-driven-operations-automation",
    title: "AI-Driven Operations Automation",
    shortTitle: "AI-Driven Operations Automation",
    description:
      "Leverage AI-powered automation to streamline business workflows, reduce manual processes, and improve operational efficiency. Our intelligent systems enable faster decision-making, optimize routine operations, and provide predictive insights that help organizations build scalable, high-performance digital operations.",
    megaDescription: "AI workflows & process automation",
    icon: Bot,
    category: "ai-cloud",
    featured: true,
    features: [
      "AI-based workflow automation",
      "Intelligent process optimization",
      "Robotic Process Automation (RPA)",
      "Enterprise system integration (ERP, CRM, APIs)",
    ],
    detailIntro:
      "Turning everyday operations into intelligent, automated systems. Traditional automation focuses only on repetitive tasks, but modern businesses require much more than that. Our AI-driven approach ensures that your operations are not only automated but also capable of learning, adapting, and improving over time.",
  },
  {
    slug: "intelligent-cloud-management",
    title: "Intelligent Cloud Management",
    shortTitle: "Intelligent Cloud Management",
    description:
      "Optimize enterprise cloud infrastructure with AI-driven resource management and performance monitoring. Our intelligent cloud solutions improve scalability, strengthen security, and reduce operational costs while delivering reliable performance across hybrid and multi-cloud environments.",
    megaDescription: "Hybrid & multi-cloud management",
    icon: Cloud,
    category: "ai-cloud",
    featured: true,
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
  },
  {
    slug: "smart-home-automation-powered-by-ai-llm-home-assistant",
    title: "Smart Home Automation Powered by AI & LLM Home Assistant",
    shortTitle: "Smart Home Automation",
    description:
      "Experience the next generation of home automation with an AI-powered Large Language Model (LLM) Home Assistant that understands natural conversations and intelligently manages your connected devices. Move beyond traditional automation rules and enjoy a home that adapts to your lifestyle, preferences, and daily routines.",
    megaDescription: "AI & LLM Home Assistant",
    icon: House,
    category: "development",
    featured: false,
    features: [
      "Open, Flexible & Vendor-Independent Automation",
      "Hybrid Architecture for Maximum Performance",
      "Freedom from Vendor Lock-In",
    ],
    detailIntro:
      "Transform Your Home Into an Intelligent Living Space. Our smart home solutions combine advanced automation technologies with cutting-edge AI to create a seamless, intuitive, and future-ready living environment.",
  },
  {
    slug: "it-strategy-innovation-consulting",
    title: "IT Strategy & Innovation Consulting",
    shortTitle: "IT Strategy & Innovation Consulting",
    description:
      "Partner with Excellanto experts to design strategic IT roadmaps and innovation-driven transformation initiatives. We help organizations align technology investments with business goals, accelerate digital adoption, and build future-ready enterprise technology ecosystems.",
    megaDescription: "IT strategy & innovation consulting",
    icon: Compass,
    category: "ai-cloud",
    featured: true,
    features: [
      "Strategic IT roadmaps",
      "Innovation-driven transformation",
      "Align technology with business goals",
      "Accelerate digital adoption",
    ],
    detailIntro:
      "Turning technology decisions into business advantages. Partner with Excellanto experts to design strategic IT roadmaps and innovation-driven transformation initiatives.",
  },
  {
    slug: "predictive-performance-marketing",
    title: "Predictive Performance Marketing",
    shortTitle: "Predictive Performance Marketing",
    description:
      "Run high-impact marketing campaigns powered by predictive analytics and AI-driven optimization. Identify high-conversion opportunities, forecast customer behavior, and maximize campaign ROI with intelligent targeting and continuous performance improvements.",
    megaDescription: "Predictive analytics & campaign ROI",
    icon: TrendingUp,
    category: "marketing",
    featured: true,
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
  },
  {
    slug: "social-media-intelligence",
    title: "Social Media Intelligence",
    shortTitle: "Social Media Intelligence",
    description:
      "At Excellanto, we transform social media activity into actionable intelligence that drives business decisions, strengthens brand positioning, and delivers measurable growth.",
    megaDescription: "Social media intelligence & analytics",
    icon: Share2,
    category: "marketing",
    featured: true,
    features: [
      "Identify what content drives real engagement",
      "Track how users interact with your brand",
      "Discover hidden opportunities for growth",
      "Align social media efforts with business goals",
    ],
    detailIntro:
      "Social media platforms are constantly generating valuable data. Excellanto applies AI-driven analytics, behavioral tracking, and predictive insights to convert this data into strategies that improve engagement, optimize campaigns, and accelerate business outcomes.",
  },
  {
    slug: "seo-cognition",
    title: "SEO Cognition",
    shortTitle: "SEO Cognition",
    description:
      "At Excellanto, we deliver advanced Search Engine Optimization services designed to position your business at the top of search results, attract high-intent traffic, and convert visibility into measurable growth.",
    megaDescription: "AI-driven SEO & organic growth",
    icon: Search,
    category: "marketing",
    featured: true,
    features: [
      "Achieve higher rankings for competitive keywords",
      "Attract targeted users actively searching for your services",
      "Generate qualified organic leads consistently",
      "Strengthen brand authority in your industry",
    ],
    detailIntro:
      "Our expert SEO team works as an extension of your business—analyzing, optimizing, and refining every element of your website to ensure it performs effectively across search engines.",
  },
  {
    slug: "staffing-recruitment-service",
    title: "Staffing Recruitment Service",
    shortTitle: "Staffing Recruitment Service",
    description:
      "Building the right team is no longer a routine hiring activity—it is a business-critical function that directly impacts growth, delivery capability, and long-term success.",
    megaDescription: "Strategic staffing & recruitment",
    icon: UserCheck,
    category: "talent",
    featured: false,
    features: [
      "Stronger and more capable teams",
      "Reduced employee turnover",
      "Faster project execution",
      "Improved overall performance",
    ],
    detailIntro:
      "At Excellanto, we approach staffing and recruitment as a strategic business solution, not a transactional service. We work closely with organizations to understand how talent fits into their larger vision, and then we design hiring strategies that deliver not just candidates, but the right people who can create measurable impact.",
  },
];

/** Homepage pillars — titles only as shown on excellanto.com */
export const capabilities = [
  { title: "Workflow & Process Automation", icon: Bot },
  { title: "Data Analytics & Business Intelligence", icon: Database },
  { title: "Next Gen Digital Marketing", icon: TrendingUp },
  { title: "HR Recruitment Employee Engagement", icon: Users },
];

export const featuredServices = services.filter((s) => s.featured);

export function getServicesByCategory(categoryId: ServiceCategoryId) {
  return services.filter((s) => s.category === categoryId);
}

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

/** From excellanto.com/about/ */
export const aboutContent = {
  eyebrow: "About Us",
  title: "Your Partner for Superior IT Solutions",
  intro:
    "At Excellanto, our strengths lie in combining deep industry expertise with innovative technology solutions. We excel in delivering tailored, scalable, and efficient systems that empower our clients to achieve their goals. From strategic planning to flawless execution, our team’s technical mastery, creativity, and commitment to excellence ensure we consistently turn challenges into opportunities.",
  mission: {
    title: "Our Mission",
    body: "Our mission is to help enterprises accelerate adoption of new technologies, untangle complex issues that always emerge during digital evolution, and orchestrate ongoing innovation.",
  },
  vision: {
    title: "Our Vision",
    body: "Our vision is to become a globally recognized, trusted, and profitable IT solutions provider, guided by integrity, innovation, and excellence in everything we do.",
  },
  values: {
    title: "Core Values",
    body: "At Excellanto, we drive innovation to deliver smart, future-ready solutions, keeping our customers at the heart of everything we do. We act with integrity and transparency, and strive for excellence in every project, ensuring quality, precision, and continuous improvement",
  },
  strengthsTitle: "Elevate Experience with Our Expertise",
  strengthsEyebrow: "Our Strengths",
  strengthsBody:
    "At Excellanto, our strengths lie in combining deep industry expertise with innovative technology solutions. We excel in delivering tailored, scalable, and efficient systems that empower our clients to achieve their goals. From strategic planning to flawless execution, our team’s technical mastery, creativity, and commitment to excellence ensure we consistently turn challenges into opportunities.",
  techTitle: "Empowering Progress Through Smart Technology",
  techEyebrow: "Technology & Innovation",
  techBody:
    "At Excellanto, we harness cutting-edge technology and AI-driven solutions to deliver smarter, faster, and more efficient systems. Innovation is at the core of everything we do—whether it’s streamlining processes, enhancing user experiences, or developing scalable solutions for complex challenges. By staying ahead of technological trends, we ensure our clients are equipped with future-ready tools that drive growth and success.",
  techHighlights: [
    "Cutting-Edge Technology",
    "Expertise & Excellence in Execution",
  ],
};

/** Homepage “We Want to Work The Best!” cards — excellanto.com */
export const whyChooseUs = [
  {
    title: "Dedicated Team",
    description:
      "Our experienced IT professionals work closely with your organization to deliver reliable technology solutions that improve efficiency, support innovation, and drive meaningful business outcomes.",
    icon: Users,
  },
  {
    title: "Award-Winning Expertise",
    description:
      "Our team brings proven industry experience and recognized excellence in delivering dependable, high-impact IT solutions designed to meet modern business challenges.",
    icon: Award,
  },
  {
    title: "24/7 Hours Support",
    description:
      "Our support team remains available around the clock to ensure your systems run smoothly, providing timely assistance and continuous monitoring whenever your business needs it.",
    icon: Headphones,
  },
  {
    title: "Clean & Structured Setup",
    description:
      "We implement well-organized and optimized system environments designed for strong performance, enhanced security, and scalable infrastructure that supports future growth",
    icon: LayoutDashboard,
  },
];

/** Homepage “Why Your Business Needs AI Powered IT Solution” */
export const valueProp = {
  eyebrow: "why choose us",
  title: "Why Your Business Needs AI Powered IT Solution",
  body: "Modern enterprises require intelligent technology to remain competitive and efficient. AI-powered IT solutions from Excellanto help organizations automate operations, improve system performance, and make faster data-driven decisions that strengthen overall business productivity. Our AI-driven monitoring and predictive analytics enable businesses to detect potential system issues early, enhance cybersecurity protection, and maintain stable IT infrastructure. These intelligent solutions scale easily with growing business demands, providing a secure, flexible, and future-ready technology environment.",
};

export const processIntro =
  "At Excellanto, our IT solutions process begins with a detailed understanding of your business requirements, followed by structured planning and solution design. Each implementation is carried out with precision, while continuous monitoring and optimization ensure reliable performance and long-term value for your organization.";

export const processSteps = [
  {
    step: "01",
    title: "Project Definition",
    description:
      "We work closely with organizations to clearly define project objectives by translating business goals into a well-structured scope. This step ensures clarity, alignment, and a strong foundation for successful project execution.",
  },
  {
    step: "02",
    title: "Project Analysis",
    description:
      "Our experts conduct thorough analysis to evaluate feasibility, identify potential challenges, and determine the most effective technology approach. This stage ensures that every solution is practical, scalable, and aligned with business outcomes.",
  },
  {
    step: "03",
    title: "Planning & Execution",
    description:
      "We develop a detailed project plan and execute each phase with precision, ensuring efficient coordination, resource optimization, and timely delivery while maintaining high standards of quality and performance.",
  },
  {
    step: "04",
    title: "Results Delivery",
    description:
      "Our focus is on delivering measurable results that support business objectives. Every solution is implemented to create operational value, improve efficiency, and contribute to sustainable long-term growth.",
  },
];

/** Industries listed on excellanto.com/mobile-app-development/ — titles only */
export const industries: { title: string; icon: LucideIcon }[] = [
  { title: "E-Commerce", icon: ShoppingCart },
  { title: "Healthcare", icon: HeartPulse },
  { title: "Finance", icon: Landmark },
  { title: "Education", icon: Globe },
  { title: "Travel", icon: Plane },
  { title: "Real Estate", icon: Building2 },
];

/** Full page content from excellanto.com/mobile-app-development */
export const mobileAppPage = {
  heroTitle: "Why Choose Our Mobile App Development Services?",
  whyChoose: [
    {
      title: "CUSTOM SOLUTION",
      body: "We understand that every business is unique. Our expert team of developers crafts tailored mobile apps to match your specific needs and goals.",
    },
    {
      title: "CUTTING EDGE TECHNOLOGY",
      body: "Excellanto stays at the forefront of mobile technology, using the latest tools and frameworks to deliver high-performance, scalable, and secure applications.",
    },
    {
      title: "CROSS PLATFORM EXPERTISE",
      body: "Our development team is proficient in building apps for both iOS and Android platforms, reducing development time and costs without compromising quality.",
    },
    {
      title: "AGILE DEVELOPMENT",
      body: "We follow Agile methodologies to ensure transparency, adaptability, and timely delivery of your mobile app.",
    },
    {
      title: "QUALITY ASSURANCE",
      body: "Rigorous testing and quality checks are an essential part of our development process, guaranteeing a bug-free, smooth-running application.",
    },
  ],
  processEyebrow: "our process",
  processTitle: "How We Build Powerful Mobile Apps That Deliver Results",
  processIntro:
    "At Excellanto, we believe that exceptional mobile app development goes far beyond writing lines of code — it’s about understanding your business, your audience, and your vision.",
  processSteps: [
    {
      step: "01",
      title: "Discovery & Strategy",
      body: "Every successful app starts with a strong foundation. We begin by analyzing your idea, target audience, and industry trends to create a clear strategy for your mobile application development journey.",
    },
    {
      step: "02",
      title: "UI/UX Design",
      body: "Design isn’t just about aesthetics — it’s about experience. Our design team creates intuitive, engaging interfaces that offer seamless navigation and drive user retention.",
    },
    {
      step: "03",
      title: "Agile Development",
      body: "Our expert mobile app developers follow agile methodologies to accelerate the development process while maintaining flexibility and focus on performance and quality.",
    },
    {
      step: "04",
      title: "Quality Assurance",
      body: "We perform rigorous testing, including functionality validation, and device compatibility checks to ensure your app performs seamlessly under various conditions.",
    },
  ],
  brandsTitle: "We Build Modern Experience with Brands",
  industriesEyebrow: "chy choose us",
  industriesTitle: "Industries We Serve",
  industriesIntro:
    "From agile startups to established enterprises, we help brands across industries leverage cutting-edge mobile application development to stay competitive in the digital space.",
};

/** Content from excellanto.com/website-development */
export const websiteDevPage = {
  heroTitle: "Why Choose Excellanto?",
  offeringsTitle: "Our Offerings Include",
  offerings: [
    {
      title: "Responsive Website Design",
      body: "Mobile-friendly designs that adapt to all screen sizes.",
    },
    {
      title: "Custom Web Application Development",
      body: "Tailored solutions for your unique business needs.",
    },
    {
      title: "CMS Development",
      body: "WordPress, Joomla, Drupal solutions",
    },
    {
      title: "API Integration",
      body: "Seamless backend solutions",
    },
    {
      title: "UI/UX Design Services",
      body: "Beautiful, user-friendly interfaces",
    },
  ],
  whyChooseTitle: "Why Choose Excellanto?",
  whyChoose: [
    {
      title: "100% Customized",
      body: "Tailored solutions for your business needs",
    },
    {
      title: "Cross-browser Compatible",
      body: "W3C validated code that works everywhere",
    },
    {
      title: "SEO-Optimized",
      body: "Better visibility on search engines",
    },
    {
      title: "Expert UI/UX",
      body: "Designs focused on conversion",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Consultation",
      body: "Requirement Gathering",
    },
    {
      step: "02",
      title: "Wireframing",
      body: "Design Planning",
    },
    {
      step: "03",
      title: "QA Testing +",
      body: "Performance Optimization",
    },
    {
      step: "04",
      title: "Development",
      body: "Coding",
    },
  ],
  redesignEyebrow: "Website Redesign & Migration",
  redesignTitle: "Modernize Your Website",
  redesignItems: [
    "Revamp outdated websites for modern appeal",
    "Migrate from Wix, Squarespace to WordPress",
    "Improve site speed and responsiveness",
    "Retain SEO rankings and URL structure",
  ],
  highlights: [
    "Security-first",
    "Responsive",
    "Cross-browser",
    "Fast Performance",
  ],
  discoverMore: "Discover More",
};

/** Content from excellanto.com/social-media-intelligence/ */
export const socialMediaIntelligencePage = {
  heroTitle: "Social Media Intelligence",
  intro: [
    "At Excellanto, we transform social media activity into actionable intelligence that drives business decisions, strengthens brand positioning, and delivers measurable growth. Our Social Media Intelligence solutions are built for organizations that want more than engagement—they want clarity, control, and consistent performance from their digital presence.",
    "Social media platforms are constantly generating valuable data. However, without structured analysis and intelligent systems, this data remains underutilized. Excellanto applies AI-driven analytics, behavioral tracking, and predictive insights to convert this data into strategies that improve engagement, optimize campaigns, and accelerate business outcomes.",
  ],
  chooseUs: {
    eyebrow: "choose us",
    title: "Turning everyday operations into intelligent, automated systems",
    body: "Traditional automation focuses only on repetitive tasks, but modern businesses require much more than that. Our AI-driven approach ensures that your operations are not only automated but also capable of learning, adapting, and improving over time.",
    bullets: [
      "Identify what content drives real engagement",
      "Track how users interact with your brand",
      "Discover hidden opportunities for growth",
      "Align social media efforts with business goals",
    ],
    result:
      "As a result, your social media presence becomes a data-backed growth engine, not just a communication channel.",
  },
  audience: {
    eyebrow: "Deep audience understanding that improves targeting and engagement",
    body: "Understanding your audience is the foundation of successful marketing. Excellanto analyzes user behavior to provide detailed audience insights that improve targeting accuracy and campaign effectiveness.",
    leadIn: "We help you understand:",
    bullets: [
      "Audience demographics and preferences",
      "Content consumption patterns",
      "Engagement behavior across platforms",
      "User intent and buying signals",
    ],
    result:
      "With these insights, your campaigns are more focused, relevant, and capable of generating higher engagement and conversions.",
  },
  featureSections: [
    {
      title: "Strengthening your brand through data-driven content strategy",
      intro:
        "Content plays a critical role in social media success. However, creating content without insights often leads to inconsistent results. Excellanto ensures that your content strategy is guided by real data.",
      bullets: [
        "Create content that aligns with audience interests",
        "Identify high-performing formats and themes",
        "Improve engagement through targeted messaging",
        "Maintain consistency across platforms",
        "Build stronger brand identity and trust",
      ],
      result:
        "This results in content that not only attracts attention but also drives meaningful interactions and conversions.",
    },
    {
      title: "Real-time intelligence that keeps you ahead of competition",
      intro:
        "Social media trends change rapidly. Businesses that react late often miss valuable opportunities. Excellanto’s real-time intelligence systems ensure that you stay ahead.",
      bullets: [
        "Monitor conversations and trends as they happen",
        "Identify viral opportunities early",
        "Respond quickly to audience feedback",
        "Adjust campaigns instantly for better performance",
      ],
      result:
        "This proactive approach helps your brand remain relevant, competitive, and responsive.",
    },
    {
      title: "Competitive insights that strengthen your market position",
      intro:
        "Understanding your competitors is essential for building a strong market presence. Excellanto provides detailed competitor intelligence to help you stay ahead.",
      bullets: [
        "Competitor content strategies",
        "Engagement patterns and audience response",
        "Campaign performance trends",
        "Market positioning and messaging",
      ],
      result:
        "With this information, you can refine your strategy and create a distinct and competitive advantage.",
    },
  ],
  process: {
    eyebrow: "A clear and structured approach that ensures results",
    title: "A structured approach that ensures consistent results",
    intro: "Excellanto follows a systematic process to deliver reliable and scalable outcomes.",
    steps: [
      {
        step: "01",
        title: "Understanding your business objectives",
        body: "We align social media intelligence with your business goals and growth targets.",
      },
      {
        step: "02",
        title: "Collecting and organizing data",
        body: "Data is gathered from multiple platforms to ensure comprehensive analysis.",
      },
      {
        step: "03",
        title: "Analyzing patterns and behavior",
        body: "We identify trends, insights, and opportunities within the data.",
      },
      {
        step: "04",
        title: "Implementing insight-driven strategies",
        body: "Strategies are executed based on data-backed recommendations.",
      },
      {
        step: "05",
        title: "Continuous optimization and reporting",
        body: "Performance is monitored and improved continuously for better results.",
      },
    ],
  },
  impact: {
    title: "Driving measurable impact across key business areas",
    intro:
      "Excellanto’s Social Media Intelligence solutions deliver value across multiple business functions:",
    bullets: [
      "Marketing: Improve campaign performance and ROI",
      "Sales: Identify high-intent users and generate leads",
      "Customer Experience: Understand feedback and improve satisfaction",
      "Brand Management: Strengthen reputation and visibility",
      "Strategy: Make informed business decisions with real data",
    ],
    result:
      "This integrated impact ensures that social media contributes directly to overall business growth.",
  },
  idealFor: {
    eyebrow: "why choose us",
    title: "Designed for businesses that demand performance and clarity",
    intro: "Our Social Media Intelligence solutions are ideal for:",
    bullets: [
      "Growing brands seeking better engagement",
      "Businesses focused on lead generation through social platforms",
      "Companies looking to improve ROI from social media marketing",
      "Organizations wanting deeper audience insights",
    ],
    result:
      "Each solution is customized to ensure alignment with your specific business model and objectives.",
  },
  cta: {
    title: "Let’s turn your social data into real business value",
    body: "If you want to move beyond basic social media management and leverage data for smarter growth, Excellanto is ready to deliver.",
    closingTitle:
      "Partner with Excellanto to build intelligent, insight-driven social media strategies that drive engagement, conversions, and sustainable growth.",
    tagline: "Make smarter decisions with Social Media Intelligence",
    subtext:
      "Work with Excellanto to unlock the full potential of your social media and turn insights into measurable business outcomes.",
  },
};

/** Content from excellanto.com/ai-driven-operations-automation/ */
export const aiDrivenOperationsAutomationPage = {
  heroEyebrow: "choose us",
  heroTitle: "Turning everyday operations into intelligent, automated systems",
  intro:
    "Traditional automation focuses only on repetitive tasks, but modern businesses require much more than that. Our AI-driven approach ensures that your operations are not only automated but also capable of learning, adapting, and improving over time.",
  heroBullets: [
    "Understand patterns in your business data",
    "Automate decision-based workflows",
    "Reduce dependency on manual supervision",
    "Continuously improve performance through data insights",
  ],
  experience: {
    title: "Built with experience, designed for real business challenges",
    intro:
      "At Excellanto, we don't believe in one-size-fits-all solutions. Every business operates differently, and therefore, every automation strategy must be tailored.",
    understandLeadIn: "Our team works closely with you to understand:",
    understandBullets: [
      "How your current workflows function",
      "Where inefficiencies exist",
      "Which processes consume the most time and resources",
      "What outcomes you expect from automation",
      "Based on this, we design and implement solutions that directly address your operational challenges while aligning with your long-term goals.",
    ],
    expertiseLeadIn: "Our expertise includes:",
    expertiseBullets: [
      "AI-based workflow automation",
      "Intelligent process optimization",
      "Robotic Process Automation (RPA)",
      "Enterprise system integration (ERP, CRM, APIs)",
      "Because of this strong foundation, we are able to deliver solutions that are practical, scalable, and result-oriented.",
    ],
  },
  capabilities: {
    eyebrow: "our capabilities",
    title: "What you actually gain when operations become automated",
    intro:
      "When businesses adopt AI-driven automation, the impact is visible across every level of operations. It is not just about saving time—it is about transforming how work gets done.",
    items: [
      {
        title: "More efficiency across daily operations",
        body: "Tasks that once required hours of manual effort can be completed in minutes. This allows your teams to focus on higher-value activities instead of repetitive work.",
      },
      {
        title: "Faster and more confident decision-making",
        body: "With access to real-time insights and predictive analytics, you can make decisions quickly and with greater accuracy.",
      },
      {
        title: "Ability to scale without complexity",
        body: "As your business grows, automated systems handle increased workloads without requiring major changes in infrastructure.",
      },
      {
        title: "Reduction in operational costs",
        body: "By minimizing manual intervention and optimizing resource usage, automation helps reduce unnecessary expenses.",
      },
      {
        title: "Consistency and accuracy in processes",
        body: "AI systems eliminate human errors and ensure that every task is performed with precision and consistency",
      },
      {
        title: "Better experience for customers and stakeholders",
        body: "Faster processes and improved efficiency lead to better service delivery and stronger business relationships.",
      },
    ],
  },
  process: {
    eyebrow: "A clear and structured approach that ensures results",
    steps: [
      {
        title: "Understanding your operations in detail",
        body: "We begin by studying your current workflows, identifying inefficiencies, and understanding your business goals. This step lays the foundation for everything that follows.",
      },
      {
        title: "Designing a solution that fits your business",
        body: "Instead of forcing a predefined system, we create a customized automation framework that aligns perfectly with your processes.",
      },
      {
        title: "Implementing without disrupting your work",
        body: "Our team ensures smooth integration with your existing systems, so your operations continue without interruptions.",
      },
      {
        title: "Testing for performance and accuracy",
        body: "Before full deployment, we test every component to ensure reliability, efficiency, and accuracy.",
      },
      {
        title: "Continuous improvement and optimization",
        body: "After implementation, we monitor performance, refine workflows, and update systems to maintain long-term efficiency.",
      },
    ],
  },
  industries: {
    title: "Supporting businesses across industries with tailored solutions",
    intro:
      "Our experience spans multiple industries, allowing us to deliver automation solutions that address specific business challenges.",
    bullets: [
      "IT and technology companies",
      "E-commerce and retail businesses",
      "Healthcare organizations",
      "Financial and professional services",
      "Manufacturing and operations-driven businesses",
      "List TitReal estate and infrastructure firms",
    ],
  },
  trust: {
    title: "Why businesses trust Excellanto for AI-driven automation",
    intro:
      "Choosing the right partner makes a significant difference in the success of your automation journey. At Excellanto, we focus on delivering real business value, not just technical solutions.",
    bullets: [
      "Strong expertise in AI and enterprise IT solutions",
      "A practical, business-focused approach to automation",
      "Customized solutions tailored to your needs",
      "Scalable systems designed for long-term growth",
      "Reliable support and continuous optimization",
    ],
  },
  impactAreas: {
    eyebrow: "Where AI automation creates the biggest impact in your business",
    items: [
      {
        title: "Finance and accounting",
        body: "Automate invoice processing, reconciliation, and financial reporting for faster and more accurate results.",
      },
      {
        title: "Human resources",
        body: "Simplify employee onboarding, payroll processing, and data management with intelligent automation.",
      },
      {
        title: "Customer support",
        body: "Improve response times and service quality with automated ticketing systems and AI-powered support tools.",
      },
      {
        title: "Sales and marketing",
        body: "Streamline lead management, campaign execution, and performance tracking to improve conversion rates.",
      },
      {
        title: "Core operations",
        body: "Optimize workflows, manage supply chains, and automate reporting for better operational control.",
      },
    ],
  },
  future: {
    title: "Building a smarter and future-ready business environment",
    intro:
      "The future of business operations lies in intelligent systems that can adapt, learn, and scale. AI-Driven Operations Automation is not just a trend—it is a strategic necessity for organizations looking to stay competitive.",
    leadIn: "With Excellanto, you can build an operational environment that is:",
    bullets: [
      "Efficient and streamlined",
      "Data-driven and intelligent",
      "Scalable and flexible",
      "Secure and reliable",
    ],
  },
  cta: {
    title: "Let's turn your social data into real business value",
    body: "If you want to move beyond basic social media management and leverage data for smarter growth, Excellanto is ready to deliver.",
    closingTitle:
      "Partner with Excellanto to build intelligent, insight-driven social media strategies that drive engagement, conversions, and sustainable growth.",
    email: "support@excellanto.com",
    website: "https://excellanto.com",
    tagline: "Make smarter decisions with Social Media Intelligence",
    subtext:
      "Work with Excellanto to unlock the full potential of your social media and turn insights into measurable business outcomes.",
  },
};

/** Content from excellanto.com/intelligent-cloud-management/ */
export const intelligentCloudManagementPage = {
  opening: [
    "Cloud infrastructure is the backbone of modern digital operations, but without the right control and visibility, it can quickly become complex, expensive, and difficult to manage.",
    "At Excellanto, we deliver Intelligent Cloud Management solutions that bring clarity, control, and performance to your cloud ecosystem while supporting long-term business growth.",
    "Our solutions are designed to help businesses move beyond basic cloud usage and build an environment that is optimized, secure, and aligned with operational goals. By combining AI-driven monitoring, automation, and cloud optimization strategies, we ensure that your infrastructure performs consistently while adapting to changing business needs.",
    "With strong expertise in enterprise cloud environments, IT infrastructure, and automation technologies, Excellanto enables organizations to operate with confidence while making the most of their cloud investments.",
  ],
  chooseUs: {
    eyebrow: "choose us",
    title: "Bringing structure and control to complex cloud environments",
    body: "Cloud environments often grow rapidly, and over time, they can become difficult to manage. Multiple services, scattered resources, and lack of monitoring can lead to inefficiencies. Therefore, our approach focuses on simplifying your cloud operations and bringing everything under a structured and controlled system.",
    bullets: [
      "Gain complete visibility into your cloud infrastructure",
      "Manage workloads more efficiently",
      "Track performance across systems in real time",
      "Eliminate unnecessary resource usage",
      "Maintain consistency across environments",
    ],
  },
  infrastructure: {
    title: "Designed around your infrastructure, not forced onto it",
    intro:
      "Every organization uses the cloud differently. Some operate on hybrid models, while others depend on multi-cloud platforms. Because of this, we do not apply generic solutions. Instead, we carefully understand your infrastructure and design a management system that fits your operations.",
    evaluateLeadIn: "Our process begins with evaluating:",
    evaluateBullets: [
      "Your current cloud architecture",
      "Application performance and dependencies",
      "Cost distribution across services",
      "Security configurations and risks",
      "Based on this understanding, we create a tailored cloud management strategy that aligns with your business objectives and ensures long-term efficiency.",
    ],
    strategyParagraph:
      "Based on this understanding, we create a tailored cloud management strategy that aligns with your business objectives and ensures long-term efficiency.",
    capabilitiesLeadIn: "Our core capabilities include:",
    capabilitiesBullets: [
      "Multi-cloud and hybrid cloud environment management",
      "Cloud infrastructure optimization",
      "Resource allocation and cost control",
      "Continuous performance monitoring",
      "Security management and compliance support",
      "Automation of cloud operations",
    ],
  },
  results: {
    title: "When cloud management is done right, results follow naturally",
    items: [
      {
        title: "Clear visibility and better decision-making",
        body: "You gain real-time insights into your infrastructure, helping you make faster and more informed decisions.",
      },
      {
        title: "Controlled and optimized cloud spending",
        body: "Resources are used efficiently, reducing unnecessary costs and improving overall budget control.",
      },
      {
        title: "Consistent system performance",
        body: "Applications and services run smoothly with minimal disruptions, ensuring reliable operations.",
      },
      {
        title: "Strong data protection and system security",
        body: "Security measures are continuously monitored and updated to protect your infrastructure.",
      },
      {
        title: "Flexibility to grow without limitations",
        body: "Your cloud environment adapts easily as your business scales, without creating operational challenges.",
      },
      {
        title: "Reduced downtime and improved reliability",
        body: "Proactive monitoring and automated responses ensure that issues are addressed before they impact your business.",
      },
    ],
  },
  businessFunctions: {
    eyebrow: "choose us",
    title: "Supporting multiple business functions through cloud efficiency",
    intro:
      "Cloud infrastructure plays a critical role across different areas of your business. Our solutions ensure that each function benefits from a stable and optimized environment.",
    bullets: [
      "Application Hosting: Reliable and high-performance hosting for business applications",
      "Data Management: Secure storage and efficient data processing",
      "Development Environments: Scalable infrastructure for development and testing",
      "Business Operations: Smooth execution of daily processes through stable systems",
      "Customer Platforms: Improved performance for customer-facing applications",
    ],
    discoverMore: "Discover More",
  },
  process: {
    eyebrow: "A practical approach that ensures smooth execution",
    steps: [
      {
        title: "Understanding your existing cloud setup",
        body: "We begin by analyzing your infrastructure, identifying inefficiencies, and understanding your operational requirements.",
      },
      {
        title: "Creating a tailored cloud management strategy",
        body: "Based on our analysis, we design a solution that improves performance, reduces cost, and strengthens security.",
      },
      {
        title: "Implementing with minimal disruption",
        body: "Our team ensures that all changes are introduced smoothly without affecting your ongoing operations.",
      },
      {
        title: "Monitoring performance continuously",
        body: "We track system behavior in real time to maintain performance and prevent issues.",
      },
      {
        title: "Improving and scaling over time",
        body: "As your business grows, we refine and expand your cloud environment to support new demands.",
      },
    ],
  },
  industries: {
    title: "Experience that adapts to different industries",
    intro:
      "Excellanto works with businesses across various industries, each with unique cloud requirements. Our ability to customize solutions ensures that every organization receives the right level of support.",
    serveLeadIn: "We serve:",
    bullets: [
      "Technology and SaaS companies",
      "E-commerce and digital platforms",
      "Healthcare organizations",
      "Financial services and consulting firms",
      "Manufacturing and logistics businesses",
      "Real estate and infrastructure companies",
    ],
    closing:
      "This industry-wide experience allows us to deliver solutions that are practical and effective.",
  },
  partner: {
    title: "A technology partner that focuses on real outcomes",
    intro:
      "Choosing Excellanto means working with a team that understands both technology and business operations. Our goal is not just to manage your cloud but to improve how your business performs.",
    bullets: [
      "Strong technical expertise in cloud and IT infrastructure",
      "Business-focused approach to solution design",
      "Customized strategies for every client",
      "Scalable systems built for long-term growth",
      "Continuous support and performance improvement",
    ],
  },
  future: {
    title: "Building a cloud environment that supports future growth",
    intro:
      "As businesses continue to evolve, cloud infrastructure must be able to keep up. Intelligent Cloud Management ensures that your systems are always ready for new challenges and opportunities.",
    bullets: [
      "Stable and high-performing",
      "Secure and compliant",
      "Flexible and scalable",
      "Efficient and cost-controlled",
      "This creates a strong foundation for innovation, expansion, and long-term growth.",
    ],
  },
  cta: {
    title: "Let's turn your social data into real business value",
    body: "If you want to move beyond basic social media management and leverage data for smarter growth, Excellanto is ready to deliver.",
    closingTitle:
      "Partner with Excellanto to build intelligent, insight-driven social media strategies that drive engagement, conversions, and sustainable growth.",
    email: "support@excellanto.com",
    website: "https://excellanto.com",
    tagline: "Make smarter decisions with Social Media Intelligence",
    subtext:
      "Work with Excellanto to unlock the full potential of your social media and turn insights into measurable business outcomes.",
  },
};

/** Content from excellanto.com/it-strategy-innovation-consulting/ */
export const itStrategyInnovationConsultingPage = {
  opening: [
    "Cloud infrastructure is the backbone of modern digital operations, but without the right control and visibility, it can quickly become complex, expensive, and difficult to manage.",
    "At Excellanto, we deliver Intelligent Cloud Management solutions that bring clarity, control, and performance to your cloud ecosystem while supporting long-term business growth.",
    "Our solutions are designed to help businesses move beyond basic cloud usage and build an environment that is optimized, secure, and aligned with operational goals. By combining AI-driven monitoring, automation, and cloud optimization strategies, we ensure that your infrastructure performs consistently while adapting to changing business needs.",
    "With strong expertise in enterprise cloud environments, IT infrastructure, and automation technologies, Excellanto enables organizations to operate with confidence while making the most of their cloud investments.",
  ],
  chooseUs: {
    title: "Turning technology decisions into business advantages",
    body: "Many organizations invest in technology without a clear roadmap, which leads to inefficiencies and missed opportunities. Therefore, our focus is on bringing structure to your IT planning and helping you make decisions that create long-term value.",
    bullets: [
      "Align IT strategy with business goals",
      "Identify the right technologies for growth",
      "Eliminate inefficiencies in current systems",
      "Plan scalable and future-ready IT architecture",
      "Build innovation-driven operational models",
    ],
  },
  infrastructure: {
    title: "Designed around your infrastructure, not forced onto it",
    intro:
      "Every organization uses the cloud differently. Some operate on hybrid models, while others depend on multi-cloud platforms. Because of this, we do not apply generic solutions. Instead, we carefully understand your infrastructure and design a management system that fits your operations.",
    evaluateLeadIn: "Our process begins with evaluating:",
    evaluateBullets: [
      "Your current cloud architecture",
      "Application performance and dependencies",
      "Cost distribution across services",
      "Security configurations and risks",
      "Based on this understanding, we create a tailored cloud management strategy that aligns with your business objectives and ensures long-term efficiency.",
    ],
    strategyParagraph:
      "Based on this understanding, we create a tailored cloud management strategy that aligns with your business objectives and ensures long-term efficiency.",
    capabilitiesLeadIn: "Our core capabilities include:",
    capabilitiesBullets: [
      "Multi-cloud and hybrid cloud environment management",
      "Cloud infrastructure optimization",
      "Resource allocation and cost control",
      "Continuous performance monitoring",
      "Security management and compliance support",
      "Automation of cloud operations",
    ],
  },
  results: {
    title: "When cloud management is done right, results follow naturally",
    items: [
      {
        title: "Clear visibility and better decision-making",
        body: "You gain real-time insights into your infrastructure, helping you make faster and more informed decisions.",
      },
      {
        title: "Controlled and optimized cloud spending",
        body: "Resources are used efficiently, reducing unnecessary costs and improving overall budget control.",
      },
      {
        title: "Consistent system performance",
        body: "Applications and services run smoothly with minimal disruptions, ensuring reliable operations.",
      },
      {
        title: "Strong data protection and system security",
        body: "Security measures are continuously monitored and updated to protect your infrastructure.",
      },
      {
        title: "Flexibility to grow without limitations",
        body: "Your cloud environment adapts easily as your business scales, without creating operational challenges.",
      },
      {
        title: "Reduced downtime and improved reliability",
        body: "Proactive monitoring and automated responses ensure that issues are addressed before they impact your business.",
      },
    ],
  },
  cta: {
    title: "Let's turn your social data into real business value",
    body: "If you want to move beyond basic social media management and leverage data for smarter growth, Excellanto is ready to deliver.",
    closingTitle:
      "Partner with Excellanto to build intelligent, insight-driven social media strategies that drive engagement, conversions, and sustainable growth.",
    email: "support@excellanto.com",
    website: "https://excellanto.com",
    tagline: "Make smarter decisions with Social Media Intelligence",
    subtext:
      "Work with Excellanto to unlock the full potential of your social media and turn insights into measurable business outcomes.",
  },
};

/** Content from excellanto.com/predictive-performance-marketing/ */
export const predictivePerformanceMarketingPage = {
  hero: {
    eyebrow: "Built to deliver performance, not just traffic",
    intro:
      "Marketing success is not defined by clicks or impressions—it is defined by conversions and revenue. Therefore, Excellanto focuses on building campaigns that are optimized for outcomes from the very beginning.",
    bullets: [
      "Attract high-intent users instead of low-quality traffic",
      "Improve conversion rates across landing pages and funnels",
      "Reduce cost per lead and cost per acquisition",
      "Allocate budget efficiently across channels",
      "Allocate budget efficiently across channels",
    ],
    result:
      "This ensures that your marketing efforts translate into real business impact, not just activity.",
  },
  whyChooseUs: {
    eyebrow: "why choose us",
    title: "Powered by data, refined by continuous optimization",
    body: "At Excellanto, every marketing decision is backed by data. We analyze user behavior, campaign performance, and market trends to build strategies that are precise and effective.",
    leadIn: "Our predictive approach allows us to:",
    bullets: [
      "Identify which audience segments are most likely to convert",
      "Forecast campaign performance before scaling budgets",
      "Optimize campaigns dynamically based on real-time data",
      "Eliminate underperforming channels and strategies",
    ],
    result:
      "Because of this, your campaigns are always improving, adapting, and delivering better results over time.",
  },
  overview: {
    title: "Predictive Performance Marketing",
    paragraphs: [
      "At Excellanto, we create predictive performance marketing systems that drive real business results through data, AI, and continuous optimization. Our focus is simple—generate qualified leads, increase conversions, and maximize ROI with strategies that are built to perform, scale, and sustain growth.",
      "We don't run random campaigns or rely on assumptions. Instead, we build a structured, performance-focused marketing ecosystem where every campaign, audience, and budget decision is backed by data and aligned with your business goals.",
    ],
  },
  conversions: {
    eyebrow: "Marketing that focuses on conversions, not just visibility",
    intro:
      "Excellanto designs marketing strategies that go beyond impressions and clicks. Every campaign is structured to deliver outcomes that matter—leads, sales, and measurable business growth.",
    leadIn: "We help businesses:",
    bullets: [
      "Generate high-quality, intent-driven leads",
      "Improve conversion rates across funnels",
      "Reduce customer acquisition costs",
      "Increase marketing efficiency across platforms",
      "Build consistent and scalable growth channels",
    ],
    result:
      "This ensures that your marketing investment delivers clear and trackable returns.",
  },
  dataExecution: {
    title: "Data-driven execution that improves performance continuously",
    intro:
      "At Excellanto, marketing decisions are never based on guesswork. We use advanced analytics and AI-powered insights to guide every stage of campaign execution.",
    leadIn: "Our predictive marketing model enables:",
    bullets: [
      "Identification of high-converting audience segments",
      "Forecast campaign performance before scaling budgets",
      "Real-time optimization for better results",
      "Elimination of underperforming strategies",
    ],
    result:
      "As a result, your campaigns are constantly refined to deliver higher performance and better ROI.",
  },
  capabilities: {
    eyebrow: "Key capabilities that power your marketing growth",
    items: [
      {
        title: "Predictive Analytics",
        body: "Predictive Analytics Anticipates user behavior and improves targeting accuracy",
      },
      {
        title: "Audience Segmentation",
        body: "Focuses on high-value users likely to convert",
      },
      {
        title: "Campaign Optimization",
        body: "Campaign Optimization Enhances performance through continuous improvements",
      },
      {
        title: "Budget Optimization",
        body: "Allocates spend to maximize ROI",
      },
      {
        title: "Multi-Channel Execution",
        body: "Ensures consistent performance across platforms",
      },
      {
        title: "Performance Tracking",
        body: "Provides complete visibility into campaign results",
      },
    ],
  },
  process: {
    eyebrow: "A clear and structured approach that ensures results",
    title: "Structured execution that ensures consistent results",
    intro: "Excellanto follows a clear and performance-driven approach to deliver reliable outcomes.",
    steps: [
      {
        title: "Understanding your business and audience",
        body: "We analyze your market, audience behavior, and competition to define a strong foundation.",
      },
      {
        title: "Building a conversion-focused strategy",
        body: "Campaigns are designed with a clear focus on leads, sales, and ROI.",
      },
      {
        title: "Executing across the right channels",
        body: "We run campaigns on platforms that deliver the best performance for your business.",
      },
      {
        title: "Optimizing in real time",
        body: "Continuous monitoring ensures campaigns are adjusted for better results.",
      },
      {
        title: "Scaling successful campaigns",
        body: "High-performing strategies are expanded to maximize growth.",
      },
    ],
  },
  idealFor: {
    title: "Designed for businesses focused on growth",
    intro: "Our Predictive Performance Marketing solutions are ideal for:",
    bullets: [
      "E-commerce brands",
      "SaaS and technology companies",
      "Service-based businesses",
      "Startups and scaling enterprises",
      "B2B and B2C organizations",
      "Each strategy is tailored to your business model, ensuring maximum effectiveness.",
    ],
  },
  growthEngine: {
    title: "Turning marketing into a scalable growth engine",
    intro:
      "With the right strategy and execution, marketing becomes a predictable source of growth. Excellanto ensures your campaigns are:",
    bullets: [
      "Data-driven and performance-focused",
      "Scalable without increasing inefficiencies",
      "Optimized for long-term success",
      "Aligned with business objectives",
      "This transforms your marketing from an expense into a revenue-generating system.",
    ],
  },
  impact: {
    title: "Where predictive performance marketing creates impact",
    intro: "Excellanto delivers measurable value across multiple marketing objectives:",
    bullets: [
      "Lead Generation: Attract and convert high-intent prospects",
      "E-commerce Sales: Increase conversions and revenue",
      "Brand Visibility: Reach relevant audiences effectively",
      "Customer Retention: Improve engagement and repeat business",
      "Funnel Optimization: Strengthen every stage of the customer journey",
    ],
  },
  trust: {
    title: "Why Excellanto for performance marketing",
    intro:
      "Excellanto combines strategy, execution, and technology to deliver marketing solutions that perform consistently.",
    bullets: [
      "Strong focus on ROI and measurable outcomes",
      "AI-driven campaign optimization",
      "Customized strategies for every business",
      "Continuous monitoring and improvement",
      "Expertise across industries and platforms",
    ],
  },
  cta: {
    title: "Let's turn your social data into real business value",
    body: "If you want to move beyond basic social media management and leverage data for smarter growth, Excellanto is ready to deliver.",
    closingTitle:
      "Partner with Excellanto to build intelligent, insight-driven social media strategies that drive engagement, conversions, and sustainable growth.",
    email: "support@excellanto.com",
    website: "https://excellanto.com",
    tagline: "Make smarter decisions with Social Media Intelligence",
    subtext:
      "Work with Excellanto to unlock the full potential of your social media and turn insights into measurable business outcomes.",
  },
};

/** Content from excellanto.com/seo-cognition/ */
export const seoCognitionPage = {
  heroTitle: "SEO Cognition",
  intro: [
    "At Excellanto, we deliver advanced Search Engine Optimization services designed to position your business at the top of search results, attract high-intent traffic, and convert visibility into measurable growth. As a performance-driven SEO company, our focus is on building a strong, scalable organic presence that continuously generates leads, strengthens authority, and supports long-term business success.",
    "Our expert SEO team works as an extension of your business—analyzing, optimizing, and refining every element of your website to ensure it performs effectively across search engines. From technical SEO to content strategy and ongoing SEO marketing, we create a complete system that delivers consistent and sustainable results.",
  ],
  approach: {
    eyebrow: "A structured SEO approach built for measurable outcomes",
    title:
      "Search engine optimization today requires more than keyword placement. It demands a strategic approach that aligns with user intent, search engine algorithms, and business goals. Excellanto delivers SEO services that are structured, data-driven, and focused on real performance.",
    leadIn: "With our SEO optimization services, your business can:",
    bullets: [
      "Achieve higher rankings for competitive keywords",
      "Attract targeted users actively searching for your services",
      "Generate qualified organic leads consistently",
      "Strengthen brand authority in your industry",
    ],
    result:
      "This ensures that your SEO efforts contribute directly to revenue growth and long-term digital success.",
  },
  keywords: {
    eyebrow: "why choose us",
    title: "Keyword intelligence that drives targeted traffic",
    body: "Keywords are the foundation of any successful SEO strategy. Excellanto focuses on identifying keywords that not only drive traffic but also generate conversions.",
    leadIn: "Our keyword research services include:",
    bullets: [
      "Identifying high-intent search terms",
      "Mapping keywords to specific pages",
      "Discovering long-tail keyword opportunities",
      "Aligning keywords with business objectives",
    ],
  },
  pillars: [
    {
      title: "On-page SEO that improves visibility and engagement",
      intro:
        "On-page SEO is essential for ensuring that your website content is optimized for both search engines and users. Excellanto focuses on enhancing every element of your web pages to maximize performance.",
      leadIn: "Our on-page SEO services include:",
      bullets: [
        "Optimizing titles, meta descriptions, and headings",
        "Improving content structure and readability",
        "Enhancing internal linking strategies",
        "Optimizing images and multimedia elements",
        "Ensuring proper keyword placement",
      ],
      result:
        "This ensures that search engines can easily access and understand your website, leading to better rankings and performance.",
    },
    {
      title: "Technical SEO that strengthens your website foundation",
      intro:
        "A strong technical foundation is critical for SEO success. Excellanto ensures that your website meets all technical requirements for optimal performance.",
      leadIn: "",
      bullets: [] as string[],
      result:
        "Excellanto ensures that your website meets all technical requirements for optimal performance—so search engines can crawl, index, and rank your site with confidence.",
    },
    {
      title: "Content strategy that builds authority and trust",
      intro:
        "Content plays a key role in SEO marketing. Excellanto develops content strategies that are designed to rank well and engage users effectively.",
      leadIn: "Our SEO content services include:",
      bullets: [
        "Creating keyword-optimized service pages",
        "Developing high-quality informational content",
        "Updating and improving existing content",
        "Aligning content with user search intent",
        "Building topical authority in your niche",
      ],
      result:
        "This ensures your website becomes a trusted source of information, improving both rankings and conversions.",
    },
  ],
  cta: {
    title: "Ready to rank at the top of search results?",
    body: "Partner with Excellanto to build a scalable organic presence that generates qualified leads and strengthens your brand authority.",
    closingTitle:
      "Let our SEO team analyze, optimize, and refine every element of your website for sustainable search performance.",
    tagline: "Performance-driven SEO Cognition",
    subtext:
      "From keyword intelligence to technical SEO and content strategy—we deliver a complete system for measurable organic growth.",
  },
};

/** Content from excellanto.com/staffing-recruitment-service/ */
export const staffingRecruitmentPage = {
  heroTitle: "Strategic Staffing & Recruitment Solutions",
  intro: [
    "Building the right team is no longer a routine hiring activity—it is a business-critical function that directly impacts growth, delivery capability, and long-term success.",
    "At Excellanto, we approach staffing and recruitment as a strategic business solution, not a transactional service. We work closely with organizations to understand how talent fits into their larger vision, and then we design hiring strategies that deliver not just candidates, but the right people who can create measurable impact.",
    "We don't believe in volume-based recruitment. Instead, we focus on precision, alignment, and long-term value. Every hiring requirement is treated with a clear objective—to identify professionals who not only meet technical expectations but also integrate seamlessly into your business environment.",
  ],
  principles: [
    {
      label: "Precision",
      body: "No volume-based recruitment—every requirement is treated with a clear objective.",
    },
    {
      label: "Alignment",
      body: "Professionals who meet technical expectations and integrate into your environment.",
    },
    {
      label: "Long-term value",
      body: "The right people who create measurable impact, not just fill positions.",
    },
  ],
  approach: {
    eyebrow: "A focused hiring approach built on clarity and precision",
    paragraphs: [
      "Our recruitment process is structured, but it is not rigid. It is designed to adapt to your specific hiring needs while maintaining consistency in quality.",
      "We start with a detailed understanding of your requirement. This includes not only technical skills but also role expectations, team dynamics, and growth potential. Based on this, we identify the right talent pool using targeted sourcing methods.",
      "Each candidate goes through a thorough evaluation process. We assess their technical capabilities, communication skills, experience relevance, and overall suitability for your organization. We also ensure that candidates are genuinely interested and aligned with the opportunity before presenting them.",
    ],
    result:
      "This approach ensures that when you receive a profile, it is already filtered, evaluated, and aligned, saving your time and effort.",
  },
  expertise: {
    eyebrow: "Expertise across critical and high-demand technology domains",
    intro:
      "We specialize in hiring for roles that are essential for modern businesses, especially in areas where talent demand is high and availability is limited.",
    domains: [
      {
        title: "Enterprise Platforms",
        body: "In enterprise platforms, we work with professionals experienced in SAP across modules such as FICO, MM, SD, HCM, and S/4HANA. We also support hiring for Oracle environments, including EBS, Fusion, and cloud-based systems. For organizations working with ServiceNow and MuleSoft, we identify professionals who bring both technical depth and practical implementation experience.",
      },
      {
        title: "Cloud & Infrastructure",
        body: "When it comes to cloud and infrastructure, we help businesses build strong teams with expertise in AWS and Azure. This includes professionals skilled in cloud architecture, DevOps, migration strategies, and enterprise integrations.",
      },
      {
        title: "Software Development",
        body: "In software development, we focus on delivering developers who can build scalable and efficient systems. This includes Java (Spring Boot) developers for enterprise applications and .NET professionals for full-stack development. We also support hiring for modern application architectures and microservices environments.",
      },
      {
        title: "DevOps & Automation",
        body: "For DevOps and automation, we identify professionals who can streamline development and deployment processes. This includes expertise in CI/CD pipelines, containerization tools like Docker and Kubernetes, and infrastructure automation.",
      },
    ],
  },
  process: {
    title: "A hiring process designed to reduce effort and improve results",
    intro:
      "Recruitment often becomes time-consuming when there is no structure. We solve this by following a process that is clear, efficient, and focused on outcomes.",
    steps: [
      {
        title: "Requirement mapping",
        body: "We begin with requirement mapping, where we clearly define what success looks like for the role.",
      },
      {
        title: "Targeted sourcing",
        body: "This is followed by targeted sourcing, where we identify candidates who match both technical and business expectations.",
      },
      {
        title: "Outreach & screening",
        body: "Once candidates are identified, we initiate outreach and conduct initial screenings. This ensures that only relevant and interested candidates move forward.",
      },
      {
        title: "Interview coordination",
        body: "We manage the entire interview coordination process, making it easier for your team to focus on evaluation rather than logistics.",
      },
      {
        title: "Offer management",
        body: "After selection, we assist with offer management and ensure smooth onboarding.",
      },
      {
        title: "Post-placement support",
        body: "Our involvement does not end with placement—we stay engaged to ensure that the transition is successful.",
      },
    ],
  },
  idealFor: {
    title: "Designed for companies that value quality hiring",
    intro:
      "Our services are built for organizations that understand the importance of hiring the right people. We work with startups, growing businesses, and enterprises that are scaling their operations or undergoing digital transformation.",
    segments: [
      {
        title: "Startups",
        body: "For startups, we help build strong foundational teams.",
      },
      {
        title: "Growing companies",
        body: "For growing companies, we support rapid scaling without compromising on quality.",
      },
      {
        title: "Enterprises",
        body: "For enterprises, we manage complex and specialized hiring requirements.",
      },
    ],
    result:
      "In every case, our focus remains the same—delivering talent that contributes to business success.",
  },
  impact: {
    title: "Creating long-term value through better hiring decisions",
    intro: [
      "The impact of hiring goes beyond filling positions. The right hires improve productivity, strengthen teams, and accelerate business growth. On the other hand, wrong hires lead to delays, costs, and disruptions.",
      "Our goal is to help you make better hiring decisions. By focusing on quality, alignment, and long-term fit, we ensure that every hire contributes positively to your organization.",
    ],
    bullets: [
      "Stronger and more capable teams",
      "Reduced employee turnover",
      "Faster project execution",
      "Improved overall performance",
    ],
  },
  cta: {
    title: "Ready to build the team that drives your growth?",
    body: "Partner with Excellanto for strategic staffing and recruitment that delivers precision, alignment, and long-term value.",
    closingTitle:
      "Let us help you identify the right people who can create measurable impact for your organization.",
    tagline: "Strategic Staffing & Recruitment Solutions",
    subtext:
      "From requirement mapping to post-placement support—we handle hiring so you can focus on building your business.",
    buttonLabel: "Discover More",
  },
};

export const heroCopy = {
  eyebrow: "",
  title: "AI Powered IT Solutions & Staffing",
  subtitle: "Streamlining Operations Accelerating Outcomes",
  body: "We provide advanced AI-powered IT solutions that streamline business operations, improve strategic decision-making, and deliver measurable results. Our intelligent technology platforms enable organizations to scale efficiently, strengthen security, and operate with greater speed, agility, and confidence.",
  primaryCta: "Let’s Talk",
  secondaryCta: "Contact Us",
};

export const servicesPageCopy = {
  title: "Delivering reliable solutions tailored to your business needs",
  viewMore: "Want to see our professional Services. Click here to View More",
};

export const whyChooseCardsIntro = {
  eyebrow: "why choose us",
  title: "We Want to Work The Best!",
  body: "At Excellanto, our goal is to work with forward-thinking organizations that value quality, innovation, and long-term success. We combine expertise, dedication, and advanced technology to deliver reliable IT solutions that help businesses operate efficiently and achieve measurable growth",
};

export const brandsHeading = "We Build Modern Experience with Brands";

export const footerLinks = {
  services: services.slice(0, 6).map((s) => ({
    href: `/services/${s.slug}`,
    label: s.shortTitle,
  })),
  company: [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact Us" },
  ],
  resources: [
    { href: "/services", label: "All Services" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-condition", label: "Terms condition" },
  ],
};
