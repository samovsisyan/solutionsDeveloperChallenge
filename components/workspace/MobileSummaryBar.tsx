"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedPrice } from "./AnimatedPrice";

interface MobileSummaryBarProps {
  total: number;
  actionLabel: string;
  onAction: () => void;
}

export function MobileSummaryBar({ total, actionLabel, onAction }: MobileSummaryBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3 rounded-[26px] bg-white/85 p-2.5 pl-5 shadow-[0_20px_50px_-20px_rgba(29,27,24,0.45)] ring-1 ring-black/5 backdrop-blur-xl">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">Monthly</p>
          <p className="text-xl font-semibold tracking-tight text-ink">
            <AnimatedPrice value={total} />
            <span className="text-sm font-normal text-muted"> / mo</span>
          </p>
        </div>
        <Button size="lg" onClick={onAction}>
          {actionLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
