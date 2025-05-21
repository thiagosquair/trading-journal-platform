import { BookOpen } from "lucide-react"

export function KnowledgeBaseHeader() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
        <BookOpen className="h-6 w-6 text-blue-600" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">TradeLinx Knowledge Base</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Find answers to all your questions about the TradeLinx platform, trading concepts, account management, and more.
      </p>
    </div>
  )
}
