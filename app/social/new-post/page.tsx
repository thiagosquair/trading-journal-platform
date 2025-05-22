import type { Metadata } from "next"
import NewPostClientPage from "./NewPostClientPage"

export const metadata: Metadata = {
  title: "Create New Post | TradeLinx",
  description: "Share your trading insights with the community",
}

export default function NewSocialPostPage() {
  return <NewPostClientPage />
}
