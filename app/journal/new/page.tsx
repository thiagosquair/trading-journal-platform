"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { JournalEntryForm } from "@/components/journal-entry-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewJournalEntryPage() {
  const router = useRouter()
  const [isFormOpen, setIsFormOpen] = useState(true)

  // Redirect back to journal page when form is closed
  const handleOpenChange = (open: boolean) => {
    setIsFormOpen(open)
    if (!open) {
      router.push("/journal")
    }
  }

  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-full">
        <header className="border-b bg-background">
          <div className="flex h-16 items-center px-4 gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/journal">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div className="ml-2 flex-1">
              <h1 className="text-xl font-semibold">New Journal Entry</h1>
              <p className="text-sm text-muted-foreground">Create a new trading journal entry</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          <JournalEntryForm open={isFormOpen} onOpenChange={handleOpenChange} mode="create" />
        </div>
      </div>
    </SidebarWrapper>
  )
}
