import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Task } from "@/types/Task";
import { lastNDays } from "@/utils/date";
import { axisTickStyle, CHART_COLORS, tooltipStyle } from "./chartTheme";

type WeeklyTrendProps = {
  tasks: Task[];
};

export function WeeklyTrend({ tasks }: WeeklyTrendProps) {
  const data = lastNDays(7).map(({ iso, label }) => ({
    name: label,
    Completed: tasks.filter((t) => t.completed && t.completedAt === iso)
      .length,
  }));

  return (
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
          <defs>
            <linearGradient id="weeklyFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS.sky} stopOpacity={0.4} />
              <stop offset="100%" stopColor={CHART_COLORS.sky} stopOpacity={0} />
            </linearGradient>
          </defs>
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
          <Tooltip contentStyle={tooltipStyle} />
          <Area
            type="monotone"
            dataKey="Completed"
            stroke={CHART_COLORS.sky}
            strokeWidth={2}
            fill="url(#weeklyFill)"
            dot={{ fill: CHART_COLORS.sky, r: 3 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
