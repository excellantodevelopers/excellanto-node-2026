import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { BlogContentBlock } from "@/lib/sanity/types";
import Image from "next/image";
import { buildSanityImageUrl } from "@/lib/sanity/image";
const components: PortableTextComponents = {

  block: {

    normal: ({ children }) => (

      <p className="text-[1.0625rem] leading-8 text-muted">{children}</p>

    ),

    h2: ({ children }) => (

      <div className="mt-12 mb-5 scroll-mt-28">

        <span className="mb-3 block h-0.5 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />

        <h2 className="font-display text-2xl font-bold tracking-tight text-secondary md:text-[1.75rem]">

          {children}

        </h2>

      </div>

    ),

    h3: ({ children }) => (

      <h3 className="font-display mt-8 mb-3 scroll-mt-28 text-xl font-bold tracking-tight text-secondary">

        {children}

      </h3>

    ),

    h4: ({ children }) => (

      <h4 className="font-display mt-6 mb-2 text-lg font-semibold tracking-tight text-secondary">

        {children}

      </h4>

    ),

    blockquote: ({ children }) => (

      <blockquote className="blog-detail-quote my-8 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.05] via-white to-accent/[0.04] px-6 py-5 text-base italic leading-8 text-secondary/85 md:px-8 md:py-6">

        {children}

      </blockquote>

    ),

  },

  list: {

    bullet: ({ children }) => (

      <ul className="blog-detail-list my-6 space-y-3 pl-1 text-muted">{children}</ul>

    ),

    number: ({ children }) => (

      <ol className="blog-detail-list blog-detail-list-ordered my-6 space-y-3 pl-1 text-muted">

        {children}

      </ol>

    ),

  },

  listItem: {

    bullet: ({ children }) => (

      <li className="flex gap-3 text-[1.0625rem] leading-8">

        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-primary to-accent" />

        <span>{children}</span>

      </li>

    ),

    number: ({ children }) => (

      <li className="text-[1.0625rem] leading-8 marker:font-semibold marker:text-primary">

        {children}

      </li>

    ),

  },

  marks: {

    strong: ({ children }) => (

      <strong className="font-semibold text-secondary">{children}</strong>

    ),

    em: ({ children }) => <em className="text-secondary/90">{children}</em>,

    link: ({ value, children }) => {

      const href = value?.href || "#";

      const external = href.startsWith("http");

      return (

        <a

          href={href}

          className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary-dark hover:decoration-primary"

          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}

        >

          {children}

        </a>

      );

    },

  },

  types: {

    image: ({ value }) => {

      if (!value?.asset) return null;

      const src = buildSanityImageUrl(value, 1200, { quality: 85 });

      const alt = value.alt || "Blog image";

      return (

        <figure className="my-10 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_20px_40px_-28px_rgb(15_23_42_/_0.18)]">

          <Image

            src={src}

            alt={alt}

            width={1200}

            height={675}

            className="h-auto w-full object-cover"

            sizes="(max-width: 768px) 100vw, 768px"

          />

          {value.alt ? (

            <figcaption className="border-t border-border px-4 py-3 text-xs text-muted">

              {value.alt}

            </figcaption>

          ) : null}

        </figure>

      );

    },

    externalImage: ({ value }) => {

      if (!value?.url) return null;

      const alt = value.alt || "Blog image";

      return (

        <figure className="my-10 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_20px_40px_-28px_rgb(15_23_42_/_0.18)]">

          <Image

            src={value.url}

            alt={alt}

            width={1200}

            height={675}

            className="h-auto w-full object-cover"

            sizes="(max-width: 768px) 100vw, 768px"

          />

          {value.alt ? (

            <figcaption className="border-t border-border px-4 py-3 text-xs text-muted">

              {value.alt}

            </figcaption>

          ) : null}

        </figure>

      );

    },

  },

};



interface BlogPortableTextProps {
  value: BlogContentBlock[];
}



export function BlogPortableText({ value }: BlogPortableTextProps) {

  if (!value?.length) return null;

  return (

    <div className="blog-portable-text space-y-6">

      <PortableText value={value as never} components={components} />
    </div>

  );

}

