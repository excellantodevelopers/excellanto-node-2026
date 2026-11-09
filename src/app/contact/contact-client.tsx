"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  MessageSquareText,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionImage } from "@/components/ui/section-image";
import { useCms } from "@/lib/cms/provider";
import type { CmsContact } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

export function ContactClient({ page }: { page: CmsContact }) {
  const { settings } = useCms();
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        image={page.heroImage}
      />

      <section className="relative overflow-hidden section-padding">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_0%_0%,rgb(29_78_216_/_0.06),transparent_55%),radial-gradient(ellipse_60%_40%_at_100%_100%,rgb(8_145_178_/_0.07),transparent_50%)]" />
        <div className="container-xl relative grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <FadeIn direction="left">
            <div className="relative overflow-hidden">
              <SectionImage
                {...page.officeImage}
                className="aspect-[16/11] w-full"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1220]/90 via-[#0b1220]/45 to-transparent p-6 pt-16">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  {page.infoEyebrow}
                </p>
                <p className="font-display mt-2 text-xl font-bold text-white">
                  {page.infoTitle}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-0 border-t border-border">
              {[
                {
                  icon: MapPin,
                  label: page.addressLabel,
                  value: settings.address,
                  href: undefined as string | undefined,
                },
                {
                  icon: Phone,
                  label: page.phoneLabel,
                  value: `${settings.phone}  ·  ${settings.phoneSecondary}`,
                  href: `tel:${settings.phone.replace(/\s/g, "")}`,
                },
                {
                  icon: Mail,
                  label: page.emailLabel,
                  value: `${settings.email}  ·  ${settings.emailSecondary}`,
                  href: `mailto:${settings.email}`,
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "group flex items-start gap-4 border-b border-border py-5 transition-colors",
                    item.href ? "hover:bg-white/60" : "pointer-events-none"
                  )}
                >
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-white text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary group-hover:text-white">
                    <item.icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {item.label}
                    </span>
                    <span className="mt-1.5 block text-sm font-semibold leading-6 text-secondary">
                      {item.value}
                    </span>
                  </span>
                  {item.href ? (
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  ) : null}
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="relative border border-border bg-white/90 p-6 backdrop-blur-sm md:p-9">
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative">
                <div className="mb-8 flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center bg-secondary text-white">
                    <MessageSquareText className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                      {page.formEyebrow}
                    </p>
                    <h2 className="font-display mt-1.5 text-2xl font-bold tracking-tight text-secondary md:text-3xl">
                      {page.formTitle}
                    </h2>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex flex-col items-center py-14 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0.7 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 320, damping: 18 }}
                        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success"
                      >
                        <CheckCircle2 className="h-8 w-8" />
                      </motion.div>
                      <h3 className="font-display text-2xl font-bold tracking-tight text-secondary">
                        {page.successTitle}
                      </h3>
                      <p className="mt-3 max-w-sm text-sm leading-7 text-muted">
                        {page.successBody}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                      >
                        {page.successResetLabel}
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      noValidate
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          label={page.firstNameLabel}
                          id="first"
                          required
                          focused={focused === "first"}
                          onFocus={() => setFocused("first")}
                          onBlur={() => setFocused(null)}
                        />
                        <Field
                          label={page.lastNameLabel}
                          id="last"
                          required
                          focused={focused === "last"}
                          onFocus={() => setFocused("last")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                      <Field
                        label={page.emailFieldLabel}
                        id="email"
                        type="email"
                        required
                        focused={focused === "email"}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                      />
                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"
                        >
                          {page.messageLabel}
                        </label>
                        <div
                          className={cn(
                            "relative border bg-surface transition-all duration-200",
                            focused === "message"
                              ? "border-primary/50 shadow-[0_0_0_4px_rgb(29_78_216_/_0.08)]"
                              : "border-border"
                          )}
                        >
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            onFocus={() => setFocused("message")}
                            onBlur={() => setFocused(null)}
                            placeholder=""
                            className="w-full resize-none bg-transparent px-4 py-3.5 text-sm leading-6 text-secondary outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-end">
                        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                          <Button type="submit" size="lg" className="min-w-[10.5rem]">
                            {page.submitLabel}
                            <Send className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  id,
  type = "text",
  required,
  focused,
  onFocus,
  onBlur,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"
      >
        {label}
      </label>
      <div
        className={cn(
          "relative border bg-surface transition-all duration-200",
          focused
            ? "border-primary/50 shadow-[0_0_0_4px_rgb(29_78_216_/_0.08)]"
            : "border-border"
        )}
      >
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          onFocus={onFocus}
          onBlur={onBlur}
          className="h-12 w-full bg-transparent px-4 text-sm text-secondary outline-none placeholder:text-muted/55"
        />
      </div>
    </div>
  );
}
