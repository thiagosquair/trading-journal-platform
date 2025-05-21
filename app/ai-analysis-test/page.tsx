"use client"

import { useState } from "react"
import { AITradeAnalysisFull } from "@/components/ai-trade-analysis-full"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export default function AIAnalysisTestPage() {
  const [selectedImage, setSelectedImage] = useState("/tradingview-eurusd.png")
  const [showAnalysis, setShowAnalysis] = useState(false)

  const handleStartAnalysis = () => {
    setShowAnalysis(true)
  }

  const handleCloseAnalysis = () => {
    setShowAnalysis(false)
  }

  return (
    <div className="container py-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-2">AI Trade Analysis</h1>
      <p className="text-muted-foreground mb-6">
        Test our AI-powered trade analysis system that provides insights, probabilities, and recommendations
      </p>

      {showAnalysis ? (
        <AITradeAnalysisFull imageUrl="/ai-analysis-interface.png" onClose={handleCloseAnalysis} />
      ) : (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg">
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">Upload your chart screenshot</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            Drag and drop your trading chart image here, or click to browse. We support PNG, JPG, and JPEG formats.
          </p>
          <Button onClick={handleStartAnalysis}>Upload Chart</Button>
        </div>
      )}
    </div>
  )
}
