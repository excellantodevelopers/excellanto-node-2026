import { industries, mobileAppPage, aiDrivenOperationsAutomationPage, intelligentCloudManagementPage, itStrategyInnovationConsultingPage, predictivePerformanceMarketingPage, seoCognitionPage, socialMediaIntelligencePage, staffingRecruitmentPage, websiteDevPage } from "@/lib/data";
import {
  aiDrivenOperationsImages,
  brandLogos,
  intelligentCloudManagementImages,
  itStrategyInnovationImages,
  predictivePerformanceMarketingImages,
  mobileAppImages,
  seoCognitionImages,
  socialMediaImages,
  staffingRecruitmentImages,
  websiteDevImages,
} from "@/lib/images";
import { getCmsIcon } from "./icons";
import { pickArray, pickText, resolveCmsImage, resolveServiceBannerImage, type CmsImageValue } from "./resolve";
import type { CmsService } from "./types";

type Raw = Record<string, unknown>;

export function getMobilePageContent(service?: CmsService | null) {
  const raw = (service?.mobile ?? {}) as Raw;
  const why = Array.isArray(raw.mobileWhyChoose)
    ? (raw.mobileWhyChoose as { title?: string; body?: string }[]).map((item, i) => ({
        title: pickText(item.title, mobileAppPage.whyChoose[i]?.title ?? ""),
        body: pickText(item.body, mobileAppPage.whyChoose[i]?.body ?? ""),
      }))
    : mobileAppPage.whyChoose;

  const steps = Array.isArray(raw.mobileProcessSteps)
    ? (raw.mobileProcessSteps as { step?: string; title?: string; body?: string; image?: CmsImageValue }[]).map(
        (item, i) => ({
          step: pickText(item.step, mobileAppPage.processSteps[i]?.step ?? ""),
          title: pickText(item.title, mobileAppPage.processSteps[i]?.title ?? ""),
          body: pickText(item.body, mobileAppPage.processSteps[i]?.body ?? ""),
          image: resolveCmsImage(item.image, mobileAppImages.process[i] ?? mobileAppImages.hero),
        })
      )
    : mobileAppPage.processSteps.map((step, i) => ({
        ...step,
        image: mobileAppImages.process[i],
      }));

  const industryItems = Array.isArray(raw.mobileIndustries)
    ? (raw.mobileIndustries as { title?: string; icon?: string }[]).map((item, i) => ({
        title: pickText(item.title, industries[i]?.title ?? ""),
        icon: getCmsIcon(item.icon),
      }))
    : industries;

  return {
    heroTitle: pickText(raw.mobileHeroTitle as string, mobileAppPage.heroTitle),
    heroEyebrow: pickText(raw.mobileHeroEyebrow as string, service?.bannerEyebrow || "Mobile App Development"),
    heroImage: resolveServiceBannerImage("mobile-app-development", raw.mobileHeroImage as CmsImageValue, mobileAppImages.hero),
    whyChoose: pickArray(why, mobileAppPage.whyChoose),
    processEyebrow: pickText(raw.mobileProcessEyebrow as string, mobileAppPage.processEyebrow),
    processTitle: pickText(raw.mobileProcessTitle as string, mobileAppPage.processTitle),
    processIntro: pickText(raw.mobileProcessIntro as string, mobileAppPage.processIntro),
    processSteps: pickArray(steps, steps),
    brandsTitle: pickText(raw.mobileBrandsTitle as string, mobileAppPage.brandsTitle),
    industriesEyebrow: pickText(raw.mobileIndustriesEyebrow as string, mobileAppPage.industriesEyebrow),
    industriesTitle: pickText(raw.mobileIndustriesTitle as string, mobileAppPage.industriesTitle),
    industriesIntro: pickText(raw.mobileIndustriesIntro as string, mobileAppPage.industriesIntro),
    industriesImage: resolveCmsImage(raw.mobileIndustriesImage as CmsImageValue, mobileAppImages.industries),
    industries: industryItems,
    brandsVisual: mobileAppImages.brandsVisual,
    brandLogos,
  };
}

