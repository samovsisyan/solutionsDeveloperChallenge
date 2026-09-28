import type { DeskId, DeskLayout } from "@/types/workspace";
import { DESK_FLOOR_Y, useSvgId } from "./layout";

interface DeskArtProps {
  layout: DeskLayout;
}

const TOP_DEPTH = 26;

function Tabletop({
  layout: { left, right, surfaceY: y },
  surface,
  edge,
  thickness,
}: DeskArtProps & { surface: [string, string]; edge: string; thickness: number }) {
  const id = useSvgId("top");
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={surface[0]} />
          <stop offset="1" stopColor={surface[1]} />
        </linearGradient>
      </defs>
      <path
        d={`M${left + 12} ${y - TOP_DEPTH} L${right - 12} ${y - TOP_DEPTH} L${right} ${y} L${left} ${y} Z`}
        fill={`url(#${id})`}
      />
      <g stroke="#000" strokeOpacity={0.06} strokeWidth={1.5} fill="none">
        <path d={`M${left + 60} ${y - 18} C ${left + 180} ${y - 22} ${right - 220} ${y - 12} ${right - 90} ${y - 16}`} />
        <path d={`M${left + 120} ${y - 8} C ${left + 260} ${y - 12} ${right - 180} ${y - 4} ${right - 40} ${y - 8}`} />
      </g>
      <rect x={left} y={y} width={right - left} height={thickness} rx={3} fill={edge} />
      <rect x={left + 2} y={y} width={right - left - 4} height={2.5} fill="#fff" opacity={0.25} />
    </g>
  );
}

function FloorShadow({ layout: { left, right } }: DeskArtProps) {
  return (
    <ellipse
      cx={(left + right) / 2}
      cy={DESK_FLOOR_Y + 3}
      rx={(right - left) / 2 + 6}
      ry={9}
      fill="#3B2A1A"
      opacity={0.14}
    />
  );
}

function CangguOakDesk({ layout }: DeskArtProps) {
  const { left, right, surfaceY: y } = layout;
  const mid = (left + right) / 2;
  const floor = DESK_FLOOR_Y;
  return (
    <g>
      <FloorShadow layout={layout} />
      <path d={`M${left + 56} ${y + 10} h14 l-6 ${floor - 14 - y - 10} h-8 Z`} fill="#9A6E48" />
      <path d={`M${right - 70} ${y + 10} h14 l-2 ${floor - 14 - y - 10} h-8 Z`} fill="#9A6E48" />
      <path d={`M${left + 26} ${y + 10} h18 L${left + 30} ${floor} h-12 Z`} fill="#BA8757" />
      <path d={`M${right - 44} ${y + 10} h18 L${right - 18} ${floor} h-12 Z`} fill="#BA8757" />
      <rect x={left + 16} y={y + 12} width={right - left - 32} height={24} rx={3} fill="#C28F5F" />
      <rect x={mid - 74} y={y + 16} width={148} height={16} rx={3} fill="#CC9A69" stroke="#AF7E50" strokeWidth={1.5} />
      <rect x={mid - 13} y={y + 22} width={26} height={4} rx={2} fill="#9C7A3E" />
      <Tabletop layout={layout} surface={["#E4BF92", "#D6A976"]} edge="#C8925F" thickness={14} />
    </g>
  );
}

function UbudTeakDesk({ layout }: DeskArtProps) {
  const { left, right, surfaceY: y } = layout;
  const mid = (left + right) / 2;
  const floor = DESK_FLOOR_Y;
  const cane = useSvgId("cane");
  return (
    <g>
      <defs>
        <pattern id={cane} width={10} height={10} patternUnits="userSpaceOnUse">
          <rect width={10} height={10} fill="#D8B47C" />
          <path d="M0 0 L10 10 M10 0 L0 10" stroke="#B48A55" strokeWidth={1.3} />
          <circle cx={5} cy={5} r={1.6} fill="#E9CE9E" />
        </pattern>
      </defs>
      <FloorShadow layout={layout} />
      <rect x={left + 48} y={y + 12} width={14} height={floor - 14 - y - 12} fill="#5E3B25" />
      <rect x={right - 62} y={y + 12} width={14} height={floor - 14 - y - 12} fill="#5E3B25" />
      <rect x={left + 14} y={y + 12} width={20} height={floor - y - 12} rx={2} fill="#7A4D31" />
      <rect x={right - 34} y={y + 12} width={20} height={floor - y - 12} rx={2} fill="#7A4D31" />
      <rect x={left + 34} y={floor - 48} width={right - left - 68} height={8} fill="#6D442B" />
      <rect x={left + 10} y={y + 12} width={right - left - 20} height={36} rx={2} fill="#8A5A3A" />
      <rect x={mid - 118} y={y + 17} width={236} height={26} rx={3} fill={`url(#${cane})`} stroke="#6E4529" strokeWidth={2} />
      <circle cx={mid} cy={y + 30} r={4} fill="#5A3822" />
      <Tabletop layout={layout} surface={["#AE764E", "#9A6441"]} edge="#7F5134" thickness={16} />
    </g>
  );
}

function UluwatuStandingDesk({ layout }: DeskArtProps) {
  const { left, right, surfaceY: y } = layout;
  const floor = DESK_FLOOR_Y;
  const columns = [left + 94, right - 94];
  return (
    <g>
      <FloorShadow layout={layout} />
      <rect x={left + 60} y={y + 18} width={right - left - 120} height={14} rx={3} fill="#2A2A2D" />
      {columns.map((cx) => (
        <g key={cx}>
          <rect x={cx - 12} y={y + 18} width={24} height={floor - 118 - y - 18} fill="#3A3A3E" />
          <rect x={cx - 15} y={floor - 128} width={30} height={116} rx={2} fill="#2C2C2F" />
          <rect x={cx - 15} y={floor - 128} width={4} height={116} fill="#fff" opacity={0.07} />
          <rect x={cx - 58} y={floor - 14} width={116} height={14} rx={7} fill="#232325" />
        </g>
      ))}
      <rect x={right - 128} y={y + 18} width={48} height={13} rx={3} fill="#1B1B1D" />
      <circle cx={right - 120} cy={y + 24.5} r={2.2} fill="#7BE0A0" />
      <text x={right - 112} y={y + 27.5} fontSize={8} fill="#9FE3B8" fontFamily="ui-monospace, monospace">
        112cm
      </text>
      <Tabletop layout={layout} surface={["#98694A", "#845B3E"]} edge="#6B4731" thickness={18} />
    </g>
  );
}

export const DESK_ART: Record<DeskId, (props: DeskArtProps) => React.JSX.Element> = {
  "canggu-oak": CangguOakDesk,
  "ubud-teak": UbudTeakDesk,
  "uluwatu-standing": UluwatuStandingDesk,
};
