import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";

interface BlogEmptyStateProps {
  message: string;
}

export function BlogEmptyState({ message }: BlogEmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-dashed border-border bg-white px-8 py-16 text-center">
      <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Newspaper className="h-7 w-7" />
      </span>
      <p className="text-sm leading-7 text-muted">{message}</p>
      <Link
        href="/contact"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
      >
        Contact us for updates
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
