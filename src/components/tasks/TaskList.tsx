import { useState } from "react";
import type { Task, TaskDraft } from "@/types/Task";
import { TaskItem } from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  dragEnabled: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updates: TaskDraft) => void;
  onReorder: (dragId: number, overId: number) => void;
};

export function TaskList({
  tasks,
  dragEnabled,
  onToggle,
  onDelete,
  onUpdate,
  onReorder,
}: TaskListProps) {
  const [dragId, setDragId] = useState<number | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);

  if (tasks.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed border-edge p-8 text-center animate-fade-in">
        <p className="text-3xl">🗒️</p>
        <p className="mt-2 text-sm text-slate-500">
          No tasks match. Add one above or adjust the filters.
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-4 space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          dragEnabled={dragEnabled}
          isDragging={dragId === task.id}
          isDragOver={dragOverId === task.id && dragId !== task.id}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
          onUpdate={(updates) => onUpdate(task.id, updates)}
          onDragStart={(e) => {
            setDragId(task.id);
            e.dataTransfer.effectAllowed = "move";
          }}
          onDragOver={(e) => {
            if (dragId === null) return;
            e.preventDefault();
            setDragOverId(task.id);
          }}
          onDragLeave={() =>
            setDragOverId((v) => (v === task.id ? null : v))
          }
          onDrop={(e) => {
            e.preventDefault();
            if (dragId !== null) onReorder(dragId, task.id);
            setDragId(null);
            setDragOverId(null);
          }}
          onDragEnd={() => {
            setDragId(null);
            setDragOverId(null);
          }}
        />
      ))}
    </ul>
  );
}
