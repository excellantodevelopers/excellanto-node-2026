"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  LineChart,
  Radar,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/fade-in";
import { SectionImage } from "@/components/ui/section-image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CTA } from "@/components/sections/cta";
import { getSocialMediaPageContent } from "@/lib/cms/service-pages";
import { useCms } from "@/lib/cms/provider";
import { cn } from "@/lib/utils";

const hqImage = { unoptimized: true, quality: 92 } as const;

const capabilityIcons = [BarChart3, Users, Radar, Target];
const featureIcons = [LineChart, Zap, TrendingUp];
const featureTabLabels = ["Content Strategy", "Real-time Intel", "Competitive Edge"];
const impactIcons = ["Marketing", "Sales", "CX", "Brand", "Strategy"];

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.16em]",
        light ? "text-accent" : "text-primary"
      )}
    >
      {children}
    </p>
  );
}

export function SocialMediaIntelligenceServicePage() {
  const { services, settings } = useCms();
  const service = services.find((item) => item.slug === "social-media-intelligence");
  const page = getSocialMediaPageContent(service);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const activeFeatureImage = page.featureSections[activeFeature]?.image ?? page.heroImage;
  const activeStepData = page.process.steps[activeStep];

  return (
    <>
      {/* Custom split hero — not a generic page banner clone */}
      <section className="relative min-h-[88vh] overflow-hidden bg-[#040712] pt-20 md:min-h-[92vh] md:pt-24">
        <div className="absolute inset-0">
          <Image
            src={page.heroImage.src}
            alt={page.heroImage.alt}
            fill
            priority
            unoptimized
            className="object-cover object-[70%_center] opacity-55 md:object-right"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040712]/95 via-[#040712]/78 to-[#040712]/45" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_50%,rgb(29_78_216_/_0.18),transparent_60%)]" />
        </div>

        <div className="container-xl relative z-10 grid min-h-[calc(88vh-5rem)] items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <FadeIn direction="left">
            <Link
              href="/services"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {service?.backLabel || settings.backToServices}
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/10 px-3.5 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-100">
                Intelligence Platform
              </span>
            </div>
            <h1 className="font-display mt-6 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[3.35rem]">
              {page.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">{page.intro[0]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton
                href="/contact"
                strength={0.12}
                className="!rounded-full !border-0 !bg-gradient-to-b !from-[#dbeafe] !to-[#7dd3fc] !px-6 !text-slate-900 !shadow-[0_0_32px_rgba(56,189,248,0.35)]"
              >
                Let&apos;s Talk
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-[0_32px_64px_-24px_rgb(0_0_0_/_0.55)]">
                <SectionImage
                  {...page.chooseUs.image}
                  {...hqImage}
                  className="aspect-[4/3] w-full"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#040712] via-[#040712]/80 to-transparent p-6 pt-16">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                    Live signal layer
                  </p>
                  <p className="mt-2 font-display text-lg font-bold text-white">
                    Actionable social intelligence
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-white/10 bg-[#0b1220]/90 p-4 backdrop-blur-md md:block">
                <p className="text-2xl font-bold text-white">AI</p>
                <p className="text-[11px] text-slate-400">Predictive insights</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Overview + capability bento */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>Overview</Eyebrow>
              <p className="mt-4 text-lg leading-8 text-muted">{page.intro[1]}</p>
            </div>
          </FadeIn>

          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.chooseUs.bullets.map((item, index) => {
              const Icon = capabilityIcons[index] ?? BarChart3;
              return (
                <StaggerItem key={item}>
                  <motion.article
                    className="group h-full rounded-2xl border border-border bg-surface/60 p-6 transition-colors hover:border-primary/30 hover:bg-white hover:shadow-[0_20px_40px_-28px_rgb(15_23_42_/_0.15)]"
                    whileHover={{ y: -4 }}
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-5 text-sm font-semibold leading-7 text-secondary">{item}</p>
                  </motion.article>
                </StaggerItem>
              );
            })}
          </Stagger>

          <FadeIn delay={0.08}>
            <div className="mt-10 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] via-white to-accent/[0.05] px-6 py-5 md:px-8">
              <p className="text-sm font-medium leading-7 text-secondary md:text-base">
                {page.chooseUs.result}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Audience — cards + dedicated image */}
      <section className="section-padding bg-surface">
        <div className="container-xl grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="left">
            <Eyebrow>Audience Intelligence</Eyebrow>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
              Know who engages, why they convert, and what to publish next
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">{page.audience.body}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {page.audience.leadIn}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {page.audience.bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="rounded-xl border border-border bg-white px-4 py-3.5 text-sm font-medium leading-6 text-secondary shadow-sm"
                >
                  {bullet}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-muted">{page.audience.result}</p>
          </FadeIn>
          <FadeIn direction="right">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-[0_24px_48px_-28px_rgb(15_23_42_/_0.18)]">
              <SectionImage
                {...page.audience.image}
                {...hqImage}
                className="aspect-[5/4] w-full rounded-xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Interactive capability tabs — each with its own image */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <FadeIn>
            <div className="max-w-2xl">
              <Eyebrow>Core Capabilities</Eyebrow>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
                Intelligence modules built for modern social teams
              </h2>
            </div>
          </FadeIn>

          <div className="mt-10 flex flex-wrap gap-2">
            {page.featureSections.map((section, index) => {
              const Icon = featureIcons[index] ?? LineChart;
              const active = activeFeature === index;
              return (
                <button
                  key={section.title}
                  type="button"
                  onClick={() => setActiveFeature(index)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                    active
                      ? "border-primary bg-primary text-white shadow-[0_8px_24px_-12px_rgb(29_78_216_/_0.55)]"
                      : "border-border bg-surface text-secondary hover:border-primary/30 hover:bg-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {featureTabLabels[index] ?? `Module ${index + 1}`}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-center"
              >
                <h3 className="font-display text-2xl font-bold tracking-tight text-secondary md:text-3xl">
                  {page.featureSections[activeFeature]?.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-muted">
                  {page.featureSections[activeFeature]?.intro}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {page.featureSections[activeFeature]?.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 rounded-lg border border-border/80 bg-surface/50 px-4 py-3 text-sm leading-6 text-secondary"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-xl border-l-4 border-accent bg-accent/5 px-4 py-3 text-sm font-medium leading-7 text-secondary">
                  {page.featureSections[activeFeature]?.result}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-border lg:min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0"
                >
                  <SectionImage
                    {...activeFeatureImage}
                    {...hqImage}
                    className="h-full w-full"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/75 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                      Module 0{activeFeature + 1}
                    </p>
                    <p className="font-display mt-1 text-lg font-bold text-white line-clamp-2">
                      {page.featureSections[activeFeature]?.title}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="section-padding bg-secondary text-white">
        <div className="container-xl">
          <FadeIn>
            <Eyebrow light>{page.process.eyebrow}</Eyebrow>
            <h2 className="font-display mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
              {page.process.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">{page.process.intro}</p>
          </FadeIn>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-2">
              {page.process.steps.map((step, index) => {
                const active = activeStep === index;
                return (
                  <motion.button
                    key={step.step}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className={cn(
                      "flex w-full items-start gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-200",
                      active
                        ? "border-accent/50 bg-white/[0.08] shadow-[0_12px_32px_-16px_rgb(0_0_0_/_0.4)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                    )}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span
                      className={cn(
                        "font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                        active ? "bg-accent text-white" : "bg-primary text-white"
                      )}
                    >
                      {step.step}
                    </span>
                    <span className="min-w-0 pt-1">
                      <span className="font-display block text-base font-bold tracking-tight">
                        {step.title}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-sm leading-6",
                          active ? "text-slate-200" : "text-slate-400"
                        )}
                      >
                        {step.body}
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <FadeIn direction="right" className="sticky top-24">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <SectionImage
                  {...page.process.image}
                  {...hqImage}
                  className="aspect-[4/5] w-full"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="border-t border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                    Step {activeStepData?.step}
                  </p>
                  <p className="font-display mt-1 text-lg font-bold">{activeStepData?.title}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Business impact grid */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <FadeIn direction="left">
              <div className="overflow-hidden rounded-2xl border border-border shadow-[0_24px_48px_-28px_rgb(15_23_42_/_0.15)]">
                <SectionImage
                  {...page.impact.image}
                  {...hqImage}
                  className="aspect-[4/5] w-full"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <Eyebrow>Business Impact</Eyebrow>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
                {page.impact.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-muted">{page.impact.intro}</p>
              <div className="mt-8 space-y-3">
                {page.impact.bullets.map((bullet, index) => (
                  <div
                    key={bullet}
                    className="flex items-center gap-4 rounded-xl border border-border bg-surface/50 px-4 py-3.5 transition-colors hover:border-primary/25 hover:bg-white"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-[10px] font-bold text-primary">
                      {impactIcons[index]?.slice(0, 2) ?? "•"}
                    </span>
                    <span className="text-sm font-medium leading-6 text-secondary">{bullet}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-muted">{page.impact.result}</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Ideal for + CTA */}
      <section className="section-padding bg-surface">
        <div className="container-xl grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn direction="left">
            <Eyebrow>{page.idealFor.eyebrow}</Eyebrow>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
              {page.idealFor.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">{page.idealFor.intro}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {page.idealFor.bullets.map((bullet) => (
                <span
                  key={bullet}
                  className="rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold leading-5 text-secondary shadow-sm"
                >
                  {bullet}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-muted">{page.idealFor.result}</p>
          </FadeIn>
          <FadeIn direction="right">
            <div className="overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-lg">
              <SectionImage
                {...page.idealFor.image}
                {...hqImage}
                className="aspect-[16/11] w-full rounded-xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden section-padding">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgb(29_78_216_/_0.12),transparent_55%)]" />
        <div className="container-xl relative">
          <FadeIn>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-white p-8 shadow-[0_32px_64px_-32px_rgb(15_23_42_/_0.18)] md:p-12">
              <div className="text-center">
                <h2 className="font-display text-3xl font-bold tracking-tight text-secondary md:text-4xl">
                  {page.cta.title}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted">{page.cta.body}</p>
                <p className="mx-auto mt-6 max-w-3xl text-sm font-medium leading-7 text-secondary/90">
                  {page.cta.closingTitle}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <MagneticButton href="/contact" strength={0.14}>
                    Start a conversation
                    <ArrowUpRight className="h-4 w-4" />
                  </MagneticButton>
                  <a
                    href="mailto:support@excellanto.com"
                    className="text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    support@excellanto.com
                  </a>
                </div>
              </div>
              <div className="mt-10 border-t border-border pt-8 text-center">
                <p className="font-display text-xl font-bold text-secondary">{page.cta.tagline}</p>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-muted">{page.cta.subtext}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTA />
    </>
  );
}
