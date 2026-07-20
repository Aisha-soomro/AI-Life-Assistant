import { useEffect, useState } from "react";
import {
  DEFAULT_REMINDER_SETTINGS,
  type ReminderSettings,
} from "@/types/Reminder";
import type { Task } from "@/types/Task";
import { daysUntil, todayISO } from "@/utils/date";
import { remind } from "@/utils/remind";
import {
  notificationPermission,
  requestNotificationPermission,
} from "@/utils/notifications";
import { useLocalStorage } from "./useLocalStorage";

const CHECK_INTERVAL_MS = 30_000;
const FIRED_KEY = "remindersFired";

function loadFired(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(FIRED_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function dueReminderFor(task: Task, daysBefore: number) {
  const days = daysUntil(task.dueDate);
  if (days < 0) {
    return {
      title: "⚠️ Task overdue",
      body: `"${task.text}" was due ${days === -1 ? "yesterday" : `${-days} days ago`}.`,
      icon: "⚠️",
    };
  }
  if (days === 0) {
    return {
      title: "📅 Due today",
      body: `"${task.text}" is due today.`,
      icon: "📅",
    };
  }
  if (days <= daysBefore) {
    return {
      title: "⏰ Upcoming task",
      body: `"${task.text}" is due ${days === 1 ? "tomorrow" : `in ${days} days`}.`,
      icon: "⏰",
    };
  }
  return null;
}

export function useReminders(tasks: Task[]) {
  const [settings, setSettings] = useLocalStorage<ReminderSettings>(
    "reminderSettings",
    DEFAULT_REMINDER_SETTINGS
  );
  const [permission, setPermission] = useState(notificationPermission());

  async function enableNotifications() {
    const result = await requestNotificationPermission();
    setPermission(result);
    if (result === "granted") {
      remind(
        "Notifications enabled 🎉",
        "You'll get reminders for upcoming and overdue tasks.",
        "✅"
      );
    }
  }

  useEffect(() => {
    if (!settings.enabled) return;

    function checkReminders() {
      const today = todayISO();
      const previouslyFired = loadFired();
      const fired: Record<string, boolean> = {};
      for (const key of Object.keys(previouslyFired)) {
        if (key.endsWith(today)) fired[key] = true;
      }

      for (const task of tasks) {
        if (task.completed || !task.dueDate) continue;
        const key = `due-${task.id}-${today}`;
        if (fired[key]) continue;

        const reminder = dueReminderFor(task, settings.daysBefore);
        if (reminder) {
          remind(reminder.title, reminder.body, reminder.icon);
          fired[key] = true;
        }
      }

      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const dailyKey = `daily-${today}`;
      if (currentTime >= settings.dailyTime && !fired[dailyKey]) {
        const pending = tasks.filter((t) => !t.completed).length;
        remind(
          "☀️ Daily check-in",
          pending === 0
            ? "No pending tasks — enjoy your day!"
            : `You have ${pending} pending task${pending === 1 ? "" : "s"} today. You've got this!`,
          "☀️"
        );
        fired[dailyKey] = true;
      }

      localStorage.setItem(FIRED_KEY, JSON.stringify(fired));
    }

    checkReminders();
    const interval = setInterval(checkReminders, CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [tasks, settings]);

  return { settings, setSettings, permission, enableNotifications };
}
