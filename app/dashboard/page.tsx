import type { Metadata } from "next"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { DashboardWithSidebar } from "@/components/dashboard-with-sidebar"

export const metadata: Metadata = {
  title: "Dashboard | TradeLinx",
  description: "Your trading performance at a glance",
}

export default function DashboardPage() {
  return (
    <SidebarWrapper>
      <DashboardWithSidebar />
    </SidebarWrapper>
  )
}
