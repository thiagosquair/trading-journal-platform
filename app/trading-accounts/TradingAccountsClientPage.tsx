"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TradingAccountsList } from "@/components/trading-accounts-list"
import PlatformSelectionGrid from "@/components/platform-selection-grid"
import ConnectAccountModal from "@/components/connect-account-modal"
import { DebugStorage } from "@/components/debug-storage"

export default function TradingAccountsClientPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  // Update the modal close handler:
  const handleAccountConnected = () => {
    console.log("Account connected, refreshing list...")
    setRefreshKey((prev) => prev + 1) // Force refresh
    setIsModalOpen(false)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Trading Accounts</h1>
          <p className="text-muted-foreground">Connect and manage your trading accounts in one place.</p>
        </div>

        <DebugStorage />

        <Tabs defaultValue="manage" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="manage">Manage Accounts</TabsTrigger>
            <TabsTrigger value="connect">Connect New Account</TabsTrigger>
          </TabsList>

          <TabsContent value="manage" className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Your Connected Accounts</h2>
                  <p className="text-sm text-muted-foreground">View and manage your connected trading accounts</p>
                </div>
                <Button size="sm" onClick={() => setIsModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Account
                </Button>
              </div>

              <TradingAccountsList key={refreshKey} />
            </div>
          </TabsContent>

          <TabsContent value="connect" className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Available Platforms</h2>
                  <p className="text-sm text-muted-foreground">Select a trading platform to connect your account</p>
                </div>
              </div>

              <PlatformSelectionGrid />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <ConnectAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={handleAccountConnected}
        initialPlatform={null}
      />
    </div>
  )
}
