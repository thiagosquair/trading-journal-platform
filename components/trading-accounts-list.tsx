"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, ArrowUpDown, BarChart3, ExternalLink, RefreshCw, Settings } from "lucide-react"
import type { TradingAccount } from "@/lib/trading-types"
import { formatCurrency, formatDate } from "@/lib/utils"

interface TradingAccountsListProps {
  accounts: TradingAccount[]
  isLoading?: boolean
  error?: Error | null
  onRefresh?: () => void
}

export default function TradingAccountsList({
  accounts,
  isLoading = false,
  error = null,
  onRefresh,
}: TradingAccountsListProps) {
  const [sortField, setSortField] = useState<keyof TradingAccount>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: keyof TradingAccount) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedAccounts = [...accounts].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center text-red-700">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>Error loading accounts: {error.message}</p>
            {onRefresh && (
              <Button variant="ghost" size="sm" onClick={onRefresh} className="ml-auto">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (accounts.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">No trading accounts found.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Connect a trading account to get started tracking your performance.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => handleSort("name")}>
            Name
            {sortField === "name" && <ArrowUpDown className="ml-2 h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSort("platform")}>
            Platform
            {sortField === "platform" && <ArrowUpDown className="ml-2 h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSort("balance")}>
            Balance
            {sortField === "balance" && <ArrowUpDown className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>

      {sortedAccounts.map((account) => (
        <Card key={account.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{account.name}</CardTitle>
                <CardDescription>
                  {account.platform} • Account #{account.accountNumber}
                </CardDescription>
              </div>
              <Badge
                variant={
                  account.status === "active"
                    ? "success"
                    : account.status === "disconnected"
                      ? "destructive"
                      : "outline"
                }
              >
                {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-lg font-medium">{formatCurrency(account.balance, account.currency)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Equity</p>
                <p className="text-lg font-medium">{formatCurrency(account.equity, account.currency)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm">{formatDate(account.lastUpdated)}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 pt-2">
            <div className="flex justify-between w-full">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/trading-accounts/${account.id}`}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/trading-accounts/${account.id}/settings`}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Button>
              </div>
              {account.status === "active" && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/trading-accounts/${account.id}/live-monitor`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Monitor
                  </Link>
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
