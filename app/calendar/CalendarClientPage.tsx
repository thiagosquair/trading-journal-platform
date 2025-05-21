"use client"

import { useState, useEffect, useRef } from "react"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Bell, Filter, Download, RefreshCw, Sun, Moon, Search, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CalendarClientPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("economic")
  const [theme, setTheme] = useState("light")
  const [importance, setImportance] = useState(["high", "medium", "low"])
  const [currencies, setCurrencies] = useState(["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF"])
  const [showFilters, setShowFilters] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Handle importance filter changes
  const handleImportanceChange = (value: string) => {
    if (importance.includes(value)) {
      setImportance(importance.filter((i) => i !== value))
    } else {
      setImportance([...importance, value])
    }
  }

  // Handle currency filter changes
  const handleCurrencyChange = (value: string) => {
    if (currencies.includes(value)) {
      setCurrencies(currencies.filter((c) => c !== value))
    } else {
      setCurrencies([...currencies, value])
    }
  }

  // Load TradingView widget
  useEffect(() => {
    setIsLoading(true)

    // Clear any existing content
    if (containerRef.current) {
      containerRef.current.innerHTML = ""
    }

    // Create container div
    const widgetContainer = document.createElement("div")
    widgetContainer.className = "tradingview-widget-container"

    const widgetDiv = document.createElement("div")
    widgetDiv.className = "tradingview-widget-container__widget"
    widgetContainer.appendChild(widgetDiv)

    // Add the container to the ref
    if (containerRef.current) {
      containerRef.current.appendChild(widgetContainer)
    }

    // Convert importance to TradingView format
    const importanceFilter = importance
      .map((imp) => {
        if (imp === "high") return "1"
        if (imp === "medium") return "0"
        if (imp === "low") return "-1"
        return "0"
      })
      .join(",")

    // Create the script element
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js"
    script.async = true
    script.type = "text/javascript"

    // Set the widget parameters
    script.innerHTML = JSON.stringify({
      colorTheme: theme,
      isTransparent: false,
      width: "100%",
      height: "600",
      locale: "en",
      importanceFilter: importanceFilter || "-1,0,1",
      currencyFilter: currencies.join(","),
    })

    // Add the script to the container
    widgetContainer.appendChild(script)

    // Set loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [theme, importance, currencies])

  // Refresh calendar data
  const handleRefresh = () => {
    setIsLoading(true)

    // Re-trigger the useEffect
    const timer = setTimeout(() => {
      setImportance([...importance])
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }

  return (
    <SidebarWrapper>
      <div className="container max-w-full px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Market Calendar</h1>
            <p className="text-muted-foreground">Track economic events, earnings, and market holidays</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" onClick={() => setNotifications(!notifications)}>
              <Bell className="mr-2 h-4 w-4" />
              {notifications ? "Notifications On" : "Notifications Off"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </>
              ) : (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </>
              )}
            </Button>
          </div>
        </div>

        {showFilters && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Calendar Filters</CardTitle>
              <CardDescription>Customize which events are displayed in your calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-4">
                  <h3 className="font-medium">Event Importance</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="high"
                        checked={importance.includes("high")}
                        onCheckedChange={() => handleImportanceChange("high")}
                      />
                      <Label htmlFor="high" className="flex items-center">
                        <Badge className="bg-red-500 mr-2">High</Badge>
                        High Impact Events
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="medium"
                        checked={importance.includes("medium")}
                        onCheckedChange={() => handleImportanceChange("medium")}
                      />
                      <Label htmlFor="medium" className="flex items-center">
                        <Badge className="bg-orange-500 mr-2">Medium</Badge>
                        Medium Impact Events
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="low"
                        checked={importance.includes("low")}
                        onCheckedChange={() => handleImportanceChange("low")}
                      />
                      <Label htmlFor="low" className="flex items-center">
                        <Badge className="bg-blue-500 mr-2">Low</Badge>
                        Low Impact Events
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Currencies</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD", "CNY"].map((currency) => (
                      <div key={currency} className="flex items-center space-x-2">
                        <Checkbox
                          id={currency}
                          checked={currencies.includes(currency)}
                          onCheckedChange={() => handleCurrencyChange(currency)}
                        />
                        <Label htmlFor={currency}>{currency}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Display Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                      <Label htmlFor="notifications">Event Notifications</Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="search">Search Events</Label>
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search"
                          placeholder="Search for events..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="theme">Calendar Theme</Label>
                      <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger id="theme">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button variant="outline" className="mr-2" onClick={() => setShowFilters(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleRefresh()
                    setShowFilters(false)
                  }}
                >
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {notifications && (
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Notifications Enabled</AlertTitle>
            <AlertDescription>
              You will receive notifications for high-impact economic events 15 minutes before they occur.
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="economic">Economic Events</TabsTrigger>
            <TabsTrigger value="earnings">Earnings Calendar</TabsTrigger>
            <TabsTrigger value="dividends">Dividends</TabsTrigger>
            <TabsTrigger value="ipos">IPOs</TabsTrigger>
            <TabsTrigger value="splits">Stock Splits</TabsTrigger>
          </TabsList>

          <TabsContent value="economic" className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow w-full">
              {isLoading ? (
                <div className="flex items-center justify-center h-[600px]">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                    <p className="text-muted-foreground">Loading economic calendar...</p>
                  </div>
                </div>
              ) : (
                <div ref={containerRef} className="w-full h-[600px]"></div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Data provided by TradingView</p>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Calendar
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="earnings">
            <div className="flex items-center justify-center h-[400px] border rounded-lg">
              <div className="text-center">
                <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Earnings Calendar</h3>
                <p className="mt-2 text-sm text-muted-foreground">Track upcoming company earnings reports</p>
                <Button className="mt-4">Load Earnings Calendar</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dividends">
            <div className="flex items-center justify-center h-[400px] border rounded-lg">
              <div className="text-center">
                <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Dividends Calendar</h3>
                <p className="mt-2 text-sm text-muted-foreground">Track upcoming dividend payments</p>
                <Button className="mt-4">Load Dividends Calendar</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ipos">
            <div className="flex items-center justify-center h-[400px] border rounded-lg">
              <div className="text-center">
                <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">IPO Calendar</h3>
                <p className="mt-2 text-sm text-muted-foreground">Track upcoming initial public offerings</p>
                <Button className="mt-4">Load IPO Calendar</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="splits">
            <div className="flex items-center justify-center h-[400px] border rounded-lg">
              <div className="text-center">
                <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Stock Splits Calendar</h3>
                <p className="mt-2 text-sm text-muted-foreground">Track upcoming stock splits</p>
                <Button className="mt-4">Load Stock Splits Calendar</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarWrapper>
  )
}
