import type { Metadata } from "next"
import AccountDetailsClient from "./account-details-client"

export const metadata: Metadata = {
  title: "Account Details | Trading Journal Platform",
  description: "View and manage your trading account details",
}

export default function AccountDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <AccountDetailsClient accountId={params.id} />
    </div>
  )
}
