import type { ReminderSettings } from "@/types/Reminder";
import { remind } from "@/utils/remind";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Toggle } from "@/components/ui/Toggle";
import { compactFieldClasses } from "@/components/ui/field";

type RemindersPanelProps = {
  settings: ReminderSettings;
  setSettings: (settings: ReminderSettings) => void;
  permission: NotificationPermission | "unsupported";
  enableNotifications: () => void;
};

export function RemindersPanel({
  settings,
  setSettings,
  permission,
  enableNotifications,
}: RemindersPanelProps) {
  return (
    <Card className="p-5 shadow-xl sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeader
          icon="🔔"
          title="Reminders"
          subtitle="Get notified about due tasks while the app is open"
          gradient="from-amber-500 to-rose-500"
        />

        <Toggle
          checked={settings.enabled}
          onChange={(enabled) => setSettings({ ...settings, enabled })}
          label="Toggle reminders"
          className="self-start sm:self-auto"
        />
      </div>

      <div className="mt-5">
        {permission === "unsupported" && (
          <p className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-400">
            This browser doesn't support notifications — you'll still see
            in-app reminders.
          </p>
        )}

        {permission === "default" && (
          <div className="flex flex-col items-start gap-3 rounded-xl border border-sky-500/20 bg-sky-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-300">
              Allow browser notifications to get reminders even when you're in
              another tab.
            </p>
            <Button onClick={enableNotifications} className="shrink-0">
              Enable notifications
            </Button>
          </div>
        )}

        {permission === "granted" && (
          <p className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Browser notifications are enabled.
          </p>
        )}

        {permission === "denied" && (
          <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-400">
            Notifications are blocked. Enable them in your browser's site
            settings (the lock icon in the address bar) — in-app reminders still
            work.
          </p>
        )}
      </div>

      {settings.enabled && (
        <div className="mt-5 flex flex-wrap items-end gap-4 animate-fade-in">
          <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-400">
            Remind me before due date
            <select
              value={settings.daysBefore}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  daysBefore: Number(e.target.value),
                })
              }
              className={compactFieldClasses}
            >
              <option value={0}>On the due day</option>
              <option value={1}>1 day before</option>
              <option value={2}>2 days before</option>
              <option value={3}>3 days before</option>
              <option value={7}>1 week before</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-400">
            Daily check-in time
            <input
              type="time"
              value={settings.dailyTime}
              onChange={(e) =>
                setSettings({ ...settings, dailyTime: e.target.value })
              }
              className={compactFieldClasses}
            />
          </label>

          <Button
            variant="ghost"
            onClick={() =>
              remind(
                "🔔 Test notification",
                "Reminders are working! You'll be notified about due tasks.",
                "🔔"
              )
            }
          >
            Send test
          </Button>
        </div>
      )}
    </Card>
  );
}
