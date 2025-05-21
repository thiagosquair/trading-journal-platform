import type { Metadata } from "next"
import { NotificationSettings } from "@/components/settings/notification-settings"

export const metadata: Metadata = {
  title: "Notification Settings | TradeLinx",
  description: "Manage your notification preferences",
}

export default function NotificationSettingsPage() {
  return <NotificationSettings />
}