export function getWebsitePageContent(service?: CmsService | null) {
  const raw = (service?.website ?? {}) as Raw;
  const offerings = Array.isArray(raw.websiteOfferings)
    ? (raw.websiteOfferings as { title?: string; body?: string; image?: CmsImageValue }[]).map((item, i) => ({
        title: pickText(item.title, websiteDevPage.offerings[i]?.title ?? ""),
        body: pickText(item.body, websiteDevPage.offerings[i]?.body ?? ""),
        image: resolveCmsImage(item.image, websiteDevImages.offerings[i] ?? websiteDevImages.hero),
      }))
    : websiteDevPage.offerings.map((item, i) => ({
        ...item,
        image: websiteDevImages.offerings[i],
      }));

  const why = Array.isArray(raw.websiteWhyChoose)
    ? (raw.websiteWhyChoose as { title?: string; body?: string }[]).map((item, i) => ({
        title: pickText(item.title, websiteDevPage.whyChoose[i]?.title ?? ""),
        body: pickText(item.body, websiteDevPage.whyChoose[i]?.body ?? ""),
      }))
    : websiteDevPage.whyChoose;

  const steps = Array.isArray(raw.websiteProcessSteps)
    ? (raw.websiteProcessSteps as { step?: string; title?: string; body?: string; image?: CmsImageValue }[]).map(
        (item, i) => ({
          step: pickText(item.step, websiteDevPage.processSteps[i]?.step ?? ""),
          title: pickText(item.title, websiteDevPage.processSteps[i]?.title ?? ""),
          body: pickText(item.body, websiteDevPage.processSteps[i]?.body ?? ""),
          image: resolveCmsImage(item.image, websiteDevImages.process[i] ?? websiteDevImages.hero),
        })
      )
    : websiteDevPage.processSteps.map((step, i) => ({
        ...step,
        image: websiteDevImages.process[i],
      }));

  return {
    heroTitle: pickText(raw.websiteHeroTitle as string, websiteDevPage.heroTitle),
    heroEyebrow: pickText(raw.websiteHeroEyebrow as string, service?.bannerEyebrow || "Website Development"),
    heroImage: resolveServiceBannerImage("website-development", raw.websiteHeroImage as CmsImageValue, websiteDevImages.hero),
    offeringsTitle: pickText(raw.websiteOfferingsTitle as string, websiteDevPage.offeringsTitle),
    offerings: pickArray(offerings, offerings),
    whyChooseTitle: pickText(raw.websiteWhyTitle as string, websiteDevPage.whyChooseTitle),
    whyChoose: pickArray(why, websiteDevPage.whyChoose),
    processSteps: pickArray(steps, steps),
    redesignEyebrow: pickText(raw.websiteRedesignEyebrow as string, websiteDevPage.redesignEyebrow),
    redesignTitle: pickText(raw.websiteRedesignTitle as string, websiteDevPage.redesignTitle),
    redesignItems: pickArray(raw.websiteRedesignItems as string[], [...websiteDevPage.redesignItems]),
    redesignImage: resolveCmsImage(raw.websiteRedesignImage as CmsImageValue, websiteDevImages.redesign),
    highlights: pickArray(raw.websiteHighlights as string[], [...websiteDevPage.highlights]),
    highlightsImage: resolveCmsImage(raw.websiteHighlightsImage as CmsImageValue, websiteDevImages.highlights),
    discoverMore: pickText(raw.websiteDiscoverMore as string, websiteDevPage.discoverMore),
  };
}

export function getSocialMediaPageContent(service?: CmsService | null) {
  const page = socialMediaIntelligencePage;
  const raw = (service?.socialMedia ?? {}) as Raw;

  const featureSections = Array.isArray(raw.socialFeatureSections)
    ? (raw.socialFeatureSections as { title?: string; intro?: string; bullets?: string[]; result?: string }[]).map(
        (item, i) => ({
          title: pickText(item.title, page.featureSections[i]?.title ?? ""),
          intro: pickText(item.intro, page.featureSections[i]?.intro ?? ""),
          bullets: pickArray(item.bullets, page.featureSections[i]?.bullets ?? []),
          result: pickText(item.result, page.featureSections[i]?.result ?? ""),
        })
      )
    : page.featureSections;

  const processSteps = Array.isArray(raw.socialProcessSteps)
    ? (raw.socialProcessSteps as { step?: string; title?: string; body?: string }[]).map((item, i) => ({
        step: pickText(item.step, page.process.steps[i]?.step ?? ""),
        title: pickText(item.title, page.process.steps[i]?.title ?? ""),
        body: pickText(item.body, page.process.steps[i]?.body ?? ""),
      }))
    : page.process.steps;

  const sectionImages = [
    socialMediaImages.contentStrategy,
    socialMediaImages.realtime,
    socialMediaImages.competitive,
  ] as const;

  return {
    heroTitle: pickText(raw.socialHeroTitle as string, page.heroTitle),
    heroEyebrow: pickText(raw.socialHeroEyebrow as string, service?.bannerEyebrow || "Services"),
    heroImage: resolveServiceBannerImage("social-media-intelligence", raw.socialHeroImage as CmsImageValue, socialMediaImages.hero),
    intro: pickArray(raw.socialIntro as string[], [...page.intro]),
    chooseUs: {
      eyebrow: pickText(raw.socialChooseEyebrow as string, page.chooseUs.eyebrow),
      title: pickText(raw.socialChooseTitle as string, page.chooseUs.title),
      body: pickText(raw.socialChooseBody as string, page.chooseUs.body),
      bullets: pickArray(raw.socialChooseBullets as string[], [...page.chooseUs.bullets]),
      result: pickText(raw.socialChooseResult as string, page.chooseUs.result),
      image: resolveCmsImage(raw.socialChooseImage as CmsImageValue, socialMediaImages.intelligenceHub),
    },
    audience: {
      eyebrow: pickText(raw.socialAudienceEyebrow as string, page.audience.eyebrow),
      body: pickText(raw.socialAudienceBody as string, page.audience.body),
      leadIn: pickText(raw.socialAudienceLeadIn as string, page.audience.leadIn),
      bullets: pickArray(raw.socialAudienceBullets as string[], [...page.audience.bullets]),
      result: pickText(raw.socialAudienceResult as string, page.audience.result),
      image: resolveCmsImage(raw.socialAudienceImage as CmsImageValue, socialMediaImages.audience),
    },
    featureSections: featureSections.map((section, index) => ({
      ...section,
      image: sectionImages[index] ?? socialMediaImages.contentStrategy,
    })),
    process: {
      eyebrow: pickText(raw.socialProcessEyebrow as string, page.process.eyebrow),
      title: pickText(raw.socialProcessTitle as string, page.process.title),
      intro: pickText(raw.socialProcessIntro as string, page.process.intro),
      steps: pickArray(processSteps, processSteps),
      image: resolveCmsImage(raw.socialProcessImage as CmsImageValue, socialMediaImages.process),
    },
    impact: {
      title: pickText(raw.socialImpactTitle as string, page.impact.title),
      intro: pickText(raw.socialImpactIntro as string, page.impact.intro),
      bullets: pickArray(raw.socialImpactBullets as string[], [...page.impact.bullets]),
      result: pickText(raw.socialImpactResult as string, page.impact.result),
      image: resolveCmsImage(raw.socialImpactImage as CmsImageValue, socialMediaImages.impact),
    },
    idealFor: {
      eyebrow: pickText(raw.socialIdealEyebrow as string, page.idealFor.eyebrow),
      title: pickText(raw.socialIdealTitle as string, page.idealFor.title),
      intro: pickText(raw.socialIdealIntro as string, page.idealFor.intro),
      bullets: pickArray(raw.socialIdealBullets as string[], [...page.idealFor.bullets]),
      result: pickText(raw.socialIdealResult as string, page.idealFor.result),
      image: resolveCmsImage(raw.socialIdealImage as CmsImageValue, socialMediaImages.idealFor),
    },
    cta: {
      title: pickText(raw.socialCtaTitle as string, page.cta.title),
      body: pickText(raw.socialCtaBody as string, page.cta.body),
      closingTitle: pickText(raw.socialCtaClosingTitle as string, page.cta.closingTitle),
      tagline: pickText(raw.socialCtaTagline as string, page.cta.tagline),
      subtext: pickText(raw.socialCtaSubtext as string, page.cta.subtext),
    },
  };
}

