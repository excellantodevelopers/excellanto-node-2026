"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MessageSquareText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function QueryField({
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
        className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-muted"
      >
        {label}
      </label>
      <div
        className={cn(
          "relative rounded-xl border bg-white transition-all duration-200",
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
          className="h-11 w-full rounded-xl bg-transparent px-3.5 text-sm text-secondary outline-none placeholder:text-muted/50"
        />
      </div>
    </div>
  );
}

export function BlogQueryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="blog-sidebar-card relative overflow-hidden">
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-white">
            <MessageSquareText className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
              Let&apos;s Talk
            </p>
            <h2 className="font-display mt-1 text-lg font-bold tracking-tight text-secondary">
              Have a Question?
            </h2>
          </div>
        </div>

        <p className="mb-5 text-sm leading-6 text-muted">
          Have questions about this topic or need expert guidance? Talk to our team.
        </p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col items-center py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0.75 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success"
              >
                <CheckCircle2 className="h-7 w-7" />
              </motion.div>
              <h3 className="font-display text-lg font-bold text-secondary">Query received</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Our team will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                Send another query
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onSubmit={handleSubmit}
              className="space-y-3.5"
              noValidate
            >
              <QueryField
                label="Name"
                id="blog-query-name"
                required
                focused={focused === "name"}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
              />
              <QueryField
                label="Email"
                id="blog-query-email"
                type="email"
                required
                focused={focused === "email"}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
              />
              <QueryField
                label="Phone Number"
                id="blog-query-phone"
                type="tel"
                required
                focused={focused === "phone"}
                onFocus={() => setFocused("phone")}
                onBlur={() => setFocused(null)}
              />
              <div>
                <label
                  htmlFor="blog-query-comment"
                  className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-muted"
                >
                  Comment
                </label>
                <div
                  className={cn(
                    "rounded-xl border bg-white transition-all duration-200",
                    focused === "comment"
                      ? "border-primary/50 shadow-[0_0_0_4px_rgb(29_78_216_/_0.08)]"
                      : "border-border"
                  )}
                >
                  <textarea
                    id="blog-query-comment"
                    name="comment"
                    required
                    rows={4}
                    onFocus={() => setFocused("comment")}
                    onBlur={() => setFocused(null)}
                    className="w-full resize-none rounded-xl bg-transparent px-3.5 py-3 text-sm leading-6 text-secondary outline-none"
                  />
                </div>
              </div>

              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className="pt-1">
                <Button type="submit" size="lg" className="w-full rounded-xl">
                  Send Query
                  <Send className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
