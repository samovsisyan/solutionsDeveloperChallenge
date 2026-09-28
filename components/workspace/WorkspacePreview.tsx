"use client";

import { AnimatePresence, motion, type Transition } from "framer-motion";
import { Minus, Plus, RefreshCw } from "lucide-react";
import { ACCESSORIES_BY_ID, CHAIRS_BY_ID, DESKS_BY_ID } from "@/data/products";
import { formatPrice } from "@/lib/pricing";
import type { WorkspaceChange } from "@/hooks/useWorkspace";
import type { WorkspaceConfig } from "@/types/workspace";
import { Room } from "./scene/Room";
import { DESK_ART } from "./scene/Desks";
import { CHAIR_ART } from "./scene/Chairs";
import { KeyboardArt, LampArt, MonitorArt, MugArt, PlantArt } from "./scene/Accessories";
import { SCENE_HEIGHT, SCENE_WIDTH, getSceneLayout } from "./scene/layout";

const spring: Transition = { type: "spring", stiffness: 260, damping: 28, mass: 0.8 };
const fade: Transition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] };

interface WorkspacePreviewProps {
  config: WorkspaceConfig;
  total: number;
  lastChange?: WorkspaceChange | null;
  className?: string;
}

function describeScene(config: WorkspaceConfig): string {
  const accessories = (Object.keys(config.accessories) as (keyof typeof config.accessories)[])
    .filter((id) => config.accessories[id] > 0)
    .map((id) => {
      const count = config.accessories[id];
      const name = ACCESSORIES_BY_ID[id].name;
      return count > 1 ? `${count} × ${name}` : name;
    });
  const base = `${DESKS_BY_ID[config.deskId].name} with ${CHAIRS_BY_ID[config.chairId].name}`;
  return accessories.length ? `${base}, plus ${accessories.join(", ")}` : base;
}

export function WorkspacePreview({ config, total, lastChange, className = "" }: WorkspacePreviewProps) {
  const desk = DESKS_BY_ID[config.deskId];
  const DeskArt = DESK_ART[desk.id];
  const ChairArt = CHAIR_ART[config.chairId];
  const layout = getSceneLayout(desk.layout);
  const { monitor, lamp, keyboard, plant } = config.accessories;
  const monitorPositions = monitor > 0 ? layout.monitorPositions(monitor) : [];

  const drop = (x: number, y: number) => ({
    initial: { opacity: 0, x, y: y - 28 },
    animate: { opacity: 1, x, y },
    exit: { opacity: 0, x, y: y - 18, transition: fade },
    transition: spring,
  });

  return (
    <div
      className={`relative aspect-[10/7] w-full overflow-hidden rounded-[28px] bg-[#EDE3D5] shadow-[0_30px_80px_-40px_rgba(60,40,20,0.45)] ring-1 ring-black/5 ${className}`}
    >
      <svg
        viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={`Workspace preview: ${describeScene(config)}`}
      >
        <Room />

        <AnimatePresence initial={false}>
          {plant > 0 && (
            <motion.g key="plant" {...drop(layout.plant.x, layout.plant.y)}>
              <PlantArt />
            </motion.g>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          <motion.g
            key={desk.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={fade}
          >
            <DeskArt layout={desk.layout} />
          </motion.g>
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {monitorPositions.map((pos, index) => (
            <motion.g key={`monitor-${index}`} {...drop(pos.x, pos.y)}>
              <MonitorArt variant={index === 0 ? "code" : "photo"} />
            </motion.g>
          ))}
        </AnimatePresence>

        <motion.g initial={false} animate={layout.mug} transition={spring}>
          <MugArt />
        </motion.g>

        <AnimatePresence initial={false}>
          {keyboard > 0 && (
            <motion.g key="keyboard" {...drop(layout.keyboard.x, layout.keyboard.y)}>
              <KeyboardArt />
            </motion.g>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {lamp > 0 && (
            <motion.g key="lamp" {...drop(layout.lamp.x, layout.lamp.y)}>
              <LampArt />
            </motion.g>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          <motion.g
            key={config.chairId}
            initial={{ opacity: 0, x: layout.chair.x + 60, y: layout.chair.y }}
            animate={{ opacity: 1, x: layout.chair.x, y: layout.chair.y }}
            exit={{ opacity: 0, x: layout.chair.x + 40, transition: fade }}
            transition={spring}
          >
            <ChairArt />
          </motion.g>
        </AnimatePresence>
      </svg>

      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white/60 px-3 py-1.5 text-xs font-medium text-ink shadow-sm ring-1 ring-white/60 backdrop-blur-md sm:left-4 sm:top-4">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-jungle/50" />
          <span className="relative inline-flex size-2 rounded-full bg-jungle" />
        </span>
        Live preview
      </div>

      {lastChange !== undefined && <ChangeToast change={lastChange} total={total} />}
    </div>
  );
}

const CHANGE_ICON = { add: Plus, remove: Minus, swap: RefreshCw } as const;

function ChangeToast({ change, total }: { change: WorkspaceChange | null; total: number }) {
  return (
    <div role="status" className="pointer-events-none absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
      <AnimatePresence>
        {change && (
          <motion.div
            key={change.id}
            className="flex items-center gap-2 rounded-full bg-ink/80 py-1.5 pl-1.5 pr-3.5 text-xs font-medium text-white shadow-lg backdrop-blur-md sm:text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, 0] }}
            transition={{ duration: 2.8, times: [0, 0.08, 0.86, 1], ease: "easeOut" }}
          >
            <ChangeIcon kind={change.kind} />
            <span>{change.message}</span>
            <span className="sr-only">. New total {formatPrice(total)} per month.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChangeIcon({ kind }: { kind: WorkspaceChange["kind"] }) {
  const Icon = CHANGE_ICON[kind];
  return (
    <span className="flex size-6 items-center justify-center rounded-full bg-white/15">
      <Icon className="size-3.5" aria-hidden="true" />
    </span>
  );
}
