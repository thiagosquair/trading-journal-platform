import type { Metadata } from "next"
import AccountDetailsClient from "./account-details-client"

export const metadata: Metadata = {
  title: "Account Details",
  description: "View and manage your trading account details",
}

export default function AccountDetailsPage({ params }: { params: { id: string } }) {
  return <AccountDetailsClient accountId={params.id} />
}
