"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  DollarSign,
  LineChart,
  Mail,
  Share2,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/fade-in";
import { SectionImage } from "@/components/ui/section-image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { getPredictivePerformanceMarketingPageContent } from "@/lib/cms/service-pages";
import { useCms } from "@/lib/cms/provider";
import { cn } from "@/lib/utils";

const hqImage = { unoptimized: true, quality: 92 } as const;
const capabilityIcons = [BarChart3, Users, Zap, DollarSign, Share2, LineChart];

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.18em] md:text-[0.8125rem]",
        light ? "text-sky-300" : "text-primary"
      )}
    >
      {children}
    </p>
  );
}

function DisplayTitle({
  children,
  as: Tag = "h2",
  light = false,
  size = "lg",
  className,
}: {
  children: string;
  as?: "h1" | "h2" | "h3";
  light?: boolean;
  size?: "xl" | "lg" | "md" | "sm";
  className?: string;
}) {
  const sizes = {
    xl: "text-[2rem] sm:text-4xl md:text-[2.75rem] lg:text-5xl leading-[1.1]",
    lg: "text-[1.75rem] sm:text-3xl md:text-[2.35rem] lg:text-[2.65rem] leading-[1.12]",
    md: "text-xl sm:text-2xl md:text-[1.75rem] lg:text-[2rem] leading-[1.2]",
    sm: "text-lg sm:text-xl md:text-[1.375rem] leading-snug",
  };

  return (
    <Tag
      className={cn(
        "font-display font-bold tracking-[-0.035em] text-balance",
        sizes[size],
        light ? "text-white" : "text-secondary",
        className
      )}
    >
      {children}
    </Tag>
  );
}

function BodyText({
  children,
  light = false,
  large = false,
  className,
}: {
  children: string;
  light?: boolean;
  large?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "leading-[1.75]",
        large
          ? "text-base md:text-lg md:leading-8"
          : "text-[0.975rem] md:text-base md:leading-7",
        light ? "text-slate-300" : "text-muted",
        className
      )}
    >
      {children}
    </p>
  );
}

function BulletList({
  items,
  light = false,
  columns = false,
  hero = false,
}: {
  items: string[];
  light?: boolean;
  columns?: boolean;
  hero?: boolean;
}) {
  return (
    <ul className={cn("space-y-3.5 md:space-y-4", columns && "sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-4 sm:space-y-0")}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3.5">
          <span
            className={cn(
              "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
              light ? "bg-sky-400/15 text-sky-400" : "bg-primary/10 text-primary"
            )}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
          </span>
          <span
            className={cn(
              hero
                ? "text-[0.975rem] leading-7 sm:text-base sm:leading-8 md:text-[1.0625rem] md:leading-8"
                : "text-[0.975rem] leading-7 md:text-base md:leading-8",
              light ? "text-slate-200" : "text-secondary/85"
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ResultLine({
  children,
  light = false,
  className,
}: {
  children: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-8 border-l-4 pl-5 text-base font-medium leading-7 md:text-[1.0625rem] md:leading-8",
        light ? "border-sky-400 text-slate-100" : "border-primary text-secondary",
        className
      )}
    >
      {children}
    </p>
  );
}

function AccentBar({ className }: { className?: string }) {
  return <div className={cn("ui-accent-bar", className)} />;
}

function SectionShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn("section-padding relative", className)}>{children}</section>;
}

