"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCms } from "@/lib/cms/provider";
import { getCmsIcon } from "@/lib/cms/icons";

interface ServicesMegaMenuProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  light?: boolean;
}

export function ServicesMegaMenu({
  open,
  onClose,
  onOpen,
  light = false,
}: ServicesMegaMenuProps) {
  const { settings, services, categories, homepage } = useCms();
  const servicesLabel =
    settings.navLinks.find((link) => link.mega)?.label || settings.footerServicesTitle;

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <Link
        href="/services"
        className={cn(
          "relative inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-bold tracking-[-0.01em] transition-colors",
          open
            ? light
              ? "text-white"
              : "text-primary"
            : light
              ? "text-white/80 hover:text-white"
              : "text-secondary/75 hover:text-secondary"
        )}
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={onOpen}
      >
        {servicesLabel}
        <motion.svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="opacity-70"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
        {open && (
          <motion.span
            layoutId="nav-pill"
            className={cn(
              "absolute inset-0 -z-10 rounded-lg",
              light ? "bg-white/15" : "bg-primary/[0.07]"
            )}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
          />
        )}
      </Link>

      <AnimatePresence>
        {open && (
          <>
            <div className="absolute left-1/2 top-full h-3 w-screen -translate-x-1/2" />

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-[4.25rem] z-50 hidden px-4 lg:block"
              role="menu"
              aria-label={settings.megaMenuAria}
            >
              <div className="mx-auto max-w-[1160px] overflow-hidden rounded-2xl border border-border bg-white/97 shadow-float backdrop-blur-xl">
                <div className="grid lg:grid-cols-[1fr_220px]">
                  <div className="grid gap-0 p-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-1 xl:p-6">
                    {categories.map((category) => {
                      const items = services.filter((s) => s.category === category.id);
                      return (
                        <div key={category.id} className="px-2 py-2">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                            {category.title}
                          </p>
                          <ul className="space-y-0.5">
                            {items.map((service) => {
                              const Icon = getCmsIcon(service.iconName);
                              return (
                                <li key={service.slug}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    role="menuitem"
                                    onClick={onClose}
                                    className="group flex gap-2.5 rounded-xl p-2 transition-colors hover:bg-surface"
                                  >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-primary transition-colors group-hover:border-primary/20 group-hover:bg-primary group-hover:text-white">
                                      <Icon className="h-[16px] w-[16px]" />
                                    </span>
                                    <span className="min-w-0">
                                      <span className="block text-[13px] font-semibold tracking-tight text-secondary group-hover:text-primary">
                                        {service.title}
                                      </span>
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  <aside className="relative overflow-hidden border-t border-border bg-secondary p-6 text-white lg:border-l lg:border-t-0">
                    <div className="relative flex h-full flex-col">
                      <h3 className="font-display text-base font-bold leading-snug tracking-tight">
                        {homepage.cta.title}
                      </h3>
                      <div className="mt-auto space-y-3 pt-8">
                        <Link
                          href="/services"
                          onClick={onClose}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-white"
                        >
                          {settings.viewMore}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                          href={settings.headerCta.href}
                          onClick={onClose}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-secondary transition-colors hover:bg-white/95"
                        >
                          {settings.headerCta.label}
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                        <a
                          href={`tel:${settings.phone.replace(/\s/g, "")}`}
                          className="block text-center text-xs text-slate-400 hover:text-white"
                        >
                          {settings.phone}
                        </a>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
