import type { Metadata } from "next"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

export const metadata: Metadata = {
  title: "Billing | TradeLinx",
  description: "Manage your subscription and billing information",
}

export default function BillingPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Billing & Subscription Plans</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {/* Free Plan */}
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Free</CardTitle>
                <Badge>Current Plan</Badge>
              </div>
              <CardDescription>Get started with basic features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">
                $0<span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Journal entries</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>1 trading account</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Basic backtesting</span>
                </li>
                <li className="flex items-center">
                  <X className="h-4 w-4 mr-2 text-red-500" />
                  <span>No AI analysis</span>
                </li>
                <li className="flex items-center">
                  <X className="h-4 w-4 mr-2 text-red-500" />
                  <span>No social features</span>
                </li>
                <li className="flex items-center">
                  <X className="h-4 w-4 mr-2 text-red-500" />
                  <span>No psychology tools</span>
                </li>
                <li className="flex items-center">
                  <X className="h-4 w-4 mr-2 text-red-500" />
                  <span>No courses</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Current Plan
              </Button>
            </CardFooter>
          </Card>

          {/* Basic Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Basic</CardTitle>
              <CardDescription>For individual traders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">
                $9.99<span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Unlimited journal entries</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>5 trading accounts</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Standard backtesting</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Psychology tools</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Trading courses</span>
                </li>
                <li className="flex items-center">
                  <X className="h-4 w-4 mr-2 text-red-500" />
                  <span>No AI analysis</span>
                </li>
                <li className="flex items-center">
                  <X className="h-4 w-4 mr-2 text-red-500" />
                  <span>No social features</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Upgrade to Basic</Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>For serious traders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">
                $24.99<span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Everything in Basic</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>20 trading accounts</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>AI analysis (20 trades/month)</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Social features (20 posts/month)</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Advanced backtesting</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Strategy optimization</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Upgrade to Pro</Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-yellow-500">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Premium</CardTitle>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Most Popular
                </Badge>
              </div>
              <CardDescription>For professional traders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">
                $34.99<span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Unlimited trading accounts</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Unlimited AI analysis</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Unlimited social features</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Professional backtesting suite</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Multi-asset backtesting</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Advanced reporting</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Dedicated support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Upgrade to Premium</Button>
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
                { date: "May 1, 2025", amount: "$0.00", status: "Free Plan", plan: "Free" },
                { date: "April 1, 2025", amount: "$0.00", status: "Free Plan", plan: "Free" },
                { date: "March 1, 2025", amount: "$0.00", status: "Free Plan", plan: "Free" },
              ].map((invoice, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <p className="font-medium">{invoice.date}</p>
                    <p className="text-sm text-muted-foreground">{invoice.plan} Plan</p>
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
