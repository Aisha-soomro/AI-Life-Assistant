type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
};

export function Toggle({ checked, onChange, label, className = "" }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`relative h-7 w-13 shrink-0 rounded-full transition-colors duration-300 ${
        checked ? "bg-sky-500" : "bg-panel-light"
      } ${className}`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${
          checked ? "left-7" : "left-1"
        }`}
      />
    </button>
  );
}
