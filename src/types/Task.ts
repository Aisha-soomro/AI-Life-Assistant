export type Category =
  | "Study"
  | "Medicine"
  | "Meal"
  | "Exercise"
  | "Personal";

export type Priority = "High" | "Medium" | "Low";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
  category: Category;
  dueDate: string; // ISO yyyy-mm-dd, or "" for no date
  priority: Priority;
  /** ISO date the task was last marked completed; used for productivity charts */
  completedAt?: string;
};

/** Fields the user fills in when creating or editing a task */
export type TaskDraft = Pick<
  Task,
  "text" | "category" | "dueDate" | "priority"
>;

export type SortBy = "manual" | "priority" | "dueDate";
export type StatusFilter = "all" | "pending" | "completed";

export type TaskStats = {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  /** 0-100 completion percentage */
  progress: number;
};
