"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Lock, Share2, UserCircle } from "lucide-react"

const privacyFormSchema = z.object({
  // Profile visibility
  profileVisibility: z.enum(["public", "traders", "private"]),
  displayName: z.boolean(),
  displayBio: z.boolean(),
  displayAvatar: z.boolean(),
  displayLocation: z.boolean(),
  displayJoinDate: z.boolean(),

  // Trading data visibility
  tradingStatsVisibility: z.enum(["public", "traders", "private"]),
  displayWinRate: z.boolean(),
  displayProfitFactor: z.boolean(),
  displayTotalTrades: z.boolean(),
  displayProfitLoss: z.boolean(),
  displayRiskRewardRatio: z.boolean(),
  displayAverageTrade: z.boolean(),

  // Account visibility
  accountVisibility: z.enum(["public", "traders", "private"]),
  displayAccountNames: z.boolean(),
  displayBrokers: z.boolean(),
  displayBalances: z.boolean(),
  displayEquity: z.boolean(),

  // Journal visibility
  journalVisibility: z.enum(["public", "traders", "private"]),
  displayJournalEntries: z.boolean(),
  displayTradingNotes: z.boolean(),
  displayScreenshots: z.boolean(),

  // Social settings
  allowComments: z.boolean(),
  allowMentions: z.boolean(),
  allowFollowers: z.boolean(),
  showOnLeaderboard: z.boolean(),

  // Data usage
  allowAnonymousDataUsage: z.boolean(),
  allowPersonalizedContent: z.boolean(),
})

type PrivacyFormValues = z.infer<typeof privacyFormSchema>

// Default values for the form
const defaultValues: PrivacyFormValues = {
  // Profile visibility
  profileVisibility: "public",
  displayName: true,
  displayBio: true,
  displayAvatar: true,
  displayLocation: true,
  displayJoinDate: true,

  // Trading data visibility
  tradingStatsVisibility: "traders",
  displayWinRate: true,
  displayProfitFactor: true,
  displayTotalTrades: true,
  displayProfitLoss: false,
  displayRiskRewardRatio: true,
  displayAverageTrade: true,

  // Account visibility
  accountVisibility: "private",
  displayAccountNames: false,
  displayBrokers: true,
  displayBalances: false,
  displayEquity: false,

  // Journal visibility
  journalVisibility: "traders",
  displayJournalEntries: true,
  displayTradingNotes: true,
  displayScreenshots: true,

  // Social settings
  allowComments: true,
  allowMentions: true,
  allowFollowers: true,
  showOnLeaderboard: true,

  // Data usage
  allowAnonymousDataUsage: true,
  allowPersonalizedContent: true,
}

