import type { AccessoryId, Product } from "@/types/workspace";
import { DESK_FLOOR_Y } from "./layout";
import { DESK_ART } from "./Desks";
import { CHAIR_ART } from "./Chairs";
import { KeyboardArt, LampArt, MonitorArt, PlantArt } from "./Accessories";

const ACCESSORY_ART: Record<AccessoryId, { viewBox: string; Art: () => React.JSX.Element }> = {
  monitor: { viewBox: "-100 -162 200 172", Art: () => <MonitorArt /> },
  lamp: { viewBox: "-70 -136 140 146", Art: LampArt },
  keyboard: {
    viewBox: "-90 -60 210 76",
    Art: () => (
      <g transform="scale(1 2.6)">
        <KeyboardArt />
      </g>
    ),
  },
  plant: { viewBox: "-105 -262 210 272", Art: PlantArt },
};

export function ProductThumbnail({ product, className }: { product: Product; className?: string }) {
  let viewBox: string;
  let art: React.ReactNode;

  switch (product.category) {
    case "desk": {
      const { left, right, surfaceY } = product.layout;
      const Desk = DESK_ART[product.id];
      viewBox = `${left - 24} ${surfaceY - 60} ${right - left + 48} ${DESK_FLOOR_Y - surfaceY + 80}`;
      art = <Desk layout={product.layout} />;
      break;
    }
    case "chair": {
      const Chair = CHAIR_ART[product.id];
      viewBox = "-120 -400 240 414";
      art = <Chair />;
      break;
    }
    case "accessory": {
      const { viewBox: box, Art } = ACCESSORY_ART[product.id];
      viewBox = box;
      art = <Art />;
      break;
    }
  }

  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {art}
    </svg>
  );
}
