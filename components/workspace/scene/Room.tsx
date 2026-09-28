import { SCENE_HEIGHT, SCENE_WIDTH, WALL_BOTTOM, useSvgId } from "./layout";

const PALM_FROND =
  "M0 0 C 18 -10 44 -12 70 2 C 46 -2 22 2 0 0 Z";

function Palm({ x, y, scale, lean }: { x: number; y: number; scale: number; lean: number }) {
  const fronds = [-150, -115, -80, -40, -5, 30];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d={`M0 0 C ${lean * 0.3} -60 ${lean * 0.7} -130 ${lean} -190`}
        stroke="#3D5A4B"
        strokeWidth={7}
        strokeLinecap="round"
        fill="none"
      />
      <g transform={`translate(${lean} -190)`} fill="#2F5446">
        {fronds.map((angle) => (
          <path key={angle} d={PALM_FROND} transform={`rotate(${angle}) scale(1.25)`} />
        ))}
        {fronds.map((angle) => (
          <path
            key={`b${angle}`}
            d={PALM_FROND}
            transform={`scale(-1 1) rotate(${angle + 12}) scale(1.05)`}
            opacity={0.9}
          />
        ))}
      </g>
    </g>
  );
}

export function Room() {
  const wall = useSvgId("wall");
  const sky = useSvgId("sky");
  const sea = useSvgId("sea");
  const floor = useSvgId("floor");
  const beam = useSvgId("beam");
  const sun = useSvgId("sun");
  const glass = useSvgId("glass");

  return (
    <g>
      <defs>
        <linearGradient id={wall} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5EEE4" />
          <stop offset="1" stopColor="#EDE3D5" />
        </linearGradient>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A9D2DA" />
          <stop offset="0.55" stopColor="#F4DCC2" />
          <stop offset="1" stopColor="#F9C99B" />
        </linearGradient>
        <linearGradient id={sea} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6FAAA9" />
          <stop offset="1" stopColor="#4F8E92" />
        </linearGradient>
        <linearGradient id={floor} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9C2A2" />
          <stop offset="1" stopColor="#CBAE88" />
        </linearGradient>
        <linearGradient id={beam} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF6E6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFF6E6" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={sun}>
          <stop offset="0" stopColor="#FFF4D6" />
          <stop offset="0.35" stopColor="#FFE2AE" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFD39A" stopOpacity="0" />
        </radialGradient>
        <clipPath id={glass}>
          <rect x={86} y={76} width={368} height={300} rx={3} />
        </clipPath>
      </defs>

      <rect width={SCENE_WIDTH} height={WALL_BOTTOM} fill={`url(#${wall})`} />

      <rect x={70} y={60} width={400} height={332} rx={8} fill="#B98A5E" />
      <g clipPath={`url(#${glass})`}>
        <rect x={86} y={76} width={368} height={300} fill={`url(#${sky})`} />
        <circle cx={352} cy={292} r={80} fill={`url(#${sun})`} />
        <circle cx={352} cy={292} r={24} fill="#FFF1D2" />
        <path d="M86 300 C 150 286 210 288 260 298 L 260 312 L 86 312 Z" fill="#8FB5A2" />
        <rect x={86} y={306} width={368} height={70} fill={`url(#${sea})`} />
        <g stroke="#FFF1D2" strokeLinecap="round" opacity={0.55}>
          <line x1={318} y1={318} x2={386} y2={318} strokeWidth={3} />
          <line x1={330} y1={330} x2={372} y2={330} strokeWidth={2.5} />
          <line x1={340} y1={342} x2={362} y2={342} strokeWidth={2} />
        </g>
        <Palm x={140} y={384} scale={1.05} lean={26} />
        <Palm x={430} y={392} scale={0.85} lean={-20} />
        <path
          d="M86 376 C 110 330 150 340 170 376 Z M400 376 C 420 336 450 330 454 350 L 454 376 Z"
          fill="#27473B"
        />
      </g>
      <rect x={264} y={76} width={10} height={300} fill="#B98A5E" />
      <rect x={86} y={218} width={368} height={8} fill="#B98A5E" />
      <path d="M86 76 L 200 76 L 120 376 L 86 376 Z" fill="#FFFFFF" opacity={0.08} />
      <rect x={58} y={388} width={424} height={14} rx={4} fill="#C99B6C" />
      <rect x={66} y={402} width={408} height={6} rx={3} fill="#000" opacity={0.06} />

      <line x1={640} y1={0} x2={640} y2={62} stroke="#6B5a48" strokeWidth={2} />
      <path d="M602 104 Q 602 62 640 60 Q 678 62 678 104 Z" fill="#D2AA6E" />
      <g stroke="#B5864C" strokeWidth={1.5} fill="none" opacity={0.8}>
        <path d="M618 104 Q 616 74 640 62" />
        <path d="M662 104 Q 664 74 640 62" />
        <path d="M640 62 L 640 104" />
        <path d="M606 88 Q 640 80 674 88" />
      </g>
      <ellipse cx={640} cy={104} rx={38} ry={5} fill="#FBE3B4" />

      <rect x={792} y={128} width={140} height={178} rx={3} fill="#2B2724" />
      <rect x={799} y={135} width={126} height={164} fill="#FAF5EC" />
      <circle cx={862} cy={206} r={32} fill="#E3A574" />
      <path d="M812 246 C 836 232 850 258 874 244 C 890 236 902 244 912 240 L 912 284 L 812 284 Z" fill="#6FA7A3" />
      <path d="M812 262 C 836 250 852 272 876 260 C 892 252 904 258 912 256" stroke="#FAF5EC" strokeWidth={3} fill="none" />

      <rect y={WALL_BOTTOM} width={SCENE_WIDTH} height={SCENE_HEIGHT - WALL_BOTTOM} fill={`url(#${floor})`} />
      <rect y={WALL_BOTTOM - 8} width={SCENE_WIDTH} height={10} fill="#E6D7C2" />
      <rect y={WALL_BOTTOM + 2} width={SCENE_WIDTH} height={3} fill="#000" opacity={0.05} />
      <g stroke="#8A6A45" strokeOpacity={0.14} strokeWidth={1.5}>
        <line x1={0} y1={578} x2={1000} y2={578} />
        <line x1={0} y1={622} x2={1000} y2={622} />
        <line x1={0} y1={672} x2={1000} y2={672} />
        <line x1={180} y1={542} x2={180} y2={578} />
        <line x1={610} y1={542} x2={610} y2={578} />
        <line x1={380} y1={578} x2={380} y2={622} />
        <line x1={860} y1={578} x2={860} y2={622} />
        <line x1={90} y1={622} x2={90} y2={672} />
        <line x1={540} y1={622} x2={540} y2={672} />
        <line x1={300} y1={672} x2={300} y2={700} />
        <line x1={760} y1={672} x2={760} y2={700} />
      </g>

      <path d="M96 542 L 470 542 L 700 700 L 150 700 Z" fill={`url(#${beam})`} />

      <ellipse cx={560} cy={664} rx={330} ry={34} fill="#E7D6B8" />
      <ellipse cx={560} cy={664} rx={306} ry={26} fill="none" stroke="#D3BC96" strokeWidth={2} />
    </g>
  );
}
