"use server"

import { revalidatePath } from "next/cache"
import type { CreateJournalEntryParams, JournalEntry, UpdateJournalEntryParams } from "./journal-types"

// Mock database for demo purposes
let journalEntries: JournalEntry[] = [
  {
    id: "1",
    title: "Market Analysis: EURUSD",
    content:
      "Looking at EURUSD for potential breakout opportunities. Key levels to watch: 1.0850 support and 1.0950 resistance. The pair has been consolidating for the past week, and I'm expecting increased volatility following the upcoming ECB announcement.",
    entryType: "market-analysis",
    createdAt: "2025-05-15T10:30:00Z",
    updatedAt: "2025-05-15T10:30:00Z",
    tags: ["EURUSD", "Analysis", "Breakout"],
    mood: "neutral",
    userId: "user1",
    images: [],
  },
  {
    id: "2",
    title: "Weekly Trading Review",
    content:
      "Closed 5 trades this week: 3 winners and 2 losers. Overall profit: $183.75. My win rate is improving, but I'm still working on my exit strategy to maximize profits on winning trades. Need to be more patient and let profits run instead of taking small gains.",
    entryType: "trade-review",
    createdAt: "2025-05-12T16:45:00Z",
    updatedAt: "2025-05-12T16:45:00Z",
    tags: ["Weekly Review", "Reflection"],
    mood: "positive",
    userId: "user1",
    images: [
      {
        id: "img-1",
        url: "/trading-chart-profit.png",
        caption: "Weekly performance chart",
        createdAt: "2025-05-12T16:45:00Z",
      },
    ],
  },
  {
    id: "3",
    title: "Trade Plan: GBPUSD Short",
    content:
      "Planning a short position on GBPUSD. Entry around 1.2650, stop loss at 1.2700 (50 pips risk), take profit at 1.2550 (100 pips reward). Risk:Reward = 1:2. Waiting for price to reach resistance zone before entering. Maximum risk: 1% of account.",
    entryType: "trade-plan",
    createdAt: "2025-05-10T09:15:00Z",
    updatedAt: "2025-05-10T09:15:00Z",
    tags: ["GBPUSD", "Trade Plan", "Short"],
    mood: "neutral",
    tradeIds: ["trade123"],
    userId: "user1",
    images: [
      {
        id: "img-2",
        url: "/gbp-usd-resistance.png",
        caption: "GBPUSD resistance zone",
        createdAt: "2025-05-10T09:15:00Z",
      },
      {
        id: "img-3",
        url: "/gbp-usd-chart.png",
        caption: "Entry and exit points",
        createdAt: "2025-05-10T09:15:00Z",
      },
    ],
  },
]

export async function getJournalEntries(): Promise<JournalEntry[]> {
  // In a real app, this would fetch from a database
  return journalEntries
}

export async function getJournalEntryById(id: string): Promise<JournalEntry | undefined> {
  // In a real app, this would fetch from a database
  return journalEntries.find((entry) => entry.id === id)
}

export async function createJournalEntry(
  data: CreateJournalEntryParams,
): Promise<{ success: boolean; entry?: JournalEntry; error?: string }> {
  try {
    // Validate data
    if (!data.title) {
      return { success: false, error: "Title is required" }
    }

    if (!data.content) {
      return { success: false, error: "Content is required" }
    }

    // In a real app, this would save to a database
    const newEntry: JournalEntry = {
      id: `entry-${Date.now()}`,
      title: data.title,
      content: data.content,
      entryType: data.entryType,
      tags: data.tags || [],
      mood: data.mood,
      tradeIds: data.tradeIds,
      images: data.images || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "user1", // In a real app, this would be the authenticated user's ID
    }

    journalEntries.push(newEntry)

    // Revalidate the journal page to show the new entry
    revalidatePath("/journal")

    return { success: true, entry: newEntry }
  } catch (error) {
    console.error("Error creating journal entry:", error)
    return { success: false, error: "Failed to create journal entry" }
  }
}

export async function updateJournalEntry(
  data: UpdateJournalEntryParams,
): Promise<{ success: boolean; entry?: JournalEntry; error?: string }> {
  try {
    // Find the entry to update
    const entryIndex = journalEntries.findIndex((entry) => entry.id === data.id)

    if (entryIndex === -1) {
      return { success: false, error: "Journal entry not found" }
    }

    // Update the entry
    const updatedEntry = {
      ...journalEntries[entryIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    journalEntries[entryIndex] = updatedEntry

    // Revalidate the journal page to show the updated entry
    revalidatePath("/journal")

    return { success: true, entry: updatedEntry }
  } catch (error) {
    console.error("Error updating journal entry:", error)
    return { success: false, error: "Failed to update journal entry" }
  }
}

export async function deleteJournalEntry(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Find the entry to delete
    const entryIndex = journalEntries.findIndex((entry) => entry.id === id)

    if (entryIndex === -1) {
      return { success: false, error: "Journal entry not found" }
    }

    // Remove the entry
    journalEntries = journalEntries.filter((entry) => entry.id !== id)

    // Revalidate the journal page
    revalidatePath("/journal")

    return { success: true }
  } catch (error) {
    console.error("Error deleting journal entry:", error)
    return { success: false, error: "Failed to delete journal entry" }
  }
}
