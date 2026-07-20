import { STAT_CARDS } from "@/constants/dashboard";
import type { TaskStats } from "@/types/Task";
import { StatCard } from "@/components/ui/StatCard";

type StatCardsProps = {
  stats: TaskStats;
};

export function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {STAT_CARDS.map((card) => (
        <StatCard
          key={card.key}
          label={card.label}
          value={stats[card.key]}
          icon={card.icon}
          accent={card.accent}
          glow={card.glow}
          ring={card.ring}
        />
      ))}
    </div>
  );
}