export function getSeoCognitionPageContent(service?: CmsService | null) {
  const page = seoCognitionPage;
  const raw = (service?.seoCognition ?? {}) as Raw;

  const pillars = Array.isArray(raw.seoPillars)
    ? (raw.seoPillars as {
        title?: string;
        intro?: string;
        leadIn?: string;
        bullets?: string[];
        result?: string;
      }[]).map((item, i) => ({
        title: pickText(item.title, page.pillars[i]?.title ?? ""),
        intro: pickText(item.intro, page.pillars[i]?.intro ?? ""),
        leadIn: pickText(item.leadIn, page.pillars[i]?.leadIn ?? ""),
        bullets: pickArray(item.bullets, page.pillars[i]?.bullets ?? []),
        result: pickText(item.result, page.pillars[i]?.result ?? ""),
      }))
    : page.pillars;

  const pillarImages = [seoCognitionImages.onPage, seoCognitionImages.technical, seoCognitionImages.content];

  return {
    heroTitle: pickText(raw.seoHeroTitle as string, page.heroTitle),
    heroEyebrow: pickText(raw.seoHeroEyebrow as string, service?.bannerEyebrow || "Services"),
    heroImage: resolveServiceBannerImage("seo-cognition", raw.seoHeroImage as CmsImageValue, seoCognitionImages.hero),
    intro: pickArray(raw.seoIntro as string[], [...page.intro]),
    approach: {
      eyebrow: pickText(raw.seoApproachEyebrow as string, page.approach.eyebrow),
      title: pickText(raw.seoApproachTitle as string, page.approach.title),
      leadIn: pickText(raw.seoApproachLeadIn as string, page.approach.leadIn),
      bullets: pickArray(raw.seoApproachBullets as string[], [...page.approach.bullets]),
      result: pickText(raw.seoApproachResult as string, page.approach.result),
      image: resolveCmsImage(raw.seoApproachImage as CmsImageValue, seoCognitionImages.strategy),
    },
    keywords: {
      eyebrow: pickText(raw.seoKeywordsEyebrow as string, page.keywords.eyebrow),
      title: pickText(raw.seoKeywordsTitle as string, page.keywords.title),
      body: pickText(raw.seoKeywordsBody as string, page.keywords.body),
      leadIn: pickText(raw.seoKeywordsLeadIn as string, page.keywords.leadIn),
      bullets: pickArray(raw.seoKeywordsBullets as string[], [...page.keywords.bullets]),
      image: resolveCmsImage(raw.seoKeywordsImage as CmsImageValue, seoCognitionImages.keywords),
    },
    pillars: pillars.map((pillar, index) => ({
      ...pillar,
      image: pillarImages[index] ?? seoCognitionImages.onPage,
    })),
    accentImage: resolveCmsImage(raw.seoAccentImage as CmsImageValue, seoCognitionImages.accent),
    cta: {
      title: pickText(raw.seoCtaTitle as string, page.cta.title),
      body: pickText(raw.seoCtaBody as string, page.cta.body),
      closingTitle: pickText(raw.seoCtaClosingTitle as string, page.cta.closingTitle),
      tagline: pickText(raw.seoCtaTagline as string, page.cta.tagline),
      subtext: pickText(raw.seoCtaSubtext as string, page.cta.subtext),
    },
  };
}

