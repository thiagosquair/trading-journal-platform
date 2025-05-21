"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FundedAccountProjection } from "@/components/funded-account-projection"
import { PersonalCapitalProjection } from "@/components/personal-capital-projection"
import { ProjectionResults } from "@/components/projection-results"
import { Button } from "@/components/ui/button"
import { Calculator, PiggyBank, TrendingUp } from "lucide-react"

export function WealthProjectionCalculator() {
  const [activeTab, setActiveTab] = useState("funded")
  const [showResults, setShowResults] = useState(false)
  const [projectionData, setProjectionData] = useState<any>(null)

  const handleFundedAccountProjection = (data: any) => {
    setProjectionData({
      type: "funded",
      ...data,
    })
    setShowResults(true)
  }

  const handlePersonalCapitalProjection = (data: any) => {
    setProjectionData({
      type: "personal",
      ...data,
    })
    setShowResults(true)
  }

  const resetCalculator = () => {
    setShowResults(false)
    setProjectionData(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Wealth Projection Calculator</h2>
        <p className="text-muted-foreground">
          Project your potential earnings and wealth growth based on your trading performance.
        </p>
      </div>

      {!showResults ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="funded" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Funded Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <PiggyBank className="h-4 w-4" />
              <span>Personal Capital</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="funded" className="pt-4">
            <FundedAccountProjection onCalculate={handleFundedAccountProjection} />
          </TabsContent>
          <TabsContent value="personal" className="pt-4">
            <PersonalCapitalProjection onCalculate={handlePersonalCapitalProjection} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-6">
          <ProjectionResults data={projectionData} />
          <div className="flex justify-center">
            <Button onClick={resetCalculator} className="w-full max-w-md">
              <Calculator className="mr-2 h-4 w-4" />
              Create New Projection
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
