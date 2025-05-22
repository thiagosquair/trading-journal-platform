"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileUp, RefreshCw, Database, Check, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface HistoricalDataSelectorProps {
  advancedMode?: boolean
  onDataSelected?: (data: any) => void
}

export function HistoricalDataSelector({ advancedMode = false, onDataSelected }: HistoricalDataSelectorProps) {
  const [dataSource, setDataSource] = useState<string>("platform")
  const [selectedProvider, setSelectedProvider] = useState<string>("yahoo")
  const [availableProviders, setAvailableProviders] = useState<any[]>([])
  const [availableSymbols, setAvailableSymbols] = useState<string[]>([])
  const [selectedSymbol, setSelectedSymbol] = useState<string>("EURUSD")
  const [isLoadingProviders, setIsLoadingProviders] = useState<boolean>(true)
  const [isLoadingSymbols, setIsLoadingSymbols] = useState<boolean>(false)
  const [connectionStatus, setConnectionStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [isTestingConnection, setIsTestingConnection] = useState<boolean>(false)
  const [apiKey, setApiKey] = useState<string>("")

  // Fetch available data providers
  useEffect(() => {
    async function fetchProviders() {
      try {
        const response = await fetch("/api/backtesting/providers")
        if (!response.ok) {
          throw new Error("Failed to fetch providers")
        }

        const data = await response.json()
        if (data.success && data.providers) {
          setAvailableProviders(data.providers)
        }
      } catch (error) {
        console.error("Error fetching providers:", error)
      } finally {
        setIsLoadingProviders(false)
      }
    }

    fetchProviders()
  }, [])

  // Fetch available symbols when provider changes
  useEffect(() => {
    if (selectedProvider) {
      fetchSymbols(selectedProvider)
    }
  }, [selectedProvider])

  async function fetchSymbols(provider: string) {
    setIsLoadingSymbols(true)
    try {
      const response = await fetch(`/api/backtesting/providers/${provider}/symbols`)
      if (!response.ok) {
        throw new Error("Failed to fetch symbols")
      }

      const data = await response.json()
      if (data.success && data.symbols) {
        setAvailableSymbols(data.symbols)
        if (data.symbols.length > 0) {
          setSelectedSymbol(data.symbols[0])
        }
      }
    } catch (error) {
      console.error("Error fetching symbols:", error)
    } finally {
      setIsLoadingSymbols(false)
    }
  }

  async function testConnection() {
    setIsTestingConnection(true)
    setConnectionStatus(null)

    try {
      const response = await fetch(`/api/backtesting/providers/${selectedProvider}/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      })

      const data = await response.json()
      setConnectionStatus(data)
    } catch (error) {
      setConnectionStatus({
        success: false,
        message: `Connection error: ${error.message}`,
      })
    } finally {
      setIsTestingConnection(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Data</CardTitle>
        <CardDescription>Select or upload historical market data for backtesting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="provider" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="provider">Data Provider</TabsTrigger>
            <TabsTrigger value="upload">Upload Data</TabsTrigger>
            {advancedMode && <TabsTrigger value="custom">Custom API</TabsTrigger>}
          </TabsList>

          <TabsContent value="provider" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="data-provider">Data Provider</Label>
              {isLoadingProviders ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger id="data-provider">
                    <SelectValue placeholder="Select data provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProviders.map((provider) => (
                      <SelectItem key={provider.name} value={provider.name}>
                        <div className="flex items-center justify-between w-full">
                          <span>{provider.description}</span>
                          {provider.isPremium && (
                            <Badge variant="outline" className="ml-2">
                              Premium
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {selectedProvider === "alphavantage" && (
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your Alpha Vantage API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Get a free API key at{" "}
                  <a
                    href="https://www.alphavantage.co/support/#api-key"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    alphavantage.co
                  </a>
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="symbol">Symbol</Label>
              {isLoadingSymbols ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                  <SelectTrigger id="symbol">
                    <SelectValue placeholder="Select symbol" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSymbols.map((symbol) => (
                      <SelectItem key={symbol} value={symbol}>
                        {symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe</Label>
              <Select defaultValue="D1">
                <SelectTrigger id="timeframe">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M1">1 Minute</SelectItem>
                  <SelectItem value="M5">5 Minutes</SelectItem>
                  <SelectItem value="M15">15 Minutes</SelectItem>
                  <SelectItem value="M30">30 Minutes</SelectItem>
                  <SelectItem value="H1">1 Hour</SelectItem>
                  <SelectItem value="H4">4 Hours</SelectItem>
                  <SelectItem value="D1">Daily</SelectItem>
                  <SelectItem value="W1">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" defaultValue="2023-01-01" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" defaultValue="2023-12-31" />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="w-full" onClick={testConnection} disabled={isTestingConnection}>
                {isTestingConnection ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4 mr-2" />
                    Test Connection
                  </>
                )}
              </Button>

              <Button className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Fetch Data
              </Button>
            </div>

            {connectionStatus && (
              <Alert variant={connectionStatus.success ? "default" : "destructive"}>
                {connectionStatus.success ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{connectionStatus.success ? "Success" : "Error"}</AlertTitle>
                <AlertDescription>{connectionStatus.message}</AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-format">File Format</Label>
              <Select defaultValue="csv">
                <SelectTrigger id="file-format">
                  <SelectValue placeholder="Select file format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="mt4">MT4 History (FXT)</SelectItem>
                  <SelectItem value="mt5">MT5 History (HST)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="data-file">Upload File</Label>
              <div className="flex gap-2">
                <Input id="data-file" type="file" className="flex-1" />
                <Button variant="outline">
                  <FileUp className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Supported formats: CSV, JSON, MT4/MT5 history files</p>
            </div>

            <div className="space-y-2">
              <Label>CSV Format</Label>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Required columns: Date/Time, Open, High, Low, Close, Volume</p>
                <p>Date format: YYYY-MM-DD HH:MM:SS or Unix timestamp</p>
                <p>Example: 2023-01-01 00:00:00,1.2345,1.2350,1.2340,1.2348,1000</p>
              </div>
            </div>
          </TabsContent>

          {advancedMode && (
            <TabsContent value="custom" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-url">API URL</Label>
                <Input id="api-url" type="text" placeholder="https://api.example.com/data" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key-custom">API Key</Label>
                <Input id="api-key-custom" type="password" placeholder="Enter your API key" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="request-method">Request Method</Label>
                <Select defaultValue="GET">
                  <SelectTrigger id="request-method">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="request-body">Request Body (JSON)</Label>
                <textarea
                  id="request-body"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder='{"symbol": "EURUSD", "timeframe": "D1"}'
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="response-mapping">Response Mapping</Label>
                <textarea
                  id="response-mapping"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder='{"timestamp": "time", "open": "open", "high": "high", "low": "low", "close": "close", "volume": "volume"}'
                />
              </div>

              <Button className="w-full">
                <Database className="h-4 w-4 mr-2" />
                Test API Connection
              </Button>
            </TabsContent>
          )}
        </Tabs>

        <div className="text-xs text-muted-foreground">
          <p>Data usage is subject to the terms and conditions of the selected provider.</p>
          <p>Always ensure you have the necessary permissions to use the data for backtesting.</p>
        </div>
      </CardContent>
    </Card>
  )
}
