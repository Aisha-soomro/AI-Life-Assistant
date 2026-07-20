export function browserSupportsNotifications(): boolean {
  return "Notification" in window;
}

export function notificationPermission(): NotificationPermission | "unsupported" {
  return browserSupportsNotifications() ? Notification.permission : "unsupported";
}

export async function requestNotificationPermission(): Promise<
  NotificationPermission | "unsupported"
> {
  if (!browserSupportsNotifications()) return "unsupported";
  return Notification.requestPermission();
}

/** Fires a browser notification if permission is granted. Returns true if shown. */
export function sendBrowserNotification(title: string, body: string): boolean {
  if (
    !browserSupportsNotifications() ||
    Notification.permission !== "granted"
  ) {
    return false;
  }

  const notification = new Notification(title, {
    body,
    tag: `${title}-${body}`, // collapses exact duplicates
  });
  notification.onclick = () => {
    window.focus();
    notification.close();
  };
  return true;
}
