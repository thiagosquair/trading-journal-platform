import type React from "react"
import "../app/globals.css" // Updated path
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { HelpButton } from "@/components/help-button"

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
          <SidebarWrapper>{children}</SidebarWrapper>
          <HelpButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
