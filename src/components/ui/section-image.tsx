import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/lib/images";

interface SectionImageProps extends SiteImage {
  className?: string;
  imgClassName?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  unoptimized?: boolean;
  overlay?: boolean;
  overlayClassName?: string;
}

export function SectionImage({
  src,
  alt,
  className,
  imgClassName,
  fill = true,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  quality = 90,
  unoptimized = false,
  overlay = false,
  overlayClassName,
}: SectionImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          unoptimized={unoptimized}
          className={cn("object-cover", imgClassName)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width ?? 1200}
          height={height ?? 800}
          sizes={sizes}
          priority={priority}
          quality={quality}
          unoptimized={unoptimized}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      )}
      {overlay && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/30 to-transparent",
            overlayClassName
          )}
        />
      )}
    </div>
  );
}
