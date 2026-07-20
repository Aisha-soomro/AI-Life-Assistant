import { CATEGORY_ICONS, PRIORITY_BG_CLASSES } from "@/constants/tasks";
import type { Task } from "@/types/Task";
import {
  countPendingByPriority,
  groupTasksByCategory,
} from "@/utils/taskAnalytics";
import { Card } from "@/components/ui/Card";

type TaskStatsBreakdownProps = {
  tasks: Task[];
};

/** Category completion bars + pending-by-priority breakdown */
export function TaskStatsBreakdown({ tasks }: TaskStatsBreakdownProps) {
  if (tasks.length === 0) return null;

  const byCategory = groupTasksByCategory(tasks);
  const byPriority = countPendingByPriority(tasks);
  const pendingTotal = byPriority.reduce((sum, p) => sum + p.count, 0);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-slate-300">
          📊 Progress by category
        </h3>
        <div className="mt-4 space-y-3">
          {byCategory.map(({ category, total, completed }) => (
            <div key={category}>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {CATEGORY_ICONS[category]} {category}
                </span>
                <span className="text-slate-500">
                  {completed}/{total}
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-panel-light">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500 transition-all duration-700 ease-out"
                  style={{ width: `${(completed / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-slate-300">
          ⚡ Pending by priority
        </h3>

        {pendingTotal === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            Nothing pending — great job! 🎉
          </p>
        ) : (
          <>
            <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-panel-light">
              {byPriority.map(
                ({ priority, count }) =>
                  count > 0 && (
                    <div
                      key={priority}
                      className={`${PRIORITY_BG_CLASSES[priority]} transition-all duration-700 ease-out`}
                      style={{ width: `${(count / pendingTotal) * 100}%` }}
                    />
                  )
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              {byPriority.map(({ priority, count }) => (
                <div
                  key={priority}
                  className="flex items-center gap-2 text-xs text-slate-400"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${PRIORITY_BG_CLASSES[priority]}`}
                  />
                  {priority}: <span className="text-white">{count}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
