"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
  duration?: number;
  light?: boolean;
}

export function AnimatedCounter({
  value,
  suffix = "",
  label,
  className,
  duration = 1.8,
  light = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <motion.div
      ref={ref}
      className={cn("text-center", className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p
        className={cn(
          "font-display text-4xl font-bold tracking-tight md:text-5xl",
          light ? "text-white" : "text-secondary"
        )}
      >
        {count}
        <span className={light ? "text-accent" : "gradient-text"}>{suffix}</span>
      </p>
      <p
        className={cn(
          "mt-2 text-sm font-medium md:text-base",
          light ? "text-slate-400" : "text-muted"
        )}
      >
        {label}
      </p>
    </motion.div>
  );
}
