import { Leaf, MapPin } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="flex h-16 items-center justify-between lg:h-20">
      <a href="#" className="flex items-center gap-2.5 rounded-full" aria-label="monis.rent home">
        <span className="flex size-9 items-center justify-center rounded-2xl bg-jungle text-white shadow-sm">
          <Leaf className="size-4.5" aria-hidden="true" />
        </span>
        <span className="text-lg font-semibold tracking-tight text-ink">
          monis<span className="text-muted">.rent</span>
        </span>
      </a>
      <p className="flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5 text-xs font-medium text-ink/80 ring-1 ring-line backdrop-blur">
        <MapPin className="size-3.5 text-jungle" aria-hidden="true" />
        <span className="hidden sm:inline">Delivering across</span> Bali
      </p>
    </header>
  );
}
