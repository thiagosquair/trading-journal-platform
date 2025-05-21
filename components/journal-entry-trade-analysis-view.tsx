"use client"

import type { JournalEntry } from "@/lib/journal-types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface JournalEntryTradeAnalysisViewProps {
  entry: JournalEntry
}

export function JournalEntryTradeAnalysisView({ entry }: JournalEntryTradeAnalysisViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{entry.title}</CardTitle>
        <CardDescription>AI-Powered Trade Analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{entry.content}</p>
      </CardContent>
    </Card>
  )
}
