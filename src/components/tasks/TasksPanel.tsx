import type { TaskDraft, TaskStats } from "@/types/Task";
import type { TaskFilters } from "@/hooks/useTaskFilters";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { fieldClasses } from "@/components/ui/field";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskToolbar } from "@/components/tasks/TaskToolbar";

type TasksPanelProps = {
  stats: TaskStats;
  filters: TaskFilters;
  onAdd: (draft: TaskDraft) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updates: TaskDraft) => void;
  onReorder: (dragId: number, overId: number) => void;
};

export function TasksPanel({
  stats,
  filters,
  onAdd,
  onToggle,
  onDelete,
  onUpdate,
  onReorder,
}: TasksPanelProps) {
  return (
    <Card className="p-5 shadow-xl sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Today's Tasks
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Completed {stats.completed} of {stats.total} tasks
          </p>
        </div>

        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => filters.setSearch(e.target.value)}
          className={`${fieldClasses} sm:w-64`}
        />
      </div>

      <ProgressBar progress={stats.progress} />
      <TaskForm onAdd={onAdd} />
      <TaskToolbar filters={filters} />

      <TaskList
        tasks={filters.visibleTasks}
        dragEnabled={filters.sortBy === "manual"}
        onToggle={onToggle}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onReorder={onReorder}
      />

      {stats.total > 0 && stats.completed === stats.total && (
        <p className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center font-semibold text-emerald-400 animate-fade-in">
          🎉 Congratulations! All tasks completed.
        </p>
      )}
    </Card>
  );
}
