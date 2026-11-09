"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Layout,
  Code2,
  Database,
  Plug,
  Palette,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/fade-in";
import { PageHero } from "@/components/ui/page-hero";
import { SectionImage } from "@/components/ui/section-image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CTA } from "@/components/sections/cta";
import { getWebsitePageContent } from "@/lib/cms/service-pages";
import { useCms } from "@/lib/cms/provider";
import { cn } from "@/lib/utils";

const hqImage = { unoptimized: true, quality: 92 } as const;

const offeringIcons = [Layout, Code2, Database, Plug, Palette];

export function WebsiteDevServicePage() {
  const { services, settings } = useCms();
  const service = services.find((item) => item.slug === "website-development");
  const page = getWebsitePageContent(service);
  const [activeOffering, setActiveOffering] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredHighlight, setHoveredHighlight] = useState<number | null>(null);

  const activeProcessImage = page.processSteps[activeStep]?.image;

  return (
    <>
      <PageHero
        variant="banner"
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        image={page.heroImage}
        imageUnoptimized
      />

      {/* Offerings — interactive mosaic */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <FadeIn>
            <Link
              href="/services"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              {service?.backLabel || settings.backToServices}
            </Link>
            <h2 className="font-display text-3xl font-bold tracking-tight text-secondary md:text-4xl">
              {page.offeringsTitle}
            </h2>
          </FadeIn>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <Stagger className="grid gap-3 sm:grid-cols-2">
              {page.offerings.map((item, index) => {
                const Icon = offeringIcons[index] ?? Layout;
                const active = activeOffering === index;
                return (
                  <StaggerItem
                    key={item.title}
                    className={index === 4 ? "sm:col-span-2" : undefined}
                  >
                    <motion.button
                      type="button"
                      onClick={() => setActiveOffering(index)}
                      onMouseEnter={() => setActiveOffering(index)}
                      className={cn(
                        "group relative flex h-full w-full flex-col items-start overflow-hidden border p-5 text-left transition-colors",
                        active
                          ? "border-primary/40 bg-secondary text-white"
                          : "border-border bg-surface text-secondary hover:border-primary/25 hover:bg-white"
                      )}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.985 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    >
                      <motion.span
                        className={cn(
                          "mb-4 inline-flex h-10 w-10 items-center justify-center border",
                          active
                            ? "border-white/20 bg-white/10 text-accent"
                            : "border-border bg-white text-primary"
                        )}
                        animate={active ? { rotate: [0, -6, 0] } : { rotate: 0 }}
                        transition={{ duration: 0.45 }}
                      >
                        <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                      </motion.span>
                      <span
                        className={cn(
                          "text-[10px] font-semibold uppercase tracking-[0.14em]",
                          active ? "text-white/55" : "text-muted"
                        )}
                      >
                        0{index + 1}
                      </span>
                      <span className="font-display mt-2 text-base font-bold tracking-tight md:text-lg">
                        {item.title}
                      </span>
                      <AnimatePresence mode="wait">
                        {active ? (
                          <motion.p
                            key="body"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 text-sm leading-6 text-slate-300"
                          >
                            {item.body}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                      <span
                        className={cn(
                          "pointer-events-none absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300",
                          active ? "w-full" : "w-0 group-hover:w-1/3"
                        )}
                      />
                    </motion.button>
                  </StaggerItem>
                );
              })}
            </Stagger>

            <FadeIn direction="right" className="relative hidden min-h-[320px] lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOffering}
                  initial={{ opacity: 0, scale: 1.04, x: 16 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98, x: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 overflow-hidden border border-border"
                >
                  <SectionImage
                    {...(page.offerings[activeOffering]?.image ?? page.heroImage)}
                    {...hqImage}
                    className="h-full w-full"
                    sizes="40vw"
                    imgClassName="scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/85 via-[#0b1220]/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                      0{activeOffering + 1}
                    </p>
                    <p className="font-display mt-2 text-xl font-bold text-white">
                      {page.offerings[activeOffering]?.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {page.offerings[activeOffering]?.body}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why choose — hover lift grid */}
      <section className="section-padding bg-surface">
        <div className="container-xl">
          <FadeIn>
            <h2 className="font-display max-w-3xl text-3xl font-bold tracking-tight text-secondary md:text-4xl">
              {page.whyChooseTitle}
            </h2>
          </FadeIn>

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.whyChoose.map((item, index) => (
              <StaggerItem key={item.title}>
                <motion.article
                  className="group relative h-full overflow-hidden border border-border bg-white p-6"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 360, damping: 26 }}
                >
                  <motion.div
                    className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/5"
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileHover={{ scale: 1.2, opacity: 1 }}
                  />
                  <motion.p
                    className="font-display text-4xl font-bold tracking-tight text-primary/15 transition-colors group-hover:text-primary/35"
                    whileHover={{ scale: 1.05 }}
                  >
                    0{index + 1}
                  </motion.p>
                  <h3 className="font-display mt-3 text-lg font-bold tracking-tight text-secondary">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
                  <span className="mt-5 inline-block h-0.5 w-8 bg-primary transition-all duration-300 group-hover:w-16" />
                </motion.article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Process — interactive stepper */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div className="relative space-y-2">
              <div className="absolute bottom-4 left-[1.35rem] top-4 w-px bg-border" aria-hidden />
              {page.processSteps.map((step, index) => {
                const active = activeStep === index;
                return (
                  <motion.button
                    key={step.step}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    onMouseEnter={() => setActiveStep(index)}
                      className={cn(
                      "relative z-[1] flex w-full items-start gap-4 border px-4 py-4 text-left transition-colors",
                      active
                        ? "border-primary/35 bg-secondary text-white"
                        : "border-transparent bg-transparent text-secondary hover:border-border hover:bg-surface"
                    )}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span
                      className={cn(
                        "font-display relative z-[1] inline-flex h-10 w-10 shrink-0 items-center justify-center text-xs font-bold transition-colors",
                        active
                          ? "bg-accent text-white"
                          : "bg-primary text-white"
                      )}
                    >
                      {step.step}
                    </span>
                    <span className="min-w-0 flex-1 pt-1">
                      <span className="font-display block text-lg font-bold tracking-tight">
                        {step.title}
                      </span>
                      <AnimatePresence initial={false}>
                        {active ? (
                          <motion.span
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-1 block text-sm leading-6 text-slate-300"
                          >
                            {step.body}
                          </motion.span>
                        ) : (
                          <span className="mt-1 block text-sm text-muted">{step.body}</span>
                        )}
                      </AnimatePresence>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <FadeIn direction="right" className="relative min-h-[280px] overflow-hidden border border-border md:min-h-[360px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {activeProcessImage && (
                    <SectionImage
                      {...activeProcessImage}
                      {...hqImage}
                      className="h-full w-full"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                        Step {page.processSteps[activeStep]?.step}
                      </p>
                      <p className="font-display mt-1 text-2xl font-bold text-white">
                        {page.processSteps[activeStep]?.title}
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      {page.processSteps.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Go to step ${i + 1}`}
                          onClick={() => setActiveStep(i)}
                          className={cn(
                            "h-1.5 w-6 transition-colors",
                            i === activeStep ? "bg-accent" : "bg-white/35 hover:bg-white/60"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Redesign — checklist with sequential reveal */}
      <section className="section-padding bg-surface">
        <div className="container-xl grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="left">
            <motion.div
              className="overflow-hidden border border-border"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <SectionImage
                {...page.redesignImage}
                {...hqImage}
                className="aspect-[4/3] w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
                imgClassName="transition-transform duration-700 hover:scale-[1.04]"
              />
            </motion.div>
          </FadeIn>
          <FadeIn direction="right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              {page.redesignEyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
              {page.redesignTitle}
            </h2>
            <ul className="mt-8 space-y-3">
              {page.redesignItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  whileHover={{ x: 6 }}
                  className="flex cursor-default items-start gap-3 border border-transparent bg-white/0 px-3 py-3 transition-colors hover:border-border hover:bg-white"
                >
                  <motion.span
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    className="mt-0.5 shrink-0 text-success"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </motion.span>
                  <span className="text-sm font-medium text-secondary">{item}</span>
                </motion.li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Highlights — magnetic tiles */}
      <section className="section-padding bg-white">
        <div className="container-xl grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="left">
            <div className="grid gap-4 sm:grid-cols-2">
              {page.highlights.map((item, index) => {
                const active = hoveredHighlight === index;
                return (
                  <motion.div
                    key={item}
                    onMouseEnter={() => setHoveredHighlight(index)}
                    onMouseLeave={() => setHoveredHighlight(null)}
                    onFocus={() => setHoveredHighlight(index)}
                    tabIndex={0}
                    className={cn(
                      "relative overflow-hidden border px-5 py-8 outline-none transition-colors",
                      active
                        ? "border-primary/40 bg-secondary text-white"
                        : "border-border bg-surface text-secondary"
                    )}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  >
                    <motion.span
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(8_145_178_/_0.25),transparent_55%)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: active ? 1 : 0 }}
                    />
                    <p className="relative text-[10px] font-semibold uppercase tracking-[0.16em] opacity-50">
                      0{index + 1}
                    </p>
                    <h3 className="font-display relative mt-3 text-xl font-bold tracking-tight">
                      {item}
                    </h3>
                    <motion.span
                      className="relative mt-4 inline-flex text-accent"
                      animate={{ x: active ? 4 : 0 }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.span>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-8">
              <MagneticButton href={service?.pageCta.href || "/contact"} strength={0.14} size="lg">
                {page.discoverMore}
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </FadeIn>
          <FadeIn direction="right">
            <motion.div
              className="overflow-hidden border border-border"
              animate={{
                scale: hoveredHighlight !== null ? 1.015 : 1,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <SectionImage
                {...page.highlightsImage}
                {...hqImage}
                className="aspect-[4/3] w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </FadeIn>
        </div>
      </section>

      <CTA />
    </>
  );
}
