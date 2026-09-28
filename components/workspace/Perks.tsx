import { CalendarCheck, RefreshCw, Truck, Wrench } from "lucide-react";

const PERKS = [
  { icon: Truck, title: "Free delivery", text: "Anywhere in Bali within 48 h" },
  { icon: Wrench, title: "Set up for you", text: "Assembled and cable-managed" },
  { icon: RefreshCw, title: "Swap anytime", text: "Change items as you go" },
  { icon: CalendarCheck, title: "Monthly plan", text: "No long-term contract" },
] as const;

export function Perks({ className = "" }: { className?: string }) {
  return (
    <div className={`@container ${className}`}>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-5 @2xl:grid-cols-4">
        {PERKS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/80 ring-1 ring-line">
              <Icon className="size-4 text-jungle" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold text-ink">{title}</span>
              <span className="block text-xs leading-snug text-muted">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
