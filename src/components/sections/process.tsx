"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionImage } from "@/components/ui/section-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { useCms } from "@/lib/cms/provider";
import { cn } from "@/lib/utils";

export function Process() {
  const { homepage } = useCms();
  const process = homepage.process;
  const [activeStep, setActiveStep] = useState(0);
  const active = process.steps[activeStep];

  return (
    <section className="section-padding bg-surface">
      <div className="container-xl">
        <FadeIn>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
            <SectionHeading
              eyebrow={process.eyebrow}
              title={process.title}
              align="left"
              accentBar
              wide
              className="max-w-xl"
            />
            <p className="max-w-2xl text-[0.975rem] leading-7 text-muted md:text-base md:leading-8 lg:pb-1">
              {process.intro}
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-12">
          {/* Step navigation */}
          <FadeIn direction="left" className="lg:col-span-5">
            <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
              {process.steps.map((step, index) => (
                <button
                  key={`${step.step}-${step.title}`}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "flex min-w-[240px] shrink-0 items-start gap-4 rounded-2xl border px-4 py-4 text-left transition-all lg:min-w-0 lg:w-full lg:px-5 lg:py-5",
                    activeStep === index
                      ? "border-primary/30 bg-white shadow-soft"
                      : "border-transparent bg-white/60 hover:border-border hover:bg-white"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold transition-colors",
                      activeStep === index
                        ? "bg-primary text-white"
                        : "border border-border bg-surface text-secondary"
                    )}
                  >
                    {step.step}
                  </span>
                  <span className="min-w-0 pt-1">
                    <span
                      className={cn(
                        "block font-display text-base font-bold leading-snug md:text-[1.0625rem]",
                        activeStep === index ? "text-secondary" : "text-muted"
                      )}
                    >
                      {step.title}
                    </span>
                    <span className="mt-1 hidden text-sm leading-6 text-muted lg:block lg:line-clamp-2">
                      {step.description}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Active step visual + detail */}
          <div className="lg:col-span-7">
            <FadeIn direction="right">
              <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-float">
                {active?.image?.src ? (
                  <div className="relative">
                    <SectionImage
                      {...active.image}
                      className="aspect-[16/10] w-full md:aspect-[16/9]"
                      sizes="(max-width: 1024px) 100vw, 52vw"
                      imgClassName="object-cover object-center transition-transform duration-700"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
                  </div>
                ) : null}

                <AnimatePresence mode="wait">
                  {active ? (
                    <motion.div
                      key={active.step}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                      className="border-t border-border p-6 md:p-8"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-xs font-bold text-primary">
                          {active.step}
                        </span>
                        <h3 className="font-display text-xl font-bold tracking-tight text-secondary md:text-2xl">
                          {active.title}
                        </h3>
                      </div>
                      <p className="mt-4 text-[0.975rem] leading-7 text-muted md:text-base md:leading-8">
                        {active.description}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
