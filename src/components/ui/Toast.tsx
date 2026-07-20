import { useEffect, useState } from "react";
import { subscribeToToasts, type ToastPayload } from "@/utils/toast";

type ToastItem = ToastPayload & { leaving?: boolean };

const AUTO_DISMISS_MS = 8000;
const LEAVE_MS = 250;
const MAX_VISIBLE = 4;

export function ToastHost() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function dismiss(id: number) {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, leaving: true } : t))
    );
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      LEAVE_MS
    );
  }

  useEffect(() => {
    return subscribeToToasts((toast) => {
      setToasts((prev) => [...prev.slice(-(MAX_VISIBLE - 1)), toast]);
      setTimeout(() => dismiss(toast.id), AUTO_DISMISS_MS);
    });
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 rounded-xl border border-edge bg-panel-light/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-md transition-all duration-300 ${
            toast.leaving
              ? "translate-x-4 opacity-0"
              : "translate-x-0 opacity-100 animate-fade-up"
          }`}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-violet-600 text-base shadow-lg shadow-sky-500/20">
            {toast.icon}
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">{toast.title}</p>
            {toast.body && (
              <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                {toast.body}
              </p>
            )}
          </div>

          <button
            onClick={() => dismiss(toast.id)}
            aria-label="Dismiss notification"
            className="shrink-0 rounded-md p-1 text-slate-500 transition-colors hover:bg-panel hover:text-white"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
