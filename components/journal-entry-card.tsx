"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Edit, Trash2, ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { JournalEntry } from "@/lib/journal-types"
import { JournalEntryForm } from "./journal-entry-form"
import { deleteJournalEntry } from "@/lib/journal-actions"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import { ImageGallery } from "./image-gallery"

interface JournalEntryCardProps {
  entry: JournalEntry
}

export function JournalEntryCard({ entry }: JournalEntryCardProps) {
  const router = useRouter()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const formattedDate = format(new Date(entry.createdAt), "MMM d, yyyy")

  const entryTypeLabels: Record<string, string> = {
    "market-analysis": "Market Analysis",
    "trade-review": "Trade Review",
    "trade-plan": "Trade Plan",
    general: "General Note",
    "lesson-learned": "Lesson Learned",
  }

  const moodColors: Record<string, string> = {
    positive: "bg-green-100 text-green-800",
    neutral: "bg-blue-100 text-blue-800",
    negative: "bg-red-100 text-red-800",
  }

  async function handleDelete() {
    setIsDeleting(true)

    try {
      const result = await deleteJournalEntry(entry.id)

      if (result.success) {
        toast({
          title: "Journal entry deleted",
          description: "Your journal entry has been deleted successfully.",
        })
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete journal entry",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting journal entry:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{entry.title}</CardTitle>
              <CardDescription>{formattedDate}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap mb-4">{entry.content}</div>

          {entry.images && entry.images.length > 0 && (
            <div className="mt-4">
              <ImageGallery images={entry.images} />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2 w-full">
            {entry.mood && (
              <span className={`text-xs px-2 py-1 rounded ${moodColors[entry.mood]}`}>
                {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
              </span>
            )}
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
              {entryTypeLabels[entry.entryType]}
            </span>
            {entry.images && entry.images.length > 0 && (
              <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded flex items-center">
                <ImageIcon className="h-3 w-3 mr-1" />
                {entry.images.length} {entry.images.length === 1 ? "image" : "images"}
              </span>
            )}
            {entry.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>

      <JournalEntryForm open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} initialData={entry} mode="edit" />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your journal entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
