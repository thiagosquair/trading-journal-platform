"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  MoreHorizontal,
  RefreshCw,
  ExternalLink,
  Settings,
  Trash2,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  ArrowUpDown,
  Plus,
} from "lucide-react"
import { disconnectTradingAccount } from "@/lib/trading-actions"
import { formatCurrency } from "@/lib/utils"
import ConnectAccountModal from "./connect-account-modal"

export function TradingAccountsList() {
  const router = useRouter()
  const [accounts, setAccounts] = useState<any[]>([])
  const [filteredAccounts, setFilteredAccounts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<{ field: string; direction: "asc" | "desc" }>({
    field: "name",
    direction: "asc",
  })
  const [filterPlatform, setFilterPlatform] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [syncingAccounts, setSyncingAccounts] = useState<string[]>([])
  const [accountView, setAccountView] = useState<"grid" | "list">("grid")

  // Fetch accounts on mount
  useEffect(() => {
    loadAccounts()
  }, [])

  // Apply filters and sorting
  useEffect(() => {
    let result = [...accounts]

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (account) =>
          account.name.toLowerCase().includes(query) ||
          account.platform.toLowerCase().includes(query) ||
          account.server?.toLowerCase().includes(query) ||
          account.accountNumber?.toLowerCase().includes(query),
      )
    }

    // Apply platform filter
    if (filterPlatform) {
      result = result.filter((account) => account.platform.toLowerCase() === filterPlatform.toLowerCase())
    }

    // Apply sorting
    result.sort((a, b) => {
      let valueA = a[sortBy.field]
      let valueB = b[sortBy.field]

      // Handle special cases
      if (sortBy.field === "balance" || sortBy.field === "equity") {
        valueA = Number.parseFloat(valueA) || 0
        valueB = Number.parseFloat(valueB) || 0
      }

      if (valueA < valueB) return sortBy.direction === "asc" ? -1 : 1
      if (valueA > valueB) return sortBy.direction === "asc" ? 1 : -1
      return 0
    })

    setFilteredAccounts(result)
  }, [accounts, searchQuery, filterPlatform, sortBy])

  // Load accounts from storage/API
  const loadAccounts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Loading accounts from localStorage...")

      // Get accounts from localStorage
      const storedAccounts = localStorage.getItem("tradingAccounts")
      console.log("Raw stored accounts:", storedAccounts)

      const data = storedAccounts ? JSON.parse(storedAccounts) : []
      console.log("Parsed accounts data:", data)

      setAccounts(data)

      if (data.length === 0) {
        console.log("No accounts found in localStorage")
      } else {
        console.log(`Loaded ${data.length} accounts`)
      }
    } catch (err: any) {
      console.error("Error loading accounts:", err)
      setError(err.message || "Failed to load trading accounts")
    } finally {
      setIsLoading(false)
    }
  }

  // Add this after the loadAccounts function:
  const handleRefresh = () => {
    console.log("Manually refreshing accounts...")
    loadAccounts()
  }

  // Handle account sync
  const handleSyncAccount = async (accountId: string) => {
    setSyncingAccounts((prev) => [...prev, accountId])

    try {
      // Simulate sync with delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update last synced time
      setAccounts((prev) =>
        prev.map((account) =>
          account.id === accountId ? { ...account, lastSynced: new Date().toISOString() } : account,
        ),
      )

      // Save to localStorage
      localStorage.setItem(
        "tradingAccounts",
        JSON.stringify(
          accounts.map((account) =>
            account.id === accountId ? { ...account, lastSynced: new Date().toISOString() } : account,
          ),
        ),
      )
    } catch (err) {
      console.error("Error syncing account:", err)
    } finally {
      setSyncingAccounts((prev) => prev.filter((id) => id !== accountId))
    }
  }

  // Handle account disconnect
  const handleDisconnectAccount = async (accountId: string) => {
    if (!confirm("Are you sure you want to disconnect this account?")) {
      return
    }

    try {
      await disconnectTradingAccount(accountId)
      setAccounts((prev) => prev.filter((account) => account.id !== accountId))
    } catch (err: any) {
      console.error("Error disconnecting account:", err)
      alert(err.message || "Failed to disconnect account")
    }
  }

  // Handle account details view
  const handleViewAccount = (accountId: string) => {
    router.push(`/trading-accounts/${accountId}`)
  }

  // Handle sort change
  const handleSortChange = (field: string) => {
    setSortBy((prev) => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }))
  }

  // Handle platform filter change
  const handlePlatformFilterChange = (platform: string | null) => {
    setFilterPlatform(platform)
  }

  // Get unique platforms for filter
  const platforms = [...new Set(accounts.map((account) => account.platform))]

  // Render account grid
  const renderAccountGrid = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )
    }

    if (filteredAccounts.length === 0) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>No accounts found</CardTitle>
            <CardDescription>
              {accounts.length === 0
                ? "You haven't connected any trading accounts yet."
                : "No accounts match your search criteria."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Connect Account
            </Button>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAccounts.map((account) => (
          <Card key={account.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    {account.name}
                    <Badge variant="outline" className="ml-2">
                      {account.platform}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{account.server || account.broker}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleViewAccount(account.id)}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSyncAccount(account.id)}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Sync Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push(`/trading-accounts/${account.id}/settings`)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDisconnectAccount(account.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Disconnect
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm font-medium">Balance</p>
                  <p className="text-2xl font-bold">{formatCurrency(account.balance, account.currency || "USD")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Equity</p>
                  <p className="text-2xl font-bold">{formatCurrency(account.equity, account.currency || "USD")}</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">
                  Last synced: {account.lastSynced ? new Date(account.lastSynced).toLocaleString() : "Never"}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSyncAccount(account.id)}
                disabled={syncingAccounts.includes(account.id)}
              >
                {syncingAccounts.includes(account.id) ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Sync
                  </>
                )}
              </Button>
              <Button size="sm" onClick={() => handleViewAccount(account.id)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  // Render account list
  const renderAccountList = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-9 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )
    }

    if (filteredAccounts.length === 0) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>No accounts found</CardTitle>
            <CardDescription>
              {accounts.length === 0
                ? "You haven't connected any trading accounts yet."
                : "No accounts match your search criteria."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Connect Account
            </Button>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-4 px-4 py-2 font-medium text-sm text-muted-foreground">
          <div className="col-span-2">Account</div>
          <div className="text-right">Balance</div>
          <div className="text-right">Equity</div>
          <div className="text-right">Actions</div>
        </div>

        {filteredAccounts.map((account) => (
          <Card key={account.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="grid grid-cols-5 gap-4 items-center">
                <div className="col-span-2">
                  <div className="font-medium">{account.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    {account.platform}
                    <span className="mx-2">•</span>
                    {account.server || account.broker}
                  </div>
                </div>
                <div className="text-right font-medium">
                  {formatCurrency(account.balance, account.currency || "USD")}
                </div>
                <div className="text-right font-medium">
                  {formatCurrency(account.equity, account.currency || "USD")}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSyncAccount(account.id)}
                    disabled={syncingAccounts.includes(account.id)}
                  >
                    {syncingAccounts.includes(account.id) ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    <span className="sr-only">Sync</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleViewAccount(account.id)}>
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewAccount(account.id)}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSyncAccount(account.id)}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Sync Account
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push(`/trading-accounts/${account.id}/settings`)}>
                        <Settings className="mr-2 h-4 w-4" />
                        Account Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDisconnectAccount(account.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Disconnect
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Add this useEffect after the existing one:
  useEffect(() => {
    // Listen for storage changes (when accounts are added from other tabs/components)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "tradingAccounts") {
        console.log("Storage changed, reloading accounts...")
        loadAccounts()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search accounts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Platform</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handlePlatformFilterChange(null)}>
                <CheckCircle className={`mr-2 h-4 w-4 ${!filterPlatform ? "opacity-100" : "opacity-0"}`} />
                All Platforms
              </DropdownMenuItem>
              {platforms.map((platform) => (
                <DropdownMenuItem key={platform} onClick={() => handlePlatformFilterChange(platform)}>
                  <CheckCircle
                    className={`mr-2 h-4 w-4 ${filterPlatform === platform ? "opacity-100" : "opacity-0"}`}
                  />
                  {platform}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                { field: "name", label: "Account Name" },
                { field: "platform", label: "Platform" },
                { field: "balance", label: "Balance" },
                { field: "equity", label: "Equity" },
                { field: "lastSynced", label: "Last Synced" },
              ].map((option) => (
                <DropdownMenuItem key={option.field} onClick={() => handleSortChange(option.field)}>
                  {option.label}
                  {sortBy.field === option.field && (
                    <span className="ml-2">{sortBy.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center space-x-2">
            <Label htmlFor="view-mode" className="sr-only">
              View Mode
            </Label>
            <div className="flex items-center space-x-1 border rounded-md p-1">
              <Button
                variant={accountView === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setAccountView("grid")}
              >
                <span className="sr-only">Grid View</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </Button>
              <Button
                variant={accountView === "list" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setAccountView("list")}
              >
                <span className="sr-only">List View</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </Button>
            </div>
          </div>

          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Account
          </Button>
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {accountView === "grid" ? renderAccountGrid() : renderAccountList()}

      <ConnectAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={() => {
          loadAccounts()
          setIsModalOpen(false)
        }}
        initialPlatform={null}
      />
    </div>
  )
}
