"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/fade-in";
import { PageHero } from "@/components/ui/page-hero";
import { SectionImage } from "@/components/ui/section-image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CTA } from "@/components/sections/cta";
import { getMobilePageContent } from "@/lib/cms/service-pages";
import { useCms } from "@/lib/cms/provider";

export function MobileAppServicePage() {
  const { services, homepage, settings } = useCms();
  const service = services.find((item) => item.slug === "mobile-app-development");
  const page = getMobilePageContent(service);
  return (
    <>
      <PageHero
        variant="banner"
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        image={page.heroImage}
      />

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
          </FadeIn>

          <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {page.whyChoose.map((item, index) => (
              <StaggerItem
                key={item.title}
                className={index === 0 ? "md:col-span-2 lg:col-span-1" : undefined}
              >
                <article className="h-full border border-border bg-surface p-6 transition-colors hover:border-primary/30 hover:bg-white">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                    0{index + 1}
                  </p>
                  <h2 className="font-display mt-3 text-lg font-bold tracking-tight text-secondary">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-xl">
          <FadeIn>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              {page.processEyebrow}
            </p>
            <h2 className="font-display mt-3 max-w-3xl text-3xl font-bold tracking-tight text-secondary md:text-4xl">
              {page.processTitle}
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-muted md:text-base">
              {page.processIntro}
            </p>
          </FadeIn>

          <Stagger className="mt-12 space-y-0">
            {page.processSteps.map((step, index) => {
              const image = step.image;
              const reverse = index % 2 === 1;
              return (
                <StaggerItem key={step.step}>
                  <div
                    className={`grid items-center gap-8 border-t border-border py-10 lg:grid-cols-2 lg:gap-14 ${
                      reverse ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div>
                      <span className="font-display inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                        {step.step}
                      </span>
                      <h3 className="font-display mt-4 text-xl font-bold tracking-tight text-secondary md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted md:text-base">
                        {step.body}
                      </p>
                    </div>
                    {image && (
                      <SectionImage
                        {...image}
                        className="aspect-[16/10] w-full"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary py-16 md:py-20">
        <SectionImage
          {...page.brandsVisual}
          className="absolute inset-0 opacity-20"
          sizes="100vw"
          overlay
          overlayClassName="bg-[#0b1220]/70"
        />
        <div className="container-xl relative">
          <FadeIn>
            <h2 className="font-display max-w-xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              {page.brandsTitle}
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {(homepage.brands.logos.length ? homepage.brands.logos : page.brandLogos).map((logo) => (
                <div
                  key={logo.src}
                  className="flex h-14 items-center border border-white/15 bg-white/5 px-5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-7 w-auto object-contain brightness-0 invert opacity-80"
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-xl grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="left">
            <SectionImage
              {...page.industriesImage}
              className="aspect-[4/3] w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeIn>
          <FadeIn direction="right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              {page.industriesEyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
              {page.industriesTitle}
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted md:text-base">
              {page.industriesIntro}
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {page.industries.map((ind) => {
                const Icon = ind.icon;
                return (
                  <li
                    key={ind.title}
                    className="flex items-center gap-3 border border-border bg-surface px-4 py-3"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm font-semibold text-secondary">
                      {ind.title}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8">
              <MagneticButton href={service?.pageCta.href || "/contact"} strength={0.12}>
                {service?.pageCta.label || settings.headerCta.label}
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTA />
    </>
  );
}
