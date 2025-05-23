"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Trash2, AlertCircle } from "lucide-react"
import { fetchAccountById, disconnectTradingAccount } from "@/lib/trading-actions"

export default function AccountSettingsClient({ accountId }: { accountId: string }) {
  const router = useRouter()
  const [account, setAccount] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    autoSync: true,
    journalIntegration: false,
    notifications: true,
    riskWarnings: true,
  })

  useEffect(() => {
    loadAccountData()
  }, [accountId])

  const loadAccountData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const accountData = await fetchAccountById(accountId)
      if (!accountData) {
        throw new Error("Account not found")
      }
      setAccount(accountData)
      setFormData({
        name: accountData.name,
        autoSync: accountData.autoSync !== false,
        journalIntegration: accountData.journalIntegration || false,
        notifications: accountData.notifications !== false,
        riskWarnings: accountData.riskWarnings !== false,
      })
    } catch (err: any) {
      console.error("Error loading account data:", err)
      setError(err.message || "Failed to load account data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // Update account in localStorage
      const accounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
      const updatedAccounts = accounts.map((acc: any) => (acc.id === accountId ? { ...acc, ...formData } : acc))
      localStorage.setItem("tradingAccounts", JSON.stringify(updatedAccounts))

      // Update local state
      setAccount((prev: any) => ({ ...prev, ...formData }))

      // Show success message
      alert("Settings saved successfully")
    } catch (err: any) {
      console.error("Error saving settings:", err)
      alert(err.message || "Failed to save settings")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDisconnectAccount = async () => {
    if (!confirm("Are you sure you want to disconnect this account? This action cannot be undone.")) {
      return
    }

    try {
      await disconnectTradingAccount(accountId)
      router.push("/trading-accounts")
    } catch (err: any) {
      console.error("Error disconnecting account:", err)
      alert(err.message || "Failed to disconnect account")
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="sync">Sync Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="danger">Danger Zone</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">{account.name}</p>
        </div>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="sync">Sync Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your account information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Account Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter account name"
                />
                <p className="text-sm text-muted-foreground">
                  This name is only visible to you and helps you identify this account.
                </p>
              </div>

              <div className="grid gap-2">
                <Label>Account Information</Label>
                <div className="rounded-md border p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform</span>
                    <span>{account.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Server</span>
                    <span>{account.server || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Number</span>
                    <span>{account.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Connected On</span>
                    <span>{account.createdAt ? new Date(account.createdAt).toLocaleDateString() : "Unknown"}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  This information cannot be changed. To update these details, disconnect this account and connect it
                  again.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
              <CardDescription>Configure how your account data is synchronized</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoSync">Automatic Sync</Label>
                  <p className="text-sm text-muted-foreground">Automatically sync this account every hour</p>
                </div>
                <Switch
                  id="autoSync"
                  checked={formData.autoSync}
                  onCheckedChange={(checked) => handleSwitchChange("autoSync", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="journalIntegration">Journal Integration</Label>
                  <p className="text-sm text-muted-foreground">Automatically create journal entries for new trades</p>
                </div>
                <Switch
                  id="journalIntegration"
                  checked={formData.journalIntegration}
                  onCheckedChange={(checked) => handleSwitchChange("journalIntegration", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications about this account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Trade Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when trades are opened or closed
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={formData.notifications}
                  onCheckedChange={(checked) => handleSwitchChange("notifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="riskWarnings">Risk Warnings</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive warnings when trades exceed your risk parameters
                  </p>
                </div>
                <Switch
                  id="riskWarnings"
                  checked={formData.riskWarnings}
                  onCheckedChange={(checked) => handleSwitchChange("riskWarnings", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="danger" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Irreversible actions for your trading account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border border-destructive/20 rounded-md p-4 bg-destructive/5">
                <h3 className="font-medium text-destructive mb-2">Disconnect Account</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This will remove the account from your profile. You can reconnect it later, but all custom settings
                  will be lost.
                </p>
                <Button variant="destructive" onClick={handleDisconnectAccount}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Disconnect Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
