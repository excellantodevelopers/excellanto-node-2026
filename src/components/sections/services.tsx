"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionImage } from "@/components/ui/section-image";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/fade-in";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { getServiceImage } from "@/lib/images";
import { useCms } from "@/lib/cms/provider";
import { getCmsIcon } from "@/lib/cms/icons";

export function Services() {
  const { homepage, services } = useCms();
  const copy = homepage.services;
  const featuredServices = services.filter((s) => s.featured);

  return (
    <section className="section-padding bg-white" id="services">
      <div className="container-xl">
        <FadeIn>
          <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={copy.eyebrow}
              title={copy.title}
              align="left"
              accentBar
              className="max-w-xl"
            />
            <p className="max-w-xs text-sm leading-7 text-muted md:pb-1 md:text-right">
              {copy.aside}
            </p>
          </div>
        </FadeIn>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => {
            const Icon = getCmsIcon(service.iconName);
            const featured = index === 0;
            const cardImage = (() => {
              const local = getServiceImage(service.slug);
              return local.src.startsWith("/images/services/") ? local : service.image;
            })();
            return (
              <StaggerItem
                key={service.slug}
                className={cn(featured && "sm:col-span-2 lg:col-span-2")}
              >
                <motion.article
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-border bg-secondary shadow-soft",
                    !featured && "min-h-[320px]"
                  )}
                >
                  <SectionImage
                    {...cardImage}
                    className="absolute inset-0"
                    sizes={
                      featured
                        ? "(max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 1024px) 50vw, 33vw"
                    }
                    imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                    overlay
                    overlayClassName="bg-gradient-to-t from-[#0b1220]/92 via-[#0b1220]/55 to-[#0b1220]/15"
                  />

                  <div className="relative z-10 flex flex-1 flex-col justify-end p-6 md:p-7">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:border-accent group-hover:bg-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
                      0{index + 1}
                    </p>
                    <h3
                      className={cn(
                        "font-display mt-2 font-bold tracking-tight text-white",
                        featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
                      )}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 text-sm leading-6 text-slate-300",
                        featured ? "max-w-xl line-clamp-3" : "line-clamp-2"
                      )}
                    >
                      {service.description}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-white"
                    >
                      {service.cardLinkLabel || copy.cardLink}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <FadeIn delay={0.1} className="mt-10 text-center md:text-left">
          <Link
            href={copy.viewMoreHref}
            className="inline-flex items-center gap-2 border-b border-secondary pb-1 text-sm font-bold text-secondary transition-colors hover:border-primary hover:text-primary"
          >
            {copy.viewMore}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
