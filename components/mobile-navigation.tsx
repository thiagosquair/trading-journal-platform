"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"
import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Home,
  LineChart,
  Menu,
  Settings,
  Users,
  Wallet,
  Target,
  Brain,
  GraduationCap,
  HelpCircle,
  History,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

export function MobileNavigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const routes = [
    {
      title: "Dashboard",
      links: [
        { href: "/dashboard", label: "Overview", icon: <Home className="h-5 w-5" /> },
        { href: "/analytics", label: "Analytics", icon: <BarChart3 className="h-5 w-5" /> },
      ],
    },
    {
      title: "Trading",
      links: [
        { href: "/trading-accounts", label: "Accounts", icon: <Wallet className="h-5 w-5" /> },
        { href: "/journal", label: "Journal", icon: <BookOpen className="h-5 w-5" /> },
        { href: "/calendar", label: "Calendar", icon: <Calendar className="h-5 w-5" /> },
        { href: "/leaderboard", label: "Leaderboard", icon: <Award className="h-5 w-5" /> },
        { href: "/goals", label: "Goals", icon: <Target className="h-5 w-5" /> },
        { href: "/psychology", label: "Psychology", icon: <Brain className="h-5 w-5" /> },
        { href: "/ai-analysis", label: "AI Analysis", icon: <LineChart className="h-5 w-5" /> },
        { href: "/social", label: "Social", icon: <Users className="h-5 w-5" /> },
        { href: "/backtesting", label: "Backtesting", icon: <History className="h-5 w-5" /> },
      ],
    },
    {
      title: "Learning",
      links: [
        { href: "/courses", label: "Courses", icon: <GraduationCap className="h-5 w-5" /> },
        { href: "/knowledge-base", label: "Knowledge Base", icon: <HelpCircle className="h-5 w-5" /> },
      ],
    },
    {
      title: "Reports",
      links: [
        { href: "/reports/performance", label: "Performance", icon: <LineChart className="h-5 w-5" /> },
        { href: "/reports/statements", label: "Statements", icon: <FileText className="h-5 w-5" /> },
      ],
    },
    {
      title: "Account",
      links: [
        { href: "/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
        { href: "/billing", label: "Billing", icon: <CreditCard className="h-5 w-5" /> },
      ],
    },
  ]

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SheetHeader className="border-b p-4">
            <SheetTitle asChild>
              <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <div className="h-8 w-8 relative">
                  <Image src="/tradelinx-logo.png" alt="TradeLinx Logo" fill className="object-contain" />
                </div>
                <div className="font-semibold">TradeLinx</div>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-5rem)]">
            <div className="px-2 py-4">
              {routes.map((group, i) => (
                <div key={i} className="mb-4">
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">{group.title}</div>
                  <div className="space-y-1">
                    {group.links.map((link, j) => (
                      <Link
                        key={j}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                          isActive(link.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}
