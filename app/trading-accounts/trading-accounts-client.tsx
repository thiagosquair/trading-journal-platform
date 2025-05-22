"use client"

import { useState, useCallback, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, RefreshCw, AlertTriangle } from "lucide-react"
import TradingAccountsList from "@/components/trading-accounts-list"
import ConnectAccountModal from "@/components/connect-account-modal"
import { useTradingAccounts } from "@/hooks/use-trading-accounts"

export default function TradingAccountsClient() {
  const searchParams = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialPlatform, setInitialPlatform] = useState<string | null>(null)
  const { accounts, isLoading, error, refreshAccounts } = useTradingAccounts()
  const [activeTab, setActiveTab] = useState("active")

  // Handle platform parameter from URL
  useEffect(() => {
    const platform = searchParams.get("platform")
    if (platform) {
      setInitialPlatform(platform)
      setIsModalOpen(true)
    }
  }, [searchParams])

  const handleOpenModal = useCallback((platform?: string) => {
    setInitialPlatform(platform || null)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setInitialPlatform(null)
  }, [])

  const handleAccountCreated = useCallback(() => {
    refreshAccounts()
    handleCloseModal()
  }, [refreshAccounts, handleCloseModal])

  // Safely filter accounts, handling the null case
  const activeAccounts = accounts?.filter((account) => account.status === "active") || []
  const inactiveAccounts = accounts?.filter((account) => account.status !== "active") || []
  const allAccounts = accounts || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={refreshAccounts} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button onClick={() => handleOpenModal()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Connect Account
        </Button>
      </div>

      {error ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center text-amber-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p>There was an error loading your trading accounts. Please try again.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="active">Active Accounts ({activeAccounts.length})</TabsTrigger>
            <TabsTrigger value="inactive">Inactive Accounts ({inactiveAccounts.length})</TabsTrigger>
            <TabsTrigger value="all">All Accounts ({allAccounts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <TradingAccountsList
              accounts={activeAccounts}
              isLoading={isLoading}
              error={error}
              onRefresh={refreshAccounts}
            />
          </TabsContent>

          <TabsContent value="inactive">
            <TradingAccountsList
              accounts={inactiveAccounts}
              isLoading={isLoading}
              error={error}
              onRefresh={refreshAccounts}
            />
          </TabsContent>

          <TabsContent value="all">
            <TradingAccountsList
              accounts={allAccounts}
              isLoading={isLoading}
              error={error}
              onRefresh={refreshAccounts}
            />
          </TabsContent>
        </Tabs>
      )}

      <ConnectAccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAccountCreated={handleAccountCreated}
        initialPlatform={initialPlatform}
      />
    </div>
  )
}
