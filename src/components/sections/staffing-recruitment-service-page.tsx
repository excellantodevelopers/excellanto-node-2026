"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  ChevronRight,
  Cloud,
  Code2,
  GitBranch,
  Handshake,
  Sparkles,
  Target,
  UserCheck,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/fade-in";
import { SectionImage } from "@/components/ui/section-image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { getStaffingRecruitmentPageContent } from "@/lib/cms/service-pages";
import { useCms } from "@/lib/cms/provider";
import { cn } from "@/lib/utils";

const hqImage = { unoptimized: true, quality: 92 } as const;

const domainIcons = [Building2, Cloud, Code2, GitBranch];
const principleIcons = [Target, Handshake, Users];
const segmentTints = [
  "from-surface to-white border-border",
  "from-primary/[0.04] to-white border-primary/15",
  "from-accent/[0.06] to-white border-accent/20",
];

function Label({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-block text-[11px] font-semibold uppercase tracking-[0.16em]",
        light ? "text-sky-300" : "text-primary"
      )}
    >
      {children}
    </span>
  );
}

export function StaffingRecruitmentServicePage() {
  const { services, settings } = useCms();
  const service = services.find((item) => item.slug === "staffing-recruitment-service");
  const page = getStaffingRecruitmentPageContent(service);
  const [activeStep, setActiveStep] = useState(0);

  const activeStepData = page.process.steps[activeStep];

  return (
    <>
      {/* Hero — homepage dark + sky palette, unique photo-stack layout */}
      <section className="relative overflow-hidden bg-[#040712] pt-24 pb-16 md:pt-28 md:pb-24">
        <div className="absolute inset-0">
          <Image
            src={page.heroImage.src}
            alt={page.heroImage.alt}
            fill
            priority
            unoptimized
            className="object-cover object-[70%_center] opacity-45 md:object-right"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040712]/96 via-[#040712]/82 to-[#040712]/55" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_88%_40%,rgb(29_78_216_/_0.14),transparent_60%)]" />
        </div>

        <div className="container-xl relative">
          <FadeIn>
            <Link
              href="/services"
              className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {service?.backLabel || settings.backToServices}
            </Link>
          </FadeIn>

          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <FadeIn direction="left">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-[#0b1220]/65 px-3.5 py-1.5 shadow-[0_0_28px_rgba(56,189,248,0.18)] backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-sky-300" />
                <span className="text-[12px] font-medium tracking-wide text-sky-100/90">
                  {page.heroEyebrow}
                </span>
              </div>
              <h1 className="font-display mt-6 max-w-2xl text-[2.35rem] font-bold leading-[1.06] tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
                {page.heroTitle}
              </h1>
              <div className="mt-8 space-y-5 border-l-[3px] border-sky-400/80 pl-6">
                {page.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-base leading-8 text-slate-300">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-10">
                <MagneticButton
                  href="/contact"
                  strength={0.12}
                  className="!rounded-full !border-0 !bg-gradient-to-b !from-[#dbeafe] !to-[#7dd3fc] !px-6 !text-slate-900 !shadow-[0_0_32px_rgba(56,189,248,0.35)]"
                >
                  {page.cta.buttonLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.08}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -right-3 top-8 z-10 w-[78%] overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_48px_-20px_rgb(0_0_0_/_0.45)]">
                  <SectionImage
                    {...page.approach.image}
                    {...hqImage}
                    className="aspect-[4/5] w-full"
                    sizes="(max-width: 1024px) 85vw, 32vw"
                  />
                </div>
                <div className="relative z-20 w-[72%] overflow-hidden rounded-2xl border border-white/20 shadow-[0_32px_64px_-24px_rgb(0_0_0_/_0.55)]">
                  <SectionImage
                    {...page.heroImage}
                    {...hqImage}
                    className="aspect-[5/4] w-full"
                    sizes="(max-width: 1024px) 80vw, 38vw"
                    imgClassName="object-cover object-right"
                  />
                </div>
                <div className="absolute -bottom-4 right-0 z-30 rounded-xl border border-white/15 bg-[#0b1220]/90 px-5 py-4 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sky-300">
                      <UserCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">
                        Quality-first
                      </p>
                      <p className="text-sm font-bold text-white">Precision hiring</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Principles — primary band like homepage CTA */}
      <section className="border-y border-primary-dark/30 bg-primary py-10 text-white">
        <div className="container-xl">
          <Stagger className="grid gap-8 md:grid-cols-3 md:gap-6">
            {page.principles.map((item, index) => {
              const Icon = principleIcons[index] ?? Target;
              return (
                <StaggerItem key={item.label}>
                  <div className="flex gap-4 md:flex-col md:gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display text-lg font-bold">{item.label}</p>
                      <p className="mt-1.5 text-sm leading-6 text-white/85">{item.body}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Approach */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <FadeIn>
            <div className="ui-accent-bar mb-6" />
            <Label>{page.approach.eyebrow}</Label>
          </FadeIn>

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <FadeIn direction="left" className="lg:sticky lg:top-28 lg:self-start">
              <div className="relative">
                <div className="absolute -bottom-4 -left-4 right-8 top-8 border border-primary/20 bg-primary/5" />
                <div className="relative overflow-hidden rounded-2xl border border-border shadow-[0_20px_50px_-30px_rgb(15_23_42_/_0.2)]">
                  <SectionImage
                    {...page.approach.image}
                    {...hqImage}
                    className="aspect-[3/4] w-full"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                </div>
              </div>
            </FadeIn>

            <div className="space-y-0">
              {page.approach.paragraphs.map((paragraph, index) => (
                <FadeIn key={paragraph.slice(0, 40)} delay={index * 0.06}>
                  <div className="relative flex gap-6 pb-10 last:pb-0">
                    {index < page.approach.paragraphs.length - 1 ? (
                      <span className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-primary to-border" />
                    ) : null}
                    <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-white font-display text-sm font-bold text-primary shadow-sm">
                      {index + 1}
                    </span>
                    <p className="pt-1.5 text-base leading-8 text-muted">{paragraph}</p>
                  </div>
                </FadeIn>
              ))}

              <FadeIn delay={0.2}>
                <div className="mt-8 rounded-xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] via-white to-accent/[0.04] px-6 py-5">
                  <p className="text-sm font-semibold leading-7 text-secondary md:text-base">
                    {page.approach.result}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise domains */}
      <section className="section-padding bg-surface">
        <div className="container-xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <FadeIn direction="left">
              <div className="ui-accent-bar mb-6" />
              <h2 className="font-display text-3xl font-bold tracking-tight text-secondary md:text-4xl">
                {page.expertise.eyebrow}
              </h2>
              <p className="mt-5 text-base leading-8 text-muted">{page.expertise.intro}</p>
            </FadeIn>
            <FadeIn direction="right">
              <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
                <SectionImage
                  {...page.expertise.image}
                  {...hqImage}
                  className="aspect-[16/10] w-full"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>
            </FadeIn>
          </div>

          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2">
            {page.expertise.domains.map((domain, index) => {
              const Icon = domainIcons[index] ?? Building2;
              return (
                <StaggerItem key={domain.title}>
                  <article className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_40px_-28px_rgb(29_78_216_/_0.18)]">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <ChevronRight className="h-5 w-5 text-border transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                    <h3 className="font-display mt-5 text-xl font-bold tracking-tight text-secondary">
                      {domain.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted">{domain.body}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Process — dark secondary + sky/primary active states */}
      <section className="section-padding bg-secondary text-white">
        <div className="container-xl">
          <FadeIn>
            <Label light>Hiring Process</Label>
            <h2 className="font-display mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
              {page.process.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">{page.process.intro}</p>
          </FadeIn>

          <div className="mt-14 hidden lg:block">
            <div className="relative flex justify-between gap-2">
              <div className="absolute left-0 right-0 top-5 h-0.5 bg-white/15" aria-hidden />
              {page.process.steps.map((step, index) => {
                const active = activeStep === index;
                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    onMouseEnter={() => setActiveStep(index)}
                    className="group relative z-10 flex flex-1 flex-col items-center px-1 text-center"
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300",
                        active
                          ? "scale-110 border-sky-400 bg-primary text-white shadow-[0_0_20px_rgb(29_78_216_/_0.45)]"
                          : "border-white/25 bg-secondary text-slate-400 group-hover:border-sky-400/60 group-hover:text-white"
                      )}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={cn(
                        "mt-3 text-[11px] font-semibold uppercase tracking-wide leading-tight transition-colors",
                        active ? "text-sky-300" : "text-slate-500 group-hover:text-slate-300"
                      )}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-10 grid gap-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8 lg:grid-cols-[1fr_0.85fr]"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky-300">
                  Step {activeStep + 1} of {page.process.steps.length}
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold">{activeStepData?.title}</h3>
                <p className="mt-4 text-base leading-8 text-slate-300">{activeStepData?.body}</p>
              </div>
              <div className="overflow-hidden rounded-xl border border-white/10">
                <SectionImage
                  {...page.process.image}
                  {...hqImage}
                  className="aspect-[16/11] w-full"
                  sizes="40vw"
                />
              </div>
            </motion.div>
          </div>

          <div className="mt-10 space-y-4 lg:hidden">
            {page.process.steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-sky-300">
                  Step {index + 1}
                </p>
                <h3 className="font-display mt-1 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal for — triptych cards */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <Label>{page.idealFor.title}</Label>
              <p className="mt-5 text-base leading-8 text-muted">{page.idealFor.intro}</p>
            </div>
          </FadeIn>

          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {page.idealFor.segments.map((segment, index) => (
              <StaggerItem key={segment.title}>
                <article
                  className={cn(
                    "flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-b shadow-sm",
                    segmentTints[index]
                  )}
                >
                  <div className="overflow-hidden">
                    <SectionImage
                      {...segment.image}
                      {...hqImage}
                      className="aspect-[4/3] w-full transition-transform duration-500 hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold text-secondary">{segment.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{segment.body}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn delay={0.1}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm font-semibold leading-7 text-secondary">
              {page.idealFor.result}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Impact */}
      <section className="section-padding bg-surface">
        <div className="container-xl grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <FadeIn direction="left">
            <div className="ui-accent-bar mb-6" />
            <Label>Long-term value</Label>
            <h2 className="font-display mt-4 text-3xl font-bold leading-snug tracking-tight text-secondary md:text-4xl">
              {page.impact.title}
            </h2>
            <div className="mt-6 space-y-5">
              {page.impact.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-base leading-8 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="grid grid-cols-2 gap-4">
              {page.impact.bullets.map((bullet, index) => (
                <div
                  key={bullet}
                  className={cn(
                    "rounded-2xl border bg-white p-5 shadow-sm",
                    index === 0
                      ? "col-span-2 border-primary/20 bg-gradient-to-br from-primary/[0.06] to-white"
                      : "border-border"
                  )}
                >
                  <span className="font-display text-3xl font-bold text-primary/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-sm font-semibold leading-6 text-secondary">{bullet}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border shadow-md">
              <SectionImage
                {...page.impact.image}
                {...hqImage}
                className="aspect-[21/9] w-full"
                sizes="50vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA — homepage primary band */}
      <section className="relative overflow-hidden bg-primary py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgb(255_255_255_/_0.08),transparent_55%)]" />
        <div className="container-xl relative">
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                  {page.cta.tagline}
                </p>
                <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {page.cta.title}
                </h2>
                <p className="mt-5 text-base leading-8 text-white/85">{page.cta.body}</p>
                <p className="mt-4 text-sm leading-7 text-white/70">{page.cta.closingTitle}</p>
              </div>
              <div className="flex flex-col gap-6 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                <p className="text-sm leading-7 text-white/85">{page.cta.subtext}</p>
                <div className="flex flex-wrap gap-3">
                  <MagneticButton
                    href="/contact"
                    strength={0.12}
                    size="lg"
                    className="!bg-white !text-secondary hover:!bg-white/90"
                  >
                    {page.cta.buttonLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </MagneticButton>
                  <MagneticButton
                    href="/services"
                    strength={0.1}
                    size="lg"
                    className="!border-white/35 !bg-transparent !text-white hover:!bg-white/10"
                  >
                    All Services
                  </MagneticButton>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
