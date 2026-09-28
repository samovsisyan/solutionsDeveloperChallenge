export type DeskId = "canggu-oak" | "ubud-teak" | "uluwatu-standing";
export type ChairId = "ergonomic-pro" | "lounge-executive" | "kuta-rattan";
export type AccessoryId = "monitor" | "lamp" | "keyboard" | "plant";

export type ProductCategory = "desk" | "chair" | "accessory";

interface BaseProduct {
  name: string;
  tagline: string;
  details: string;
  monthlyPrice: number;
  badge?: string;
}

export interface DeskLayout {
  left: number;
  right: number;
  surfaceY: number;
}

export interface Desk extends BaseProduct {
  id: DeskId;
  category: "desk";
  layout: DeskLayout;
}

export interface Chair extends BaseProduct {
  id: ChairId;
  category: "chair";
}

export interface Accessory extends BaseProduct {
  id: AccessoryId;
  category: "accessory";
  maxQuantity: number;
  quantityLabels?: readonly string[];
}

export type Product = Desk | Chair | Accessory;

export type AccessoryQuantities = Record<AccessoryId, number>;

export interface WorkspaceConfig {
  deskId: DeskId;
  chairId: ChairId;
  accessories: AccessoryQuantities;
}

export interface WorkspacePreset {
  id: string;
  name: string;
  description: string;
  config: WorkspaceConfig;
}

export interface LineItem {
  key: string;
  category: ProductCategory;
  product: Product;
  name: string;
  details: string;
  quantity: number;
  unitPrice: number;
  total: number;
}
