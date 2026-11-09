"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPost } from "@/lib/sanity/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionImage } from "@/components/ui/section-image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { FadeIn } from "@/components/animations/fade-in";
import { useCms } from "@/lib/cms/provider";
import { cn } from "@/lib/utils";

interface BlogPreviewProps {
  posts: BlogPost[];
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
  }),
};

function BlogSlide({
  post,
  readMoreLabel,
  index,
  total,
}: {
  post: BlogPost;
  readMoreLabel: string;
  index: number;
  total: number;
}) {
  return (
    <article className="grid overflow-hidden rounded-3xl border border-border bg-white shadow-float lg:grid-cols-2 lg:items-stretch">
      <Link
        href={`/blog/${post.slug}`}
        className="group relative block min-h-[240px] overflow-hidden sm:min-h-[280px] lg:min-h-full"
      >
        <SectionImage
          {...post.image}
          className="absolute inset-0 h-full min-h-[240px] w-full sm:min-h-[280px]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={index === 0}
          imgClassName="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1220]/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0b1220]/10" />
        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#0b1220]/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </Link>

      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10 xl:p-12">
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted">
          <span className="rounded-md bg-primary/10 px-2.5 py-1 font-semibold uppercase tracking-[0.08em] text-primary">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {post.date}
          </span>
        </div>

        <h3 className="font-display mt-5 text-2xl font-bold tracking-tight text-secondary md:text-[1.75rem] md:leading-tight lg:text-3xl">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-4 text-[0.975rem] leading-7 text-muted line-clamp-4 md:text-base md:leading-8">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.05] px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary/35 hover:bg-primary/10"
        >
          {readMoreLabel}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const { homepage } = useCms();
  const copy = homepage.blogPreview;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = posts.length;

  const goTo = useCallback(
    (index: number, dir: number) => {
      if (total === 0) return;
      setDirection(dir);
      setActiveIndex((index + total) % total);
    },
    [total]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1, 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1, -1), [activeIndex, goTo]);

  useEffect(() => {
    if (total <= 1 || paused) return;
    const timer = window.setInterval(goNext, 8000);
    return () => window.clearInterval(timer);
  }, [goNext, total, paused]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  if (!posts.length) return null;

  const activePost = posts[activeIndex];

  return (
    <section className="section-padding bg-surface" id="blog">
      <div className="container-xl">
        <FadeIn>
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
            <SectionHeading
              eyebrow={copy.eyebrow}
              title={copy.title}
              align="left"
              accentBar
              wide
              className="max-w-xl"
            />

            <div className="flex flex-wrap items-center gap-3 lg:mb-1 lg:justify-end">
              {total > 1 ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous article"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-secondary shadow-soft transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next article"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-secondary shadow-soft transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              ) : null}
              <MagneticButton href="/blog" strength={0.08} className="!w-full sm:!w-auto">
                {copy.linkLabel}
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </FadeIn>

        <div
          className="relative mt-10 lg:mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            {activePost ? (
              <motion.div
                key={activePost.slug}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                drag={total > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -72) goNext();
                  else if (info.offset.x > 72) goPrev();
                }}
              >
                <BlogSlide
                  post={activePost}
                  readMoreLabel={copy.linkLabel}
                  index={activeIndex}
                  total={total}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {total > 1 ? (
          <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2">
              {posts.map((post, index) => (
                <button
                  key={post.slug}
                  type="button"
                  aria-label={`Go to article ${index + 1}`}
                  onClick={() => goTo(index, index > activeIndex ? 1 : -1)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-border hover:bg-primary/40"
                  )}
                />
              ))}
            </div>

            <p className="hidden max-w-md truncate text-sm text-muted sm:block">
              {activePost?.title}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
