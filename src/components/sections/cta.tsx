"use client";

import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionImage } from "@/components/ui/section-image";
import { useCms } from "@/lib/cms/provider";

export function CTA() {
  const { homepage } = useCms();
  const cta = homepage.cta;

  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-20">
      <SectionImage
        {...cta.image}
        className="absolute inset-0 opacity-20"
        sizes="100vw"
        overlay
        overlayClassName="bg-primary/70"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="container-xl relative">
        <FadeIn>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={cta.eyebrow}
              title={cta.title}
              align="left"
              light
              className="max-w-xl"
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <MagneticButton href={cta.primary.href} size="lg" strength={0.1} variant="on-primary">
                {cta.primary.label}
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href={cta.secondary.href} size="lg" strength={0.08} variant="on-dark">
                {cta.secondary.label}
              </MagneticButton>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
