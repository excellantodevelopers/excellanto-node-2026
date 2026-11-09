"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionImage } from "@/components/ui/section-image";
import { brandLogos } from "@/lib/images";
import { useCms } from "@/lib/cms/provider";
import { cn } from "@/lib/utils";

function BrandLogoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className={cn(
        "group relative flex h-[100px] w-[220px] shrink-0 items-center justify-center overflow-hidden rounded-2xl md:h-[112px] md:w-[260px]",
        "border border-white/10 bg-black/40 px-6 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.06)]",
        "transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:shadow-[0_16px_40px_-12px_rgb(56_189_248_/_0.35)]"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="relative z-10 max-h-14 w-auto max-w-full object-contain md:max-h-[4.25rem]"
      />
    </div>
  );
}

function MarqueeRow({
  logos,
  reverse = false,
  className,
}: {
  logos: { src: string; alt: string }[];
  reverse?: boolean;
  className?: string;
}) {
  const track = [...logos, ...logos];

  return (
    <div
      className={cn(
        "brand-marquee-viewport [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className
      )}
    >
      <div className={cn("flex w-max gap-5 md:gap-7", reverse ? "brand-marquee-track-reverse" : "brand-marquee-track")}>
        {track.map((logo, index) => (
          <BrandLogoCard key={`${logo.src}-${index}`} src={logo.src} alt={logo.alt} />
        ))}
      </div>
    </div>
  );
}

export function Brands() {
  const { homepage } = useCms();
  const brands = homepage.brands;
  const logos = brandLogos;
  const midpoint = Math.ceil(logos.length / 2);
  const bottomRow = logos.slice(midpoint);

  return (
    <section className="relative overflow-hidden bg-secondary py-20 md:py-24">
      <SectionImage
        {...brands.background}
        className="absolute inset-0 opacity-20"
        sizes="100vw"
        overlay
        overlayClassName="bg-[#0b1220]/82"
      />

      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent/15 blur-[100px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container-xl relative">
        <FadeIn>
          <SectionHeading
            eyebrow={brands.eyebrow}
            title={brands.title}
            align="center"
            light
            className="mx-auto"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative mt-14 space-y-6 md:mt-16 md:space-y-7">
            <div className="pointer-events-none absolute inset-x-8 inset-y-4 rounded-3xl bg-gradient-to-b from-primary/10 via-transparent to-accent/10 blur-2xl" />
            <MarqueeRow logos={bottomRow.length ? bottomRow : logos} reverse />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
