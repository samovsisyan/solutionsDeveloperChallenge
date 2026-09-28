import type { ReactNode } from "react";

type Tone = "neutral" | "accent";

const TONES: Record<Tone, string> = {
  neutral: "bg-ink/5 text-ink/70",
  accent: "bg-jungle-soft text-jungle",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
