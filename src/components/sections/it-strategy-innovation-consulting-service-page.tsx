"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionImage } from "@/components/ui/section-image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { getItStrategyInnovationPageContent } from "@/lib/cms/service-pages";
import { useCms } from "@/lib/cms/provider";
import { cn } from "@/lib/utils";

const hqImage = { unoptimized: true, quality: 92 } as const;

function BulletList({
  items,
  light = false,
}: {
  items: string[];
  light?: boolean;
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={cn(
              "mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
              light ? "bg-sky-400/15 text-sky-400" : "bg-primary/10 text-primary"
            )}
          >
            <CheckCircle2 className="h-3 w-3" />
          </span>
          <span className={cn("text-sm leading-7 md:text-[0.9375rem]", light ? "text-slate-200" : "text-muted")}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ItStrategyInnovationConsultingServicePage() {
  const { services, settings } = useCms();
  const service = services.find((item) => item.slug === "it-strategy-innovation-consulting");
  const page = getItStrategyInnovationPageContent(service);

  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden bg-[#040712] pt-20 md:min-h-[94vh] md:pt-24">
        <div className="absolute inset-0">
          <Image
            src={page.heroImage.src}
            alt={page.heroImage.alt}
            fill
            priority
            unoptimized
            className="object-cover object-[70%_center] opacity-40 md:object-right"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040712]/98 via-[#040712]/88 to-[#040712]/52" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040712] via-transparent to-[#040712]/65" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_82%_38%,rgb(29_78_216_/_0.2),transparent_62%)]" />
          <div className="absolute inset-0 bg-grid opacity-[0.04]" />
        </div>

        <div className="container-xl relative z-10 flex min-h-[calc(92vh-5rem)] flex-col justify-center pb-16 pt-6 md:pb-20">
          <FadeIn>
            <Link
              href="/services"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10 hover:text-white md:mb-10"
            >
              <ArrowLeft className="h-4 w-4" />
              {service?.backLabel || settings.backToServices}
            </Link>
          </FadeIn>

          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 xl:gap-20">
            <FadeIn direction="left">
              <h1 className="font-display max-w-2xl text-[2.1rem] font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl md:text-[3.15rem] lg:text-[3.35rem]">
                {page.chooseUs.title}
              </h1>
              <p className="mt-6 max-w-xl text-[0.975rem] leading-8 text-slate-300 md:text-base md:leading-8">
                {page.chooseUs.body}
              </p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md md:max-w-xl md:p-6">
                <BulletList items={page.chooseUs.bullets} light />
              </div>
              <div className="mt-8">
                <MagneticButton href="/contact" variant="hero-primary" strength={0.1}>
                  Contact us
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/25 via-transparent to-sky-400/20 blur-3xl" />
                <div className="absolute -right-2 top-6 z-10 w-[56%] overflow-hidden rounded-2xl border border-white/20 shadow-[0_28px_56px_-20px_rgb(0_0_0_/_0.55)] md:-right-4 md:top-10">
                  <SectionImage
                    {...page.heroAccentImage}
                    {...hqImage}
                    className="aspect-[4/3] w-full"
                    sizes="300px"
                    imgClassName="transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
                <div className="relative mr-[20%] overflow-hidden rounded-2xl border border-white/15 shadow-[0_40px_80px_-32px_rgb(0_0_0_/_0.6)]">
                  <SectionImage
                    {...page.heroImage}
                    {...hqImage}
                    className="aspect-[4/5] w-full"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    imgClassName="object-cover object-right transition-transform duration-700 hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040712]/50 via-transparent to-transparent" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="section-padding bg-white !pt-14 md:!pt-16">
        <div className="container-xl">
          <FadeIn>
            <div className="relative mx-auto max-w-4xl rounded-3xl border border-border/80 bg-surface/50 px-6 py-8 md:px-10 md:py-10">
              <div className="ui-accent-bar mx-auto mb-8 md:mx-0" />
              <div className="space-y-5 text-center md:text-left">
                {page.opening.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={cn(
                      "leading-8 text-muted",
                      index === 0
                        ? "font-display text-lg font-medium text-secondary md:text-xl md:leading-8"
                        : "text-[0.975rem] md:text-base md:leading-8"
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-xl">
          <FadeIn>
            <SectionHeading
              title={page.infrastructure.title}
              description={page.infrastructure.intro}
              align="left"
              accentBar
              wide
              className="max-w-3xl"
            />
          </FadeIn>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <FadeIn direction="left">
              <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-soft transition-shadow hover:shadow-float md:p-8">
                <h3 className="font-display text-lg font-bold text-secondary md:text-xl">
                  {page.infrastructure.evaluateLeadIn}
                </h3>
                <div className="mt-5">
                  <BulletList items={page.infrastructure.evaluateBullets} />
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-soft transition-shadow hover:shadow-float md:p-8">
                <p className="text-sm leading-7 text-muted md:text-[0.9375rem] md:leading-8">
                  {page.infrastructure.strategyParagraph}
                </p>
                <h3 className="font-display mt-6 text-lg font-bold text-secondary md:text-xl">
                  {page.infrastructure.capabilitiesLeadIn}
                </h3>
                <div className="mt-5">
                  <BulletList items={page.infrastructure.capabilitiesBullets} />
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.08} className="mt-10">
            <div className="relative overflow-hidden rounded-2xl shadow-float">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-accent/20 opacity-80" />
              <div className="relative overflow-hidden rounded-2xl">
                <SectionImage
                  {...page.infrastructure.image}
                  {...hqImage}
                  className="aspect-[21/9] w-full"
                  sizes="1200px"
                  imgClassName="transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-xl">
          <FadeIn>
            <SectionHeading title={page.results.title} align="left" accentBar wide className="max-w-3xl" />
          </FadeIn>

          <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:gap-6">
            <FadeIn direction="left" className="lg:col-span-5">
              <div className="sticky top-28 overflow-hidden rounded-2xl shadow-float">
                <SectionImage
                  {...page.results.image}
                  {...hqImage}
                  className="aspect-[4/5] w-full lg:aspect-[3/4]"
                  sizes="440px"
                  imgClassName="transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            </FadeIn>

            <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5">
              {page.results.items.map((item, index) => (
                <StaggerItem key={item.title}>
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.22 }}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-soft transition-colors hover:border-primary/20 md:p-6"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <Compass className="h-4 w-4" />
                      </div>
                      <span className="font-display text-2xl font-bold tracking-tight text-border transition-colors group-hover:text-primary/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-bold leading-snug text-secondary md:text-[1.05rem]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-7 text-muted">{item.body}</p>
                  </motion.article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_120%,rgb(255_255_255_/_0.12),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/15" />
        <div className="container-xl relative py-16 md:py-20">
          <FadeIn>
            <div className="mx-auto max-w-3xl rounded-3xl border border-white/15 bg-white/[0.06] px-6 py-10 text-center backdrop-blur-sm md:px-10 md:py-12">
              <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                {page.cta.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-white/80">{page.cta.body}</p>
              <h3 className="font-display mt-8 text-lg font-bold leading-snug text-white md:text-xl">
                {page.cta.closingTitle}
              </h3>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8">
                <a
                  href={`mailto:${page.cta.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  {page.cta.email}
                </a>
                <a
                  href={page.cta.website}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/15 hover:text-white"
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
