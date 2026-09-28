import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-ink text-white shadow-[0_10px_30px_-12px_rgba(29,27,24,0.6)] hover:bg-ink/90 hover:-translate-y-px",
  secondary: "bg-white text-ink ring-1 ring-line hover:ring-ink/25 hover:-translate-y-px",
  ghost: "text-ink hover:bg-ink/5",
};

const SIZES: Record<Size, string> = {
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-13 px-6 text-[15px] gap-2.5",
};

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold transition duration-200 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    />
  );
}
