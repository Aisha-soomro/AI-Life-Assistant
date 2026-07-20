/** Shared colors and styles for Recharts components on the dark theme */
export const CHART_COLORS = {
  emerald: "#34d399",
  sky: "#38bdf8",
  amber: "#fbbf24",
  rose: "#fb7185",
  violet: "#a78bfa",
  track: "#1a2540",
  grid: "#223052",
  text: "#94a3b8",
};

export const tooltipStyle = {
  backgroundColor: "#111a2e",
  border: "1px solid #223052",
  borderRadius: "0.75rem",
  fontSize: "0.75rem",
  color: "#e2e8f0",
} as const;

export const axisTickStyle = {
  fill: CHART_COLORS.text,
  fontSize: 11,
} as const;
