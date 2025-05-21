"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import type { EntryMood, EntryType, JournalEntry, JournalImage } from "@/lib/journal-types"
import { createJournalEntry, updateJournalEntry } from "@/lib/journal-actions"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ImageUpload } from "./image-upload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  entryType: z.enum(["market-analysis", "trade-review", "trade-plan", "general", "lesson-learned"]),
  tags: z.string().transform((val) => (val ? val.split(",").map((tag) => tag.trim()) : [])),
  mood: z.enum(["positive", "neutral", "negative"]).optional(),
  entryDate: z.date().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface JournalEntryFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: JournalEntry
  mode: "create" | "edit"
}

export function JournalEntryForm({ open, onOpenChange, initialData, mode }: JournalEntryFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<JournalImage[]>(initialData?.images || [])
  const [activeTab, setActiveTab] = useState<string>("content")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      entryType: (initialData?.entryType as EntryType) || "general",
      tags: initialData?.tags ? initialData.tags.join(", ") : "",
      mood: (initialData?.mood as EntryMood) || "neutral",
      entryDate: initialData ? new Date(initialData.createdAt) : new Date(),
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    try {
      if (mode === "create") {
        const result = await createJournalEntry({
          title: data.title,
          content: data.content,
          entryType: data.entryType,
          tags: data.tags,
          mood: data.mood,
          images,
        })

        if (result.success) {
          toast({
            title: "Journal entry created",
            description: "Your journal entry has been created successfully.",
          })
          form.reset()
          setImages([])
          onOpenChange(false)
          router.refresh()
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to create journal entry",
            variant: "destructive",
          })
        }
      } else if (mode === "edit" && initialData) {
        const result = await updateJournalEntry({
          id: initialData.id,
          title: data.title,
          content: data.content,
          entryType: data.entryType,
          tags: data.tags,
          mood: data.mood,
          images,
        })

        if (result.success) {
          toast({
            title: "Journal entry updated",
            description: "Your journal entry has been updated successfully.",
          })
          onOpenChange(false)
          router.refresh()
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to update journal entry",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create Journal Entry" : "Edit Journal Entry"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Record your trading thoughts, analyses, and reflections."
              : "Update your journal entry details."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a title for your journal entry" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="entryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entry Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select entry type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="market-analysis">Market Analysis</SelectItem>
                        <SelectItem value="trade-review">Trade Review</SelectItem>
                        <SelectItem value="trade-plan">Trade Plan</SelectItem>
                        <SelectItem value="general">General Note</SelectItem>
                        <SelectItem value="lesson-learned">Lesson Learned</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="entryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="pt-4">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Write your journal entry here..." className="min-h-[200px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="images" className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Images & Charts</h3>
                    <p className="text-xs text-muted-foreground">{images.length} of 5 images</p>
                  </div>
                  <ImageUpload images={images} onImagesChange={setImages} maxImages={5} />
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="EURUSD, Analysis, Breakout" {...field} />
                    </FormControl>
                    <FormDescription>Separate tags with commas</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mood</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mood" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="positive">Positive</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="negative">Negative</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === "create" ? "Create Entry" : "Update Entry"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
