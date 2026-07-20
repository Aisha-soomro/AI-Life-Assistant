export type ReminderSettings = {
  enabled: boolean;
  /** Notify when a task is due within this many days */
  daysBefore: number;
  /** "HH:MM" time for the daily summary */
  dailyTime: string;
};

export const DEFAULT_REMINDER_SETTINGS: ReminderSettings = {
  enabled: true,
  daysBefore: 1,
  dailyTime: "09:00",
};
