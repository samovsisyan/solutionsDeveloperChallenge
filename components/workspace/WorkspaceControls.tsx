"use client";

import type { ReactNode } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CHAIRS, DESKS, PRESETS } from "@/data/products";
import { isSameConfig, type WorkspaceController } from "@/hooks/useWorkspace";
import { formatPrice, getMonthlyTotal } from "@/lib/pricing";
import { AccessoriesSelector } from "./AccessoriesSelector";
import { AnimatedPrice } from "./AnimatedPrice";
import { ProductSelector } from "./ProductSelector";

interface WorkspaceControlsProps {
  workspace: WorkspaceController;
  onReview: () => void;
}

export function WorkspaceControls({ workspace, onReview }: WorkspaceControlsProps) {
  const { config, selectDesk, selectChair, setAccessory } = workspace;
  const accessoryCount = Object.values(config.accessories).filter((quantity) => quantity > 0).length;

  return (
    <div className="flex flex-col lg:max-h-[calc(100dvh-7rem)] lg:overflow-hidden lg:rounded-[28px] lg:bg-white/70 lg:shadow-[0_20px_60px_-35px_rgba(60,40,20,0.35)] lg:ring-1 lg:ring-black/5 lg:backdrop-blur-xl">
      <div className="flex flex-col gap-8 lg:overflow-y-auto lg:px-6 lg:pb-6 lg:pt-6">
        <PresetPicker workspace={workspace} />

        <Section step={1} title="Desk" hint="Choose one">
          <ProductSelector label="Desk" products={DESKS} selectedId={config.deskId} onSelect={selectDesk} />
        </Section>

        <Section step={2} title="Chair" hint="Choose one">
          <ProductSelector label="Chair" products={CHAIRS} selectedId={config.chairId} onSelect={selectChair} />
        </Section>

        <Section
          step={3}
          title="Accessories"
          hint={accessoryCount === 0 ? "Optional" : `${accessoryCount} added`}
        >
          {accessoryCount === 0 && (
            <p className="mb-3 rounded-2xl bg-jungle-soft/70 px-4 py-3 text-[13px] leading-snug text-jungle">
              Nothing added yet. Most nomads add a monitor and a lamp for long focus days.
            </p>
          )}
          <AccessoriesSelector quantities={config.accessories} onChange={setAccessory} />
        </Section>
      </div>

      <div className="hidden border-t border-line/80 bg-white/60 p-6 lg:block">
        <TotalBlock total={workspace.total} itemCount={workspace.lineItems.length} />
        <Button size="lg" className="mt-4 w-full" onClick={onReview}>
          Review Workspace
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

export function TotalBlock({ total, itemCount }: { total: number; itemCount: number }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">Monthly rental</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">
          <AnimatedPrice value={total} />
          <span className="text-base font-normal text-muted"> / month</span>
        </p>
      </div>
      <p className="pb-1 text-right text-xs leading-relaxed text-muted">
        {itemCount} items
        <br />
        Delivery &amp; setup included
      </p>
    </div>
  );
}

function Section({
  step,
  title,
  hint,
  children,
}: {
  step: number;
  title: string;
  hint: string;
  children: ReactNode;
}) {
  const headingId = `section-${title.toLowerCase()}`;
  return (
    <section aria-labelledby={headingId}>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 id={headingId} className="flex items-baseline gap-2.5 text-lg font-semibold tracking-tight text-ink">
          <span className="text-sm font-medium tabular-nums text-muted">0{step}</span>
          {title}
        </h3>
        <span className="text-[13px] text-muted">{hint}</span>
      </div>
      {children}
    </section>
  );
}

function PresetPicker({ workspace }: { workspace: WorkspaceController }) {
  return (
    <section aria-labelledby="presets-heading">
      <h3 id="presets-heading" className="mb-3 flex items-center gap-2 text-[13px] font-medium text-muted">
        <Sparkles className="size-4 text-jungle" aria-hidden="true" />
        Start from a popular setup
      </h3>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 lg:grid lg:grid-cols-3">
        {PRESETS.map((preset) => {
          const active = isSameConfig(preset.config, workspace.config);
          return (
            <button
              key={preset.id}
              type="button"
              aria-pressed={active}
              onClick={() => workspace.applyPreset(preset)}
              title={preset.description}
              className={`flex shrink-0 flex-col items-start rounded-2xl px-3.5 py-2.5 text-left transition-colors duration-200 ${
                active ? "bg-ink text-white" : "bg-white/60 text-ink ring-1 ring-line hover:bg-white"
              }`}
            >
              <span className="whitespace-nowrap text-[13px] font-semibold">{preset.name}</span>
              <span className={`text-xs tabular-nums ${active ? "text-white/70" : "text-muted"}`}>
                {formatPrice(getMonthlyTotal(preset.config))} / mo
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
