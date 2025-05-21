"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Bell, CreditCard, Lock, User, UserCircle, Settings, Eye } from "lucide-react"

export function SettingsSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const settingsLinks = [
    {
      title: "Account",
      href: "/settings",
      icon: User,
    },
    {
      title: "Profile",
      href: "/settings/profile",
      icon: UserCircle,
    },
    {
      title: "Privacy",
      href: "/settings/privacy",
      icon: Eye,
    },
    {
      title: "Notifications",
      href: "/settings/notifications",
      icon: Bell,
    },
    {
      title: "Security",
      href: "/settings/security",
      icon: Lock,
    },
    {
      title: "Billing",
      href: "/settings/billing",
      icon: CreditCard,
    },
    {
      title: "Preferences",
      href: "/settings/preferences",
      icon: Settings,
    },
  ]

  return (
    <div className="space-y-1">
      <div className="mb-4">
        <h2 className="text-xl font-semibold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <nav className="space-y-1">
        {settingsLinks.map((link) => (
          <Button
            key={link.href}
            variant={isActive(link.href) ? "secondary" : "ghost"}
            className={cn("w-full justify-start", isActive(link.href) ? "bg-secondary" : "")}
            asChild
          >
            <Link href={link.href}>
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  )
}
