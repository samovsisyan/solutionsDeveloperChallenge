import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[28px] bg-white/80 shadow-[0_20px_60px_-35px_rgba(60,40,20,0.35)] ring-1 ring-black/5 backdrop-blur-xl ${className}`}
      {...props}
    />
  );
}
