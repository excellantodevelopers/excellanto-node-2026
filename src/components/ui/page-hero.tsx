"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/fade-in";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionImage } from "@/components/ui/section-image";
import { useCms } from "@/lib/cms/provider";
import { sectionImages, type SiteImage } from "@/lib/images";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  image?: SiteImage;
  /** Homepage-style full-bleed dark banner (used on services pages). */
  variant?: "banner" | "light";
  showCtas?: boolean;
  showBrandName?: boolean;
  imageUnoptimized?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  className,
  image,
  variant = "light",
  showCtas = true,
  showBrandName = true,
  imageUnoptimized = false,
}: PageHeroProps) {
  const { settings } = useCms();
  if (variant === "banner") {
    const bannerImage = image ?? sectionImages.hero;

    return (
      <section
        className={cn(
          "relative min-h-[72vh] overflow-hidden bg-secondary pt-24 md:min-h-[78vh] md:pt-28",
          className
        )}
      >
        <SectionImage
          {...bannerImage}
          className="absolute inset-0"
          sizes="100vw"
          priority
          unoptimized={imageUnoptimized}
          quality={92}
          overlay
          overlayClassName="bg-gradient-to-r from-[#0b1220]/92 via-[#0b1220]/72 to-[#0b1220]/35"
          imgClassName="object-cover object-[70%_center] md:object-right"
        />

        <div className="container-xl relative flex min-h-[calc(72vh-6rem)] flex-col justify-end pb-14 md:min-h-[calc(78vh-7rem)] md:pb-20">
          <div className="max-w-2xl">
            {showBrandName ? (
              <FadeIn>
                <p className="font-display text-4xl font-bold tracking-[-0.045em] text-white sm:text-5xl md:text-6xl">
                  {settings.name}
                </p>
              </FadeIn>
            ) : null}

            {eyebrow ? (
              <FadeIn delay={showBrandName ? 0.08 : 0}>
                <div className={cn("flex items-center gap-3", showBrandName ? "mt-6" : "")}>
                  <span className="ui-accent-bar !bg-accent" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {eyebrow}
                  </p>
                </div>
              </FadeIn>
            ) : null}

            <FadeIn delay={showBrandName ? 0.12 : 0.06}>
              <h1 className="font-display mt-4 text-2xl font-bold tracking-[-0.03em] text-white text-balance sm:text-3xl md:text-4xl md:leading-[1.15]">
                {title}
              </h1>
            </FadeIn>

            {description ? (
              <FadeIn delay={0.2}>
                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 md:text-[0.975rem]">
                  {description}
                </p>
              </FadeIn>
            ) : null}

            {showCtas ? (
              <FadeIn delay={0.26}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <MagneticButton
                    href={settings.primaryCta.href}
                    className="!bg-white !text-secondary hover:!bg-white/90"
                  >
                    {settings.primaryCta.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </MagneticButton>
                  <MagneticButton
                    href={settings.secondaryCta.href}
                    className="!border-white/30 !bg-transparent !text-white hover:!bg-white/10"
                  >
                    {settings.secondaryCta.label}
                  </MagneticButton>
                </div>
              </FadeIn>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/70 bg-mesh pb-14 pt-28 md:pb-16 md:pt-36",
        className
      )}
    >
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.12]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white" />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />
          <div className="pointer-events-none absolute -right-16 top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
        </>
      )}

      <div className="container-xl relative max-w-3xl">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="font-display text-3xl font-bold tracking-[-0.04em] text-secondary text-balance sm:text-4xl md:text-5xl md:leading-[1.08]">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-[0.975rem] leading-7 text-muted md:text-base md:leading-7">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
