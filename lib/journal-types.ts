export type EntryType = "market-analysis" | "trade-review" | "trade-plan" | "general" | "lesson-learned"

export type EntryMood = "positive" | "neutral" | "negative"

export interface JournalImage {
  id: string
  url: string
  caption?: string
  createdAt: string
}

export interface JournalEntry {
  id: string
  title: string
  content: string
  entryType: EntryType
  createdAt: string
  updatedAt: string
  tags: string[]
  mood?: EntryMood
  tradeIds?: string[]
  images: JournalImage[]
  userId: string
}

export interface CreateJournalEntryParams {
  title: string
  content: string
  entryType: EntryType
  tags: string[]
  mood?: EntryMood
  tradeIds?: string[]
  images?: JournalImage[]
}

export interface UpdateJournalEntryParams extends Partial<CreateJournalEntryParams> {
  id: string
}
