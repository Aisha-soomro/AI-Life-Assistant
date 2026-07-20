import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "violet" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-sky-500 to-violet-600 font-semibold text-white shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:brightness-110 active:scale-[0.98]",
  violet:
    "bg-gradient-to-r from-violet-500 to-fuchsia-600 font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:brightness-110 active:scale-[0.98]",
  ghost:
    "border border-edge bg-panel-light font-medium text-slate-300 hover:bg-panel hover:text-white",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-lg px-4 py-2.5 text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
