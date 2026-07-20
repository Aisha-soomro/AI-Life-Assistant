import { useMemo } from "react";
import type {
  Category,
  Priority,
  Task,
  TaskDraft,
  TaskStats,
} from "@/types/Task";
import { todayISO } from "@/utils/date";
import { useLocalStorage } from "./useLocalStorage";

function migrateTasks(stored: unknown): Task[] {
  if (!Array.isArray(stored)) return [];
  return stored.map((raw, index) => {
    const task = raw as Partial<Task>;
    return {
      id: task.id ?? Date.now() + index,
      text: task.text ?? "",
      completed: task.completed ?? false,
      category: (task.category as Category) ?? "Personal",
      dueDate: task.dueDate ?? "",
      priority: (task.priority as Priority) ?? "Medium",
      completedAt: task.completedAt,
    };
  });
}

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [], migrateTasks);

  function addTask(draft: TaskDraft) {
    const text = draft.text.trim();
    if (!text) return;
    setTasks((prev) => [
      ...prev,
      { ...draft, text, id: Date.now(), completed: false },
    ]);
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? todayISO() : undefined,
            }
          : t
      )
    );
  }

  function updateTask(id: number, updates: Partial<TaskDraft>) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }

  function reorderTasks(dragId: number, overId: number) {
    if (dragId === overId) return;
    setTasks((prev) => {
      const from = prev.findIndex((t) => t.id === dragId);
      const to = prev.findIndex((t) => t.id === overId);
      if (from === -1 || to === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  const stats: TaskStats = useMemo(() => {
    const today = todayISO();
    const completed = tasks.filter((t) => t.completed).length;
    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
      overdue: tasks.filter(
        (t) => !t.completed && t.dueDate !== "" && t.dueDate < today
      ).length,
      progress:
        tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100),
    };
  }, [tasks]);

  return {
    tasks,
    stats,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    reorderTasks,
  };
}
