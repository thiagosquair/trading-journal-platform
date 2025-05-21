import type React from "react"
import type { Metadata } from "next"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { SettingsSidebar } from "@/components/settings/settings-sidebar"

export const metadata: Metadata = {
  title: "Settings | TradeLinx",
  description: "Manage your TradeLinx account settings",
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarWrapper>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-64 flex-shrink-0">
            <SettingsSidebar />
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </SidebarWrapper>
  )
}
