import type { TaskStats } from "@/types/Task";

type StatCardKey = keyof TaskStats;

export const STAT_CARDS: {
  key: StatCardKey;
  label: string;
  icon: string;
  accent: string;
  glow: string;
  ring: string;
}[] = [
  {
    key: "total",
    label: "Total Tasks",
    icon: "🗂️",
    accent: "text-sky-400",
    glow: "from-sky-500/15",
    ring: "border-sky-500/20",
  },
  {
    key: "completed",
    label: "Completed",
    icon: "✅",
    accent: "text-emerald-400",
    glow: "from-emerald-500/15",
    ring: "border-emerald-500/20",
  },
  {
    key: "pending",
    label: "Pending",
    icon: "⏳",
    accent: "text-amber-400",
    glow: "from-amber-500/15",
    ring: "border-amber-500/20",
  },
  {
    key: "overdue",
    label: "Overdue",
    icon: "⚠️",
    accent: "text-rose-400",
    glow: "from-rose-500/15",
    ring: "border-rose-500/20",
  },
];
