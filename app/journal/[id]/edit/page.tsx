"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { JournalEntryForm } from "@/components/journal-entry-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { getJournalEntryById } from "@/lib/journal-actions"
import type { JournalEntry } from "@/lib/journal-types"

interface EditJournalEntryPageProps {
  params: {
    id: string
  }
}

export default function EditJournalEntryPage({ params }: EditJournalEntryPageProps) {
  const router = useRouter()
  const [isFormOpen, setIsFormOpen] = useState(true)
  const [entry, setEntry] = useState<JournalEntry | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadEntry() {
      try {
        const entryData = await getJournalEntryById(params.id)
        if (entryData) {
          setEntry(entryData)
        } else {
          setError("Journal entry not found")
        }
      } catch (err) {
        setError("Failed to load journal entry")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadEntry()
  }, [params.id])

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
              <h1 className="text-xl font-semibold">Edit Journal Entry</h1>
              <p className="text-sm text-muted-foreground">Update your trading journal entry</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <Button asChild>
                  <Link href="/journal">Back to Journal</Link>
                </Button>
              </div>
            </div>
          ) : entry ? (
            <JournalEntryForm open={isFormOpen} onOpenChange={handleOpenChange} initialData={entry} mode="edit" />
          ) : null}
        </div>
      </div>
    </SidebarWrapper>
  )
}
