import {
  CATEGORIES,
  CATEGORY_ICONS,
  PRIORITIES,
  PRIORITY_ICONS,
} from "@/constants/tasks";
import type { Category, Priority, TaskDraft } from "@/types/Task";
import { fieldClasses } from "@/components/ui/field";

type TaskFieldsProps = {
  draft: TaskDraft;
  onChange: (draft: TaskDraft) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  autoFocus?: boolean;
};

/** The four task fields, shared by the add form and inline editing */
export function TaskFields({
  draft,
  onChange,
  onSubmit,
  onCancel,
  autoFocus = false,
}: TaskFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <input
        type="text"
        placeholder="Enter a task..."
        value={draft.text}
        autoFocus={autoFocus}
        onChange={(e) => onChange({ ...draft, text: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit?.();
          if (e.key === "Escape") onCancel?.();
        }}
        className={`${fieldClasses} sm:col-span-3`}
      />

      <select
        value={draft.category}
        onChange={(e) =>
          onChange({ ...draft, category: e.target.value as Category })
        }
        className={fieldClasses}
        aria-label="Category"
      >
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {CATEGORY_ICONS[category]} {category}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={draft.dueDate}
        onChange={(e) => onChange({ ...draft, dueDate: e.target.value })}
        className={fieldClasses}
        aria-label="Due date"
      />

      <select
        value={draft.priority}
        onChange={(e) =>
          onChange({ ...draft, priority: e.target.value as Priority })
        }
        className={fieldClasses}
        aria-label="Priority"
      >
        {PRIORITIES.map((priority) => (
          <option key={priority} value={priority}>
            {PRIORITY_ICONS[priority]} {priority}
          </option>
        ))}
      </select>
    </div>
  );
}
