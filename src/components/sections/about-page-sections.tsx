"use client";

import type { ReactNode } from "react";
import { CheckCircle2, Eye, Shield, Target } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionImage } from "@/components/ui/section-image";
import type { CmsAbout } from "@/lib/cms/types";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/utils";

const mvvIcons = [Target, Eye, Shield];

function splitBodySentences(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()) ?? [];
  return sentences.length > 0 ? sentences : [text];
}

function SectionShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn("section-padding", className)}>{children}</section>;
}

function FeatureImage({ image, className }: { image: SiteImage; className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-float">
        <SectionImage
          {...image}
          unoptimized
          className="aspect-[4/3] w-full lg:aspect-[5/4]"
          sizes="(max-width: 1024px) 100vw, 46vw"
          imgClassName="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}

interface AboutPageSectionsProps {
  about: CmsAbout;
}

export function AboutPageSections({ about }: AboutPageSectionsProps) {
  const pillars = [about.mission, about.vision, about.values];
  const strengthPoints = splitBodySentences(about.strengthsBody);
  const strengthLead = strengthPoints[0] ?? about.strengthsBody;
  const strengthBullets = strengthPoints.length > 1 ? strengthPoints.slice(1) : [];

  return (
    <>
      {/* Mission · Vision · Values */}
      <SectionShell className="bg-surface !pt-14 md:!pt-16">
        <div className="container-xl">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <div className="ui-accent-bar mx-auto mb-5" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                {about.eyebrow}
              </p>
            </div>
          </FadeIn>

          <Stagger className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6 lg:mt-12">
            {pillars.map((item, i) => {
              const Icon = mvvIcons[i] ?? Target;
              return (
                <StaggerItem key={item.title}>
                  <article className="pro-card group flex h-full flex-col p-7 md:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-display text-3xl font-bold tracking-tight text-border transition-colors group-hover:text-primary">
                        0{i + 1}
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h2 className="font-display mt-6 text-xl font-bold tracking-tight text-secondary">
                      {item.title}
                    </h2>
                    <p className="mt-4 flex-1 text-[0.975rem] leading-7 text-muted md:text-base md:leading-8">
                      {item.body}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </SectionShell>

      {/* Our Strengths */}
      <SectionShell className="bg-white">
        <div className="container-xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <FadeIn direction="left" className="order-2 lg:order-1">
              <FeatureImage image={about.strengthsImage} />
            </FadeIn>

            <FadeIn direction="right" className="order-1 flex flex-col justify-center lg:order-2">
              <SectionHeading
                eyebrow={about.strengthsEyebrow}
                title={about.strengthsTitle}
                align="left"
                accentBar
                wide
                className="max-w-xl"
              />
              <p className="mt-6 max-w-xl text-base font-medium leading-8 text-secondary md:text-[1.0625rem] md:leading-8">
                {strengthLead}
              </p>
              {strengthBullets.length > 0 ? (
                <ul className="mt-8 max-w-xl space-y-4">
                  {strengthBullets.map((point) => (
                    <li key={point} className="flex items-start gap-3.5">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-[0.975rem] leading-7 text-muted md:text-base md:leading-8">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </FadeIn>
          </div>
        </div>
      </SectionShell>

      {/* Technology & Innovation */}
      <SectionShell className="bg-surface">
        <div className="container-xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <FadeIn direction="left" className="flex flex-col justify-center">
              <SectionHeading
                eyebrow={about.techEyebrow}
                title={about.techTitle}
                description={about.techBody}
                align="left"
                accentBar
                wide
                className="max-w-xl"
              />
              <ul className="mt-8 max-w-xl space-y-3">
                {about.techHighlights.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 rounded-xl border border-border bg-white px-5 py-4 shadow-soft transition-colors hover:border-primary/25"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-xs font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-secondary md:text-[0.9375rem]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn direction="right">
              <FeatureImage image={about.techImage} />
            </FadeIn>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
