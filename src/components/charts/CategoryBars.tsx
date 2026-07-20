import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Task } from "@/types/Task";
import { categoryChartData } from "@/utils/taskAnalytics";
import { axisTickStyle, CHART_COLORS, tooltipStyle } from "./chartTheme";

type CategoryBarsProps = {
  tasks: Task[];
};

/** Stacked bars of completed/pending tasks per category */
export function CategoryBars({ tasks }: CategoryBarsProps) {
  const data = categoryChartData(tasks);

  return (
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={CHART_COLORS.grid}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={axisTickStyle}
            axisLine={{ stroke: CHART_COLORS.grid }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={axisTickStyle}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#1a254066" }} />
          <Legend
            wrapperStyle={{ fontSize: "0.75rem", color: CHART_COLORS.text }}
          />
          <Bar
            dataKey="Completed"
            stackId="tasks"
            fill={CHART_COLORS.emerald}
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="Pending"
            stackId="tasks"
            fill={CHART_COLORS.sky}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
