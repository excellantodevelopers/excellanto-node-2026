import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold tracking-[-0.01em] transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-[0_1px_2px_rgb(15_23_42_/_0.08),0_8px_20px_-8px_rgb(29_78_216_/_0.55)] hover:bg-primary-dark active:translate-y-px",
        secondary:
          "border border-border bg-white text-secondary hover:border-slate-300 hover:bg-surface shadow-[0_1px_2px_rgb(15_23_42_/_0.04)]",
        ghost: "text-secondary hover:bg-surface hover:text-primary",
        dark: "bg-secondary text-white hover:bg-[#152033] shadow-soft",
        "hero-primary":
          "rounded-full border-0 bg-gradient-to-b from-[#dbeafe] to-[#7dd3fc] text-sm font-semibold text-slate-900 shadow-[0_0_32px_rgba(56,189,248,0.4)] hover:from-white hover:to-sky-200",
        "hero-secondary":
          "rounded-full border border-white/25 bg-white/[0.04] text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/[0.08]",
        "on-dark":
          "border border-white/35 bg-transparent text-white hover:bg-white/10",
        "on-primary":
          "bg-white text-secondary hover:bg-white/90 shadow-[0_8px_24px_-8px_rgb(15_23_42_/_0.25)]",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3.5 text-xs",
        lg: "h-12 px-7 text-[0.9375rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
