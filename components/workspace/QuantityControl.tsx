"use client";

import { useId } from "react";
import { motion } from "framer-motion";

interface QuantityControlProps {
  label: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
  optionLabels?: readonly string[];
}

export function QuantityControl({ label, value, max, onChange, optionLabels }: QuantityControlProps) {
  const pillId = useId();
  const options = Array.from({ length: max + 1 }, (_, quantity) => quantity);

  return (
    <div role="group" aria-label={label} className="flex w-full rounded-full bg-ink/[0.05] p-1">
      {options.map((quantity) => {
        const active = quantity === value;
        return (
          <button
            key={quantity}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(quantity)}
            className={`relative h-9 flex-1 rounded-full text-[13px] font-semibold transition-colors ${
              active ? "text-white" : "text-ink/60 hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId={pillId}
                className="absolute inset-0 rounded-full bg-ink shadow-sm"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{optionLabels?.[quantity] ?? quantity}</span>
          </button>
        );
      })}
    </div>
  );
}
