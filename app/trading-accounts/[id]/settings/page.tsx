import type { Metadata } from "next"
import AccountSettingsClient from "./account-settings-client"

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage your trading account settings",
}

export default function AccountSettingsPage({ params }: { params: { id: string } }) {
  return <AccountSettingsClient accountId={params.id} />
}
