type SectionHeaderProps = {
  icon: string;
  title: string;
  subtitle: string;
  /** Tailwind gradient stops, e.g. "from-sky-500 to-violet-600" */
  gradient: string;
};

export function SectionHeader({
  icon,
  title,
  subtitle,
  gradient,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-lg shadow-lg shadow-black/30`}
      >
        {icon}
      </span>
      <div>
        <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}