export function getStaffingRecruitmentPageContent(service?: CmsService | null) {
  const page = staffingRecruitmentPage;
  const raw = (service?.staffingRecruitment ?? {}) as Raw;

  const principles = Array.isArray(raw.staffPrinciples)
    ? (raw.staffPrinciples as { label?: string; body?: string }[]).map((item, i) => ({
        label: pickText(item.label, page.principles[i]?.label ?? ""),
        body: pickText(item.body, page.principles[i]?.body ?? ""),
      }))
    : page.principles;

  const expertiseDomains = Array.isArray(raw.staffExpertiseDomains)
    ? (raw.staffExpertiseDomains as { title?: string; body?: string }[]).map((item, i) => ({
        title: pickText(item.title, page.expertise.domains[i]?.title ?? ""),
        body: pickText(item.body, page.expertise.domains[i]?.body ?? ""),
      }))
    : page.expertise.domains;

  const processSteps = Array.isArray(raw.staffProcessSteps)
    ? (raw.staffProcessSteps as { title?: string; body?: string }[]).map((item, i) => ({
        title: pickText(item.title, page.process.steps[i]?.title ?? ""),
        body: pickText(item.body, page.process.steps[i]?.body ?? ""),
      }))
    : page.process.steps;

  const segments = Array.isArray(raw.staffIdealSegments)
    ? (raw.staffIdealSegments as { title?: string; body?: string }[]).map((item, i) => ({
        title: pickText(item.title, page.idealFor.segments[i]?.title ?? ""),
        body: pickText(item.body, page.idealFor.segments[i]?.body ?? ""),
      }))
    : page.idealFor.segments;

  return {
    heroTitle: pickText(raw.staffHeroTitle as string, page.heroTitle),
    heroEyebrow: pickText(raw.staffHeroEyebrow as string, service?.bannerEyebrow || "Talent Solutions"),
    heroImage: resolveServiceBannerImage("staffing-recruitment-service", raw.staffHeroImage as CmsImageValue, staffingRecruitmentImages.hero),
    intro: pickArray(raw.staffIntro as string[], [...page.intro]),
    principles,
    approach: {
      eyebrow: pickText(raw.staffApproachEyebrow as string, page.approach.eyebrow),
      paragraphs: pickArray(raw.staffApproachParagraphs as string[], [...page.approach.paragraphs]),
      result: pickText(raw.staffApproachResult as string, page.approach.result),
      image: resolveCmsImage(raw.staffApproachImage as CmsImageValue, staffingRecruitmentImages.approach),
    },
    expertise: {
      eyebrow: pickText(raw.staffExpertiseEyebrow as string, page.expertise.eyebrow),
      intro: pickText(raw.staffExpertiseIntro as string, page.expertise.intro),
      domains: expertiseDomains,
      image: resolveCmsImage(raw.staffExpertiseImage as CmsImageValue, staffingRecruitmentImages.expertise),
    },
    process: {
      title: pickText(raw.staffProcessTitle as string, page.process.title),
      intro: pickText(raw.staffProcessIntro as string, page.process.intro),
      steps: processSteps,
      image: resolveCmsImage(raw.staffProcessImage as CmsImageValue, staffingRecruitmentImages.process),
    },
    idealFor: {
      title: pickText(raw.staffIdealTitle as string, page.idealFor.title),
      intro: pickText(raw.staffIdealIntro as string, page.idealFor.intro),
      segments: segments.map((segment, index) => ({
        ...segment,
        image: staffingRecruitmentImages.segments[index] ?? staffingRecruitmentImages.hero,
      })),
      result: pickText(raw.staffIdealResult as string, page.idealFor.result),
    },
    impact: {
      title: pickText(raw.staffImpactTitle as string, page.impact.title),
      intro: pickArray(raw.staffImpactIntro as string[], [...page.impact.intro]),
      bullets: pickArray(raw.staffImpactBullets as string[], [...page.impact.bullets]),
      image: resolveCmsImage(raw.staffImpactImage as CmsImageValue, staffingRecruitmentImages.impact),
    },
    cta: {
      title: pickText(raw.staffCtaTitle as string, page.cta.title),
      body: pickText(raw.staffCtaBody as string, page.cta.body),
      closingTitle: pickText(raw.staffCtaClosingTitle as string, page.cta.closingTitle),
      tagline: pickText(raw.staffCtaTagline as string, page.cta.tagline),
      subtext: pickText(raw.staffCtaSubtext as string, page.cta.subtext),
      buttonLabel: pickText(raw.staffCtaButtonLabel as string, page.cta.buttonLabel),
    },
  };
}

