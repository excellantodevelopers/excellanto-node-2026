import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
  accentBar?: boolean;
  wide?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
  accentBar = false,
  wide = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        wide ? "max-w-3xl" : "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {accentBar && align === "left" ? (
        <div className="ui-accent-bar mb-5" />
      ) : null}
      {eyebrow && (
        <p
          className={cn(
            accentBar
              ? "mb-4 text-[11px] font-semibold uppercase tracking-[0.16em]"
              : "eyebrow mb-4",
            align === "center" && (accentBar ? "text-center" : "justify-center"),
            light ? "text-accent" : "text-primary"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-[1.75rem] font-bold tracking-[-0.035em] text-balance sm:text-3xl md:text-4xl md:leading-[1.12]",
          light ? "text-white" : "text-secondary"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-[0.975rem] leading-7 md:text-base md:leading-8",
            light ? "text-white/65" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
