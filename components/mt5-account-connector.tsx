"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Define the form schema
const formSchema = z.object({
  name: z.string().min(1, "Account name is required"),
  server: z.string().min(1, "Server is required"),
  login: z.string().min(1, "Login is required"),
  password: z.string().min(1, "Password is required"),
  investorPassword: z.string().optional(),
  useInvestorPassword: z.boolean().default(false),
  saveCredentials: z.boolean().default(true),
})

export function MT5AccountConnector() {
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [connectionSuccess, setConnectionSuccess] = useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      server: "",
      login: "",
      password: "",
      investorPassword: "",
      useInvestorPassword: false,
      saveCredentials: true,
    },
  })

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsConnecting(true)
    setConnectionError(null)
    setConnectionSuccess(false)

    try {
      console.log("Connecting to MT5 account with values:", {
        ...values,
        password: "***",
        investorPassword: values.investorPassword ? "***" : "",
      })

      // Determine which password to use
      const passwordToUse = values.useInvestorPassword ? values.investorPassword : values.password

      // Call the API to connect to MT5
      const response = await fetch("/api/mt5/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          server: values.server,
          login: values.login,
          password: passwordToUse,
          saveCredentials: values.saveCredentials,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to connect to MT5 account")
      }

      console.log("MT5 connection successful:", data)
      setConnectionSuccess(true)

      // Save account to localStorage for demo purposes
      const accountData = {
        id: `mt5_${values.login}`,
        name: values.name,
        platform: "MT5",
        server: values.server,
        accountNumber: values.login,
        balance: data.balance || 0,
        equity: data.equity || 0,
        currency: data.currency || "USD",
        leverage: data.leverage || "1:100",
        margin: data.margin || 0,
        freeMargin: data.freeMargin || 0,
        marginLevel: data.marginLevel || 0,
        status: "connected",
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }

      const existingAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
      const accountExists = existingAccounts.some((acc: any) => acc.id === accountData.id)

      if (!accountExists) {
        existingAccounts.push(accountData)
        localStorage.setItem("tradingAccounts", JSON.stringify(existingAccounts))
      } else {
        // Update existing account
        const updatedAccounts = existingAccounts.map((acc: any) =>
          acc.id === accountData.id ? { ...acc, ...accountData } : acc,
        )
        localStorage.setItem("tradingAccounts", JSON.stringify(updatedAccounts))
      }

      // Redirect to accounts page after a short delay
      setTimeout(() => {
        router.push("/trading-accounts")
      }, 1500)
    } catch (error: any) {
      console.error("Error connecting to MT5:", error)
      setConnectionError(error.message || "Failed to connect to MT5 account")
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center mb-2">
          <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>Connect MT5 Account</CardTitle>
        </div>
        <CardDescription>Connect your MetaTrader 5 account to the trading journal</CardDescription>
      </CardHeader>
      <CardContent>
        {connectionError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Connection Failed</AlertTitle>
            <AlertDescription>{connectionError}</AlertDescription>
          </Alert>
        )}

        {connectionSuccess && (
          <Alert className="mb-4">
            <AlertTitle>Connection Successful</AlertTitle>
            <AlertDescription>Your MT5 account has been connected successfully.</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My MT5 Account" {...field} />
                  </FormControl>
                  <FormDescription>A name to help you identify this account</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="server"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server</FormLabel>
                  <FormControl>
                    <Input placeholder="broker-server.com" {...field} />
                  </FormControl>
                  <FormDescription>Your MT5 server address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input placeholder="12345678" {...field} />
                  </FormControl>
                  <FormDescription>Your MT5 account login number</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="useInvestorPassword"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Use Investor Password</FormLabel>
                    <FormDescription>
                      Use investor password for read-only access (recommended for security)
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {form.watch("useInvestorPassword") ? (
              <FormField
                control={form.control}
                name="investorPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investor Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>Your MT5 investor password (read-only access)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>Your MT5 account password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="saveCredentials"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Save Credentials</FormLabel>
                    <FormDescription>
                      Save your credentials securely for automatic reconnection (recommended)
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect Account"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
