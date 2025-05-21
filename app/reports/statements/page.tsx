import type { Metadata } from "next"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export const metadata: Metadata = {
  title: "Account Statements | TradeLinx",
  description: "View and download your trading account statements",
}

export default function StatementsPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Account Statements</h1>
        <Card>
          <CardHeader>
            <CardTitle>Available Statements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { month: "May 2025", date: "05/01/2025 - 05/31/2025" },
                { month: "April 2025", date: "04/01/2025 - 04/30/2025" },
                { month: "March 2025", date: "03/01/2025 - 03/31/2025" },
              ].map((statement) => (
                <div key={statement.month} className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">{statement.month}</h3>
                    <p className="text-sm text-muted-foreground">{statement.date}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarWrapper>
  )
}
