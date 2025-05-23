import type React from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import TradingAccountsList from "@/components/trading-accounts-list"
import { SidebarWrapper } from "@/components/sidebar-navigation"

export default function TradingAccountsLayoutWithSidebar({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-full">
        <header className="border-b bg-background">
          <div className="flex h-16 items-center px-4 gap-2">
            <SidebarTrigger />
            <div className="ml-2 flex-1">
              <h1 className="text-xl font-semibold">Trading Accounts</h1>
              <p className="text-sm text-muted-foreground">
                Connect and manage your trading accounts from different brokers
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Connect Account
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          <Tabs defaultValue="active" className="w-full">
            <TabsList>
              <TabsTrigger value="active">Active Accounts</TabsTrigger>
              <TabsTrigger value="all">All Accounts</TabsTrigger>
              <TabsTrigger value="disconnected">Disconnected</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-6">
              <TradingAccountsList
                accounts={[
                  {
                    id: "1",
                    name: "OANDA MT4 Demo",
                    broker: "OANDA",
                    status: "active",
                    balance: 10247.35,
                    equity: 10389.62,
                    openPL: 142.27,
                    lastUpdated: new Date().toISOString(),
                    currency: "USD",
                  },
                  {
                    id: "2",
                    name: "TradingView Demo",
                    broker: "TradingView",
                    status: "active",
                    balance: 5123.68,
                    equity: 5189.42,
                    openPL: 65.74,
                    lastUpdated: new Date().toISOString(),
                    currency: "USD",
                  },
                ]}
                isLoading={false}
              />
            </TabsContent>
            <TabsContent value="all" className="mt-6">
              <TradingAccountsList
                accounts={[
                  {
                    id: "1",
                    name: "OANDA MT4 Demo",
                    broker: "OANDA",
                    status: "active",
                    balance: 10247.35,
                    equity: 10389.62,
                    openPL: 142.27,
                    lastUpdated: new Date().toISOString(),
                    currency: "USD",
                  },
                  {
                    id: "2",
                    name: "TradingView Demo",
                    broker: "TradingView",
                    status: "active",
                    balance: 5123.68,
                    equity: 5189.42,
                    openPL: 65.74,
                    lastUpdated: new Date().toISOString(),
                    currency: "USD",
                  },
                  {
                    id: "3",
                    name: "DXtrade Demo",
                    broker: "Gooey Trade",
                    status: "disconnected",
                    balance: 2000.0,
                    equity: 2000.0,
                    openPL: 0,
                    lastUpdated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                    currency: "USD",
                  },
                ]}
                isLoading={false}
              />
            </TabsContent>
            <TabsContent value="disconnected" className="mt-6">
              <TradingAccountsList
                accounts={[
                  {
                    id: "3",
                    name: "DXtrade Demo",
                    broker: "Gooey Trade",
                    status: "disconnected",
                    balance: 2000.0,
                    equity: 2000.0,
                    openPL: 0,
                    lastUpdated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                    currency: "USD",
                  },
                ]}
                isLoading={false}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarWrapper>
  )
}
