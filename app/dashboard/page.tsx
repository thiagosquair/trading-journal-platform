import type { Metadata } from "next"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Dashboard | TradeLinx",
  description: "Your trading performance at a glance",
}

export default function DashboardPage() {
  return (
    <SidebarWrapper>
      <div className="w-full p-4 md:p-6">
        <h1 className="mb-6 text-2xl font-bold md:text-3xl">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Trading Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Trades</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Win Rate</span>
                  <span className="font-medium">62.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profit Factor</span>
                  <span className="font-medium">1.87</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Balance</span>
                  <span className="font-medium">$10,245.67</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly P/L</span>
                  <span className="font-medium text-green-600">+$1,245.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Drawdown</span>
                  <span className="font-medium">4.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trading Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Target</span>
                  <span className="font-medium">$2,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">62%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Days Remaining</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">EUR/USD</p>
                      <p className="text-sm text-muted-foreground">Buy • 0.5 lots</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+$127.50</p>
                      <p className="text-sm text-muted-foreground">May 20, 2023</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Risk Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Risk per Trade</span>
                  <span className="font-medium">1.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Risk-Reward Ratio</span>
                  <span className="font-medium">1:2.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Daily Drawdown</span>
                  <span className="font-medium">3.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarWrapper>
  )
}
