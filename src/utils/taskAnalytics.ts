import {
  CATEGORIES,
  CATEGORY_ICONS,
  PRIORITIES,
} from "@/constants/tasks";
import type { Category, Priority, Task } from "@/types/Task";

export type CategoryGroup = {
  category: Category;
  total: number;
  completed: number;
  pending: number;
};

export type PriorityCount = {
  priority: Priority;
  count: number;
};

export function groupTasksByCategory(tasks: Task[]): CategoryGroup[] {
  return CATEGORIES.map((category) => {
    const items = tasks.filter((t) => t.category === category);
    const completed = items.filter((t) => t.completed).length;
    return {
      category,
      total: items.length,
      completed,
      pending: items.length - completed,
    };
  }).filter((group) => group.total > 0);
}

export function countPendingByPriority(tasks: Task[]): PriorityCount[] {
  return PRIORITIES.map((priority) => ({
    priority,
    count: tasks.filter((t) => !t.completed && t.priority === priority).length,
  }));
}

/** Recharts-friendly rows for the category bar chart */
export function categoryChartData(tasks: Task[]) {
  return groupTasksByCategory(tasks).map(
    ({ category, completed, pending }) => ({
      name: `${CATEGORY_ICONS[category]} ${category}`,
      Completed: completed,
      Pending: pending,
    })
  );
}
