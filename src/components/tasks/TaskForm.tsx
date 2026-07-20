import { useState } from "react";
import { EMPTY_DRAFT } from "@/constants/tasks";
import type { TaskDraft } from "@/types/Task";
import { Button } from "@/components/ui/Button";
import { TaskFields } from "./TaskFields";

type TaskFormProps = {
  onAdd: (draft: TaskDraft) => void;
};

export function TaskForm({ onAdd }: TaskFormProps) {
  const [draft, setDraft] = useState<TaskDraft>(EMPTY_DRAFT);

  function submit() {
    if (!draft.text.trim()) return;
    onAdd(draft);
    setDraft(EMPTY_DRAFT);
  }

  return (
    <div className="mt-6 rounded-xl border border-edge bg-surface/50 p-4 sm:p-5">
      <p className="text-sm font-semibold text-slate-300">Add a new task</p>

      <div className="mt-3 space-y-3">
        <TaskFields draft={draft} onChange={setDraft} onSubmit={submit} />
        <Button onClick={submit} className="w-full sm:w-auto">
          + Add Task
        </Button>
      </div>
    </div>
  );
}
