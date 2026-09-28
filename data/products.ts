import type {
  Accessory,
  AccessoryId,
  Chair,
  ChairId,
  Desk,
  DeskId,
  WorkspaceConfig,
  WorkspacePreset,
} from "@/types/workspace";

export const DESKS: readonly Desk[] = [
  {
    id: "canggu-oak",
    category: "desk",
    name: "Canggu Oak Desk",
    tagline: "Solid oak, mid-century legs. Calm and compact.",
    details: "Solid oak · 120 × 60 cm",
    monthlyPrice: 45,
    layout: { left: 232, right: 768, surfaceY: 440 },
  },
  {
    id: "ubud-teak",
    category: "desk",
    name: "Ubud Teak Writing Desk",
    tagline: "Reclaimed teak with a hand-woven rattan drawer.",
    details: "Reclaimed teak · 130 × 65 cm",
    monthlyPrice: 55,
    badge: "Local craft",
    layout: { left: 226, right: 774, surfaceY: 434 },
  },
  {
    id: "uluwatu-standing",
    category: "desk",
    name: "Uluwatu Standing Desk",
    tagline: "Electric sit-stand frame with a walnut top.",
    details: "Dual motor · 140 × 70 cm · 3 memory presets",
    monthlyPrice: 70,
    badge: "Most popular",
    layout: { left: 214, right: 806, surfaceY: 372 },
  },
];

export const CHAIRS: readonly Chair[] = [
  {
    id: "ergonomic-pro",
    category: "chair",
    name: "Ergonomic Pro Chair",
    tagline: "Breathable mesh, adjustable lumbar and headrest.",
    details: "Mesh back · 4D armrests · lumbar support",
    monthlyPrice: 35,
    badge: "Best for long days",
  },
  {
    id: "lounge-executive",
    category: "chair",
    name: "Lounge Executive Chair",
    tagline: "Cognac leather, deep cushioning, chrome base.",
    details: "Top-grain leather · tilt lock",
    monthlyPrice: 50,
  },
  {
    id: "kuta-rattan",
    category: "chair",
    name: "Kuta Rattan Chair",
    tagline: "Hand-woven rattan with a linen seat cushion.",
    details: "Natural rattan · linen cushion",
    monthlyPrice: 22,
  },
];

export const ACCESSORIES: readonly Accessory[] = [
  {
    id: "monitor",
    category: "accessory",
    name: "27″ 4K Monitor",
    tagline: "USB-C, one cable to your laptop.",
    details: "27″ 4K IPS · USB-C 65 W",
    monthlyPrice: 25,
    maxQuantity: 2,
    quantityLabels: ["None", "Single", "Dual"],
  },
  {
    id: "lamp",
    category: "accessory",
    name: "Rattan Desk Lamp",
    tagline: "Warm, dimmable light for late calls.",
    details: "Dimmable LED · warm white",
    monthlyPrice: 10,
    maxQuantity: 1,
  },
  {
    id: "keyboard",
    category: "accessory",
    name: "Keyboard & Mouse",
    tagline: "Wireless, quiet, multi-device.",
    details: "Wireless · US layout",
    monthlyPrice: 7,
    maxQuantity: 1,
  },
  {
    id: "plant",
    category: "accessory",
    name: "Monstera Plant",
    tagline: "A little jungle. We water it on swaps.",
    details: "Monstera in woven basket",
    monthlyPrice: 8,
    maxQuantity: 1,
  },
];

const byId = <T extends { id: string }>(items: readonly T[]) =>
  Object.fromEntries(items.map((item) => [item.id, item]));

export const DESKS_BY_ID = byId(DESKS) as Record<DeskId, Desk>;
export const CHAIRS_BY_ID = byId(CHAIRS) as Record<ChairId, Chair>;
export const ACCESSORIES_BY_ID = byId(ACCESSORIES) as Record<AccessoryId, Accessory>;

export const DEFAULT_CONFIG: WorkspaceConfig = {
  deskId: "uluwatu-standing",
  chairId: "ergonomic-pro",
  accessories: { monitor: 1, lamp: 1, keyboard: 1, plant: 1 },
};

export const PRESETS: readonly WorkspacePreset[] = [
  {
    id: "essentials",
    name: "Laptop Nomad",
    description: "Desk, chair, lamp and a plant",
    config: {
      deskId: "canggu-oak",
      chairId: "kuta-rattan",
      accessories: { monitor: 0, lamp: 1, keyboard: 0, plant: 1 },
    },
  },
  {
    id: "focus",
    name: "Deep Focus",
    description: "Ergonomic setup with one screen",
    config: {
      deskId: "ubud-teak",
      chairId: "ergonomic-pro",
      accessories: { monitor: 1, lamp: 1, keyboard: 1, plant: 0 },
    },
  },
  {
    id: "studio",
    name: "Pro Studio",
    description: "Standing desk, dual 4K, everything",
    config: {
      deskId: "uluwatu-standing",
      chairId: "lounge-executive",
      accessories: { monitor: 2, lamp: 1, keyboard: 1, plant: 1 },
    },
  },
];

export const DELIVERY_AREAS = ["Canggu", "Ubud", "Seminyak", "Uluwatu", "Sanur"] as const;
export type DeliveryArea = (typeof DELIVERY_AREAS)[number];
