import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { TaskStats } from "@/types/Task";
import { CHART_COLORS, tooltipStyle } from "./chartTheme";

type CompletionDonutProps = {
  stats: TaskStats;
};

export function CompletionDonut({ stats }: CompletionDonutProps) {
  const data = [
    { name: "Completed", value: stats.completed, color: CHART_COLORS.emerald },
    { name: "Pending", value: stats.pending, color: CHART_COLORS.track },
  ];

  return (
    <div className="relative h-52">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius="68%"
            outerRadius="88%"
            paddingAngle={stats.completed > 0 && stats.pending > 0 ? 3 : 0}
            strokeWidth={0}
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">
          {stats.progress}%
        </span>
        <span className="text-xs text-slate-500">completed</span>
      </div>
    </div>
  );
}