export function getAiDrivenOperationsPageContent(service?: CmsService | null) {
  const page = aiDrivenOperationsAutomationPage;
  const raw = (service?.aiDrivenOperations ?? {}) as Raw;

  const capabilityItems = Array.isArray(raw.aiOpsCapabilityItems)
    ? (raw.aiOpsCapabilityItems as { title?: string; body?: string }[]).map((item, i) => ({
        title: pickText(item.title, page.capabilities.items[i]?.title ?? ""),
        body: pickText(item.body, page.capabilities.items[i]?.body ?? ""),
      }))
    : page.capabilities.items;

  const processSteps = Array.isArray(raw.aiOpsProcessSteps)
    ? (raw.aiOpsProcessSteps as { title?: string; body?: string }[]).map((item, i) => ({
        title: pickText(item.title, page.process.steps[i]?.title ?? ""),
        body: pickText(item.body, page.process.steps[i]?.body ?? ""),
      }))
    : page.process.steps;

  const impactItems = Array.isArray(raw.aiOpsImpactItems)
    ? (raw.aiOpsImpactItems as { title?: string; body?: string }[]).map((item, i) => ({
        title: pickText(item.title, page.impactAreas.items[i]?.title ?? ""),
        body: pickText(item.body, page.impactAreas.items[i]?.body ?? ""),
      }))
    : page.impactAreas.items;

  return {
    heroEyebrow: pickText(raw.aiOpsHeroEyebrow as string, page.heroEyebrow),
    heroTitle: pickText(raw.aiOpsHeroTitle as string, page.heroTitle),
    intro: pickText(raw.aiOpsIntro as string, page.intro),
    heroBullets: pickArray(raw.aiOpsHeroBullets as string[], [...page.heroBullets]),
    heroImage: resolveServiceBannerImage("ai-driven-operations-automation", raw.aiOpsHeroImage as CmsImageValue, aiDrivenOperationsImages.hero),
    heroAccentImage: resolveCmsImage(raw.aiOpsHeroAccentImage as CmsImageValue, aiDrivenOperationsImages.heroAccent),
    experience: {
      title: pickText(raw.aiOpsExperienceTitle as string, page.experience.title),
      intro: pickText(raw.aiOpsExperienceIntro as string, page.experience.intro),
      understandLeadIn: pickText(raw.aiOpsUnderstandLeadIn as string, page.experience.understandLeadIn),
      understandBullets: pickArray(raw.aiOpsUnderstandBullets as string[], [...page.experience.understandBullets]),
      expertiseLeadIn: pickText(raw.aiOpsExpertiseLeadIn as string, page.experience.expertiseLeadIn),
      expertiseBullets: pickArray(raw.aiOpsExpertiseBullets as string[], [...page.experience.expertiseBullets]),
      image: resolveCmsImage(raw.aiOpsExperienceImage as CmsImageValue, aiDrivenOperationsImages.experience),
    },
    capabilities: {
      eyebrow: pickText(raw.aiOpsCapabilitiesEyebrow as string, page.capabilities.eyebrow),
      title: pickText(raw.aiOpsCapabilitiesTitle as string, page.capabilities.title),
      intro: pickText(raw.aiOpsCapabilitiesIntro as string, page.capabilities.intro),
      items: pickArray(capabilityItems, capabilityItems),
      image: resolveCmsImage(raw.aiOpsCapabilitiesImage as CmsImageValue, aiDrivenOperationsImages.capabilities),
    },
    process: {
      eyebrow: pickText(raw.aiOpsProcessEyebrow as string, page.process.eyebrow),
      steps: pickArray(processSteps, processSteps),
      image: resolveCmsImage(raw.aiOpsProcessImage as CmsImageValue, aiDrivenOperationsImages.process),
    },
    industries: {
      title: pickText(raw.aiOpsIndustriesTitle as string, page.industries.title),
      intro: pickText(raw.aiOpsIndustriesIntro as string, page.industries.intro),
      bullets: pickArray(raw.aiOpsIndustriesBullets as string[], [...page.industries.bullets]),
      image: resolveCmsImage(raw.aiOpsIndustriesImage as CmsImageValue, aiDrivenOperationsImages.industries),
    },
    trust: {
      title: pickText(raw.aiOpsTrustTitle as string, page.trust.title),
      intro: pickText(raw.aiOpsTrustIntro as string, page.trust.intro),
      bullets: pickArray(raw.aiOpsTrustBullets as string[], [...page.trust.bullets]),
    },
    impactAreas: {
      eyebrow: pickText(raw.aiOpsImpactEyebrow as string, page.impactAreas.eyebrow),
      items: pickArray(impactItems, impactItems),
      image: resolveCmsImage(raw.aiOpsImpactImage as CmsImageValue, aiDrivenOperationsImages.impact),
    },
    future: {
      title: pickText(raw.aiOpsFutureTitle as string, page.future.title),
      intro: pickText(raw.aiOpsFutureIntro as string, page.future.intro),
      leadIn: pickText(raw.aiOpsFutureLeadIn as string, page.future.leadIn),
      bullets: pickArray(raw.aiOpsFutureBullets as string[], [...page.future.bullets]),
      image: resolveCmsImage(raw.aiOpsFutureImage as CmsImageValue, aiDrivenOperationsImages.future),
    },
    cta: {
      title: pickText(raw.aiOpsCtaTitle as string, page.cta.title),
      body: pickText(raw.aiOpsCtaBody as string, page.cta.body),
      closingTitle: pickText(raw.aiOpsCtaClosingTitle as string, page.cta.closingTitle),
      email: pickText(raw.aiOpsCtaEmail as string, page.cta.email),
      website: pickText(raw.aiOpsCtaWebsite as string, page.cta.website),
      tagline: pickText(raw.aiOpsCtaTagline as string, page.cta.tagline),
      subtext: pickText(raw.aiOpsCtaSubtext as string, page.cta.subtext),
    },
  };
}

