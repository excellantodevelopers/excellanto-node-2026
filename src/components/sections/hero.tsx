"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { FadeIn } from "@/components/animations/fade-in";
import { useCms } from "@/lib/cms/provider";
import { cn } from "@/lib/utils";

export function Hero() {
  const { homepage } = useCms();
  const hero = homepage.hero;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#040712] pt-20 md:pt-24">
      <Image
        src={hero.bannerImage.src}
        alt={hero.bannerImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#040712]/95 via-[#040712]/72 to-[#040712]/35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040712]/85 via-[#040712]/20 to-[#040712]/55" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#040712]/80 to-transparent" />

      <div className="container-xl relative z-10 flex min-h-[calc(100svh-5rem)] flex-col justify-center pb-16 pt-10 md:pb-20 md:pt-14">
        <div className="max-w-2xl text-left lg:max-w-3xl">
          {hero.eyebrow?.trim() ? (
            <FadeIn>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-[#0b1220]/65 px-3.5 py-1.5 shadow-[0_0_28px_rgba(56,189,248,0.18)] backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-sky-300" />
                <span className="text-[12px] font-medium tracking-wide text-sky-100/90">
                  {hero.eyebrow}
                </span>
              </div>
            </FadeIn>
          ) : null}

          <FadeIn delay={hero.eyebrow?.trim() ? 0.08 : 0}>
            <h1 className={cn("text-balance text-[2rem] font-bold leading-[1.12] tracking-[-0.04em] sm:text-5xl md:text-[3.5rem] md:leading-[1.08]", hero.eyebrow?.trim() ? "mt-7" : "mt-0")}>
              <span className="text-white">{hero.title} </span>
              <span className="bg-gradient-to-b from-sky-200 to-sky-400 bg-clip-text text-transparent">
                {hero.highlight}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.14}>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-7 text-slate-200/90 md:text-base md:leading-8">
              {hero.body}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-row flex-wrap items-center gap-3">
              <MagneticButton href={hero.primaryCta.href} variant="hero-primary">
                {hero.primaryCta.label}
              </MagneticButton>
              <MagneticButton href={hero.secondaryCta.href} variant="hero-secondary">
                {hero.secondaryCta.label}
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
