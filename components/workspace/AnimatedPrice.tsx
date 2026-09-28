"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { formatPrice } from "@/lib/pricing";

export function AnimatedPrice({ value, className = "" }: { value: number; className?: string }) {
  const motionValue = useMotionValue(value);
  const display = useTransform(motionValue, (latest) => formatPrice(Math.round(latest)));

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [motionValue, value]);

  return (
    <span className={`tabular-nums ${className}`}>
      <motion.span aria-hidden="true">{display}</motion.span>
      <span className="sr-only">{formatPrice(value)}</span>
    </span>
  );
}