export function PredictivePerformanceMarketingServicePage() {
  const { services, settings } = useCms();
  const service = services.find((item) => item.slug === "predictive-performance-marketing");
  const page = getPredictivePerformanceMarketingPageContent(service);

  return (
    <>
      {/* Editorial hero — centered copy, panoramic image band */}
      <section className="relative overflow-hidden bg-[#040712] pt-20 md:pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgb(8_145_178_/_0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-grid opacity-[0.035]" />

        <div className="container-xl relative z-10 pb-10 md:pb-14">
          <FadeIn>
            <Link
              href="/services"
              className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {service?.backLabel || settings.backToServices}
            </Link>
          </FadeIn>

          <div className="mx-auto max-w-5xl text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-[#0b1220]/70 px-4 py-2 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-sky-300" />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-100/95 sm:text-[0.8125rem]">
                  {page.hero.eyebrow}
                </span>
              </div>

              <h1 className="font-display mx-auto mt-8 max-w-4xl text-[1.625rem] font-bold leading-[1.26] tracking-[-0.03em] text-white sm:text-[1.875rem] sm:leading-[1.28] md:mt-10 md:text-[2.125rem] md:leading-[1.3] lg:text-[2.5rem] lg:leading-[1.28] xl:text-[2.75rem] xl:leading-[1.26]">
                {page.hero.intro}
              </h1>

              <ResultLine
                light
                className="mx-auto mt-8 max-w-3xl border-sky-400/80 text-left text-[0.975rem] leading-7 sm:text-base sm:leading-8 md:mt-10 md:text-center md:border-l-0 md:border-t-4 md:pl-0 md:pt-6 md:text-[1.0625rem] md:leading-8 lg:text-lg lg:leading-8"
              >
                {page.hero.result}
              </ResultLine>

              <div className="mt-10">
                <MagneticButton href="/contact" variant="hero-primary" strength={0.1}>
                  Contact us
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.08} className="mt-12 md:mt-16">
            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-8 lg:rounded-3xl">
                <BulletList items={page.hero.bullets} light columns hero />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <div className="overflow-hidden rounded-2xl border border-white/15 lg:rounded-3xl">
                  <SectionImage
                    {...page.hero.image}
                    {...hqImage}
                    className="aspect-[16/11] w-full sm:aspect-[4/3] lg:aspect-[16/10] lg:h-full lg:min-h-[220px]"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    imgClassName="h-full object-cover object-right transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/15 lg:rounded-3xl">
                  <SectionImage
                    {...page.hero.accentImage}
                    {...hqImage}
                    className="aspect-[16/11] w-full sm:aspect-[4/3] lg:aspect-[16/10]"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    imgClassName="transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="pointer-events-none h-16 bg-gradient-to-t from-white to-transparent md:h-20" />
      </section>

      {/* Overview — centered editorial spotlight */}
      <SectionShell className="bg-white !pt-12 md:!pt-16">
        <div className="container-xl">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface via-white to-surface px-6 py-10 md:px-12 md:py-14 lg:px-16">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
                <div>
                  <AccentBar className="mb-6" />
                  <DisplayTitle as="h2" size="lg">
                    {page.overview.title}
                  </DisplayTitle>
                </div>
                <div className="space-y-5">
                  {page.overview.paragraphs.map((paragraph, index) => (
                    <BodyText key={paragraph} large={index === 0}>
                      {paragraph}
                    </BodyText>
                  ))}
                </div>
              </div>
              <div className="mt-10 overflow-hidden rounded-2xl shadow-float">
                <SectionImage
                  {...page.overview.image}
                  {...hqImage}
                  className="aspect-[21/9] w-full"
                  sizes="1200px"
                  imgClassName="transition-transform duration-700 hover:scale-[1.015]"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionShell>

      {/* Why choose us — offset split with sticky visual */}
      <SectionShell className="bg-surface">
        <div className="container-xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <FadeIn direction="left" className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-3xl shadow-float">
                <SectionImage
                  {...page.whyChooseUs.image}
                  {...hqImage}
                  className="aspect-[4/5] w-full"
                  sizes="420px"
                  imgClassName="transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </FadeIn>

            <FadeIn direction="right" className="lg:col-span-7 lg:pt-6">
              <Eyebrow>{page.whyChooseUs.eyebrow}</Eyebrow>
              <DisplayTitle size="lg" className="mt-4">
                {page.whyChooseUs.title}
              </DisplayTitle>
              <BodyText large className="mt-6">
                {page.whyChooseUs.body}
              </BodyText>

              <div className="mt-10 rounded-2xl border border-border bg-white p-6 md:p-8">
                <DisplayTitle as="h3" size="sm" className="!text-secondary">
                  {page.whyChooseUs.leadIn}
                </DisplayTitle>
                <div className="mt-5">
                  <BulletList items={page.whyChooseUs.bullets} />
                </div>
                <ResultLine>{page.whyChooseUs.result}</ResultLine>
              </div>
            </FadeIn>
          </div>
        </div>
      </SectionShell>

      {/* Conversions — zigzag full-bleed row */}
      <SectionShell className="bg-white">
        <div className="container-xl space-y-20 md:space-y-28">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeIn direction="left" className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-3xl shadow-float">
                <SectionImage
                  {...page.conversions.image}
                  {...hqImage}
                  className="aspect-[5/4] w-full"
                  sizes="560px"
                  imgClassName="transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </FadeIn>
            <FadeIn direction="right" className="order-1 lg:order-2">
              <AccentBar className="mb-6" />
              <DisplayTitle size="md">{page.conversions.eyebrow}</DisplayTitle>
              <BodyText large className="mt-5">
                {page.conversions.intro}
              </BodyText>
              <DisplayTitle as="h3" size="sm" className="mt-8 !text-secondary">
                {page.conversions.leadIn}
              </DisplayTitle>
              <div className="mt-5">
                <BulletList items={page.conversions.bullets} />
              </div>
              <ResultLine>{page.conversions.result}</ResultLine>
            </FadeIn>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeIn direction="left">
              <AccentBar className="mb-6" />
              <DisplayTitle size="md">{page.dataExecution.title}</DisplayTitle>
              <BodyText large className="mt-5">
                {page.dataExecution.intro}
              </BodyText>
              <DisplayTitle as="h3" size="sm" className="mt-8 !text-secondary">
                {page.dataExecution.leadIn}
              </DisplayTitle>
              <div className="mt-5">
                <BulletList items={page.dataExecution.bullets} />
              </div>
              <ResultLine>{page.dataExecution.result}</ResultLine>
            </FadeIn>
            <FadeIn direction="right">
              <div className="overflow-hidden rounded-3xl shadow-float">
                <SectionImage
                  {...page.dataExecution.image}
                  {...hqImage}
                  className="aspect-[5/4] w-full"
                  sizes="560px"
                  imgClassName="transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </SectionShell>

      {/* Capabilities — banner + 3-column masonry-style grid */}
      <SectionShell className="overflow-hidden bg-secondary text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_0%_100%,rgb(8_145_178_/_0.18),transparent_60%)]" />
        <div className="container-xl relative">
          <FadeIn>
            <div className="max-w-3xl">
              <Eyebrow light>{page.capabilities.eyebrow}</Eyebrow>
              <DisplayTitle light size="lg" className="mt-4">
                {page.capabilities.eyebrow}
              </DisplayTitle>
            </div>
          </FadeIn>

          <FadeIn delay={0.06} className="mt-10 overflow-hidden rounded-3xl border border-white/10">
            <SectionImage
              {...page.capabilities.image}
              {...hqImage}
              className="aspect-[21/8] w-full"
              sizes="1200px"
              imgClassName="transition-transform duration-700 hover:scale-[1.02]"
            />
          </FadeIn>

          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {page.capabilities.items.map((item, index) => {
              const Icon = capabilityIcons[index] ?? TrendingUp;
              return (
                <StaggerItem key={item.title}>
                  <motion.article
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.22 }}
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition-colors hover:border-sky-400/35 hover:bg-white/[0.08] md:p-7"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-300 transition-colors group-hover:bg-sky-400 group-hover:text-secondary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white md:text-xl">{item.title}</h3>
                    <p className="mt-3 text-[0.975rem] leading-7 text-white/75 md:text-base md:leading-8">
                      {item.body}
                    </p>
                  </motion.article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </SectionShell>

      {/* Process — horizontal step cards (all visible) */}
      <SectionShell className="bg-surface">
        <div className="container-xl">
          <FadeIn>
            <Eyebrow>{page.process.eyebrow}</Eyebrow>
            <DisplayTitle size="lg" className="mt-4 max-w-3xl">
              {page.process.title}
            </DisplayTitle>
            <BodyText large className="mt-5 max-w-2xl">
              {page.process.intro}
            </BodyText>
          </FadeIn>

          <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <FadeIn direction="left" className="lg:col-span-7">
              <div className="flex flex-col gap-4">
                {page.process.steps.map((step, index) => (
                  <article
                    key={step.title}
                    className="group flex gap-5 rounded-2xl border border-border bg-white p-5 transition-shadow hover:shadow-soft md:gap-6 md:p-6"
                  >
                    <span className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="font-display text-base font-bold text-secondary md:text-lg">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[0.975rem] leading-7 text-muted md:text-base md:leading-8">
                        {step.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="right" className="lg:col-span-5">
              <div className="sticky top-28 overflow-hidden rounded-3xl shadow-float">
                <SectionImage
                  {...page.process.image}
                  {...hqImage}
                  className="aspect-[3/4] w-full lg:aspect-[4/5]"
                  sizes="440px"
                  imgClassName="transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </SectionShell>

      {/* Ideal for + Growth — bento grid */}
      <SectionShell className="bg-white">
        <div className="container-xl">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <FadeIn direction="left">
              <article className="flex h-full flex-col rounded-3xl border border-border bg-surface/80 p-7 md:p-9">
                <AccentBar className="mb-6" />
                <DisplayTitle size="md">{page.idealFor.title}</DisplayTitle>
                <BodyText large className="mt-4">
                  {page.idealFor.intro}
                </BodyText>
                <div className="mt-7 flex-1">
                  <BulletList items={page.idealFor.bullets} />
                </div>
              </article>
            </FadeIn>

            <FadeIn direction="right">
              <article className="flex h-full flex-col rounded-3xl border border-primary/15 bg-primary/[0.04] p-7 md:p-9">
                <AccentBar className="mb-6" />
                <DisplayTitle size="md">{page.growthEngine.title}</DisplayTitle>
                <BodyText large className="mt-4">
                  {page.growthEngine.intro}
                </BodyText>
                <div className="mt-7 flex-1">
                  <BulletList items={page.growthEngine.bullets} />
                </div>
              </article>
            </FadeIn>
          </div>

          <FadeIn delay={0.08} className="mt-8">
            <div className="overflow-hidden rounded-3xl shadow-soft">
              <SectionImage
                {...page.idealFor.image}
                {...hqImage}
                className="aspect-[21/9] w-full"
                sizes="1200px"
                imgClassName="transition-transform duration-700 hover:scale-[1.015]"
              />
            </div>
          </FadeIn>
        </div>
      </SectionShell>

      {/* Impact + Trust — stacked feature bands */}
      <SectionShell className="bg-surface">
        <div className="container-xl space-y-8">
          <FadeIn>
            <article className="grid gap-8 rounded-3xl border border-border bg-white p-7 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-12 md:p-10 lg:p-12">
              <div>
                <AccentBar className="mb-6" />
                <DisplayTitle size="md">{page.impact.title}</DisplayTitle>
                <BodyText large className="mt-4">
                  {page.impact.intro}
                </BodyText>
              </div>
              <BulletList items={page.impact.bullets} />
            </article>
          </FadeIn>

          <FadeIn delay={0.06}>
            <article className="grid gap-8 rounded-3xl border border-border bg-white p-7 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-12 md:p-10 lg:p-12">
              <BulletList items={page.trust.bullets} />
              <div>
                <AccentBar className="mb-6 md:ml-auto" />
                <DisplayTitle size="md" className="md:text-right">
                  {page.trust.title}
                </DisplayTitle>
                <BodyText large className="mt-4 md:text-right">
                  {page.trust.intro}
                </BodyText>
              </div>
            </article>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="overflow-hidden rounded-3xl shadow-float">
              <SectionImage
                {...page.impact.image}
                {...hqImage}
                className="aspect-[21/9] w-full"
                sizes="1200px"
                imgClassName="transition-transform duration-700 hover:scale-[1.015]"
              />
            </div>
          </FadeIn>
        </div>
      </SectionShell>

      {/* CTA — split editorial layout */}
      <section className="relative overflow-hidden bg-primary">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_100%_50%,rgb(255_255_255_/_0.1),transparent_55%)]" />
        <div className="container-xl relative py-16 md:py-24">
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <DisplayTitle light size="lg">
                  {page.cta.title}
                </DisplayTitle>
                <BodyText light large className="mt-6">
                  {page.cta.body}
                </BodyText>
                <DisplayTitle light as="h3" size="sm" className="mt-8">
                  {page.cta.closingTitle}
                </DisplayTitle>
              </div>

              <div className="rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur-sm md:p-9">
                <div className="space-y-4">
                  <a
                    href={`mailto:${page.cta.email}`}
                    className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-white transition-colors hover:bg-white/15"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                      <Mail className="h-5 w-5" />
                    </span>
                    <span className="text-base font-medium md:text-lg">{page.cta.email}</span>
                  </a>
                  <a
                    href={page.cta.website}
                    className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-white transition-colors hover:bg-white/15"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                    <span className="text-base font-medium md:text-lg">{page.cta.website}</span>
                  </a>
                </div>
                <p className="font-display mt-8 text-lg font-bold text-white md:text-xl">{page.cta.tagline}</p>
                <p className="mt-3 text-[0.975rem] leading-7 text-white/80 md:text-base md:leading-8">
                  {page.cta.subtext}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
