import type { ChairId } from "@/types/workspace";
import { useSvgId } from "./layout";

function StarBase({ leg, caster }: { leg: string; caster: string }) {
  const ends: [number, number][] = [
    [-82, -8],
    [82, -8],
    [-46, -1],
    [46, -1],
    [0, 2],
  ];
  return (
    <g>
      <ellipse cx={0} cy={4} rx={92} ry={10} fill="#2A1E12" opacity={0.16} />
      {ends.map(([x, y]) => (
        <line key={x} x1={0} y1={-24} x2={x} y2={y - 4} stroke={leg} strokeWidth={10} strokeLinecap="round" />
      ))}
      {ends.map(([x, y]) => (
        <circle key={`c${x}`} cx={x} cy={y + 2} r={7.5} fill={caster} />
      ))}
      <circle cx={0} cy={-24} r={12} fill={leg} />
    </g>
  );
}

function ErgonomicProChair() {
  const mesh = useSvgId("mesh");
  const seatY = -134;
  const back = `M-56 ${seatY - 4} C -66 ${seatY - 60} -76 ${seatY - 124} -66 ${seatY - 178}
    Q -62 ${seatY - 194} -46 ${seatY - 196} L 46 ${seatY - 196}
    Q 62 ${seatY - 194} 66 ${seatY - 178} C 76 ${seatY - 124} 66 ${seatY - 60} 56 ${seatY - 4} Z`;
  return (
    <g>
      <defs>
        <pattern id={mesh} width={6} height={6} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1={0} y1={0} x2={0} y2={6} stroke="#fff" strokeOpacity={0.07} strokeWidth={2} />
        </pattern>
      </defs>
      <StarBase leg="#26272B" caster="#141416" />
      <rect x={-6} y={seatY + 30} width={12} height={-seatY - 54} fill="#9A9CA2" />
      <rect x={-10} y={seatY + 22} width={20} height={40} rx={3} fill="#2B2C30" />
      <rect x={-5} y={seatY - 218} width={10} height={26} fill="#1E1F23" />
      <rect x={-46} y={seatY - 250} width={92} height={36} rx={15} fill="#3B3E45" stroke="#1E1F23" strokeWidth={4} />
      <path d={back} fill="#3B3E45" />
      <path d={back} fill={`url(#${mesh})`} stroke="#1E1F23" strokeWidth={7} strokeLinejoin="round" />
      <rect x={-46} y={seatY - 64} width={92} height={16} rx={8} fill="#2A2C31" />
      <rect x={-36} y={seatY + 16} width={72} height={12} rx={4} fill="#232427" />
      <rect x={-82} y={seatY} width={164} height={30} rx={15} fill="#34363C" />
      <rect x={-74} y={seatY + 3} width={148} height={8} rx={4} fill="#474A52" />
      {[-1, 1].map((side) => (
        <g key={side}>
          <rect x={side * 80 - 5} y={seatY - 44} width={10} height={58} fill="#232427" />
          <rect x={side * 80 - 20} y={seatY - 54} width={40} height={12} rx={6} fill="#2A2B2F" />
        </g>
      ))}
    </g>
  );
}

function LoungeExecutiveChair() {
  const seatY = -132;
  return (
    <g>
      <StarBase leg="#B9BCC2" caster="#2A2A2C" />
      <rect x={-6} y={seatY + 30} width={12} height={-seatY - 54} fill="#C9CBD0" />
      <rect x={-38} y={seatY + 26} width={76} height={10} rx={4} fill="#9EA1A7" />
      <path
        d={`M-66 ${seatY} L -72 ${seatY - 196} Q -72 ${seatY - 228} -42 ${seatY - 230} L 42 ${seatY - 230} Q 72 ${seatY - 228} 72 ${seatY - 196} L 66 ${seatY} Z`}
        fill="#9B5530"
      />
      <g stroke="#7A3F20" strokeWidth={2.5} opacity={0.75}>
        {[40, 80, 120, 160].map((dy) => (
          <line key={dy} x1={-68} y1={seatY - dy} x2={68} y2={seatY - dy} />
        ))}
      </g>
      <g fill="#fff" opacity={0.07}>
        {[20, 60, 100, 140].map((dy) => (
          <rect key={dy} x={-60} y={seatY - dy - 16} width={120} height={10} rx={5} />
        ))}
      </g>
      <rect x={-62} y={seatY - 228} width={124} height={34} rx={15} fill="#AA6037" />
      <rect x={-86} y={seatY - 6} width={172} height={40} rx={18} fill="#A55E33" />
      <rect x={-76} y={seatY - 3} width={152} height={10} rx={5} fill="#C07A48" opacity={0.7} />
      {[-1, 1].map((side) => (
        <g key={side}>
          <rect x={side * 92 - 13} y={seatY - 56} width={26} height={82} rx={13} fill="#8E4C2A" />
          <rect x={side * 92 - 9} y={seatY - 52} width={18} height={8} rx={4} fill="#fff" opacity={0.12} />
        </g>
      ))}
    </g>
  );
}

function KutaRattanChair() {
  const cane = useSvgId("rattan");
  const seatY = -124;
  return (
    <g>
      <defs>
        <pattern id={cane} width={9} height={9} patternUnits="userSpaceOnUse">
          <rect width={9} height={9} fill="#D9B47C" />
          <path d="M0 4.5 H9 M4.5 0 V9" stroke="#BC915A" strokeWidth={1.2} />
          <path d="M0 0 L9 9 M9 0 L0 9" stroke="#C79D66" strokeWidth={0.8} />
        </pattern>
      </defs>
      <ellipse cx={0} cy={2} rx={84} ry={9} fill="#2A1E12" opacity={0.14} />
      <g stroke="#6A4B2E" strokeWidth={6} strokeLinecap="round">
        <line x1={-42} y1={seatY + 20} x2={-38} y2={-12} />
        <line x1={42} y1={seatY + 20} x2={38} y2={-12} />
      </g>
      <g stroke="#7E5B38" strokeWidth={8} strokeLinecap="round">
        <line x1={-62} y1={seatY + 22} x2={-72} y2={-2} />
        <line x1={62} y1={seatY + 22} x2={72} y2={-2} />
      </g>
      <path
        d={`M-80 ${seatY + 6} L -86 ${seatY - 118} A 86 86 0 0 1 86 ${seatY - 118} L 80 ${seatY + 6} Z`}
        fill={`url(#${cane})`}
        stroke="#AE8250"
        strokeWidth={9}
        strokeLinejoin="round"
      />
      <rect x={-44} y={seatY - 62} width={88} height={42} rx={16} fill="#9DB59B" />
      <rect x={-44} y={seatY - 45} width={88} height={6} fill="#86A084" />
      <rect x={-80} y={seatY + 8} width={160} height={16} rx={8} fill={`url(#${cane})`} stroke="#AE8250" strokeWidth={3} />
      <rect x={-82} y={seatY - 12} width={164} height={26} rx={13} fill="#F2E9DA" />
      <rect x={-74} y={seatY - 9} width={148} height={6} rx={3} fill="#fff" opacity={0.6} />
    </g>
  );
}

export const CHAIR_ART: Record<ChairId, () => React.JSX.Element> = {
  "ergonomic-pro": ErgonomicProChair,
  "lounge-executive": LoungeExecutiveChair,
  "kuta-rattan": KutaRattanChair,
};
