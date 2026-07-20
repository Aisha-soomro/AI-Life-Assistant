import { useState, type DragEvent } from "react";
import { actionButtonClasses } from "@/components/ui/actionButton";
import { Button } from "@/components/ui/Button";
import {
  CATEGORY_ICONS,
  PRIORITY_BADGE_CLASSES,
} from "@/constants/tasks";
import type { Task, TaskDraft } from "@/types/Task";
import { describeDueDate, type DueTone } from "@/utils/date";
import { TaskFields } from "./TaskFields";

const DUE_TONE_CLASSES: Record<DueTone, string> = {
  overdue: "border-rose-500/40 bg-rose-500/15 font-semibold text-rose-400",
  today: "border-sky-500/40 bg-sky-500/15 text-sky-300",
  normal: "border-edge bg-panel text-slate-400",
  none: "border-edge bg-panel text-slate-500",
};

type TaskItemProps = {
  task: Task;
  dragEnabled: boolean;
  isDragging: boolean;
  isDragOver: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (updates: TaskDraft) => void;
  onDragStart: (e: DragEvent) => void;
  onDragOver: (e: DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: DragEvent) => void;
  onDragEnd: () => void;
};

export function TaskItem({
  task,
  dragEnabled,
  isDragging,
  isDragOver,
  onToggle,
  onDelete,
  onUpdate,
  ...dragHandlers
}: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<TaskDraft>(task);

  function startEdit() {
    setDraft(task);
    setEditing(true);
  }

  function saveEdit() {
    if (!draft.text.trim()) return;
    onUpdate({ ...draft, text: draft.text.trim() });
    setEditing(false);
  }

  const due = describeDueDate(task.dueDate);

  return (
    <li
      draggable={dragEnabled && !editing}
      {...dragHandlers}
      className={`group rounded-xl border bg-panel-light transition-all duration-200 animate-fade-up ${
        isDragOver
          ? "border-sky-400 ring-2 ring-sky-500/30"
          : "border-edge hover:border-sky-500/30"
      } ${isDragging ? "opacity-40" : ""} ${
        task.completed && !editing ? "opacity-60" : ""
      }`}
    >
      {editing ? (
        <div className="p-4">
          <TaskFields
            draft={draft}
            onChange={setDraft}
            onSubmit={saveEdit}
            onCancel={() => setEditing(false)}
            autoFocus
          />
          <div className="mt-3 flex justify-end gap-2">
            <Button
              variant="ghost"
              className="px-3 py-1.5 text-xs"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
            <Button className="px-4 py-1.5 text-xs" onClick={saveEdit}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2">
            {dragEnabled && (
              <span
                className="mt-0.5 cursor-grab select-none text-slate-600 transition-colors group-hover:text-slate-400 active:cursor-grabbing"
                title="Drag to reorder"
              >
                ⠿
              </span>
            )}

            <button
              onClick={onToggle}
              aria-label={
                task.completed ? "Mark as pending" : "Mark as completed"
              }
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
                task.completed
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-slate-600 hover:border-sky-400"
              }`}
            >
              {task.completed && (
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>

            <div>
              <p
                className={`font-medium transition-colors duration-200 ${
                  task.completed
                    ? "text-slate-500 line-through"
                    : "text-white"
                }`}
              >
                {task.text}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 text-sky-400">
                  {CATEGORY_ICONS[task.category]} {task.category}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 ${PRIORITY_BADGE_CLASSES[task.priority]}`}
                >
                  {task.priority}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 ${DUE_TONE_CLASSES[due.tone]}`}
                >
                  📅 {due.label}
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 gap-2 self-end sm:self-auto">
            <button
              onClick={startEdit}
              className={`${actionButtonClasses} hover:bg-sky-500/10 hover:text-sky-400`}
            >
              Edit
            </button>
            <button
              onClick={onToggle}
              className={`${actionButtonClasses} hover:bg-emerald-500/10 hover:text-emerald-400`}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={onDelete}
              className={`${actionButtonClasses} hover:bg-rose-500/10 hover:text-rose-400`}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
