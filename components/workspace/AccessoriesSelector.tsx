"use client";

import { motion } from "framer-motion";
import { ACCESSORIES } from "@/data/products";
import { formatPrice } from "@/lib/pricing";
import type { Accessory, AccessoryId, AccessoryQuantities } from "@/types/workspace";
import { QuantityControl } from "./QuantityControl";
import { ProductThumbnail } from "./scene/ProductThumbnail";

interface AccessoriesSelectorProps {
  quantities: AccessoryQuantities;
  onChange: (id: AccessoryId, quantity: number) => void;
}

export function AccessoriesSelector({ quantities, onChange }: AccessoriesSelectorProps) {
  return (
    <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-1">
      {ACCESSORIES.map((accessory) => (
        <li key={accessory.id}>
          {accessory.maxQuantity > 1 ? (
            <MultiQuantityRow
              accessory={accessory}
              quantity={quantities[accessory.id]}
              onChange={(quantity) => onChange(accessory.id, quantity)}
            />
          ) : (
            <ToggleRow
              accessory={accessory}
              active={quantities[accessory.id] > 0}
              onToggle={() => onChange(accessory.id, quantities[accessory.id] > 0 ? 0 : 1)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

function rowClasses(active: boolean) {
  return `rounded-3xl p-2.5 transition-[background-color,box-shadow] duration-200 ${
    active ? "bg-white ring-2 ring-ink shadow-[0_12px_32px_-18px_rgba(29,27,24,0.55)]" : "bg-white/55 ring-1 ring-line"
  }`;
}

function AccessoryInfo({ accessory, priceSuffix = "" }: { accessory: Accessory; priceSuffix?: string }) {
  return (
    <>
      <span className="relative size-14 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-b from-[#F4EEE6] to-[#EADFD0]">
        <ProductThumbnail product={accessory} className="absolute inset-0 size-full p-1.5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold leading-snug text-ink">{accessory.name}</span>
        <span className="block truncate text-[13px] text-muted">{accessory.tagline}</span>
      </span>
      <span className="shrink-0 text-right text-sm font-semibold text-ink">
        +{formatPrice(accessory.monthlyPrice)}
        <span className="block text-[11px] font-normal text-muted">/ mo{priceSuffix}</span>
      </span>
    </>
  );
}

function ToggleRow({
  accessory,
  active,
  onToggle,
}: {
  accessory: Accessory;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={active}
      aria-label={`${accessory.name}, ${formatPrice(accessory.monthlyPrice)} per month`}
      onClick={onToggle}
      whileTap={{ scale: 0.985 }}
      className={`flex w-full items-center gap-3 text-left hover:bg-white ${rowClasses(active)}`}
    >
      <AccessoryInfo accessory={accessory} />
      <Switch on={active} />
    </motion.button>
  );
}

function Switch({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ${
        on ? "justify-end bg-jungle" : "justify-start bg-ink/15"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 600, damping: 34 }}
        className="size-6 rounded-full bg-white shadow-sm"
      />
    </span>
  );
}

function MultiQuantityRow({
  accessory,
  quantity,
  onChange,
}: {
  accessory: Accessory;
  quantity: number;
  onChange: (quantity: number) => void;
}) {
  return (
    <div className={rowClasses(quantity > 0)}>
      <div className="flex items-center gap-3">
        <AccessoryInfo accessory={accessory} priceSuffix=" each" />
      </div>
      <div className="mt-2.5">
        <QuantityControl
          label={`${accessory.name} quantity`}
          value={quantity}
          max={accessory.maxQuantity}
          onChange={onChange}
          optionLabels={accessory.quantityLabels}
        />
      </div>
    </div>
  );
}
