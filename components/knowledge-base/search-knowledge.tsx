import type React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SearchKnowledgeProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SearchKnowledge({ className, ...props }: SearchKnowledgeProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search for answers..."
          className="pl-10 h-12 rounded-lg border-2 focus-visible:ring-blue-500"
        />
        <Button className="absolute right-1 top-1/2 -translate-y-1/2 h-10">Search</Button>
      </div>
    </div>
  )
}
