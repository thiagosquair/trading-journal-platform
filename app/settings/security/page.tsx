import type { Metadata } from "next"
import { SecuritySettings } from "@/components/settings/security-settings"

export const metadata: Metadata = {
  title: "Security Settings | TradeLinx",
  description: "Manage your account security settings",
}

export default function SecuritySettingsPage() {
  return <SecuritySettings />
}
