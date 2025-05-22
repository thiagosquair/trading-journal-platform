import type React from "react"
import "../app/globals.css" // Updated path
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { HelpButton } from "@/components/help-button"
import { MobileHeader } from "@/components/mobile-header"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayoutWithSidebar({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <MobileHeader />
            <div className="flex flex-1">
              <SidebarWrapper>{children}</SidebarWrapper>
            </div>
          </div>
          <HelpButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
