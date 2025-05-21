import type { Metadata } from "next"
import SharePostPageClient from "./SharePostPageClient"

export const metadata: Metadata = {
  title: "Share Post | TradeLinx",
  description: "Share this trading insight with others",
}

export default function SharePostPage({ params }: { params: { id: string } }) {
  return <SharePostPageClient params={params} />
}
