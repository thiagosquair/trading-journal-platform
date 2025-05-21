"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface SaveAnalysisToJournalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  analysisData: any
  chartUrl: string
  annotatedChartUrl: string
}

export function SaveAnalysisToJournal({
  open,
  onOpenChange,
  analysisData,
  chartUrl,
  annotatedChartUrl,
}: SaveAnalysisToJournalProps) {
  const [title, setTitle] = useState(`${analysisData.pair} ${analysisData.direction.toUpperCase()} Analysis`)
  const [notes, setNotes] = useState(
    `Trade Direction: ${analysisData.direction}\nTimeframe: ${analysisData.timeframe}\nWin Probability: ${analysisData.winProbability}%\nRisk/Reward: 1:${analysisData.riskReward}\n\nKey Levels:\n- Resistance: ${analysisData.keyLevels[0].price}\n- Current: ${analysisData.keyLevels[1].price}\n- Support: ${analysisData.keyLevels[2].price}\n\nTrade Setup:\n- Entry: ${analysisData.tradeSetup.entry}\n- Stop Loss: ${analysisData.tradeSetup.stopLoss}\n- Take Profit: ${analysisData.tradeSetup.takeProfit}`,
  )
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Analysis saved to journal",
      description: "Your trade analysis has been saved to your journal.",
    })

    setIsSaving(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Save Analysis to Journal</DialogTitle>
          <DialogDescription>Save this trade analysis to your journal for future reference.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="col-span-3 min-h-[200px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save to Journal"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
