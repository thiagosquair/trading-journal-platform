import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KnowledgeBaseHeader } from "@/components/knowledge-base/knowledge-base-header"
import { PlatformFAQ } from "@/components/knowledge-base/platform-faq"
import { TradingFAQ } from "@/components/knowledge-base/trading-faq"
import { AccountFAQ } from "@/components/knowledge-base/account-faq"
import { SearchKnowledge } from "@/components/knowledge-base/search-knowledge"
import { PopularArticles } from "@/components/knowledge-base/popular-articles"

export const metadata: Metadata = {
  title: "Knowledge Base | TradeLinx",
  description: "Find answers to all your questions about TradeLinx and trading",
}

export default function KnowledgeBasePage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <KnowledgeBaseHeader />
      <SearchKnowledge className="my-8" />

      <PopularArticles className="mb-12" />

      <Tabs defaultValue="platform" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="platform">Platform Features</TabsTrigger>
          <TabsTrigger value="trading">Trading Knowledge</TabsTrigger>
          <TabsTrigger value="account">Account & Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="platform">
          <PlatformFAQ />
        </TabsContent>
        <TabsContent value="trading">
          <TradingFAQ />
        </TabsContent>
        <TabsContent value="account">
          <AccountFAQ />
        </TabsContent>
      </Tabs>
    </div>
  )
}
