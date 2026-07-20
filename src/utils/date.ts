const DAY_MS = 86_400_000;

/** Today's date as yyyy-mm-dd in the user's local timezone */
export function todayISO(): string {
  return new Date().toLocaleDateString("en-CA");
}

export function addDaysISO(iso: string, days: number): string {
  const date = new Date(iso);
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("en-CA");
}

/** Whole days from today until the given date (negative = past) */
export function daysUntil(iso: string): number {
  return Math.round(
    (new Date(iso).getTime() - new Date(todayISO()).getTime()) / DAY_MS
  );
}

/** The last `n` days ending today, oldest first */
export function lastNDays(n: number): { iso: string; label: string }[] {
  const today = todayISO();
  return Array.from({ length: n }, (_, i) => {
    const iso = addDaysISO(today, i - (n - 1));
    return {
      iso,
      label: new Date(iso).toLocaleDateString(undefined, {
        weekday: "short",
      }),
    };
  });
}

export type DueTone = "overdue" | "today" | "normal" | "none";

/** Human-friendly due-date label with a severity tone */
export function describeDueDate(dueDate: string): {
  label: string;
  tone: DueTone;
} {
  if (!dueDate) return { label: "No date", tone: "none" };

  const days = daysUntil(dueDate);
  if (days < 0) {
    return {
      label: days === -1 ? "Overdue by 1 day" : `Overdue by ${-days} days`,
      tone: "overdue",
    };
  }
  if (days === 0) return { label: "Due today", tone: "today" };
  if (days === 1) return { label: "Due tomorrow", tone: "normal" };

  return {
    label: new Date(dueDate).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    tone: "normal",
  };
}
