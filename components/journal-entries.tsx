import { JournalEntryCard } from "@/components/journal-entry-card"
import { JournalEntryTradeAnalysisView } from "@/components/journal-entry-trade-analysis-view"
import { getJournalEntries } from "@/lib/journal-actions"
import type { EntryType } from "@/lib/journal-types"

interface JournalEntriesProps {
  filter: "all" | EntryType
}

export async function JournalEntries({ filter }: JournalEntriesProps) {
  const entries = await getJournalEntries()

  const filteredEntries = filter === "all" ? entries : entries.filter((entry) => entry.entryType === filter)

  if (filteredEntries.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No journal entries found.</p>
      </div>
    )
  }

  // Sort entries by date (newest first)
  const sortedEntries = [...filteredEntries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <div className="space-y-6">
      {sortedEntries.map((entry) => {
        // Check if this is a trade analysis entry
        const isTradeAnalysis = entry.tags.includes("AI Analysis") && entry.entryType === "trade-plan"

        if (isTradeAnalysis) {
          return <JournalEntryTradeAnalysisView key={entry.id} entry={entry} />
        }

        return <JournalEntryCard key={entry.id} entry={entry} />
      })}
    </div>
  )
}
