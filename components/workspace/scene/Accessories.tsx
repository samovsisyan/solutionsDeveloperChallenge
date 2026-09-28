import { useSvgId } from "./layout";

export function MonitorArt({ variant = "code" }: { variant?: "code" | "photo" }) {
  const screen = useSvgId("screen");
  return (
    <g>
      <defs>
        <linearGradient id={screen} x1="0" y1="0" x2="0" y2="1">
          {variant === "photo" ? (
            <>
              <stop offset="0" stopColor="#8EC3CB" />
              <stop offset="0.6" stopColor="#F3D2B0" />
              <stop offset="1" stopColor="#F0B283" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#1F2B2E" />
              <stop offset="1" stopColor="#18211F" />
            </>
          )}
        </linearGradient>
      </defs>
      <ellipse cx={0} cy={0} rx={46} ry={4} fill="#000" opacity={0.14} />
      <rect x={-36} y={-7} width={72} height={7} rx={3.5} fill="#D6D4D0" />
      <rect x={-7} y={-46} width={14} height={40} fill="#C4C2BE" />
      <rect x={-90} y={-152} width={180} height={110} rx={7} fill="#1C1C1E" />
      <rect x={-85} y={-147} width={170} height={96} rx={3} fill={`url(#${screen})`} />
      {variant === "photo" ? (
        <g>
          <circle cx={30} cy={-88} r={11} fill="#FFF1D2" />
          <path d="M-85 -72 C -50 -84 -20 -66 10 -74 C 40 -82 60 -70 85 -76 L 85 -51 L -85 -51 Z" fill="#5E9C9D" />
          <rect x={-72} y={-138} width={60} height={34} rx={4} fill="#fff" opacity={0.55} />
          <rect x={-66} y={-131} width={34} height={4} rx={2} fill="#9A8C7C" opacity={0.6} />
          <rect x={-66} y={-122} width={44} height={3} rx={1.5} fill="#9A8C7C" opacity={0.4} />
        </g>
      ) : (
        <g>
          <rect x={-85} y={-147} width={170} height={10} fill="#2C3A3D" />
          {[
            [-76, -128, 42, "#7FC8A9"],
            [-66, -119, 64, "#E7B86E"],
            [-66, -110, 36, "#9BB7E0"],
            [-56, -101, 72, "#D7D3CB"],
            [-56, -92, 48, "#7FC8A9"],
            [-66, -83, 30, "#E7B86E"],
            [-76, -74, 54, "#9BB7E0"],
            [-66, -65, 40, "#D7D3CB"],
          ].map(([x, y, w, fill]) => (
            <rect key={y} x={x} y={y} width={w} height={4} rx={2} fill={fill as string} opacity={0.85} />
          ))}
          <rect x={22} y={-133} width={54} height={72} rx={3} fill="#fff" opacity={0.06} />
        </g>
      )}
      <path d="M-85 -147 L -30 -147 L -70 -51 L -85 -51 Z" fill="#fff" opacity={0.05} />
    </g>
  );
}

export function LampArt() {
  const glow = useSvgId("glow");
  return (
    <g>
      <defs>
        <radialGradient id={glow}>
          <stop offset="0" stopColor="#FFE3A6" stopOpacity={0.75} />
          <stop offset="1" stopColor="#FFE3A6" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={0} cy={-64} r={120} fill={`url(#${glow})`} />
      <ellipse cx={22} cy={0} rx={62} ry={8} fill="#FFD48A" opacity={0.35} />
      <ellipse cx={0} cy={-3} rx={26} ry={5} fill="#A98250" />
      <rect x={-4} y={-78} width={8} height={76} rx={3} fill="#B8905A" />
      <path d="M-48 -72 Q -48 -124 0 -126 Q 48 -124 48 -72 Z" fill="#D4AE72" />
      <g stroke="#B5864C" strokeWidth={1.6} fill="none" opacity={0.85}>
        <path d="M-26 -72 Q -28 -110 0 -126" />
        <path d="M26 -72 Q 28 -110 0 -126" />
        <path d="M0 -126 V -72" />
        <path d="M-44 -92 Q 0 -102 44 -92" />
      </g>
      <ellipse cx={0} cy={-72} rx={48} ry={6} fill="#FFE8B8" />
    </g>
  );
}

