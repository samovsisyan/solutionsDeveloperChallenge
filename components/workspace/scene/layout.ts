import { useId } from "react";
import type { DeskLayout } from "@/types/workspace";

export const SCENE_WIDTH = 1000;
export const SCENE_HEIGHT = 700;
export const WALL_BOTTOM = 540;
export const DESK_FLOOR_Y = 646;
const CHAIR_FLOOR_Y = 684;

const MONITOR_SPACING = 97;

export interface Point {
  x: number;
  y: number;
}

export function getSceneLayout({ left, right, surfaceY }: DeskLayout) {
  const center = (left + right) / 2;
  const workCenter = center - 12;

  return {
    monitorPositions(count: number): Point[] {
      const y = surfaceY - 16;
      if (count <= 1) return [{ x: workCenter, y }];
      return [
        { x: workCenter - MONITOR_SPACING, y },
        { x: workCenter + MONITOR_SPACING, y },
      ];
    },
    keyboard: { x: workCenter, y: surfaceY - 4 },
    mug: { x: center + 152, y: surfaceY - 10 },
    lamp: { x: left + 54, y: surfaceY - 13 },
    plant: { x: left - 52, y: DESK_FLOOR_Y + 16 },
    chair: { x: right - 18, y: CHAIR_FLOOR_Y },
  };
}

export function useSvgId(prefix: string): string {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
}
