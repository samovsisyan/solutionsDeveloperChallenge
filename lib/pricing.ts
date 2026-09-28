import { ACCESSORIES, CHAIRS_BY_ID, DESKS_BY_ID } from "@/data/products";
import type { LineItem, WorkspaceConfig } from "@/types/workspace";

export function getLineItems(config: WorkspaceConfig): LineItem[] {
  const desk = DESKS_BY_ID[config.deskId];
  const chair = CHAIRS_BY_ID[config.chairId];

  const items: LineItem[] = [
    {
      key: "desk",
      category: "desk",
      product: desk,
      name: desk.name,
      details: desk.details,
      quantity: 1,
      unitPrice: desk.monthlyPrice,
      total: desk.monthlyPrice,
    },
    {
      key: "chair",
      category: "chair",
      product: chair,
      name: chair.name,
      details: chair.details,
      quantity: 1,
      unitPrice: chair.monthlyPrice,
      total: chair.monthlyPrice,
    },
  ];

  for (const accessory of ACCESSORIES) {
    const quantity = config.accessories[accessory.id];
    if (quantity <= 0) continue;

    const isDualMonitor = accessory.id === "monitor" && quantity === 2;
    items.push({
      key: accessory.id,
      category: "accessory",
      product: accessory,
      name: isDualMonitor ? "Dual Monitor Setup" : accessory.name,
      details: quantity > 1 ? `${quantity} × ${accessory.details}` : accessory.details,
      quantity,
      unitPrice: accessory.monthlyPrice,
      total: accessory.monthlyPrice * quantity,
    });
  }

  return items;
}

export function sumLineItems(items: readonly LineItem[]): number {
  return items.reduce((sum, item) => sum + item.total, 0);
}

export function getMonthlyTotal(config: WorkspaceConfig): number {
  return sumLineItems(getLineItems(config));
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}