export function getIntelligentCloudManagementPageContent(service?: CmsService | null) {
  const page = intelligentCloudManagementPage;
  const raw = (service?.intelligentCloudManagement ?? {}) as Raw;

  const resultItems = Array.isArray(raw.cloudResultItems)
    ? (raw.cloudResultItems as { title?: string; body?: string }[]).map((item, i) => ({
        title: pickText(item.title, page.results.items[i]?.title ?? ""),
        body: pickText(item.body, page.results.items[i]?.body ?? ""),
      }))
    : page.results.items;

  const processSteps = Array.isArray(raw.cloudProcessSteps)
    ? (raw.cloudProcessSteps as { title?: string; body?: string }[]).map((item, i) => ({
        title: pickText(item.title, page.process.steps[i]?.title ?? ""),
        body: pickText(item.body, page.process.steps[i]?.body ?? ""),
      }))
    : page.process.steps;

  return {
    opening: pickArray(raw.cloudOpening as string[], [...page.opening]),
    heroImage: resolveServiceBannerImage("intelligent-cloud-management", raw.cloudHeroImage as CmsImageValue, intelligentCloudManagementImages.hero),
    heroAccentImage: resolveCmsImage(
      raw.cloudHeroAccentImage as CmsImageValue,
      intelligentCloudManagementImages.heroAccent
    ),
    chooseUs: {
      eyebrow: pickText(raw.cloudChooseEyebrow as string, page.chooseUs.eyebrow),
      title: pickText(raw.cloudChooseTitle as string, page.chooseUs.title),
      body: pickText(raw.cloudChooseBody as string, page.chooseUs.body),
      bullets: pickArray(raw.cloudChooseBullets as string[], [...page.chooseUs.bullets]),
    },
    infrastructure: {
      title: pickText(raw.cloudInfraTitle as string, page.infrastructure.title),
      intro: pickText(raw.cloudInfraIntro as string, page.infrastructure.intro),
      evaluateLeadIn: pickText(raw.cloudEvaluateLeadIn as string, page.infrastructure.evaluateLeadIn),
      evaluateBullets: pickArray(raw.cloudEvaluateBullets as string[], [...page.infrastructure.evaluateBullets]),
      strategyParagraph: pickText(raw.cloudStrategyParagraph as string, page.infrastructure.strategyParagraph),
      capabilitiesLeadIn: pickText(raw.cloudCapabilitiesLeadIn as string, page.infrastructure.capabilitiesLeadIn),
      capabilitiesBullets: pickArray(raw.cloudCapabilitiesBullets as string[], [...page.infrastructure.capabilitiesBullets]),
      image: resolveCmsImage(raw.cloudInfraImage as CmsImageValue, intelligentCloudManagementImages.infrastructure),
    },
    results: {
      title: pickText(raw.cloudResultsTitle as string, page.results.title),
      items: pickArray(resultItems, resultItems),
      image: resolveCmsImage(raw.cloudResultsImage as CmsImageValue, intelligentCloudManagementImages.results),
    },
    businessFunctions: {
      eyebrow: pickText(raw.cloudFunctionsEyebrow as string, page.businessFunctions.eyebrow),
      title: pickText(raw.cloudFunctionsTitle as string, page.businessFunctions.title),
      intro: pickText(raw.cloudFunctionsIntro as string, page.businessFunctions.intro),
      bullets: pickArray(raw.cloudFunctionsBullets as string[], [...page.businessFunctions.bullets]),
      discoverMore: pickText(raw.cloudDiscoverMore as string, page.businessFunctions.discoverMore),
      image: resolveCmsImage(raw.cloudFunctionsImage as CmsImageValue, intelligentCloudManagementImages.businessFunctions),
    },
    process: {
      eyebrow: pickText(raw.cloudProcessEyebrow as string, page.process.eyebrow),
      steps: pickArray(processSteps, processSteps),
      image: resolveCmsImage(raw.cloudProcessImage as CmsImageValue, intelligentCloudManagementImages.process),
    },
    industries: {
      title: pickText(raw.cloudIndustriesTitle as string, page.industries.title),
      intro: pickText(raw.cloudIndustriesIntro as string, page.industries.intro),
      serveLeadIn: pickText(raw.cloudServeLeadIn as string, page.industries.serveLeadIn),
      bullets: pickArray(raw.cloudIndustriesBullets as string[], [...page.industries.bullets]),
      closing: pickText(raw.cloudIndustriesClosing as string, page.industries.closing),
      image: resolveCmsImage(raw.cloudIndustriesImage as CmsImageValue, intelligentCloudManagementImages.industries),
    },
    partner: {
      title: pickText(raw.cloudPartnerTitle as string, page.partner.title),
      intro: pickText(raw.cloudPartnerIntro as string, page.partner.intro),
      bullets: pickArray(raw.cloudPartnerBullets as string[], [...page.partner.bullets]),
    },
    future: {
      title: pickText(raw.cloudFutureTitle as string, page.future.title),
      intro: pickText(raw.cloudFutureIntro as string, page.future.intro),
      bullets: pickArray(raw.cloudFutureBullets as string[], [...page.future.bullets]),
    },
    cta: {
      title: pickText(raw.cloudCtaTitle as string, page.cta.title),
      body: pickText(raw.cloudCtaBody as string, page.cta.body),
      closingTitle: pickText(raw.cloudCtaClosingTitle as string, page.cta.closingTitle),
      email: pickText(raw.cloudCtaEmail as string, page.cta.email),
      website: pickText(raw.cloudCtaWebsite as string, page.cta.website),
      tagline: pickText(raw.cloudCtaTagline as string, page.cta.tagline),
      subtext: pickText(raw.cloudCtaSubtext as string, page.cta.subtext),
    },
  };
}

