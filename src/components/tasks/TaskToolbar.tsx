import { CATEGORIES, CATEGORY_ICONS } from "@/constants/tasks";
import type { SortBy, StatusFilter } from "@/types/Task";
import type { CategoryFilter, TaskFilters } from "@/hooks/useTaskFilters";
import { compactFieldClasses } from "@/components/ui/field";

type TaskToolbarProps = {
  filters: TaskFilters;
};

export function TaskToolbar({ filters }: TaskToolbarProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        View
      </span>

      <select
        value={filters.sortBy}
        onChange={(e) => filters.setSortBy(e.target.value as SortBy)}
        className={compactFieldClasses}
        aria-label="Sort tasks"
      >
        <option value="manual">↕️ Manual order</option>
        <option value="priority">⭐ By priority</option>
        <option value="dueDate">📅 By due date</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) =>
          filters.setCategory(e.target.value as CategoryFilter)
        }
        className={compactFieldClasses}
        aria-label="Filter by category"
      >
        <option value="All">🗂️ All categories</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {CATEGORY_ICONS[category]} {category}
          </option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(e) => filters.setStatus(e.target.value as StatusFilter)}
        className={compactFieldClasses}
        aria-label="Filter by status"
      >
        <option value="all">👁️ All tasks</option>
        <option value="pending">⏳ Pending</option>
        <option value="completed">✅ Completed</option>
      </select>

      <span className="text-xs text-slate-500">
        {filters.sortBy === "manual"
          ? "Drag tasks to reorder"
          : "Switch to Manual order to drag"}
      </span>
    </div>
  );
}
