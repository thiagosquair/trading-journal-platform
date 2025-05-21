import type { Metadata } from "next"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { SocialFeed } from "@/components/social-feed"

export const metadata: Metadata = {
  title: "Social Feed | TradeLinx",
  description: "Connect with other traders and share your trading journey",
}

export default function SocialPage() {
  return (
    <SidebarWrapper>
      <SocialFeed />
    </SidebarWrapper>
  )
}
