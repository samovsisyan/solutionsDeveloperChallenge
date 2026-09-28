"use client";

import { ArrowLeft, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DELIVERY_AREAS, type DeliveryArea } from "@/data/products";
import type { WorkspaceController } from "@/hooks/useWorkspace";
import { formatPrice } from "@/lib/pricing";
import type { LineItem } from "@/types/workspace";
import { AnimatedPrice } from "./AnimatedPrice";
import { Perks } from "./Perks";
import { WorkspacePreview } from "./WorkspacePreview";
import { ProductThumbnail } from "./scene/ProductThumbnail";

interface CheckoutViewProps {
  workspace: WorkspaceController;
  area: DeliveryArea;
  onAreaChange: (area: DeliveryArea) => void;
  onEdit: () => void;
  onRent: () => void;
}

export function CheckoutView({ workspace, area, onAreaChange, onEdit, onRent }: CheckoutViewProps) {
  const { config, lineItems, total } = workspace;
  const furniture = lineItems.filter((item) => item.category !== "accessory");
  const accessories = lineItems.filter((item) => item.category === "accessory");

  return (
    <div className="pb-32 lg:pb-16">
      <button
        type="button"
        onClick={onEdit}
        className="-ml-2 inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Edit workspace
      </button>

      <div className="mt-3 mb-6 lg:mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Almost <em className="font-serif font-normal text-jungle">yours</em>.
        </h1>
        <p className="mt-2 max-w-xl text-[15px] text-muted">
          Review your setup below. No payment today — we confirm availability first.
        </p>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_460px]">
        <div className="flex flex-col gap-6">
          <WorkspacePreview config={config} total={total} />
          <Perks className="hidden px-1 lg:block" />
        </div>

        <Card className="self-start p-5 sm:p-7">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-semibold tracking-tight text-ink">Your Workspace</h2>
            <span className="text-[13px] text-muted">{lineItems.length} items</span>
          </div>

          <LineItemList items={furniture} />

          <h3 className="mt-6 text-xs font-medium uppercase tracking-[0.12em] text-muted">Accessories</h3>
          {accessories.length > 0 ? (
            <LineItemList items={accessories} />
          ) : (
            <p className="mt-3 rounded-2xl bg-ink/[0.04] px-4 py-3 text-[13px] text-muted">
              No accessories yet.{" "}
              <button type="button" onClick={onEdit} className="font-semibold text-ink underline underline-offset-2">
                Add a monitor or lamp
              </button>
            </p>
          )}

          <dl className="mt-6 space-y-2 border-t border-dashed border-line pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Delivery &amp; setup</dt>
              <dd className="font-medium text-jungle">Free</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Pickup when you leave</dt>
              <dd className="font-medium text-jungle">Free</dd>
            </div>
            <div className="flex items-end justify-between pt-3">
              <dt className="font-semibold text-ink">Total</dt>
              <dd className="text-3xl font-semibold tracking-tight text-ink">
                <AnimatedPrice value={total} />
                <span className="text-base font-normal text-muted"> / month</span>
              </dd>
            </div>
          </dl>

          <fieldset className="mt-6">
            <legend className="mb-2.5 flex items-center gap-1.5 text-[13px] font-medium text-muted">
              <MapPin className="size-4 text-jungle" aria-hidden="true" />
              Deliver to
            </legend>
            <div className="flex flex-wrap gap-2">
              {DELIVERY_AREAS.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={option === area}
                  onClick={() => onAreaChange(option)}
                  className={`h-9 rounded-full px-4 text-[13px] font-semibold transition-colors ${
                    option === area ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-line hover:ring-ink/25"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <Button size="lg" className="mt-6 hidden w-full lg:inline-flex" onClick={onRent}>
            Rent This Workspace
          </Button>
          <p className="mt-4 flex gap-2 text-xs leading-relaxed text-muted">
            <MessageCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            We&apos;ll confirm on WhatsApp within 2 hours and schedule delivery at a time that suits you.
          </p>
        </Card>
      </div>

      <Perks className="mt-8 px-1 lg:hidden" />
    </div>
  );
}

function LineItemList({ items }: { items: LineItem[] }) {
  return (
    <ul className="mt-3 divide-y divide-line/70">
      {items.map((item) => (
        <li key={item.key} className="flex items-center gap-3.5 py-3">
          <span className="relative size-14 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-b from-[#F4EEE6] to-[#EADFD0]">
            <ProductThumbnail product={item.product} className="absolute inset-0 size-full p-1.5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-semibold leading-snug text-ink">
              {item.name}
            </span>
            <span className="block truncate text-[13px] text-muted">{item.details}</span>
          </span>
          <span className="shrink-0 text-right text-[15px] font-semibold tabular-nums text-ink">
            {formatPrice(item.total)}
            <span className="block text-[11px] font-normal text-muted">/ month</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