export function getItStrategyInnovationPageContent(service?: CmsService | null) {
  const page = itStrategyInnovationConsultingPage;
  const raw = (service?.itStrategyInnovation ?? {}) as Raw;

  const resultItems = Array.isArray(raw.itStrategyResultItems)
    ? (raw.itStrategyResultItems as { title?: string; body?: string }[]).map((item, i) => ({
        title: pickText(item.title, page.results.items[i]?.title ?? ""),
        body: pickText(item.body, page.results.items[i]?.body ?? ""),
      }))
    : page.results.items;

  return {
    opening: pickArray(raw.itStrategyOpening as string[], [...page.opening]),
    heroImage: resolveServiceBannerImage("it-strategy-innovation-consulting", raw.itStrategyHeroImage as CmsImageValue, itStrategyInnovationImages.hero),
    heroAccentImage: resolveCmsImage(
      raw.itStrategyHeroAccentImage as CmsImageValue,
      itStrategyInnovationImages.heroAccent
    ),
    chooseUs: {
      title: pickText(raw.itStrategyChooseTitle as string, page.chooseUs.title),
      body: pickText(raw.itStrategyChooseBody as string, page.chooseUs.body),
      bullets: pickArray(raw.itStrategyChooseBullets as string[], [...page.chooseUs.bullets]),
    },
    infrastructure: {
      title: pickText(raw.itStrategyInfraTitle as string, page.infrastructure.title),
      intro: pickText(raw.itStrategyInfraIntro as string, page.infrastructure.intro),
      evaluateLeadIn: pickText(raw.itStrategyEvaluateLeadIn as string, page.infrastructure.evaluateLeadIn),
      evaluateBullets: pickArray(raw.itStrategyEvaluateBullets as string[], [...page.infrastructure.evaluateBullets]),
      strategyParagraph: pickText(raw.itStrategyStrategyParagraph as string, page.infrastructure.strategyParagraph),
      capabilitiesLeadIn: pickText(raw.itStrategyCapabilitiesLeadIn as string, page.infrastructure.capabilitiesLeadIn),
      capabilitiesBullets: pickArray(raw.itStrategyCapabilitiesBullets as string[], [...page.infrastructure.capabilitiesBullets]),
      image: resolveCmsImage(raw.itStrategyInfraImage as CmsImageValue, itStrategyInnovationImages.infrastructure),
    },
    results: {
      title: pickText(raw.itStrategyResultsTitle as string, page.results.title),
      items: pickArray(resultItems, resultItems),
      image: resolveCmsImage(raw.itStrategyResultsImage as CmsImageValue, itStrategyInnovationImages.results),
    },
    cta: {
      title: pickText(raw.itStrategyCtaTitle as string, page.cta.title),
      body: pickText(raw.itStrategyCtaBody as string, page.cta.body),
      closingTitle: pickText(raw.itStrategyCtaClosingTitle as string, page.cta.closingTitle),
      email: pickText(raw.itStrategyCtaEmail as string, page.cta.email),
      website: pickText(raw.itStrategyCtaWebsite as string, page.cta.website),
      tagline: pickText(raw.itStrategyCtaTagline as string, page.cta.tagline),
      subtext: pickText(raw.itStrategyCtaSubtext as string, page.cta.subtext),
    },
  };
}

