import type { Metadata } from "next"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { PsychologyDashboard } from "@/components/psychology-dashboard"

export const metadata: Metadata = {
  title: "Trading Psychology | TradeLinx",
  description: "Improve your trading psychology and mental resilience",
}

export default function PsychologyPage() {
  return (
    <SidebarWrapper>
      <PsychologyDashboard />
    </SidebarWrapper>
  )
}
