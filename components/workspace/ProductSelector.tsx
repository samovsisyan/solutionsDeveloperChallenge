"use client";

import type { Chair, Desk } from "@/types/workspace";
import { ProductCard } from "./ProductCard";

interface ProductSelectorProps<T extends Desk | Chair> {
  label: string;
  products: readonly T[];
  selectedId: T["id"];
  onSelect: (id: T["id"]) => void;
}

export function ProductSelector<T extends Desk | Chair>({
  label,
  products,
  selectedId,
  onSelect,
}: ProductSelectorProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-1 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:flex lg:flex-col lg:gap-2.5"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          selected={product.id === selectedId}
          onSelect={() => onSelect(product.id)}
        />
      ))}
    </div>
  );
}
