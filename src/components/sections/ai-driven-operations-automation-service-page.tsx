"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Mail,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/fade-in";
import { SectionImage } from "@/components/ui/section-image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { getAiDrivenOperationsPageContent } from "@/lib/cms/service-pages";
import { useCms } from "@/lib/cms/provider";
import { cn } from "@/lib/utils";

const hqImage = { unoptimized: true, quality: 92 } as const;

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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span className="text-sm leading-7 text-muted">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function AiDrivenOperationsAutomationServicePage() {
  const { services, settings } = useCms();
  const service = services.find((item) => item.slug === "ai-driven-operations-automation");
  const page = getAiDrivenOperationsPageContent(service);
  const [activeStep, setActiveStep] = useState(0);
  const activeStepData = page.process.steps[activeStep];

  return (
    <>
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

          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
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
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">{page.intro}</p>
              <ul className="mt-8 space-y-3">
                {page.heroBullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <MagneticButton href="/contact" variant="hero-primary" strength={0.1}>
                  Contact us
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.08}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -right-4 top-8 z-10 w-[58%] overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_48px_-16px_rgb(0_0_0_/_0.5)]">
                  <SectionImage
                    {...page.heroAccentImage}
                    {...hqImage}
                    className="aspect-[4/3] w-full"
                    sizes="280px"
                  />
                </div>
                <div className="relative mr-[22%] overflow-hidden rounded-2xl border border-white/10 shadow-[0_32px_64px_-24px_rgb(0_0_0_/_0.55)]">
                  <SectionImage
                    {...page.heroImage}
                    {...hqImage}
                    className="aspect-[4/5] w-full"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    imgClassName="object-cover object-right"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-xl grid gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="left">
            <h2 className="font-display text-3xl font-bold tracking-tight text-secondary md:text-4xl">
              {page.experience.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">{page.experience.intro}</p>
            <div className="mt-8 overflow-hidden rounded-2xl shadow-soft lg:hidden">
              <SectionImage
                {...page.experience.image}
                {...hqImage}
                className="aspect-[16/10] w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          <FadeIn direction="right" className="space-y-10">
            <div>
              <h3 className="font-display text-lg font-bold text-secondary">{page.experience.understandLeadIn}</h3>
              <div className="mt-4">
                <BulletList items={page.experience.understandBullets} />
              </div>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-secondary">{page.experience.expertiseLeadIn}</h3>
              <div className="mt-4">
                <BulletList items={page.experience.expertiseBullets} />
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.06} className="mt-12 hidden lg:block">
          <div className="overflow-hidden rounded-2xl shadow-soft">
            <SectionImage
              {...page.experience.image}
              {...hqImage}
              className="aspect-[21/9] w-full"
              sizes="1200px"
            />
          </div>
        </FadeIn>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-xl">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
            <FadeIn direction="left">
              <Label>{page.capabilities.eyebrow}</Label>
              <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
                {page.capabilities.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-muted">{page.capabilities.intro}</p>
              <div className="mt-10 overflow-hidden rounded-2xl shadow-soft">
                <SectionImage
                  {...page.capabilities.image}
                  {...hqImage}
                  className="aspect-[4/3] w-full"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </FadeIn>

            <Stagger className="grid gap-4 sm:grid-cols-2">
              {page.capabilities.items.map((item) => (
                <StaggerItem key={item.title}>
                  <article className="pro-card h-full p-5 md:p-6">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Bot className="h-4 w-4" />
                    </div>
                    <h3 className="font-display text-base font-bold leading-snug text-secondary">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-xl">
          <FadeIn>
            <Label>{page.process.eyebrow}</Label>
          </FadeIn>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <FadeIn direction="left">
              <div className="flex flex-wrap gap-2">
                {page.process.steps.map((step, index) => (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-left text-xs font-semibold transition-colors",
                      activeStep === index
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-surface text-secondary hover:border-primary/30"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeStepData ? (
                  <motion.div
                    key={activeStepData.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="mt-8"
                  >
                    <h3 className="font-display text-2xl font-bold tracking-tight text-secondary">
                      {activeStepData.title}
                    </h3>
                    <p className="mt-4 text-base leading-8 text-muted">{activeStepData.body}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </FadeIn>

            <FadeIn direction="right">
              <div className="overflow-hidden rounded-2xl shadow-soft">
                <SectionImage
                  {...page.process.image}
                  {...hqImage}
                  className="aspect-[4/3] w-full"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-xl grid gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="left">
            <h2 className="font-display text-2xl font-bold tracking-tight text-secondary md:text-3xl">
              {page.industries.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">{page.industries.intro}</p>
            <div className="mt-6">
              <BulletList items={page.industries.bullets} />
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <h2 className="font-display text-2xl font-bold tracking-tight text-secondary md:text-3xl">
              {page.trust.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">{page.trust.intro}</p>
            <div className="mt-6">
              <BulletList items={page.trust.bullets} />
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl shadow-soft">
              <SectionImage
                {...page.industries.image}
                {...hqImage}
                className="aspect-[16/10] w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-xl">
          <FadeIn>
            <Label>{page.impactAreas.eyebrow}</Label>
          </FadeIn>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {page.impactAreas.items.map((item) => (
                <StaggerItem key={item.title}>
                  <article className="rounded-2xl border border-border bg-surface/70 p-5 transition-colors hover:border-primary/25 hover:bg-white hover:shadow-soft">
                    <h3 className="font-display text-base font-bold text-secondary">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>

            <FadeIn direction="right">
              <div className="overflow-hidden rounded-2xl shadow-soft">
                <SectionImage
                  {...page.impactAreas.image}
                  {...hqImage}
                  className="aspect-[3/4] w-full lg:sticky lg:top-28"
                  sizes="400px"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary text-white">
        <div className="container-xl grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <FadeIn direction="left">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{page.future.title}</h2>
            <p className="mt-5 text-base leading-8 text-white/70">{page.future.intro}</p>
            <h3 className="font-display mt-8 text-lg font-bold text-white">{page.future.leadIn}</h3>
            <ul className="mt-4 space-y-3">
              {page.future.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-white/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn direction="right">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_32px_64px_-24px_rgb(0_0_0_/_0.55)]">
              <SectionImage
                {...page.future.image}
                {...hqImage}
                className="aspect-[4/3] w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary py-16 md:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="container-xl relative">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                {page.cta.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-white/80">{page.cta.body}</p>
              <h3 className="font-display mt-8 text-xl font-bold leading-snug text-white md:text-2xl">
                {page.cta.closingTitle}
              </h3>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-white/90 sm:flex-row sm:gap-6">
                <a
                  href={`mailto:${page.cta.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  {page.cta.email}
                </a>
                <a
                  href={page.cta.website}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  {page.cta.website}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-10 font-display text-lg font-bold text-white">{page.cta.tagline}</p>
              <p className="mt-3 text-sm leading-7 text-white/75">{page.cta.subtext}</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
