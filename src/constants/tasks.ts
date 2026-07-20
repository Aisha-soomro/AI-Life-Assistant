import type { Category, Priority, TaskDraft } from "@/types/Task";

export const CATEGORIES: readonly Category[] = [
  "Study",
  "Medicine",
  "Meal",
  "Exercise",
  "Personal",
];

export const CATEGORY_ICONS: Record<Category, string> = {
  Study: "📚",
  Medicine: "💊",
  Meal: "🍽",
  Exercise: "🏃",
  Personal: "👤",
};

export const PRIORITIES: readonly Priority[] = ["High", "Medium", "Low"];

export const PRIORITY_ICONS: Record<Priority, string> = {
  High: "🔴",
  Medium: "🟡",
  Low: "🟢",
};

export const PRIORITY_ORDER: Record<Priority, number> = {
  High: 0,
  Medium: 1,
  Low: 2,
};

export const PRIORITY_BADGE_CLASSES: Record<Priority, string> = {
  High: "border-rose-500/30 bg-rose-500/10 text-rose-400",
  Medium: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
};

export const PRIORITY_BG_CLASSES: Record<Priority, string> = {
  High: "bg-rose-500",
  Medium: "bg-amber-500",
  Low: "bg-emerald-500",
};

export const EMPTY_DRAFT: TaskDraft = {
  text: "",
  category: "Study",
  dueDate: "",
  priority: "Medium",
};
