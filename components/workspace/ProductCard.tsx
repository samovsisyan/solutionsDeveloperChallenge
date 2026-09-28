"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/pricing";
import type { Chair, Desk } from "@/types/workspace";
import { ProductThumbnail } from "./scene/ProductThumbnail";

interface ProductCardProps {
  product: Desk | Chair;
  selected: boolean;
  onSelect: () => void;
}

export function ProductCard({ product, selected, onSelect }: ProductCardProps) {
  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex w-[212px] shrink-0 snap-start flex-col gap-3 rounded-3xl p-2.5 text-left transition-[background-color,box-shadow] duration-200 md:w-auto lg:flex-row lg:items-center lg:gap-4 ${
        selected
          ? "bg-white shadow-[0_12px_32px_-18px_rgba(29,27,24,0.55)] ring-2 ring-ink"
          : "bg-white/55 ring-1 ring-line hover:bg-white hover:ring-ink/20"
      }`}
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl bg-gradient-to-b from-[#F4EEE6] to-[#EADFD0] lg:aspect-square lg:w-22">
        <ProductThumbnail
          product={product}
          className="absolute inset-0 size-full p-3 transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>

      <div className="min-w-0 flex-1 px-1 pb-1 lg:px-0 lg:pb-0 lg:pr-7">
        <h4 className="text-[15px] font-semibold leading-snug text-ink">{product.name}</h4>
        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-muted">{product.tagline}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold text-ink">
            {formatPrice(product.monthlyPrice)}
            <span className="font-normal text-muted"> / mo</span>
          </span>
          {product.badge && <Badge tone="accent">{product.badge}</Badge>}
        </div>
      </div>

      <SelectionIndicator selected={selected} />
    </motion.button>
  );
}

function SelectionIndicator({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute right-4 top-4 flex size-6 items-center justify-center rounded-full transition-colors duration-200 lg:right-3 lg:top-3 ${
        selected ? "bg-ink text-white" : "bg-white/90 ring-1 ring-line"
      }`}
    >
      <AnimatePresence initial={false}>
        {selected && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          >
            <Check className="size-3.5" strokeWidth={3} />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