export function PrivacySettings() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues,
  })

  async function onSubmit(data: PrivacyFormValues) {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to save the settings
      console.log("Privacy settings saved:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings saved",
        description: "Your privacy settings have been updated successfully.",
      })
    } catch (error) {
      console.error("Error saving privacy settings:", error)
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your privacy settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Privacy & Sharing Settings</h1>
        <p className="text-muted-foreground mt-2">
          Control what information is shared publicly and who can see your trading data.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="trading" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Trading Data</span>
              </TabsTrigger>
              <TabsTrigger value="accounts" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Accounts</span>
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Journal</span>
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-2">
                <EyeOff className="h-4 w-4" />
                <span className="hidden sm:inline">Social</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Privacy Settings */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Privacy</CardTitle>
                  <CardDescription>
                    Control who can see your profile information and what details are visible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="profileVisibility"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Profile Visibility</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="public" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Public <span className="text-muted-foreground text-sm">(Anyone can view)</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="traders" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                TradeLinx Users{" "}
                                <span className="text-muted-foreground text-sm">(Only registered users)</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="private" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Private <span className="text-muted-foreground text-sm">(Only you)</span>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>This controls who can see your profile on TradeLinx.</FormDescription>
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Profile Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose which profile information is visible to others.
                    </p>

                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="displayName"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Display Name</FormLabel>
                              <FormDescription>Show your name on your profile</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="displayBio"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Bio</FormLabel>
                              <FormDescription>Show your bio on your profile</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="displayAvatar"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Profile Picture</FormLabel>
                              <FormDescription>Show your profile picture</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="displayLocation"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Location</FormLabel>
                              <FormDescription>Show your location on your profile</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="displayJoinDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Join Date</FormLabel>
                              <FormDescription>Show when you joined TradeLinx</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Trading Data Privacy Settings */}
            <TabsContent value="trading">
              <Card>
                <CardHeader>
                  <CardTitle>Trading Data Privacy</CardTitle>
                  <CardDescription>
                    Control who can see your trading statistics and what metrics are shared.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="tradingStatsVisibility"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Trading Statistics Visibility</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="public" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Public <span className="text-muted-foreground text-sm">(Anyone can view)</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="traders" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                TradeLinx Users{" "}
                                <span className="text-muted-foreground text-sm">(Only registered users)</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="private" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Private <span className="text-muted-foreground text-sm">(Only you)</span>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>This controls who can see your trading statistics.</FormDescription>
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Trading Metrics</h3>
                    <p className="text-sm text-muted-foreground">Choose which trading metrics are visible to others.</p>

                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="displayWinRate"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Win Rate</FormLabel>
                              <FormDescription>Show your trading win rate</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="displayProfitFactor"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Profit Factor</FormLabel>
                              <FormDescription>Show your profit factor</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="displayTotalTrades"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Total Trades</FormLabel>
                              <FormDescription>Show your total number of trades</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="displayProfitLoss"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Profit/Loss</FormLabel>
                              <FormDescription>Show your actual profit and loss amounts</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="displayRiskRewardRatio"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Risk/Reward Ratio</FormLabel>
                              <FormDescription>Show your average risk/reward ratio</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="displayAverageTrade"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Average Trade</FormLabel>
                              <FormDescription>Show your average trade profit/loss</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Privacy Settings */}
            <TabsContent value="accounts">
              <Card>
                <CardHeader>
                  <CardTitle>Account Privacy</CardTitle>
                  <CardDescription>
                    Control who can see your trading accounts and what details are visible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="accountVisibility"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Account Visibility</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="public" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Public <span className="text-muted-foreground text-sm">(Anyone can view)</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="traders" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                TradeLinx Users{" "}
                                <span className="text-muted-foreground text-sm">(Only registered users)</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="private" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Private <span className="text-muted-foreground text-sm">(Only you)</span>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>This controls who can see your trading accounts.</FormDescription>
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose which account information is visible to others.
                    </p>

                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="displayAccountNames"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Account Names</FormLabel>
                              <FormDescription>Show your account names</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="displayBrokers"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Brokers</FormLabel>
                              <FormDescription>Show which brokers you use</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="displayBalances"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Account Balances</FormLabel>
                              <FormDescription>Show your actual account balances</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="displayEquity"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Account Equity</FormLabel>
                              <FormDescription>Show your account equity</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Journal Privacy Settings */}
            <TabsContent value="journal">
              <Card>
                <CardHeader>
                  <CardTitle>Journal Privacy</CardTitle>
                  <CardDescription>
                    Control who can see your trading journal and what content is visible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="journalVisibility"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Journal Visibility</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="public" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Public <span className="text-muted-foreground text-sm">(Anyone can view)</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="traders" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                TradeLinx Users{" "}
                                <span className="text-muted-foreground text-sm">(Only registered users)</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="private" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Private <span className="text-muted-foreground text-sm">(Only you)</span>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>This controls who can see your trading journal.</FormDescription>
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Journal Content</h3>
                    <p className="text-sm text-muted-foreground">Choose which journal content is visible to others.</p>

                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="displayJournalEntries"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Journal Entries</FormLabel>
                              <FormDescription>Show your journal entries</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="displayTradingNotes"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Trading Notes</FormLabel>
                              <FormDescription>Show your trading notes</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="displayScreenshots"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Screenshots</FormLabel>
                              <FormDescription>Show your chart screenshots</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Social Privacy Settings */}
            <TabsContent value="social">
              <Card>
                <CardHeader>
                  <CardTitle>Social Settings</CardTitle>
                  <CardDescription>Control your social interactions and data usage preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Social Interactions</h3>
                    <p className="text-sm text-muted-foreground">
                      Control how others can interact with you on TradeLinx.
                    </p>

                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="allowComments"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Allow Comments</FormLabel>
                              <FormDescription>Allow others to comment on your posts</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="allowMentions"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Allow Mentions</FormLabel>
                              <FormDescription>Allow others to mention you in posts</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="allowFollowers"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Allow Followers</FormLabel>
                              <FormDescription>Allow others to follow your activity</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="showOnLeaderboard"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Show on Leaderboard</FormLabel>
                              <FormDescription>Allow your profile to appear on leaderboards</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Usage</h3>
                    <p className="text-sm text-muted-foreground">Control how your data is used by TradeLinx.</p>

                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="allowAnonymousDataUsage"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Anonymous Data Usage</FormLabel>
                              <FormDescription>
                                Allow TradeLinx to use your data anonymously for platform improvements
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="allowPersonalizedContent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Personalized Content</FormLabel>
                              <FormDescription>
                                Allow TradeLinx to personalize content based on your activity
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
