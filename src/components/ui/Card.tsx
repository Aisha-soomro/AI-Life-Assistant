import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

/** Dark panel with border, rounding and shadow used across the app */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-edge bg-panel shadow-lg shadow-black/20 ${className}`}
    >
      {children}
    </div>
  );
}
