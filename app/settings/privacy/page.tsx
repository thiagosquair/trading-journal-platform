import type { Metadata } from "next"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { PrivacySettings } from "@/components/settings/privacy-settings"

export const metadata: Metadata = {
  title: "Privacy Settings | TradeLinx",
  description: "Control what information is shared publicly on your TradeLinx profile",
}

export default function PrivacySettingsPage() {
  return (
    <SidebarWrapper>
      <div className="container py-6 max-w-5xl">
        <PrivacySettings />
      </div>
    </SidebarWrapper>
  )
}
