"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

interface MockDataEditorProps {
  accountId: string
  onUpdate: () => void
}

export function MockDataEditor({ accountId, onUpdate }: MockDataEditorProps) {
  const [balance, setBalance] = useState("")
  const [equity, setEquity] = useState("")
  const [openPL, setOpenPL] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // In a real implementation, this would update the mock data in the adapter
    // For now, we'll just simulate a successful update
    await new Promise((resolve) => setTimeout(resolve, 800))

    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)

    // Trigger parent component to refresh data
    onUpdate()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Mock Account Data</CardTitle>
        <CardDescription>Set custom values for testing purposes</CardDescription>
      </CardHeader>
      <CardContent>
        {success && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription>Mock data updated successfully</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="balance">Balance</Label>
            <Input
              id="balance"
              type="number"
              step="0.01"
              placeholder="Enter balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="equity">Equity</Label>
            <Input
              id="equity"
              type="number"
              step="0.01"
              placeholder="Enter equity"
              value={equity}
              onChange={(e) => setEquity(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="openPL">Open P/L</Label>
            <Input
              id="openPL"
              type="number"
              step="0.01"
              placeholder="Enter open P/L"
              value={openPL}
              onChange={(e) => setOpenPL(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Update Mock Data
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