export function KeyboardArt() {
  return (
    <g>
      <ellipse cx={10} cy={2} rx={112} ry={4} fill="#000" opacity={0.08} />
      <path d="M-78 0 L 78 0 L 72 -14 L -72 -14 Z" fill="#F3F1EC" stroke="#D6D1C9" strokeWidth={1.2} />
      <g stroke="#CFC9C0" strokeWidth={2.2} strokeDasharray="5 2.5">
        <line x1={-70} y1={-10.5} x2={70} y2={-10.5} />
        <line x1={-72} y1={-7} x2={72} y2={-7} />
        <line x1={-74} y1={-3.5} x2={74} y2={-3.5} />
      </g>
      <rect x={-78} y={0} width={156} height={3.5} rx={1.5} fill="#D8D3CB" />
      <ellipse cx={104} cy={-5} rx={11} ry={6.5} fill="#F3F1EC" stroke="#D6D1C9" strokeWidth={1.2} />
    </g>
  );
}

const LEAF = "M0 0 C -34 -12 -46 -58 -20 -86 C -10 -96 10 -96 20 -86 C 46 -58 34 -12 0 0 Z";

const PLANT_LEAVES: { x: number; y: number; r: number; s: number; fill: string }[] = [
  { x: -12, y: -120, r: -58, s: 1.05, fill: "#356F50" },
  { x: 10, y: -118, r: 52, s: 1.0, fill: "#2E6A4B" },
  { x: -4, y: -150, r: -22, s: 1.1, fill: "#3F7C5A" },
  { x: 6, y: -154, r: 24, s: 1.15, fill: "#4B8963" },
  { x: -20, y: -104, r: -92, s: 0.85, fill: "#4B8963" },
  { x: 20, y: -100, r: 88, s: 0.8, fill: "#3F7C5A" },
  { x: 0, y: -170, r: 2, s: 0.95, fill: "#356F50" },
];

export function PlantArt() {
  return (
    <g>
      <ellipse cx={0} cy={2} rx={60} ry={8} fill="#2A1E12" opacity={0.16} />
      <g stroke="#3E6B4E" strokeWidth={4} strokeLinecap="round" fill="none">
        {PLANT_LEAVES.map((leaf) => (
          <path key={`${leaf.x}${leaf.y}`} d={`M0 -86 Q ${leaf.x * 0.5} ${(leaf.y - 86) / 2} ${leaf.x} ${leaf.y}`} />
        ))}
      </g>
      {PLANT_LEAVES.map((leaf) => (
        <g key={`${leaf.x}${leaf.y}`} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}>
          <path d={LEAF} fill={leaf.fill} />
          <path d="M0 -4 V -84" stroke="#1F4A35" strokeOpacity={0.35} strokeWidth={2} />
          <path
            d="M0 -24 L -22 -34 M0 -44 L -26 -56 M0 -62 L -18 -74 M0 -24 L 22 -34 M0 -44 L 26 -56 M0 -62 L 18 -74"
            stroke="#EDE3D5"
            strokeOpacity={0.45}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </g>
      ))}
      <path d="M-46 -86 L 46 -86 L 37 0 L -37 0 Z" fill="#C9A06A" />
      <g stroke="#A97F4B" strokeWidth={2}>
        {[-72, -58, -44, -30, -16].map((y) => (
          <line key={y} x1={-46 + (-86 - y) * -0.1} y1={y} x2={46 - (-86 - y) * -0.1} y2={y} />
        ))}
      </g>
      <rect x={-51} y={-94} width={102} height={12} rx={6} fill="#B88E58" />
    </g>
  );
}

export function MugArt() {
  return (
    <g>
      <path d="M-4 -34 C -10 -42 2 -46 -4 -54 M6 -34 C 0 -42 12 -46 6 -54" stroke="#fff" strokeOpacity={0.7} strokeWidth={2} fill="none" strokeLinecap="round" />
      <path d="M11 -20 C 22 -20 22 -8 11 -8" stroke="#E9E2D6" strokeWidth={4} fill="none" />
      <rect x={-12} y={-27} width={24} height={27} rx={4} fill="#F6F1E8" />
      <ellipse cx={0} cy={-26} rx={11} ry={2.5} fill="#6B4A32" />
    </g>
  );
}
