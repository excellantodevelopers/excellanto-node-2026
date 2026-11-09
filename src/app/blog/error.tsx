"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

interface BlogErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogError({ error, reset }: BlogErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section-padding bg-surface">
      <div className="container-xl">
        <div className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-border bg-white px-8 py-16 text-center">
          <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertCircle className="h-7 w-7" />
          </span>
          <h1 className="font-display text-xl font-bold text-secondary">Unable to load blog</h1>
          <p className="mt-3 text-sm leading-7 text-muted">
            Something went wrong while fetching articles. Please try again.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-secondary transition-colors hover:bg-surface"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
