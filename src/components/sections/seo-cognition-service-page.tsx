"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Search,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/fade-in";
import { SectionImage } from "@/components/ui/section-image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { getSeoCognitionPageContent } from "@/lib/cms/service-pages";
import { useCms } from "@/lib/cms/provider";
import { cn } from "@/lib/utils";

const hqImage = { unoptimized: true, quality: 92 } as const;

const pillarIcons = [FileText, Wrench, BookOpen];
const pillarTabLabels = ["On-Page SEO", "Technical SEO", "Content Strategy"];
const approachIcons = [TrendingUp, Search, CheckCircle2, Sparkles];

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.16em]",
        light ? "text-emerald-300" : "text-primary"
      )}
    >
      {children}
    </p>
  );
}

export function SeoCognitionServicePage() {
  const { services, settings } = useCms();
  const service = services.find((item) => item.slug === "seo-cognition");
  const page = getSeoCognitionPageContent(service);
  const [activePillar, setActivePillar] = useState(0);

  const activePillarData = page.pillars[activePillar];
  const activePillarImage = activePillarData?.image ?? page.heroImage;

  return (
    <>
      {/* Cinematic split hero */}
      <section className="relative min-h-[88vh] overflow-hidden bg-[#031208] pt-20 md:min-h-[92vh] md:pt-24">
        <div className="absolute inset-0">
          <Image
            src={page.heroImage.src}
            alt={page.heroImage.alt}
            fill
            priority
            unoptimized
            className="object-cover object-[70%_center] opacity-50 md:object-right"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031208]/96 via-[#031208]/80 to-[#031208]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_88%_45%,rgb(16_185_129_/_0.16),transparent_60%)]" />
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
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3.5 py-1.5">
              <Search className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-100">
                SEO Cognition
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
                className="!rounded-full !border-0 !bg-gradient-to-b !from-[#d1fae5] !to-[#6ee7b7] !px-6 !text-slate-900 !shadow-[0_0_32px_rgba(52,211,153,0.35)]"
              >
                Contact Us
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-500/25 to-primary/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-[0_32px_64px_-24px_rgb(0_0_0_/_0.55)]">
                <SectionImage
                  {...page.approach.image}
                  {...hqImage}
                  className="aspect-[4/3] w-full"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#031208] via-[#031208]/80 to-transparent p-6 pt-16">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                    Performance-driven SEO
                  </p>
                  <p className="mt-2 font-display text-lg font-bold text-white">
                    Rank higher. Convert visibility into growth.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-white/10 bg-[#0a1810]/90 p-4 backdrop-blur-md md:block">
                <p className="text-2xl font-bold text-white">#1</p>
                <p className="text-[11px] text-slate-400">Organic search focus</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>Overview</Eyebrow>
              <p className="mt-4 text-lg leading-8 text-muted">{page.intro[1]}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Strategic approach */}
      <section className="section-padding bg-surface">
        <div className="container-xl grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="left">
            <Eyebrow>{page.approach.eyebrow}</Eyebrow>
            <h2 className="font-display mt-4 text-2xl font-bold leading-snug tracking-tight text-secondary md:text-3xl">
              {page.approach.title}
            </h2>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {page.approach.leadIn}
            </p>
            <Stagger className="mt-5 grid gap-3 sm:grid-cols-2">
              {page.approach.bullets.map((item, index) => {
                const Icon = approachIcons[index] ?? CheckCircle2;
                return (
                  <StaggerItem key={item}>
                    <div className="flex h-full items-start gap-3 rounded-xl border border-border bg-white p-4 shadow-sm">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="text-sm font-medium leading-6 text-secondary">{item}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
            <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.07] via-white to-primary/[0.04] px-6 py-5">
              <p className="text-sm font-medium leading-7 text-secondary md:text-base">
                {page.approach.result}
              </p>
            </div>
            <div className="mt-8">
              <MagneticButton href="/contact" strength={0.12}>
                Contact Us
              </MagneticButton>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-[0_24px_48px_-28px_rgb(15_23_42_/_0.18)]">
              <SectionImage
                {...page.approach.image}
                {...hqImage}
                className="aspect-[5/4] w-full rounded-xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Keyword intelligence */}
      <section className="section-padding bg-white">
        <div className="container-xl grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="left" className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-[0_24px_48px_-28px_rgb(15_23_42_/_0.18)]">
              <SectionImage
                {...page.keywords.image}
                {...hqImage}
                className="aspect-[5/4] w-full rounded-xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/20 bg-[#031208]/75 px-4 py-3 backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                  Keyword intelligence
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  High-intent terms mapped to conversion
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" className="order-1 lg:order-2">
            <Eyebrow>{page.keywords.eyebrow}</Eyebrow>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
              {page.keywords.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">{page.keywords.body}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {page.keywords.leadIn}
            </p>
            <ul className="mt-5 space-y-3">
              {page.keywords.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface/60 px-4 py-3.5 text-sm font-medium leading-6 text-secondary"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {bullet}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* SEO pillars — interactive tabs */}
      <section className="section-padding bg-secondary text-white">
        <div className="container-xl">
          <FadeIn>
            <Eyebrow light>Core SEO Modules</Eyebrow>
            <h2 className="font-display mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
              On-page, technical, and content systems built for rankings
            </h2>
          </FadeIn>

          <div className="mt-10 flex flex-wrap gap-2">
            {page.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index] ?? FileText;
              const active = activePillar === index;
              return (
                <button
                  key={pillar.title}
                  type="button"
                  onClick={() => setActivePillar(index)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                    active
                      ? "border-emerald-400 bg-emerald-500 text-white shadow-[0_8px_24px_-12px_rgb(16_185_129_/_0.55)]"
                      : "border-white/15 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-white/10"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {pillarTabLabels[index] ?? `Module ${index + 1}`}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-center"
              >
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {activePillarData?.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-slate-300">{activePillarData?.intro}</p>
                {activePillarData?.leadIn && activePillarData.bullets.length > 0 ? (
                  <>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                      {activePillarData.leadIn}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {activePillarData.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-slate-100"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
                <p className="mt-6 rounded-xl border-l-4 border-emerald-400 bg-emerald-500/10 px-4 py-3 text-sm font-medium leading-7 text-slate-100">
                  {activePillarData?.result}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/15 lg:min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0"
                >
                  <SectionImage
                    {...activePillarImage}
                    {...hqImage}
                    className="h-full w-full"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031208]/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                      Module 0{activePillar + 1}
                    </p>
                    <p className="font-display mt-1 text-lg font-bold text-white line-clamp-2">
                      {activePillarData?.title}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Authority accent band */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0">
          <Image
            src={page.accentImage.src}
            alt={page.accentImage.alt}
            fill
            unoptimized
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/90" />
        </div>
        <div className="container-xl relative z-10">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>{page.approach.eyebrow}</Eyebrow>
              <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
                {page.pillars[2]?.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-muted">{page.pillars[2]?.intro}</p>
              <p className="mt-6 text-sm font-medium leading-7 text-secondary">
                {page.pillars[2]?.result}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SEO CTA */}
      <section className="section-padding bg-[#031208]">
        <div className="container-xl">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-[#052e16]/80 via-[#031208] to-[#0b1220] px-8 py-12 md:px-12 md:py-16">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative z-10 mx-auto max-w-3xl text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  {page.cta.tagline}
                </p>
                <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {page.cta.title}
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-300">{page.cta.body}</p>
                <p className="mt-4 text-sm font-medium leading-7 text-slate-400">
                  {page.cta.closingTitle}
                </p>
                <p className="mt-2 text-sm text-slate-500">{page.cta.subtext}</p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <MagneticButton
                    href="/contact"
                    strength={0.12}
                    className="!rounded-full !border-0 !bg-gradient-to-b !from-[#d1fae5] !to-[#6ee7b7] !px-8 !text-slate-900 !shadow-[0_0_32px_rgba(52,211,153,0.3)]"
                  >
                    Contact Us
                    <ArrowUpRight className="h-4 w-4" />
                  </MagneticButton>
                  <MagneticButton
                    href="/services"
                    strength={0.1}
                    variant="secondary"
                    className="!rounded-full !border-white/20 !bg-white/5 !text-white hover:!border-white/40"
                  >
                    Explore Services
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
