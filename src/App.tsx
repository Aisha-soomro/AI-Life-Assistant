import { useState } from "react";
import { AIChat } from "@/components/ai/AIChat";
import { Analytics } from "@/components/dashboard/Analytics";
import { StatCards } from "@/components/dashboard/StatCards";
import { TaskStatsBreakdown } from "@/components/dashboard/TaskStatsBreakdown";
import { Header } from "@/components/layout/Header";
import { Section } from "@/components/layout/Section";
import { Sidebar } from "@/components/layout/Sidebar";
import { RemindersPanel } from "@/components/reminders/RemindersPanel";
import { TasksPanel } from "@/components/tasks/TasksPanel";
import { ToastHost } from "@/components/ui/Toast";
import { useReminders } from "@/hooks/useReminders";
import { useTaskFilters } from "@/hooks/useTaskFilters";
import { useTasks } from "@/hooks/useTasks";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    tasks,
    stats,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    reorderTasks,
  } = useTasks();

  const filters = useTaskFilters(tasks);
  const reminders = useReminders(tasks);

  return (
    <div className="min-h-screen bg-surface text-slate-200">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-8">
          <Section id="dashboard" className="space-y-4">
            <StatCards stats={stats} />
            <Analytics tasks={tasks} stats={stats} />
            <TaskStatsBreakdown tasks={tasks} />
          </Section>

          <Section id="tasks">
            <TasksPanel
              stats={stats}
              filters={filters}
              onAdd={addTask}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onUpdate={updateTask}
              onReorder={reorderTasks}
            />
          </Section>

          <Section id="reminders">
            <RemindersPanel {...reminders} />
          </Section>

          <Section id="assistant">
            <AIChat />
          </Section>
        </main>
      </div>

      <ToastHost />
    </div>
  );
}

export default App;
