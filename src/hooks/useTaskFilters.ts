import { useMemo, useState } from "react";
import { PRIORITY_ORDER } from "@/constants/tasks";
import type {
  Category,
  SortBy,
  StatusFilter,
  Task,
} from "@/types/Task";

export type CategoryFilter = Category | "All";

export type TaskFilters = {
  search: string;
  setSearch: (value: string) => void;
  sortBy: SortBy;
  setSortBy: (value: SortBy) => void;
  category: CategoryFilter;
  setCategory: (value: CategoryFilter) => void;
  status: StatusFilter;
  setStatus: (value: StatusFilter) => void;
  visibleTasks: Task[];
};

export function useTaskFilters(tasks: Task[]): TaskFilters {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("manual");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [status, setStatus] = useState<StatusFilter>("all");

  const visibleTasks = useMemo(() => {
    const query = search.toLowerCase();

    const filtered = tasks.filter((task) => {
      if (query && !task.text.toLowerCase().includes(query)) return false;
      if (category !== "All" && task.category !== category) return false;
      if (status === "pending" && task.completed) return false;
      if (status === "completed" && !task.completed) return false;
      return true;
    });

    if (sortBy === "priority") {
      filtered.sort(
        (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      );
    } else if (sortBy === "dueDate") {
      filtered.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      });
    }

    return filtered;
  }, [tasks, search, sortBy, category, status]);

  return {
    search,
    setSearch,
    sortBy,
    setSortBy,
    category,
    setCategory,
    status,
    setStatus,
    visibleTasks,
  };
}
