import type { Metadata } from "next"
import { PreferencesSettings } from "@/components/settings/preferences-settings"

export const metadata: Metadata = {
  title: "Preferences | TradeLinx",
  description: "Manage your application preferences",
}

export default function PreferencesSettingsPage() {
  return <PreferencesSettings />
}
