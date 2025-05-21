"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function SecuritySettings() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false)

  function onPasswordChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
    }, 1000)
  }

  function onTwoFactorToggle(checked: boolean) {
    setTwoFactorEnabled(checked)

    toast({
      title: checked ? "Two-factor authentication enabled" : "Two-factor authentication disabled",
      description: checked ? "Your account is now more secure." : "Two-factor authentication has been disabled.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">Manage your account security settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure.</CardDescription>
        </CardHeader>
        <form onSubmit={onPasswordChange}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input id="confirm" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update password"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="2fa" className="flex flex-col space-y-1">
              <span>Two-factor authentication</span>
              <span className="font-normal text-sm text-muted-foreground">Require a code at sign in</span>
            </Label>
            <Switch id="2fa" checked={twoFactorEnabled} onCheckedChange={onTwoFactorToggle} />
          </div>

          {twoFactorEnabled && (
            <div className="rounded-md bg-muted p-4">
              <div className="text-sm font-medium">Two-factor authentication is enabled</div>
              <div className="text-sm text-muted-foreground mt-1">
                You will be asked for a verification code when signing in.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
          <CardDescription>Manage your active sessions on different devices.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Chrome on Windows</p>
                <p className="text-sm text-muted-foreground">Current active session</p>
              </div>
              <Button variant="outline" size="sm" disabled>
                Current
              </Button>
            </div>

            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Safari on Mac</p>
                <p className="text-sm text-muted-foreground">Last active 2 days ago</p>
              </div>
              <Button variant="outline" size="sm">
                Log out
              </Button>
            </div>

            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Mobile App on iPhone</p>
                <p className="text-sm text-muted-foreground">Last active 5 days ago</p>
              </div>
              <Button variant="outline" size="sm">
                Log out
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="destructive">Log out of all devices</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