export function getPredictivePerformanceMarketingPageContent(service?: CmsService | null) {
  const page = predictivePerformanceMarketingPage;
  const raw = (service?.predictivePerformanceMarketing ?? {}) as Raw;

  const capabilityItems = Array.isArray(raw.ppmCapabilityItems)
    ? (raw.ppmCapabilityItems as { title?: string; body?: string }[]).map((item, i) => ({
        title: pickText(item.title, page.capabilities.items[i]?.title ?? ""),
        body: pickText(item.body, page.capabilities.items[i]?.body ?? ""),
      }))
    : page.capabilities.items;

  const processSteps = Array.isArray(raw.ppmProcessSteps)
    ? (raw.ppmProcessSteps as { title?: string; body?: string }[]).map((item, i) => ({
        title: pickText(item.title, page.process.steps[i]?.title ?? ""),
        body: pickText(item.body, page.process.steps[i]?.body ?? ""),
      }))
    : page.process.steps;

  return {
    hero: {
      eyebrow: pickText(raw.ppmHeroEyebrow as string, page.hero.eyebrow),
      intro: pickText(raw.ppmHeroIntro as string, page.hero.intro),
      bullets: pickArray(raw.ppmHeroBullets as string[], [...page.hero.bullets]),
      result: pickText(raw.ppmHeroResult as string, page.hero.result),
      image: resolveServiceBannerImage(
        "predictive-performance-marketing",
        raw.ppmHeroImage as CmsImageValue,
        predictivePerformanceMarketingImages.hero
      ),
      accentImage: resolveCmsImage(raw.ppmHeroAccentImage as CmsImageValue, predictivePerformanceMarketingImages.heroAccent),
    },
    whyChooseUs: {
      eyebrow: pickText(raw.ppmWhyEyebrow as string, page.whyChooseUs.eyebrow),
      title: pickText(raw.ppmWhyTitle as string, page.whyChooseUs.title),
      body: pickText(raw.ppmWhyBody as string, page.whyChooseUs.body),
      leadIn: pickText(raw.ppmWhyLeadIn as string, page.whyChooseUs.leadIn),
      bullets: pickArray(raw.ppmWhyBullets as string[], [...page.whyChooseUs.bullets]),
      result: pickText(raw.ppmWhyResult as string, page.whyChooseUs.result),
      image: resolveCmsImage(raw.ppmWhyImage as CmsImageValue, predictivePerformanceMarketingImages.whyChooseUs),
    },
    overview: {
      title: pickText(raw.ppmOverviewTitle as string, page.overview.title),
      paragraphs: pickArray(raw.ppmOverviewParagraphs as string[], [...page.overview.paragraphs]),
      image: resolveCmsImage(raw.ppmOverviewImage as CmsImageValue, predictivePerformanceMarketingImages.overview),
    },
    conversions: {
      eyebrow: pickText(raw.ppmConversionsEyebrow as string, page.conversions.eyebrow),
      intro: pickText(raw.ppmConversionsIntro as string, page.conversions.intro),
      leadIn: pickText(raw.ppmConversionsLeadIn as string, page.conversions.leadIn),
      bullets: pickArray(raw.ppmConversionsBullets as string[], [...page.conversions.bullets]),
      result: pickText(raw.ppmConversionsResult as string, page.conversions.result),
      image: resolveCmsImage(raw.ppmConversionsImage as CmsImageValue, predictivePerformanceMarketingImages.conversions),
    },
    dataExecution: {
      title: pickText(raw.ppmDataTitle as string, page.dataExecution.title),
      intro: pickText(raw.ppmDataIntro as string, page.dataExecution.intro),
      leadIn: pickText(raw.ppmDataLeadIn as string, page.dataExecution.leadIn),
      bullets: pickArray(raw.ppmDataBullets as string[], [...page.dataExecution.bullets]),
      result: pickText(raw.ppmDataResult as string, page.dataExecution.result),
      image: resolveCmsImage(raw.ppmDataImage as CmsImageValue, predictivePerformanceMarketingImages.dataExecution),
    },
    capabilities: {
      eyebrow: pickText(raw.ppmCapabilitiesEyebrow as string, page.capabilities.eyebrow),
      items: pickArray(capabilityItems, capabilityItems),
      image: resolveCmsImage(raw.ppmCapabilitiesImage as CmsImageValue, predictivePerformanceMarketingImages.capabilities),
    },
    process: {
      eyebrow: pickText(raw.ppmProcessEyebrow as string, page.process.eyebrow),
      title: pickText(raw.ppmProcessTitle as string, page.process.title),
      intro: pickText(raw.ppmProcessIntro as string, page.process.intro),
      steps: pickArray(processSteps, processSteps),
      image: resolveCmsImage(raw.ppmProcessImage as CmsImageValue, predictivePerformanceMarketingImages.process),
    },
    idealFor: {
      title: pickText(raw.ppmIdealTitle as string, page.idealFor.title),
      intro: pickText(raw.ppmIdealIntro as string, page.idealFor.intro),
      bullets: pickArray(raw.ppmIdealBullets as string[], [...page.idealFor.bullets]),
      image: resolveCmsImage(raw.ppmIdealImage as CmsImageValue, predictivePerformanceMarketingImages.idealFor),
    },
    growthEngine: {
      title: pickText(raw.ppmGrowthTitle as string, page.growthEngine.title),
      intro: pickText(raw.ppmGrowthIntro as string, page.growthEngine.intro),
      bullets: pickArray(raw.ppmGrowthBullets as string[], [...page.growthEngine.bullets]),
    },
    impact: {
      title: pickText(raw.ppmImpactTitle as string, page.impact.title),
      intro: pickText(raw.ppmImpactIntro as string, page.impact.intro),
      bullets: pickArray(raw.ppmImpactBullets as string[], [...page.impact.bullets]),
      image: resolveCmsImage(raw.ppmImpactImage as CmsImageValue, predictivePerformanceMarketingImages.impact),
    },
    trust: {
      title: pickText(raw.ppmTrustTitle as string, page.trust.title),
      intro: pickText(raw.ppmTrustIntro as string, page.trust.intro),
      bullets: pickArray(raw.ppmTrustBullets as string[], [...page.trust.bullets]),
    },
    cta: {
      title: pickText(raw.ppmCtaTitle as string, page.cta.title),
      body: pickText(raw.ppmCtaBody as string, page.cta.body),
      closingTitle: pickText(raw.ppmCtaClosingTitle as string, page.cta.closingTitle),
      email: pickText(raw.ppmCtaEmail as string, page.cta.email),
      website: pickText(raw.ppmCtaWebsite as string, page.cta.website),
      tagline: pickText(raw.ppmCtaTagline as string, page.cta.tagline),
      subtext: pickText(raw.ppmCtaSubtext as string, page.cta.subtext),
    },
  };
}
