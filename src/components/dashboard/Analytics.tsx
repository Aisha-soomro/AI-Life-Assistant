import type { Task, TaskStats } from "@/types/Task";
import { Card } from "@/components/ui/Card";
import { ChartCard } from "@/components/ui/ChartCard";
import { CategoryBars } from "@/components/charts/CategoryBars";
import { CompletionDonut } from "@/components/charts/CompletionDonut";
import { WeeklyTrend } from "@/components/charts/WeeklyTrend";

type AnalyticsProps = {
  tasks: Task[];
  stats: TaskStats;
};

export function Analytics({ tasks, stats }: AnalyticsProps) {
  if (tasks.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-3xl">📊</p>
        <p className="mt-2 text-sm text-slate-500">
          Add some tasks to see your analytics.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ChartCard title="✅ Task completion">
        <CompletionDonut stats={stats} />
      </ChartCard>

      <ChartCard title="🗂️ Tasks by category">
        <CategoryBars tasks={tasks} />
      </ChartCard>

      <ChartCard
        title="📈 Weekly productivity — tasks completed per day"
        className="md:col-span-2"
      >
        <WeeklyTrend tasks={tasks} />
      </ChartCard>
    </div>
  );
}
