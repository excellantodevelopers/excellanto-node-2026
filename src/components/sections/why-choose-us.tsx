"use client";

import { FadeIn, Stagger, StaggerItem } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionImage } from "@/components/ui/section-image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { getCmsIcon } from "@/lib/cms/icons";
import { useCms } from "@/lib/cms/provider";

export function WhyChooseUs() {
  const { homepage } = useCms();
  const why = homepage.why;

  return (
    <section className="section-padding bg-white">
      <div className="container-xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <FadeIn direction="left">
            <div className="sticky top-28">
              <SectionHeading
                eyebrow={why.eyebrow}
                title={why.title}
                description={why.body}
                align="left"
                accentBar
                wide
                className="max-w-none"
              />
              <div className="mt-8 overflow-hidden rounded-2xl shadow-soft">
                <SectionImage
                  {...why.image}
                  className="aspect-[4/3]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="mt-8">
                <MagneticButton href={why.cta.href} strength={0.1}>
                  {why.cta.label}
                </MagneticButton>
              </div>
            </div>
          </FadeIn>

          <Stagger className="space-y-0">
            {why.cards.map((item, i) => {
              const Icon = getCmsIcon(item.iconName);
              return (
                <StaggerItem key={item.title}>
                  <div className="group grid gap-4 rounded-2xl border-t border-border py-7 transition-colors hover:bg-surface/60 md:grid-cols-[4.5rem_1fr] md:gap-6 md:px-4">
                    <div className="flex items-start gap-3 md:block">
                      <span className="font-display text-3xl font-bold tracking-tight text-border transition-colors group-hover:text-primary">
                        0{i + 1}
                      </span>
                    </div>
                    <div>
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-border text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                        <Icon className="h-[18px] w-[18px]" />
                      </div>
                      <h3 className="font-display text-lg font-bold tracking-tight text-secondary">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
