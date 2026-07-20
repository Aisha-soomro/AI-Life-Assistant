export type ToastPayload = {
  id: number;
  icon: string;
  title: string;
  body?: string;
};

type ToastListener = (toast: ToastPayload) => void;

let listener: ToastListener | null = null;
let nextId = 1;

export function subscribeToToasts(onToast: ToastListener) {
  listener = onToast;
  return () => {
    listener = null;
  };
}

/** Show an in-app toast from anywhere. Safe to call before the host mounts. */
export function showToast(title: string, body?: string, icon = "🔔") {
  listener?.({ id: nextId++, icon, title, body });
}
