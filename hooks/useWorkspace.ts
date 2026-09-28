"use client";

import { useCallback, useMemo, useReducer } from "react";
import {
  ACCESSORIES_BY_ID,
  CHAIRS_BY_ID,
  DEFAULT_CONFIG,
  DESKS_BY_ID,
} from "@/data/products";
import { getLineItems, sumLineItems } from "@/lib/pricing";
import type {
  AccessoryId,
  ChairId,
  DeskId,
  WorkspaceConfig,
  WorkspacePreset,
} from "@/types/workspace";

export interface WorkspaceChange {
  id: number;
  kind: "add" | "remove" | "swap";
  message: string;
}

interface WorkspaceState {
  config: WorkspaceConfig;
  lastChange: WorkspaceChange | null;
}

type WorkspaceAction =
  | { type: "selectDesk"; deskId: DeskId }
  | { type: "selectChair"; chairId: ChairId }
  | { type: "setAccessory"; accessoryId: AccessoryId; quantity: number }
  | { type: "applyPreset"; preset: WorkspacePreset };

function describeAccessoryChange(id: AccessoryId, from: number, to: number) {
  const { name } = ACCESSORIES_BY_ID[id];
  if (id === "monitor" && to === 2) return "Upgraded to dual monitors";
  if (id === "monitor" && from === 2 && to === 1) return "Back to a single monitor";
  return to > from ? `Added ${name}` : `Removed ${name}`;
}

function workspaceReducer(state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
  const { config } = state;
  const nextId = (state.lastChange?.id ?? 0) + 1;

  switch (action.type) {
    case "selectDesk": {
      if (action.deskId === config.deskId) return state;
      return {
        config: { ...config, deskId: action.deskId },
        lastChange: { id: nextId, kind: "swap", message: DESKS_BY_ID[action.deskId].name },
      };
    }
    case "selectChair": {
      if (action.chairId === config.chairId) return state;
      return {
        config: { ...config, chairId: action.chairId },
        lastChange: { id: nextId, kind: "swap", message: CHAIRS_BY_ID[action.chairId].name },
      };
    }
    case "setAccessory": {
      const { accessoryId } = action;
      const { maxQuantity } = ACCESSORIES_BY_ID[accessoryId];
      const quantity = Math.min(Math.max(action.quantity, 0), maxQuantity);
      const current = config.accessories[accessoryId];
      if (quantity === current) return state;
      return {
        config: { ...config, accessories: { ...config.accessories, [accessoryId]: quantity } },
        lastChange: {
          id: nextId,
          kind: quantity > current ? "add" : "remove",
          message: describeAccessoryChange(accessoryId, current, quantity),
        },
      };
    }
    case "applyPreset": {
      return {
        config: structuredClone(action.preset.config),
        lastChange: { id: nextId, kind: "swap", message: `${action.preset.name} setup` },
      };
    }
  }
}

export function isSameConfig(a: WorkspaceConfig, b: WorkspaceConfig): boolean {
  return (
    a.deskId === b.deskId &&
    a.chairId === b.chairId &&
    (Object.keys(a.accessories) as AccessoryId[]).every(
      (id) => a.accessories[id] === b.accessories[id],
    )
  );
}

export function useWorkspace(initialConfig: WorkspaceConfig = DEFAULT_CONFIG) {
  const [state, dispatch] = useReducer(workspaceReducer, {
    config: initialConfig,
    lastChange: null,
  });

  const lineItems = useMemo(() => getLineItems(state.config), [state.config]);
  const total = useMemo(() => sumLineItems(lineItems), [lineItems]);

  const selectDesk = useCallback((deskId: DeskId) => dispatch({ type: "selectDesk", deskId }), []);
  const selectChair = useCallback(
    (chairId: ChairId) => dispatch({ type: "selectChair", chairId }),
    [],
  );
  const setAccessory = useCallback(
    (accessoryId: AccessoryId, quantity: number) =>
      dispatch({ type: "setAccessory", accessoryId, quantity }),
    [],
  );
  const applyPreset = useCallback(
    (preset: WorkspacePreset) => dispatch({ type: "applyPreset", preset }),
    [],
  );

  return {
    config: state.config,
    lastChange: state.lastChange,
    lineItems,
    total,
    selectDesk,
    selectChair,
    setAccessory,
    applyPreset,
  };
}

export type WorkspaceController = ReturnType<typeof useWorkspace>;
