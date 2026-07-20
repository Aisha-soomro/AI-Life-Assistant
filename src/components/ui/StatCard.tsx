import type { TaskStats } from "@/types/Task";

type StatCardProps = {
  label: string;
  value: number;
  icon: string;
  accent: string;
  glow: string;
  ring: string;
};

export function StatCard({
  label,
  value,
  icon,
  accent,
  glow,
  ring,
}: StatCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${ring} bg-panel p-5 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${glow} to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{label}</p>
          <p className={`mt-2 text-4xl font-bold ${accent}`}>{value}</p>
        </div>
        <span className="text-2xl opacity-80 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
      </div>
    </div>
  );
}

export type StatCardConfig = {
  key: keyof TaskStats;
  label: string;
  icon: string;
  accent: string;
  glow: string;
  ring: string;
};
