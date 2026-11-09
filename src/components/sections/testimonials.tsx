"use client";

import { FadeIn, Stagger, StaggerItem } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { useCms } from "@/lib/cms/provider";

export function Testimonials() {
  const { homepage } = useCms();
  const testimonials = homepage.testimonials;
  if (!testimonials.length) return null;

  return (
    <section className="section-padding bg-surface">
      <div className="container-xl">
        <FadeIn>
          <SectionHeading
            eyebrow={homepage.testimonialsEyebrow}
            title={homepage.testimonialsTitle}
            align="left"
            accentBar
          />
        </FadeIn>
        <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <StaggerItem key={`${item.name}-${item.quote.slice(0, 24)}`}>
              <article className="pro-card flex h-full flex-col p-6 md:p-7">
                <p className="flex-1 text-sm leading-7 text-muted">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-6 border-t border-border pt-5">
                  <p className="font-display text-sm font-bold text-secondary">{item.name}</p>
                  {item.role ? <p className="mt-1 text-xs text-muted">{item.role}</p> : null}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
