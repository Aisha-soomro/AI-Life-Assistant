import { sendBrowserNotification } from "@/utils/notifications";
import { showToast } from "@/utils/toast";

/** Sends via browser notification AND in-app toast */
export function remind(title: string, body: string, icon: string) {
  sendBrowserNotification(title, body);
  showToast(title, body, icon);
}
