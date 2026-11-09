"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionImage } from "@/components/ui/section-image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useCms } from "@/lib/cms/provider";

export function ValueProp() {
  const { homepage } = useCms();
  const valueProp = homepage.valueProp;

  return (
    <section className="section-padding bg-surface">
      <div className="container-xl grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <FadeIn direction="left" className="order-2 lg:order-1">
          <SectionHeading
            eyebrow={valueProp.eyebrow}
            title={valueProp.title}
            description={valueProp.body}
            align="left"
            accentBar
            wide
            className="max-w-none"
          />
          <div className="mt-8">
            <MagneticButton href={valueProp.cta.href} strength={0.1}>
              {valueProp.cta.label}
            </MagneticButton>
          </div>
        </FadeIn>
        <FadeIn direction="right" className="order-1 lg:order-2">
          <div className="relative">
            <div className="absolute -bottom-4 -left-4 right-8 top-8 rounded-2xl border border-primary/20 bg-primary/5" />
            <div className="relative overflow-hidden rounded-2xl shadow-float">
              <SectionImage
                {...valueProp.image}
                className="aspect-[5/4]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
