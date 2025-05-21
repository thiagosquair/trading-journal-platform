import type { Metadata } from "next"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Billing | TradeLinx",
  description: "Manage your subscription and billing information",
}

export default function BillingPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Billing</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Basic</CardTitle>
                <Badge>Current Plan</Badge>
              </div>
              <CardDescription>For individual traders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                $19<span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                {["Journal entries", "Basic analytics", "1 trading account"].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Current Plan
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <CardDescription>For serious traders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                $39<span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                {[
                  "Unlimited journal entries",
                  "Advanced analytics",
                  "5 trading accounts",
                  "AI trade analysis",
                  "Priority support",
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Upgrade</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For trading teams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                $99<span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                {[
                  "Everything in Premium",
                  "Team collaboration",
                  "Unlimited accounts",
                  "Custom integrations",
                  "Dedicated support",
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "May 1, 2025", amount: "$19.00", status: "Paid" },
                { date: "April 1, 2025", amount: "$19.00", status: "Paid" },
                { date: "March 1, 2025", amount: "$19.00", status: "Paid" },
              ].map((invoice, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <p className="font-medium">{invoice.date}</p>
                    <p className="text-sm text-muted-foreground">Basic Plan</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{invoice.amount}</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarWrapper>
  )
}
