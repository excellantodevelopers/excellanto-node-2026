import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { getService, getServices, getSiteSettings } from "@/lib/cms/content";
import { PageHero } from "@/components/ui/page-hero";
import { SectionImage } from "@/components/ui/section-image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CTA } from "@/components/sections/cta";
import { FadeIn } from "@/components/animations/fade-in";
import { ItStrategyInnovationConsultingServicePage } from "@/components/sections/it-strategy-innovation-consulting-service-page";
import { PredictivePerformanceMarketingServicePage } from "@/components/sections/predictive-performance-marketing-service-page";
import { IntelligentCloudManagementServicePage } from "@/components/sections/intelligent-cloud-management-service-page";
import { AiDrivenOperationsAutomationServicePage } from "@/components/sections/ai-driven-operations-automation-service-page";
import { MobileAppServicePage } from "@/components/sections/mobile-app-service-page";
import { SeoCognitionServicePage } from "@/components/sections/seo-cognition-service-page";
import { SocialMediaIntelligenceServicePage } from "@/components/sections/social-media-intelligence-service-page";
import { StaffingRecruitmentServicePage } from "@/components/sections/staffing-recruitment-service-page";
import { WebsiteDevServicePage } from "@/components/sections/website-dev-service-page";
import { getCmsIcon } from "@/lib/cms/icons";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ServicePageSchemas } from "@/components/seo/page-schemas";
import type { CmsService } from "@/lib/cms/types";
import type { ReactNode } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getService(slug), getSiteSettings()]);
  if (!service) return { title: settings.serviceEyebrow };
  return buildPageMetadata({
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.description,
    path: `/services/${service.slug}`,
    image: service.image,
  });
}

function ServicePageShell({ service, children }: { service: CmsService; children: ReactNode }) {
  return (
    <>
      <ServicePageSchemas service={service} />
      {children}
    </>
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  if (slug === "mobile-app-development") {
    return (
      <ServicePageShell service={service}>
        <MobileAppServicePage />
      </ServicePageShell>
    );
  }

  if (slug === "website-development") {
    return (
      <ServicePageShell service={service}>
        <WebsiteDevServicePage />
      </ServicePageShell>
    );
  }

  if (slug === "social-media-intelligence") {
    return (
      <ServicePageShell service={service}>
        <SocialMediaIntelligenceServicePage />
      </ServicePageShell>
    );
  }

  if (slug === "seo-cognition") {
    return (
      <ServicePageShell service={service}>
        <SeoCognitionServicePage />
      </ServicePageShell>
    );
  }

  if (slug === "staffing-recruitment-service") {
    return (
      <ServicePageShell service={service}>
        <StaffingRecruitmentServicePage />
      </ServicePageShell>
    );
  }

  if (slug === "ai-driven-operations-automation") {
    return (
      <ServicePageShell service={service}>
        <AiDrivenOperationsAutomationServicePage />
      </ServicePageShell>
    );
  }

  if (slug === "intelligent-cloud-management") {
    return (
      <ServicePageShell service={service}>
        <IntelligentCloudManagementServicePage />
      </ServicePageShell>
    );
  }

  if (slug === "it-strategy-innovation-consulting") {
    return (
      <ServicePageShell service={service}>
        <ItStrategyInnovationConsultingServicePage />
      </ServicePageShell>
    );
  }

  if (slug === "predictive-performance-marketing") {
    return (
      <ServicePageShell service={service}>
        <PredictivePerformanceMarketingServicePage />
      </ServicePageShell>
    );
  }

  const Icon = getCmsIcon(service.iconName);

  return (
    <ServicePageShell service={service}>
      <PageHero
        variant="banner"
        eyebrow={service.bannerEyebrow}
        title={service.title}
        description={service.description}
        image={service.image}
      />

      <section className="section-padding bg-white">
        <div className="container-xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <FadeIn direction="left">
            <Link
              href="/services"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              {service.backLabel}
            </Link>
            <SectionImage
              {...service.image}
              className="mb-8 aspect-[16/10] w-full"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div className="mb-6 flex h-11 w-11 items-center justify-center border border-border bg-surface text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-secondary md:text-3xl">
              {service.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              {service.detailIntro ?? service.description}
            </p>
            <ul className="mt-8 space-y-3.5">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm font-medium text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <MagneticButton href={service.pageCta.href} strength={0.15}>
                {service.pageCta.label}
              </MagneticButton>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="border border-border bg-surface p-6 md:p-7">
              <h3 className="font-display text-lg font-bold tracking-tight text-secondary">
                {service.sidebarTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{service.sidebarBody}</p>
              <div className="mt-6">
                <MagneticButton href={service.sidebarCta.href} strength={0.12}>
                  {service.sidebarCta.label}
                </MagneticButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTA />
    </ServicePageShell>
  );
}
